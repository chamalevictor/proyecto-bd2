import oracledb from "oracledb";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { singupEmail, forgotPasswordEmail } from "../helpers/email.js";

//oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// Crear usuario nuevo
const crearUsuario = async (req, res) => {
  const { nombre, apellido, correo, id_rol, fecha_nac } = req.body;
  const token = generarId();
  let connection;
  try {
    connection = await oracledb.getConnection({ poolAlias: "default" }); // Obtener conexion del pool
    const result = await connection.execute(
      // Llamar el procedimiento almacenado que se encarga
      `BEGIN CREAR_USUARIO(:nombre, :apellido, :correo, :id_rol, :fecha_nac, :token, :msg, :exito); END;`, // de registrar un nuevo usuario
      {
        // Pasando los parametros
        nombre,
        apellido,
        correo,
        id_rol,
        fecha_nac,
        token,
        // Binding de Parametros de salida del Procedimiento Almacenado
        msg: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        exito: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
      }
    );

    // Enviar correo de confirmacion
    singupEmail({
      correo,
      nombre,
      token,
    });
    console.log(result.outBinds.msg);
    res.json(result.outBinds);
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
};

// Authenticate user.
const autenticarUsuario = async (req, res) => {
  const { email, password } = req.body;

  let connection;
  let contrasenaHasheada;
  let consulta_exitosa;
  let mensaje;
  let usuario = {
    id_usuario: 0,
    nombre: "",
    correo: email,
    rol: 0,
    token: "",
  };

  try {
    connection = await oracledb.getConnection({ poolAlias: "default" }); // Obtener conexion del pool
    const result = await connection.execute(
      // Llamar el procedimiento almacenado que se encarga
      `BEGIN AUTENTICAR_USUARIO(:email, :id_de_usuario, :contrasena, :nombre_usuario, :rol_usuario, :msg, :exito); END;`,
      {
        email,
        id_de_usuario: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        contrasena: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        nombre_usuario: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        rol_usuario: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        msg: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        exito: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
      }
    );
    contrasenaHasheada = result.outBinds.contrasena;
    usuario.id_usuario = result.outBinds.id_de_usuario;
    usuario.nombre = result.outBinds.nombre_usuario;
    usuario.correo = email;
    usuario.rol = result.outBinds.rol_usuario;
    consulta_exitosa = result.outBinds.exito;
    mensaje = result.outBinds.msg;
    //console.log(result.outBinds.nombre_usuario);

    if ((result.outBinds.exito = 0)) {
      res.json({
        msg: result.outBinds.msg,
        error: true,
      });
      return;
    }
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

  if (consulta_exitosa == 0) {
    console.log("No se ha podido iniciar sesion");
    res.json({
      msg: mensaje,
      error: true,
    });
    return;
  }

  //Check user's password
  const authenticatePassword = async (password) => {
    return await bcrypt.compare(password, contrasenaHasheada); // Compares password sent vs password in db.
  };

  if (await authenticatePassword(password)) {
    usuario.token = generarJWT(usuario.id_usuario);
    res.json({
      usuario,
      exito: 1,
    });
  } else {
    const error = new Error("La contraseña ingresada es incorrecta");
    return res.status(403).json({ msg: error.message });
  }
};

// Confirm Accounts
const confirmarCuenta = async (req, res) => {
  const { token } = req.params;
  const { contrasena } = req.body;

  let connection;

  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(contrasena, salt);
  try {
    connection = await oracledb.getConnection({ poolAlias: "default" }); // Obtener conexion del pool
    const result = await connection.execute(
      // Llamar el procedimiento almacenado que se encarga
      `BEGIN CONFIRMAR_USUARIO(:hashedNewPassword, :token, :msg, :exito); END;`, // de registrar un nuevo usuario
      {
        // Pasando los parametros
        hashedNewPassword,
        token,
        // Binding de Parametros de salida del Procedimiento Almacenado
        msg: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        exito: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
      }
    );

    console.log(result.outBinds.msg);
    res.json(result.outBinds);
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
};
// Forgot password.
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  // Check if user exists
  const existingUser = await pool.query(
    `SELECT * FROM end_user WHERE email = $1`,
    [email]
  );
  if (existingUser.rows.length === 0) {
    // If rows comes back empty, means no user was found with that email.
    const error = new Error("No existe una cuenta creada para este usuario.");
    return res.status(404).json({ msg: error.message });
  }
  try {
    const updateToken = await pool.query(
      // Enable user confirmed and clear token.
      `UPDATE end_user SET token = $1 WHERE id_end_user = $2 RETURNING *`,
      [generarId(), existingUser.rows[0].id_end_user]
    );

    // Send forgot password email.
    forgotPasswordEmail({
      email: existingUser.rows[0].email,
      name: existingUser.rows[0].name,
      token: updateToken.rows[0].token,
    });
    res.json({
      msg: "Hemos enviado un correo con las instrucciones para restablecer tu contraseña.",
    });
  } catch (error) {
    console.log(error);
  }
};

// Validate token for password reset.
const validateToken = async (req, res) => {
  const { token } = req.params;

  // Check if token is valid.
  const validToken = await pool.query(
    `SELECT * FROM end_user WHERE token = $1`,
    [token]
  );
  if (validToken.rows.length === 0) {
    // If rows comes back empty, means no user was found with that token.
    const error = new Error("Token no válido.");
    return res.status(404).json({ msg: error.message });
  } else {
    res.json({ msg: "Token válido y el usuario existe." });
  }
};

// Set a new password
const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  // Check if token is valid.
  const validToken = await pool.query(
    `SELECT * FROM end_user WHERE token = $1`,
    [token]
  );
  if (validToken.rows.length !== 0) {
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(password, salt);
    const updatePassword = await pool.query(
      `UPDATE end_user SET password = $1, token = $2 WHERE id_end_user = $3`,
      [hashedNewPassword, "", validToken.rows[0].id_end_user]
    );
    res.json({ msg: "La contraseña se actualizó correctamente." });
  } else {
    const error = new Error("Token no válido.");
    return res.status(404).json({ msg: error.message });
  }
};

const profile = async (req, res) => {
  const { user } = req;
  res.json(user.rows[0]);
};

const obtenerRoles = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection({ poolAlias: "default" }); // Obtener conexion del pool
    const result = await connection.execute(
      `SELECT * FROM rol ORDER BY id_rol ASC`
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
export {
  crearUsuario,
  autenticarUsuario,
  confirmarCuenta,
  forgotPassword,
  validateToken,
  newPassword,
  profile,
  obtenerRoles,
};
