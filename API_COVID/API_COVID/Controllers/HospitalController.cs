using Microsoft.AspNetCore.Mvc;
using API_COVID.Data;
using API_COVID.Models;

namespace API_COVID.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HospitalController : Controller
    {
        //instancia del contexto para solo lectura
        private readonly Contexto contexto;

        //constructor
        public HospitalController(Contexto pContexto)
        {
            contexto = pContexto;
        }

        //metodo para obtener una lista de hospitales
        [HttpGet]
        public List<Hospital> GetListaHospital()
        {
            var list = this.contexto.Hospital.ToList();
            return list;
        }


        //metodo para agregar hospitales
        [HttpPut("agregar")]
        public void SetHospital(Hospital hospital)
        {
            this.contexto.Add(hospital);
            this.contexto.SaveChanges();
        }

        
        //metodo para modificar hospital
        [HttpPut("modificar")]
        public void UpdateHospital(Hospital hospital)
        {
            this.contexto.Hospital.Update(hospital);
            this.contexto.SaveChanges();
        }

        //metodo para desactivar hospital, no confundir con eliminar
        [HttpPost("desactivar")]
        public void InactiveHospital(Hospital hospital)
        {
            this.contexto.Hospital.Update(hospital);
            this.contexto.SaveChanges();
        }

        //metodo para obtener un hospital por nombre
        [HttpGet("{Nombre}")]
        public Hospital GetHospital(string Nombre)
        {
            //se usa la clausula where en el DBContext para buscar segun nombre
            var temp = this.contexto.Hospital.FirstOrDefault(u => u.Nombre == Nombre);
            return temp;
        }

    }
}


