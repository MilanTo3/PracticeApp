namespace Domain.Repositories;
using Contracts;
using Domain.Models;
public interface IToiletRepository: IGenericRepository<Toilet>
{
    Task<bool> UpdateToilet(Toilet toilet);
    Task<Toilet> getWithFeedbacks(long toiletId);
    Task<IEnumerable<Toilet>> getAllWithFeedbacks();
    Task<DtoPaginated<Toilet>> GetPaginated(int page, int itemCount, string? searchTerm);

}
