import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getCurrentUser } from './utils/auth';
// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import AdminPanel from './pages/AdminPanel';
import EmployeePanel from './pages/EmployeePanel';
import ParentPanel from './pages/ParentPanel';
import StudentPanel from './pages/StudentPanel';
import Admins from './superAdminPanel/Admins';
import Employees from './superAdminPanel/Employees';
import Students from './superAdminPanel/Students';
import Layout from './superAdminPanel/Layout';
import Dashboard from './superAdminPanel/Dashboard'


// Keep the theme configuration

const theme = createTheme({

  palette: {

    primary: { main: '#4285F4' },

    secondary: { main: '#34A853' },

    error: { main: '#EA4335' },

    warning: { main: '#FBBC05' },

  },

  typography: {

    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

    h4: { fontWeight: 500 },

    subtitle2: { fontWeight: 500 },

  },

  components: {

    MuiCard: {

      styleOverrides: {

        root: { borderRadius: 8 },

      },

    },

    MuiPaper: {

      styleOverrides: {

        root: { borderRadius: 8 },

      },

    },

  },

});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/login" 
            element={
              getCurrentUser() ? 
                <Navigate to={`/${getCurrentUser().role.toLowerCase()}/dashboard`} /> : 
                <Login />
            } 
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Dashboard Routes */}
           <Route path="/superadmin" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin" element={<Admins />} />
            <Route path="employee" element={<Employees />} />
            <Route path="student" element={<Students />} />
          </Route>
          <Route 
            path="/admin/dashboard" 
            element={
              
                <AdminPanel />
            
            } 
          />
          <Route path="/student/dashboard"
          element={
            <StudentPanel />
          }
         />
         <Route path="/parent/dashboard"
         element={
          <ParentPanel />
         }
         />
         <Route 
         path='/employee/dashboard'
         element={<EmployeePanel />}
         />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;