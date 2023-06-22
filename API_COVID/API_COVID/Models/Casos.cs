using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace API_COVID.Models
{
    public class Casos
    {
        [Key]
        [Required]
        public int idCaso { get; set; }

        [Required]
        public int cedulaPaciente { get; set; }

        [Required]
        public string Sintomas { get; set; }

        [Required]
        public int Duracion { get; set; }

        [Required]
        public string Provincia { get; set; }

        [Required]
        public DateTime Fecha { get; set; }

        [Required]
        public int idUsuario { get; set; }

        [Required]
        public string Hospital { get; set; }
    }
}
