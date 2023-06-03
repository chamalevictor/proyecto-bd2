import express from "express";
import {
  crearCliente,
  buscarCliente,
  crearCuenta,
} from "../controllers/servicioAlClienteController.js";

const router = express.Router();

router.post("/crear_cliente", crearCliente);
router.get("/buscar_cliente/:id_cliente", buscarCliente);
router.post("/crear_cuenta", crearCuenta);

export default router;
