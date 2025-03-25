using Microsoft.EntityFrameworkCore;
using pr_lab3.Abstractions;
using pr_lab3.Persistence;
using pr_lab3.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://todo-front:3000", "http://localhost:3000")
            .AllowAnyMethod() 
            .AllowAnyHeader();
    });
});

builder.Services.AddControllers();

builder.Services.AddScoped<ISmtpService, SmtpService>();
builder.Services.AddScoped<IPop3Service, Pop3Service>();
builder.Services.AddScoped<IImapService, ImapService>();


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql("Host=postgres;Port=5432;Database=lab3;Username=postgres;Password=13579"));
    // options.UseNpgsql("Host=localhost;Port=5433;Database=lab3;Username=postgres;Password=13579"));



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors("AllowReactApp");

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseAuthorization();
app.MapControllers();

app.Urls.Add("http://0.0.0.0:8080");

app.Run();


app.Run();