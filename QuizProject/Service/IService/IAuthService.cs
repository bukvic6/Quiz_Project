using Microsoft.AspNetCore.Mvc;
using QuizProject.Model.ModelDTO;

namespace QuizProject.Service.IService
{
    public interface IAuthService
    {
        public Task<LoginResponse> Login(UserDTO userDTO);
    }
}
