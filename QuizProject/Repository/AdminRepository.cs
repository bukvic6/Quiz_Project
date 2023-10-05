using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizProject.Controllers;
using QuizProject.Data;
using QuizProject.Model;
using QuizProject.Model.ModelDTO;
using QuizProject.Repository.IRepository;
using QuizProject.Service.IService;

namespace QuizProject.Repository
{
    public class AdminRepository : IAdminRepository
    {

        private readonly ILogger<AdminRepository> _logger;
        private readonly ApplicationDbContext _context;

        public AdminRepository(ILogger<AdminRepository> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<Question> CreateQuestion(Question question)
        {
            await _context.Questions.AddAsync(question);
            await _context.SaveChangesAsync();
            return question;
        }

        public async Task<bool> DeleteQuestion(int id)
        {
            try
            {
                var question = new Question { Id = id };
                _context.Questions.Attach(question);
                question.IsDeleted = true;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }

        public async Task<List<Question>> GetAllQuestions()
        {
            return await _context.Questions.ToListAsync();
        }
    }
}
