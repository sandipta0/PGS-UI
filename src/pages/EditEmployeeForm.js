import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Typography,
  Autocomplete
} from '@mui/material';

const departments = [
  'Computer Science',
  'Electronics',
  'Electrical',
  'Mechanical',
  'Civil',
  'Chemical',
  'Biotechnology'
];

const designations = [
  'Professor',
  'Associate Professor',
  'Assistant Professor',
  'Lecturer',
  'Research Scholar',
  'Lab Assistant'
];

export const EditEmployeeForm = ({ 
  open, 
  handleClose, 
  employee, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    designation: '',
    status: 'Active',
    phone: '',
    dateOfJoining: '',
    qualifications: '',
    specialization: ''
  });

  // Populate form when employee changes
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        department: employee.department || '',
        designation: employee.designation || '',
        status: employee.status || 'Active',
        phone: employee.phone || '',
        dateOfJoining: employee.dateOfJoining || '',
        qualifications: employee.qualifications || '',
        specialization: employee.specialization || ''
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Validate form
    if (!validateForm()) {
      return;
    }

    // Merge existing employee with updated data
    const updatedEmployee = {
      ...employee,
      ...formData
    };
    
    // Call submit handler
    onSubmit(updatedEmployee);
    handleClose();
  };

  const validateForm = () => {
    // Basic validation
    const requiredFields = ['name', 'email', 'department', 'designation'];
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        alert(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return false;
    }

    return true;
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Edit Employee Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* Personal Information */}
          <Grid item xs={12} md={6}>
            <TextField
              name="name"
              label="Full Name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="email"
              label="Email Address"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
              type="email"
              variant="outlined"
            />
          </Grid>

          {/* Professional Details */}
          <Grid item xs={12} md={6}>
            <Autocomplete
              options={departments}
              value={formData.department}
              onChange={(e, newValue) => 
                setFormData(prev => ({ ...prev, department: newValue }))
              }
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  name="department"
                  label="Department" 
                  fullWidth 
                  margin="normal" 
                  required 
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              options={designations}
              value={formData.designation}
              onChange={(e, newValue) => 
                setFormData(prev => ({ ...prev, designation: newValue }))
              }
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  name="designation"
                  label="Designation" 
                  fullWidth 
                  margin="normal" 
                  required 
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <TextField
              name="phone"
              label="Phone Number"
              fullWidth
              margin="normal"
              value={formData.phone}
              onChange={handleChange}
              variant="outlined"
              type="tel"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="dateOfJoining"
              label="Date of Joining"
              fullWidth
              margin="normal"
              type="date"
              value={formData.dateOfJoining}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>

          {/* Additional Details */}
          <Grid item xs={12} md={6}>
            <TextField
              name="qualifications"
              label="Qualifications"
              fullWidth
              margin="normal"
              value={formData.qualifications}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="specialization"
              label="Specialization"
              fullWidth
              margin="normal"
              value={formData.specialization}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          {/* Status */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="On Leave">On Leave</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleClose} 
          color="secondary"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          variant="contained"
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Optional: Create a separate Add Employee Form
export const AddEmployeeForm = ({ 
  open, 
  handleClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    designation: '',
    status: 'Active',
    phone: '',
    dateOfJoining: '',
    qualifications: '',
    specialization: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Similar validation as EditEmployeeForm
    onSubmit(formData);
    handleClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Add New Employee</DialogTitle>
      <DialogContent>
        {/* Similar to EditEmployeeForm, but for adding new employee */}
        {/* You can reuse the grid and input components from EditEmployeeForm */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add Employee</Button>
      </DialogActions>
    </Dialog>
  );
};