using QuizProject.Domain.Model;

namespace QuizProject.Infrastructure.Repository.IRepository
{
    public interface IAuthRepository
    {
        public Task<User?> GetUserByUsername(string email);
    }
}
