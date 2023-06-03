import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Alerta from "../componentes/Alerta";
import axiosClient from "../configs/axiosClient";

const CrearCuenta = () => {
  const { agenciaActual } = useSelector((state) => state.usuarios);

  const navigate = useNavigate();
  const [tipoCuenta, setTipoCuenta] = useState(0);
  const [id_cliente, setIdCliente] = useState("");
  const [alerta, setAlerta] = useState({});
  const [visible, setVisible] = useState(false);
  const [listadoClientes, setListadoClientes] = useState([]);
  const [firma_1, setFirma_1] = useState("");
  const [firma_2, setFirma_2] = useState("");
  const [firma_3, setFirma_3] = useState("");

  useEffect(() => {
    setAlerta({
      msg: "",
      error: false,
    });
  }, [tipoCuenta]);

  const crearCuenta = async () => {
    if ([tipoCuenta].includes(0)) {
      setAlerta({
        msg: "Seleccione tipo de cuenta",
        error: true,
      });
      return;
    }
    let nuevaCuenta = {
      id_cliente,
      tipoCuenta,
      agenciaActual,
      firma_1,
      firma_2,
      firma_3,
    };
    console.log(nuevaCuenta);
    const { data } = await axiosClient.post(
      `/servicio_al_cliente/crear_cuenta`,
      nuevaCuenta
    );

    setAlerta({
      msg: data.msg,
      error: data.exito == 1 ? false : true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    crearCuenta();
  };

  const buscarCliente = async (e) => {
    e.preventDefault();
    setAlerta({});
    try {
      const { data } = await axiosClient.get(
        `/servicio_al_cliente/buscar_cliente/${id_cliente}`
      );

      if (data.msg != "El cliente no existente") {
        setListadoClientes(data);
        setVisible(true);
      } else {
        setListadoClientes([]);
      }

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
            Crear
            <span className="text-slate-700"> Cuenta</span>
          </h1>
        </div>
        {msg && <Alerta alerta={alerta} />}
        <div className="my-5">
          {!visible && (
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="cliente"
            >
              Identificación del Cliente
            </label>
          )}
          {!visible && (
            <input
              type="number"
              pattern="[0-9]"
              placeholder="Ingrese Número de DPI"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="cliente"
              value={id_cliente}
              onChange={(e) => setIdCliente(e.target.value)}
            />
          )}
        </div>
        <div className="flex justify-end  scroll-smooth pb-2">
          {!visible && (
            <button
              className="text-white text-sm bg-green-700 p-3 rounded-md uppercase font-bold hover:bg-green-800"
              onClick={(e) => buscarCliente(e)}
            >
              Buscar
            </button>
          )}
        </div>
        {visible && (
          <>
            <form
              onSubmit={handleSubmit}
              className="mt-7 mb-5 bg-white rounded-lg shadow-lg px-10 pt-10 pb-3"
            >
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Datos del Cliente
                </label>
                <p className="font-bold text-gray-600 mt-2 mb-1 ">Nombre: </p>
                <p>{listadoClientes[0].NOMBRE || ""}</p>
                <p className="font-bold text-gray-600 mt-2 mb-1 ">Correo: </p>
                <p>{listadoClientes[0].CORREO || ""}</p>
                <p className="font-bold text-gray-600 mt-2 mb-1 ">
                  Fecha Nacimiento:{" "}
                </p>
                <p>{listadoClientes[0].FECHA_NAC.split("T")[0] || ""}</p>
              </div>
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 block text-xl font-bold"
                  htmlFor="tipo-cuenta"
                >
                  Tipo de Cuenta
                </label>
                <select
                  name="tipo-cuenta"
                  id="tipo-cuenta"
                  className="w-full mt-3 p-3 border-2 rounded-xl bg-gray-50 text-center"
                  onChange={(e) => setTipoCuenta(e.target.value)}
                  value={tipoCuenta}
                >
                  <option value="">--Seleccione el Tipo de Cuenta--</option>
                  <option value={1}>Monetaria</option>
                  <option value={2}>Ahorro</option>
                </select>
              </div>
              <label
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="tipo-cuenta"
              >
                Firmas
              </label>
              <input
                type="text"
                placeholder="Firma 1"
                className="w-full my-3 p-3 border rounded-xl bg-gray-50"
                id="firma-1"
                value={firma_1}
                onChange={(e) => setFirma_1(e.target.value)}
              />
              <input
                type="text"
                placeholder="Firma 2"
                className="w-full my-3 p-3 border rounded-xl bg-gray-50"
                id="firma-2"
                value={firma_2}
                onChange={(e) => setFirma_2(e.target.value)}
              />
              <input
                type="text"
                placeholder="Firma 3"
                className="w-full mt-3 mb-4 p-3 border rounded-xl bg-gray-50"
                id="firma-3"
                value={firma_3}
                onChange={(e) => setFirma_3(e.target.value)}
              />
              <input
                type="submit"
                value="Crear Cuenta"
                className="bg-green-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-green-800 transition-colors"
              />
            </form>
          </>
        )}

        <div className="flex justify-center  scroll-smooth pb-10">
          <button
            className="text-white text-sm bg-green-700 p-3 rounded-md uppercase font-bold hover:bg-green-800"
            onClick={() => navigate(-1)}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearCuenta;
