using Microsoft.AspNetCore.Mvc;
using API_COVID.Data;
using API_COVID.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
namespace API_COVID.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuariosController : Controller
    {
        //instancia del contexto para solo lectura
        private readonly Contexto contexto;

        //contructor
        public UsuariosController(Contexto pContexto)
        {
            contexto = pContexto;
        }

        //metodo para obtener una lista de usuarios
        [HttpGet]
        public List<Usuarios> GetListaUsuarios()
        {
            var list = this.contexto.Usuarios.ToList();
            return list;
        }

        //metodo para agregar usuarios
        [HttpPut("agregar")]
        public Boolean SetUsuarios(Usuarios usuarios)
        {
            bool result;

            if (usuarios != null) {
                this.contexto.Add(usuarios);
                this.contexto.SaveChanges();
                result = true;
            }
            else
            {
                result = false;
            }
            return result;
        }

        //metodo para obtener una lista de usuarios por rol
        [HttpGet("getUsuarioRol/{Rol}")]
        public List<Usuarios> GetListaUsuariosRol(string Rol)
        {
            var list = this.contexto.Usuarios.Where(u => u.Rol == Rol).ToList();
            return list;
        }

        //metodo para modificar usuario
        [HttpPut("modificar")]
        public void UpdateUsuarios(Usuarios usuarios)
        {
            this.contexto.Usuarios.Update(usuarios);
            this.contexto.SaveChanges();
        }

        //metodo para desactivar usuario
        [HttpPost("desactivar")]
        public void InactiveUsuarios(Usuarios usuarios)
        {
            this.contexto.Usuarios.Update(usuarios);
            this.contexto.SaveChanges();
        }

        //metodo para obtener usuario segun numero de ceduka
        [HttpGet("{numeroCedula}")]
        public Usuarios GetUsuarios(int numeroCedula)
        {
            //se usa la clausula where en el DBContext para buscar segun numero de cedula
            var temp = this.contexto.Usuarios.FirstOrDefault(u => u.numeroCedula == numeroCedula);
            return temp;
        }

        [HttpPost("login")]
        public Usuarios Login(Login solicitud)
        {
            Usuarios user = new Usuarios();
            bool verificar;

            // Verificar las credenciales del usuario consultando la base de datos
            SqlConnection conection = (SqlConnection)contexto.Database.GetDbConnection();
            SqlCommand command = conection.CreateCommand();
            conection.Open();
            command.CommandType = System.Data.CommandType.Text;
            command.CommandText = "SELECT dbo.VerificarCredenciales(@Email, @Contrasena)";
            command.Parameters.AddWithValue("@Email", solicitud.Email);
            command.Parameters.AddWithValue("@Contrasena", solicitud.Contrasena);
            verificar = (bool)command.ExecuteScalar();
            conection.Close();
            user = this.contexto.Usuarios.FirstOrDefault(u => u.Email == solicitud.Email);
            // Las credenciales son válidas, el inicio de sesión es exitoso
            if (verificar == true)
            {
                return user;
            }
            return user;
        }

    }
}

