using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace QuizProject.Controllers
{
    public class SharedController : Controller
    {
        protected string GetUserFromContex()
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            return email;
        }

        protected string GetUserRole()
        {
            var role = HttpContext.User.FindFirstValue(ClaimTypes.Role);
            return role;
        }
    }
}
