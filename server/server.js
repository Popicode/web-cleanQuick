import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import "dotenv/config"

import HealthRoutes from "./routes/health.routes.js"
import ContactRoutes from "./routes/contact.routes.js"




const app = express();
const PORT = Number(process.env.PORT ?? 3000);

// midelware basicos 
app.use(express.json());
app.use(express.text());

//rutas
app.use('/api', HealthRoutes)
app.use('/api', ContactRoutes)





app.listen(PORT, () =>
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
);












