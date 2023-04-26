// const registrar = (req, res) => {
//   res.send("desde /api/usuarios");
// };

// export { registrar };

import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { singupEmail, forgotPasswordEmail } from "../helpers/email.js";

// Create new User
const createUser = async (req, res) => {
  const { nombre, apellido, fecha_nac, correo } = req.body;
  // Verify if user's email is already registered.
  const existeUsuario = await oraclePool.query(
    `SELECT * FROM end_user WHERE email = $1`,
    [email]
  );

  if (existingUser.rows.length !== 0) {
    const error = new Error("Usuario ya registrardo");
    return res.status(400).json({ msg: error.message });
  }
  // If no records found, proceed to insert new user
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const token = generarId();
    const newUser = await pool.query(
      `INSERT INTO end_user
                  (name, lastname, dob, email, password, token)
                  VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, lastname, dob, email, hashedPassword, token]
    );

    // Send confirmation email.

    singupEmail({
      email,
      name,
      token,
    });

    res.json({
      msg: "Cuenta creada con éxito. Recibirás un correo con instrucciones",
    });
  } catch (error) {
    console.log(error);
  }
};
// Authenticate user.
const authenticateUser = async (req, res) => {
  const { email, password } = req.body;

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
  // Check user is confirmed
  if (!existingUser.rows[0].confirmed) {
    const error = new Error(
      "La cuenta para este usuario no ha sido confirmada."
    );
    return res.status(404).json({ msg: error.message });
  }
  //Check user's password
  const authenticatePassword = async (password) => {
    return await bcrypt.compare(password, existingUser.rows[0].password); // Compares password sent vs password in db.
  };

  if (await authenticatePassword(password)) {
    res.json({
      id_end_user: existingUser.rows[0].id_end_user,
      name: existingUser.rows[0].name,
      lastname: existingUser.rows[0].lastname,
      email: existingUser.rows[0].email,
      token: generateJWT(existingUser.rows[0].id_end_user),
    });
  } else {
    const error = new Error("La contraseña ingresada es incorrecta");
    return res.status(403).json({ msg: error.message });
  }
};

// Confirm Accounts
const confirmAccount = async (req, res) => {
  const { token } = req.params;
  const confirmUser = await pool.query(
    // Confirm if token belongs to a user.
    `SELECT * FROM end_user WHERE token = $1`,
    [token]
  );
  if (confirmUser.rows.length === 0) {
    // If rows comes back empty, it means that no user was found with that token.
    const error = new Error("Token no válido.");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const confirmUserSuccess = await pool.query(
      // Enable user confirmed and clear token.
      `UPDATE end_user SET confirmed = true, token = '' WHERE id_end_user = $1`,
      [confirmUser.rows[0].id_end_user]
    );
    res.json({ msg: "Usuario confirmado con éxito." });
  } catch (error) {
    console.log(error);
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

export {
  createUser,
  authenticateUser,
  confirmAccount,
  forgotPassword,
  validateToken,
  newPassword,
  profile,
};
