import { mostrarAlerta } from './mostrarAlerta.js'

// //?  Esperamos que el HTML este totalmente cargado para ejecutar
document.addEventListener("DOMContentLoaded", function () {

    const toggleBtn = document.querySelector(".menu-toggle");
    const navBar = document.querySelector(".nav-bar");
    const navLink = document.querySelectorAll(".nav-link");
    const titleServicios = document.querySelector(".services-grid > h2");
    const form = document.querySelector(".formulario-contacto");
    const btnDisabled = document.querySelector('.contact-btn')

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

    //? Cerrar el menú con escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navBar.classList.contains("activo")) {
            navBar.classList.remove("activo");
            toggleBtn.classList.remove("active");
            toggleBtn.setAttribute("aria-expanded", "false");
        }
    })

    // animación del title servicios
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


    // Enviar formulario pa el backend


    // mensaje de form exitoso

    const alertaExito = document.createElement("p");
    alertaExito.classList.add('alerta-exito')


    form.appendChild(alertaExito)


    // evitamos recargar la pagina 
    form.addEventListener("submit", async (e) => {
        e.preventDefault();


        // extraer el form y los datos
        const formData = new FormData(form);

        const name = (formData.get("name") || "").toString().trim();
        const email = (formData.get("email") || "").toString().trim();
        const tel = (formData.get("tel") || "").toString().trim();
        const servicios = (formData.get("servicios") || "").toString().trim();

        // guarda los datos extraidos 
        const payload = {
            name,
            email,
            tel,
            servicios
        }
        const textBtnOriginal = 'Enviar solicitud'
        btnDisabled.disabled = true;
        btnDisabled.textContent = 'Enviando...'

        // fetch API 
        try {
            const res = await fetch('http://localhost:3000/api/contacto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json()

            if (res.ok) {
                mostrarAlerta(alertaExito, 'Formulario enviado correctamente')
                form.reset()
                return
            };

            if (res.status === 429) {
                mostrarAlerta(alertaExito, data.message || "Demasiadas solicitudes, intenta más tarde", true)
                return
            };

            if (res.status === 400) {
                mostrarAlerta(alertaExito, data.message || 'Revisa los datos ingresados', true)
                return
            };

            if (res.status) {
                mostrarAlerta(alertaExito, 'Ocurrio un error inesperado, por favor intentalo nuevamente', true)
                return
            }

        } catch (err) {
            mostrarAlerta(alertaExito, 'Ocurrio un error inesperado', true)
        } finally {
            btnDisabled.disabled = false
            btnDisabled.textContent = textBtnOriginal
        }

    })
})