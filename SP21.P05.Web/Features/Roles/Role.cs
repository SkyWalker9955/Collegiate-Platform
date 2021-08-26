using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using SP21.P05.Web.Features.UserRoles;

namespace SP21.P05.Web.Features.Roles
{
    public class Role : IdentityRole<int>
    {
        public virtual List<UserRole> Users { get; set; } = new List<UserRole>();
    }
}