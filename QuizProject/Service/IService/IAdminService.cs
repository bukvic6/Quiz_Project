using Microsoft.AspNetCore.Mvc;
using QuizProject.Model.ModelDTO;

namespace QuizProject.Service.IService
{
    public interface IAdminService
    {
        public Task<QuestionDTO> CreateQuestion(QuestionDTO question);
        public Task<bool> DeleteQuestion(int id);
        public Task<List<QuestionDTO>> GetQuestions();
    }
}
