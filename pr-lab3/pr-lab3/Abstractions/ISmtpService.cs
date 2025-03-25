namespace pr_lab3.Abstractions;

public interface ISmtpService
{
    public Task SendEmailAsync(string toEmail, string subject, string body);
}