using Microsoft.EntityFrameworkCore;
using QuizProject.Model;

namespace QuizProject.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<QuizResults> QuizzResults { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<QuizResults>()
                .HasOne(e => e.User);
            modelBuilder.Entity<Question>()
                .HasQueryFilter(x => x.IsDeleted == false);
        }
    }
}
