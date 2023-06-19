
var tablaPaciente = document.querySelector('#tBody-Paciente');

function cargarDatos(){
    var cedula = document.getElementById("Cedula").value;
    var cedula = document.getElementById("nombreCompleto").value;
    var cedula = document.getElementById("edad").value;
    var cedula = document.getElementById("provincia").value;
    var cedula = document.getElementById("numeroTelefono").value;
    var cedula = document.getElementById("email").value;
    var cedula = document.getElementById("etapaDeVida").value;
          
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
                        <button class="btn btn-primary" type="button"">
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

cargarTablaPaciente();
