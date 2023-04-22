import express from "express";
import { registrar } from "../controllers/usuariosController.js";

const router = express.Router();

// Creacion, Autenticacion y Confirmacion de Usuarios
router.post("/", registrar);

export default router;

// 427
