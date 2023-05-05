import jwt from "jsonwebtoken";
import oracledb from "oracledb";

const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    let connection;
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("este es el decoded id");
      req.user = await oracledb.getConnection({ poolAlias: "default" });
      console.log("entramos aca");
      const result = await connection.execute(
        `SELECT id_usuario, nombre, apellido, correo FROM usuario WHERE id_usuario = :id`,
        [decoded.id]
      );
      console.log(result.rows());
      res.json(result);
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

    if (!token) {
      const error = new Error("Token no válido");
      return res.json({ msg: error.message });
    }
    next();
  }
};

export default checkAuth;
