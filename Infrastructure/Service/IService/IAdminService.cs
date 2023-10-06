using QuizProject.Domain.Model.ModelDTO;

namespace QuizProject.Infrastructure.Service.IService
{
    public interface IAdminService
    {
        public Task<int> ChangeQuestion(QuestionDTO questionDTO);
        public Task<QuestionDTO> CreateQuestion(QuestionDTO question);
        public Task<bool> DeleteQuestion(int id);
        public Task<List<QuestionDTO>> GetQuestions();
    }
}
