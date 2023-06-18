var idUsuario = 0;
var numeroCedula = 0;
var nombreCompleto = "";
var fechaNacimiento = "";
var numeroTelefono = 0;
var email = "";
var contrasena = "";
var rol = "";
var estado = "";


function cargarDatos() {
    numeroCedula = parseInt(document.getElementById('numeroCedula').value);
    nombreCompleto = document.getElementById('nombreCompleto').value;
    fechaNacimiento = document.getElementById('fechaNacimiento').value;
    numeroTelefono = parseInt(document.getElementById('numeroTelefono').value);
    email = document.getElementById('email').value;
    contrasena = document.getElementById('password').value;
    rol = document.getElementById('rol').value;
    estado = "Act";
    idUsuario = 0;
}
cargarUsuario();
var frm = document.getElementById("frmUsuario");
frm.addEventListener('submit',
    function (e) {
        e.preventDefault();
        cargarDatos();
        var data ={
        "idUsuario": 0,
        "numeroCedula": numeroCedula,
        "nombreCompleto": nombreCompleto,
        "fechaNacimiento": "2023-06-05T00:00:00",
        "numeroTelefono": numeroTelefono,
        "email": email,
        "contrasena": contrasena,
        "rol": rol,
        "estado": "ACT"
        };
        console.log(data);
        fetch("http://SistemaCovid-19.somee.com/Usuarios/agregar",
            {
                method: "PUT",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            .then(respuesta => respuesta.json())
            .then((contenidoRespuesta) => {
                console.log(contenidoRespuesta);
            })
            .catch(console.log)
    });

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
    var tablaUsuario = document.querySelector('#tBody-Usuario');
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
                }
                form.classList.add('was-validated')
            }, false)
        })
})()
