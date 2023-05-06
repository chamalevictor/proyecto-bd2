import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usuarioActions } from "../features/usuariosSlice";
import Alerta from "../componentes/Alerta";
import axiosClient from "../configs/axiosClient";
import BotonVolver from "../componentes/BotonVolver";

const CrearUsuario = () => {
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.usuarios);
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [fecha_nac, setfecha_nac] = useState(new Date());
  const [id_rol, setid_rol] = useState(0);
  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(false);

  const getRoles = async () => {
    const { data } = await axiosClient.get(`/usuarios/obtener_roles`);
    dispatch(usuarioActions.setRoles(data));
    setCargando(false);
  };

  useEffect(() => {
    setCargando(true);
    getRoles();
  }, []);

  useEffect(() => {
    setAlerta({
      msg: "",
      error: false,
    });
  }, [nombreCompleto, correo, fecha_nac, id_rol]);

  const listaRoles =
    roles.length > 0 &&
    roles.map((item) => {
      return (
        <option key={item.ID_ROL} value={item.ID_ROL}>
          {item.DESCRIPCION}
        </option>
      );
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNombreCompleto(nombreCompleto.trim()); // Borrando espacios extras del nombre
    if (nombreCompleto.split(" ").length > 2) {
      // Solo debe haber 1 nombre y 1 apellido
      setAlerta({
        msg: "Ingresa solo un nombre y un apellido",
        error: true,
      });
      return;
    }

    if (correo.split("@")[1] !== "bancochinautla.com") {
      setAlerta({
        msg: "Debe utilizar una cuenta de la organización",
        error: true,
      });
      return;
    }

    if ([nombreCompleto, correo].includes("") || [id_rol].includes("DEFAULT")) {
      // Checking for blank fields.
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    setAlerta({});

    // Crear usuario en API.
    try {
      const nombre = nombreCompleto.split(" ")[0];
      const apellido = nombreCompleto.split(" ")[1];
      const { data } = await axiosClient.post(`/usuarios`, {
        nombre,
        apellido,
        fecha_nac,
        correo,
        id_rol,
      });

      setAlerta({
        msg: data.msg,
        error: data.exito == 1 ? false : true,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;
  return (
    <div className="flex justify-center">
      <div className="md:w-2/3 lg:w-2/5 mt-6  rounded-lg">
        <div className="text-center">
          <h1 className="text-green-600 font-black text-6xl capitalize">
            Crear Nuevo
            <span className="text-slate-700"> Usuario</span>
          </h1>
        </div>

        {msg && <Alerta alerta={alerta} />}

        <form
          onSubmit={handleSubmit}
          className="mt-7 mb-5 bg-white rounded-lg shadow-lg px-10 pt-10 pb-3"
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="name"
            >
              Nombre Completo
            </label>
            <input
              type="text"
              placeholder="Un nombre y un apellido"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="name"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="correo"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              placeholder="Correo empresarial de Banco Chinautla"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="fecha_nac"
            >
              Fecha de nacimiento
            </label>
            <input
              type="date"
              placeholder="Eorreo de registro"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="fecha_nac"
              value={fecha_nac}
              onChange={(e) => setfecha_nac(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="id_rol"
            >
              Rol de Usuario
            </label>
            <select
              id="id_rol"
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
              defaultValue={"DEFAULT"}
              onChange={(e) => setid_rol(e.target.value)}
            >
              <option value="DEFAULT" disabled>
                -- Seleccione un Rol --
              </option>
              {listaRoles}
            </select>
          </div>
          <input
            type="submit"
            value="Crear usuario"
            className="bg-green-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-green-800 transition-colors"
          />
        </form>
        <div className="flex justify-center  scroll-smooth">
          <BotonVolver ruta={"/dashboard"} />
        </div>
      </div>
    </div>
  );
};

export default CrearUsuario;
