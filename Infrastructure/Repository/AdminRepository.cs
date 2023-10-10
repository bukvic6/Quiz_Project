﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using QuizProject.Domain.Data;
using QuizProject.Domain.Model;
using QuizProject.Infrastructure.Repository.IRepository;

namespace QuizProject.Infrastructure.Repository
{
    public class AdminRepository : IAdminRepository
    {

        private readonly ILogger<AdminRepository> _logger;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public AdminRepository(ILogger<AdminRepository> logger, ApplicationDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _logger = logger;
            _context = context;
        }

        public async Task ChangeAnswers(ICollection<Answer> answers)
        {
            await _context.Answers.AddRangeAsync(answers);
            await _context.SaveChangesAsync();
        }

        public async Task<int> ChangeQuestion(Question questionEntity)
        {
            _context.Entry(questionEntity).State = EntityState.Modified;
            return await _context
                .SaveChangesAsync();
        }

        public async Task CreateAnswers(List<Answer> answers)
        {
            await _context.Answers.AddRangeAsync(answers);
            await _context.SaveChangesAsync();
        }

        public async Task<Question> CreateQuestion(Question question)
        {
            await _context.Questions
                .AddAsync(question);
            await _context
                .SaveChangesAsync();
            return question;
        }

        public async Task<bool> DeleteAnswer(int id)
        {
            try
            {
                _context.Answers.Remove(new Answer { Id = id });
                 await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }

        public async Task<bool> DeleteQuestion(int id)
        {
            try
            {
                var question = new Question { Id = id };
                _context.Questions
                    .Attach(question);
                question.IsDeleted = true;
                await _context
                    .SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }

        public async Task<List<Question>> GetAllQuestions()
        {
            return await _context.Questions.Include(q => q.Answers)
                .ToListAsync();
        }
    }
}