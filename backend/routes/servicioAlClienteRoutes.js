import express from "express";
import { crearCliente } from "../controllers/servicioAlClienteController.js";

const router = express.Router();

router.post("/crear_cliente", crearCliente);

export default router;
