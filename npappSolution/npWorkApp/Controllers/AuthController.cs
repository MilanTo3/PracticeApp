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

namespace npWorkApp.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{

    private readonly IUser _context;

    public AuthController(IUser context)
    {
        _context = context;
    }

    [HttpPost]
    [AllowAnonymous]
    [Route("registerUser")]
    public async Task<IActionResult> AddUser(UserDto dto){
    
        var success = await _context.registerUser(dto);

        if(success){
            return Ok();
        }else{
            return BadRequest("Registration Unsuccessfull.");
        }
    }

    [HttpPost]
    [AllowAnonymous]
    [Route("loginUser")]
    public async Task<IActionResult> LoginUser(LoginUserDto loginUser) {

        var userDto = await _context.loginUser(loginUser);
        
        if(userDto != null){
            return Ok(userDto);
        }else{
            return BadRequest("Login Unsuccessfull.");
        }
        
    }

}
