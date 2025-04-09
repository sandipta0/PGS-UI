import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  Grid,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const SignUp = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initial state matching StudentRegistrationRequest DTO
  const [studentData, setStudentData] = useState({
    studentFirstName: "",
    studentLastName: "",
    studentEmail: "",
    registrationNumber: "",
    department: "",
    studentPassword: "",
    address: "",
  });

  const [parentData, setParentData] = useState({
    parentFirstName: "",
    parentLastName: "",
    parentEmail: "",
    parentContactNumber: "",
    relationship: "",
    parentPassword: "",
  });

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setParentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNext = () => {
    // Add validation before moving to next step
    if (validateStudentStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateStudentStep = () => {
    const requiredFields = [
      "studentFirstName",
      "studentLastName",
      "studentEmail",
      "registrationNumber",
      "studentPassword",
      "address",
      "studentGender",
    ];

    for (let field of requiredFields) {
      if (!studentData[field]) {
        setError(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return false;
      }
    }
    setError("");
    return true;
  };

  const validateParentStep = () => {
    const requiredFields = [
      "parentFirstName",
      "parentLastName",
      "parentEmail",
      "parentContactNumber",
      "relationship",
      "parentPassword",
    ];

    for (let field of requiredFields) {
      if (!parentData[field]) {
        setError(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate parent step before submission
    if (!validateParentStep()) return;

    setLoading(true);
    setError("");

    try {
      // Combine student and parent data
      const combinedData = {
        ...studentData,
        ...parentData,
      };
      console.log(combinedData);

      const response = await fetch("http://localhost:8088/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(combinedData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStudentStep = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="First Name"
          name="studentFirstName"
          value={studentData.studentFirstName}
          onChange={handleStudentChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Last Name"
          name="studentLastName"
          value={studentData.studentLastName}
          onChange={handleStudentChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Email"
          name="studentEmail"
          type="email"
          value={studentData.studentEmail}
          onChange={handleStudentChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Registration Number"
          name="registrationNumber"
          value={studentData.registrationNumber}
          onChange={handleStudentChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Department"
          name="department"
          value={studentData.department}
          onChange={handleStudentChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>Gender</InputLabel>

          <Select
            name="studentGender"
            value={studentData.studentGender}
            onChange={handleStudentChange}
            label="Gender"
          >
            <MenuItem value="male">Male</MenuItem>

            <MenuItem value="female">Female</MenuItem>

            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Password"
          name="studentPassword"
          type="password"
          value={studentData.studentPassword}
          onChange={handleStudentChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Address"
          name="address"
          value={studentData.address}
          onChange={handleStudentChange}
        />
      </Grid>
    </Grid>
  );

  const renderParentStep = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Parent First Name"
          name="parentFirstName"
          value={parentData.parentFirstName}
          onChange={handleParentChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Parent Last Name"
          name="parentLastName"
          value={parentData.parentLastName}
          onChange={handleParentChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Parent Email"
          name="parentEmail"
          type="email"
          value={parentData.parentEmail}
          onChange={handleParentChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Contact Number"
          name="parentContactNumber"
          value={parentData.parentContactNumber}
          onChange={handleParentChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>Relationship</InputLabel>
          <Select
            name="relationship"
            value={parentData.relationship}
            onChange={handleParentChange}
            label="Relationship"
          >
            <MenuItem value="father">Father</MenuItem>
            <MenuItem value="mother">Mother</MenuItem>
            <MenuItem value="guardian">Guardian</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Parent Password"
          name="parentPassword"
          type="password"
          value={parentData.parentPassword}
          onChange={handleParentChange}
        />
      </Grid>
    </Grid>
  );

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 8, marginBottom: 8 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography
            component="h1"
            variant="h5"
            sx={{ mb: 3, textAlign: "center" }}
          >
            Student and Parent Registration
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
            <Step>
              <StepLabel>Student Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Parent Details</StepLabel>
            </Step>
          </Stepper>

          <form onSubmit={handleSubmit}>
            {activeStep === 0 && renderStudentStep()}
            {activeStep === 1 && renderParentStep()}

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              {activeStep === 1 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}

              {activeStep === 0 && (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              )}

              {activeStep === 1 && (
                <Button type="submit" variant="contained" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignUp;
