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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  FormControl,
  InputLabel,
  Select,
  Container,
  CircularProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControlLabel,
  Checkbox,
  Link,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Mail as GrievanceIcon,
  Assignment as StatusIcon,
  Assignment as AssignmentIcon,
  Feedback as FeedbackIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  School as SchoolIcon,
  Home as HomeIcon,
  Restaurant as RestaurantIcon,
  Build as BuildIcon,
  LibraryBooks as LibraryBooksIcon,
  Sports as SportsIcon,
  Payment as PaymentIcon,
  CardGiftcard as CardGiftcardIcon,
  Gavel as GavelIcon,
  MoreHoriz as MoreHorizIcon,
  AttachFile as AttachFileIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Description as DescriptionIcon,
  Visibility as VisibilityIcon,
  Assessment as AssessmentIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { authenticateUser, logoutUser } from '../utils/auth';
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
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';

const drawerWidth = 240;

// Chart data and colors
const attendanceData = [
  { month: 'Jan', attendance: 85 },
  { month: 'Feb', attendance: 90 },
  { month: 'Mar', attendance: 88 },
  { month: 'Apr', attendance: 92 },
  { month: 'May', attendance: 87 },
  { month: 'Jun', attendance: 95 },
];

const subjectPerformance = [
  { subject: 'Mathematics', marks: 85 },
  { subject: 'Physics', marks: 78 },
  { subject: 'Chemistry', marks: 82 },
  { subject: 'Computer Science', marks: 90 },
  { subject: 'English', marks: 88 },
];

const departmentDistribution = [
  { name: 'Computer Science', value: 30 },
  { name: 'Electronics', value: 25 },
  { name: 'Mechanical', value: 20 },
  { name: 'Civil', value: 15 },
  { name: 'Electrical', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const grievanceCategories = [
  { id: 'academic', name: 'Academic', icon: <SchoolIcon /> },
  { id: 'hostel', name: 'Hostel', icon: <HomeIcon /> },
  { id: 'canteen', name: 'Canteen', icon: <RestaurantIcon /> },
  { id: 'infrastructure', name: 'Infrastructure', icon: <BuildIcon /> },
  { id: 'library', name: 'Library', icon: <LibraryBooksIcon /> },
  { id: 'sports', name: 'Sports Issue', icon: <SportsIcon /> },
  { id: 'fees', name: 'Fees Issue', icon: <PaymentIcon /> },
  { id: 'scholarship', name: 'Scholarship', icon: <CardGiftcardIcon /> },
  { id: 'disciplinary', name: 'Disciplinary', icon: <GavelIcon /> },
  { id: 'others', name: 'Others', icon: <MoreHorizIcon /> },
];

const statusSteps = [
  {
    label: 'Resolved',
    icon: <CheckCircleIcon />,
    color: 'success',
    description: 'Complaint has been successfully resolved',
    key: 'resolved'
  },
  {
    label: 'Pending',
    icon: <PendingIcon />,
    color: 'warning',
    description: 'Under review by concerned department',
    key: 'pending'
  },
  {
    label: 'In Progress',
    icon: <HourglassEmptyIcon />,
    color: 'info',
    description: 'Being actively worked on',
    key: 'progress'
  },
  {
    label: 'Complaint Assigned',
    icon: <StatusIcon />,
    color: 'primary',
    description: 'Assigned to department for action',
    key: 'assigned'
  },
  {
    label: 'Complaint Filed',
    icon: <DescriptionIcon />,
    color: 'error',
    description: 'Initial submission received',
    key: 'filed'
  }
];

const sampleComplaints = [
  {
    id: 1,
    title: 'Library Book Issue',
    category: 'Library',
    date: '2024-03-15',
    status: 'Resolved',
    currentStep: 0,
    description: 'Unable to access e-books in the library portal',
    assignedTo: 'Library Department',
    lastUpdate: '2024-03-20',
    resolution: 'Access restored after system update',
    timeline: [
      { date: '2024-03-15 09:00', event: 'Complaint Filed', status: 'filed' },
      { date: '2024-03-16 10:30', event: 'Assigned to Library Department', status: 'assigned' },
      { date: '2024-03-17 11:00', event: 'Under Investigation', status: 'progress' },
      { date: '2024-03-19 14:00', event: 'Review Pending', status: 'pending' },
      { date: '2024-03-20 15:30', event: 'Issue Resolved', status: 'resolved' }
    ]
  },
  {
    id: 2,
    title: 'Hostel Maintenance',
    category: 'Hostel',
    date: '2024-03-18',
    status: 'In Progress',
    currentStep: 2,
    description: 'Water leakage in room 205',
    assignedTo: 'Maintenance Team',
    lastUpdate: '2024-03-19',
    timeline: [
      { date: '2024-03-18 08:00', event: 'Complaint Filed', status: 'filed' },
      { date: '2024-03-19 09:15', event: 'Assigned to Maintenance', status: 'assigned' },
      { date: '2024-03-19 11:30', event: 'Inspection Started', status: 'progress' }
    ]
  },
  {
    id: 3,
    title: 'Academic Query',
    category: 'Academic',
    date: '2024-03-20',
    status: 'Pending',
    currentStep: 1,
    description: 'Clarification needed for course syllabus',
    assignedTo: 'Academic Department',
    lastUpdate: '2024-03-20',
    timeline: [
      { date: '2024-03-20 10:00', event: 'Complaint Filed', status: 'filed' },
      { date: '2024-03-20 11:45', event: 'Under Review', status: 'pending' }
    ]
  }
];

const StatusTimeline = ({ complaint }) => {
  const currentStepIndex = statusSteps.findIndex(step => step.key === complaint.timeline[complaint.timeline.length - 1]?.status);

  return (
    <Timeline position="alternate">
      {statusSteps.map((step, index) => {
        const stepInfo = complaint.timeline.find(t => t.status === step.key);
        const isActive = index <= currentStepIndex;
        
        return (
          <TimelineItem key={step.label}>
            <TimelineSeparator>
              <TimelineDot color={isActive ? step.color : 'grey'} variant={isActive ? 'filled' : 'outlined'}>
                {step.icon}
              </TimelineDot>
              {index < statusSteps.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="body1" color={isActive ? 'text.primary' : 'text.secondary'}>
                {step.label}
              </Typography>
              {stepInfo && (
                <>
                  <Typography variant="caption" color="text.secondary">
                    {stepInfo.event}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {stepInfo.date}
                  </Typography>
                </>
              )}
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

const StudentPanel = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [newComplaintOpen, setNewComplaintOpen] = useState(false);
  const [newFeedbackOpen, setNewFeedbackOpen] = useState(false);
  const [complaintForm, setComplaintForm] = useState({
    type: '',
    description: ''
  });
  const [feedbackForm, setFeedbackForm] = useState({
    studentDetails: {
      name: '',
      rollNumber: '',
      department: '',
      year: ''
    },
    type: '',
    subject: '',
    description: '',
    rating: 0,
    anonymous: false
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [auth, setAuth] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [grievanceForm, setGrievanceForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    attachments: [],
    studentDetails: {
      name: '',
      rollNumber: '',
      department: '',
      year: '',
      semester: '',
      contactNumber: '',
      email: '',
    },
    categorySpecific: {
      academic: {
        subject: '',
        facultyName: '',
        issueType: '',
      },
      hostel: {
        roomNumber: '',
        block: '',
        issueType: '',
      },
      canteen: {
        foodItem: '',
        date: '',
        time: '',
      },
      infrastructure: {
        location: '',
        equipment: '',
        issueType: '',
      },
      library: {
        bookTitle: '',
        issueType: '',
      },
      sports: {
        facility: '',
        equipment: '',
        issueType: '',
      },
      fees: {
        feeType: '',
        amount: '',
        transactionId: '',
      },
      scholarship: {
        scholarshipType: '',
        applicationNumber: '',
      },
      disciplinary: {
        incidentDate: '',
        incidentType: '',
        description: '',
      },
      others: {
        issueType: '',
        additionalDetails: '',
      },
    },
  });
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [filteredComplaints, setFilteredComplaints] = useState(sampleComplaints);

  useEffect(() => {
    const studentAuth = authenticateUser();
    if (!studentAuth) {
      navigate('/login');
    } else {
      setAuth(studentAuth);
      setLoading(false);
    }
  }, [navigate]);

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

  const handleNewComplaintOpen = () => {
    setNewComplaintOpen(true);
  };

  const handleNewComplaintClose = () => {
    setNewComplaintOpen(false);
    setComplaintForm({ type: '', description: '' });
  };

  const handleNewFeedbackOpen = () => {
    setNewFeedbackOpen(true);
  };

  const handleNewFeedbackClose = () => {
    setNewFeedbackOpen(false);
    setFeedbackForm({
      studentDetails: {
        name: '',
        rollNumber: '',
        department: '',
        year: ''
      },
      type: '',
      subject: '',
      description: '',
      rating: 0,
      anonymous: false
    });
  };

  const handleComplaintSubmit = () => {
    // Add complaint submission logic here
    handleNewComplaintClose();
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission logic here
    console.log('Feedback Form Data:', feedbackForm);
    handleNewFeedbackClose();
  };

  const handleRowClick = (complaintId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [complaintId]: !prev[complaintId],
    }));
  };

  const handleComplaintClick = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedComplaint(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleFormClose = () => {
    setSelectedCategory(null);
    setGrievanceForm({
      title: '',
      description: '',
      priority: 'medium',
      attachments: [],
      studentDetails: {
        name: '',
        rollNumber: '',
        department: '',
        year: '',
        semester: '',
        contactNumber: '',
        email: '',
      },
      categorySpecific: {
        academic: {
          subject: '',
          facultyName: '',
          issueType: '',
        },
        hostel: {
          roomNumber: '',
          block: '',
          issueType: '',
        },
        canteen: {
          foodItem: '',
          date: '',
          time: '',
        },
        infrastructure: {
          location: '',
          equipment: '',
          issueType: '',
        },
        library: {
          bookTitle: '',
          issueType: '',
        },
        sports: {
          facility: '',
          equipment: '',
          issueType: '',
        },
        fees: {
          feeType: '',
          amount: '',
          transactionId: '',
        },
        scholarship: {
          scholarshipType: '',
          applicationNumber: '',
        },
        disciplinary: {
          incidentDate: '',
          incidentType: '',
          description: '',
        },
        others: {
          issueType: '',
          additionalDetails: '',
        },
      },
    });
  };

  const handleFormSubmit = () => {
    // Handle form submission logic here
    console.log('Grievance Form Data:', {
      category: selectedCategory,
      ...grievanceForm,
    });
    handleFormClose();
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, page: 'dashboard' },
    { text: 'Grievance', icon: <GrievanceIcon />, page: 'grievance' },
    { text: 'Complaint Status', icon: <StatusIcon />, page: 'status' },
    { text: 'Feedback', icon: <FeedbackIcon />, page: 'feedback' },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Student Panel
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
    <Container maxWidth="xl">
      {/* Welcome Section with Parallax Effect */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
        borderRadius: 4,
        p: 6,
        mb: 6,
        color: 'white',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
          opacity: 0.1,
        }
      }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h2" gutterBottom sx={{ 
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              animation: 'fadeIn 1s ease-in'
            }}>
              Welcome, {auth?.name || 'Student'}!
            </Typography>
            <Typography variant="h5" sx={{ 
              opacity: 0.9,
              mb: 2,
              animation: 'fadeIn 1s ease-in 0.2s'
            }}>
              Track your academic progress and manage your activities
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: 'white',
                color: '#4285F4',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.9)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
                animation: 'fadeIn 1s ease-in 0.4s'
              }}
            >
              View Profile
            </Button>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              sx={{
                width: 150,
                height: 150,
                border: '4px solid white',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                animation: 'scaleIn 0.5s ease-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.3s ease',
                }
              }}
            >
              {auth?.name?.[0]?.toUpperCase() || 'S'}
            </Avatar>
          </Grid>
        </Grid>
      </Box>

      {/* Quick Stats with Hover Effects */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white',
            height: '100%',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
            }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon sx={{ fontSize: 48, mr: 2, filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }} />
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>89.5%</Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'medium' }}>Attendance</Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
                Current Semester
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
            color: 'white',
            height: '100%',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
            }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssessmentIcon sx={{ fontSize: 48, mr: 2, filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }} />
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>8.5</Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'medium' }}>CGPA</Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
                Current Performance
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)',
            color: 'white',
            height: '100%',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
            }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <StatusIcon sx={{ fontSize: 48, mr: 2, filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }} />
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>3</Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'medium' }}>Pending Assignments</Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
                Due this week
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(45deg, #F44336 30%, #E57373 90%)',
            color: 'white',
            height: '100%',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
            }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EventIcon sx={{ fontSize: 48, mr: 2, filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }} />
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>2</Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'medium' }}>Upcoming Exams</Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
                Next 7 days
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section with Enhanced Styling */}
      <Grid container spacing={4}>
        {/* Attendance Trend Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ 
            p: 4, 
            height: 400,
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            background: 'white',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
            }
          }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e' }}>
              Attendance Trend
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: 8,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    padding: '12px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="#4285F4" 
                  strokeWidth={3}
                  dot={{ fill: '#4285F4', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#4285F4' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Subject Performance Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 4, 
            height: 400,
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            background: 'white',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
            }
          }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e' }}>
              Subject Performance
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="subject" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: 8,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    padding: '12px'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="marks" 
                  fill="#34A853"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Department Distribution Chart */}
        <Grid item xs={12}>
          <Paper sx={{ 
            p: 4, 
            height: 400,
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            background: 'white',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
            }
          }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e' }}>
              Department Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: 8,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    padding: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );

  const renderGrievanceForm = () => {
    const category = selectedCategory?.id;
    return (
      <Dialog
        open={Boolean(selectedCategory)}
        onClose={handleFormClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Submit {selectedCategory?.name} Grievance
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {/* Student Details Section */}
            <Typography variant="h6" gutterBottom>
              Student Details
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={grievanceForm.studentDetails.name}
                  onChange={(e) => setGrievanceForm({
                    ...grievanceForm,
                    studentDetails: {
                      ...grievanceForm.studentDetails,
                      name: e.target.value
                    }
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Roll Number"
                  value={grievanceForm.studentDetails.rollNumber}
                  onChange={(e) => setGrievanceForm({
                    ...grievanceForm,
                    studentDetails: {
                      ...grievanceForm.studentDetails,
                      rollNumber: e.target.value
                    }
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department"
                  value={grievanceForm.studentDetails.department}
                  onChange={(e) => setGrievanceForm({
                    ...grievanceForm,
                    studentDetails: {
                      ...grievanceForm.studentDetails,
                      department: e.target.value
                    }
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Year"
                  value={grievanceForm.studentDetails.year}
                  onChange={(e) => setGrievanceForm({
                    ...grievanceForm,
                    studentDetails: {
                      ...grievanceForm.studentDetails,
                      year: e.target.value
                    }
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Semester"
                  value={grievanceForm.studentDetails.semester}
                  onChange={(e) => setGrievanceForm({
                    ...grievanceForm,
                    studentDetails: {
                      ...grievanceForm.studentDetails,
                      semester: e.target.value
                    }
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  value={grievanceForm.studentDetails.contactNumber}
                  onChange={(e) => setGrievanceForm({
                    ...grievanceForm,
                    studentDetails: {
                      ...grievanceForm.studentDetails,
                      contactNumber: e.target.value
                    }
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={grievanceForm.studentDetails.email}
                  onChange={(e) => setGrievanceForm({
                    ...grievanceForm,
                    studentDetails: {
                      ...grievanceForm.studentDetails,
                      email: e.target.value
                    }
                  })}
                />
              </Grid>
            </Grid>

            {/* Grievance Details Section */}
            <Typography variant="h6" gutterBottom>
              Grievance Details
            </Typography>
            <TextField
              fullWidth
              label="Title"
              value={grievanceForm.title}
              onChange={(e) => setGrievanceForm({ ...grievanceForm, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={grievanceForm.description}
              onChange={(e) => setGrievanceForm({ ...grievanceForm, description: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={grievanceForm.priority}
                label="Priority"
                onChange={(e) => setGrievanceForm({ ...grievanceForm, priority: e.target.value })}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>

            {/* Category Specific Fields */}
            <Typography variant="h6" gutterBottom>
              {selectedCategory?.name} Specific Details
            </Typography>
            {category === 'academic' && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Subject"
                    value={grievanceForm.categorySpecific.academic.subject}
                    onChange={(e) => setGrievanceForm({
                      ...grievanceForm,
                      categorySpecific: {
                        ...grievanceForm.categorySpecific,
                        academic: {
                          ...grievanceForm.categorySpecific.academic,
                          subject: e.target.value
                        }
                      }
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Faculty Name"
                    value={grievanceForm.categorySpecific.academic.facultyName}
                    onChange={(e) => setGrievanceForm({
                      ...grievanceForm,
                      categorySpecific: {
                        ...grievanceForm.categorySpecific,
                        academic: {
                          ...grievanceForm.categorySpecific.academic,
                          facultyName: e.target.value
                        }
                      }
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Issue Type</InputLabel>
                    <Select
                      value={grievanceForm.categorySpecific.academic.issueType}
                      label="Issue Type"
                      onChange={(e) => setGrievanceForm({
                        ...grievanceForm,
                        categorySpecific: {
                          ...grievanceForm.categorySpecific,
                          academic: {
                            ...grievanceForm.categorySpecific.academic,
                            issueType: e.target.value
                          }
                        }
                      })}
                    >
                      <MenuItem value="grading">Grading Issue</MenuItem>
                      <MenuItem value="attendance">Attendance Issue</MenuItem>
                      <MenuItem value="syllabus">Syllabus Issue</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}

            {category === 'hostel' && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Room Number"
                    value={grievanceForm.categorySpecific.hostel.roomNumber}
                    onChange={(e) => setGrievanceForm({
                      ...grievanceForm,
                      categorySpecific: {
                        ...grievanceForm.categorySpecific,
                        hostel: {
                          ...grievanceForm.categorySpecific.hostel,
                          roomNumber: e.target.value
                        }
                      }
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Block"
                    value={grievanceForm.categorySpecific.hostel.block}
                    onChange={(e) => setGrievanceForm({
                      ...grievanceForm,
                      categorySpecific: {
                        ...grievanceForm.categorySpecific,
                        hostel: {
                          ...grievanceForm.categorySpecific.hostel,
                          block: e.target.value
                        }
                      }
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Issue Type</InputLabel>
                    <Select
                      value={grievanceForm.categorySpecific.hostel.issueType}
                      label="Issue Type"
                      onChange={(e) => setGrievanceForm({
                        ...grievanceForm,
                        categorySpecific: {
                          ...grievanceForm.categorySpecific,
                          hostel: {
                            ...grievanceForm.categorySpecific.hostel,
                            issueType: e.target.value
                          }
                        }
                      })}
                    >
                      <MenuItem value="maintenance">Maintenance Issue</MenuItem>
                      <MenuItem value="cleanliness">Cleanliness Issue</MenuItem>
                      <MenuItem value="security">Security Issue</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}

            {/* Add similar sections for other categories */}

            <Button
              variant="outlined"
              component="label"
              startIcon={<AttachFileIcon />}
              sx={{ mt: 2, mb: 2 }}
            >
              Attach Files
              <input
                type="file"
                hidden
                multiple
                onChange={(e) => setGrievanceForm({ ...grievanceForm, attachments: e.target.files })}
              />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancel</Button>
          <Button onClick={handleFormSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const renderGrievance = () => (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Grievance Section
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select a category to submit your grievance
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {grievanceCategories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
            <Card
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
              onClick={() => handleCategoryClick(category)}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>{category.icon}</Box>
                <Typography variant="h6">{category.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {renderGrievanceForm()}
    </Container>
  );

  const renderStatus = () => (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Complaint Status
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your submitted complaints and their current status
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Status Overview Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Complaints
              </Typography>
              <Typography variant="h4">3</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resolved
              </Typography>
              <Typography variant="h4" color="success.main">1</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h4" color="warning.main">1</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pending
              </Typography>
              <Typography variant="h4" color="error.main">1</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Status Tracking */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Status Tracking
            </Typography>
            <StatusTimeline complaint={selectedComplaint || sampleComplaints[0]} />
          </Paper>
        </Grid>

        {/* Complaints List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Your Complaints
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Assigned To</TableCell>
                    <TableCell>Last Update</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredComplaints.map((complaint) => (
                    <TableRow key={complaint.id}>
                      <TableCell>{complaint.title}</TableCell>
                      <TableCell>{complaint.category}</TableCell>
                      <TableCell>{complaint.date}</TableCell>
                      <TableCell>
                        <Chip
                          label={complaint.status}
                          color={
                            complaint.status === 'Resolved'
                              ? 'success'
                              : complaint.status === 'In Progress'
                              ? 'warning'
                              : 'error'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{complaint.assignedTo}</TableCell>
                      <TableCell>{complaint.lastUpdate}</TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setSelectedStatus(complaint.status);
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );

  const renderFeedback = () => (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Feedback Form
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Share your feedback to help us improve our services
        </Typography>
      </Box>

      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleFeedbackSubmit}>
          <Grid container spacing={3}>
            {/* Student Details */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Student Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={feedbackForm.studentDetails.name}
                onChange={(e) => setFeedbackForm({
                  ...feedbackForm,
                  studentDetails: {
                    ...feedbackForm.studentDetails,
                    name: e.target.value
                  }
                })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Roll Number"
                value={feedbackForm.studentDetails.rollNumber}
                onChange={(e) => setFeedbackForm({
                  ...feedbackForm,
                  studentDetails: {
                    ...feedbackForm.studentDetails,
                    rollNumber: e.target.value
                  }
                })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Department"
                value={feedbackForm.studentDetails.department}
                onChange={(e) => setFeedbackForm({
                  ...feedbackForm,
                  studentDetails: {
                    ...feedbackForm.studentDetails,
                    department: e.target.value
                  }
                })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Year"
                value={feedbackForm.studentDetails.year}
                onChange={(e) => setFeedbackForm({
                  ...feedbackForm,
                  studentDetails: {
                    ...feedbackForm.studentDetails,
                    year: e.target.value
                  }
                })}
                required
              />
            </Grid>

            {/* Feedback Details */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Feedback Details
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Feedback Type</InputLabel>
                <Select
                  value={feedbackForm.type}
                  label="Feedback Type"
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, type: e.target.value })}
                >
                  <MenuItem value="academic">Academic</MenuItem>
                  <MenuItem value="facilities">Facilities</MenuItem>
                  <MenuItem value="services">Services</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                value={feedbackForm.subject}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, subject: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Feedback"
                multiline
                rows={4}
                value={feedbackForm.description}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, description: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Typography variant="subtitle1" gutterBottom>
                  Rating
                </Typography>
                <Rating
                  name="feedback-rating"
                  value={feedbackForm.rating}
                  onChange={(event, newValue) => {
                    setFeedbackForm({ ...feedbackForm, rating: newValue });
                  }}
                  size="large"
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: 'primary.main',
                    },
                    '& .MuiRating-iconHover': {
                      color: 'primary.light',
                    },
                  }}
                />
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">
                    Poor
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Excellent
                  </Typography>
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={feedbackForm.anonymous}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, anonymous: e.target.checked })}
                  />
                }
                label="Submit anonymously"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Submit Feedback
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return renderDashboard();
      case 'grievance':
        return renderGrievance();
      case 'status':
        return renderStatus();
      case 'feedback':
        return renderFeedback();
      default:
        return renderDashboard();
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

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
            Student Grievance System
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
            <Avatar sx={{ width: 32, height: 32 }}>S</Avatar>
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
        <MenuItem>New complaint response</MenuItem>
        <MenuItem>Complaint status updated</MenuItem>
        <MenuItem>Feedback response received</MenuItem>
      </Menu>
    </Box>
  );
};

export default StudentPanel; 