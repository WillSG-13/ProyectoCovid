using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace API_COVID.Models
{
    public class Sintomas
    {

        [Required]
        public string Sintoma { get; set; }

        [Required]
        public double Promedio { get; set; }

    }
}
