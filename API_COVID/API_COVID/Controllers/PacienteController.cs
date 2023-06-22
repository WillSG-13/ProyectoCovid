using Microsoft.AspNetCore.Mvc;
using API_COVID.Data;
using API_COVID.Models;

namespace API_COVID.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PacienteController : Controller
    {
        //instancia del contexto para solo lectura
        private readonly Contexto contexto;

        //constructor
        public PacienteController(Contexto pContexto)
        {
            contexto = pContexto;
        }

        //metodo para obtener una lista de pacientes
        [HttpGet]
        public List<Paciente> GetListaPaciente()
        {
            var list = this.contexto.Paciente.ToList();
            return list;
        }

        //metodos para agregar paciente
        [HttpPut("agregar")]
        public void SetPaciente(Paciente paciente)
        {
            this.contexto.Add(paciente);
            this.contexto.SaveChanges();
        }

        //metodo para obtener una lista de pacientes segun etapa de vida
        [HttpGet("getPacienteEtapa/{etapaVida}")]
        public List<Paciente> GetListaPacienteEtapa(string etapaVida)
        {
            var list = this.contexto.Paciente.Where(u => u.etapaVida == etapaVida).ToList();
            return list;
        }

        //metodo para modificar paciente
        [HttpPut("modificar")]
        public void UpdatePaciente(Paciente paciente)
        {
            this.contexto.Paciente.Update(paciente);
            this.contexto.SaveChanges();
        }

        //metodo para desactivar paciente, no confundir con eliminar
        [HttpPost("desactivar")]
        public void InactivePaciente(Paciente paciente)
        {
            this.contexto.Paciente.Update(paciente);
            this.contexto.SaveChanges();
        }

        //metodos para obtener paciente por numero de cedula
        [HttpGet("{Cedula}")]
        public Paciente GetPaciente(int Cedula)
        {
            //se usa la clausula where en el DBContext para buscar segun cedula
            var temp = this.contexto.Paciente.FirstOrDefault(u => u.Cedula == Cedula);
            return temp;
        }

    }
}


