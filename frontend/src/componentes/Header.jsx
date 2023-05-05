import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usuarioActions } from "../features/usuariosSlice";
import Boton from "./Boton";
import logo from "../img/banco-chinautla-logo.png";

const Header = ({ linkTo, linkName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { usuarios } = useSelector((state) => state.usuarios);
  const today = new Date();
  const now = today.toLocaleDateString("es-GT");

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(usuarioActions.logOutUser());
    navigate("/");
  };

  return (
    <header className="px-4 py-5 bg-white border-b shadow">
      <div className="md:flex md:justify-between">
        <div>
          <h3 className="py-2 font-bold  uppercase ">
            Bienvenido {usuarios.usuario.nombre}
          </h3>
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
