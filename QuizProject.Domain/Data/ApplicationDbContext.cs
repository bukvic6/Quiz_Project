using Microsoft.EntityFrameworkCore;
using QuizProject.Domain.Model;
using System.Reflection.Metadata;

namespace QuizProject.Domain.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<QuizResults> QuizzResults { get; set; }
        public DbSet<Answer> Answers { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<QuizResults>()
                .HasOne(e => e.User);

            modelBuilder.Entity<Question>()
                .HasQueryFilter(x => x.IsDeleted == false);

            modelBuilder.Entity<Question>()
                .HasMany(e => e.Answers)
                .WithOne(e => e.Question)
                .IsRequired();
        }
    }
}
