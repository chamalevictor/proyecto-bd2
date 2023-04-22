import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("desde /api/operaciones");
});

export default router;
