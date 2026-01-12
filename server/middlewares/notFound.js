import AppError from "../utils/AppError.js"

export function notFound(req, res, next) {
    const error = new AppError(
        404,
        "Ruta no encontrada",
        "NOT_FOUND"
    )
    next(error);
};


