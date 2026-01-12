import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import "dotenv/config"

import HealthRoutes from "./routes/health.routes.js"
import ContactRoutes from "./routes/contact.routes.js"
import notFound from "./middlewares/notFound.js"
import errorHandler from "./middlewares/errorHandler.js"





const app = express();
const PORT = Number(process.env.PORT ?? 3000);

// midelware basicos de parseo de datos
app.use(express.json());
app.use(express.text());

// CORS
app.use(process.env.CORS_ORIGIN);

//rutas
app.use('/api', HealthRoutes);
app.use('/api', ContactRoutes);

// notFound midd
app.use(notFound);

// errorHandler global
app.use(errorHandler);




app.listen(PORT, () =>
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
);












