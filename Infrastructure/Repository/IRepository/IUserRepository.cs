﻿using QuizProject.Domain.Model;

namespace QuizProject.Infrastructure.Repository.IRepository
{
    public interface IUserRepository
    {
        public Task<List<Question>> GetAllQuestions();
        public Task<User?> GetUserByUsername(string email);
        public Task AddToResults(QuizResults quizzResults);
        public Task<List<QuizResults>> GetTopResults(int topNumber);
        public Task<List<QuizResults>> GetUserResults(string email, int pn, int ps);
        public Task<int> GetCount(string email);
        public Task<int> GetResultsCount();
        public void UpdateQuestionCount(Question question);



    }
}
