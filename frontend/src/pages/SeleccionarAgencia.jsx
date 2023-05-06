import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usuarioActions } from "../features/usuariosSlice";
import axiosClient from "../configs/axiosClient";
import BotonVolver from "../componentes/BotonVolver";
import Titulo from "../componentes/Titulo";

const SeleccionarAgencia = () => {
  const dispatch = useDispatch();
  const { agencias, cajas } = useSelector((state) => state.usuarios);
  const [id_agencia, setIdAgencia] = useState(0);
  const [idAcaja, setIdAcaja] = useState(0);
  const [cargando, setCargando] = useState(false);
  let listaCajas;

  const getAgencias = async () => {
    const { data } = await axiosClient.get(`/agencias/obtener_agencias`);
    dispatch(usuarioActions.setAgencias(data));
    setCargando(false);
  };

  const getCajas = async () => {
    const { data } = await axiosClient.get(
      `/agencias/obtener_cajas/${id_agencia}`
    );
    dispatch(usuarioActions.setCajas(data));
    setCargando(false);
  };

  useEffect(() => {
    setCargando(true);
    getAgencias();
  }, []);

  useEffect(() => {
    getCajas();
  }, [id_agencia]);

  const listaAgencias =
    agencias.length > 0 &&
    agencias.map((item) => {
      return (
        <option key={item.ID_AGENCIA} value={item.ID_AGENCIA}>
          {`${item.NOMBRE} - ${item.UBICACION}`}
        </option>
      );
    });

  listaCajas =
    cajas.length > 0 &&
    cajas.map((item) => {
      return (
        <option key={item.ID_CAJA} value={item.ID_CAJA}>
          {`Caja ${item.NUMERO_CAJA}`}
        </option>
      );
    });

  return (
    <>
      <Titulo textoClaro={"En que caja trabajará"} textoOscuro={"Hoy?"} />
      <div className="flex justify-center">
        <div className="md:w-2/3 lg:w-2/5 mt-6 rounded-lg">
          <form className="mb-5 bg-white rounded-lg shadow-lg px-10 py-10">
            <div>
              <label
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="agencia"
              >
                Seleccione una agencia
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
            {id_agencia != 0 && (
              <div className="mt-5">
                <label
                  className="uppercase text-gray-600 block text-xl font-bold"
                  htmlFor="caja"
                >
                  Seleccione una Caja
                </label>

                <select
                  id="caja"
                  className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                  defaultValue={"DEFAULT"}
                  onChange={(e) => setIdAcaja(e.target.value)}
                >
                  <option value="DEFAULT" disabled>
                    -- Seleccione una Caja --
                  </option>
                  {listaCajas}
                </select>
              </div>
            )}

            {idAcaja != 0 && (
              <div className="mt-6 justify-end flex">
                <BotonVolver
                  ruta={"/dashboard/operaciones"}
                  texto="Continuar"
                  estilos="text-white text-sm bg-green-700 p-3 rounded-md uppercase font-bold hover:bg-green-900"
                />
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="flex justify-center py-6 scroll-smooth">
        <BotonVolver ruta={"/dashboard"} />
      </div>
    </>
  );
};

export default SeleccionarAgencia;
