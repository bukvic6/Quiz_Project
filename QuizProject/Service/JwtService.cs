using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using QuizProject.Model;
using QuizProject.Service.IService;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace QuizProject.Service
{
    public class JwtService : IJwtService
    {
        private readonly JwtOptions _options;
        public JwtService(IOptions<JwtOptions> options)
        {
            _options = options.Value;
        }

        public string GenerateJwt(User user)
        {
            var claims = new Claim[]
            {
                new Claim("email", user.Email),
                new Claim("role", user.Role.ToString()),
            };
            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_options.SecretKey)
                    ), SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _options.Issuer,
                _options.Audience,
                claims,
                null,
                DateTime.UtcNow.AddHours(1),
                signingCredentials);
            string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenValue;
        }

        public bool VerifyPassword(string password, string hashedPassword, string passSalt)
        {

            var salt = Convert.FromBase64String(passSalt);
            var hash = Convert.FromBase64String(hashedPassword);

            var hashInput = Rfc2898DeriveBytes.Pbkdf2(password, salt, 10000, HashAlgorithmName.SHA256, 256 / 8);
            return CryptographicOperations.FixedTimeEquals(hash, hashInput);
        }
    }
}

