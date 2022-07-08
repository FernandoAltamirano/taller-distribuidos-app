import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  redirectPath = "/inicia-sesion",
  children,
}) => {
  const user = localStorage.getItem("token")
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
