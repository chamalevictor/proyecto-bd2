import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("desde /api/servicio_al_cliente");
});

export default router;
