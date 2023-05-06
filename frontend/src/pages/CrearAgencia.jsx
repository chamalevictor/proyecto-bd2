import { useState, useEffect } from "react";
import Alerta from "../componentes/Alerta";
import BotonVolver from "../componentes/BotonVolver";
import axiosClient from "../configs/axiosClient";

const CrearAgencia = () => {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [alerta, setAlerta] = useState("");
  const { msg } = alerta;

  const crearAgencia = async () => {
    if ([nombre, ubicacion, telefono].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    const { data } = await axiosClient.post(`/agencias/crear_agencia`, {
      nombre,
      ubicacion,
      telefono,
    });

    setAlerta({
      msg: data.msg,
      error: data.exito == 1 ? false : true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    crearAgencia();
  };

  useEffect(() => {
    setAlerta({
      msg: "",
      error: false,
    });
  }, [nombre, ubicacion, telefono]);

  return (
    <div className="flex justify-center">
      <div className="md:w-2/3 lg:w-2/5 mt-6  rounded-lg">
        <div className="text-center">
          <h1 className="text-green-600 font-black text-6xl capitalize">
            Crear Nueva
            <span className="text-slate-700"> Agencia</span>
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
              htmlFor="nombre"
            >
              Nombre Agencia
            </label>
            <input
              type="text"
              placeholder="Un nombre y un apellido"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="ubicacion"
            >
              Ubicación
            </label>
            <input
              type="text"
              placeholder="Dirección"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="ubicacion"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="telefono"
            >
              Teléfono
            </label>
            <input
              type="number"
              placeholder="Teléfono de Agencia"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              pattern="[0-9]{8}]"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Crear Agencia"
            className="bg-green-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-green-800 transition-colors"
          />
        </form>
        <div className="flex justify-center  scroll-smooth pb-10">
          <BotonVolver texto="Volver" ruta={"../agencias"} />
        </div>
      </div>
    </div>
  );
};

export default CrearAgencia;
