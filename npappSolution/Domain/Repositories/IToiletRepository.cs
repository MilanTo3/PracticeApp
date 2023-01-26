namespace Domain.Repositories;
using Contracts;
using Domain.Models;
public interface IToiletRepository: IGenericRepository<Toilet>
{
    Task<bool> UpdateToilet(Toilet toilet);
}
