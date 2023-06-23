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
}
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
function agregarSintomas() {
  //--------------------------------------------------
  var tabla = document.querySelector('#dataTable');
  // Obtener todas las filas de la tabla
  var filas = tabla.getElementsByTagName('tr');
  // Array para almacenar los datoshttps://localhost:7174/Casos/ultimoCasoAgregado
  var datos = [];
  fetch('http://SistemaCovid-19.somee.com/Casos/ultimoCasoAgregado')
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
        var objeto = {idSintomaCaso:0, caso: ultimo, sintoma: nombre, cantidadDias: cantidad };
        // Agregar el objeto al array de datos
        datos.push(objeto);
      }
      // Hacer algo con los datos, incluyendo el último caso
      // ...
      for(const cs of datos){
       
        fetch('http://SistemaCovid-19.somee.com/SinstomaCaso/agregarSintomaCaso', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cs)
        })
          .then(response =>{
            console.log(response.status);
            console.log(cs);
          })
          .catch(error => {
            // Manejar cualquier error
            console.error('Error:', error);
          });
      }
    
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
function agregarCaso() {

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
        agregarSintomas();
        document.getElementById("Buscador").value = "";
        agregarcaso.hide();setTimeout(function() {
          window.location.href = "caso.html";
        }, 1500);
        // Realizar cualquier acción adicional después de agregar el caso
      } else {
        swal({
          title: "Error?",
          text: "Error al agregar el caso",
          icon: "error",
          buttons: false,
          timer: 1000
        })
        // Realizar cualquier acción en caso de error
      }
    })
    .catch(error => {
      console.log('Error en la solicitud:', error);
      // Realizar cualquier acción en caso de error de red u otra excepción
    });
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
function verificarEtiquetas() {
  
  var etiquetas = document.querySelectorAll('.master b');
  for (var i = 0; i < etiquetas.length; i++) {
    if (etiquetas[i].textContent.trim() === '') {
      return false;
    }
  }
  return true;
}
function setCaso(){
  if(verificarEtiquetas()){
    agregarCaso();
  }
  else{ swal({
    title: "Error!",
    text: "Faltan datos ",
    icon: "error",
    buttons: false,
    timer: 1000
  })
  }
}
function agregarUsuario(){
  
}

//estos metodos no estan en uso para implementar no eliminar 
function agregarpaciente() {
  cargarDatos();
  fetch("http://SistemaCovid-19.somee.com/Paciente/agregar", {
      method: "PUT",
      headers: {
          "content-type": "application/json"
      },
      body: JSON.stringify(data)
  })
      .then((contenidoRespuesta) => {
          if (contenidoRespuesta.status === 200) {
              cargarTablaPaciente();
          }
      })
      .catch(error => {
          console.log('Error:', error);
      });
}
(function () {
  'use strict'
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.m-needs-validation')
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
      .forEach(function (form) {
          form.addEventListener('submit', function (event) {
              event.preventDefault();
              if (!form.checkValidity()) {
                  event.stopPropagation();
              }
              else {
                  editarPaciente();
              }
              form.classList.add('was-validated')
          }, false)
      })
})();
function editarPaciente() {
  cargarDatosModal();
  console.log(data)
  fetch("http://SistemaCovid-19.somee.com/paciente/modificar",
      {
          method: "PUT",
          headers: {
              "content-type": "application/json"
          },
          body: JSON.stringify(data)
      })
      .then(respuesta => {
          if (respuesta.status == 200) {
              modalEditarPaciente.hide();
              cargarTablaPaciente();
          }
      })
      .catch(console.log)
}
function cargarDatosModal() {
  var cedula = parseInt(document.getElementById("m-numeroCedula").value);
  var nombreCompleto = document.getElementById("m-nombreCompleto").value;
  var edad = document.getElementById("m-edad").value;
  var provincia = document.getElementById("m-provincia").value;
  var numeroTelefono = parseInt(document.getElementById("m-numeroTelefono").value);
  var email = document.getElementById("m-email").value;
  var etapaDeVida = document.getElementById("m-etapaDeVida").value;
  var cantidadDeCasos =  parseInt(document.getElementById("m-cantidadDeCasos").value);
  var estado = document.getElementById("m-estado").value;
  console.log(cedula)
  data = {
      cedula: cedula,
      nombreCompleto: nombreCompleto,
      edad: edad,
      cantidadCasosAsociados: cantidadDeCasos,
      provincia: provincia,
      email: email,
      numeroTelefono: numeroTelefono,
      estado: estado,
      etapaVida: etapaDeVida
  }
  
}