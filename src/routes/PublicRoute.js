import { Navigate } from "react-router-dom";
import {useSelector} from 'react-redux'

export const PublicRoute = ({ redirectPath = "/mascotas", children }) => {
  const state = useSelector(state => state.User)

  if (state?.user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
