using MimeKit;
using pr_lab3.Models;

namespace pr_lab3.Abstractions;

public interface IImapService
{
    public Task<List<Email>> GetUnreadEmailsAsync();
}