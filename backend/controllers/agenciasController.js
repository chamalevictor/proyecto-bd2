import oracledb from "oracledb";

const obtenerAgencias = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection({ poolAlias: "default" }); // Obtener conexion del pool
    const result = await connection.execute(`SELECT * FROM agencia`);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};

const obtenerCajas = async (req, res) => {
  const id_agencia = req.body;
  let connection;
  try {
    connection = await oracledb.getConnection({ poolAlias: "default" }); // Obtener conexion del pool
    const result = await connection.execute(
      `SELECT * FROM caja WHERE id_agencia = :id_agencia`,
      id_agencia
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};

export { obtenerAgencias, obtenerCajas };
