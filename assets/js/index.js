function validateLogin() {
    console.log(sessionStorage.getItem("sesion"))
    if (sessionStorage.getItem("sesion") == null || sessionStorage.getItem("sesion") == "false") {
      window.location.href = "login.html";
    } 
  }
  
  validateLogin();