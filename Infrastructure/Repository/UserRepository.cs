using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using QuizProject.Domain.Data;
using QuizProject.Domain.Model;
using QuizProject.Infrastructure.Repository.IRepository;

namespace QuizProject.Infrastructure.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ILogger<UserRepository> _logger;
        private readonly ApplicationDbContext _context;

        public UserRepository(ILogger<UserRepository> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task AddToResults(QuizResults quizzResults)
        {
            await _context.QuizzResults
                .AddAsync(quizzResults);

            await _context
                .SaveChangesAsync();
        }

        public async Task<List<Question>> GetAllQuestions()
        {

            return await _context.Questions.Include(q => q.Answers)
                .ToListAsync();
        }


        public async Task<List<QuizResults>> GetTopResults(int topNumber)
        {
            var results = await _context.QuizzResults
                .OrderBy(e => e.Points)
                .OrderByDescending(e => e.Points)
                .Take(topNumber)
                .Include(b => b.User)
                .ToListAsync();
            return results;
        }

        public async Task<User?> GetUserByUsername(string email)
        {
            User? userByUsername = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);
            return userByUsername;
        }

        public void UpdateQuestionCount(Question question)
        {
            _context.Entry(question).State = EntityState.Modified;
        }
        public async Task<int> GetCount(string email, string startDate, string endDate)
        {
            User? user = await GetUserByUsername(email);
            if (!String.IsNullOrEmpty(startDate) && !String.IsNullOrEmpty(endDate))
            {
                var parsedStartDate = DateTime.Parse(startDate);
                var parsedEndDate = DateTime.Parse(endDate);
                return await _context.QuizzResults
                    .Where(r => r.User == user && r.Date >= parsedStartDate && r.Date < parsedEndDate)
                    .CountAsync();
            }
            return await _context.QuizzResults
                .Where(e => e.User == user)
                .CountAsync();
        }

        public async Task<int> GetResultsCount(string startDate, string endDate)
        {
            if (!String.IsNullOrEmpty(startDate) && !String.IsNullOrEmpty(endDate))
            {
                var parsedStartDate = DateTime.Parse(startDate);
                var parsedEndDate = DateTime.Parse(endDate);
                return await _context.QuizzResults
                    .Where(r => r.Date >= parsedStartDate && r.Date < parsedEndDate)
                    .CountAsync();
            }
            return await _context.QuizzResults
            .CountAsync();


        }
    }
}
