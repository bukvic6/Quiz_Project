namespace QuizProject.Domain.Model
{
    public class QuizResults
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int Points { get; set; }
        public DateTime Date { get; set; }
        public string Rating { get; set; }
        public int Percentage { get; set; }

    }
}
