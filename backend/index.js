import express from "express";
import { db_config } from "./configs/db.js";
import dotenv from "dotenv";
import oracledb from "oracledb";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import agenciasRoutes from "./routes/agenciasRoutes.js";
import servicioAlClienteRoutes from "./routes/servicioAlClienteRoutes.js";
import operacionesRoutes from "./routes/operacionesRoutes.js";
import reportesRoutes from "./routes/reportesRoutes.js";

try {
  await oracledb.createPool(db_config);
  const pool = await oracledb.getPool();
  console.log(pool.poolAlias);
} catch (error) {
  console.log(error);
}

let connection;
try {
  connection = await oracledb.getConnection({ poolAlias: "default" }); // Obtener conexion del pool
  const result = await connection.execute(`SELECT * FROM tipo_cuenta`);

  console.log(result.rows);
} catch (err) {
  console.log(err);
} finally {
  if (connection) {
    try {
      await connection.close(); // Devolver la conexion al pool.
    } catch (err) {
      console.error(err);
    }
  }
}

try {
  connection = await oracledb.getConnection({ poolAlias: "default" }); // Obtener conexion del pool.
  const result = await connection.execute(`SELECT * FROM modulo`);

  console.log(result.rows);
} catch (err) {
  console.log(err);
} finally {
  if (connection) {
    try {
      await connection.close(); // Devolviendo la conexion al pool
    } catch (err) {
      console.error(err);
    }
  }
}

const app = express();
dotenv.config();
app.use(express.json());

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/agencias", agenciasRoutes);
app.use("/api/servicio_al_cliente", servicioAlClienteRoutes);
app.use("/api/operaciones", operacionesRoutes);
app.use("/api/reportes", reportesRoutes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Servidor escuchando en puerto: ${process.env.SERVER_PORT}`);
});
