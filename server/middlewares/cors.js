import AppError from "../utils/AppError.js"

const varOriginCors = process.env.CORS_ORIGIN || "";

const allowedOrigins = varOriginCors
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

export function corsMiddleware(req, res, next) {

    const origin = req.headers.origin;

    if (!origin) return next();

    if (!allowedOrigins.includes(origin)) {
        return next(new AppError(403, "CORS bloqueado", "CORS_BLOQUED"));
    }

    // respuestas para el navegador
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    return next();
}