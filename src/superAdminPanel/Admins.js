import React, { useState } from "react";
import {
  Button,
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import AddAdminForm from "../pages/AddAdminForm";
import AddIcon from '@mui/icons-material/Add';


const AdminManagement = () => {
   const [isAddAdminFormOpen, setIsAddAdminFormOpen] = useState(false);
  const handleAddAdminClick = () => {
    setIsAddAdminFormOpen(true);
  };

  const handleAddAdminClose = () => {
    setIsAddAdminFormOpen(false);
  };

  const handleAddAdminSubmit = (formData) => {
    // Handle admin form submission

    console.log("New Admin Data:", formData);

    setIsAddAdminFormOpen(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      {/* Main Content */}
      <Box sx={{ p: 3, width: '100%' }}>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Admin Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddAdminClick}
        >
          Add Admin
        </Button>
        <AddAdminForm
          open={isAddAdminFormOpen}
          handleClose={handleAddAdminClose}
          onSubmit={handleAddAdminSubmit}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              {
                id: 1,
                name: "John Doe",
                email: "john.doe@example.com",
                department: "Academic",
                status: "Active",
              },
              {
                id: 2,
                name: "Jane Smith",
                email: "jane.smith@example.com",
                department: "Administration",
                status: "Active",
              },
              {
                id: 3,
                name: "Robert Johnson",
                email: "robert.j@example.com",
                department: "Finance",
                status: "Inactive",
              },
              {
                id: 4,
                name: "Emily Davis",
                email: "emily.d@example.com",
                department: "Student Affairs",
                status: "Active",
              },
              {
                id: 5,
                name: "Michael Brown",
                email: "michael.b@example.com",
                department: "IT",
                status: "Active",
              },
            ].map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.department}</TableCell>
                <TableCell>
                  <Chip
                    label={admin.status}
                    color={admin.status === "Active" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" color="primary" onClick={() => {}}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                      /* Handle delete */
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </Box>
  );
};
export default AdminManagement;
