using QuizProject.Domain.Model;

namespace QuizProject.Infrastructure.Repository.IRepository
{
    public interface IUserRepository
    {
        public Task<List<Question>> GetAllQuestions();
        public Task<User?> GetUserByUsername(string email);
        public Task AddToResults(QuizResults quizzResults);
        public Task<List<QuizResults>> GetTopResults(int topNumber);
        public Task<int> GetCount(string email, string startDate, string endDate);
        public Task<int> GetResultsCount(string startDate, string endDate);
        public void UpdateQuestionCount(Question question);



    }
}
