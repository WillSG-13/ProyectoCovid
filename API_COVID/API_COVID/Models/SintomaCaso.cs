using System.ComponentModel.DataAnnotations;

namespace API_COVID.Models
{
    public class SintomaCaso
    {

        [Required]
        [StringLength(50)]
        public int Caso { get; set; }

        [Required]
        [StringLength(50)]
        public string Sintoma { get; set; }

        public int CantidadDias { get; set; }

    }
}
