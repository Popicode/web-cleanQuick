export default class AppError extends Error {
    constructor(statusCode, publicMessage, code) {
        super(publicMessage); // obligatorio pq heredamos de la clase padre sus atributos
        this.statusCode = statusCode; // http
        this.code = code // errores logicos
        this.isOperational = true
        this.name = "AppError"
    }
}
