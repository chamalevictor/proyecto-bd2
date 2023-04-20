import express from "express";

const app = express();

app.listen(4000, () => {
  console.log("Servidor escuchando en puerto 4000");
});
