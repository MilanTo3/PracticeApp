using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography.Xml;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Authorization;
using npWorkApp.DtoModels;
using Mapster;
using npWorkApp.Models;
using npWorkApp.HelperServices;
using npWorkApp.Models.Interfaces;
using npWorkApp.DbData;
using Microsoft.EntityFrameworkCore;

namespace npWorkApp.Services;

public class UserService : IUser
{

    private readonly DbDataContext _context;

    public UserService(DbDataContext context)
    {
        _context = context;
    }

    public async Task<TokenDto> loginUser(LoginUserDto loginUser)
    {
        
        var user = await _context.Users.Where(x => x.email == loginUser.email).FirstOrDefaultAsync();
        if(user == null || CryptoService.hashPassword(loginUser.password) != user.password){
            return null;
        }

        JWTSetting setting = new JWTSetting();
        var tokenDescriptor = new SecurityTokenDescriptor {
            Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("userId", loginUser.email), new Claim(ClaimTypes.Role, "consumer")
                }),
            Expires = DateTime.UtcNow.AddHours(5),
                                                   //Key min: 16 characters
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(setting.Key)), SecurityAlgorithms.HmacSha256Signature)
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
        
        TokenDto userDto = new TokenDto() { name=user.name, role=user.role, email=loginUser.email, token = tokenHandler.WriteToken(securityToken) };

        return userDto;
    }

    public async Task<bool> registerUser(UserDto dto)
    {
        var account = dto.Adapt<UserModel>();
        account.email = dto.email;
        account.name = dto.name;
        account.role = "consumer";
        account.password = CryptoService.hashPassword(dto.password);

        try{
            _context.Users.Add(account);
            await _context.SaveChangesAsync();
        }catch{
            return false;
        }

        return true;
    }
}
