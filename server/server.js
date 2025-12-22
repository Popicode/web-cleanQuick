import dotenv from 'dotenv';
import express from 'express';
import { healthCheck } from './controllers/health.controller.js';
dotenv.config();

const app = express();

const PORT = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use(express.text());
app.use('/api', healthCheck)





app.listen(PORT, () =>
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
);












