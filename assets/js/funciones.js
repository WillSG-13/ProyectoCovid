
var navbar = document.querySelector('#masternav');
function nav() {
    navbar.innerHTML += 
    `<nav class="navbar navbar-light navbar-expand-md " style="background: #4b70dc;">
            <div class="container-fluid">
                <a class="navbar-brand d-flex align-items-center" href="#"
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
                    <span style="color: rgba(255,255,255,0.9);font-size: 50px;padding-right: 0px;padding-bottom: 0px;">CRcovid</span>
                </a>
        </nav>`;
}


var masternav = document.querySelector('#masternav-lateral');
function navLateral() {
    masternav.innerHTML +=` 
    <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 " >
    <div class=" flex-column p-0">
        <hr class="sidebar-divider my-0">

        <ul class="navbar-nav text-light" >
            <li class="nav-item">
                <a class="nav-link active"  href="index.html" >
                    <span>Estadisticas</span>
                </a>
            </li>
            <li class="nav-item ">
                <a class="nav-link active" role="button" data-bs-toggle="collapse" aria-controls="accordionSidebar" href="#accordionSidebar">
                    <span>Catalogos</span>
                </a>
                <ul class="navbar-nav text-light collapse" id="accordionSidebar">
                    <li class="nav-item ">
                        <a class="nav-link active" role="button" href="procedimientos.html">
                            <span>Procedimientos</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link  active" href="germenes.html">
                            <span>Germenes</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="Diagnostico.html">
                            <span>Diagonosticos</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="equipos.html">
                            <span>Equipos</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="equipos.html">
                            <span>Organos</span>
                        </a>
                    </li>
                </ul> 
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="catalogoGlobal.html">
                    <span>Global de Catalogos</span>
                </a>
            </li>
        </ul>
    </div>
</nav> `;
}
nav();
navLateral();