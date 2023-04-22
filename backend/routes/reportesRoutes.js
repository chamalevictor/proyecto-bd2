import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("desde /api/reportes");
});

export default router;
