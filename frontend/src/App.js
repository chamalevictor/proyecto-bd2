import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
