import { Button, Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

export const DrawerComponent = ({ isOpen, toggleModal }) => {
  return (
    <Drawer
      anchor={"left"}
      open={isOpen}
      onClose={toggleModal}
      className='drawer-component'
    >
      <div>
        <div className='flex drawer-header-component'>
          <img src='/logo.png' alt='' width='50px' />
          <h3 style={{ color: "var(--white-color)", marginLeft: "10px" }}>
            Adopción
            <br /> de mascotas
          </h3>
          <Button onClick={toggleModal}>
            <MenuIcon style={{ color: "var(--white-color)" }} />
          </Button>
        </div>
        <div className='flex-column drawer-list'>
          <Link to='/' onClick={toggleModal}>
            Inicio
          </Link>
          <Link to='/dashboard/mascotas' onClick={toggleModal}>
            Mascotas
          </Link>
        </div>
      </div>
    </Drawer>
  );
};
