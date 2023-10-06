using QuizProject.Domain.Model.ModelDTO;

namespace QuizProject.Infrastructure.Service.IService
{
    public interface IAuthService
    {
        public Task<LoginResponse> Login(UserDTO userDTO);
    }
}
