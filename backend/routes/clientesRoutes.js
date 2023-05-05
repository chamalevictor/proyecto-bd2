import express from "express";
import {
  crearCliente,
  modificarCliente,
} from "../controllers/clientesController.js";

const router = express.Router();

router.post("/crear_cliente", crearCliente);
//router.get("/obtener_cajas", obtenerCajas);

export default router;
