using AutoMapper;
using Microsoft.Extensions.Logging;
using QuizProject.Domain.Model;
using QuizProject.Domain.Model.ModelDTO;
using QuizProject.Infrastructure.Repository;
using QuizProject.Infrastructure.Repository.IRepository;
using QuizProject.Infrastructure.Service.IService;

namespace QuizProject.Infrastructure.Service
{
    public class AdminService : IAdminService
    {

        private readonly ILogger<AdminRepository> _logger;
        private readonly IAdminRepository _adminRepository;
        private readonly IMapper _mapper;

        public AdminService(ILogger<AdminRepository> logger, IAdminRepository adminRepository, IMapper mapper)
        {
            _logger = logger;
            _adminRepository = adminRepository;
            _mapper = mapper;
        }

        public async Task<int> ChangeQuestion(QuestionDTO questionDTO)
        {
            var questionEntity = _mapper.Map<QuestionDTO, Question>(questionDTO);
            var cretaed = await _adminRepository.ChangeQuestion(questionEntity);
            await _adminRepository.ChangeAnswers(questionEntity.Answers);
            return cretaed;
        }

        public async Task<QuestionDTO> CreateQuestion(QuestionDTO question)
        {
            var questionEntity = _mapper.Map<QuestionDTO, Question>(question);
            var cretaed = await _adminRepository.CreateQuestion(questionEntity);
            var createdDTO = _mapper.Map<Question, QuestionDTO>(cretaed);
            return createdDTO;
        }

        public async Task<bool> DeleteQuestion(int id)
        {
            return await _adminRepository.DeleteQuestion(id);
        }

        public async Task<List<QuestionDTO>> GetQuestions(int pageNumber, int pageSize, string? param)
        {
            var questions = await _adminRepository.GetQuestions(pageNumber, pageSize, param);                   
            var questionListDTO = _mapper.Map<List<QuestionDTO>>(questions);
            return questionListDTO;
        }
        public async Task<List<UserListDTO>> GetUsers(int pageNumber, int pageSize, string? param)
        {
            var users = await _adminRepository.GetUsers(pageNumber, pageSize, param);
            var usersListDTO = _mapper.Map<List<UserListDTO>>(users);
            return usersListDTO;
        }

        public async Task<List<ResultsDTO>> GetResults(int pageNumber, int pageSize, string? startDate, string? endDate, string role, string email)
        {
            var results = await _adminRepository.GetResults(pageNumber, pageSize, startDate,endDate, role, email);
            var resultsDTO = _mapper.Map<List<ResultsDTO>>(results);
            return resultsDTO;
        }

        public async Task<int> GetCount(string? param)
        {
            return await _adminRepository.GetQuestionCount(param);
        }

        public async Task<bool> DeleteAnswers(List<int> answersToDelete)
        {
            return await _adminRepository.DeleteAnswers(answersToDelete);
        }

        public async Task<int> GetResultCount()
        {
            return await _adminRepository.GetResultCount();
        }

        public async Task<List<StatsDTO>> GetStatistic()
        {
            return await _adminRepository.GetStatistic();            
        }

        public async Task<int> GetUserCount()
        {
            return await _adminRepository.GetUserCount();
        }
    }
}
