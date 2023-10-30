using QuizProject.Domain.Model.ModelDTO;

namespace QuizProject.Infrastructure.Service.IService
{
    public interface IAdminService
    {
        public Task<int> ChangeQuestion(QuestionDTO questionDTO);
        public Task<QuestionDTO> CreateQuestion(QuestionDTO question);
        public Task<bool> DeleteQuestion(int id);
        public Task<List<QuestionDTO>> GetQuestions(int pageNumber, int pageSize, string? param);
        public Task<int> GetCount(string? param);
        public Task<bool> DeleteAnswers(List<int> answersToDelete);
        public Task<List<ResultsDTO>> GetResults(int pn, int ps, string? startDate, string? endDate, string role, string email);

        public Task<List<UserListDTO>> GetUsers(string? search);
        public Task<int> GetResultCount();
        public Task<List<StatsDTO>> GetStatistic();
        public Task<int> GetUserCount();
    }
}
