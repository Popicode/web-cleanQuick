import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

import express from 'express';
import helmet from 'helmet';
import { apiLimiter } from './middlewares/rateLimiter.js';
import { validateSMTPConfig } from './services/mailer.js';
import HealthRoutes from "./routes/health.routes.js"
import ContactRoutes from "./routes/contact.routes.js"
import notFound from "./middlewares/notFound.js"
import errorHandler from "./middlewares/errorHandler.js"

// importacion dinamica para que carge luego de que dotenv sea cargado
const corsMiddleware = (await import('./middlewares/cors.js')).default;

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

// validación de SMTP antes de correr el sv
try {
    validateSMTPConfig();
} catch (error) {
    console.error(error.message);
    process.exit(1);
}

// cors
app.use(corsMiddleware);

app.use(helmet({
    crossOriginResourcePolicy: false
}));

// parsea y pone limite de kb
app.use(express.json({ limit: '10kb' }));

// rate limit para la api en general
app.use('/api', apiLimiter);

//rutas
app.use('/api', HealthRoutes);
app.use('/api', ContactRoutes);

// notFound midd
app.use(notFound);

// errorHandler global
app.use(errorHandler);


const serverOn = app.listen(PORT, () =>
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
);

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);


    serverOn.close(() => {
        process.exit(1)
    });
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});












