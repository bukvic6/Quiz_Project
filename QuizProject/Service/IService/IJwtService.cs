using QuizProject.Model;

namespace QuizProject.Service.IService
{
    public interface IJwtService
    {
        public bool VerifyPassword(string password, string hashedPassword, string passSalt);
        public string GenerateJwt(User user);
    }
}
