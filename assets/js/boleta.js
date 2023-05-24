function alerta(){
    
    swal({
        title: "Quiere agregar el Equipo?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("se agrego equipo", {
            icon: "success",
          });
        } 
      });
}
function alertaAceptarProcedimiento(){
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
var myModal = new bootstrap.Modal(document.getElementById('modalId'));
function mostrarEquipo(){
    document.getElementById('ModalModificarEquipable').style.visibility = "hidden"; 
    myModal.show();
    
}

var ModalModificarNoEquipable = new bootstrap.Modal(document.getElementById("modalModificarNoEquipable"));
function mostrarModalModificarNoequipable(){
    ModalModificarNoEquipable.show();
   
}

var ModalModificarEquipable = new bootstrap.Modal(document.getElementById('ModalModificarEquipable'));
function mostrarModalModificarEquipable(){
    tipo=true;
    ModalModificarEquipable.show();
}
function ocultar()
{
    document.getElementById('ModalModificarEquipable').style.visibility = "visible"; 
}

var modalEditarUsuario = new bootstrap.Modal(document.getElementById('modalEditarUsuario'));
function mostrarModalEditarUsuario(){
    modalEditarUsuario.show();
}

