import express from "express";
import {
  obtenerAgencias,
  obtenerCajas,
} from "../controllers/agenciasController.js";

const router = express.Router();

router.get("/obtener_agencias", obtenerAgencias);
router.get("/obtener_cajas", obtenerCajas);

export default router;
