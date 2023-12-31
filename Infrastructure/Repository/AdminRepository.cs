﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using QuizProject.Domain.Data;
using QuizProject.Domain.Model;
using QuizProject.Domain.Model.ModelDTO;
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

        public async Task AddAnswers(ICollection<Answer> answers)
        {
            foreach (Answer answer in answers)
            {
                await _context.Answers
                    .AddAsync(answer);        
            }
            await _context
                .SaveChangesAsync();
        }

        public async Task<int> ChangeQuestion(Question questionEntity)
        {
            var existingQuestion = await _context.Questions
                .AsNoTracking()
                .FirstOrDefaultAsync(q => q.Id == questionEntity.Id);

            if (existingQuestion != null)
            {
                existingQuestion.QuestionText = questionEntity.QuestionText;
                existingQuestion.RightAnswer = questionEntity.RightAnswer;

                _context.Entry(existingQuestion).State = EntityState.Modified;

                try
                {
                    return await _context
                        .SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "An error occurred: {ErrorMessage}", ex.Message);
                    return 0;
                }
            }
            else
            {
                return 0;
            }
        }

        public async Task<Question> CreateQuestion(Question question)
        {
            await _context.Questions
                .AddAsync(question);
            await _context
                .SaveChangesAsync();
            return question;
        }

        public async Task<bool> DeleteAnswers(List<int> ids)
        {
            try
            {
                _context.Answers
                    .RemoveRange(ids.Select(id => new Answer { Id = id }));
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

        public async Task<List<QuizResults>> GetResults(int pageNumber, int pageSize, string? startDate, string? endDate, string role, string email)
        {
            int skip = (pageNumber - 1) * pageSize;


            if (!String.IsNullOrEmpty(startDate) && !String.IsNullOrEmpty(endDate))
            {
                var parsedStartDate = DateTime.Parse(startDate);
                var parsedEndDate = DateTime.Parse(endDate);
                if ( role == "ADMIN")
                {
                    return await _context.QuizzResults
                        .Where(r => r.Date >= parsedStartDate && r.Date < parsedEndDate)
                        .Skip(skip)
                        .Take(pageSize)
                        .Include(b => b.User)
                        .ToListAsync();                   
                }
                else if (role == "USER")
                {
                    User? user = await _context.Users
                        .FirstOrDefaultAsync(u => u.Email == email);
                    var userResult = await _context.QuizzResults
                        .OrderBy(e => e.Points)
                        .OrderByDescending(e => e.Points)
                        .Where(r => r.User == user && r.Date >= parsedStartDate && r.Date < parsedEndDate)
                        .Skip(skip)
                        .Take(pageSize)
                        .ToListAsync();
                    return userResult;
                }

            }
            if (role == "USER")
            {
                User? user = await _context.Users
                        .FirstOrDefaultAsync(u => u.Email == email);
                return await _context.QuizzResults
                .OrderBy(e => e.Points)
                .OrderByDescending(e => e.Points)
                .Where(e => e.User == user)
                .Skip(skip)
                .Take(pageSize)
                .ToListAsync();
            }
            return await _context.QuizzResults
                .Skip(skip)
                .Take(pageSize)
                .Include(b => b.User)
                .ToListAsync();                
        }

        public async Task<List<Question>> GetQuestions(int pageNumber, int pageSize, string? param)
        {
            int skip = (pageNumber - 1) * pageSize;
            if (!String.IsNullOrEmpty(param))
            {
                return await _context.Questions
                    .Where(q => q.QuestionText.Contains(param) || q.RightAnswer.Contains(param))
                    .Skip(skip)
                    .Take(pageSize)
                    .Include(q => q.Answers)
                    .ToListAsync();
            }
            else
            {
                return await _context.Questions
                    .Skip(skip)
                    .Take(pageSize)
                    .Include(q => q.Answers)
                    .ToListAsync();
            }
        }

        public async Task<int> GetQuestionCount(string? param)
        {
            if (!String.IsNullOrEmpty(param))
            {
                return await _context.Questions
                    .Where(q => q.QuestionText.Contains(param) || q.RightAnswer.Contains(param))
                    .CountAsync();
            }
            else
            {
                return await _context.Questions
                    .CountAsync();
            }
        }

        public async Task<List<User>> GetUsers(string? param)
        {
            if (!String.IsNullOrEmpty(param))
            {
                return await _context.Users
                    .Where(q => q.Name.Contains(param) || q.Email.Contains(param))
                    .ToListAsync();
            }
            else
            {
                return await _context.Users
                    .ToListAsync();
            }
        }
        public async Task<List<StatsDTO>> GetStatistic()
        {
            return await _context.Questions.Select(x => new StatsDTO { QuestionText = x.QuestionText, CorrectCount = x.CorrectCount, WrongCount = x.WrongCount}).ToListAsync();

        }

        public async Task<int> GetResultCount()
        {
            return await _context.QuizzResults
                .CountAsync();
        }

        public async Task<int> GetUserCount()
        {
            return await _context.Users
                .CountAsync();
        }
    }
}
