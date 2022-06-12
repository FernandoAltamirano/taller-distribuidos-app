import { Button } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "./index";
import { Menu } from "./index";
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  return (
    <>
      <div className="flex header-component">
        <Button onClick={toggleModal}>
          <MenuIcon style={{ color: "black" }} />
        </Button>
        <Menu />
      </div>
      <Drawer isOpen={isOpen} toggleModal={toggleModal} />
    </>
  );
};
