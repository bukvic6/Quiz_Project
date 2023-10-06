using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizProject.Domain.Model;
using QuizProject.Domain.Model.ModelDTO;
using QuizProject.Infrastructure.Service.IService;
using System.Security.Claims;

namespace QuizProject.Controllers
{
    [Route("api/User")]
    [ApiController]
    public class UserController : SharedController
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;
        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _logger.LogInformation("UserController called");
            _userService = userService;
        }

        [HttpPost("calculate-score")]
        [Authorize]
        public async Task<ActionResult> CalculateScore(List<UserAnswer> answer)
        {
            var email = GetUserFromContex();
            if (email == null)
                return BadRequest();

            bool result = await _userService.CalculateScore(answer, email);
            if (!result)
                return BadRequest();

            _logger.LogInformation("User with " + email + " email finished quiz");
            return Ok();
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<QuestionsForUserDTO>>> GetQuestions()
        {
            var email = GetUserFromContex();
            var questions = await _userService.GetQuestions();
            return Ok(questions);
        }

        [HttpGet("results")]
        [AllowAnonymous]
        public async Task<ActionResult<List<ResultsDTO>>> GetResults()
        {
            var results = await _userService.GetResults();
            return Ok(results);
        }
    }
}
