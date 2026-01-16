

// //?  Esperamos que el HTML este totalmente cargado para ejecutar
document.addEventListener("DOMContentLoaded", function () {

    const toggleBtn = document.querySelector(".menu-toggle");
    const navBar = document.querySelector(".nav-bar");
    const navLink = document.querySelectorAll(".nav-link");
    const titleServicios = document.querySelector(".services-grid > h2");
    const buttonsModalOpen = document.querySelectorAll(".open-modal");
    const modalOverlay = document.querySelector(".modal-overlay")
    const closeModal = document.querySelector(".close-modal")



    //* for each para recorrer todos los botones para abrir el
    //* modal overlay, "modal" es solo una referencia a los botones
    buttonsModalOpen.forEach(modal => {
        modal.addEventListener("click", () => {
            modalOverlay.showModal()
        })
    })
    //* Cerrar modal
    closeModal.addEventListener("click", () => {
        modalOverlay.close()
    })

    //? Esto agrega la clase activo al menu-toggle // abre y cierra el boton 
    toggleBtn.addEventListener("click", () => {
        navBar.classList.toggle("activo");
        toggleBtn.classList.toggle("active");

        //? Esto facilita a los lectores de pantalla, actualiza a true o false dependiendo si el menu esta abierto o no
        const expanded = navBar.classList.contains('activo');
        toggleBtn.setAttribute('aria-expanded', expanded);
    })

    //? Cerramos el menu cuando hacemos click en algun enlace, 
    navLink.forEach(navLink => {
        navLink.addEventListener("click", () => {
            navBar.classList.remove("activo");
            toggleBtn.classList.remove("active");
            toggleBtn.setAttribute("aria-expanded", "false")
        })
    })

    //? Cerrar el menú al hacer clic fuera de él
    document.addEventListener("click", (e) => {
        if (!navBar.contains(e.target) && !toggleBtn.contains(e.target) && navBar.classList.contains("activo")) {
            navBar.classList.remove("activo");
            toggleBtn.classList.remove("active");
            toggleBtn.setAttribute("aria-expanded", "false");
        }
    })

    //? Cerrar el menú con la tecla ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navBar.classList.contains("activo")) {
            navBar.classList.remove("activo");
            toggleBtn.classList.remove("active");
            toggleBtn.setAttribute("aria-expanded", "false");
        }
    })

    //? Observador para animar la linea del titulo en sección servicios
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                titleServicios.classList.add("linea-activa");
            }
        })
    }, {
        threshold: 0.5
    });
    observer.observe(titleServicios)
})