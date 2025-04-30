using Microsoft.EntityFrameworkCore;
using miniBlogAPI.Models;

namespace miniBlogAPI.Data 
{
    public class BlogContext : DbContext
    {
        public BlogContext(DbContextOptions<BlogContext> options) : base(options)
        {

        }

         public DbSet<Post> Posts => Set<Post>();
    }
}