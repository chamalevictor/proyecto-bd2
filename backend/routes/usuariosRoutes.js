import express from "express";
import {
  crearUsuario,
  confirmarCuenta,
  autenticarUsuario,
  obtenerRoles,
} from "../controllers/usuariosController.js";

const router = express.Router();

// Creacion, Autenticacion y Confirmacion de Usuarios
router.post("/", crearUsuario);
router.post("/login", autenticarUsuario);
router.post("/confirmar_cuenta/:token", confirmarCuenta);

export default router;
