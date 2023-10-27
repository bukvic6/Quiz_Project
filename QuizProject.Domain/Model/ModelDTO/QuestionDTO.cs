namespace QuizProject.Domain.Model.ModelDTO
{
    public class QuestionDTO
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public List<AnswersDTO> Answers { get; set; }
        public string RightAnswer { get; set; }
        public int CorrectCount { get; set; }
        public int WrongCount { get; set; }
    }
}
