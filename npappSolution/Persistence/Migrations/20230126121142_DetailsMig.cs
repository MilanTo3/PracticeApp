using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class DetailsMig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "dirtyBasin",
                table: "Feedbacks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "dirtyBowl",
                table: "Feedbacks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "dirtyFloor",
                table: "Feedbacks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "faultyEquipment",
                table: "Feedbacks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "foulSmell",
                table: "Feedbacks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "litterBin",
                table: "Feedbacks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "noPaper",
                table: "Feedbacks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "noSoap",
                table: "Feedbacks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "noTissues",
                table: "Feedbacks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "wetFloor",
                table: "Feedbacks",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "dirtyBasin",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "dirtyBowl",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "dirtyFloor",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "faultyEquipment",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "foulSmell",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "litterBin",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "noPaper",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "noSoap",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "noTissues",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "wetFloor",
                table: "Feedbacks");
        }
    }
}
