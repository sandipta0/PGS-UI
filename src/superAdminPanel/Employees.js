import React, { useState } from "react";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
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
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import AddEmployeeForm from "../pages/AddEmployeeForm";
import BulkEmployeeUpload from '../pages/BulkEmployeeUpload';
import {EditEmployeeForm }from '../pages/EditEmployeeForm';


const EmployeeManagement = () => {
  const [isAddEmployeeFormOpen, setIsAddEmployeeFormOpen] = useState(false);
const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
 const [currentEmployee, setCurrentEmployee] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const handleAddEmployeeClick = () => {
    setIsAddEmployeeFormOpen(true);
  };

  const handleAddEmployeeClose = () => {
    setIsAddEmployeeFormOpen(false);
  };

  const handleAddEmployeeSubmit = (formData) => {
    console.log("New Employee Data:", formData);
    setIsAddEmployeeFormOpen(false);
  };
  const handleBulkUploadClick = () => {
    setIsBulkUploadOpen(true);
  };
  const handleBulkUploadClose = () => {
    setIsBulkUploadOpen(false);
  };
  const handleBulkUploadSubmit = (file) => {
    console.log("Uploaded file:", file);

    setIsBulkUploadOpen(false);
  };
  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee);

    // Add your edit logic here
  };
  const handleEditEmployeeSubmit = (updatedEmployee) => {
    // Add your submit logic here

    setCurrentEmployee(null);
  };
  const colleges = [
    {
      id: 1,
      name: "CUTM",
      employees: [
        {
          id: 1,
          name: "Dr. Rajesh Kumar",
          email: "rajesh.k@cutm.ac.in",
          department: "Computer Science",
          designation: "Professor",
          status: "Active",
        },
        {
          id: 2,
          name: "Dr. Priya Sharma",
          email: "priya.s@cutm.ac.in",
          department: "Electronics",
          designation: "Associate Professor",
          status: "Active",
        },
        {
          id: 3,
          name: "Dr. Amit Singh",
          email: "amit.s@cutm.ac.in",
          department: "Mechanical",
          designation: "Professor",
          status: "Active",
        },
        {
          id: 4,
          name: "Dr. Neha Patel",
          email: "neha.p@cutm.ac.in",
          department: "Civil",
          designation: "Assistant Professor",
          status: "Active",
        },
        {
          id: 5,
          name: "Dr. Sanjay Verma",
          email: "sanjay.v@cutm.ac.in",
          department: "Electrical",
          designation: "Professor",
          status: "Active",
        },
      ],
    },
    {
      id: 2,
      name: "Silicon College",
      employees: [
        {
          id: 6,
          name: "Dr. Anjali Gupta",
          email: "anjali.g@silicon.ac.in",
          department: "Computer Science",
          designation: "Professor",
          status: "Active",
        },
        {
          id: 7,
          name: "Dr. Vikram Singh",
          email: "vikram.s@silicon.ac.in",
          department: "Electronics",
          designation: "Associate Professor",
          status: "Active",
        },
        {
          id: 8,
          name: "Dr. Meera Desai",
          email: "meera.d@silicon.ac.in",
          department: "Mechanical",
          designation: "Professor",
          status: "Active",
        },
        {
          id: 9,
          name: "Dr. Rahul Sharma",
          email: "rahul.s@silicon.ac.in",
          department: "Civil",
          designation: "Assistant Professor",
          status: "Active",
        },
        {
          id: 10,
          name: "Dr. Sneha Reddy",
          email: "sneha.r@silicon.ac.in",
          department: "Electrical",
          designation: "Professor",
          status: "Active",
        },
      ],
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
    <Box sx={{ p: 4 ,width:'100%'}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Employee Management</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CloudUploadIcon />}
            onClick={handleBulkUploadClick}
          >
            Bulk Upload
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddEmployeeClick}
          >
            Add Employee
          </Button>
        </Box>
        <AddEmployeeForm
          open={isAddEmployeeFormOpen}
          handleClose={handleAddEmployeeClose}
          onSubmit={handleAddEmployeeSubmit}
        />
        <BulkEmployeeUpload
          open={isBulkUploadOpen}
          handleClose={handleBulkUploadClose}
          onSubmit={handleBulkUploadSubmit}
        />
      </Box>

      {!selectedCollege ? (
        <Grid container spacing={3}>
          {colleges.map((college) => (
            <Grid item xs={12} md={6} key={college.id}>
              <Card
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
                onClick={() => setSelectedCollege(college)}
              >
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {college.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Employees: {college.employees.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <IconButton onClick={() => setSelectedCollege(null)} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5">
              {selectedCollege.name} - Employees
            </Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedCollege.employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.designation}</TableCell>
                    <TableCell>
                      <Chip
                        label={employee.status}
                        color={
                          employee.status === "Active" ? "success" : "error"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditEmployee(employee)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Edit Employee Dialog */}
          <EditEmployeeForm
            open={isEditEmployeeModalOpen}
            handleClose={() => setIsEditEmployeeModalOpen(false)}
            employee={currentEmployee}
            onSubmit={handleEditEmployeeSubmit}
          />
        </Box>
      )}
    </Box>
    </Box>
  );
};

export default EmployeeManagement;
