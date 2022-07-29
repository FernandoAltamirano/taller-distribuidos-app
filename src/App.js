import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import isEmpty from "is-empty";
import { ToastContainer } from "react-toastify";

import { ProtectedRoute, PublicRoute } from "./routes";
import { LayoutDashboard, LayoutAuth } from "./components";
import {
  Home,
  Landing,
  Login,
  Pets,
  Register,
  RegisterPet,
  Requests,
} from "./pages";
import { UserController } from "./controllers/User.controller";
import { setUser } from "./redux/actions";
import "react-toastify/dist/ReactToastify.css";
import Galery from "./pages/Landing/Galery";
import PetDetails from "./pages/Landing/PetDetails";

export default function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.User);

  const validateIfThereAreUser = async () => {
    const token = localStorage.getItem("token");
    if (isEmpty(token)) return;
    await UserController.getUserDataByToken({ token, setUser, dispatch });
  };

  useEffect(() => {
    if (isEmpty(state.user)) {
      validateIfThereAreUser();
    }
  }, [state]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute children={<LayoutDashboard />} />}
          >
            <Route path="/mascotas" element={<Pets />} />
            <Route path="/mascotas/registrar" element={<RegisterPet />} />
            <Route path="/solicitudes" element={<Requests />} />
          </Route>
          <Route path="/" element={<PublicRoute children={<LayoutAuth />} />}>
            <Route path="/registrate" element={<Register />} />
            <Route path="/inicia-sesion" element={<Login />} />
          </Route>
          <Route path="/portal">
            <Route path="/portal" element={<Landing />} />
            <Route path="/portal/galeria" element={<Galery />} />
            <Route
              path="/portal/galeria/detalles/:id"
              element={<PetDetails />}
            />
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
