using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace API_COVID.Models
{
    public class Login
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Contrasena { get; set; }

    }
}
