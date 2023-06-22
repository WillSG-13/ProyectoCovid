
var navbar = document.querySelector('#masternav');
function nav() {
    navbar.innerHTML +=
        `<nav class="  navbar navbar-light navbar-expand-md bg-body-tertiary navi" style="background: #4b70dc;">
        <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" href="index.html"
        style="padding-left: 0px;height: 90px;margin-left: 25px;">
            <span
                class="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-bezier" 
                style="height: 40px;width: 40px;font-size: 67px;">
                    <path fill-rule="evenodd"
                        d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z">
                    </path>
                    <path
                        d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z">
                    </path>
                </svg>
            </span> 
            <span style="color: rgba(255,255,255,0.9);font-size: 30px;padding-right: 0px;padding-bottom: 0px;" >CRcovid</span>
        </a>
        <button class="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon" style=" "></span>
        </button>
        <div class="collapse navbar-collapse " id="navbar SupportedContent">
                <button type="button" class="btn btn-dark ml btnl"> <a class="nav-link" href="/login.html" id="menu-Item">Ingresar</a></button>
                <button type="button" class="btn btn-light btnl"> <a class="nav-link" href="/registro.html" id="menu-Item">Registrarse</a></button> 
        </div>
        </div>
    </nav>`;
}

var masternav = document.querySelector('#masternav-lateral');
function navLateral() {
    console.log(sessionStorage.getItem("rol"));
    if(sessionStorage.getItem("rol")==="ADMIN"  || sessionStorage.getItem("rol")==="DOC"){
    masternav.innerHTML += ` 
    <nav class="navbar navbar-dark align-items-start side sidebar-dark accordion bg-gradient-primary p-0 nav" >
    <div class=" flex-column p-0 m-4 ">
        <hr class="sidebar-divider my-0">

        <ul class="navbar-nav text-light" >
            <li class="nav-item">
            <a class="nav-link "  href="caso.html" >
                <span>Caso</span>
            </a>
        </li>
            <li class="nav-item ">
                <a class="nav-link " role="button" data-bs-toggle="collapse" aria-controls="accordionSidebar" href="#accordionSidebar">
                    <span>Catalogos</span>
                </a>
                <ul class="navbar-nav collapse mx-3" id="accordionSidebar">
                    <li class="nav-item  ">
                        <a class="nav-link active text" role="button" href="usuarios.html">
                            <span>Usuarios</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " href="hospitales.html">
                            <span>Hospitales</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " href="Pacientes.html">
                            <span>Pacientes</span>
                        </a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link " href="sintomas.html">
                        <span>Sintomas</span>
                    </a>
                </li>

                </ul> 
            </li>
            <li class="nav-item">
                <a class="nav-link "  href="index.html" >
                    <span>Estadisticas</span>
                </a>
            </li>
        </ul>
    </div>
</nav> `;
    }
}


nav();
navLateral();
