import dotenv from 'dotenv';
import validateEnv from '../config/validateEnv.js';
dotenv.config();

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
import shutdown from '../config/shutdown.js';



// import dinamic para que carge luego de dotenv (y asi lea .env)
const corsMiddleware = (await import('./middlewares/cors.js')).default;


const app = express();
const PORT = Number(process.env.PORT || 10000);




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



const serverOn = app.listen(PORT, '0.0.0.0', () =>
    console.log(`Servidor corriendo en puerto ${PORT}`)
);


process.on('SIGTERM', () => {
    shutdown(serverOn, 'SIGTERM', 0)
});

process.on('SIGINT', () => {
    shutdown(serverOn, 'SIGINT', 0)
})

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);

    shutdown(serverOn, 'unhandledRejection', 1)
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    shutdown(serverOn, 'uncaughtException', 1)
});












