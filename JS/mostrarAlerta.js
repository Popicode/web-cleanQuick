const mostrarAlerta = (alertaExito, mensaje, esError = false) => {
    alertaExito.classList.remove('mostrar', 'error');
    alertaExito.textContent = mensaje

    if (esError) {
        alertaExito.classList.add('error')
    } else {
        alertaExito.classList.add('mostrar')
    }

    setTimeout(() => {
        alertaExito.classList.remove('mostrar', 'error');
    }, 3000);
}