using Microsoft.AspNetCore.Mvc;
using pr_lab3.Abstractions;

namespace pr_lab3.Controllers;

[ApiController]
[Route("/api/mails")]
public class EmailController(IImapService imapService, IPop3Service pop3Service) : ControllerBase
{
    [HttpGet("imap")]
    public async Task<IActionResult> GetImap() => Ok(await imapService.GetUnreadEmailsAsync());

    [HttpGet("pop3")]
    public async Task<IActionResult> GetPop3() => Ok(await pop3Service.GetPop3EmailsAsync());
}