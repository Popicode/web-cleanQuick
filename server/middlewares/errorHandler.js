export default function errorHandler(err, req, res, next) {

    const nodeEnv = process.env.NODE_ENV || "production"

    let status;
    let message;
    let code;

    if (err.isOperational === true) {
        status = err.statusCode;
        message = err.message;
        code = err.code
    } else {
        status = 500
        if (nodeEnv === "production") {
            message = "Error interno del servidor"
        } else {
            message = err.message
        }
    };

    const response = {
        success: false,
        message: message
    };

    if (code) {
        response.code = code
    }
    if (nodeEnv === "development") {
        response.stack = err.stack
    };

    res.status(status).json(response);
}