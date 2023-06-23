using API_COVID.Data;
using API_COVID.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_COVID.Controllers
{

    [ApiController]
    [Route("SinstomaCaso")]
    public class SintomaCasoController : ControllerBase
    {
        private readonly Contexto _context;

        public SintomaCasoController(Contexto context)
        {
            _context = context;
        }


        // GET: api/SintomaCaso
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SintomaCaso>>> GetSintomaCasos()
        {
            return await _context.SintomaCaso.ToListAsync();
        }

        // GET: api/SintomaCaso/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SintomaCaso>> GetSintomaCaso(int id)
        {
            var sintomaCaso = await _context.SintomaCaso.FindAsync(id);

            if (sintomaCaso == null)
            {
                return NotFound();
            }

            return sintomaCaso;
        }

        // POST: api/SintomaCaso
        [HttpPost]
        [Route("agregarSintomaCaso")]
        public async Task<ActionResult<SintomaCaso>> PostSintomaCaso(SintomaCaso sintomaCaso)
        {
            _context.SintomaCaso.Add(sintomaCaso);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSintomaCaso), new { id = sintomaCaso.Caso }, sintomaCaso);
        }

        // PUT: api/SintomaCaso/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSintomaCaso(int id, SintomaCaso sintomaCaso)
        {
            if (id != sintomaCaso.Caso)
            {
                return BadRequest();
            }

            _context.Entry(sintomaCaso).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SintomaCasoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/SintomaCaso/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSintomaCaso(int id)
        {
            var sintomaCaso = await _context.SintomaCaso.FindAsync(id);
            if (sintomaCaso == null)
            {
                return NotFound();
            }

            _context.SintomaCaso.Remove(sintomaCaso);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SintomaCasoExists(int caso)
        {
            return _context.SintomaCaso.Any(e => e.Caso == caso);
        }

    }
}
