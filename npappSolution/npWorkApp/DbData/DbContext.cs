using Microsoft.EntityFrameworkCore;
using npWorkApp.Models;

namespace npWorkApp.DbData
{
    public class DbDataContext : DbContext
    {
        public DbDataContext(DbContextOptions<DbDataContext> options) : base(options)
        {
        }

        public DbSet<UserModel> Users { get; set; }
    }
}