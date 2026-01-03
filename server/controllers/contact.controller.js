import { validateContact } from "../utils/validateContact.js"
import { procesarSolicitudContacto } from "../services/contact.service.js"

export async function crearContacto(req, res) {
    const resultado = validateContact(req.body);

    if (!resultado.isValid) {
        return res.status(400).json({
            status: "error",
            errors: resultado.errors
        });
    }

    try {
        const serviceResultado = await procesarSolicitudContacto(resultado.clean)

        if (!serviceResultado.ok) {
            return res.status(500).json({
                status: "error",
                message: "No se pudo procesar la solicitud."
            });
        }

        return res.status(200).json({
            status: "ok",
            message: "Solicitud recibida. Te contactaremos pronto!",
            requestId: serviceResultado.id
        });
    } catch (err) {
        console.error("Error procesando contacto", err);

        return res.status(500).json({
            status: "error",
            message: "Error interno del servidor"
        })
    }
}
