using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace API_COVID.Models
{
    public class Hospital
    {
        [Key]
        [Required]
        public int idHospital { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        public string Provincia { get; set; }

        [Required]
        public string Estado { get; set; }

    }
}
