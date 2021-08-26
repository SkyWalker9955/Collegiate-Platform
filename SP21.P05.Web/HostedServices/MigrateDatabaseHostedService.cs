using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SP21.P05.Web.Data;

namespace SP21.P05.Web.HostedServices
{
    public class MigrateDatabaseHostedService : IHostedService
    {
        private readonly IServiceProvider serviceProvider;

        public MigrateDatabaseHostedService(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }
        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = serviceProvider.CreateScope();
            await using var dbContext = scope.ServiceProvider.GetService<DataContext>();

            await dbContext.Database.MigrateAsync(cancellationToken);
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}