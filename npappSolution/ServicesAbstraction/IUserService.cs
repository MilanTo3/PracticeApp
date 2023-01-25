namespace ServicesAbstraction;
using Contracts;
using Domain.Models;

public interface IUserService
{

    Task<IEnumerable<UserDto>> GetAllAsync(CancellationToken cancellationToken = default);

    Task<UserDto> GetByIdAsync(long userid, CancellationToken cancellationToken = default);

    Task<UserDto> CreateAsync(UserDto dto, CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(long userid, CancellationToken cancellationToken = default);

    Task<TokenDto> LoginUserAsync(LoginUserDto loginUser);

}
