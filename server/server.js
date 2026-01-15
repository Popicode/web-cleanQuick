import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: './config/.env' });

import express from 'express';
import HealthRoutes from "./routes/health.routes.js"
import ContactRoutes from "./routes/contact.routes.js"
import notFound from "./middlewares/notFound.js"
import errorHandler from "./middlewares/errorHandler.js"
import corsMiddleware from "./middlewares/cors.js"

const app = express();
const PORT = Number(process.env.PORT ?? 3000);



// midelware basicos de parseo de datos
app.use(express.json({ limit: "10kb" }));

// CORS
app.use(corsMiddleware);

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












