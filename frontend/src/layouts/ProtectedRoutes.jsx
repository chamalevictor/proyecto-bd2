import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../componentes/Header";

const ProtectedRoutes = () => {
  const { autenticado } = useSelector((state) => state.usuarios);

  return (
    <>
      {autenticado ? (
        <div className="bg-gray-100">
          <Header />
          <main className="px-6">
            <Outlet />
          </main>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default ProtectedRoutes;
