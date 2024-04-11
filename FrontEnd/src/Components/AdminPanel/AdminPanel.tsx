import * as React from "react";
import { Suspense, lazy, useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  useNavigate,
  useLocation,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Logout } from "@mui/icons-material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuOptions from "./Sidebar/MenuOptions";
import "./AdminPanel.css";
import { isAuthenticated } from "../../Utils/Constant";
const AdminDepartureArrivalInfo = lazy(
  () => import("./Inventory/DeptReturnInfo")
);
const OnewayInfo = lazy(() => import("./Inventory/OnewayInfo"));
const GridInventory = lazy(() => import("./GridInventory/GridInventory"));

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const tabClickEvent = (url: any, index: number) => {
    navigate(url.path);
  };

  const dataRes = MenuOptions();

  const onLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/admin/login");
  };

  return (
    <Box className="wrapper" style={{ background: "#e9e9e9b8" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              // ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {dataRes.map((text: any, index: number) => {
            return (
              <>
                {text.path === location.pathname ? (
                  <Typography variant="h6" noWrap component="div">
                    {text.topLabel}
                  </Typography>
                ) : (
                  ""
                )}
              </>
            );
          })}
          <div
            style={{
              position: "absolute",
              right: 0,
              float: "right",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="logout"
              onClick={() => {}}
              sx={{
                fontWeight: 600,
              }}
            >
              <Typography variant="body2" style={{ marginRight: "12px" }}>
                {location?.state?.email ??
                  localStorage.getItem("userEmail") ??
                  ""}
              </Typography>
            </IconButton>
            <Avatar
              onClick={handleMenuOpen}
              sx={{
                marginRight: 3,
                cursor: "pointer",
                background: "#efeaea69",
              }}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={onLogoutClick}>
                <Logout /> Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {dataRes.map((text: any, index: number) => (
            <ListItem key={text.id} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                style={{
                  background:
                    text.path === location.pathname ? "#94aec8" : "#1976d2",
                }}
                onClick={() => tabClickEvent(text, index)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                  style={{
                    color: text.path === location.pathname ? "#000" : "#fff",
                  }}
                >
                  {text.img}
                </ListItemIcon>
                <ListItemText
                  onClick={() => tabClickEvent(text, index)}
                  primary={text.label}
                  sx={{ opacity: open ? 1 : 0 }}
                  style={{
                    color: text.path === location.pathname ? "#000" : "#fff",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        className="main-container"
      >
        <DrawerHeader />
        <div className={`content ${open ? "open" : ""}`}>
          <Routes>
            <Route
              path="/admin/inventory/return"
              element={
                isAuthenticated() ? (
                  <Suspense fallback={<></>}>
                    <AdminDepartureArrivalInfo />
                  </Suspense>
                ) : (
                  <Navigate to="/admin/login" />
                )
              }
            />
            <Route
              path="/admin/inventory/oneway"
              element={
                isAuthenticated() ? (
                  <Suspense fallback={<></>}>
                    <OnewayInfo />
                  </Suspense>
                ) : (
                  <Navigate to="/admin/login" />
                )
              }
            />
            <Route
              path="/admin/inventory"
              element={
                isAuthenticated() ? (
                  <Suspense fallback={<></>}>
                    <GridInventory />
                  </Suspense>
                ) : (
                  <Navigate to="/admin/login" />
                )
              }
            />
          </Routes>
        </div>
      </Box>
    </Box>
  );
}
