using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using miniBlogAPI.Data;
using miniBlogAPI.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class miniBlogController : ControllerBase
    {
        private readonly BlogContext _context; 

        public miniBlogController(BlogContext context)
        {
            _context = context; 
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetAllPosts() 
        {
            var posts = await _context.Posts.ToListAsync();

            return Ok(posts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPostById(int id)
        {
            var post = await _context.Posts.FindAsync(id);

            if(post == null)
            {
                return NotFound(new { message = "Inlägget hittades inte."});
            }

            return Ok(post);
        }

        [HttpPost]
        public async Task<ActionResult<Post>> CreatePost(Post post)
        {
            post.CreatedAt = DateTime.UtcNow;
            post.UpdatedAt = DateTime.UtcNow;

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAllPosts), new {id = post.Id}, post);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, Post updatedPost)
        {
            var existingPost = await _context.Posts.FindAsync(id);
            if(existingPost == null)
            {
                return NotFound(new { message = "Inlägget du försöker uppdatera finns inte."});
            }

            existingPost.Title = updatedPost.Title;
            existingPost.Content = updatedPost.Content;
            existingPost.AuthorUsername = updatedPost.AuthorUsername;
            existingPost.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);

            if(post == null)
            {
                return NotFound(new {message = "inlägget du försöker ta bort finns inte."});
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
