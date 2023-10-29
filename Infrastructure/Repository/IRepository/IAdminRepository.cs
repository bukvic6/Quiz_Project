using QuizProject.Domain.Model;
using QuizProject.Domain.Model.ModelDTO;

namespace QuizProject.Infrastructure.Repository.IRepository
{
    public interface IAdminRepository
    {
        public Task ChangeAnswers(ICollection<Answer> answers);
        public Task<int> ChangeQuestion(Question questionEntity);
        public Task<Question> CreateQuestion(Question question);
        public Task<bool> DeleteAnswers(List<int> answersToDelete);
        public Task<bool> DeleteQuestion(int id);
        public Task<List<Question>> GetQuestions(int pageNumber, int pageSize, string? param);
        public Task<int> GetQuestionCount(string? param);
        public Task<List<QuizResults>> GetResults(int pn, int ps,string? startDate, string? endDate, string role, string email);
        public Task<List<User>> GetUsers(int pageNumber, int pageSize, string? param);
        public Task<int> GetResultCount();
        public Task<List<StatsDTO>> GetStatistic();
        public Task<int> GetUserCount();
    }
}
