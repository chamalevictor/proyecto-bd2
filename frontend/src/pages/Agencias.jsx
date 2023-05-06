import agencias_jpg from "../img/agencias.jpg";
import Titulo from "../componentes/Titulo";
import TarjetaOpciones from "../componentes/TarjetaOpciones";
import { Link } from "react-router-dom";
import BotonVolver from "../componentes/BotonVolver";

const Agencias = () => {
  window.scrollTo({ top: 100, left: 0 });
  return (
    <div className="">
      <div className="">
        <Titulo textoClaro={"Administración de"} textoOscuro={"Agencias"} />
      </div>
      <div className="w-full flex  justify-between flex-wrap gap-3">
        <Link to={"crear_agencia"}>
          <TarjetaOpciones texto={"Crear Agencia"} />
        </Link>
        <Link to={"agregar_caja"}>
          <TarjetaOpciones texto={"Agregar Caja"} />
        </Link>
        <TarjetaOpciones texto={"Modificar Agencia"} />
        <TarjetaOpciones texto={"Desactivar Agencia"} />
      </div>
      <div className="flex justify-center py-6 shadow-lg ">
        <img
          src={agencias_jpg}
          alt=""
          className="max-w-sm rounded-lg shadow-lg"
        />
      </div>
      <div className="flex justify-center py-6  scroll-smooth">
        <BotonVolver ruta={"/dashboard"} />
      </div>
    </div>
  );
};

export default Agencias;
