using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FacilitiesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FacilitiesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var facilities = await _context.Facilities.Include(f => f.Type).Include(f => f.Spaces).ThenInclude(s => s.Type).Include(f => f.Spaces).ThenInclude(s => s.Assets).ToListAsync();
            return Ok(facilities);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var facility = await _context.Facilities.Include(f => f.Type).Include(f => f.Spaces).ThenInclude(s => s.Type).Include(f => f.Spaces).ThenInclude(s => s.Assets).FirstOrDefaultAsync(f => f.FacilityID == id);
            if (facility == null) return NotFound();
            return Ok(facility);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Facility facility)
        {
            _context.Facilities.Add(facility);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = facility.FacilityID }, facility);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Facility facility)
        {
            if (id != facility.FacilityID) return BadRequest();
            _context.Entry(facility).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("Space/{id}")]
        public async Task<IActionResult> UpdateSpace(int id)
        {
            var space = await _context.Spaces.FirstOrDefaultAsync(s=>s.SpaceID == id);
            if(space == null) return BadRequest();
            _context.Entry(space).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var facility = await _context.Facilities.FindAsync(id);
            if (facility == null) return NotFound();
            _context.Facilities.Remove(facility);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("Types")]
        public async Task<IActionResult> GetTypes()
        {
            var types = await _context.Types.ToListAsync();
            return Ok(types);
        }
    }

}
