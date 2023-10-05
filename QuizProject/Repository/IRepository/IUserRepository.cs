using QuizProject.Model;

namespace QuizProject.Repository.IRepository
{
    public interface IUserRepository
    {
        public Task<List<Question>> GetAllQuestions();
        public Task<User> GetUserByUsername(string email);
        public Task AddToResults(QuizResults quizzResults);
        public Task<List<QuizResults>> GetResults();
    }
}
