import nodemailer from "nodemailer";

export const singupEmail = async (data) => {
  const { correo, nombre, token } = data;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Verify email server connectivity.
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("El servidor esta listo para enviar/recibir mensajes.");
    }
  });

  await transporter.sendMail({
    from: '"Banco Chinautla" <cuentas@banco-chinautla.com>',
    to: correo,
    subject: "Banco Chinautla - Confirma Tu Cuenta",
    text: "Finaliza tu cuenta en Banco Chinautla",
    html: `<p> Hola ${nombre}. Comprueba tu cuenta en Banco Chinautla </p>
    <p> Tu cuenta está ya casi lista, sólo debes crear una contraseña en el siguiente enlace:
    <a href="${process.env.FRONTEND_URL}/confirmar_cuenta/${token}"> Comprobar Cuenta </a>
    <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje.</p>
    `,
  });
};

export const forgotPasswordEmail = async (data) => {
  const { correo, nombre, token } = data;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Informacion del email

  await transporter.sendMail({
    from: '"Banco Chinautla" <cuentas@banco-chinautla.com>',
    to: correo,
    subject: "Banco Chinautlar - Restablece Tu Contraseña",
    text: "Restablece Tu Contraseña",
    html: `<p> Hola ${nombre}. Has solicitado restablecer tu contraseña. </p>
    <p> Ingresa en el siguiente elnace para crear una nueva contraseña: </p>
    <a href="${process.env.FRONTEND_URL}/olvide_contrasena/${token}"> Cambiar Contraseña </a>
    <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje.</p>
    `,
  });
};
