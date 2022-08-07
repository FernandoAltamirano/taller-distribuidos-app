import { useState } from "react";
import PetsIcon from "@mui/icons-material/Pets";
import MenuIcon from "@mui/icons-material/Menu";
import ArticleIcon from "@mui/icons-material/Article";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./sidebar.css";
import { Logo } from "../Logo";

export const Sidebar = ({ signOut }) => {
  const state = useSelector((state) => state.User);
  const location = useLocation();
  const [toggleShow, setToggleShow] = useState(false);

  const handleItemActive = (item) =>
    location.pathname.includes(item) ? "element-active" : "";

  return (
    <div className={toggleShow ? "sidebar open" : "sidebar"}>
      <div className='logo-details'>
        <Logo className={toggleShow ? "logo" : "logo hidden"} titleHidden />
        <i
          className='bx bx-menu'
          id='btn'
          onClick={() => setToggleShow(!toggleShow)}
        >
          <MenuIcon style={{ fontSize: "30px" }} />
        </i>
      </div>
      <ul className='nav-list'>
        <li>
          <Link
            to='/dashboard/solicitudes'
            className={handleItemActive("solicitudes")}
          >
            <i>
              <ArticleIcon />
            </i>
            <span className='links_name'>Solicitudes</span>
          </Link>
          <span className='tooltip'>Solicitudes</span>
        </li>
        <li>
          <Link
            to='/dashboard/mascotas'
            className={handleItemActive("mascotas")}
          >
            <i>
              <PetsIcon />
            </i>
            <span className='links_name'>Mascotas</span>
          </Link>
          <span className='tooltip'>Mascotas</span>
        </li>
        <li>
          <Link
            to='/dashboard/configuraciones'
            className={handleItemActive("configuraciones")}
          >
            <i>
              <SettingsIcon />
            </i>
            <span className='links_name'>Configuraciones</span>
          </Link>
          <span className='tooltip'>Configuraciones</span>
        </li>

        <li className='profile'>
          <div className='profile-details'>
            <i>
              {state?.user.img ? (
                <img
                  src={state.user.img}
                  alt=''
                  style={{
                    borderRadius: "100%",
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <AccountCircleIcon width='30' color='var(--primary-color)' />
              )}
            </i>
            <p className='name' title={state.user.name}>
              {state.user.name}
            </p>
          </div>
          <ExitToAppIcon
            onClick={signOut}
            width='30'
            color='var(--primary-color)'
            cursor='pointer'
            className='signout-icon'
            titleAccess='Cerrar sesión'
          />
        </li>
      </ul>
    </div>
  );
};
