import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../../componentes/Alerta";
import axiosClient from "../../configs/axiosClient";
import BotonVolver from "../../componentes/BotonVolver";

const CrearCliente = () => {
  const navigate = useNavigate();
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [fecha_nac, setfecha_nac] = useState(new Date());
  const [alerta, setAlerta] = useState({});
  //! Tipo Cliente
  const [tipoCliente, setTipoCliente] = useState("");

  //! nuevos campos
  const [identificacion, setIdentificacion] = useState("");

  useEffect(() => {
    setAlerta({
      msg: "",
      error: false,
    });
  }, [nombreCompleto, correo, fecha_nac]);

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

    if ([nombreCompleto, correo].includes("")) {
      // Checking for blank fields.
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    setAlerta({});

    // Crear usuario en API.
    // ! Datos para crear cliente // Modificar los datos a conveniencia
    const nuevoCliente = {};
    nuevoCliente.identificacion = identificacion;
    nuevoCliente.nombre = nombreCompleto;
    nuevoCliente.tipoCliente = tipoCliente;
    nuevoCliente.correo = correo;
    nuevoCliente.fecha_nac = fecha_nac;
    console.log(nuevoCliente, " Datos nuevo cliente");

    //! Limpiar los estados una vez creado el nuevo cliente
    try {
      const { data } = await axiosClient.post(
        `/servicio_al_cliente/crear_cliente`,
        nuevoCliente
      );

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
            <span className="text-slate-700"> Cliente</span>
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
              htmlFor="identificacion"
            >
              No. Identificacion (DPI)
            </label>
            <input
              type="number"
              pattern="[0-9]"
              placeholder="Numero de DPI"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="identificacion"
              value={identificacion}
              onChange={(e) => setIdentificacion(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="tipocliente"
            >
              Tipo Cliente
            </label>
            <select
              name="tipocliente"
              id="tipocliente"
              className="w-full mt-3 p-3 border-2 rounded-xl bg-gray-50 text-center"
              onChange={(e) => setTipoCliente(e.target.value)}
              value={tipoCliente}
            >
              <option value="">--Seleccione el tipo cliente--</option>
              <option value={1}>Individual</option>
              <option value={2}>Comercial</option>
            </select>
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="nombrecliente"
            >
              Nombre Cliente
            </label>
            <input
              type="text"
              placeholder="Un nombre y un apellido"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="nombrecliente"
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
              placeholder="Correo Personal"
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
          <input
            type="submit"
            value="Crear usuario"
            className="bg-green-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-green-800 transition-colors"
          />
        </form>
        <div className="flex justify-center shadow-lg scroll-smooth pb-10">
          <button
            className="text-white text-sm bg-green-600 p-3 rounded-md uppercase font-bold hover:bg-green-700"
            onClick={() => navigate(-1)}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearCliente;
