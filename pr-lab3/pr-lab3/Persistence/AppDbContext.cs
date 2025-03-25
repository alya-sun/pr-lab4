using Microsoft.EntityFrameworkCore;
using pr_lab3.Models;

namespace pr_lab3.Persistence;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Assignment> Assignments { get; set; }
}