function logueo() {
  // Datos del formulario
  var correo = document.getElementById("email").value;
  var contrasena = document.getElementById("password").value;
  console.log(correo + "" + contrasena);
  // Objeto de configuración para la solicitud 
  fetch("https://localhost:7174/Usuarios/Login/"+correo +"/"+contrasena,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    })
    .then(respuesta => respuesta.json())
    .then(respuesta => {
      var usuario = respuesta;
      console.log(usuario);
      if (usuario.rol !== undefined) {
        sessionStorage.setItem("sesion", "true");
        sessionStorage.setItem("rol", usuario.rol);
        sessionStorage.setItem("nombre", usuario.nombreCompleto);
        sessionStorage.setItem("id", usuario.idUsuario);
        window.location.href = "index.html";
      } else {
        swal("Error:El nombre de usuario o contraseña incorrecta", {
          icon: "error",
        });
      }

    }).catch(console.log)
}

function f() {
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
      // Verificar la respuesta
      if (data.IsSuccessful) {
        console.log('Inicio de sesión exitoso');
        console.log('Usuario:', data.User);
      } else {
        console.log('Credenciales inválidas');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

