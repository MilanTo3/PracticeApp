using Microsoft.EntityFrameworkCore;
using npWorkApp.DbData;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using npWorkApp.Models.Interfaces;
using npWorkApp.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("ConnStr");
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(p => p.AddPolicy("corspolicy", build => {
    build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));
builder.Services.AddDbContext<DbDataContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddScoped<IUser, UserService>();

var app = builder.Build();
app.UseCors("corspolicy");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

    app.UseSwagger();
    app.UseSwaggerUI(); 
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
