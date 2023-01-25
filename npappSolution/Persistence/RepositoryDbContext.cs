using Domain.Models;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
namespace Persistence;

public class RepositoryDbContext: DbContext
{

    public RepositoryDbContext(DbContextOptions options)
            : base(options)
    {
    }

    public DbSet<User>? Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) =>
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(RepositoryDbContext).Assembly);


}
