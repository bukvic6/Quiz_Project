﻿using QuizProject.Domain.Model;
using QuizProject.Domain.Model.ModelDTO;

namespace QuizProject.Infrastructure.Service.IService
{
    public interface IUserService
    {
        public Task<bool> CalculateScore(List<UserAnswer> answer, string email);
        public Task<List<QuestionsForUserDTO>> GetQuestions();
        public Task<List<ResultsDTO>> GetResults();
    }
}