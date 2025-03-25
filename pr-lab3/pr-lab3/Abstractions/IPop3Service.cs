using MimeKit;
using pr_lab3.Models;

namespace pr_lab3.Abstractions;

public interface IPop3Service
{
    public Task<List<Email>> GetPop3EmailsAsync();
}