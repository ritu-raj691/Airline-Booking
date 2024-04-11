import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import InfoIcon from "@mui/icons-material/Info";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

interface IMenuBar {
  name: string;
  icon: any;
  path: string;
}

const MenuBar: IMenuBar[] = [
  { name: "Home", icon: <HomeIcon sx={{ mr: 1 }} />, path: "/flights" },
  { name: "About Us", icon: <InfoIcon sx={{ mr: 1 }} />, path: "/about" },
  { name: "Contact Us", icon: <MailIcon sx={{ mr: 1 }} />, path: "/contact" },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path ?? "/");
    handleClose();
    // Handle navigation logic here
  };

  return (
    <AppBar position="static" className="app-bar">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleClick}
          sx={{ display: { md: "none" } }} // Hide menu icon on desktop
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{ display: { md: "none" } }} // Hide menu on desktop
        >
          {MenuBar.map((menu: IMenuBar, index: number) => {
            return (
              <MenuItem
                onClick={() => handleNavigate(menu.path)}
                key={`mob_menu_item_${index + 1}`}
              >
                {menu.icon}
                {menu.name}
              </MenuItem>
            );
          })}
        </Menu>
        {MenuBar.map((menu: IMenuBar, index: number) => {
          return (
            <Button
              color="inherit"
              component={NavLink}
              to={menu?.path}
              sx={{ display: { xs: "none", md: "inline-block" } }}
              key={`menu_item_${index + 1}`}
              className="btn"
            >
              <div className="menu-items">
                {menu.icon}
                {menu.name}
              </div>
            </Button>
          );
        })}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
