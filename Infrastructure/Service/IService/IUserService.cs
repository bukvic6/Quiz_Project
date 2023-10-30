using QuizProject.Domain.Model;
using QuizProject.Domain.Model.ModelDTO;

namespace QuizProject.Infrastructure.Service.IService
{
    public interface IUserService
    {
        public Task<int> CalculateScore(List<UserAnswer> answer, string email);
        public Task<int> GetCount(string? startDate,string? endDate, string email, string role);
        public Task<List<QuestionsForUserDTO>> GetQuestions();
        public Task<List<ResultsDTO>> GetTopResults(int topNumber);
    }
}
