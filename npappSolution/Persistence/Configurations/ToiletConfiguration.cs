namespace Persistence.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Models;

public class ToiletConfiguration: IEntityTypeConfiguration<Toilet>
{

    public void Configure(EntityTypeBuilder<Toilet> builder)
    {
        builder.ToTable(nameof(Toilet));
        builder.HasKey(toilet => toilet.toiletId);
        builder.Property(toilet => toilet.toiletId).ValueGeneratedOnAdd();
        
    }

}
