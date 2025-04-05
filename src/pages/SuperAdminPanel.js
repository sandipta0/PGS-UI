import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Grid,
  Paper,
  Card,
  CardContent,
  Container,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getSuperAdminAuth, logoutUser } from '../utils/auth';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const drawerWidth = 240;

const SuperAdminPanel = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedStudentCollege, setSelectedStudentCollege] = useState(null);

  const colleges = [
    {
      id: 1,
      name: 'CUTM',
      employees: [
        {
          id: 1,
          name: 'Dr. Rajesh Kumar',
          email: 'rajesh.k@cutm.ac.in',
          department: 'Computer Science',
          designation: 'Professor',
          status: 'Active'
        },
        {
          id: 2,
          name: 'Dr. Priya Sharma',
          email: 'priya.s@cutm.ac.in',
          department: 'Electronics',
          designation: 'Associate Professor',
          status: 'Active'
        },
        {
          id: 3,
          name: 'Dr. Amit Singh',
          email: 'amit.s@cutm.ac.in',
          department: 'Mechanical',
          designation: 'Professor',
          status: 'Active'
        },
        {
          id: 4,
          name: 'Dr. Neha Patel',
          email: 'neha.p@cutm.ac.in',
          department: 'Civil',
          designation: 'Assistant Professor',
          status: 'Active'
        },
        {
          id: 5,
          name: 'Dr. Sanjay Verma',
          email: 'sanjay.v@cutm.ac.in',
          department: 'Electrical',
          designation: 'Professor',
          status: 'Active'
        }
      ]
    },
    {
      id: 2,
      name: 'Silicon College',
      employees: [
        {
          id: 6,
          name: 'Dr. Anjali Gupta',
          email: 'anjali.g@silicon.ac.in',
          department: 'Computer Science',
          designation: 'Professor',
          status: 'Active'
        },
        {
          id: 7,
          name: 'Dr. Vikram Singh',
          email: 'vikram.s@silicon.ac.in',
          department: 'Electronics',
          designation: 'Associate Professor',
          status: 'Active'
        },
        {
          id: 8,
          name: 'Dr. Meera Desai',
          email: 'meera.d@silicon.ac.in',
          department: 'Mechanical',
          designation: 'Professor',
          status: 'Active'
        },
        {
          id: 9,
          name: 'Dr. Rahul Sharma',
          email: 'rahul.s@silicon.ac.in',
          department: 'Civil',
          designation: 'Assistant Professor',
          status: 'Active'
        },
        {
          id: 10,
          name: 'Dr. Sneha Reddy',
          email: 'sneha.r@silicon.ac.in',
          department: 'Electrical',
          designation: 'Professor',
          status: 'Active'
        }
      ]
    }
  ];

  const studentColleges = [
    {
      id: 1,
      name: 'CUTM',
      students: [
        {
          id: 1,
          name: 'Rahul Sharma',
          rollNumber: 'CUTM2023001',
          email: 'rahul.s@cutm.ac.in',
          department: 'Computer Science',
          year: '3rd Year',
          parentName: 'Mr. Amit Sharma',
          parentEmail: 'amit.sharma@example.com',
          parentPhone: '+91 9876543210',
          status: 'Active'
        },
        {
          id: 2,
          name: 'Priya Patel',
          rollNumber: 'CUTM2023002',
          email: 'priya.p@cutm.ac.in',
          department: 'Electronics',
          year: '2nd Year',
          parentName: 'Mrs. Sunita Patel',
          parentEmail: 'sunita.patel@example.com',
          parentPhone: '+91 9876543211',
          status: 'Active'
        },
        {
          id: 3,
          name: 'Amit Kumar',
          rollNumber: 'CUTM2023003',
          email: 'amit.k@cutm.ac.in',
          department: 'Mechanical',
          year: '4th Year',
          parentName: 'Mr. Rajesh Kumar',
          parentEmail: 'rajesh.kumar@example.com',
          parentPhone: '+91 9876543212',
          status: 'Active'
        },
        {
          id: 4,
          name: 'Neha Singh',
          rollNumber: 'CUTM2023004',
          email: 'neha.s@cutm.ac.in',
          department: 'Civil',
          year: '1st Year',
          parentName: 'Mr. Vikram Singh',
          parentEmail: 'vikram.singh@example.com',
          parentPhone: '+91 9876543213',
          status: 'Active'
        },
        {
          id: 5,
          name: 'Sanjay Verma',
          rollNumber: 'CUTM2023005',
          email: 'sanjay.v@cutm.ac.in',
          department: 'Electrical',
          year: '3rd Year',
          parentName: 'Mr. Ramesh Verma',
          parentEmail: 'ramesh.verma@example.com',
          parentPhone: '+91 9876543214',
          status: 'Active'
        }
      ]
    },
    {
      id: 2,
      name: 'Silicon College',
      students: [
        {
          id: 6,
          name: 'Anjali Gupta',
          rollNumber: 'SC2023001',
          email: 'anjali.g@silicon.ac.in',
          department: 'Computer Science',
          year: '2nd Year',
          parentName: 'Mr. Sanjay Gupta',
          parentEmail: 'sanjay.gupta@example.com',
          parentPhone: '+91 9876543215',
          status: 'Active'
        },
        {
          id: 7,
          name: 'Vikram Singh',
          rollNumber: 'SC2023002',
          email: 'vikram.s@silicon.ac.in',
          department: 'Electronics',
          year: '3rd Year',
          parentName: 'Mr. Ajay Singh',
          parentEmail: 'ajay.singh@example.com',
          parentPhone: '+91 9876543216',
          status: 'Active'
        },
        {
          id: 8,
          name: 'Meera Desai',
          rollNumber: 'SC2023003',
          email: 'meera.d@silicon.ac.in',
          department: 'Mechanical',
          year: '4th Year',
          parentName: 'Mr. Ramesh Desai',
          parentEmail: 'ramesh.desai@example.com',
          parentPhone: '+91 9876543217',
          status: 'Active'
        },
        {
          id: 9,
          name: 'Rahul Sharma',
          rollNumber: 'SC2023004',
          email: 'rahul.s@silicon.ac.in',
          department: 'Civil',
          year: '1st Year',
          parentName: 'Mr. Sunil Sharma',
          parentEmail: 'sunil.sharma@example.com',
          parentPhone: '+91 9876543218',
          status: 'Active'
        },
        {
          id: 10,
          name: 'Sneha Reddy',
          rollNumber: 'SC2023005',
          email: 'sneha.r@silicon.ac.in',
          department: 'Electrical',
          year: '2nd Year',
          parentName: 'Mr. Rajesh Reddy',
          parentEmail: 'rajesh.reddy@example.com',
          parentPhone: '+91 9876543219',
          status: 'Active'
        }
      ]
    }
  ];

  useEffect(() => {
    const auth = getSuperAdminAuth();
    if (!auth) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, page: 'dashboard' },
    { text: 'Admins', icon: <PeopleIcon />, page: 'admins' },
    { text: 'Employees', icon: <WorkIcon />, page: 'employees' },
    { text: 'Students', icon: <SchoolIcon />, page: 'students' },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Super Admin Panel
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => setCurrentPage(item.page)}
            selected={currentPage === item.page}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  const renderDashboard = () => {
    // Sample data for charts
    const userGrowthData = [
      { month: 'Jan', users: 400 },
      { month: 'Feb', users: 450 },
      { month: 'Mar', users: 500 },
      { month: 'Apr', users: 520 },
      { month: 'May', users: 530 },
      { month: 'Jun', users: 550 },
    ];

    const departmentDistribution = [
      { name: 'Academic', value: 30 },
      { name: 'Administration', value: 25 },
      { name: 'Finance', value: 20 },
      { name: 'Student Affairs', value: 15 },
      { name: 'IT', value: 10 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    const complaintStatusData = [
      { status: 'Resolved', count: 45 },
      { status: 'Pending', count: 20 },
      { status: 'In Progress', count: 15 },
      { status: 'New', count: 10 },
    ];

    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Super Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          {/* Stats Cards */}
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Admins</Typography>
                <Typography variant="h4">5</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Employees</Typography>
                <Typography variant="h4">25</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Students</Typography>
                <Typography variant="h4">500</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Active Users</Typography>
                <Typography variant="h4">530</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* User Growth Chart */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                User Growth Trend
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Department Distribution */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                Department Distribution
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {departmentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Complaint Status */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                Complaint Status Distribution
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={complaintStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderAdmins = () => (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Admin Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {/* Handle add admin */}}
        >
          Add Admin
        </Button>
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
                name: 'John Doe',
                email: 'john.doe@example.com',
                department: 'Academic',
                status: 'Active'
              },
              {
                id: 2,
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                department: 'Administration',
                status: 'Active'
              },
              {
                id: 3,
                name: 'Robert Johnson',
                email: 'robert.j@example.com',
                department: 'Finance',
                status: 'Inactive'
              },
              {
                id: 4,
                name: 'Emily Davis',
                email: 'emily.d@example.com',
                department: 'Student Affairs',
                status: 'Active'
              },
              {
                id: 5,
                name: 'Michael Brown',
                email: 'michael.b@example.com',
                department: 'IT',
                status: 'Active'
              }
            ].map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.department}</TableCell>
                <TableCell>
                  <Chip
                    label={admin.status}
                    color={admin.status === 'Active' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => {/* Handle edit */}}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {/* Handle delete */}}
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
  );

  const renderEmployees = () => (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Employee Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {/* Handle add employee */}}
        >
          Add Employee
        </Button>
      </Box>

      {!selectedCollege ? (
        <Grid container spacing={3}>
          {colleges.map((college) => (
            <Grid item xs={12} md={6} key={college.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
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
                        color={employee.status === 'Active' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {/* Handle edit */}}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {/* Handle delete */}}
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
  );

  const renderStudents = () => (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Student Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {/* Handle add student */}}
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
                  cursor: 'pointer',
                  '&:hover': {
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton onClick={() => setSelectedStudentCollege(null)} sx={{ mr: 2 }}>
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
                      <Typography variant="subtitle1">{student.name}</Typography>
                      <Typography variant="body2">Roll No: {student.rollNumber}</Typography>
                      <Typography variant="body2">Email: {student.email}</Typography>
                      <Typography variant="body2">Department: {student.department}</Typography>
                      <Typography variant="body2">Year: {student.year}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{student.parentName}</Typography>
                      <Typography variant="body2">Email: {student.parentEmail}</Typography>
                      <Typography variant="body2">Phone: {student.parentPhone}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={student.status}
                        color={student.status === 'Active' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {/* Handle edit */}}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {/* Handle delete */}}
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
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return renderDashboard();
      case 'admins':
        return renderAdmins();
      case 'employees':
        return renderEmployees();
      case 'students':
        return renderStudents();
      default:
        return renderDashboard();
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: '#1976d2',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Super Admin Portal
          </Typography>
          <IconButton
            size="large"
            aria-label="show notifications"
            color="inherit"
            onClick={handleNotificationMenuOpen}
          >
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32 }}>SA</Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: '#f5f5f5',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        {renderContent()}
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
      >
        <MenuItem>New admin registration request</MenuItem>
        <MenuItem>System maintenance scheduled</MenuItem>
        <MenuItem>New user feedback received</MenuItem>
        <MenuItem>Security alert: Multiple login attempts</MenuItem>
      </Menu>
    </Box>
  );
};

export default SuperAdminPanel; 