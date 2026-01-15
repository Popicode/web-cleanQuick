import { Router } from "express";
import { crearContacto } from "../controllers/contact.controller.js";
import { contactLimiter } from "../middlewares/rateLimiter.js";

const router = Router()

router.post('/contacto', contactLimiter, crearContacto)

export default router