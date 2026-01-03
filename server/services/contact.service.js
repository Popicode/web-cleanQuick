export async function procesarSolicitudContacto(data) {
    console.log('Solicitud de datos recibida: ', data);

    return {
        ok: true,
        id: generarIdSimple()
    };
}

function generarIdSimple() {
    return Math.random().toString(16).slice(2, 10)
} // esta funcion es de prueba