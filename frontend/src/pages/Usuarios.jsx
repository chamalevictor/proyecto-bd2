import usuarios_jpg from "../img/usuarios.jpg";
import Titulo from "../componentes/Titulo";
import TarjetaOpciones from "../componentes/TarjetaOpciones";
import { Link, useNavigate } from "react-router-dom";
import BotonVolver from "../componentes/BotonVolver";

const Usuarios = () => {
  return (
    <div className="">
      <div className="">
        <Titulo textoClaro={"Administración de"} textoOscuro={"Usuarios"} />
      </div>
      <div className="w-full flex  justify-between flex-wrap gap-3">
        <Link to={"crear_usuario"}>
          <TarjetaOpciones texto={"Crear Usuario"} />
        </Link>
        <TarjetaOpciones texto={"Modificar Usuario"} />
        <TarjetaOpciones texto={"Desactivar Usuario"} />
      </div>
      <div className="flex justify-center py-6 shadow-lg ">
        <img
          src={usuarios_jpg}
          alt=""
          className="max-w-sm rounded-lg shadow-lg"
        />
      </div>
      <div className="flex justify-center py-6 shadow-lg focusable">
        <BotonVolver ruta={"/dashboard"} />
      </div>
    </div>
  );
};

export default Usuarios;
