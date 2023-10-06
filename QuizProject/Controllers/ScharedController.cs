using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace QuizProject.Controllers
{
    public class SharedController : Controller
    {
        public string GetUserFromContex()
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            return email;
        }
    }
}
