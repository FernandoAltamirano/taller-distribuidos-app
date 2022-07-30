import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ redirectPath = "/", children }) => {
  const state = useSelector((state) => state.User);
  if (!state?.user || state?.user?.firstname)
    return <Navigate to={redirectPath} replace />;
  return children;
};
