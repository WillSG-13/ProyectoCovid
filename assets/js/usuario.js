
var data = {};
var idUsuario = ""
var numeroCedula ="";
var nombreCompleto = "";
var fechaNacimiento ="";
var numeroTelefono = "";
var email = "";
var contrasena =""; 
var rol ="";
var estado =""; 


function cargarDatos() {
    numeroCedula = document.getElementById('numeroCedula').value;
    parseInt(numeroCedula);
    console.log(numeroCedula);
    nombreCompleto = document.getElementById('nombreCompleto').value;
    fechaNacimiento = document.getElementById('fechaNacimiento').value;
    numeroTelefono = document.getElementById('numeroTelefono').value;
    parseInt(numeroTelefono);
    email = document.getElementById('email').value;
    contrasena = document.getElementById('password').value;
    rol = document.getElementById('rol').value;
    estado = "Act";
    idUsuario = 0;

    data = {
        idUsuario: 0,
        numeroCedula:numeroCedula,
        nombreCompleto: nombreCompleto,
        fechaNacimiento: fechaNacimiento,
        numeroTelefono: numeroTelefono,
        email: email,
        contrasena: contrasena,
        rol: rol,
        estado: estado
    };

}



function agregarUsuario(e) {


    e.preventDefault();
    cargarDatos();
    console.log(data);
    fetch("http://SistemaCovid-19.somee.com/Usuarios/agregar",
        {
            method: "PUT",
            headers: {
                "content-type": "application/json"            },
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


cargarUsuario();

var frm  = document.getElementById("frmUsuario");



function cargarDatos() {
    numeroCedula = document.getElementById('numeroCedula').value;
    nombreCompleto = document.getElementById('nombreCompleto').value;
    fechaNacimiento = document.getElementById('fechaNacimiento').value;
    numeroTelefono = document.getElementById('numeroTelefono').value;
    parseInt(numeroTelefono);
    email = document.getElementById('email').value;
    contrasena = document.getElementById('password').value;
    rol = document.getElementById('rol').value;
    estado = "Act";
    idUsuario = 0;

    data = {
        "idUsuario": 1,
        "numeroCedula": 12345678,
        "nombreCompleto": "Johan",
        "fechaNacimiento": "2023-06-05T00:00:00",
        "numeroTelefono": 88888888,
        "email": "Johan@gmail.com",
        "contrasena": "123",
        "rol": "MED",
        "estado": "INAC "
    };

}
frm.addEventListener('submit',
function(e) {
    e.preventDefault();
    cargarDatos();
    console.log(data);
    fetch("http://SistemaCovid-19.somee.com/Usuarios/agregar",
        {
            method: "PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
        .then(respuesta => respuesta.json())
        .then((contenidoRespuesta) => {
            console.log(contenidoRespuesta);
        })
        .catch(console.log)
});