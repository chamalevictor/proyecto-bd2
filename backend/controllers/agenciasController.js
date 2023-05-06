import oracledb from "oracledb";

const obtenerAgencias = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection({ poolAlias: "default" }); // Obtener conexion del pool
    const result = await connection.execute(
      `SELECT * FROM agencia ORDER BY id_agencia ASC`
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

const obtenerCajas = async (req, res) => {
  const { id_agencia } = req.params;
  if (id_agencia == 0) return;

  let connection;
  try {
    connection = await oracledb.getConnection({ poolAlias: "default" }); // Obtener conexion del pool
    const result = await connection.execute(
      `SELECT * FROM caja WHERE id_agencia = :id_agencia ORDER BY id_caja ASC`,
      { id_agencia }
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

const crearAgencia = async (req, res) => {
  const { nombre, ubicacion, telefono } = req.body;
  console.log(nombre, ubicacion, telefono);

  let connection;
  try {
    connection = await oracledb.getConnection({ poolAlias: "default" }); // Obtener conexion del pool
    const result = await connection.execute(
      `BEGIN CREAR_AGENCIA(:nombre_agencia, :ubicacion_agencia, :telefono_agencia, :msg, :exito); END;`,
      {
        nombre_agencia: nombre,
        ubicacion_agencia: ubicacion,
        telefono_agencia: telefono,
        msg: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        exito: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
      }
    );

    res.json(result.outBinds);
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

const agregarCaja = async (req, res) => {
  const { id_agencia } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection({ poolAlias: "default" }); // Obtener conexion del pool
    const result = await connection.execute(
      `BEGIN CREAR_CAJA(:id_agencia, :msg, :exito); END;`,
      {
        id_agencia,
        msg: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        exito: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
      }
    );

    res.json(result.outBinds);
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

export { obtenerAgencias, obtenerCajas, crearAgencia, agregarCaja };
