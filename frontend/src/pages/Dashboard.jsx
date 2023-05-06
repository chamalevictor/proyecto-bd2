import { useSelector } from "react-redux";
import Modules from "../componentes/Modules";
import servicioAlCliente_jpg from "../img/servicio-al-cliente.jpg";
import usuarios_jpg from "../img/usuarios.jpg";
import operaciones_jpg from "../img/operaciones.jpg";
import agencias_jpg from "../img/agencias.jpg";
import reportes_jpg from "../img/reportes.jpg";
import Titulo from "../componentes/Titulo";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { usuario } = useSelector((state) => state.usuarios.usuarios);

  return (
    <div className=" flex flex-col gap-y-5">
      <div className="w-full">
        <Titulo textoClaro={"Tablero"} textoOscuro={"Principal"} />
      </div>
      <div className="flex flex-wrap gap-5">
        {(usuario.rol === 3 || usuario.rol === 5) && (
          <Link to={"seleccion_agencia"}>
            <Modules img={operaciones_jpg} moduleName="Operaciones" />
          </Link>
        )}

        {(usuario.rol === 3 || usuario.rol === 4) && (
          <Link to={"servicio_al_cliente"}>
            <Modules
              img={servicioAlCliente_jpg}
              moduleName="Servicio Al Cliente"
            />
          </Link>
        )}

        {usuario.rol === 3 && (
          <Link to={"reportes"}>
            <Modules img={reportes_jpg} moduleName="Reportes" />
          </Link>
        )}

        {usuario.rol === 1 && (
          <Link to={"usuarios"}>
            <Modules img={usuarios_jpg} moduleName="Usuarios" />
          </Link>
        )}
        {usuario.rol === 2 && (
          <Link to={"agencias"}>
            <Modules img={agencias_jpg} moduleName="Agencias" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
