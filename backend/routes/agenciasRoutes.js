import express from "express";
import {
  obtenerAgencias,
  obtenerCajas,
  crearAgencia,
  agregarCaja,
} from "../controllers/agenciasController.js";

const router = express.Router();

router.get("/obtener_agencias", obtenerAgencias);
router.post("/crear_agencia", crearAgencia);
router.post("/agregar_caja", agregarCaja);
router.get("/obtener_cajas/:id_agencia", obtenerCajas);

export default router;
