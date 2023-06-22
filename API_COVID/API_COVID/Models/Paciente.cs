using System.ComponentModel.DataAnnotations;

namespace API_COVID.Models
{
    public class Paciente
    {
        [Required]
        [Key]
        public int Cedula { get; set; }

        [Required]
        public string nombreCompleto { get; set; }

        [Required]
        public string Edad { get; set; }

        [Required]
        public int cantidadCasosAsociados { get; set; }

        [Required]
        public string Provincia { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public int numeroTelefono { get; set; }

        [Required]
        public string Estado { get; set; }

        [Required]
        public string etapaVida { get; set; }

    }
}
