import oracledb from "oracledb";
import { db_config } from "./db.js";

export const oraclePool = async function run() {
  let pool;
  try {
    pool = await oracledb.createPool(db_config);
  } catch (err) {
    console.error(err.message);
    return;
  } finally {
    await pool.close();
  }
  return pool;
};
