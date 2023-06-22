using Microsoft.EntityFrameworkCore;
using API_COVID.Models;

namespace API_COVID.Data
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions<Contexto> options) : base(options)
        {

        }

        public DbSet<Usuarios> Usuarios { get; set; }
        public DbSet<Paciente> Paciente { get; set; }
        public DbSet<Hospital> Hospital { get; set; }
        public DbSet<Casos> Casos { get; set; }

    }
}