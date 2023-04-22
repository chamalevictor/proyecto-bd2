//import oracledb from "oracledb";
import dotenv from "dotenv";

dotenv.config(); // Acceso a las variables de Entorno.

//oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// Configuracion para conexion a base de datos.
export const db_config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_STRING,
};

// export default async function conexion(sql) {
//   let connection;

//   try {
//     connection = await oracledb.getConnection(db_config);

//     const result = await connection.execute(sql);
//     return result;
//   } catch (err) {
//     console.error(err);
//   } finally {
//     if (connection) {
//       try {
//         await connection.close();
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   }
// }

// console.log(db_config);

// async function run() {
//     let pool;

//     try {
//       pool = await oracledb.createPool({
//         user          : "hr",
//         password      : mypw,  // mypw contains the hr schema password
//         connectString : "localhost/XEPDB1"
//       });

//       let connection;
//       try {
//         connection = await pool.getConnection();
//         result = await connection.execute(`SELECT last_name FROM employees`);
//         console.log("Result is:", result);
//       } catch (err) {
//         throw (err);
//       } finally {
//         if (connection) {
//           try {
//             await connection.close(); // Put the connection back in the pool
//           } catch (err) {
//             throw (err);
//           }
//         }
//       }
//     } catch (err) {
//       console.error(err.message);
//     } finally {
//       await pool.close();
//     }
//   }

//   run();
