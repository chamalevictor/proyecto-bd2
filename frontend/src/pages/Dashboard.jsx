import Modules from "../componentes/Modules";
import servicioAlCliente_jpg from "../img/servicio-al-cliente.jpg";
import usuarios_jpg from "../img/usuarios.jpg";
import operaciones_jpg from "../img/operaciones.jpg";
import agencias_jpg from "../img/agencias.jpg";
import reportes_jpg from "../img/reportes.jpg";
import Titulo from "../componentes/Titulo";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className=" flex flex-col gap-y-5">
      <div className="w-full">
        <Titulo textoClaro={"Tablero"} textoOscuro={"Principal"} />
      </div>
      <div className="flex flex-wrap gap-5">
        <Link to={"operaciones"}>
          <Modules img={operaciones_jpg} moduleName="Operaciones" />
        </Link>
        <Link to={"servicio_al_cliente"}>
          <Modules
            img={servicioAlCliente_jpg}
            moduleName="Servicio Al Cliente"
          />
        </Link>
        <Link to={"reportes"}>
          <Modules img={reportes_jpg} moduleName="Reportes" />
        </Link>

        <Link to={"usuarios"}>
          <Modules img={usuarios_jpg} moduleName="Usuarios" />
        </Link>
        <Link to={"agencias"}>
          <Modules img={agencias_jpg} moduleName="Agencias" />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
