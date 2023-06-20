var tablaUsuario = document.querySelector('#tBody-Usuario');
var tablaUsuarioModal = document.querySelector('#tBody-Usuario-Modal');
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
        .then(respuesta => {
            if (respuesta.status == 200) {
                modalEditarUsuario.hide();
                cargarUsuario();
            }
        })
        .catch(console.log)
}
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
                cargarUsuario();
                console.log("hoola que hce");
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

var modalEditarUsuario = new bootstrap.Modal(document.getElementById('modalEditarUsuario'));
function mostrarModalEditar(idUsuario, numeroCedula, estado, rol, nombreCompleto,
    fechaNacimiento, email, numeroTelefono, contrasena) {
    document.getElementById('id').value = idUsuario;
    document.getElementById('m-numeroCedula').value = numeroCedula;
    document.getElementById('m-nombreCompleto').value = nombreCompleto;
    document.getElementById('m-fechaNacimiento').value = fechaNacimiento;
    document.getElementById('m-numeroTelefono').value = numeroTelefono;
    document.getElementById('m-email').value = email;
    document.getElementById('m-password').value = contrasena;
    document.getElementById('m-rol').value = rol;
    document.getElementById('m-estado').value = estado.trim();

    modalEditarUsuario.show();
}

function cargarUsuario() {
    tablaUsuario.innerHTML = '';
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
                        <button class="btn btn-danger" type="button" onclick="eliminarUsuario(${usuario.numeroCedula},
                            '${usuario.nombreCompleto}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>`;
            }``
        });
}
function cargarUsuarioModal() {
    tablaUsuarioModal.innerHTML = '';
    fetch("http://SistemaCovid-19.somee.com/Usuarios")
        .then(respuesta => respuesta.json())
        .then((data) => {
            for (const usuario of data) {
                tablaUsuarioModal.innerHTML += `
                <tr>
                    <td>${usuario.idUsuario}</td>
                    <td>${usuario.numeroCedula}</td>
                    <td>${usuario.nombreCompleto}</td>
                    <td>${usuario.fechaNacimiento}</td>
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
                        <button class="btn btn-danger" type="button" onclick="eliminarUsuario(${usuario.numeroCedula},
                            '${usuario.nombreCompleto}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>`;
            }
        });
}

function eliminarUsuario(cedula, nombre) {
    swal({
        title: "Esta seguro que desea eliminar el usuario: " + nombre,
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            getUsuario(cedula).then(respuesta => desactivar(respuesta));
        }
    });
}

cargarUsuario();


function getUsuario(cedula) {
    return fetch("http://SistemaCovid-19.somee.com/Usuarios/" + cedula)
        .then(response => response.json())
        .then((json) => {
            return json;
        })
        .catch(error => {
            console.log('Error:', error);
        });
}


function desactivar(respuesta) {
    if (respuesta.estado.trim() !== "INAC") {
        respuesta.estado = "INAC"
        fetch("http://SistemaCovid-19.somee.com/Usuarios/desactivar/",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(respuesta)
            })
            .then(response => {
                if (response.status == 200) {
                    swal({
                        title: "Eliminado Correctamente",
                        icon: "success",
                        buttons: false,
                        timer: 1000
                    });
                    cargarUsuario();
                } else {
                    swal({
                        title: "Error Al eliminar",
                        icon: "error",
                        buttons: false,
                        timer: 1000
                    });
                }
            })
            .catch(console.log);
    } else {
        swal({
            title: "No se puede desactivar porque ya se encuentra desactivado",
            icon: "error",
            buttons: true,
        });
    }

}
var modalBusqueda = new bootstrap.Modal(document.getElementById('modalBusqueda'));
 
function mostrarModalBuscar() {
    
    var radioButtons = document.getElementsByName('optionsRadios');
    radioButtons.forEach(function (radioButtons) {
        radioButtons.addEventListener('change', function () {
            console.log(radioButtons.value);
            buscarUserPorRol(radioButtons.value).then(respuesta=>cargarTablaRol(respuesta));
        })
    })
    cargarUsuarioModal()
    modalBusqueda.show();
}

function buscarUserPorRol(rol) {
    return fetch("http://SistemaCovid-19.somee.com/Usuarios/getUsuarioRol/" +rol)
        .then(response => response.json())
        .then((json) => {
            return json;
        })
        .catch(error => {
            console.log('Error:', error);
        });
}
function cargarTablaRol(data) {
    tablaUsuarioModal.innerHTML = ``;
    for (const usuario of data) {
        tablaUsuarioModal.innerHTML += `
            <tr>
                <td>${usuario.idUsuario}</td>
                <td>${usuario.numeroCedula}</td>
                <td>${usuario.nombreCompleto}</td>
                <td>${usuario.fechaNacimiento}</td>
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
                    <button class="btn btn-danger" type="button" onclick="eliminarUsuario(${usuario.numeroCedula},
                        '${usuario.nombreCompleto}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>`;
        }
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
                event.preventDefault();
                if (!form.checkValidity()) {
                    event.stopPropagation();
                }
                else {
                    agregarUsuario();
                    form.reset();
                }
                form.classList.add('was-validated')
            }, false)
        })
})();
