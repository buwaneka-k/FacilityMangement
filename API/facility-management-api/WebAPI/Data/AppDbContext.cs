using System.Reflection;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Types> Types { get; set; }
        public DbSet<Facility> Facilities { get; set; }
        public DbSet<Space> Spaces { get; set; }
        public DbSet<Asset> Assets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Types>()
                    .HasKey(t => t.TypeID);

        // Type- Facility relationship
        modelBuilder.Entity<Facility>()
            .HasOne(f => f.Type)
            .WithMany(t => t.Facilities)
            .HasForeignKey(f => f.TypeID)
            .OnDelete(DeleteBehavior.Cascade);  // Optional: Define delete behavior

        // Type - Space relationship
        modelBuilder.Entity<Space>()
            .HasOne(s => s.Type)
            .WithMany(t => t.Spaces)
            .HasForeignKey(s => s.TypeID)
            .OnDelete(DeleteBehavior.Restrict); // Optional: Define delete behavior

        // Facility - Space relationship
        modelBuilder.Entity<Space>()
            .HasOne(s => s.Facility)
            .WithMany(f => f.Spaces)
            .HasForeignKey(s => s.FacilityID)
            .OnDelete(DeleteBehavior.Cascade); // Optional: Define delete behavior

        // Space - Asset relationship
        modelBuilder.Entity<Asset>()
            .HasOne(a => a.Space)
            .WithMany(s => s.Assets)
            .HasForeignKey(a => a.SpaceID)
            .OnDelete(DeleteBehavior.Cascade); // Optional: Define delete behavior
        }
    }
}
