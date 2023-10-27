using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizProject.Migrations
{
    /// <inheritdoc />
    public partial class countInsideQuestion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CorrectCount",
                table: "Questions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WrongCount",
                table: "Questions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CorrectCount",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "WrongCount",
                table: "Questions");
        }
    }
}
