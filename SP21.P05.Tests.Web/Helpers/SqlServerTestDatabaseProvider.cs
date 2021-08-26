using System;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using Microsoft.Data.SqlClient;

namespace SP21.P05.Tests.Web.Helpers
{
#pragma warning disable CA2100 // Only used in a testing context
    public sealed class SqlServerTestDatabaseProvider : IDisposable
    {
        private const string DbPrefix = "SP21-P05";
        private string databaseName;

        public string GetConnectionString()
        {
            string connection;
            if (!WillHitLocalDb())
            {
                connection = $"Server=localhost,1433;Database={GetName()};User Id=sa;Password=Password123!;";
            }
            else
            {
                connection = $"Server=(localdb)\\mssqllocaldb;Database={GetName()};Trusted_Connection=True";
            }
            return connection;
        }

        public void Dispose()
        {
            DeleteDatabase();
        }

        private string GetName()
        {
            if (databaseName == null)
            {
                databaseName = Guid.NewGuid().ToString("N");
                if (WillHitLocalDb())
                {
                    using (var connection = new SqlConnection("server=(localdb)\\mssqllocaldb"))
                    {
                        connection.Open();
                        var tempPath = Environment.GetEnvironmentVariable("SqlServerTestDatabaseMdfPath") ?? Path.GetTempPath();
                        var mdfPath = $"{tempPath}{databaseName}";
                        var sql = $@"
        CREATE DATABASE
            [{DbPrefix}{databaseName}]
        ON PRIMARY (
           NAME=Test_data,
           FILENAME = '{mdfPath}.mdf'
        )
        LOG ON (
            NAME=Test_log,
            FILENAME = '{mdfPath}.ldf'
        )";

                        SqlCommand command = new SqlCommand(sql, connection);
                        command.ExecuteNonQuery();
                    }
                }
                else
                {
                    var master = GetMasterDbConnectionString();
                    using (var sqlConnection = new SqlConnection(master))
                    {
                        sqlConnection.Open();
                        // make sure the connection can open and that no conflicting db name exists

                        var dropCommand = new SqlCommand($"DROP DATABASE IF EXISTS [{GetName()}]", sqlConnection);
                        dropCommand.ExecuteNonQuery();
                    }
                }
            }
            return $"{DbPrefix}{databaseName}";
        }

        private static bool WillHitLocalDb()
        {
            return RuntimeInformation.IsOSPlatform(OSPlatform.Windows);
        }

        private void DeleteDatabase()
        {
            var master = GetMasterDbConnectionString();
            var name = GetName();
            var cleanProcessPath = Environment.GetEnvironmentVariable("SqlServerTestDatabaseCleanTool");
            if (!string.IsNullOrWhiteSpace(cleanProcessPath))
            {
                //optional, extra fast cleanup
                var process = Process.Start(cleanProcessPath, $"\"{master}\" \"{name}\"");
                process?.WaitForExit(100);
            }
            else
            {
                using (var sqlConnection = new SqlConnection(master))
                {
                    sqlConnection.Open();
                    var singleUserCommand = new SqlCommand($"IF EXISTS(select * from sys.databases where name='{GetName()}')ALTER DATABASE  [{GetName()}] SET SINGLE_USER WITH ROLLBACK IMMEDIATE", sqlConnection);
                    singleUserCommand.ExecuteNonQuery();

                    var dropCommand = new SqlCommand($"DROP DATABASE IF EXISTS [{GetName()}]", sqlConnection);
                    dropCommand.ExecuteNonQuery();
                }
            }
        }

        private string GetMasterDbConnectionString()
        {
            return GetConnectionString().Replace($"{DbPrefix}{databaseName}", "master");
        }
    }
}
