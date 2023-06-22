function alerta() {

  swal({
    title: "Quiere agregar el Sintoma?",
    text: "",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        agregarSintoma();
        swal("se agrego equipo", {
          icon: "success",
          timer: 1000,
          buttons: false
        });
      }
    });
}
function alertaAceptarProcedimiento() {
  swal({
    title: "Esta seguro que agregar el Procedimiento?",
    text: "",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        swal("se agrego el procedimiento", {
          icon: "success",
        });
      }
    });
}

var ModalAgregarSintoma = new bootstrap.Modal(document.getElementById('modalAgregarSintoma'));
function mostrarModalAgregarSintoma() {
  ModalAgregarSintoma.show();
}

var modalEditarUsuario = new bootstrap.Modal(document.getElementById('modalEditarPaciente'));

function mostrarModalEditarUsuario() {
  modalEditarUsuario.show();
}

function llenarDatos() {
  var Buscador = document.getElementById('Buscador');
  var contenidoResultado = document.querySelector('#card-body-boleta');

  var nombre = document.getElementById('nombre');
  var edad = document.getElementById('edad');
  var fecha = document.getElementById('fecha');
  var cedulaP = document.getElementById('cedula');
  var provincia = document.getElementById('provincia');
  var fechanacimiento = document.getElementById('fechanacimiento');
  var email = document.getElementById('email');
  var celular = document.getElementById('celular');
  var etapaVida = document.getElementById('etapaVida');

  // Crear una instancia del objeto Date
  var fechaActual = new Date();

  // Obtener el mes, el día y el año de la fecha actual
  var mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
  var dia = fechaActual.getDate();
  var año = fechaActual.getFullYear();

  // Formatear la fecha en el formato deseado (por ejemplo, MM/DD/YYYY)
  var fechaFormateada = mes + '/' + dia + '/' + año;

  Buscador.addEventListener('input', function (e) {
    e.preventDefault();

    var cedula = document.getElementById('Buscador').value;

    fetch("http://SistemaCovid-19.somee.com/Paciente/" + cedula)
      .then(response => response.json())
      .then((json) => {

        console.log(json);
        nombre.textContent = json.nombreCompleto;
        edad.textContent = json.edad;
        fecha.textContent = fechaFormateada;
        cedulaP.textContent = json.cedula;
        provincia.textContent = json.provincia;
        email.textContent = json.email;
        celular.textContent = json.numeroTelefono;
        etapaVida.textContent = json.etapaVida;
      })
      .catch(error => {
        console.log('Error:', error);
      });
  });
};

















function agregarSintoma() {
 
  var sintoma = document.getElementById('sintoma').value;
  var dias = document.getElementById('dias').value;
  console.log(sintoma + '' + dias)
  var tabla = document.getElementById('body')
  tabla.innerHTML += `
    <tr>
    <td>${sintoma}</td>
    <td>${dias}</td>
    </tr>`;
}

function AgregarCaso() {
  //--------------------------------------------------
  var tabla = document.querySelector('#dataTable');
  // Obtener todas las filas de la tabla
  var filas = tabla.getElementsByTagName('tr');
  // Array para almacenar los datos
  var datos = [];
  
  fetch('https://localhost:7174/Casos/ultimoCasoAgregado')
    .then(response => response.json())
    .then(data => {
      var ultimoCaso = data; // Almacenar el último caso en una variable
      var ultimo = ultimoCaso.idCaso;
      
      // Iterar por cada fila de la tabla (excluyendo la primera fila de encabezado)
      for (var i = 1; i < filas.length; i++) {
        var fila = filas[i];
        // Obtener los valores de los primeros dos campos (columnas "nombre" y "cantidad")
        var celdas = fila.getElementsByTagName('td');
        var nombre = celdas[0].textContent.trim();
        var cantidad = parseInt(celdas[1].textContent.trim());

        // Crear objeto JSON con los valores, incluyendo el idCaso
        var objeto = { idCaso: ultimo, nombre: nombre, cantidad: cantidad };
        // Agregar el objeto al array de datos
        datos.push(objeto);
      }
      
      // Hacer algo con los datos, incluyendo el último caso
      // ...
      
      // Enviar los datos a través de fetch iterativamente
      datos.forEach(cs => {
        console.log(cs)
        fetch('https://localhost:7174/api/SintomaCaso', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cs)
        })
          .then(response => response.json())
          .then(data => {
            // Manejar la respuesta del servidor
            console.log(data);
          })
          .catch(error => {
            // Manejar cualquier error
            console.error('Error:', error);
          });
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function add() {
  
  var fechaActual = new Date();
  var selectHospital = document.getElementById('hospital').value;
  var cedula = document.getElementById('Buscador').value;
  var provincia = document.getElementById('provincia').textContent;



  var caso =
  {
    "idCaso": 0,
    "cedulaPaciente": cedula,
    "sintomas": "null",
    "duracion": 0,
    "provincia": provincia,
    "fecha": fechaActual,
    "idUsuario": sessionStorage.getItem("id"),
    "hospital": selectHospital
  }

  var url = 'http://SistemaCovid-19.somee.com/Casos/agregar'; // Reemplaza la URL con la ruta correcta a tu endpoint
  var opciones = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(caso)
  };

  // Realizar la solicitud Fetch
  fetch(url, opciones)
    .then(response => {
      if (response.ok) {
        swal({
          title: "Correcto?",
          text: "Caso Agregado correctamentes",
          icon: "success",
          buttons: false,
          timer: 1000
        })
        // Realizar cualquier acción adicional después de agregar el caso
      } else {
        swal({
          title: "Error?",
          text: "Error al agregar el caso",
          icon: "error",
          buttons: false,
          timer: 1500
        })
        // Realizar cualquier acción en caso de error
      }
    })
    .catch(error => {
      console.log('Error en la solicitud:', error);
      // Realizar cualquier acción en caso de error de red u otra excepción
    });
  console.log(caso);
}

var agregarcaso = new bootstrap.Modal(document.getElementById('modalAgregarCaso'));

function MostrarModalCaso() {

  var selectHospital = document.getElementById('hospital');

  // Realizar la solicitud GET al endpoint del controlador para obtener la lista de hospitales
  fetch('http://SistemaCovid-19.somee.com/Hospital')
    .then(response => response.json())
    .then(data => {
      // Recorrer los datos obtenidos y generar las opciones del select
      data.forEach(hospital => {
        // Crear una nueva opción
        var option = document.createElement('option');
        option.value = hospital.nombre; // Establecer el valor de la opción como el ID del hospital
        option.textContent = hospital.nombre; // Establecer el texto de la opción como el nombre del hospital
        selectHospital.appendChild(option); // Agregar la opción al select
      });
    })
    .catch(error => console.log(error));

  agregarcaso.show()
}