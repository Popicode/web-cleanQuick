import { Router } from "express";
import { crearContacto } from "../controllers/contact.controller.js";

const router = Router()

router.post('/contacto', crearContacto)

export default router