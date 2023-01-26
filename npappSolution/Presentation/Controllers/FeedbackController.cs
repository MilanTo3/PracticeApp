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
    public async Task<IActionResult> AddFeedback(FeedbackDto fback){
    
        await _serviceManager.FeedbackService.CreateAsync(fback);

        return Ok();
    }

    [HttpDelete]
    [AllowAnonymous]
    [Route("{id}")]
    public async Task<IActionResult> DeleteFeedback(long id){
    
        await _serviceManager.FeedbackService.DeleteAsync(id);

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetFeedbacks()
    {
        var screenings = await _serviceManager.FeedbackService.GetAllAsync();

        return Ok(screenings);
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("{id}")]
    public async Task<IActionResult> GetOneFeedback(long id) {

        FeedbackDto screening = await _serviceManager.FeedbackService.GetByIdAsync(id);

        return Ok(screening);
    }


}
