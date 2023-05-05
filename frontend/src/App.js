import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import CrearUsuario from "./pages/CrearUsuario";
import Agencias from "./pages/Agencias";
import Reportes from "./pages/Reportes";
import ServicioAlCliente from "./pages/ServicioAlCliente";
import Operaciones from "./pages/Operaciones";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="confirmar_cuenta/:token" element={<ConfirmarCuenta />} />
          <Route path="confirmar_cuenta/:id" element={<ConfirmarCuenta />} />
        </Route>
        <Route path="/dashboard" element={<ProtectedRoutes />}>
          <Route index element={<Dashboard />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="usuarios/crear_usuario" element={<CrearUsuario />} />
          <Route path="agencias" element={<Agencias />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="servicio_al_cliente" element={<ServicioAlCliente />} />
          <Route path="operaciones" element={<Operaciones />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
