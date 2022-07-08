import { Navigate } from "react-router-dom";

export const PublicRoute = ({ user, redirectPath = "/inicio", children }) => {
  if (user) {
    console.log(
      "🚀 ~ file: PublicRoute.js ~ line 5 ~ PublicRoute ~ user",
      user
    );
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
