import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("desde /api/agencias");
});

export default router;
