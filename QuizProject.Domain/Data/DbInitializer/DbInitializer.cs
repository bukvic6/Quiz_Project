using QuizProject.Domain.Model;
using System.Collections.Generic;
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
            var saltMarko = RandomNumberGenerator.GetBytes(128 / 8);
            var hashMarko = Rfc2898DeriveBytes.Pbkdf2("Marko123", saltMarko, 10000, HashAlgorithmName.SHA256, 256 / 8);
            var saltPera = RandomNumberGenerator.GetBytes(128 / 8);
            var hashPera = Rfc2898DeriveBytes.Pbkdf2("Pera123", saltPera, 10000, HashAlgorithmName.SHA256, 256 / 8);
            var saltZika = RandomNumberGenerator.GetBytes(128 / 8);
            var hashZika = Rfc2898DeriveBytes.Pbkdf2("Zika123", saltZika, 10000, HashAlgorithmName.SHA256, 256 / 8);
            var saltMiki = RandomNumberGenerator.GetBytes(128 / 8);
            var hashMiki = Rfc2898DeriveBytes.Pbkdf2("Miki123", saltZika, 10000, HashAlgorithmName.SHA256, 256 / 8);
            var users = new User[]
            {
                new User{ Name = "Admin", Email = "admin@gmail.com", Password = Convert.ToBase64String(hash),PasswordSalt = Convert.ToBase64String(salt), Role = Role.ADMIN},
                new User{ Name = "Marko", Email = "marko@gmail.com", Password = Convert.ToBase64String(hashMarko),PasswordSalt = Convert.ToBase64String(saltMarko), Role = Role.USER},
                new User{ Name = "Pera", Email = "pera@gmail.com", Password = Convert.ToBase64String(hashPera),PasswordSalt = Convert.ToBase64String(saltPera), Role = Role.USER},
                new User{ Name = "Zika", Email = "zika@gmail.com", Password = Convert.ToBase64String(hashZika),PasswordSalt = Convert.ToBase64String(saltZika), Role = Role.USER},
                new User{ Name = "Miki", Email = "miki@gmail.com", Password = Convert.ToBase64String(hashMiki),PasswordSalt = Convert.ToBase64String(saltMiki), Role = Role.USER}
            };
            foreach (User user in users)
            {
                _context.Users.Add(user);
            }
            _context.SaveChanges();
            var questions = new Question[]
            {
                new Question{QuestionText = "2 + 2" , RightAnswer = "4"},
                new Question{QuestionText = "2 + 5" , RightAnswer = "7"},
                new Question{QuestionText = "2 + 3" , RightAnswer = "5"},
            };
            foreach (Question question in questions)
            {
                _context.Questions.Add(question);
            }
            _context.SaveChanges();
            var answers = new Answer[]
{
                new Answer{QuestionId = 1, AnswerText = "2"},
                new Answer{QuestionId = 1, AnswerText = "4"},
                new Answer{QuestionId = 1, AnswerText = "5"},
                new Answer{QuestionId = 1, AnswerText = "7"},

                new Answer{QuestionId = 2,AnswerText = "3"},
                new Answer{QuestionId = 2, AnswerText = "7"},
                new Answer{QuestionId = 2,AnswerText = "5"},
                new Answer{QuestionId = 2, AnswerText = "6"},

                new Answer{QuestionId = 3,AnswerText = "5"},
                new Answer{QuestionId = 3, AnswerText = "7"},
                new Answer{QuestionId = 3,AnswerText = "6"},
                new Answer{QuestionId = 3, AnswerText = "2"},
};

            foreach (Answer answer in answers)
            {
                _context.Answers.Add(answer);
            }
            _context.SaveChanges();


        }
    }
}
