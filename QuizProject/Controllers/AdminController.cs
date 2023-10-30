using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizProject.Domain.Model.ModelDTO;
using QuizProject.Infrastructure.Service.IService;

namespace QuizProject.Controllers
{
    [Route("api/Admin")]
    [ApiController]
    public class AdminController : SharedController
    {

        private readonly ILogger<AdminController> _logger;
        private readonly IAdminService _adminService;


        public AdminController(ILogger<AdminController> logger, IAdminService adminService)
        {
            _logger = logger;
            _logger.LogInformation("AdminController called");
            _adminService = adminService;
        }

        [HttpPost("createQuestion")]
        [Authorize]
        public async Task<ActionResult<QuestionDTO>> CreateQuestion(QuestionDTO questionDTO)
        {
            var resultModel = await _adminService.CreateQuestion(questionDTO);
            var email = GetUserFromContex();
            _logger.LogInformation("User with " + email + " email created question");
            return Ok(resultModel);
        }

        [HttpPost("deleteAnswer")]
        [Authorize]
        public async Task<ActionResult> DeleteAnswer(List<int> answersToDelete)
        {
            bool deleteAnswer = await _adminService.DeleteAnswers(answersToDelete);
            if (deleteAnswer)
            {
                return NoContent();
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        [HttpPost("updateQuestion")]
        [Authorize]
        public async Task<ActionResult<int>> UpdateQuestion(QuestionDTO questionDTO)
        {
            var resultModel = await _adminService.ChangeQuestion(questionDTO);
            return Ok(resultModel);
        }

        [HttpGet("{pn}/{ps}")]
        [Authorize]
        public async Task<ActionResult<List<QuestionDTO>>> GetQuestions(int pn, int ps, [FromQuery] string? search)
        {
            var questions = await _adminService.GetQuestions(pn, ps, search);
            return Ok(questions);
        }

        [HttpGet("statistic")]
        [Authorize]
        public async Task<ActionResult<List<StatsDTO>>> GetStatistic()
        {
            var statistic = await _adminService.GetStatistic();
            return Ok(statistic);
        }

        [HttpGet("results/{pn}/{ps}")]
        [Authorize]
        public async Task<ActionResult<List<ResultsDTO>>> GetResults(int pn, int ps, [FromQuery] string? startDate, [FromQuery] string? endDate)
        {
            var role = GetUserRole();
            var email = GetUserFromContex();

            var results = await _adminService.GetResults(pn, ps, startDate, endDate, role, email);
            return Ok(results);
        }

        [HttpDelete("delete/{id}")]
        [Authorize]
        public async Task<ActionResult> Delete(int id)
        {
            bool deletionResult = await _adminService.DeleteQuestion(id);
            if (deletionResult)
            {
                var email = GetUserFromContex();
                _logger.LogInformation("User with " + email + " email deleted question");
                return NoContent();
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        [HttpGet("count")]
        [Authorize]
        public async Task<int> GetCount([FromQuery] string? search)
        {
            int count = await _adminService.GetCount(search);
            return count;
        }

        [HttpGet("resultCount")]
        [Authorize]
        public async Task<int> GetResultCount()
        {
            int count = await _adminService.GetResultCount();
            return count;
        }

        [HttpGet("userCount")]
        [Authorize]
        public async Task<int> GetUserCount()
        {
            int count = await _adminService.GetUserCount();
            return count;
        }

        [HttpGet("users")]
        [Authorize]
        public async Task<ActionResult<List<QuestionDTO>>> GetUsers([FromQuery] string? search)
        {
            var questions = await _adminService.GetUsers(search);
            return Ok(questions);
        }
    }
}
