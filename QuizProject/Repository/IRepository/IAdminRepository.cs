using Microsoft.AspNetCore.Mvc;
using QuizProject.Model;
using QuizProject.Model.ModelDTO;

namespace QuizProject.Repository.IRepository
{
    public interface IAdminRepository
    {
        public Task<Question> CreateQuestion(Question question);
        public Task<bool> DeleteQuestion(int id);
        public Task<List<Question>> GetAllQuestions();
    }
}
