using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using QuizProject.Domain.Data;
using QuizProject.Domain.Model;
using QuizProject.Infrastructure.Repository.IRepository;

namespace QuizProject.Infrastructure.Repository
{
    public class AdminRepository : IAdminRepository
    {

        private readonly ILogger<AdminRepository> _logger;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public AdminRepository(ILogger<AdminRepository> logger, ApplicationDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _logger = logger;
            _context = context;
        }

        public async Task<int> ChangeQuestion(Question questionEntity)
        {
            _context.Entry(questionEntity).State = EntityState.Modified;
            return await _context
                .SaveChangesAsync();
/*
            var questionFromDatabase = await _context.Questions.FindAsync(questionEntity.Id);
            if (questionFromDatabase != null)
            {
                _mapper.Map(questionFromDatabase, questionEntity);
                return await _context.SaveChangesAsync();
            }*/
        }

        public async Task<Question> CreateQuestion(Question question)
        {
            await _context.Questions
                .AddAsync(question);
            await _context
                .SaveChangesAsync();
            return question;
        }

        public async Task<bool> DeleteQuestion(int id)
        {
            try
            {
                var question = new Question { Id = id };
                _context.Questions
                    .Attach(question);
                question.IsDeleted = true;
                await _context
                    .SaveChangesAsync();
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
            return await _context.Questions
                .ToListAsync();
        }
    }
}
