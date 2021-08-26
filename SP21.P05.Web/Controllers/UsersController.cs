using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SP21.P05.Web.Features.Roles;
using SP21.P05.Web.Features.Users;

namespace SP21.P05.Web.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<Role> roleManager;

        public UsersController(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        [HttpPost]
        [Authorize(Roles = RoleNames.Admin)]
        public async Task<ActionResult<UserDto>> Create(UserCreateDto dto)
        {
            using var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);

            var user = await userManager.FindByNameAsync(dto.UserName);
            if (user != null)
            {
                // don't allow a new user to be made with the same name
                return BadRequest();
            }

            var targetRole = await roleManager.FindByNameAsync(dto.Role);
            if (targetRole == null)
            {
                // don't allow non existent role to be used
                return BadRequest();
            }

            var newUser = new User
            {
                UserName = dto.UserName,
            };
            var createResult = await userManager.CreateAsync(newUser, dto.Password);
            if (!createResult.Succeeded)
            {
                return BadRequest();
            }

            var roleResult = await userManager.AddToRoleAsync(newUser, targetRole.Name);
            if (!roleResult.Succeeded)
            {
                return BadRequest();
            }
            transaction.Complete();

            return Created(string.Empty, new UserDto
            {
                Id = newUser.Id,
                Role = targetRole.Name,
                UserName = newUser.UserName
            });
        }
    }
}