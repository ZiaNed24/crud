using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ziaexam.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var cs = "Server=.;Initial Catalog=zia;Persist Security Info=False;User ID=sa;Password=aptech;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30";
builder.Services.AddDbContext<ziaexamContext>(op => op.UseSqlServer(cs));
builder.Services.AddControllers();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularClient",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable CORS middleware
app.UseCors("AllowAngularClient");

app.UseAuthorization();

app.MapControllers();

app.Run();
