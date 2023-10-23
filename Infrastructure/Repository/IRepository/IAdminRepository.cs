using QuizProject.Domain.Model;

namespace QuizProject.Infrastructure.Repository.IRepository
{
    public interface IAdminRepository
    {
        public Task ChangeAnswers(ICollection<Answer> answers);
        public Task<int> ChangeQuestion(Question questionEntity);
        public Task<Question> CreateQuestion(Question question);
        Task<bool> DeleteAnswers(List<int> answersToDelete);
        public Task<bool> DeleteQuestion(int id);
        public Task<List<Question>> GetAllQuestions(int pageNumber, int pageSize);
        public Task<int> GetQuestionCount();
        public Task<List<QuizResults>> GetResults(int pn, int ps);

    }
}
