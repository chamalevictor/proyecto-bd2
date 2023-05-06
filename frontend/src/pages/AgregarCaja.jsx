import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usuarioActions } from "../features/usuariosSlice";
import Alerta from "../componentes/Alerta";
import BotonVolver from "../componentes/BotonVolver";
import axiosClient from "../configs/axiosClient";

const AgregarCaja = () => {
  const dispatch = useDispatch();
  const { agencias, cajas } = useSelector((state) => state.usuarios);
  const [id_agencia, setIdAgencia] = useState(0);
  const [alerta, setAlerta] = useState("");
  const [cargando, setCargando] = useState(false);
  const { msg } = alerta;

  const getAgencias = async () => {
    const { data } = await axiosClient.get(`/agencias/obtener_agencias`);
    dispatch(usuarioActions.setAgencias(data));
    setCargando(false);
  };

  useEffect(() => {
    setCargando(true);
    getAgencias();
  }, []);

  const listaAgencias =
    agencias.length > 0 &&
    agencias.map((item) => {
      return (
        <option key={item.ID_AGENCIA} value={item.ID_AGENCIA}>
          {`${item.NOMBRE} - ${item.UBICACION}`}
        </option>
      );
    });

  const agregarCaja = async () => {
    const { data } = await axiosClient.post(`/agencias/agregar_caja`, {
      id_agencia,
    });

    setAlerta({
      msg: data.msg,
      error: data.exito == 1 ? false : true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarCaja();
  };

  return (
    <div className="flex justify-center">
      <div className="md:w-2/3 lg:w-2/5 mt-6  rounded-lg">
        <div className="text-center">
          <h1 className="text-green-600 font-black text-6xl capitalize">
            Crear Nueva
            <span className="text-slate-700"> Caja</span>
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
              htmlFor="agencia"
            >
              Seleccione Agencia
            </label>
            <select
              id="agencia"
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
              defaultValue={"DEFAULT"}
              onChange={(e) => setIdAgencia(e.target.value)}
            >
              <option value="DEFAULT" disabled>
                -- Seleccione una Agencia --
              </option>
              {listaAgencias}
            </select>
          </div>
          <input
            type="submit"
            value="Agregar Caja"
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

export default AgregarCaja;
