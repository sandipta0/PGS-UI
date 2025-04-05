import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import { getAdminAuth, getEmployeeAuth, getParentAuth, getStudentAuth, getSuperAdminAuth } from './utils/auth';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import SuperAdmin from './pages/SuperAdmin';
import Admins from './pages/Admins';
import AdminPanel from './pages/AdminPanel';
import EmployeePanel from './pages/EmployeePanel';
import ParentPanel from './pages/ParentPanel';
import StudentPanel from './pages/StudentPanel';
import SuperAdminPanel from './pages/SuperAdminPanel';

// Components
import PrivateRoute from './components/PrivateRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4285F4', // Google Blue
    },
    secondary: {
      main: '#34A853', // Google Green
    },
    error: {
      main: '#EA4335', // Google Red
    },
    warning: {
      main: '#FBBC05', // Google Yellow
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          
          {/* SuperAdmin Routes */}
          <Route
            path="/superadmin/*"
            element={
              <ProtectedRoute authCheck={getSuperAdminAuth}>
                <SuperAdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin/admins"
            element={
              isAuthenticated && user?.role === 'SUPERADMIN' ? (
                <Admins />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute authCheck={getAdminAuth}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          
          {/* Employee Routes */}
          <Route
            path="/employee/*"
            element={
              <ProtectedRoute authCheck={getEmployeeAuth}>
                <EmployeePanel />
              </ProtectedRoute>
            }
          />
          
          {/* Parent Routes */}
          <Route
            path="/parent/*"
            element={
              <ProtectedRoute authCheck={getParentAuth}>
                <ParentPanel />
              </ProtectedRoute>
            }
          />
          
          {/* Student Routes */}
          <Route
            path="/student/*"
            element={
              <ProtectedRoute authCheck={getStudentAuth}>
                <StudentPanel />
              </ProtectedRoute>
            }
          />
          
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

// Protected Route component
const ProtectedRoute = ({ children, authCheck }) => {
  const auth = authCheck();
  console.log('ProtectedRoute auth check:', auth); // Debug log
  if (!auth) {
    console.log('No auth found, redirecting to login');
    return <Navigate to="/login" />;
  }
  console.log('Auth successful, rendering protected route');
  return children;
};

export default App; 