using AutoMapper;
using QuizProject.Domain.Model;
using QuizProject.Domain.Model.ModelDTO;

namespace QuizProject.MappingConfigurations
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Question, QuestionDTO>()
                .ForMember(dest => dest.Answers, opt => opt.MapFrom(src => src.Answers.ToList()));
            CreateMap<Answer, AnswersDTO>().PreserveReferences();

            CreateMap<AnswersDTO, Answer>().PreserveReferences();
            CreateMap<QuestionDTO, Answer>()
                .ForMember(dest => dest.QuestionId, otp => otp.MapFrom(src => src.Id))
                .ForMember(dest => dest.AnswerText, otp => otp.MapFrom(src => src.Answers.ToList()));

            CreateMap<QuestionDTO, Question>();
            CreateMap<Question, QuestionsForUserDTO>()
                .ForMember(dest => dest.Answers, otp => otp.MapFrom(src => src.Answers.ToList()));

            CreateMap<QuestionsForUserDTO, Question>();
            CreateMap<QuizResults, ResultsDTO>()
            .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User != null ? src.User.Name : ""))
            .ForMember(dest => dest.Points, opt => opt.MapFrom(src => src.Points));

            CreateMap<User, UserListDTO>();
            CreateMap<UserListDTO, User>();


        }
    }
}
