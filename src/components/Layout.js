import { Header } from "./index";

export const Layout = ({ children }) => {
  return (
    <div className="layout-component">
      <Header />
      {children}
    </div>
  );
};
