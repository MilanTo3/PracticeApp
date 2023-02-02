namespace ServicesAbstraction;
using Contracts;
using Domain.Models;

public interface IFeedbackService
{
    Task<IEnumerable<FeedbackDto>> GetAllAsync();

    Task<FeedbackDto> GetByIdAsync(long feedbackId);

    Task<FeedbackDto> CreateAsync(FeedbackDto dto);

    Task<bool> DeleteAsync(long feedbackId);

    Task<IEnumerable<FeedbackDto>> GetToiletFeedbacks(long toiletId);

    Task<SummaryDto> GetSummary(long toiletId);
    Task<IEnumerable<ReportDto>> GetReports(long toiletId);
    Task<DtoPaginated<ReportDto>> GetPaginatedReports(long toiletId, int page, int itemCount, string? searchTerm);

}
