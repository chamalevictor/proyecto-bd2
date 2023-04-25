import { Outlet, Navigate } from "react-router-dom";
//import useAuth from '../hooks/useAuth'
import Header from "../componentes/Header";

const ProtectedRoutes = () => {
  //const { auth, loading } = useAuth()

  //if (loading) return 'Cargando...'

  return (
    <>
      {true ? (
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
