namespace QuizProject.Domain.Model.ModelDTO
{
    public class QuestionDTO
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public List<AnswersDTO> Answers { get; set; }
        public int RightAnswer { get; set; }
    }
}
