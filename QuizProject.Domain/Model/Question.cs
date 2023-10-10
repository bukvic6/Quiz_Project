using System.ComponentModel.DataAnnotations.Schema;

namespace QuizProject.Domain.Model
{
    public class Question
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public ICollection<Answer> Answers { get; } = new List<Answer>();
        public int RightAnswer { get; set; }
        public bool IsDeleted { get; set; }
    }
}
