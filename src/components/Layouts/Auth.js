import { Link, Outlet } from "react-router-dom";
import { Logo } from "../Logo";
import "./layout.css";
export const LayoutAuth = () => {
  return (
    <div className='layout-auth'>
      <Link to='/' className='logo-absolute-container'>
        <Logo titleHidden />
      </Link>
      <img src='/bg1.jpg' alt='' className='bg-auth' />
      <div className='layout-children'>
        <Outlet />
      </div>
    </div>
  );
};
