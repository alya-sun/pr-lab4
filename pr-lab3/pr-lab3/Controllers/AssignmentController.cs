using Microsoft.AspNetCore.Mvc;
using pr_lab3.Abstractions;
using pr_lab3.Models;
using pr_lab3.Persistence;

namespace pr_lab3.Controllers;
[ApiController]
[Route("/api/assignments")]
public class AssignmentController(AppDbContext context, ISmtpService smtpService) : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(context.Assignments.ToList());
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        return Ok(context.Assignments.FirstOrDefault(a => a.Id == id));
    }

    [HttpPost]
    public IActionResult Post([FromBody] Assignment assignment)
    {
        context.Assignments.Add(assignment);
        context.SaveChanges();
        smtpService.SendEmailAsync(assignment.Email, $"Task created - {assignment.Title}", assignment.Description);
        return Ok(assignment);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] Assignment assignment)
    {
        var assignmentToUpdate = context.Assignments.FirstOrDefault(a => a.Id == id);
        
        assignmentToUpdate.Title = assignment.Title;
        assignmentToUpdate.Description = assignment.Description;
        assignmentToUpdate.Status = assignment.Status;
        
        context.SaveChanges();
        smtpService.SendEmailAsync(assignment.Email, $"Task edited - {assignment.Title}", assignment.Description);
        return Ok(assignment);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var assignmentToDelete = context.Assignments.FirstOrDefault(a => a.Id == id); 
        context.Assignments.Remove(assignmentToDelete);
        context.SaveChanges();
        smtpService.SendEmailAsync(assignmentToDelete.Email, $"Task deleted - {assignmentToDelete.Title}", assignmentToDelete.Description);
        return Ok();
    }
    
}