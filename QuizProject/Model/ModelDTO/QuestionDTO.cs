namespace QuizProject.Model.ModelDTO
{
    public class QuestionDTO
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public string Answers { get; set; }
        public int RightAnswer { get; set; }
    }
}
