using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace API_COVID.Models
{
    public class EtapaVida
    {

        [Required]
        public string etapaVida { get; set; }

        [Required]
        public double Promedio { get; set; }

    }
}
