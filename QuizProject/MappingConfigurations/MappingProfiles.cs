using AutoMapper;
using QuizProject.Model;
using QuizProject.Model.ModelDTO;

namespace QuizProject.MappingConfigurations
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() 
        {
            CreateMap<Question, QuestionDTO>();
            CreateMap<QuestionDTO, Question>();
            CreateMap<Question, QuestionsForUserDTO>();
            CreateMap<QuestionsForUserDTO, Question>();
            CreateMap<QuizResults, ResultsDTO>()
            .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User != null ? src.User.Name : ""))
            .ForMember(dest => dest.Points, opt => opt.MapFrom(src => src.Points));
        }
    }
}
