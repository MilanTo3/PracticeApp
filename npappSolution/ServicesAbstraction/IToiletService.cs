namespace ServicesAbstraction;
using Contracts;
using Domain.Models;

public interface IToiletService
{
    Task<IEnumerable<ToiletDto>> GetAllAsync();

    Task<ToiletDto> GetByIdAsync(long toiletId);

    Task<ToiletDto> CreateAsync(ToiletDto dto);

    Task<bool> DeleteAsync(long toiletId);

    Task<bool> UpdateAsync(ToiletDto dto);

    Task<IEnumerable<string>> GetToiletNames();

}
