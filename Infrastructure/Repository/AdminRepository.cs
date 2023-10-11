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

        public async Task ChangeAnswers(ICollection<Answer> answers)
        {
            foreach (Answer answer in answers)
            {
                if(answer.Id == 0 )
                {
                    await _context.Answers.AddAsync(answer);
                }
            }
                    await _context.SaveChangesAsync();
        }

        public async Task<int> ChangeQuestion(Question questionEntity)
        {
            _context.Entry(questionEntity).State = EntityState.Modified;
            return await _context
                .SaveChangesAsync();
        }

        public async Task CreateAnswers(List<Answer> answers)
        {
            await _context.Answers.AddRangeAsync(answers);
            await _context.SaveChangesAsync();
        }

        public async Task<Question> CreateQuestion(Question question)
        {
            await _context.Questions
                .AddAsync(question);
            await _context
                .SaveChangesAsync();
            return question;
        }

        public async Task<bool>DeleteAnswers(List<int> ids)
        {
            try
            {
                _context.Answers
                    .RemoveRange(ids.Select(id => new Answer { Id = id }));
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

        public async Task<List<Question>> GetAllQuestions(int pageNumber, int pageSize)
        {
            int skip = (pageNumber - 1) * pageSize;
            return await _context.Questions.Skip(skip).Take(pageSize).Include(q => q.Answers)
                .ToListAsync();
        }

        public async Task<int> GetCount()
        {
            return await _context.Questions.CountAsync();
        }
    }
}
