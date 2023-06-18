var tablaUsuario = document.querySelector('#tBody-Usuario');
function cargarDatos() {
   var numeroCedula = parseInt(document.getElementById('numeroCedula').value);
   var nombreCompleto = document.getElementById('nombreCompleto').value;
   var fechaNacimiento = document.getElementById('fechaNacimiento').value;
   var numeroTelefono = parseInt(document.getElementById('numeroTelefono').value);
   var email = document.getElementById('email').value;
   var contrasena = document.getElementById('password').value;
   var rol = document.getElementById('rol').value;
    data ={
        "idUsuario": 0,
        "numeroCedula": numeroCedula,
        "nombreCompleto": nombreCompleto,
        "fechaNacimiento": fechaNacimiento,
        "numeroTelefono": numeroTelefono,
        "email": email,
        "contrasena": contrasena,
        "rol": rol,
        "estado": "ACT"
    };
}
//meto que maneja la interfaz de los usuarios el form
(function () {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                else {
                    agregarUsuario(event);
                    form.reset();
                    setTimeout(cargarUsuario(),2500);
                }
                form.classList.add('was-validated')
            }, false)
        })
})()


 function agregarUsuario(e) {
    e.preventDefault();
    cargarDatos();
    console.log(data);
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
            console.log(contenidoRespuesta);
        })
        .catch(console.log)
       
        
}

function cargarUsuario() {
    tablaUsuario.innerHTML='';
    console.log("hola cargando .....");
    fetch("http://SistemaCovid-19.somee.com/Usuarios")
        .then(respuesta => respuesta.json())
        .then((data) => {
            for (const usuario of data) {
                tablaUsuario.innerHTML += `
            <tr>
            <td>${usuario.numeroCedula}</td>
            <td>${usuario.nombreCompleto}</td>
            <td>${usuario.fechaNacimiento.split("T")[0]}</td>
            <td>${usuario.email}</td>
            <td>${usuario.numeroTelefono}</td>
            <td>${usuario.idUsuario}</td>
            <td>${usuario.estado}</td>
            <td>${usuario.rol}</td>
           
            <td class="text-center flex" style="padding-right: 0px;">
                <button class="btn btn-primary" type="button"><i
                        class="fas fa-edit"></i></button>
                <button class="btn btn-danger" type="button"><i
                        class="fas fa-trash"></i></button>
            </td>
        </tr>`;
            }
        });
}

cargarUsuario();
