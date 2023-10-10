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

        public async Task<List<QuizResults>> GetResults()
        {
            var results = await _context.QuizzResults
                .Include(b => b.User)
                .ToListAsync();
            return results;
        }

        public async Task<User?> GetUserByUsername(string email)
        {
            User? userByUsername = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            return userByUsername;
        }

    }
}
