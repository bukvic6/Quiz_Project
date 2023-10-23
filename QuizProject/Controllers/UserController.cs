using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizProject.Domain.Model;
using QuizProject.Domain.Model.ModelDTO;
using QuizProject.Infrastructure.Service;
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
        public async Task<int> CalculateScore(List<UserAnswer> answer)
        {
            var email = GetUserFromContex();
            int result = await _userService.CalculateScore(answer, email);
            _logger.LogInformation("User with " + email + " email finished quiz");
            return result;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<QuestionsForUserDTO>>> GetQuestions()
        {
            var email = GetUserFromContex();
            var questions = await _userService.GetQuestions();
            return Ok(questions);
        }

        [HttpGet("topResults/{topNumber}")]
        [Authorize]
        public async Task<ActionResult<List<ResultsDTO>>> GetTopResults(int topNumber)
        {
            var results = await _userService.GetTopResults(topNumber);
            return Ok(results);
        }

        [HttpGet("userResults/{pn}/{ps}")]
        [Authorize]
        public async Task<ActionResult<List<ResultsDTO>>> UserResults(int pn, int ps)
        {
            var email = GetUserFromContex();

            var results = await _userService.UserResults(email, pn, ps);
            return Ok(results);
        }

        [HttpGet("count")]
        [Authorize]
        public async Task<int> GetCount()
        {
            var role = GetUserRole();
            var email = GetUserFromContex();

            int count = await _userService.GetCount(email, role);
            return count;
        }

    }
}
