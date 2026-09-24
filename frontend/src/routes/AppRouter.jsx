import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Booking from "../pages/Booking";
import Login from "../pages/Login";

import Dashboard from "../pages/Dashboard";

import Citas from "../components/admin/Citas";
import Calendario from "../components/admin/Calendario";

import Clientes from "../components/admin/Clientes";
import Servicios from "../components/admin/Servicios";
import Reportes from "../components/admin/Reportes";
import Configuracion from "../components/admin/Configuracion";
import DetalleCita from "../components/admin/DetalleCita";
import Semanal from "../components/admin/Semanal";

import ProtectedRoute from "../components/auth/ProtectedRoute";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Público */}

        <Route path="/" element={<Home />} />

        <Route path="/reservar" element={<Booking />} />

        {/* Login */}

        <Route path="/admin/login" element={<Login />} />

        {/* Panel administrador */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/citas"
          element={
            <ProtectedRoute>
              <Citas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/citas/:id"
          element={
            <ProtectedRoute>
              <DetalleCita />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/calendario"
          element={
            <ProtectedRoute>
              <Calendario />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/semanal"
          element={
            <ProtectedRoute>
              <Semanal />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/clientes"
          element={
            <ProtectedRoute>
              <Clientes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/servicios"
          element={
            <ProtectedRoute>
              <Servicios />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reportes"
          element={
            <ProtectedRoute>
              <Reportes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/configuracion"
          element={
            <ProtectedRoute>
              <Configuracion />
            </ProtectedRoute>
          }
        />

        {/* Redirección base admin */}

        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
