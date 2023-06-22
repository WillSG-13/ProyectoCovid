
function logueo() {
  var correo = document.getElementById("email").value;
  var contrasena = document.getElementById("password").value;
  console.log(correo + "  " + contrasena);

  var solicitud = {
    email: correo,
    contrasena: contrasena
  };

  fetch('http://SistemaCovid-19.somee.com/Usuarios/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*'
    },
    body: JSON.stringify(solicitud)
  })
    .then(response => response.json())
    .then(data => {
      var usuario = data;
      if (usuario.rol) {
        sessionStorage.setItem("sesion", "true");
        sessionStorage.setItem("rol", usuario.rol);
        sessionStorage.setItem("nombre", usuario.nombreCompleto)
        sessionStorage.setItem("id", usuario.idUsuario);
        window.location.href = "index.html";
      } else {
        swal("Error:El nombre de usuario o contraseña incorrecta", {
          icon: "error",
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

