export function crearContacto(req, res) {
    const data = req.body;


    res.status(200).json({
        status: "ok",
        message: "Contacto recibido",
        data
    })
}