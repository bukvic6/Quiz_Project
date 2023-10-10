using QuizProject.Domain.Model;
using System.Security.Cryptography;

namespace QuizProject.Domain.Data.DbInitializer
{
    public class DbInitializer : IDbInitializer
    {
        private readonly ApplicationDbContext _context;

        public DbInitializer(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Initialize()
        {
            _context.Database.EnsureCreated();

            if (_context.Users.Any())
            {
                return;
            }

            var salt = RandomNumberGenerator.GetBytes(128 / 8);
            var hash = Rfc2898DeriveBytes.Pbkdf2("Admin123", salt, 10000, HashAlgorithmName.SHA256, 256 / 8);
            var saltUser = RandomNumberGenerator.GetBytes(128 / 8);
            var hashUser = Rfc2898DeriveBytes.Pbkdf2("User123", saltUser, 10000, HashAlgorithmName.SHA256, 256 / 8);
            var users = new User[]
            {
                new User{ Name = "Admin", Email = "admin@gmail.com", Password = Convert.ToBase64String(hash),PasswordSalt = Convert.ToBase64String(salt), Role = Role.ADMIN},
                new User{ Name = "User", Email = "user@gmail.com", Password = Convert.ToBase64String(hashUser),PasswordSalt = Convert.ToBase64String(saltUser), Role = Role.USER}
            };
            foreach (User user in users)
            {
                _context.Users.Add(user);
            }
            _context.SaveChanges();
            var answers = new Answer[]
{
                new Answer{Id = 1, QuestionId = 1, AnswerText = "2"},
                new Answer{Id = 2, QuestionId = 1, AnswerText = "4"},
                new Answer{Id = 3,QuestionId = 1, AnswerText = "5"},
                new Answer{Id = 4, QuestionId = 1, AnswerText = "7"},

                new Answer{Id = 5,QuestionId = 2,AnswerText = "3"},
                new Answer{Id = 6, QuestionId = 2, AnswerText = "7"},
                new Answer{Id = 7, QuestionId = 2,AnswerText = "5"},
                new Answer{Id = 8, QuestionId = 2, AnswerText = "6"},

                new Answer{Id = 9, QuestionId = 3,AnswerText = "5"},
                new Answer{Id = 10, QuestionId = 3, AnswerText = "7"},
                new Answer{Id = 11, QuestionId = 3,AnswerText = "6"},
                new Answer{Id = 12, QuestionId = 3, AnswerText = "2"},
};

            foreach (Answer answer in answers)
            {
                _context.Answers.Add(answer);
            }
            _context.SaveChanges();
            var questions = new Question[]
            {
                new Question{QuestionText = "2 + 2" , RightAnswer = 2},
                new Question{QuestionText = "2 + 5" , RightAnswer = 4},
                new Question{QuestionText = "2 + 3" , RightAnswer = 1},
            };
            foreach (Question question in questions)
            {
                _context.Questions.Add(question);
            }
            _context.SaveChanges();


        }
    }
}
