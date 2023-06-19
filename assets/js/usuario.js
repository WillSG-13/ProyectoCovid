var tablaUsuario = document.querySelector('#tBody-Usuario');
var data = {
}
function cargarDatos() {
    var numeroCedula = parseInt(document.getElementById('numeroCedula').value);
    var nombreCompleto = document.getElementById('nombreCompleto').value;
    var fechaNacimiento = document.getElementById('fechaNacimiento').value;
    var numeroTelefono = parseInt(document.getElementById('numeroTelefono').value);
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('password').value;
    var rol = document.getElementById('rol').value;
    data = {
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
function cargarDatosModal() {

    var nombreCompleto = document.getElementById('m-nombreCompleto').value;
    var numeroCedula = parseInt(document.getElementById('m-numeroCedula').value);
    var fechaNacimiento = document.getElementById('m-fechaNacimiento').value;
    var numeroTelefono = parseInt(document.getElementById('m-numeroTelefono').value);
    var email = document.getElementById('m-email').value;
    var contrasena = document.getElementById('m-password').value;
    var rol = document.getElementById('m-rol').value;
    var estado = document.getElementById('m-estado').value;
    var id = parseInt(document.getElementById('id').value);

    data = {
        "idUsuario": id,
        "numeroCedula": numeroCedula,
        "nombreCompleto": nombreCompleto,
        "fechaNacimiento": fechaNacimiento,
        "numeroTelefono": numeroTelefono,
        "email": email,
        "contrasena": contrasena,
        "rol": rol,
        "estado": estado
    };
}
//meto que maneja la interfaz de los usuarios el form
function editarUsuario(e) {
    e.preventDefault();
    cargarDatosModal();
    
    fetch("http://SistemaCovid-19.somee.com/Usuarios/modificar",
        {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(respuesta =>  {
            if(respuesta.status==200){
                modalEditarUsuario.hide();
                cargarUsuario();
            }
        })
        .catch(console.log)
}
//funciona para verificar los campos perod del modal 
function agregarUsuario() {
    e.preventDefault();
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
                cargarUsuario();
            }
        })
        .catch(console.log)
}
var modalEditarUsuario = new bootstrap.Modal(document.getElementById('modalEditarUsuario'));
function mostrarModalEditar(idUsuario, numeroCedula, estado, rol, nombreCompleto,
    fechaNacimiento, email, numeroTelefono, contrasena) {
    console.log(idUsuario);
    document.getElementById('id').value = idUsuario;
    document.getElementById('m-numeroCedula').value = numeroCedula;
    document.getElementById('m-nombreCompleto').value = nombreCompleto;
    document.getElementById('m-fechaNacimiento').value = fechaNacimiento;
    document.getElementById('m-numeroTelefono').value = numeroTelefono;
    document.getElementById('m-email').value = email;
    document.getElementById('m-password').value = contrasena;
    document.getElementById('m-rol').value = rol;
    document.getElementById('m-estado').value = estado;

    modalEditarUsuario.show();
}
function cargarUsuario() {
    tablaUsuario.innerHTML = '';
    console.log("hola cargando .....");
    fetch("http://SistemaCovid-19.somee.com/Usuarios")
        .then(respuesta => respuesta.json())
        .then((data) => {
            for (const usuario of data) {
                tablaUsuario.innerHTML += `
            <tr>
            <td>${usuario.idUsuario}</td>
            <td>${usuario.numeroCedula}</td>
            <td>${usuario.nombreCompleto}</td>
            <td>${usuario.fechaNacimiento.split("T")[0]}</td>
            <td>${usuario.email}</td>
            <td>${usuario.numeroTelefono}</td>
            <td>${usuario.estado}</td>
            <td>${usuario.rol}</td>
            <td class="text-center flex" style="padding-right: 0px;">
                <button class="btn btn-primary" type="button"onclick="mostrarModalEditar(
                    '${usuario.idUsuario}','${usuario.numeroCedula}','${usuario.estado}','${usuario.rol}',
                    '${usuario.nombreCompleto}','${usuario.fechaNacimiento}','${usuario.email}',
                    '${usuario.numeroTelefono}','${usuario.contrasena}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" type="button" " >
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>`;
            }
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
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                else {
                    editarUsuario(event);
                }
                form.classList.add('was-validated')
            }, false)
        })
})();

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
                }
                form.classList.add('was-validated')
            }, false)
        })
})();

cargarUsuario();