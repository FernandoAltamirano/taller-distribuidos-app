import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { deleteUser } from "../../redux/actions";
import { Sidebar } from "../Sidebar/Sidebar";

export const LayoutDashboard = () => {
  const navigate = useNavigate()
  const dp = useDispatch()
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/inicia-sesion");
    dp(deleteUser());
  };

  return (
    <div className="layout-component">
      <Sidebar signOut={handleLogout} />
      <Outlet />
    </div>
  );
};
