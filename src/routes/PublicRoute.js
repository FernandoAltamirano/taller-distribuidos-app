import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PublicRoute = ({
  redirectPath = "/dashboard/mascotas",
  children,
}) => {
  const state = useSelector((state) => state.User);

  if (state?.user) {
    return state.user?.name ? (
      <Navigate to={redirectPath} replace />
    ) : (
      <Navigate to='/' replace />
    );
  }
  return children;
};
