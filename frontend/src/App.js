import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import CrearUsuario from "./pages/CrearUsuario";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/dashboard" element={<ProtectedRoutes />}>
          <Route index element={<Dashboard />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="usuarios/crear_usuario" element={<CrearUsuario />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
