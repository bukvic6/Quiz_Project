using QuizProject.Domain.Model.ModelDTO;
using QuizProject.Infrastructure.Repository.IRepository;
using QuizProject.Infrastructure.Service.IService;
using Microsoft.Extensions.Configuration;

namespace QuizProject.Infrastructure.Service
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;
        private readonly IJwtService _jwtService;

        public AuthService(IAuthRepository authRepository, IConfiguration configuration, IJwtService jwtService)
        {
            _authRepository = authRepository;
            _configuration = configuration;
            _jwtService = jwtService;
        }

        public async Task<LoginResponse> Login(UserDTO userDTO)
        {
            var user = await _authRepository.GetUserByUsername(userDTO.Email);

            if (!_jwtService.VerifyPassword(userDTO.Password, user.Password, user.PasswordSalt))
            {
                throw new UnauthorizedAccessException();
            }
            string token = _jwtService.GenerateJwt(user);
            LoginResponse loginResponse = new LoginResponse
            {
                Email = user.Email,
                Role = user.Role.ToString(),
                Token = token
            };

            return loginResponse;
        }
    }
}
