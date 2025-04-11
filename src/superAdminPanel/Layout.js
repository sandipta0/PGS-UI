import React, { useState, useEffect } from "react";
import {
  Box,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  CircularProgress,
  AppBar,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, Outlet } from "react-router-dom";
import { drawerWidth } from "./DrawerContent"; // or use your own constant
import { authenticateUser, logoutUser } from "../utils/auth";

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = authenticateUser();
    if (!auth) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/superadmin/dashboard" },
    { text: "Admins", icon: <PeopleIcon />, path: "/superadmin/admin" },
    { text: "Employees", icon: <WorkIcon />, path: "/superadmin/employee" },
    { text: "Students", icon: <SchoolIcon />, path: "/superadmin/student" },
  ];
  

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Super Admin Panel
        </Typography>
      </Toolbar>
      <Divider />
      <List>
      {menuItems.map((item) => (
      <ListItem button key={item.text} onClick={() => navigate(item.path)}>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.text} />
      </ListItem>
      ))}

        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#1976d2",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Super Admin Portal
          </Typography>
          <IconButton
            size="large"
            aria-label="show notifications"
            color="inherit"
            onClick={handleNotificationMenuOpen}
          >
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32 }}>SA</Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
      >
        <MenuItem>New admin registration request</MenuItem>
        <MenuItem>System maintenance scheduled</MenuItem>
        <MenuItem>New user feedback received</MenuItem>
        <MenuItem>Security alert: Multiple login attempts</MenuItem>
      </Menu>
    </Box>
  );
};

export default Layout;
