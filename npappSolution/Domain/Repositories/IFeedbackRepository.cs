using Domain.Models;
using Contracts;

namespace Domain.Repositories;

public interface IFeedbackRepository: IGenericRepository<Feedback>
{
    public Task<DtoPaginated<Feedback>> GetPaginated(long toiletId, int page, int itemCount, DateTime? sed, DateTime? eed, string? searchTerm);
}
