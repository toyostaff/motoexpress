import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Booking from "../pages/Booking";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/reservar" element={<Booking />} />

        <Route path="/admin/login" element={<Login />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
