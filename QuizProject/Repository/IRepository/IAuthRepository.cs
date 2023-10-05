using QuizProject.Model;

namespace QuizProject.Repository.IRepository
{
    public interface IAuthRepository
    {
        public Task<User> GetUserByUsername(string email);
    }
}
