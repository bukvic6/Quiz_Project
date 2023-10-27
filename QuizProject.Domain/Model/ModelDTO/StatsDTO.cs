using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuizProject.Domain.Model.ModelDTO
{
    public class StatsDTO
    {
        public string QuestionText { get; set; }
        public int CorrectCount { get; set; }
        public int WrongCount { get; set; }
    }
}
