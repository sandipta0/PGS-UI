import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Avatar,
  Link,
  FormControlLabel,
  Checkbox,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  authenticateAdmin,
  authenticateEmployee,
  authenticateParent,
  authenticateStudent,
  authenticateSuperAdmin,
} from '../utils/auth';
import { School as SchoolIcon } from '@mui/icons-material';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'superadmin',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;
      const { email, password, role, rememberMe } = formData;
      const trimmedEmail = email.trim().toLowerCase();

      console.log('Login attempt:', { email: trimmedEmail, role, rememberMe });

      // Store remember me preference in localStorage
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('lastEmail', trimmedEmail);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('lastEmail');
      }

      switch (role) {
        case 'superadmin':
          response = authenticateSuperAdmin(trimmedEmail, password);
          if (response.success) {
            console.log('SuperAdmin login successful:', response.data);
            navigate('/superadmin/dashboard');
          } else {
            console.log('SuperAdmin login failed:', response.message);
            setError(response.message || 'Invalid credentials');
          }
          break;
        case 'student':
          response = authenticateStudent(trimmedEmail, password);
          if (response.success) {
            navigate('/student/dashboard');
          } else {
            setError(response.message || 'Invalid credentials');
          }
          break;
        case 'parent':
          response = authenticateParent(trimmedEmail, password);
          if (response.success) {
            navigate('/parent/dashboard');
          } else {
            setError(response.message || 'Invalid credentials');
          }
          break;
        case 'employee':
          response = authenticateEmployee(trimmedEmail, password);
          if (response.success) {
            navigate('/employee/dashboard');
          } else {
            setError(response.message || 'Invalid credentials');
          }
          break;
        case 'admin':
          response = authenticateAdmin(trimmedEmail, password);
          if (response.success) {
            navigate('/admin/dashboard');
          } else {
            setError(response.message || 'Invalid credentials');
          }
          break;
        default:
          setError('Invalid role selected');
          return;
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  // Check for remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('lastEmail');
    const isRemembered = localStorage.getItem('rememberMe') === 'true';
    if (rememberedEmail && isRemembered) {
      setFormData(prev => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true
      }));
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
          opacity: 0.1,
        }
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(50px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(50px)',
        }}
      />

      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: 'linear-gradient(90deg, #4285F4, #34A853)',
            }
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                margin: '0 auto 16px',
                background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                animation: 'scaleIn 0.5s ease-out',
              }}
            >
              <SchoolIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom sx={{ 
              fontWeight: 'bold', 
              color: '#1a237e',
              animation: 'fadeIn 1s ease-in'
            }}>
              School Portal
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{
              animation: 'fadeIn 1s ease-in 0.2s'
            }}>
              Sign in to access your dashboard
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2, animation: 'fadeIn 0.5s ease-in' }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 2, animation: 'fadeIn 1s ease-in 0.4s' }}>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Role"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#4285F4',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4285F4',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#4285F4',
                  },
                }}
              >
                <MenuItem value="superadmin">Super Admin</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="parent">Parent</MenuItem>
                <MenuItem value="student">Student</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#4285F4',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4285F4',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#4285F4',
                },
                animation: 'fadeIn 1s ease-in 0.6s'
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#4285F4',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4285F4',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#4285F4',
                },
                animation: 'fadeIn 1s ease-in 0.8s'
              }}
            />

            <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 2, mb: 2 }}>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      sx={{
                        color: '#4285F4',
                        '&.Mui-checked': {
                          color: '#4285F4',
                        },
                      }}
                    />
                  }
                  label="Remember me"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: '#4285F4',
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <Link
                  href="/forgot-password"
                  variant="body2"
                  sx={{
                    color: '#4285F4',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: '#3367d6',
                    },
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, textAlign: 'center', animation: 'fadeIn 1s ease-in 1s' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #3367d6 0%, #2d9246 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login; 