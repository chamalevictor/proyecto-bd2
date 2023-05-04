import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/usuariosServices";
import { useSelector, useDispatch } from "react-redux";
import { usuarioActions } from "../features/usuariosSlice";
import Alerta from "../componentes/Alerta";
import logo from "../img/banco-chinautla-logo.png";

const Login = () => {
  const {
    usuarios,
    alerta: alertaRedux,
    autenticado,
  } = useSelector((state) => state.usuarios);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevenir campos vacios
    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (email.split("@")[1] !== "bancochinautla.com") {
      console.log("se mete");
      setAlerta({
        msg: "Debe utilizar una cuenta de la organizacion",
        error: true,
      });
      return;
    }

    dispatch(loginUser({ email, password })); // Autentica al usuario
  };

  useEffect(() => {
    if (autenticado) {
      localStorage.setItem("token", usuarios.token);
      navigate("/dashboard");
    }
    return () => {
      setAlerta({
        msg: "",
        error: false,
      });
    };
  }, [autenticado]);

  const { msg } = alerta;
  useEffect(() => {
    console.log(alertaRedux);
    setAlerta({
      alertaRedux,
    });
  }, [alertaRedux]);

  return (
    <>
      <div className="w-full flex justify-center bt-10 mb-6">
        <img src={logo} alt="Logo" />
      </div>
      {msg && <Alerta alerta={alerta} />}
      <form
        onSubmit={handleSubmit}
        className="mb-5 bg-white shadow rounded-lg px-10 pt-10 pb-5  "
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            placeholder="Correo de la organización"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Contraseña de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-green-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-green-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-center">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/olvide_contrasena"
        >
          Olvidé mi contraseña
        </Link>
      </nav>
    </>
  );
};

export default Login;
