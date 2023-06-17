
function validateLogin()
{
    console.log(getCookies())
    if (!getCookies()) {
        window.location.href="login.html";
    }
} 

//metodo retorna true si la cookie de la seccion existe 
function getCookies(){
    const cookies = document.cookie.split(";");   
    for (let i = 0; i < cookies.length; i++) {

        const cookie =cookies[i].trim();
        if (cookie.startsWith("sesion=true")) {
          return true;  
        }
    }
    return false;
}