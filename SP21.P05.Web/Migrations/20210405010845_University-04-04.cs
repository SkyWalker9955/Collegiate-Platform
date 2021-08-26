using Microsoft.EntityFrameworkCore.Migrations;

namespace SP21.P05.Web.Migrations
{
    public partial class University0404 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UniversityId",
                table: "Venue",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UniversityId",
                table: "Event",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "University",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_University", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Venue_UniversityId",
                table: "Venue",
                column: "UniversityId");

            migrationBuilder.CreateIndex(
                name: "IX_Event_UniversityId",
                table: "Event",
                column: "UniversityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Event_University_UniversityId",
                table: "Event",
                column: "UniversityId",
                principalTable: "University",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Venue_University_UniversityId",
                table: "Venue",
                column: "UniversityId",
                principalTable: "University",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Event_University_UniversityId",
                table: "Event");

            migrationBuilder.DropForeignKey(
                name: "FK_Venue_University_UniversityId",
                table: "Venue");

            migrationBuilder.DropTable(
                name: "University");

            migrationBuilder.DropIndex(
                name: "IX_Venue_UniversityId",
                table: "Venue");

            migrationBuilder.DropIndex(
                name: "IX_Event_UniversityId",
                table: "Event");

            migrationBuilder.DropColumn(
                name: "UniversityId",
                table: "Venue");

            migrationBuilder.DropColumn(
                name: "UniversityId",
                table: "Event");
        }
    }
}
