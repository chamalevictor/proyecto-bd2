import express from "express";
import {
  crearUsuario,
  confirmarCuenta,
  autenticarUsuario,
  obtenerRoles,
} from "../controllers/usuariosController.js";
// import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

// Creacion, Autenticacion y Confirmacion de Usuarios
router.post("/", crearUsuario);
router.post("/login", autenticarUsuario);
router.post("/confirmar_cuenta/:token", confirmarCuenta);
router.get("/obtener_roles", obtenerRoles);

export default router;
