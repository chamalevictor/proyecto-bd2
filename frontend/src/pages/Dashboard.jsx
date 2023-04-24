import Modules from "../componentes/Modules";
import servicio_al_cliente from "../img/servicio-al-cliente.jpg";
import operaciones_img from "../img/operaciones.jpg";

const Dashboard = () => {
  return (
    <div>
      <h1>Hola from Dashboard</h1>

      <div className="flex">
        <Modules img={servicio_al_cliente} moduleName="Servicio Al Cliente" />

        <Modules img={operaciones_img} moduleName="Operaciones" />
      </div>
    </div>
  );
};

export default Dashboard;
