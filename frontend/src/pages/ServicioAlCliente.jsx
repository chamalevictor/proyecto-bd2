import servicioAlCliente_jpg from "../img/servicio-al-cliente.jpg";
import Titulo from "../componentes/Titulo";
import TarjetaOpciones from "../componentes/TarjetaOpciones";
import { Link } from "react-router-dom";
import BotonVolver from "../componentes/BotonVolver";

const ServicioAlCliente = () => {
  window.scrollTo({ top: 100, left: 0 });
  return (
    <div className="">
      <div className="">
        <Titulo textoClaro={"Servicio al"} textoOscuro={"Cliente"} />
      </div>
      <div className="w-full flex  justify-between flex-wrap gap-3">
        <Link to={"reportes_de_cuentas"}>
          <TarjetaOpciones texto={"Clientes"} />
        </Link>
        <TarjetaOpciones texto={"Cuentas"} />
        <TarjetaOpciones texto={"Chequeras"} />
      </div>
      <div className="flex justify-center py-6 shadow-lg ">
        <img
          src={servicioAlCliente_jpg}
          alt=""
          className="max-w-sm rounded-lg shadow-lg"
        />
      </div>
      <div className="flex justify-center py-6 shadow-lg scroll-smooth">
        <BotonVolver ruta={"/dashboard"} />
      </div>
    </div>
  );
};

export default ServicioAlCliente;
