using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP21.P05.Web.Data;
using SP21.P05.Web.Extensions;
using SP21.P05.Web.Features.Users;

namespace SP21.P05.Web.Controllers
{
    [ApiController]
    [Route("api/authentication")]
    public class AuthenticationController : ControllerBase
    {
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;
        private readonly DataContext dataContext;

        public AuthenticationController(
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            DataContext dataContext)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.dataContext = dataContext;
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<ActionResult<UserDto>> Me()
        {
            var currentUserName = User.GetCurrentUserName();
            var currentUser = await dataContext.Set<User>()
                .Where(x => x.UserName == currentUserName)
                .Select(x => new UserDto
                {
                    UserName = x.UserName,
                    Id = x.Id,
                    Role = x.Roles.Select(y => y.Role.Name).FirstOrDefault()
                })
                .FirstOrDefaultAsync();

            return Ok(currentUser);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(UserLoginDto dto)
        {
            var user = await userManager.FindByNameAsync(dto.UserName);
            if (user == null)
            {
                return BadRequest();
            }
            var result = await signInManager.CheckPasswordSignInAsync(user, dto.Password, true);
            if (!result.Succeeded)
            {
                return BadRequest();
            }
            await signInManager.SignInAsync(user, false, "Password");
            return Ok();
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<ActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Ok();
        }
    }
}