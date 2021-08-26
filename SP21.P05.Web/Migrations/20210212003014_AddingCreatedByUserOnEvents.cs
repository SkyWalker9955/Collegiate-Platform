using Microsoft.EntityFrameworkCore.Migrations;

namespace SP21.P05.Web.Migrations
{
    public partial class AddingCreatedByUserOnEvents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatedByUserId",
                table: "Event",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Event_CreatedByUserId",
                table: "Event",
                column: "CreatedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Event_AspNetUsers_CreatedByUserId",
                table: "Event",
                column: "CreatedByUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Event_AspNetUsers_CreatedByUserId",
                table: "Event");

            migrationBuilder.DropIndex(
                name: "IX_Event_CreatedByUserId",
                table: "Event");

            migrationBuilder.DropColumn(
                name: "CreatedByUserId",
                table: "Event");
        }
    }
}
