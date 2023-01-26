using System;
using System.Threading;
using System.Threading.Tasks;
using Contracts;
using Microsoft.AspNetCore.Mvc;
using ServicesAbstraction;
using Services;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography.Xml;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Authorization;
namespace Presentation.Controllers;

[ApiController]
[Route("api/toilet")]
public class ToiletController : ControllerBase
{

    private readonly IServiceManager _serviceManager;
    public ToiletController(IServiceManager serviceManager) {
        _serviceManager = serviceManager;
    }

    [HttpPost]
    [AllowAnonymous]
    [Route("addToilet")]
    public async Task<IActionResult> AddToilet(ToiletDto fback){
    
        await _serviceManager.ToiletService.CreateAsync(fback);

        return Ok();
    }

    [HttpDelete]
    [AllowAnonymous]
    [Route("{id}")]
    public async Task<IActionResult> DeleteToilet(long id){
    
        await _serviceManager.ToiletService.DeleteAsync(id);

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetToilets()
    {
        var toilets = await _serviceManager.ToiletService.GetAllAsync();

        return Ok(toilets);
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("{id}")]
    public async Task<IActionResult> GetOneToilet(long id) {

        ToiletDto toilet = await _serviceManager.ToiletService.GetByIdAsync(id);

        return Ok(toilet);
    }

    [HttpPut]
    [AllowAnonymous]
    public async Task<IActionResult> UpdateToilet(ToiletDto dto){

        await _serviceManager.ToiletService.UpdateAsync(dto);

        return Ok();
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("getNames")]
    public async Task<IActionResult> GetNames(){

        var retVal = await _serviceManager.ToiletService.GetToiletNames();

        return Ok(retVal);
    }

}
