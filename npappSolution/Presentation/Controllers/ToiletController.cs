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


}
