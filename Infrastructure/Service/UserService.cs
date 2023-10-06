using AutoMapper;
using Microsoft.Extensions.Logging;
using QuizProject.Domain.Model;
using QuizProject.Domain.Model.ModelDTO;
using QuizProject.Infrastructure.Repository.IRepository;
using QuizProject.Infrastructure.Service.IService;
using System.Collections.Generic;

namespace QuizProject.Infrastructure.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UserService> _logger;
        private readonly IMapper _mapper;


        public UserService(IUserRepository userRepository, ILogger<UserService> logger, IMapper mapper)
        {
            _userRepository = userRepository;
            _logger = logger;
            _logger.LogInformation("UserService called");
            _mapper = mapper;

        }

        public async Task<bool> CalculateScore(List<UserAnswer> answer, string email)
        {
            int calculateScore = 0;
            var questions = await _userRepository.GetAllQuestions();

            foreach (var userAnswer in answer)
            {
                int questionID = userAnswer.QuestionId;
                int checkAnswer = userAnswer.SelectedAnswerId;
                Question question = questions.FirstOrDefault(q => q.Id == questionID)!;
                if (question != null)
                {
                    if (checkAnswer == question.RightAnswer)
                    {
                        calculateScore += 1;
                    }
                }
                else
                {
                    return false;
                }
            }
            try
            {
                var user = await _userRepository.GetUserByUsername(email);
                QuizResults quizzResults = new QuizResults { User = user, Points = calculateScore };
                await _userRepository.AddToResults(quizzResults);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return false;
            }
        }

        public async Task<List<QuestionsForUserDTO>> GetQuestions()
        {
            var questions = await _userRepository.GetAllQuestions();
            var questionListDTO = _mapper.Map<List<QuestionsForUserDTO>>(questions);
            return questionListDTO;
        }

        public async Task<List<ResultsDTO>> GetResults()
        {
            var results = await _userRepository.GetResults();
            var resultsDTO = _mapper.Map<List<ResultsDTO>>(results);
            return resultsDTO;
        }
    }
}
