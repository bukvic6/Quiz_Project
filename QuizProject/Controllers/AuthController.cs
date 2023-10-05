using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizProject.Model.ModelDTO;
using QuizProject.Service.IService;
using System.Security.Claims;

namespace QuizProject.Controllers
{
    [Route("api/Auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AdminController> _logger;


        public AuthController(IAuthService authService, ILogger<AdminController> logger)
        {
            _authService = authService;
            _logger = logger;
            _logger.LogInformation("AuthController called");
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login(UserDTO userDTO)
        {
            _logger.LogInformation("Loging Method called");
            if (userDTO == null)
            {
                return Unauthorized();
            }
            LoginResponse result;
            try
            {
                result = await _authService.Login(userDTO);

            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            _logger.LogInformation("User with " + result.Email + " logged in.");
            return Ok(result);
        }
    }
}
