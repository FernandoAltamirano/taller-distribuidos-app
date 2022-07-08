import { Navigate } from "react-router-dom";

export const PublicRoute = ({ redirectPath = "/inicio", children }) => {
  const user = localStorage.getItem("token")
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
