import { Header } from "./index";
import { Outlet } from "react-router-dom";
export const Layout = () => {
  return (
    <div className="layout-component">
      <Header />
      <Outlet />
    </div>
  );
};
