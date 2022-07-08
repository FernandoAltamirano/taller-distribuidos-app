import { useState } from "react";
import PetsIcon from "@mui/icons-material/Pets";
import MenuIcon from "@mui/icons-material/Menu";
import ArticleIcon from "@mui/icons-material/Article";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import "./sidebar.css";

export const Sidebar = ({ signOut }) => {
  const [toggleShow, setToggleShow] = useState(false);
  return (
    <div className={toggleShow ? "sidebar open" : "sidebar"}>
      <div className="logo-details">
        <img
          src="/logo.png"
          alt="logo"
          className={toggleShow ? "logo" : "logo hidden"}
        />
        <i
          className="bx bx-menu"
          id="btn"
          onClick={() => setToggleShow(!toggleShow)}
        >
          <MenuIcon style={{ fontSize: "30px" }} />
        </i>
      </div>
      <ul className="nav-list">
        <li>
          <Link to="/solicitudes">
            <i>
              <ArticleIcon />
            </i>
            <span className="links_name">Solicitudes</span>
          </Link>
          <span className="tooltip">Solicitudes</span>
        </li>
        <li>
          <Link to="/mascotas">
            <i>
              <PetsIcon />
            </i>
            <span className="links_name">Mascotas</span>
          </Link>
          <span className="tooltip">Mascotas</span>
        </li>

        <li className="profile">
          <div className="profile-details">
            <i>
              <AccountCircleIcon width="30" color="var(--primary-color)" />
            </i>
            <p className="name">Administrador</p>
          </div>
          <ExitToAppIcon
            onClick={signOut}
            width="30"
            color="var(--primary-color)"
            cursor="pointer"
          />
        </li>
      </ul>
    </div>
  );
};
