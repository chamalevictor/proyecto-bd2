import express from "express";
import { db_config } from "./configs/db.js";
import dotenv from "dotenv";
import oracledb from "oracledb";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import agenciasRoutes from "./routes/agenciasRoutes.js";
import servicioAlClienteRoutes from "./routes/servicioAlClienteRoutes.js";
import operacionesRoutes from "./routes/operacionesRoutes.js";
import reportesRoutes from "./routes/reportesRoutes.js";
import cors from "cors";

// Estableciendo conexion a la base de datos.
try {
  await oracledb.createPool(db_config);
  const pool = await oracledb.getPool();
  console.log(
    `Se ha establecido la conexión '${pool.poolAlias}' a la base de datos.`
  );
} catch (error) {
  console.log(error);
}

// Levantando el servidor.
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// Definir rutas
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/agencias", agenciasRoutes);
app.use("/api/servicio_al_cliente", servicioAlClienteRoutes);
app.use("/api/operaciones", operacionesRoutes);
app.use("/api/reportes", reportesRoutes);

// Definiendo puerto para servidor
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Servidor escuchando en puerto: ${process.env.SERVER_PORT}`);
});
