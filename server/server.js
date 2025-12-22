import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { healthCheck } from './controllers/health.controller.js';


const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use(express.text());

//rutas
app.use('/api', healthCheck)





app.listen(PORT, () =>
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
);












