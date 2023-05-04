import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../configs/axiosClient";
import Alerta from "../componentes/Alerta";

const NewPassword = () => {
  const params = useParams();
  const { token } = params;

  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [validToken, setValidToken] = useState(false);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    setAlerta({
      msg: "",
      error: false,
    });
  }, [contrasena, confirmarContrasena]);

  // useEffect(() => {
  //   const comprobarToken = async () => {
  //     try {
  //       await axiosClient(`/usuarios/confirmar_cuenta/${token}`);
  //       setValidToken(true);
  //     } catch (error) {
  //       setAlerta({
  //         msg: error.response.data.msg,
  //         error: true,
  //       });
  //     }
  //   };
  //   comprobarToken();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contrasena != confirmarContrasena) {
      setAlerta({
        msg: "Las contraseñas no coinciden",
        error: true,
      });
      return;
    }

    if (contrasena.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener como mínimo 6 caractéres",
        error: true,
      });
      return;
    }

    try {
      const url = `/usuarios/confirmar_cuenta/${token}`;
      const { data } = await axiosClient.post(url, { contrasena });
      setAlerta({
        msg: data.msg,
        error: data.exito == 1 ? false : true,
      });
      //setConfirmarContrasena(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-green-600 font-black text-6xl capitalize">
        Crea una contraseña para tu
        <span className="text-slate-700"> cuenta</span>
      </h1>
      {msg && <Alerta alerta={alerta} />}
      {true && (
        <form
          onSubmit={handleSubmit}
          className="my-10 bg-white shadow rounded-lg px-10 py-10"
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Contraseña Nueva
            </label>
            <input
              type="password"
              placeholder="Escribe tu nueva contraseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password-2"
            >
              Confirmar Contraseña
            </label>
            <input
              type="password"
              placeholder="Confirma tu nueva contraseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="password-2"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar contraseña"
            className="bg-green-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-green-800 transition-colors"
          />
        </form>
      )}

      {confirmarContrasena && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Inicia sesión
        </Link>
      )}
    </>
  );
};

export default NewPassword;
