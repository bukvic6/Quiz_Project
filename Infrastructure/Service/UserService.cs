using AutoMapper;
using Microsoft.Extensions.Logging;
using QuizProject.Domain.Model;
using QuizProject.Domain.Model.ModelDTO;
using QuizProject.Infrastructure.Repository;
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

        public async Task<int> CalculateScore(List<UserAnswer> answer, string email)
        {
            int calculateScore = 0;
            var questions = await _userRepository.GetAllQuestions();
            int questionLenght = questions.Count;

            foreach (var userAnswer in answer)
            {
                int questionID = userAnswer.QuestionId;
                string checkAnswer = userAnswer.userAnswer;
                Question question = questions.FirstOrDefault(q => q.Id == questionID)!;
                if (question != null)
                {
                    if (checkAnswer.Equals(question.RightAnswer))
                    {
                        calculateScore += 1;
                    }
                }
                else
                {
                    return 0;
                }
            }
            int percentage = (int)Math.Round((double)(100 * calculateScore) / questionLenght);

            try
            {
                var user = await _userRepository.GetUserByUsername(email);
                var timeNow = DateTime.Now;
                string rating = calculateScore + " / " + questionLenght;
                QuizResults quizzResults = new QuizResults { User = user, Points = calculateScore,Date = timeNow,Rating = rating,Percentage = percentage};
                await _userRepository.AddToResults(quizzResults);
                return percentage;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return 0;
            }
        }

        public async Task<int> GetCount(string email)
        {
            int count = await _userRepository.GetCount(email);
            return count;
        }

        public async Task<List<QuestionsForUserDTO>> GetQuestions()
        {
            var questions = await _userRepository.GetAllQuestions();
            var questionListDTO = _mapper.Map<List<QuestionsForUserDTO>>(questions);
            return questionListDTO;
        }

        public async Task<List<ResultsDTO>> GetTopResults(int topNumber)
        {
            var results = await _userRepository.GetTopResults(topNumber);
            var resultsDTO = _mapper.Map<List<ResultsDTO>>(results);
            return resultsDTO;
        }

        public async Task<List<ResultsDTO>> UserResults(string email, int pageNumber, int pageSize)
        {
            var results = await _userRepository.GetUserResults(email, pageNumber, pageSize);
            var resultsDTO = _mapper.Map<List<ResultsDTO>>(results);
            return resultsDTO;
        }
    }
}
