using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationTracker.Api.Migrations
{
    /// <inheritdoc />
    public partial class RenameUserUidToUserId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserUid",
                table: "Applications",
                newName: "userId");

            migrationBuilder.RenameIndex(
                name: "IX_Applications_UserUid",
                table: "Applications",
                newName: "IX_Applications_userId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "AppliedOn",
                table: "Applications",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "date");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "userId",
                table: "Applications",
                newName: "UserUid");

            migrationBuilder.RenameIndex(
                name: "IX_Applications_userId",
                table: "Applications",
                newName: "IX_Applications_UserUid");

            migrationBuilder.AlterColumn<DateTime>(
                name: "AppliedOn",
                table: "Applications",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");
        }
    }
}
