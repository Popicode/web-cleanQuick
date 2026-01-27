import dotenv from 'dotenv';
import validateEnv from '../config/validateEnv.js';
dotenv.config({ path: './config/.env' });

try {
    validateEnv()
} catch (error) {
    console.log(error.message);
    process.exit(1)
}


import express from 'express';
import helmet from 'helmet';
import { apiLimiter } from './middlewares/rateLimiter.js';
import { validateSMTPConfig } from './services/mailer.js';
import HealthRoutes from "./routes/health.routes.js"
import ContactRoutes from "./routes/contact.routes.js"
import notFound from "./middlewares/notFound.js"
import errorHandler from "./middlewares/errorHandler.js"



// import dinamic para que carge luego de dotenv (y asi lea .env)
const corsMiddleware = (await import('./middlewares/cors.js')).default;


const app = express();
const PORT = Number(process.env.PORT ?? 3000);




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


app.use(express.json({ limit: '10kb' }));


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












