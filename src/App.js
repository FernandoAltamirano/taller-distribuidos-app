import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "./routes";
import { LayoutDashboard, LayoutAuth } from "./components";
import { Home, Login, Pets, Register, RegisterPet, Requests } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute children={<LayoutDashboard />} />}>
            <Route path="/inicio" element={<Home />} />
            <Route path="/mascotas" element={<Pets />} />
            <Route path="/mascotas/registrar" element={<RegisterPet />} />
            <Route path="/solicitudes" element={<Requests />} />
          </Route>
          <Route path="/" element={<PublicRoute children={<LayoutAuth />} />}>
            <Route path="/registrate" element={<Register />} />
            <Route path="/inicia-sesion" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
