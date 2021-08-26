using Microsoft.AspNetCore.Identity;
using SP21.P05.Web.Features.Roles;
using SP21.P05.Web.Features.Users;

namespace SP21.P05.Web.Features.UserRoles
{
    public class UserRole : IdentityUserRole<int>
    {
        public virtual Role Role { get; set; }
        public virtual User User { get; set; }
    }
}