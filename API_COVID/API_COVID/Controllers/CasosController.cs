using Microsoft.AspNetCore.Mvc;
using API_COVID.Data;
using API_COVID.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace API_COVID.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CasosController : Controller
    {
        //instancia del contexto para solo lectura
        private readonly Contexto contexto;

        //constructor
        public CasosController(Contexto pContexto)
        {
            contexto = pContexto;
        }

        //metodo para obtener una lista de casos
        [HttpGet]
        public List<Casos> GetListaCasos()
        {
            //devuelve una lista de casos basados en DBContext del objeto
            var list = this.contexto.Casos.ToList();
            return list;
        }

        //metodo para obtener la cantidad de casos en total
        [HttpGet("cantidadCasos")]
        public int GetCantidadCasos()
        {
            try
            {   
                //Conexion con la base de datos, se usa un query para traer la cantidad de casos
                int cantidad;
                SqlConnection conection = (SqlConnection)contexto.Database.GetDbConnection();
                SqlCommand command = conection.CreateCommand();
                conection.Open();
                command.CommandType = System.Data.CommandType.Text;
                command.CommandText = "select count(*) from Casos";
                cantidad = (int)command.ExecuteScalar();
                conection.Close();

                //devuelve un entero con la cantidad de casos
                return cantidad;
            }
            //control de excepciones
            catch(Exception ex)
            {
                throw ex;
            }
        }

        //metodo para agregar casos
        [HttpPut("agregar")]
        public void SetCaso(Casos caso)
        {   
            try
            {
                //Conexion con la base de datos, se usa un query aumentar un atributo en la tabla paciente
                SqlConnection conection = (SqlConnection)contexto.Database.GetDbConnection();
                SqlCommand command = conection.CreateCommand();
                conection.Open();
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.CommandText = "[sp_agregar_caso_paciente]";
                command.Parameters.Add("@cedulaPaciente", System.Data.SqlDbType.Int).Value = caso.cedulaPaciente;
                command.ExecuteNonQuery();
                conection.Close();

                //se agrega el caso usando el DBContext
                this.contexto.Add(caso);
                this.contexto.SaveChanges();
            }
            //control de excepciones
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //metodo para eliminar caso
        //Es poco probable que se utilizado debido a que solo se desactivan
        [HttpDelete("{idCaso}")]
        public void deleteCasos(int idCaso)
        {
            //busca en el contexto un caso que coincida con el idsolicitado
            var temp = this.contexto.Casos.Find(idCaso);

            //se verifica que exista el caso y luego se elimina
            if (temp != null)
            {
                this.contexto.Casos.Remove(temp);
                this.contexto.SaveChanges();
            }
        }

        //metodo para actualizar los casos
        [HttpPut("modificar")]
        public void UpdateCasos(Casos caso)
        {
            //recibe un caso y lo actualiza usando el DBContext
            this.contexto.Casos.Update(caso);
            this.contexto.SaveChanges();
        }

        //metodo desactivar
        //es similar al eliminar pero este solo actuliza el estado
        [HttpPost("desactivar")]
        public void InactiveCasos(Casos caso)
        {
            //recibe un caso y lo actualiza usando el DBContext
            this.contexto.Casos.Update(caso);
            this.contexto.SaveChanges();
        }

        //metodo para obtener una lista de casos por provincia
        [HttpGet("getCasoProvincia/{Provincia}")]
        public List<Casos> GetCasoProvincia(string Provincia)
        {
            //se usa la clausula where en el DBContext para buscar segun provincia y se convierte en una lista
            var list = this.contexto.Casos.Where(u => u.Provincia == Provincia).ToList();
            return list;
        }

        //metodo para obtener una lista de casos por etapa de vida
        [HttpGet("getCasoEtapa/{etapaVida}")]
        public List<Paciente> GetListaCasoEtapa(string etapaVida)
        {
            //se usa la clausula where en el DBContext para buscar segun etapa de vida y se convierte en una lista
            var list = this.contexto.Paciente.Where(u => u.etapaVida == etapaVida).ToList();
            return list;
        }

        //metodo para obtener el promedio de casos por sintomas
        [HttpGet("promedioSintomas")]
        public IActionResult GetSintomasPromedio()
        {
            try
            {
                //se crea una lista para que obtenga los datos
                List<Sintomas> casos = new List<Sintomas>();

                // Realizar la consulta a la base de datos para obtener los datos de los casos
                using (SqlConnection connection = (SqlConnection)contexto.Database.GetDbConnection())
                {
                    connection.Open();
                    string query = "SELECT Sintomas, AVG(CAST(Duracion AS FLOAT)) AS Promedio FROM Casos GROUP BY Sintomas";
                    SqlCommand command = new SqlCommand(query, connection);
                    SqlDataReader reader = command.ExecuteReader();

                    //se leen los datos y se crea un objeto sintoma
                    while (reader.Read())
                    {
                        Sintomas sintoma = new Sintomas
                        {
                            Sintoma = reader.GetString(0),
                            Promedio = reader.GetDouble(1)
                        };
                        //se agrega los datos a la lista
                        casos.Add(sintoma);
                    }

                    reader.Close();
                }

                //devuelve la lista
                return Ok(casos);
            }
            //control de excepciones
            catch (Exception ex)
            {
                // Manejar cualquier excepción y devolver una respuesta de error
                return StatusCode(500, ex.Message);
            }
        }

        //metodo para obtener el promedio por etapa de vida
        [HttpGet("promedioEtapaVida")]
        public IActionResult GetEtapaVidaPromedio()
        {
            try
            {
                //se crea una lista para que obtenga los datos
                List<EtapaVida> casos = new List<EtapaVida>();

                // Realizar la consulta a la base de datos para obtener los datos de los casos
                using (SqlConnection connection = (SqlConnection)contexto.Database.GetDbConnection())
                {
                    connection.Open();
                    string query = "Select etapaVida, AVG(CAST(edad AS FLOAT)) as PromedioEdad from Paciente group by etapaVida";
                    SqlCommand command = new SqlCommand(query, connection);
                    SqlDataReader reader = command.ExecuteReader();

                    //se leen los datos y se crea un objeto sintoma
                    while (reader.Read())
                    {
                        EtapaVida promedioEtapa = new EtapaVida
                        {
                            etapaVida = reader.GetString(0),
                            Promedio = reader.GetDouble(1)
                        };
                        //se agrega los datos a la lista
                        casos.Add(promedioEtapa);
                    }

                    reader.Close();
                }
                //devuelve la lista
                return Ok(casos);
            }
            //control de excepciones
            catch (Exception ex)
            {
                // Manejar cualquier excepción y devolver una respuesta de error
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("ultimoCasoAgregado")]
        public ActionResult<Casos> GetUltimoCasoAgregado()
        {
            try
            {
                // Consulta para obtener el último caso agregado ordenando por el ID de forma descendente
                var ultimoCaso = contexto.Casos.OrderByDescending(c => c.idCaso).FirstOrDefault();

                if (ultimoCaso == null)
                {
                    return NotFound(); // Si no se encuentra ningún caso, devolver un error 404
                }

                return ultimoCaso; // Devolver el último caso encontrado
            }
            catch (Exception ex)
            {
                // Manejar cualquier excepción y devolver una respuesta de error
                return StatusCode(500, ex.Message);
            }
        }

    }
}


