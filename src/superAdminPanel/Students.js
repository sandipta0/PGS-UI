import React, { useState } from "react";
import {
    Box,
    Button,
    Chip,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Grid,
    Card,
    CardContent,
    
} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    ArrowBack as ArrowBackIcon,
  } from "@mui/icons-material";
const StudentManagement = () => {
     const [selectedStudentCollege, setSelectedStudentCollege] = useState(null);
    const studentColleges = [
        {
            id: 1,
            name: "CUTM",
            students: [
                {
                    id: 1,
                    name: "Rahul Sharma",
                    rollNumber: "CUTM2023001",
                    email: "rahul.s@cutm.ac.in",
                    department: "Computer Science",
                    year: "3rd Year",
                    parentName: "Mr. Amit Sharma",
                    parentEmail: "amit.sharma@example.com",
                    parentPhone: "+91 9876543210",
                    status: "Active",
                },
                {
                    id: 2,
                    name: "Priya Patel",
                    rollNumber: "CUTM2023002",
                    email: "priya.p@cutm.ac.in",
                    department: "Electronics",
                    year: "2nd Year",
                    parentName: "Mrs. Sunita Patel",
                    parentEmail: "sunita.patel@example.com",
                    parentPhone: "+91 9876543211",
                    status: "Active",
                },
                {
                    id: 3,
                    name: "Amit Kumar",
                    rollNumber: "CUTM2023003",
                    email: "amit.k@cutm.ac.in",
                    department: "Mechanical",
                    year: "4th Year",
                    parentName: "Mr. Rajesh Kumar",
                    parentEmail: "rajesh.kumar@example.com",
                    parentPhone: "+91 9876543212",
                    status: "Active",
                },
                {
                    id: 4,
                    name: "Neha Singh",
                    rollNumber: "CUTM2023004",
                    email: "neha.s@cutm.ac.in",
                    department: "Civil",
                    year: "1st Year",
                    parentName: "Mr. Vikram Singh",
                    parentEmail: "vikram.singh@example.com",
                    parentPhone: "+91 9876543213",
                    status: "Active",
                },
                {
                    id: 5,
                    name: "Sanjay Verma",
                    rollNumber: "CUTM2023005",
                    email: "sanjay.v@cutm.ac.in",
                    department: "Electrical",
                    year: "3rd Year",
                    parentName: "Mr. Ramesh Verma",
                    parentEmail: "ramesh.verma@example.com",
                    parentPhone: "+91 9876543214",
                    status: "Active",
                },
            ],
        },
        {
            id: 2,
            name: "Silicon College",
            students: [
                {
                    id: 6,
                    name: "Anjali Gupta",
                    rollNumber: "SC2023001",
                    email: "anjali.g@silicon.ac.in",
                    department: "Computer Science",
                    year: "2nd Year",
                    parentName: "Mr. Sanjay Gupta",
                    parentEmail: "sanjay.gupta@example.com",
                    parentPhone: "+91 9876543215",
                    status: "Active",
                },
                {
                    id: 7,
                    name: "Vikram Singh",
                    rollNumber: "SC2023002",
                    email: "vikram.s@silicon.ac.in",
                    department: "Electronics",
                    year: "3rd Year",
                    parentName: "Mr. Ajay Singh",
                    parentEmail: "ajay.singh@example.com",
                    parentPhone: "+91 9876543216",
                    status: "Active",
                },
                {
                    id: 8,
                    name: "Meera Desai",
                    rollNumber: "SC2023003",
                    email: "meera.d@silicon.ac.in",
                    department: "Mechanical",
                    year: "4th Year",
                    parentName: "Mr. Ramesh Desai",
                    parentEmail: "ramesh.desai@example.com",
                    parentPhone: "+91 9876543217",
                    status: "Active",
                },
                {
                    id: 9,
                    name: "Rahul Sharma",
                    rollNumber: "SC2023004",
                    email: "rahul.s@silicon.ac.in",
                    department: "Civil",
                    year: "1st Year",
                    parentName: "Mr. Sunil Sharma",
                    parentEmail: "sunil.sharma@example.com",
                    parentPhone: "+91 9876543218",
                    status: "Active",
                },
                {
                    id: 10,
                    name: "Sneha Reddy",
                    rollNumber: "SC2023005",
                    email: "sneha.r@silicon.ac.in",
                    department: "Electrical",
                    year: "2nd Year",
                    parentName: "Mr. Rajesh Reddy",
                    parentEmail: "rajesh.reddy@example.com",
                    parentPhone: "+91 9876543219",
                    status: "Active",
                },
            ],
        },
    ];
    return (
        <Box sx={{ display: "flex" }}>
            {/* Main Content */}
            <Box sx={{ p: 4,width:'100%'}}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                    }}
                >
                    <Typography variant="h4">Student Management</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            /* Handle add student */
                        }}
                    >
                        Add Student
                    </Button>
                </Box>

                {!selectedStudentCollege ? (
                    <Grid container spacing={3}>
                        {studentColleges.map((college) => (
                            <Grid item xs={12} md={6} key={college.id}>
                                <Card
                                    sx={{
                                        cursor: "pointer",
                                        "&:hover": {
                                            boxShadow: 6,
                                        },
                                    }}
                                    onClick={() => setSelectedStudentCollege(college)}
                                >
                                    <CardContent>
                                        <Typography variant="h5" component="div" gutterBottom>
                                            {college.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Students: {college.students.length}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                            <IconButton
                                onClick={() => setSelectedStudentCollege(null)}
                                sx={{ mr: 2 }}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography variant="h5">
                                {selectedStudentCollege.name} - Students
                            </Typography>
                        </Box>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Student Details</TableCell>
                                        <TableCell>Parent Details</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedStudentCollege.students.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell>
                                                <Typography variant="subtitle1">
                                                    {student.name}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Roll No: {student.rollNumber}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Email: {student.email}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Department: {student.department}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Year: {student.year}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2">
                                                    {student.parentName}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Email: {student.parentEmail}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Phone: {student.parentPhone}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={student.status}
                                                    color={
                                                        student.status === "Active" ? "success" : "error"
                                                    }
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => {
                                                        /* Handle edit */
                                                    }}
                                                >
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
                )}
            </Box>
        </Box>
    );
};

export default StudentManagement;
