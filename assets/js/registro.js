
function agregarUsuario() {
    cargarDatos();
    fetch("http://SistemaCovid-19.somee.com/Usuarios/agregar",
        {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(respuesta => respuesta.json())
        .then((contenidoRespuesta) => {
            if (contenidoRespuesta === true) {
                swal({
                    title: "Agreagado Correctamente",
                    icon: "success",
                    buttons: false,
                    timer: 1000
                });
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
}
function cargarDatos() {
    var numeroCedula = parseInt(document.getElementById('m-numeroCedula').value);
    var nombreCompleto = document.getElementById('m-nombreCompleto').value;
    var fechaNacimiento = document.getElementById('m-fechaNacimiento').value;
    var numeroTelefono = parseInt(document.getElementById('m-numeroTelefono').value);
    var email = document.getElementById('m-email').value;
    var contrasena = document.getElementById('m-password').value;
    data = {
        "idUsuario": 0,
        "numeroCedula": numeroCedula,
        "nombreCompleto": nombreCompleto,
        "fechaNacimiento": fechaNacimiento,
        "numeroTelefono": numeroTelefono,
        "email": email,
        "contrasena": contrasena,
        "rol": "COM",
        "estado": "ACT"
    };
}


(function () {
    'use strict';
  
    var form = document.getElementById('needs-validation');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();
  
      if (form.checkValidity()) {
        agregarUsuario(); // Llamar a la función para agregar el usuario
        form.reset(); // Reiniciar el formulario si es necesario
      }
  
      form.classList.add('was-validated');
    }, false);
  })();
