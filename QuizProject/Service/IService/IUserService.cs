using Microsoft.AspNetCore.Mvc;
using QuizProject.Model;
using QuizProject.Model.ModelDTO;

namespace QuizProject.Service.IService
{
    public interface IUserService
    {
        public Task<bool> CalculateScore(List<UserAnswer> answer, string email);
        public Task<List<QuestionsForUserDTO>> GetQuestions();
        public Task<List<ResultsDTO>> GetResults();
    }
}
