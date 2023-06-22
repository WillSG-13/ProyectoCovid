using Microsoft.AspNetCore.Mvc;
using API_COVID.Data;
using API_COVID.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Cors;

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

      
        [HttpPut]
        [Route("Login/{correo}/{contrasena}")]
        public async Task<IActionResult> Login(string correo, string contrasena)
        {
            // Verificar si el usuario existe en la base de datos
            var usuario = await contexto.Usuarios.FirstOrDefaultAsync(u => u.Email == correo && u.Contrasena == contrasena);

            if (usuario == null)
            {
                return NotFound(); // Usuario no encontrado
            }

            // Realizar acciones adicionales según tus necesidades (por ejemplo, generar token de autenticación)

            return Ok(usuario); // Devolver el usuario en caso de inicio de sesión exitoso
        }

    }
}

