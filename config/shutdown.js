
let isShuttingDown = false

export default function shutdown(server, signal, exitCode) {
    if (isShuttingDown) return;
    isShuttingDown = true;

    console.log(`Senal recibida: ${signal}`)


    const timeOutShut = setTimeout(() => {
        console.log('Forzando cierre despues de 10s')
        process.exit(exitCode)

    }, 10000)

    server.close((err) => {
        clearTimeout(timeOutShut);

        if (err) {
            console.error(`Error al cerrar servidor: ${err}`)
            process.exit(exitCode)
        };

        console.log('Servidor cerrado correctamente')
        process.exit(exitCode)
    })
}
