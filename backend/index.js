import express from "express";
import { db_config } from "./configs/db.js";
import dotenv from "dotenv";
import oracledb from "oracledb";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import agenciasRoutes from "./routes/agenciasRoutes.js";
import servicioAlClienteRoutes from "./routes/servicioAlClienteRoutes.js";
import operacionesRoutes from "./routes/operacionesRoutes.js";
import reportesRoutes from "./routes/reportesRoutes.js";

const app = express();

dotenv.config();

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/agencias", agenciasRoutes);
app.use("/api/servicio_al_cliente", servicioAlClienteRoutes);
app.use("/api/operaciones", operacionesRoutes);
app.use("/api/reportes", reportesRoutes);

async function run() {
  let pool;
  try {
    pool = await oracledb.createPool(db_config);
    let connection;
    try {
      connection = await pool.getConnection();
      if (connection) console.log("yes");
      else console.log("no se conecto");
      const result = await connection.execute(`SELECT * FROM interes`);
      console.log("Result is:", result.rows);
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close(); // Devolver la conexion al Pool
        } catch (err) {
          throw err;
        }
      }
    }
  } catch (err) {
    console.error(err.message);
  } finally {
    await pool.close();
  }
}

run();

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Servidor escuchando en puerto: ${process.env.SERVER_PORT}`);
});
