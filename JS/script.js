

// //?  Esperamos que el HTML este totalmente cargado para ejecutar
document.addEventListener("DOMContentLoaded", function () {

    const toggleBtn = document.querySelector(".menu-toggle");
    const navBar = document.querySelector(".nav-bar");
    const navLink = document.querySelectorAll(".nav-link");

    //? Esto agrega la clase activo al menu-toggle // abre y cierra el boton 
    toggleBtn.addEventListener("click", () => {
        navBar.classList.toggle("activo");

        //? Esto facilita a los lectores de pantalla, actualiza a true o false dependiendo si el menu esta abierto o no
        const expanded = navBar.classList.contains('activo');
        toggleBtn.setAttribute('aria-expanded', expanded);
    })

    //? Cerramos el menu cuando hacemos click en algun enlace, 
    navLink.forEach(navLink => {
        navLink.addEventListener("click", () => {
            navBar.classList.remove("activo");
            toggleBtn.setAttribute("aria-expanded", "false")
        })
    })
})