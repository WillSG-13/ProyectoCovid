using System.ComponentModel.DataAnnotations;

namespace API_COVID.Models
{
    public class Usuarios
    {
        [Required]
        [Key]
        public int idUsuario { get; set; }

        [Required]
        public int numeroCedula { get; set; }

        [Required]
        public string nombreCompleto { get; set; }

        [Required]
        public DateTime fechaNacimiento { get; set; }

        [Required]
        public int numeroTelefono { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Contrasena { get; set; }


        [Required]
        public string Rol { get; set; }

        [Required]
        public string Estado { get; set; }

    }
}
