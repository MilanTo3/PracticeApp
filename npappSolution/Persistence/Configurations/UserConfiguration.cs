namespace Persistence.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Models;

public class UserConfiguration: IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable(nameof(User));
        builder.HasKey(user => user.userId);
        builder.HasAlternateKey(user => user.email);
        builder.Property(user => user.userId).ValueGeneratedOnAdd();
        builder.Property(user => user.password).IsRequired();
    }
}
