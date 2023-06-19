var tablaHospital = document.querySelector('#tBody-Hospital');
var tablaUsuarioModal = document.querySelector('#tBody-Usuario-Modal');
var dataG ={};
var data ={};
function cargarDatos() {
    var nombre = document.getElementById('nombre').value;
    var provinvincia = document.getElementById('provincia').value;

   data = {
        idHospital: 0,
        nombre: nombre,
        provincia: provinvincia,
        estado: "ACT"
    };
}
function cargarTablaHospital() {
    tablaHospital.innerHTML = ``;
    fetch("http://SistemaCovid-19.somee.com/Hospital")
        .then(respuesta => respuesta.json())
        .then((data) => {
            dataG=data;
            for (const hospital of data) {
                tablaHospital.innerHTML += `
                <tr>
                    <td>${hospital.idHospital}</td>
                    <td>${hospital.nombre}</td>
                    <td>${hospital.provincia}</td>
                    <td>${hospital.estado}</td>
                    <td class="text-center flex" style="padding-right: 0px;">
                        <button class="btn btn-primary" type="button"onclick="mostrarModalEditar(${hospital.idHospital},'${hospital.nombre}','${hospital.estado}','${hospital.provincia}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger" onclick="eliminarHospital('${hospital.nombre}','${hospital.nombre}')">
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
cargarTablaHospital();



function agragarHospital() {
    cargarDatos();
    fetch("http://SistemaCovid-19.somee.com/Hospital/agregar",
        {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((contenidoRespuesta) => {
            if(contenidoRespuesta.status){
                cargarTablaHospital();
            }
        })
}
var modalEditarHospital = new bootstrap.Modal(document.getElementById('modalEditarHospital'));
function mostrarModalEditar(idHospital, nombre, estado, provincia ) {

    document.getElementById('m-idHospital').value = idHospital;
    document.getElementById('m-nombre').value = nombre;
    document.getElementById('m-provincia').value = provincia;
    document.getElementById('m-estado').value = estado.trim();
    modalEditarHospital.show();
}
function cargarDatosModal()
{
    var nombre = document.getElementById('m-nombre').value;
    var provinvincia = document.getElementById('m-provincia').value;
    var idHospital=  document.getElementById('m-idHospital').value;
    var estado = document.getElementById('m-estado').value.trim();
   data = {
        idHospital: idHospital,
        nombre: nombre,
        provincia: provinvincia,
        estado: estado
    };
}
function editarHospital() {
    cargarDatosModal();
    console.log(data);
    fetch("http://SistemaCovid-19.somee.com/Hospital/modificar",
    {
        method :"PUT",
        headers:{
            "content-type": "application/json"
        },
        body : JSON.stringify(data)
    }).then(response =>{
        if (response.status == 200) {
            swal({
                title: "Eliminado Correctamente",
                icon: "success",
                buttons: false,
                timer: 1000
            });
            modalEditarHospital.hide();
            cargarTablaHospital();
        } else {
            swal({
                title: "Error Al eliminar",
                icon: "error",
                buttons: false,
                timer: 1000
            });
        }
    })
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
                    editarHospital();
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
                    agragarHospital();
                    form.reset();
                }
                form.classList.add('was-validated')
            }, false)
        })
})();




function desactivar(respuesta) {
    if (respuesta.estado.trim() !== "INAC") {
        respuesta.estado = "INAC"
        fetch("http://SistemaCovid-19.somee.com/Hospital/desactivar/",
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
                    cargarTablaHospital();
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
function getHospital(idHospital) {
    return fetch("http://SistemaCovid-19.somee.com/Hospital/" + idHospital)
        .then(response => response.json())
        .then((json) => {
            return json;
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

function eliminarHospital(id,nombre)
{
    swal({
        title: "Esta seguro que desea eliminar el Hosital: " + nombre,
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            getHospital(id).then(respuesta => desactivar(respuesta));
        }
    });
}

var inputBuscar = document.getElementById("buscar");
inputBuscar.addEventListener('input',function(){
    var nombre='';
    tablaHospital.innerHTML = '';
     for(const hospi of dataG){
         nombre=hospi.nombre.trim();
        if(nombre.toLowerCase().startsWith(inputBuscar.value.toLowerCase()))
        {
            tablaHospital.innerHTML += `
            <tr>
                <td>${hospi.idHospital}</td>
                <td>${hospi.nombre}</td>
                <td>${hospi.provincia}</td>
                <td>${hospi.estado}</td>
                <td class="text-center flex" style="padding-right: 0px;">
                    <button class="btn btn-primary" type="button"onclick="mostrarModalEditar(${hospi.idHospital},'${hospi.nombre}','${hospi.estado}','${hospi.provincia}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" onclick="eliminarHospital('${hospi.nombre}','${hospi.nombre}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>`;
        }
     }
})