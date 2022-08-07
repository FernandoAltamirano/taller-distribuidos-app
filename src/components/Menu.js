import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { deleteUser } from "../redux/actions";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const MenuComponent = () => {
  const state = useSelector((state) => state.User);
  const navigate = useNavigate();
  const dp = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    dp(deleteUser());
  };

  const handleAccountRedirect = () => {
    if (state?.user?.name) {
      navigate("/dashboard/configuraciones");
      return;
    }
    navigate("/usuario-detalles");
  };

  return (
    <div
      className={`menu-component ${
        state?.user?.firstname ? "capitalize" : "lowercase"
      }`}
    >
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {state?.user?.img ? (
          <img
            src={state.user.img}
            alt=''
            width={40}
            style={{ borderRadius: "100%" }}
          />
        ) : (
          <AccountCircleIcon width={30} />
        )}
        {/* <KeyboardArrowDownIcon /> */}
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleAccountRedirect}>Mi cuenta</MenuItem>
        <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
      </Menu>
    </div>
  );
};
