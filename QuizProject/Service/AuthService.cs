using Microsoft.IdentityModel.Tokens;
using QuizProject.Model.ModelDTO;
using System.Security.Claims;
using QuizProject.Repository.IRepository;
using QuizProject.Service.IService;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using QuizProject.Model;
using Microsoft.Extensions.Options;

namespace QuizProject.Service
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
