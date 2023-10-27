using System.ComponentModel.DataAnnotations.Schema;

namespace QuizProject.Domain.Model
{
    public class Question
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public ICollection<Answer> Answers { get; } = new List<Answer>();
        public string RightAnswer { get; set; }
        public int CorrectCount { get; set; }
        public int WrongCount { get; set; }
        public bool IsDeleted { get; set; }
    }
}
