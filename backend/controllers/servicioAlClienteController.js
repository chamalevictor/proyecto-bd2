import oracledb from "oracledb";

const crearCliente = async (req, res) => {
  const {
    identificacion: id_cliente_nuevo,
    nombre: nombre_cliente,
    tipoCliente: tipo_cliente,
    correo: correo_cliente,
    fecha_nac: fecha_nac_cliente,
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

const buscarCliente = async (req, res) => {
  const { id_cliente } = req.params;

  let connection;
  try {
    connection = await oracledb.getConnection({ poolAlias: "default" }); // Obtener conexion del pool
    const result = await connection.execute(
      `SELECT * FROM cliente WHERE no_identificacion = :id_cliente`,
      { id_cliente }
    );
    if (result.rows.length != 0) {
      res.json(result.rows);
    } else {
      res.json({
        msg: "El cliente no existente",
        error: true,
      });
    }
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

const crearCuenta = async (req, res) => {
  const { id_cliente, tipoCuenta, agenciaActual, firma_1, firma_2, firma_3 } =
    req.body;

  let connection;
  try {
    connection = await oracledb.getConnection({ poolAlias: "default" }); // Obtener conexion del pool
    const result = await connection.execute(
      `BEGIN CREAR_CUENTA(
        :cliente,
        :tipo_cuenta,
        :agencia,
        :firma1_cuenta,
        :firma2_cuenta,
        :firma3_cuenta,
        :msg,
        :exito
        ); END;`,
      {
        cliente: id_cliente,
        tipo_cuenta: tipoCuenta,
        agencia: agenciaActual,
        firma1_cuenta: firma_1,
        firma2_cuenta: firma_2,
        firma3_cuenta: firma_3,
        msg: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        exito: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
      }
    );
    console.log(result.outBinds);
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

export { crearCliente, modificarCliente, buscarCliente, crearCuenta };
