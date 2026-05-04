using ApplicationTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationTracker.Api.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Application> Applications { get; set; }

    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Email)
            .IsRequired()
            .HasMaxLength(255);

            entity.HasIndex(e => e.Email)
            .IsUnique();

        });

        modelBuilder.Entity<Application>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Company)
                .IsRequired()
                .HasMaxLength(255);

            entity.Property(e => e.Url)
                .HasMaxLength(500);

            entity.Property(e => e.Stage)
                .IsRequired()
                .HasMaxLength(50);

            entity.Property(e => e.UserUid)
                .IsRequired()
                .HasMaxLength(255);

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()");

            entity.HasIndex(e => e.UserUid);
        });
    }
}
