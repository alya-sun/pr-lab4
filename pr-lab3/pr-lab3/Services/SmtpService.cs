using MailKit.Net.Smtp;
using MimeKit;
using pr_lab3.Abstractions;

namespace pr_lab3.Services;

public class SmtpService(IConfiguration configuration) : ISmtpService
{
    public async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        var smtpHost = configuration["Smtp:Host"];
        var smtpPort = int.Parse(configuration["Smtp:Port"]);
        var smtpUsername = configuration["Smtp:Username"];
        var smtpPassword = configuration["Smtp:Password"];
        var fromEmail = configuration["Smtp:FromEmail"];

        var message = new MimeMessage();
        message.From.Add(MailboxAddress.Parse(fromEmail));
        message.To.Add(MailboxAddress.Parse(toEmail));
        message.Subject = subject;

        var bodyBuilder = new BodyBuilder { HtmlBody = body };
        message.Body = bodyBuilder.ToMessageBody();

        using var client = new SmtpClient();
        try
        {
            await client.ConnectAsync(smtpHost, smtpPort, true);
            await client.AuthenticateAsync(smtpUsername, smtpPassword);
            await client.SendAsync(message);
        }
        catch (Exception ex)
        {
            throw new Exception($"Failed to send email: {ex.Message}", ex);
        }
        finally
        {
            await client.DisconnectAsync(true);
        }
    }
}