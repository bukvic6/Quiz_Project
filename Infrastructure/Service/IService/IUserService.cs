using QuizProject.Domain.Model;
using QuizProject.Domain.Model.ModelDTO;

namespace QuizProject.Infrastructure.Service.IService
{
    public interface IUserService
    {
        public Task<int> CalculateScore(List<UserAnswer> answer, string email);
        public Task<int> GetCount(string email);
        public Task<List<QuestionsForUserDTO>> GetQuestions();
        public Task<List<ResultsDTO>> GetTopResults(int topNumber);
        public Task<List<ResultsDTO>> UserResults(string email, int pn, int ps);
    }
}
