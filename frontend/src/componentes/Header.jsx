import { Link, useNavigate } from "react-router-dom";
import Boton from "./Boton";
import logo from "../img/banco-chinautla-logo.png";

const Header = ({ linkTo, linkName }) => {
  const navigate = useNavigate();
  const today = new Date();
  const now = today.toLocaleDateString("es-GT");

  const handleLogout = () => {
    localStorage.removeItem("token");
    // falta logout
    navigate("/");
  };

  return (
    <header className="px-4 py-5 bg-white border-b shadow">
      <div className="md:flex md:justify-between">
        <div>
          <h3 className="py-2 font-bold  uppercase ">Bienvenido {"Usuario"}</h3>
          <p className="mt-1 font-bold">Guatemala {now}</p>
        </div>
        <Link to="/dashboard">
          <img src={logo} alt="logo banco" className="w-48" />
        </Link>
        <div className="flex items-center gap-4">
          <Link to={linkTo} className="font-bold uppercase">
            {" "}
            {linkName}{" "}
          </Link>

          <Boton title={"Cerrar Sesión"} onClickAction={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default Header;
