using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizProject.Domain.Model.ModelDTO;
using QuizProject.Infrastructure.Service.IService;
using System.Security.Claims;
using System.Text.Json.Serialization;
using System.Text.Json;

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

        [HttpDelete("deleteAnswer/{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteAnswer(int id)
        {
            bool deleteAnswer = await _adminService.DeleteQuestion(id);
            if (deleteAnswer)
            {
                return NoContent();
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        [HttpPost("updateQuestion")]
        [Authorize]
        public async Task<ActionResult<QuestionDTO>> UpdateQuestion(QuestionDTO questionDTO)
        {
            var resultModel = await _adminService.ChangeQuestion(questionDTO);
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
                var email = GetUserFromContex();
                _logger.LogInformation("User with " + email + " email deleted question");
                return NoContent();
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

    }
}
