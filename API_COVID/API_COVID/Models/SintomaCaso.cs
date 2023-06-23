using System.ComponentModel.DataAnnotations;

namespace API_COVID.Models
{
    public class SintomaCaso
    {
        [Key]
        public int idSintomaCaso { get; set; }
        public int Caso { get; set; }

        [StringLength(50)]
        public string Sintoma { get; set; }

        public int CantidadDias { get; set; }

    }
}
