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
[Route("api/feedback")]
public class FeedbackController : ControllerBase
{

    private readonly IServiceManager _serviceManager;
    public FeedbackController(IServiceManager serviceManager) {
        _serviceManager = serviceManager;
    }

    [HttpPost]
    [AllowAnonymous]
    [Route("addFeedback")]
    public async Task<IActionResult> AddUser(FeedbackDto fback){
    
        await _serviceManager.FeedbackService.CreateAsync(fback);

        return Ok();
    }


}
