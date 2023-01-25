namespace ServicesAbstraction;
using Contracts;
using Domain.Models;

public interface IFeedbackService
{
    Task<IEnumerable<FeedbackDto>> GetAllAsync();

    Task<FeedbackDto> GetByIdAsync(long feedbackId);

    Task<FeedbackDto> CreateAsync(FeedbackDto dto);

    Task<bool> DeleteAsync(long feedbackId);
}
