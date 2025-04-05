import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { registerStart, registerSuccess, registerFailure } from '../store/slices/authSlice';

const parentValidationSchema = yup.object({
  userType: yup
    .string()
    .oneOf(['parent'], 'Please select a valid user type')
    .required('User type is required'),
  firstName: yup
    .string()
    .required('First name is required'),
  lastName: yup
    .string()
    .required('Last name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  gender: yup
    .string()
    .oneOf(['male', 'female', 'other'], 'Please select a valid gender')
    .required('Gender is required'),
});

const studentValidationSchema = yup.object({
  userType: yup
    .string()
    .oneOf(['student'], 'Please select a valid user type')
    .required('User type is required'),
  firstName: yup
    .string()
    .required('First name is required'),
  lastName: yup
    .string()
    .required('Last name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  gender: yup
    .string()
    .oneOf(['male', 'female', 'other'], 'Please select a valid gender')
    .required('Gender is required'),
  registrationNumber: yup
    .string()
    .required('Registration number is required'),
  grade: yup
    .string()
    .required('Grade is required'),
  section: yup
    .string()
    .required('Section is required'),
});

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [userType, setUserType] = useState('parent');

  const formik = useFormik({
    initialValues: {
      userType: 'parent',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      gender: '',
      registrationNumber: '',
      grade: '',
      section: '',
    },
    validationSchema: userType === 'parent' ? parentValidationSchema : studentValidationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(registerStart());
        // TODO: Replace with actual API call
        const response = await fetch('http://localhost:8080/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Registration failed');
        }

        const data = await response.json();
        dispatch(registerSuccess(data));
        navigate('/dashboard');
      } catch (err) {
        dispatch(registerFailure(err.message));
      }
    },
  });

  const handleUserTypeChange = (event) => {
    const newUserType = event.target.value;
    setUserType(newUserType);
    formik.setFieldValue('userType', newUserType);
    // Reset form values when changing user type
    formik.resetForm({
      values: {
        ...formik.initialValues,
        userType: newUserType,
      },
    });
  };

  const renderCommonFields = () => (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoComplete="given-name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="phoneNumber"
          label="Phone Number"
          id="phoneNumber"
          autoComplete="tel"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth error={formik.touched.gender && Boolean(formik.errors.gender)}>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            label="Gender"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          {formik.touched.gender && formik.errors.gender && (
            <FormHelperText>{formik.errors.gender}</FormHelperText>
          )}
        </FormControl>
      </Grid>
    </>
  );

  const renderStudentFields = () => (
    <>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="registrationNumber"
          label="Registration Number"
          id="registrationNumber"
          value={formik.values.registrationNumber}
          onChange={formik.handleChange}
          error={formik.touched.registrationNumber && Boolean(formik.errors.registrationNumber)}
          helperText={formik.touched.registrationNumber && formik.errors.registrationNumber}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth error={formik.touched.grade && Boolean(formik.errors.grade)}>
          <InputLabel id="grade-label">Grade</InputLabel>
          <Select
            labelId="grade-label"
            id="grade"
            name="grade"
            value={formik.values.grade}
            onChange={formik.handleChange}
            label="Grade"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <MenuItem key={i + 1} value={`Grade ${i + 1}`}>
                Grade {i + 1}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.grade && formik.errors.grade && (
            <FormHelperText>{formik.errors.grade}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth error={formik.touched.section && Boolean(formik.errors.section)}>
          <InputLabel id="section-label">Section</InputLabel>
          <Select
            labelId="section-label"
            id="section"
            name="section"
            value={formik.values.section}
            onChange={formik.handleChange}
            label="Section"
          >
            {['A', 'B', 'C', 'D'].map((section) => (
              <MenuItem key={section} value={section}>
                Section {section}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.section && formik.errors.section && (
            <FormHelperText>{formik.errors.section}</FormHelperText>
          )}
        </FormControl>
      </Grid>
    </>
  );

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Sign Up
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ width: '100%' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth error={formik.touched.userType && Boolean(formik.errors.userType)}>
                  <InputLabel id="user-type-label">Registration Type</InputLabel>
                  <Select
                    labelId="user-type-label"
                    id="userType"
                    name="userType"
                    value={formik.values.userType}
                    onChange={handleUserTypeChange}
                    label="Registration Type"
                  >
                    <MenuItem value="parent">Parent Registration</MenuItem>
                    <MenuItem value="student">Student Registration</MenuItem>
                  </Select>
                  {formik.touched.userType && formik.errors.userType && (
                    <FormHelperText>{formik.errors.userType}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {renderCommonFields()}
              {userType === 'student' && renderStudentFields()}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  {loading ? 'Signing up...' : 'Sign Up'}
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center' }}>
                  <Link component={RouterLink} to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignUp; 