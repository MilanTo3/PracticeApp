using npWorkApp.DtoModels;

namespace npWorkApp.Models.Interfaces;

public interface IUser
{

    Task<bool> registerUser(UserDto dto);

    Task<TokenDto> loginUser(LoginUserDto loginUser);

}
