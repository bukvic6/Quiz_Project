using QuizProject.Domain.Model;

namespace QuizProject.Infrastructure.Repository.IRepository
{
    public interface IAdminRepository
    {
        public Task<int> ChangeQuestion(Question questionEntity);
        public Task<Question> CreateQuestion(Question question);
        public Task<bool> DeleteQuestion(int id);
        public Task<List<Question>> GetAllQuestions();
    }
}
