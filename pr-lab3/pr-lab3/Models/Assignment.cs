using pr_lab3.Enums;

namespace pr_lab3.Models;

public class Assignment
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public AssignmentStatus Status { get; set; }
    public string Email { get; set; }
}