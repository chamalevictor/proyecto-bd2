import oracledb from "oracledb";

const crearCliente = async (req, res) => {
  const {
    id_cliente_nuevo,
    nombre_cliente,
    tipo_cliente,
    correo_cliente,
    fecha_nac_cliente,
  } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection({ poolAlias: "default" }); // Obtener conexion del pool
    const result = await connection.execute(
      `BEGIN CREAR_CLIENTE( :id_cliente_nuevo,
        :nombre_cliente,
        :tipo_cliente,
        :correo_cliente,
        :fecha_nac_cliente,
        :msg,
        :exito
        ); END;`,
      {
        id_cliente_nuevo,
        nombre_cliente,
        tipo_cliente,
        correo_cliente,
        fecha_nac_cliente,
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

const modificarCliente = async (req, res) => {
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

export { crearCliente, modificarCliente };
