import { Button, Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

export const DrawerComponent = ({ isOpen, toggleModal }) => {
  return (
    <Drawer anchor={"left"} open={isOpen} onClose={toggleModal}>
      <div>
        <div className="flex">
          <img src="/logo.png" alt="" width="50px" />
          <h1>Nombre</h1>
          <Button onClick={toggleModal}>
            <MenuIcon style={{ color: "black" }} />
          </Button>
        </div>
        <div className="flex-column drawer-list">
          <Link to="/" onClick={toggleModal}>
            INICIO
          </Link>
          <Link to="/hostels" onClick={toggleModal}>
            ALBERGUES
          </Link>
          <Link to="/pets" onClick={toggleModal}>
            MASCOTAS
          </Link>
        </div>
      </div>
    </Drawer>
  );
};
