import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  user,
  redirectPath = "/inicia-sesion",
  children,
}) => {
  if (!user) {
    console.log("🚀 ~ file: ProtectedRoute.js ~ line 9 ~ user", user);
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
