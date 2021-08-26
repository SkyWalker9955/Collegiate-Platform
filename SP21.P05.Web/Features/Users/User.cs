using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using SP21.P05.Web.Features.Events;
using SP21.P05.Web.Features.UserRoles;

namespace SP21.P05.Web.Features.Users
{
    public class User : IdentityUser<int>
    {
        public virtual List<UserRole> Roles { get; set; } = new List<UserRole>();

        public virtual List<Event> CreatedEvents { get; set; } = new List<Event>();
    }
}