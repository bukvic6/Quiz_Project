namespace QuizProject.Domain.Model
{
    public class Question
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public string Answers { get; set; }
        public int RightAnswer { get; set; }
        public bool IsDeleted { get; set; }
    }
}
