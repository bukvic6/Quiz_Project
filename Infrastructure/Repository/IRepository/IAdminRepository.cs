using QuizProject.Domain.Model;

namespace QuizProject.Infrastructure.Repository.IRepository
{
    public interface IAdminRepository
    {
        public Task ChangeAnswers(ICollection<Answer> answers);
        public Task<int> ChangeQuestion(Question questionEntity);
        public Task<Question> CreateQuestion(Question question);
        Task<bool> DeleteAnswer(int id);
        public Task<bool> DeleteQuestion(int id);
        public Task<List<Question>> GetAllQuestions();
    }
}
