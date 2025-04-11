// DrawerContent.js
import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Box,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";

export const drawerWidth = 240;

export const drawer = (
  <Box>
    <Toolbar>
      <Typography variant="h6" noWrap component="div">
        Super Admin Panel
      </Typography>
    </Toolbar>
    <Divider />
    <List>
      {[
        { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
        { text: "Admins", path: "/admins", icon: <AdminPanelSettingsIcon /> },
        { text: "Employees", path: "/employees", icon: <PeopleIcon /> },
        { text: "Students", path: "/students", icon: <SchoolIcon /> },
      ].map((item) => (
        <ListItem button key={item.text} component="a" href={item.path}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  </Box>
);
