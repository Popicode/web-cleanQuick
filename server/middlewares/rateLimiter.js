import rateLimit from 'express-rate-limit';


export const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        status: "error",
        message: "Demasiadas solicitudes desde esta IP. Intenta de nuevo en 15 minutos."
    },
    standardHeaders: true,
    legacyHeaders: false,
});


export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        status: "error",
        message: "Límite de solicitudes excedido. Intenta más tarde."
    },
    standardHeaders: true,
    legacyHeaders: false
});
