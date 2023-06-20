var tablaPaciente = document.querySelector('#tBody-Paciente');
var data = {};
function cargarDatos() {
    var cedula = parseInt(document.getElementById("numeroCedula").value);
    var nombreCompleto = document.getElementById("nombreCompleto").value;
    var edad = document.getElementById("edad").value;
    var provincia = document.getElementById("provincia").value;
    var numeroTelefono = parseInt(document.getElementById("numeroTelefono").value);
    var email = document.getElementById("email").value;
    var etapaDeVida = document.getElementById("etapaDeVida").value;

    data = {
        "cedula": cedula,
        "nombreCompleto": nombreCompleto,
        "edad": edad,
        "cantidadCasosAsociados": 0,
        "provincia": provincia,
        "email": email,
        "numeroTelefono": numeroTelefono,
        "estado": ' ACT',
        "etapaVida": etapaDeVida
    }
}

function cargarTablaPaciente() {
    tablaPaciente.innerHTML = ``;
    fetch("http://SistemaCovid-19.somee.com/Paciente")
        .then(respuesta => respuesta.json())
        .then((data) => {
            for (const paciente of data) {
                tablaPaciente.innerHTML += `
                <tr>
                <td>${paciente.cedula}</td>
                <td>${paciente.nombreCompleto}</td>
                <td>${paciente.edad}</td>
                <td>${paciente.cantidadCasosAsociados}</td>
                <td>${paciente.provincia}</td>
                <td>${paciente.email}</td>
                <td>${paciente.numeroTelefono}</td>
                <td>${paciente.estado}</td>
                <td>${paciente.etapaVida}</td>

                    <td class="text-center flex" style="padding-right: 0px;">
                        <button class="btn btn-primary" type="button"onclick="motrarModalEditar(${paciente.cedula}, '${paciente.nombreCompleto}','${paciente.edad}',
                        '${paciente.provincia}',${paciente.cantidadCasosAsociados},'${paciente.email}',${paciente.numeroTelefono},'${paciente.estado.trim()}','${paciente.etapaVida}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger" >
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>`;
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

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
                    agregarpaciente();
                    form.reset();
                }
                form.classList.add('was-validated')
            }, false)
        })
})();



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

var modalEditarPaciente = new bootstrap.Modal(document.getElementById("modalEditarPaciente"));
function motrarModalEditar(cedula, nombre, edad, provincia, cantidadDeCasos, email, numeroTelefono, estado, etapaDeVida) 
{
    document.getElementById("m-numeroCedula").value = cedula;
    document.getElementById("m-nombreCompleto").value = nombre;
    document.getElementById("m-edad").value = edad;
    document.getElementById("m-provincia").value = provincia;
    document.getElementById("m-numeroTelefono").value = numeroTelefono;
    document.getElementById("m-email").value = email;
    document.getElementById("m-etapaDeVida").value = etapaDeVida;
    document.getElementById("m-cantidadDeCasos").value = cantidadDeCasos;
    document.getElementById("m-estado").value = estado;

    modalEditarPaciente.show();
}

cargarTablaPaciente();
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