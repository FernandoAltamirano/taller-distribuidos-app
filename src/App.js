import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "./routes";
import { Layout } from "./components";
import { Home, Login, Pets, Register, RegisterPet, Requests } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import isEmpty from "is-empty";

export default function App() {
  const user = useSelector((state) => state.User);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/inicio" element={<Home />} />
            <Route path="/mascotas" element={<Pets />} />
            <Route path="/mascotas/registrar" element={<RegisterPet />} />
            <Route path="/solicitudes" element={<Requests />} />
          </Route>
          <Route path="/registrate" element={<Register />} />
          <Route path="/inicia-sesion" element={<Login />} />
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
