using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SP21.P05.Web.Features.Events;
using SP21.P05.Web.Features.Roles;
using SP21.P05.Web.Features.Universities;
using SP21.P05.Web.Features.UserRoles;
using SP21.P05.Web.Features.Users;
using SP21.P05.Web.Features.Venues;

namespace SP21.P05.Web.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Venue>();
            modelBuilder.Entity<Event>();
            modelBuilder.Entity<University>();
            base.OnModelCreating(modelBuilder);

            var userRoleBuilder = modelBuilder.Entity<UserRole>();

            userRoleBuilder.HasKey(x => new {x.UserId, x.RoleId});

            userRoleBuilder.HasOne(x => x.Role)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.RoleId);

            userRoleBuilder.HasOne(x => x.User)
                .WithMany(x => x.Roles)
                .HasForeignKey(x => x.UserId);
        }
    }
}