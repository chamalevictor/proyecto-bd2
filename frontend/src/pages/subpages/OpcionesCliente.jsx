import servicioAlCliente_jpg from "../../img/servicio-al-cliente.jpg";
import Titulo from "../../componentes/Titulo";
import TarjetaOpciones from "../../componentes/TarjetaOpciones";
import { Link } from "react-router-dom";
import BotonVolver from "../../componentes/BotonVolver";

const OpcionesCliente = () => {
  window.scrollTo({ top: 100, left: 0 });
  return (
    <div className="">
      <div className="">
        <Titulo textoClaro={"Servicio al"} textoOscuro={"Cliente"} />
      </div>
      <div className="w-full flex  justify-between flex-wrap gap-3">
        <Link to={"crear"}>
          <TarjetaOpciones texto={"Crear Cliente"} />
        </Link>
        <TarjetaOpciones texto={"Modificar Cliente"} />
        <TarjetaOpciones texto={"Desactivar Cliente"} />
      </div>
      <div className="flex justify-center py-6 shadow-lg ">
        <img
          src={servicioAlCliente_jpg}
          alt=""
          className="max-w-sm rounded-lg shadow-lg"
        />
      </div>
      <div className="flex justify-center py-6 scroll-smooth">
        <BotonVolver ruta={"/dashboard/servicio_al_cliente"} />
      </div>
    </div>
  );
};

export default OpcionesCliente;
