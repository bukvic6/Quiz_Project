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
        public async Task<bool> DeleteAnswer(int id)
        {
            return await _adminRepository.DeleteAnswer(id);
        }

        public async Task<List<QuestionDTO>> GetQuestions()
        {
            var questions = await _adminRepository.GetAllQuestions();
            var questionListDTO = _mapper.Map<List<QuestionDTO>>(questions);
            return questionListDTO;
        }
    }
}
