import dotenv from "dotenv";

dotenv.config();

//oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// Configuracion para conexion a base de datos.
export const db_config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_STRING,
  poolAlias: "default",
  poolMin: 8,
  poolMax: 8,
};
