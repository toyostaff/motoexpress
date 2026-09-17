import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Booking from "../pages/Booking";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";


function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route 
          path="/reservar" 
          element={<Booking />} 
        />

        <Route 
          path="/admin/login" 
          element={<Login />} 
        />

        <Route 
          path="/admin/dashboard" 
          element={<Dashboard />} 
        />

      </Routes>

    </BrowserRouter>

  );
}


export default AppRouter;
