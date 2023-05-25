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

var ModalAgregarSintoma = new bootstrap.Modal(document.getElementById('modalAgregarSintoma'));
function mostrarModalAgregarSintoma(){
  ModalAgregarSintoma.show();}

  var modalEditarUsuario = new bootstrap.Modal(document.getElementById('modalEditarPaciente'));

function mostrarModalEditarUsuario(){
  modalEditarUsuario.show();}