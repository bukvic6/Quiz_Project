using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizProject.Model.ModelDTO;
using QuizProject.Service.IService;
using System.Security.Claims;

namespace QuizProject.Controllers
{
    [Route("api/Admin")]
    [ApiController]
    public class AdminController : Controller
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
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            _logger.LogInformation("User with " + email + " email created question");
            return Ok(resultModel);
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<QuestionDTO>>> GetQuestions()
        {
            var questions = await _adminService.GetQuestions();
            return Ok(questions);
        }

        [HttpDelete("delete/{id}")]
        [Authorize]
        public async Task<ActionResult> Delete(int id)
        {
            bool deletionResult = await _adminService.DeleteQuestion(id);
            if (deletionResult)
            {
                var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);
                _logger.LogInformation("User with " + email + " email deleted question");
                return NoContent();
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
