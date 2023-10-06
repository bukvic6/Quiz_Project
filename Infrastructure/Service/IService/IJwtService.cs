using QuizProject.Domain.Model;

namespace QuizProject.Infrastructure.Service.IService
{
    public interface IJwtService
    {
        public bool VerifyPassword(string password, string hashedPassword, string passSalt);
        public string GenerateJwt(User user);
    }
}
