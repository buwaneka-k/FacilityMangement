using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SpacesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SpacesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var spaces = await _context.Spaces.Include(f => f.Assets).Include(s => s.Type).ToListAsync();
            return Ok(spaces);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var space = await _context.Spaces.Include(f => f.Assets).Include(s => s.Type).FirstOrDefaultAsync(s => s.SpaceID == id);
            if (space == null) return NotFound();
            return Ok(space);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Space space)
        {
            _context.Spaces.Add(space);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = space.SpaceID }, space);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Space space)
        {
            if (id != space.SpaceID) return BadRequest();
            _context.Entry(space).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var space = await _context.Spaces.FindAsync(id);
            if (space == null) return NotFound();
            _context.Spaces.Remove(space);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

}
