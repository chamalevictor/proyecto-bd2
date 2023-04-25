import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../componentes/Alerta";

const CrearUsuario = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState(0);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFullName(fullName.trim()); // Borrando espacios extras del nombre
    if (fullName.split(" ").length > 2) {
      // Solo debe haber 1 nombre y 1 apellido
      setAlerta({
        msg: "Ingresa solo un nombre y un apellido",
        error: true,
      });
      return;
    }

    if ([fullName, email, password, repeatPassword].includes("")) {
      // Checking for blank fields.
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (password !== repeatPassword) {
      setAlerta({
        msg: "Las contraseñas no coinciden",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      // Checking for password length.
      setAlerta({
        msg: "La contraseña debe tener como mínimo 6 caractéres",
        error: true,
      });
      return;
    }

    setAlerta({});

    // Create user in API
    // try {
    //   const name = fullName.split(" ")[0];
    //   const lastname = fullName.split(" ")[1];
    //   const { data } = await axiosClient.post(`/users`, {
    //     name,
    //     lastname,
    //     dob,
    //     email,
    //     password,
    //   });

    //   setAlerta({
    //     msg: data.msg,
    //     error: false,
    //   });

    //   // Reset variables.
    //   setFullName("");
    //   setEmail("");
    //   setDob(new Date());
    //   setPassword("");
    //   setRepeatPassword("");
    // } catch (error) {
    //   setAlerta({
    //     msg: error.response.data.msg,
    //     error: true,
    //   });
    // }
  };

  const { msg } = alerta;
  return (
    <div className="flex justify-center">
      <div className="md:w-2/3 lg:w-2/5 mt-6 shadow-xl rounded-lg">
        <div className="text-center">
          <h1 className="text-green-600 font-black text-6xl capitalize">
            Crear Nuevo
            <span className="text-slate-700"> Usuario</span>
          </h1>
        </div>

        {msg && <Alerta alerta={alerta} />}

        <form
          onSubmit={handleSubmit}
          className="my-10 bg-white rounded-lg px-10 pt-10"
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="name"
            >
              Nombre Completo
            </label>
            <input
              type="text"
              placeholder="Un nombre y un apellido"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              placeholder="Correo empresarial de Banco Chinautla"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="dob"
            >
              Rol de Usuario
            </label>
            <select
              id="id_rol"
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
              defaultValue={"DEFAULT"}
              onChange={(e) => setRol(e.target.value)}
            >
              <option value="DEFAULT" disabled>
                -- Seleccione un Rol --
              </option>
              <option value="1">Administrador de Sistema</option>
              <option value="2">Gerente de Agencia</option>
            </select>
          </div>
          <input
            type="submit"
            value="Crear usuario"
            className="bg-green-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-green-800 transition-colors"
          />
        </form>
      </div>
    </div>
  );
};

export default CrearUsuario;
