using MailKit.Net.Pop3;
using MimeKit;
using pr_lab3.Abstractions;
using pr_lab3.Models;

namespace pr_lab3.Services;

public class Pop3Service(IConfiguration configuration) : IPop3Service
{
    public async Task<List<Email>> GetPop3EmailsAsync()
    {
        var pop3Host = configuration["Pop3:Host"];
        var pop3Port = int.Parse(configuration["Pop3:Port"]);
        var pop3Username = configuration["Pop3:Username"];
        var pop3Password = configuration["Pop3:Password"];

        var emails = new List<Email>();
        using var client = new Pop3Client();
        try
        {
            // Connect to POP3 server
            await client.ConnectAsync(pop3Host, pop3Port, MailKit.Security.SecureSocketOptions.SslOnConnect);

            // Authenticate
            await client.AuthenticateAsync(pop3Username, pop3Password);

            // Get the number of messages
            int messageCount = await client.GetMessageCountAsync();

            // Fetch all messages
            for (int i = 0; i < messageCount; i++)
            {
                var message = await client.GetMessageAsync(i);
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
            throw new Exception($"Failed to retrieve POP3 emails: {ex.Message}", ex);
        }

        return emails;
    }
}