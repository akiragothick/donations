using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.API.Models;

namespace Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DPatientsController : ControllerBase
    {
        private readonly DonationDBContext _context;

        public DPatientsController(DonationDBContext context)
        {
            _context = context;
        }

        // GET: api/DPatients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DPatient>>> GetDPatient()
        {
            return await _context.DPatient.ToListAsync();
        }

        // GET: api/DPatients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DPatient>> GetDPatient(int id)
        {
            var dPatient = await _context.DPatient.FindAsync(id);

            if (dPatient == null)
            {
                return NotFound();
            }

            return dPatient;
        }

        // PUT: api/DPatients/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDPatient(int id, DPatient dPatient)
        {
            dPatient.id = id;

            _context.Entry(dPatient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DPatientExists(id))
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

        // POST: api/DPatients
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<DPatient>> PostDPatient(DPatient dPatient)
        {
            _context.DPatient.Add(dPatient);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDPatient", new { id = dPatient.id }, dPatient);
        }

        // DELETE: api/DPatients/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DPatient>> DeleteDPatient(int id)
        {
            var dPatient = await _context.DPatient.FindAsync(id);
            if (dPatient == null)
            {
                return NotFound();
            }

            _context.DPatient.Remove(dPatient);
            await _context.SaveChangesAsync();

            return dPatient;
        }

        private bool DPatientExists(int id)
        {
            return _context.DPatient.Any(e => e.id == id);
        }
    }
}
