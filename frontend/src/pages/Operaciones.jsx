import operaciones_jpg from "../img/operaciones.jpg";
import Titulo from "../componentes/Titulo";
import TarjetaOpciones from "../componentes/TarjetaOpciones";
import { Link } from "react-router-dom";
import BotonVolver from "../componentes/BotonVolver";
import { Outlet, Route, Routes } from "react-router-dom"
import Retiros from "./subpages/Retiros";

const Operaciones = () => {
  window.scrollTo({ top: 100, left: 0 });
  return (
    <div className="">
      <div className="">
        <Titulo textoClaro={"Operaciones"} textoOscuro={""} />
      </div>
      <div className="w-full flex  justify-between flex-wrap gap-3">
        <Link to={"retiros"}>
          <TarjetaOpciones texto={"Retiros"} />
        </Link>
        <Link to={"depositos"}>
          <TarjetaOpciones texto={"Depósitos"} />
        </Link>
        <TarjetaOpciones texto={"Transferencias"} />
        <TarjetaOpciones texto={"Pago de Planillas"} />
      </div>
      <div className="flex justify-center py-6 shadow-lg ">
        <img
          src={operaciones_jpg}
          alt=""
          className="max-w-sm rounded-lg shadow-lg"
        />
      </div>
      <div className="flex justify-center py-6 shadow-lg scroll-smooth">
        <BotonVolver ruta={"/dashboard/seleccion_agencia"} />
      </div>
      <Routes >
        <Route path="retiros" element={<Retiros />} />
      </Routes>
    </div>
  );
};

export default Operaciones;
