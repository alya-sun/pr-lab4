using MailKit;
using MailKit.Net.Imap;
using MailKit.Search;
using MimeKit;
using pr_lab3.Abstractions;
using pr_lab3.Models;

namespace pr_lab3.Services;

public class ImapService(IConfiguration configuration) : IImapService
{
    public async Task<List<Email>> GetUnreadEmailsAsync()
    {
        var imapHost = configuration["Imap:Host"];
        var imapPort = int.Parse(configuration["Imap:Port"]);
        var imapUsername = configuration["Imap:Username"];
        var imapPassword = configuration["Imap:Password"];

        var emails = new List<Email>();

        using var client = new ImapClient();
        try
        {
            // Connect to IMAP server
            await client.ConnectAsync(imapHost, imapPort, MailKit.Security.SecureSocketOptions.SslOnConnect);

            // Authenticate
            await client.AuthenticateAsync(imapUsername, imapPassword);

            // Open the Inbox folder
            var inbox = client.Inbox;
            await inbox.OpenAsync(FolderAccess.ReadWrite);

            // Search for unread emails
            var uids = await inbox.SearchAsync(SearchQuery.NotSeen);

            // Fetch each unread email
            foreach (var uid in uids)
            {
                var message = await inbox.GetMessageAsync(uid);
                emails.Add(new Email
                {
                    From = message.From.ToString(),
                    Subject = message.Subject,
                    Body = message.TextBody ?? message.HtmlBody
                });
            }

            await client.DisconnectAsync(true);
        }
        catch (Exception ex)
        {
            throw new Exception($"Failed to retrieve emails: {ex.Message}", ex);
        }

        return emails;
    }
}