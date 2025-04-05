import React, { useState } from 'react';
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
  TextField,
  FormControl,
  Select,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  InputLabel,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as EmployeesIcon,
  School as StudentsIcon,
  Business as DepartmentsIcon,
  Assignment as RolesIcon,
  Mail as ComplainIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
  PersonAdd as PersonAddIcon,
  CheckCircle as CheckCircleIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

// Sample data for charts
const departmentData = [
  { name: 'Computer Science', students: 150, employees: 25 },
  { name: 'Electronics', students: 120, employees: 20 },
  { name: 'Mechanical', students: 100, employees: 18 },
  { name: 'Civil', students: 90, employees: 15 },
  { name: 'Electrical', students: 80, employees: 12 },
];

// Add sample complaints data
const complaintsData = [
  {
    id: 1,
    complaintNo: 'CMP2023001',
    studentName: 'Rahul Sharma',
    mobileNo: '+91 9876543210',
    department: 'Computer Science',
    college: 'CUTM',
    complaintType: 'Academic',
    description: 'Issue with course material access',
    status: 'Pending',
    assignedTo: 'Dr. Rajesh Kumar',
    date: '2023-01-15'
  },
  {
    id: 2,
    complaintNo: 'CMP2023002',
    studentName: 'Priya Patel',
    mobileNo: '+91 9876543211',
    department: 'Electronics',
    college: 'CUTM',
    complaintType: 'Hostel',
    description: 'Room maintenance issue',
    status: 'In Progress',
    assignedTo: 'Mrs. Meena Gupta',
    date: '2023-01-16'
  },
  {
    id: 3,
    complaintNo: 'CMP2023003',
    studentName: 'Amit Kumar',
    mobileNo: '+91 9876543212',
    department: 'Mechanical',
    college: 'CUTM',
    complaintType: 'Transport',
    description: 'Bus route timing issue',
    status: 'Resolved',
    assignedTo: 'Mr. Ramesh Sharma',
    date: '2023-01-17'
  },
  {
    id: 4,
    complaintNo: 'CMP2023004',
    studentName: 'Neha Gupta',
    mobileNo: '+91 9876543213',
    department: 'Civil',
    college: 'CUTM',
    complaintType: 'Security',
    description: 'Campus security concern',
    status: 'Pending',
    assignedTo: 'Mr. Vikram Singh',
    date: '2023-01-18'
  },
  {
    id: 5,
    complaintNo: 'CMP2023005',
    studentName: 'Karan Malhotra',
    mobileNo: '+91 9876543214',
    department: 'Computer Science',
    college: 'Silicon',
    complaintType: 'Academic',
    description: 'Exam schedule conflict',
    status: 'In Progress',
    assignedTo: 'Prof. Priya Singh',
    date: '2023-01-19'
  },
  {
    id: 6,
    complaintNo: 'CMP2023006',
    studentName: 'Divya Sharma',
    mobileNo: '+91 9876543215',
    department: 'Electronics',
    college: 'Silicon',
    complaintType: 'Hostel',
    description: 'Mess food quality issue',
    status: 'Pending',
    assignedTo: 'Mrs. Anita Patel',
    date: '2023-01-20'
  },
  {
    id: 7,
    complaintNo: 'CMP2023007',
    studentName: 'Vikram Singh',
    mobileNo: '+91 9876543216',
    department: 'Mechanical',
    college: 'Silicon',
    complaintType: 'Transport',
    description: 'Bus overcrowding issue',
    status: 'Resolved',
    assignedTo: 'Mr. Sunil Kumar',
    date: '2023-01-21'
  },
  {
    id: 8,
    complaintNo: 'CMP2023008',
    studentName: 'Pooja Patel',
    mobileNo: '+91 9876543217',
    department: 'Civil',
    college: 'Silicon',
    complaintType: 'Security',
    description: 'Campus access issue',
    status: 'In Progress',
    assignedTo: 'Mr. Anil Kumar',
    date: '2023-01-22'
  },
  {
    id: 9,
    complaintNo: 'CMP2023009',
    studentName: 'Rohan Kumar',
    mobileNo: '+91 9876543218',
    department: 'Computer Science',
    college: 'CUTM',
    complaintType: 'Academic',
    description: 'Library book availability',
    status: 'Pending',
    assignedTo: 'Dr. Amit Patel',
    date: '2023-01-23'
  },
  {
    id: 10,
    complaintNo: 'CMP2023010',
    studentName: 'Meera Gupta',
    mobileNo: '+91 9876543219',
    department: 'Electronics',
    college: 'Silicon',
    complaintType: 'Hostel',
    description: 'Room allocation issue',
    status: 'Resolved',
    assignedTo: 'Mr. Sanjay Verma',
    date: '2023-01-24'
  }
];

const studentStatusData = [
  { name: 'Active', value: 400, color: '#4CAF50' },
  { name: 'Inactive', value: 30, color: '#f44336' },
  { name: 'On Leave', value: 20, color: '#FFC107' },
];

// Sample employees data
const employeesData = [
  // CUTM College Employees
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@cutm.ac.in',
    phone: '+91 9876543201',
    department: 'Computer Science',
    college: 'CUTM',
    designation: 'Professor',
    joiningDate: '2020-01-15',
    status: 'Active',
    avatar: 'RK'
  },
  {
    id: 2,
    name: 'Prof. Priya Singh',
    email: 'priya.singh@cutm.ac.in',
    phone: '+91 9876543202',
    department: 'Electronics',
    college: 'CUTM',
    designation: 'Associate Professor',
    joiningDate: '2020-03-20',
    status: 'Active',
    avatar: 'PS'
  },
  {
    id: 3,
    name: 'Dr. Amit Patel',
    email: 'amit.patel@cutm.ac.in',
    phone: '+91 9876543203',
    department: 'Mechanical',
    college: 'CUTM',
    designation: 'Professor',
    joiningDate: '2019-08-10',
    status: 'Active',
    avatar: 'AP'
  },
  {
    id: 4,
    name: 'Mrs. Sneha Reddy',
    email: 'sneha.reddy@cutm.ac.in',
    phone: '+91 9876543204',
    department: 'Civil',
    college: 'CUTM',
    designation: 'Assistant Professor',
    joiningDate: '2021-02-15',
    status: 'Active',
    avatar: 'SR'
  },
  {
    id: 5,
    name: 'Dr. Manoj Verma',
    email: 'manoj.verma@cutm.ac.in',
    phone: '+91 9876543205',
    department: 'Mathematics',
    college: 'CUTM',
    designation: 'Professor',
    joiningDate: '2018-07-01',
    status: 'Active',
    avatar: 'MV'
  },
  // Silicon College Employees
  {
    id: 6,
    name: 'Prof. Anita Sharma',
    email: 'anita.sharma@silicon.ac.in',
    phone: '+91 9876543206',
    department: 'Computer Science',
    college: 'Silicon College',
    designation: 'Associate Professor',
    joiningDate: '2019-11-20',
    status: 'Active',
    avatar: 'AS'
  },
  {
    id: 7,
    name: 'Dr. Suresh Kumar',
    email: 'suresh.kumar@silicon.ac.in',
    phone: '+91 9876543207',
    department: 'Electronics',
    college: 'Silicon College',
    designation: 'Professor',
    joiningDate: '2020-06-15',
    status: 'Inactive',
    avatar: 'SK'
  },
  {
    id: 8,
    name: 'Mrs. Deepa Mishra',
    email: 'deepa.mishra@silicon.ac.in',
    phone: '+91 9876543208',
    department: 'Physics',
    college: 'Silicon College',
    designation: 'Assistant Professor',
    joiningDate: '2021-01-10',
    status: 'Active',
    avatar: 'DM'
  },
  {
    id: 9,
    name: 'Prof. Rahul Gupta',
    email: 'rahul.gupta@silicon.ac.in',
    phone: '+91 9876543209',
    department: 'Mathematics',
    college: 'Silicon College',
    designation: 'Associate Professor',
    joiningDate: '2019-04-01',
    status: 'Active',
    avatar: 'RG'
  },
  {
    id: 10,
    name: 'Dr. Meera Patel',
    email: 'meera.patel@silicon.ac.in',
    phone: '+91 9876543210',
    department: 'Chemistry',
    college: 'Silicon College',
    designation: 'Professor',
    joiningDate: '2018-09-15',
    status: 'Active',
    avatar: 'MP'
  }
];

// Add sample students data with parent details
const studentsData = [
  // CUTM College Students
  {
    id: 1,
    name: 'Rahul Sharma',
    rollNumber: 'CUTM2023001',
    email: 'rahul.sharma@cutm.ac.in',
    phone: '+91 9876543210',
    department: 'Computer Science',
    college: 'CUTM',
    semester: '3rd',
    parentName: 'Mr. Rajesh Sharma',
    parentEmail: 'rajesh.sharma@gmail.com',
    parentPhone: '+91 9876543211',
    parentOccupation: 'Business',
    status: 'Active',
    avatar: 'RS'
  },
  {
    id: 2,
    name: 'Priya Patel',
    rollNumber: 'CUTM2023002',
    email: 'priya.patel@cutm.ac.in',
    phone: '+91 9876543212',
    department: 'Electronics',
    college: 'CUTM',
    semester: '4th',
    parentName: 'Mrs. Meena Patel',
    parentEmail: 'meena.patel@gmail.com',
    parentPhone: '+91 9876543213',
    parentOccupation: 'Teacher',
    status: 'Active',
    avatar: 'PP'
  },
  {
    id: 3,
    name: 'Amit Kumar',
    rollNumber: 'CUTM2023003',
    email: 'amit.kumar@cutm.ac.in',
    phone: '+91 9876543214',
    department: 'Mechanical',
    college: 'CUTM',
    semester: '5th',
    parentName: 'Mr. Sunil Kumar',
    parentEmail: 'sunil.kumar@gmail.com',
    parentPhone: '+91 9876543215',
    parentOccupation: 'Engineer',
    status: 'Active',
    avatar: 'AK'
  },
  {
    id: 4,
    name: 'Neha Gupta',
    rollNumber: 'CUTM2023004',
    email: 'neha.gupta@cutm.ac.in',
    phone: '+91 9876543216',
    department: 'Civil',
    college: 'CUTM',
    semester: '6th',
    parentName: 'Mr. Ramesh Gupta',
    parentEmail: 'ramesh.gupta@gmail.com',
    parentPhone: '+91 9876543217',
    parentOccupation: 'Architect',
    status: 'Active',
    avatar: 'NG'
  },
  {
    id: 5,
    name: 'Suresh Reddy',
    rollNumber: 'CUTM2023005',
    email: 'suresh.reddy@cutm.ac.in',
    phone: '+91 9876543218',
    department: 'Electrical',
    college: 'CUTM',
    semester: '7th',
    parentName: 'Mr. Venkat Reddy',
    parentEmail: 'venkat.reddy@gmail.com',
    parentPhone: '+91 9876543219',
    parentOccupation: 'Doctor',
    status: 'Active',
    avatar: 'SR'
  },
  {
    id: 6,
    name: 'Anjali Singh',
    rollNumber: 'CUTM2023006',
    email: 'anjali.singh@cutm.ac.in',
    phone: '+91 9876543220',
    department: 'Computer Science',
    college: 'CUTM',
    semester: '8th',
    parentName: 'Mr. Vikram Singh',
    parentEmail: 'vikram.singh@gmail.com',
    parentPhone: '+91 9876543221',
    parentOccupation: 'Business',
    status: 'Active',
    avatar: 'AS'
  },
  {
    id: 7,
    name: 'Ravi Verma',
    rollNumber: 'CUTM2023007',
    email: 'ravi.verma@cutm.ac.in',
    phone: '+91 9876543222',
    department: 'Electronics',
    college: 'CUTM',
    semester: '3rd',
    parentName: 'Mr. Sanjay Verma',
    parentEmail: 'sanjay.verma@gmail.com',
    parentPhone: '+91 9876543223',
    parentOccupation: 'Teacher',
    status: 'Active',
    avatar: 'RV'
  },
  // Silicon College Students
  {
    id: 8,
    name: 'Karan Malhotra',
    rollNumber: 'SIL2023001',
    email: 'karan.malhotra@silicon.ac.in',
    phone: '+91 9876543224',
    department: 'Computer Science',
    college: 'Silicon College',
    semester: '4th',
    parentName: 'Mr. Raj Malhotra',
    parentEmail: 'raj.malhotra@gmail.com',
    parentPhone: '+91 9876543225',
    parentOccupation: 'Business',
    status: 'Active',
    avatar: 'KM'
  },
  {
    id: 9,
    name: 'Divya Sharma',
    rollNumber: 'SIL2023002',
    email: 'divya.sharma@silicon.ac.in',
    phone: '+91 9876543226',
    department: 'Electronics',
    college: 'Silicon College',
    semester: '5th',
    parentName: 'Mr. Rakesh Sharma',
    parentEmail: 'rakesh.sharma@gmail.com',
    parentPhone: '+91 9876543227',
    parentOccupation: 'Engineer',
    status: 'Active',
    avatar: 'DS'
  },
  {
    id: 10,
    name: 'Vikram Singh',
    rollNumber: 'SIL2023003',
    email: 'vikram.singh@silicon.ac.in',
    phone: '+91 9876543228',
    department: 'Mechanical',
    college: 'Silicon College',
    semester: '6th',
    parentName: 'Mr. Harish Singh',
    parentEmail: 'harish.singh@gmail.com',
    parentPhone: '+91 9876543229',
    parentOccupation: 'Doctor',
    status: 'Active',
    avatar: 'VS'
  },
  {
    id: 11,
    name: 'Pooja Patel',
    rollNumber: 'SIL2023004',
    email: 'pooja.patel@silicon.ac.in',
    phone: '+91 9876543230',
    department: 'Civil',
    college: 'Silicon College',
    semester: '7th',
    parentName: 'Mr. Mahesh Patel',
    parentEmail: 'mahesh.patel@gmail.com',
    parentPhone: '+91 9876543231',
    parentOccupation: 'Architect',
    status: 'Active',
    avatar: 'PP'
  },
  {
    id: 12,
    name: 'Rohan Kumar',
    rollNumber: 'SIL2023005',
    email: 'rohan.kumar@silicon.ac.in',
    phone: '+91 9876543232',
    department: 'Electrical',
    college: 'Silicon College',
    semester: '8th',
    parentName: 'Mr. Arun Kumar',
    parentEmail: 'arun.kumar@gmail.com',
    parentPhone: '+91 9876543233',
    parentOccupation: 'Teacher',
    status: 'Active',
    avatar: 'RK'
  },
  {
    id: 13,
    name: 'Meera Gupta',
    rollNumber: 'SIL2023006',
    email: 'meera.gupta@silicon.ac.in',
    phone: '+91 9876543234',
    department: 'Computer Science',
    college: 'Silicon College',
    semester: '3rd',
    parentName: 'Mr. Ashok Gupta',
    parentEmail: 'ashok.gupta@gmail.com',
    parentPhone: '+91 9876543235',
    parentOccupation: 'Business',
    status: 'Active',
    avatar: 'MG'
  },
  {
    id: 14,
    name: 'Arjun Reddy',
    rollNumber: 'SIL2023007',
    email: 'arjun.reddy@silicon.ac.in',
    phone: '+91 9876543236',
    department: 'Electronics',
    college: 'Silicon College',
    semester: '4th',
    parentName: 'Mr. Suresh Reddy',
    parentEmail: 'suresh.reddy@gmail.com',
    parentPhone: '+91 9876543237',
    parentOccupation: 'Engineer',
    status: 'Active',
    avatar: 'AR'
  },
  {
    id: 15,
    name: 'Ananya Singh',
    rollNumber: 'SIL2023008',
    email: 'ananya.singh@silicon.ac.in',
    phone: '+91 9876543238',
    department: 'Mechanical',
    college: 'Silicon College',
    semester: '5th',
    parentName: 'Mr. Rajesh Singh',
    parentEmail: 'rajesh.singh@gmail.com',
    parentPhone: '+91 9876543239',
    parentOccupation: 'Doctor',
    status: 'Active',
    avatar: 'AS'
  }
];

// Add department data with employees
const departmentsData = [
  {
    id: 1,
    name: 'Academic',
    description: 'Handles all academic activities and curriculum',
    employees: [
      {
        id: 1,
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh.kumar@cutm.ac.in',
        phone: '+91 9876543201',
        designation: 'Head of Department',
        status: 'Active',
        avatar: 'RK'
      },
      {
        id: 2,
        name: 'Prof. Priya Singh',
        email: 'priya.singh@cutm.ac.in',
        phone: '+91 9876543202',
        designation: 'Professor',
        status: 'Active',
        avatar: 'PS'
      },
      {
        id: 3,
        name: 'Dr. Amit Patel',
        email: 'amit.patel@cutm.ac.in',
        phone: '+91 9876543203',
        designation: 'Associate Professor',
        status: 'Active',
        avatar: 'AP'
      }
    ]
  },
  {
    id: 2,
    name: 'Transport',
    description: 'Manages college transportation and vehicle fleet',
    employees: [
      {
        id: 4,
        name: 'Mr. Ramesh Sharma',
        email: 'ramesh.sharma@cutm.ac.in',
        phone: '+91 9876543204',
        designation: 'Transport Manager',
        status: 'Active',
        avatar: 'RS'
      },
      {
        id: 5,
        name: 'Mr. Sunil Kumar',
        email: 'sunil.kumar@cutm.ac.in',
        phone: '+91 9876543205',
        designation: 'Driver Supervisor',
        status: 'Active',
        avatar: 'SK'
      }
    ]
  },
  {
    id: 3,
    name: 'Security',
    description: 'Ensures campus safety and security',
    employees: [
      {
        id: 6,
        name: 'Mr. Vikram Singh',
        email: 'vikram.singh@cutm.ac.in',
        phone: '+91 9876543206',
        designation: 'Security Head',
        status: 'Active',
        avatar: 'VS'
      },
      {
        id: 7,
        name: 'Mr. Anil Kumar',
        email: 'anil.kumar@cutm.ac.in',
        phone: '+91 9876543207',
        designation: 'Security Supervisor',
        status: 'Active',
        avatar: 'AK'
      },
      {
        id: 8,
        name: 'Mr. Deepak Sharma',
        email: 'deepak.sharma@cutm.ac.in',
        phone: '+91 9876543208',
        designation: 'Security Guard',
        status: 'Active',
        avatar: 'DS'
      }
    ]
  },
  {
    id: 4,
    name: 'Hostel',
    description: 'Manages student accommodation and facilities',
    employees: [
      {
        id: 9,
        name: 'Mrs. Meena Gupta',
        email: 'meena.gupta@cutm.ac.in',
        phone: '+91 9876543209',
        designation: 'Hostel Warden',
        status: 'Active',
        avatar: 'MG'
      },
      {
        id: 10,
        name: 'Mr. Sanjay Verma',
        email: 'sanjay.verma@cutm.ac.in',
        phone: '+91 9876543210',
        designation: 'Assistant Warden',
        status: 'Active',
        avatar: 'SV'
      },
      {
        id: 11,
        name: 'Mrs. Anita Patel',
        email: 'anita.patel@cutm.ac.in',
        phone: '+91 9876543211',
        designation: 'Housekeeping Supervisor',
        status: 'Active',
        avatar: 'AP'
      }
    ]
  }
];

const AdminPanel = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [roleForm, setRoleForm] = useState({
    employeeName: '',
    email: '',
    phone: '',
    department: '',
    college: '',
    designation: '',
    joiningDate: ''
  });
  const [complaintSearch, setComplaintSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [actionAnchorEl, setActionAnchorEl] = useState(null);

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
    localStorage.removeItem('adminAuth');
    navigate('/login');
  };

  const handleRoleFormChange = (e) => {
    const { name, value } = e.target;
    setRoleForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Role Form Submitted:', roleForm);
    // Here you would typically send the data to your backend
  };

  const handleComplaintClick = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleActionClick = (event) => {
    setActionAnchorEl(event.currentTarget);
  };

  const handleActionClose = () => {
    setActionAnchorEl(null);
  };

  const handleActionSelect = (action) => {
    if (action === 'reassign') {
      // Handle reassign action
      console.log('Reassign complaint:', selectedComplaint.id);
    } else if (action === 'resolve') {
      // Handle resolve action
      console.log('Resolve complaint:', selectedComplaint.id);
    }
    handleActionClose();
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, page: 'dashboard' },
    { text: 'Employees', icon: <EmployeesIcon />, page: 'employees' },
    { text: 'Students', icon: <StudentsIcon />, page: 'students' },
    { text: 'Departments', icon: <DepartmentsIcon />, page: 'departments' },
    { text: 'Roles', icon: <RolesIcon />, page: 'roles' },
    { text: 'Complain Inbox', icon: <ComplainIcon />, page: 'complaints' },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Admin Panel
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
                TOTAL STUDENTS
              </Typography>
              <Typography variant="h4">450</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff', boxShadow: 2 }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                TOTAL EMPLOYEES
              </Typography>
              <Typography variant="h4">90</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff', boxShadow: 2 }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                TOTAL DEPARTMENTS
              </Typography>
              <Typography variant="h4">5</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff', boxShadow: 2 }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                PENDING COMPLAINTS
              </Typography>
              <Typography variant="h4">8</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Department Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Department Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#4285F4" name="Students" />
                <Bar dataKey="employees" fill="#34A853" name="Employees" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Student Status */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Student Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={studentStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {studentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Complaints Trend */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Complaints Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={complaintsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="resolved" stroke="#4CAF50" name="Resolved" />
                <Line type="monotone" dataKey="pending" stroke="#f44336" name="Pending" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </>
  );

  const renderEmployees = () => {
    const filteredEmployees = employeesData.filter(employee => {
      const matchesCollege = selectedCollege === 'all' || employee.college === selectedCollege;
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCollege && matchesSearch;
    });

    return (
      <>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Employee Management
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by name, department, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{ bgcolor: 'white' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <Select
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  sx={{ bgcolor: 'white' }}
                >
                  <MenuItem value="all">All Colleges</MenuItem>
                  <MenuItem value="CUTM">CUTM College</MenuItem>
                  <MenuItem value="Silicon College">Silicon College</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Employee</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>College</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Joining Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map((employee) => (
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
                    <Typography variant="body2">{employee.college}</Typography>
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
  };

  const renderStudents = () => {
    const filteredStudents = studentsData.filter(student => {
      const matchesCollege = selectedCollege === 'all' || student.college === selectedCollege;
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.department.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCollege && matchesSearch;
    });

    return (
      <>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Student Management
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by name, roll number, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{ bgcolor: 'white' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <Select
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  sx={{ bgcolor: 'white' }}
                >
                  <MenuItem value="all">All Colleges</MenuItem>
                  <MenuItem value="CUTM">CUTM College</MenuItem>
                  <MenuItem value="Silicon College">Silicon College</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Student</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>College</TableCell>
                <TableCell>Parent Details</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, bgcolor: '#4285F4' }}>{student.avatar}</Avatar>
                      <Box>
                        <Typography variant="subtitle2">{student.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {student.rollNumber}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <EmailIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{student.email}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PhoneIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{student.phone}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{student.department}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Semester: {student.semester}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{student.college}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {student.parentName}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <EmailIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{student.parentEmail}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PhoneIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{student.parentPhone}</Typography>
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        Occupation: {student.parentOccupation}
                      </Typography>
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
  };

  const renderDepartments = () => {
    if (selectedDepartment) {
      const department = departmentsData.find(d => d.id === selectedDepartment);
      return (
        <>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IconButton onClick={() => setSelectedDepartment(null)} sx={{ mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h5">
                {department.name} Department
              </Typography>
            </Box>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
              {department.description}
            </Typography>
          </Box>

          <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell>Employee</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {department.employees.map((employee) => (
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
                      <Typography variant="body2">{employee.designation}</Typography>
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
    }

    return (
      <>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Departments
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {departmentsData.map((department) => (
            <Grid item xs={12} sm={6} md={3} key={department.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3
                  }
                }}
                onClick={() => setSelectedDepartment(department.id)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ 
                      mr: 2, 
                      bgcolor: '#4285F4',
                      width: 48,
                      height: 48
                    }}>
                      {department.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{department.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {department.employees.length} Employees
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {department.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  const renderRoles = () => {
    return (
      <>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Add New Role
          </Typography>
        </Box>

        <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
          <form onSubmit={handleRoleFormSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Employee Name"
                  name="employeeName"
                  value={roleForm.employeeName}
                  onChange={handleRoleFormChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={roleForm.email}
                  onChange={handleRoleFormChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={roleForm.phone}
                  onChange={handleRoleFormChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="department"
                    value={roleForm.department}
                    onChange={handleRoleFormChange}
                    label="Department"
                  >
                    <MenuItem value="Computer Science">Computer Science</MenuItem>
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Mechanical">Mechanical</MenuItem>
                    <MenuItem value="Civil">Civil</MenuItem>
                    <MenuItem value="Mathematics">Mathematics</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>College</InputLabel>
                  <Select
                    name="college"
                    value={roleForm.college}
                    onChange={handleRoleFormChange}
                    label="College"
                  >
                    <MenuItem value="CUTM">CUTM</MenuItem>
                    <MenuItem value="Silicon">Silicon</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Designation</InputLabel>
                  <Select
                    name="designation"
                    value={roleForm.designation}
                    onChange={handleRoleFormChange}
                    label="Designation"
                  >
                    <MenuItem value="Professor">Professor</MenuItem>
                    <MenuItem value="Associate Professor">Associate Professor</MenuItem>
                    <MenuItem value="Assistant Professor">Assistant Professor</MenuItem>
                    <MenuItem value="Lecturer">Lecturer</MenuItem>
                    <MenuItem value="Head of Department">Head of Department</MenuItem>
                    <MenuItem value="Dean">Dean</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Joining Date"
                  name="joiningDate"
                  type="date"
                  value={roleForm.joiningDate}
                  onChange={handleRoleFormChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => setRoleForm({
                      employeeName: '',
                      email: '',
                      phone: '',
                      department: '',
                      college: '',
                      designation: '',
                      joiningDate: ''
                    })}
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ bgcolor: '#4285F4' }}
                  >
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </>
    );
  };

  const renderComplaintSummary = () => {
    if (!selectedComplaint) return null;

    return (
      <Paper sx={{ p: 3, mb: 3, boxShadow: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">Complaint Summary</Typography>
          <IconButton onClick={() => setSelectedComplaint(null)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Complaint Number</Typography>
            <Typography variant="body1">{selectedComplaint.complaintNo}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Date</Typography>
            <Typography variant="body1">
              {new Date(selectedComplaint.date).toLocaleDateString('en-GB')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Student Name</Typography>
            <Typography variant="body1">{selectedComplaint.studentName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Mobile Number</Typography>
            <Typography variant="body1">{selectedComplaint.mobileNo}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Department</Typography>
            <Typography variant="body1">{selectedComplaint.department}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">College</Typography>
            <Typography variant="body1">{selectedComplaint.college}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Complaint Type</Typography>
            <Typography variant="body1">{selectedComplaint.complaintType}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="textSecondary">Status</Typography>
            <Chip
              label={selectedComplaint.status}
              size="small"
              sx={{
                backgroundColor: 
                  selectedComplaint.status === 'Resolved' ? '#e8f5e9' :
                  selectedComplaint.status === 'In Progress' ? '#fff3e0' : '#ffebee',
                color: 
                  selectedComplaint.status === 'Resolved' ? '#2e7d32' :
                  selectedComplaint.status === 'In Progress' ? '#f57c00' : '#c62828',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">Description</Typography>
            <Typography variant="body1">{selectedComplaint.description}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">Assigned To</Typography>
            <Typography variant="body1">{selectedComplaint.assignedTo}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleActionClick}
                startIcon={<SettingsIcon />}
                sx={{ bgcolor: '#4285F4' }}
              >
                Take Action
              </Button>
              <Menu
                anchorEl={actionAnchorEl}
                open={Boolean(actionAnchorEl)}
                onClose={handleActionClose}
              >
                <MenuItem onClick={() => handleActionSelect('reassign')}>
                  <ListItemIcon>
                    <PersonAddIcon fontSize="small" />
                  </ListItemIcon>
                  Reassign
                </MenuItem>
                <MenuItem onClick={() => handleActionSelect('resolve')}>
                  <ListItemIcon>
                    <CheckCircleIcon fontSize="small" />
                  </ListItemIcon>
                  Resolve
                </MenuItem>
              </Menu>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  const renderComplaints = () => {
    const filteredComplaints = complaintsData.filter(complaint => {
      const matchesSearch = 
        complaint.complaintNo.toLowerCase().includes(complaintSearch.toLowerCase()) ||
        complaint.studentName.toLowerCase().includes(complaintSearch.toLowerCase()) ||
        complaint.mobileNo.includes(complaintSearch) ||
        complaint.assignedTo.toLowerCase().includes(complaintSearch.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || complaint.status === selectedStatus;
      const matchesCollege = selectedCollege === 'all' || complaint.college === selectedCollege;
      
      return matchesSearch && matchesStatus && matchesCollege;
    });

    return (
      <>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Complaint Inbox
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by complaint no, name, mobile, or assigned to..."
                value={complaintSearch}
                onChange={(e) => setComplaintSearch(e.target.value)}
                size="small"
                sx={{ bgcolor: 'white' }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  label="Status"
                  sx={{ bgcolor: 'white' }}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>College</InputLabel>
                <Select
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  label="College"
                  sx={{ bgcolor: 'white' }}
                >
                  <MenuItem value="all">All Colleges</MenuItem>
                  <MenuItem value="CUTM">CUTM</MenuItem>
                  <MenuItem value="Silicon">Silicon</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {renderComplaintSummary()}

        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Complaint No.</TableCell>
                <TableCell>Student Details</TableCell>
                <TableCell>Complaint Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredComplaints.map((complaint) => (
                <TableRow 
                  key={complaint.id} 
                  hover
                  onClick={() => handleComplaintClick(complaint)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>
                    <Typography variant="subtitle2">{complaint.complaintNo}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2">{complaint.studentName}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {complaint.mobileNo}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {complaint.department}, {complaint.college}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{complaint.complaintType}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{complaint.description}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{complaint.assignedTo}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={complaint.status}
                      size="small"
                      sx={{
                        backgroundColor: 
                          complaint.status === 'Resolved' ? '#e8f5e9' :
                          complaint.status === 'In Progress' ? '#fff3e0' : '#ffebee',
                        color: 
                          complaint.status === 'Resolved' ? '#2e7d32' :
                          complaint.status === 'In Progress' ? '#f57c00' : '#c62828',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(complaint.date).toLocaleDateString('en-GB')}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return renderDashboard();
      case 'employees':
        return renderEmployees();
      case 'students':
        return renderStudents();
      case 'departments':
        return renderDepartments();
      case 'roles':
        return renderRoles();
      case 'complaints':
        return renderComplaints();
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
            <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
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
        <MenuItem>New complaint received</MenuItem>
        <MenuItem>Complaint resolved</MenuItem>
        <MenuItem>New student registered</MenuItem>
        <MenuItem>System update available</MenuItem>
      </Menu>
    </Box>
  );
};

export default AdminPanel; 