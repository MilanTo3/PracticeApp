namespace Persistence.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Models;
public class FeedbackConfiguration
{

    public void Configure(EntityTypeBuilder<Feedback> builder)
    {
        builder.ToTable(nameof(Feedback));
        builder.HasKey(feedback => feedback.feedbackId);
        builder.Property(feedback => feedback.feedbackId).ValueGeneratedOnAdd();
        builder.HasOne(s => s.Toilet).WithMany(g => g.Feedbacks).HasForeignKey(x => x.toiletId).IsRequired();
    }

}
