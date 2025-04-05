import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Grid,
  Paper,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AdminPanelSettings as AdminIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  ArrowBack,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const drawerWidth = 240;

// Sample data for charts
const studentDistributionData = [
  { name: 'CUTM', value: 300, color: '#4285F4' },
  { name: 'Silicon College', value: 200, color: '#34A853' },
];

const employeeDistributionData = [
  { department: 'IT', CUTM: 15, 'Silicon College': 12 },
  { department: 'Academics', CUTM: 20, 'Silicon College': 18 },
  { department: 'HR', CUTM: 8, 'Silicon College': 10 },
  { department: 'Finance', CUTM: 4, 'Silicon College': 5 },
  { department: 'Administration', CUTM: 3, 'Silicon College': 5 },
];

// Sample admin data
const admins = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@cutm.ac.in',
    phone: '+91 9876543210',
    department: 'IT Department',
    role: 'System Admin',
    status: 'Active',
    avatar: 'JS',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@silicon.edu.in',
    phone: '+91 9876543211',
    department: 'Academics',
    role: 'Department Admin',
    status: 'Active',
    avatar: 'SJ',
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.b@cutm.ac.in',
    phone: '+91 9876543212',
    department: 'HR',
    role: 'Department Admin',
    status: 'Active',
    avatar: 'MB',
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.d@silicon.edu.in',
    phone: '+91 9876543213',
    department: 'Finance',
    role: 'Department Admin',
    status: 'Inactive',
    avatar: 'ED',
  },
  {
    id: 5,
    name: 'Robert Wilson',
    email: 'robert.w@cutm.ac.in',
    phone: '+91 9876543214',
    department: 'Administration',
    role: 'System Admin',
    status: 'Active',
    avatar: 'RW',
  },
];

// Sample colleges data
const colleges = [
  {
    id: 1,
    name: 'CUTM',
    totalEmployees: 50,
    location: 'Bhubaneswar',
    image: '/images/cutm-logo.png',
  },
  {
    id: 2,
    name: 'Silicon College',
    totalEmployees: 45,
    location: 'Bhubaneswar',
    image: '/images/silicon-logo.png',
  },
];

// Sample employees data for CUTM
const cutmEmployees = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@cutm.ac.in',
    phone: '+91 9876543201',
    department: 'Computer Science',
    designation: 'Professor',
    joiningDate: '2020-01-15',
    status: 'Active',
    avatar: 'RK',
  },
  {
    id: 2,
    name: 'Prof. Priya Singh',
    email: 'priya.singh@cutm.ac.in',
    phone: '+91 9876543202',
    department: 'Electronics',
    designation: 'Associate Professor',
    joiningDate: '2020-03-20',
    status: 'Active',
    avatar: 'PS',
  },
  {
    id: 3,
    name: 'Dr. Amit Patel',
    email: 'amit.patel@cutm.ac.in',
    phone: '+91 9876543203',
    department: 'Mechanical',
    designation: 'Professor',
    joiningDate: '2019-08-10',
    status: 'Active',
    avatar: 'AP',
  },
  {
    id: 4,
    name: 'Mrs. Sneha Reddy',
    email: 'sneha.reddy@cutm.ac.in',
    phone: '+91 9876543204',
    department: 'Civil',
    designation: 'Assistant Professor',
    joiningDate: '2021-02-15',
    status: 'Active',
    avatar: 'SR',
  },
  {
    id: 5,
    name: 'Dr. Manoj Verma',
    email: 'manoj.verma@cutm.ac.in',
    phone: '+91 9876543205',
    department: 'Mathematics',
    designation: 'Professor',
    joiningDate: '2018-07-01',
    status: 'Active',
    avatar: 'MV',
  },
  {
    id: 6,
    name: 'Prof. Anita Sharma',
    email: 'anita.sharma@cutm.ac.in',
    phone: '+91 9876543206',
    department: 'Physics',
    designation: 'Associate Professor',
    joiningDate: '2019-11-20',
    status: 'Active',
    avatar: 'AS',
  },
  {
    id: 7,
    name: 'Dr. Suresh Kumar',
    email: 'suresh.kumar@cutm.ac.in',
    phone: '+91 9876543207',
    department: 'Chemistry',
    designation: 'Professor',
    joiningDate: '2020-06-15',
    status: 'Inactive',
    avatar: 'SK',
  },
  {
    id: 8,
    name: 'Mrs. Deepa Mishra',
    email: 'deepa.mishra@cutm.ac.in',
    phone: '+91 9876543208',
    department: 'English',
    designation: 'Assistant Professor',
    joiningDate: '2021-01-10',
    status: 'Active',
    avatar: 'DM',
  },
  {
    id: 9,
    name: 'Prof. Rahul Gupta',
    email: 'rahul.gupta@cutm.ac.in',
    phone: '+91 9876543209',
    department: 'Computer Science',
    designation: 'Associate Professor',
    joiningDate: '2019-04-01',
    status: 'Active',
    avatar: 'RG',
  },
  {
    id: 10,
    name: 'Dr. Meera Patel',
    email: 'meera.patel@cutm.ac.in',
    phone: '+91 9876543210',
    department: 'Electronics',
    designation: 'Professor',
    joiningDate: '2018-09-15',
    status: 'Active',
    avatar: 'MP',
  },
];

// Sample students data for CUTM
const cutmStudents = [
  {
    id: 1,
    studentName: 'Rahul Sharma',
    regNumber: 'CUTM2023001',
    course: 'B.Tech Computer Science',
    semester: '4th',
    parentName: 'Mr. Rajesh Sharma',
    parentEmail: 'rajesh.sharma@gmail.com',
    parentPhone: '+91 9876543221',
    parentOccupation: 'Business Owner',
    status: 'Active',
    avatar: 'RS'
  },
  {
    id: 2,
    studentName: 'Priya Patel',
    regNumber: 'CUTM2023002',
    course: 'B.Tech Electronics',
    semester: '3rd',
    parentName: 'Mr. Amit Patel',
    parentEmail: 'amit.patel@gmail.com',
    parentPhone: '+91 9876543222',
    parentOccupation: 'Government Employee',
    status: 'Active',
    avatar: 'PP'
  },
  {
    id: 3,
    studentName: 'Aditya Kumar',
    regNumber: 'CUTM2023003',
    course: 'B.Tech Mechanical',
    semester: '5th',
    parentName: 'Mrs. Sunita Kumar',
    parentEmail: 'sunita.kumar@gmail.com',
    parentPhone: '+91 9876543223',
    parentOccupation: 'Teacher',
    status: 'Active',
    avatar: 'AK'
  },
  {
    id: 4,
    studentName: 'Neha Singh',
    regNumber: 'CUTM2023004',
    course: 'B.Tech Civil',
    semester: '6th',
    parentName: 'Dr. Rakesh Singh',
    parentEmail: 'rakesh.singh@gmail.com',
    parentPhone: '+91 9876543224',
    parentOccupation: 'Doctor',
    status: 'Active',
    avatar: 'NS'
  },
  {
    id: 5,
    studentName: 'Arjun Reddy',
    regNumber: 'CUTM2023005',
    course: 'B.Tech Computer Science',
    semester: '4th',
    parentName: 'Mr. Venkat Reddy',
    parentEmail: 'venkat.reddy@gmail.com',
    parentPhone: '+91 9876543225',
    parentOccupation: 'Business Owner',
    status: 'Inactive',
    avatar: 'AR'
  },
  {
    id: 6,
    studentName: 'Ananya Gupta',
    regNumber: 'CUTM2023006',
    course: 'B.Tech Electronics',
    semester: '5th',
    parentName: 'Mrs. Meera Gupta',
    parentEmail: 'meera.gupta@gmail.com',
    parentPhone: '+91 9876543226',
    parentOccupation: 'Professor',
    status: 'Active',
    avatar: 'AG'
  },
  {
    id: 7,
    studentName: 'Ravi Verma',
    regNumber: 'CUTM2023007',
    course: 'B.Tech Mechanical',
    semester: '3rd',
    parentName: 'Mr. Suresh Verma',
    parentEmail: 'suresh.verma@gmail.com',
    parentPhone: '+91 9876543227',
    parentOccupation: 'Engineer',
    status: 'Active',
    avatar: 'RV'
  },
  {
    id: 8,
    studentName: 'Kavya Mishra',
    regNumber: 'CUTM2023008',
    course: 'B.Tech Civil',
    semester: '4th',
    parentName: 'Dr. Pradeep Mishra',
    parentEmail: 'pradeep.mishra@gmail.com',
    parentPhone: '+91 9876543228',
    parentOccupation: 'Professor',
    status: 'Active',
    avatar: 'KM'
  },
  {
    id: 9,
    studentName: 'Rohan Das',
    regNumber: 'CUTM2023009',
    course: 'B.Tech Computer Science',
    semester: '6th',
    parentName: 'Mr. Abhijit Das',
    parentEmail: 'abhijit.das@gmail.com',
    parentPhone: '+91 9876543229',
    parentOccupation: 'Business Owner',
    status: 'Active',
    avatar: 'RD'
  },
  {
    id: 10,
    studentName: 'Shreya Joshi',
    regNumber: 'CUTM2023010',
    course: 'B.Tech Electronics',
    semester: '5th',
    parentName: 'Mrs. Anjali Joshi',
    parentEmail: 'anjali.joshi@gmail.com',
    parentPhone: '+91 9876543230',
    parentOccupation: 'Lawyer',
    status: 'Active',
    avatar: 'SJ'
  }
];

const SuperAdmin = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedCollegeForStudents, setSelectedCollegeForStudents] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleEdit = (id) => {
    console.log('Edit admin:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete admin:', id);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, page: 'dashboard' },
    { text: 'Admins', icon: <AdminIcon />, page: 'admins' },
    { text: 'Employees', icon: <PeopleIcon />, page: 'employees' },
    { text: 'Students', icon: <SchoolIcon />, page: 'students' },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          SuperAdmin Panel
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

  const renderDashboard = () => (
    <>
      <Typography variant="h5" gutterBottom>
        Dashboard Overview
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff', boxShadow: 2 }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                TOTAL ADMINS
              </Typography>
              <Typography variant="h4">3</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff', boxShadow: 2 }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                TOTAL EMPLOYEES
              </Typography>
              <Typography variant="h4">50</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff', boxShadow: 2 }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                TOTAL STUDENTS
              </Typography>
              <Typography variant="h4">500</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff', boxShadow: 2 }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                TOTAL COLLEGES
              </Typography>
              <Typography variant="h4">2</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Students Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Students Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={studentDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {studentDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Employees Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Employees Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={employeeDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="CUTM" fill="#4285F4" />
                <Bar dataKey="Silicon College" fill="#34A853" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </>
  );

  const renderAdmins = () => (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Admin Management
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Admin</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2, bgcolor: '#4285F4' }}>{admin.avatar}</Avatar>
                    <Typography variant="subtitle2">{admin.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <EmailIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{admin.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PhoneIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{admin.phone}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{admin.department}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{admin.role}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={admin.status}
                    size="small"
                    sx={{
                      backgroundColor: admin.status === 'Active' ? '#e8f5e9' : '#ffebee',
                      color: admin.status === 'Active' ? '#2e7d32' : '#c62828',
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit Admin">
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(admin.id)}
                      sx={{ color: '#4285F4' }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Admin">
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(admin.id)}
                      sx={{ color: '#EA4335' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  const renderColleges = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 0 }}>
          Colleges
        </Typography>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Total Colleges: {colleges.length}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {colleges.map((college) => (
          <Grid item xs={12} sm={6} key={college.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s ease-in-out',
                },
              }}
              onClick={() => setSelectedCollege(college)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{ width: 56, height: 56, mr: 2, bgcolor: '#4285F4' }}
                    alt={college.name}
                  >
                    {college.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{college.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {college.location}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Employees
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {college.totalEmployees}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );

  const renderEmployeeList = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            onClick={() => setSelectedCollege(null)}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" sx={{ mb: 0 }}>
            {selectedCollege.name} Employees
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Total Employees: {cutmEmployees.length}
          </Typography>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Employee</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Joining Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cutmEmployees.map((employee) => (
              <TableRow key={employee.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2, bgcolor: '#4285F4' }}>{employee.avatar}</Avatar>
                    <Typography variant="subtitle2">{employee.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <EmailIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{employee.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PhoneIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{employee.phone}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{employee.department}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{employee.designation}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(employee.joiningDate).toLocaleDateString('en-GB')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={employee.status}
                    size="small"
                    sx={{
                      backgroundColor: employee.status === 'Active' ? '#e8f5e9' : '#ffebee',
                      color: employee.status === 'Active' ? '#2e7d32' : '#c62828',
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  const renderCollegesForStudents = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 0 }}>
          Colleges
        </Typography>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Total Colleges: {colleges.length}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {colleges.map((college) => (
          <Grid item xs={12} sm={6} key={college.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s ease-in-out',
                },
              }}
              onClick={() => setSelectedCollegeForStudents(college)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{ width: 56, height: 56, mr: 2, bgcolor: '#4285F4' }}
                    alt={college.name}
                  >
                    {college.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{college.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {college.location}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Students
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {college.name === 'CUTM' ? cutmStudents.length : '10'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );

  const renderStudentList = () => (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            onClick={() => setSelectedCollegeForStudents(null)}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" sx={{ mb: 0 }}>
            {selectedCollegeForStudents.name} Students
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Total Students: {cutmStudents.length}
          </Typography>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Student Details</TableCell>
              <TableCell>Academic Info</TableCell>
              <TableCell>Parent Details</TableCell>
              <TableCell>Parent Contact</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cutmStudents.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2, bgcolor: '#4285F4' }}>{student.avatar}</Avatar>
                    <Box>
                      <Typography variant="subtitle2">{student.studentName}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {student.regNumber}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{student.course}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Semester: {student.semester}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{student.parentName}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {student.parentOccupation}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <EmailIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{student.parentEmail}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PhoneIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{student.parentPhone}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={student.status}
                    size="small"
                    sx={{
                      backgroundColor: student.status === 'Active' ? '#e8f5e9' : '#ffebee',
                      color: student.status === 'Active' ? '#2e7d32' : '#c62828',
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'admins':
        return renderAdmins();
      case 'employees':
        return selectedCollege ? renderEmployeeList() : renderColleges();
      case 'students':
        return selectedCollegeForStudents ? renderStudentList() : renderCollegesForStudents();
      case 'dashboard':
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
          bgcolor: '#4285F4',
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
            Parent Grievance System
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: '#f5f5f5',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Box sx={{ p: 3 }}>
          {renderContent()}
        </Box>
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
        <MenuItem>New grievance received</MenuItem>
        <MenuItem>System update available</MenuItem>
        <MenuItem>New admin registration</MenuItem>
        <MenuItem>Student registration pending</MenuItem>
      </Menu>
    </Box>
  );
};

export default SuperAdmin; 