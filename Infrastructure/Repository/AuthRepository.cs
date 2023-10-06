using Microsoft.EntityFrameworkCore;
using QuizProject.Domain.Data;
using QuizProject.Domain.Model;
using QuizProject.Infrastructure.Repository.IRepository;

namespace QuizProject.Infrastructure.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ApplicationDbContext _context;
        public AuthRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<User?> GetUserByUsername(string email)
        {

            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);

        }
    }
}
