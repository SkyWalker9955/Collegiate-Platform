using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SP21.P05.Web.Data;
using SP21.P05.Web.Features.Events;
using SP21.P05.Web.Features.Roles;
using SP21.P05.Web.Features.Universities;
using SP21.P05.Web.Features.Users;
using SP21.P05.Web.Features.Venues;

namespace SP21.P05.Web.HostedServices
{
    public class SeedDataHostedService : IHostedService
    {
        private readonly IServiceProvider serviceProvider;

        public SeedDataHostedService(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = serviceProvider.CreateScope();

            await using var dbContext = scope.ServiceProvider.GetService<DataContext>();
            using var userManager = scope.ServiceProvider.GetService<UserManager<User>>();
            using var roleManager = scope.ServiceProvider.GetService<RoleManager<Role>>();

            var anyRoles = await roleManager.Roles.AnyAsync(cancellationToken);
            if (!anyRoles)
            {
                await roleManager.CreateAsync(new Role
                {
                    Name = RoleNames.Admin
                });
                await roleManager.CreateAsync(new Role
                {
                    Name = RoleNames.User
                });
            }

            var anyUsers = await userManager.Users.AnyAsync(cancellationToken);
            if (!anyUsers)
            {
                const string defaultPassword = "Password123!";
                var adminUser = new User
                {
                    UserName = "galkadi"
                };
                await userManager.CreateAsync(adminUser, defaultPassword);
                await userManager.AddToRoleAsync(adminUser, RoleNames.Admin);

                var normalUser = new User
                {
                    UserName = "bob"
                };
                await userManager.CreateAsync(normalUser, defaultPassword);
                await userManager.AddToRoleAsync(normalUser, RoleNames.User);
            }

            var universities = dbContext.Set<University>();
            if (universities.Any())
            {
                return;
            }
            universities.AddRange(
                new University { Name = "Stanford", Address = "450 Serra Mall, Stanford, CA 94305" },
                new University { Name = "Cambridge", Address = "The Old Schools, Trinity Ln, Cambridge CB2 1TN, United Kingdom" }
            );


            var events = dbContext.Set<Event>();
            if (events.Any())
            {
                return;
            }

            var user = await userManager.Users.FirstAsync(cancellationToken);
            var venue = new Venue
            {
                Capacity = 25,
                Name = "classroom",
                UniversityId = 1
            };

            events.AddRange(
                new Event { CreatedByUserId = user.Id, Venue = venue, Name = "Starts now", Occurs = DateTimeOffset.UtcNow },
                new Event { CreatedByUserId = user.Id, Venue = venue, Name = "Starts in 23 hours", Occurs = DateTimeOffset.UtcNow.AddHours(23) },
                new Event { CreatedByUserId = user.Id, Venue = venue, Name = "Starts in 48 hours", Occurs = DateTimeOffset.UtcNow.AddHours(48) }
            );

            await dbContext.SaveChangesAsync(cancellationToken);
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}