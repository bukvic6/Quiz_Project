using AutoMapper;
using QuizProject.Model;
using QuizProject.Model.ModelDTO;
using QuizProject.Repository;
using QuizProject.Repository.IRepository;
using QuizProject.Service.IService;

namespace QuizProject.Service
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

        public async Task<List<QuestionDTO>> GetQuestions()
        {
            var questions = await _adminRepository.GetAllQuestions();
            var questionListDTO = _mapper.Map<List<QuestionDTO>>(questions);
            return questionListDTO;
        }
    }
}
