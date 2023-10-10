﻿namespace QuizProject.Domain.Model.ModelDTO
{
    public class QuestionsForUserDTO
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public List<AnswersDTO> Answers { get; set; }
    }
}
