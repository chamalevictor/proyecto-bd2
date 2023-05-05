import reportes_jpg from "../img/reportes.jpg";
import Titulo from "../componentes/Titulo";
import TarjetaOpciones from "../componentes/TarjetaOpciones";
import { Link } from "react-router-dom";

const Reportes = () => {
  return (
    <div className="">
      <div className="">
        <Titulo textoClaro={"Generación de "} textoOscuro={"Reportes"} />
      </div>
      <div className="w-full flex  justify-between flex-wrap gap-3">
        <Link to={"reportes_de_cuentas"}>
          <TarjetaOpciones texto={"Reportes de Cuentas"} />
        </Link>
        <TarjetaOpciones texto={"Reportes de Agencias"} />
        <TarjetaOpciones texto={"Reportes de Planillas"} />
      </div>
      <div className="flex justify-center py-6 shadow-lg ">
        <img
          src={reportes_jpg}
          alt=""
          className="max-w-sm rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Reportes;
