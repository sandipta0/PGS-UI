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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Mail as ComplainIcon,
  Assignment as StatusIcon,
  School as StudentsIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Close as CloseIcon,
  PersonAdd as PersonAddIcon,
  CheckCircle as CheckCircleIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const drawerWidth = 240;

// Sample data for employee's assigned complaints
const assignedComplaints = [
  {
    id: 1,
    complaintNo: 'CMP2023001',
    studentName: 'Rahul Sharma',
    mobileNo: '+91 9876543210',
    department: 'Computer Science',
    college: 'CUTM',
    complaintType: 'Academic',
    description: 'Issue with course material access',
    status: 'In Progress',
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
    status: 'Pending',
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
    date: '2023-01-17'
  }
];

// Add sample data for students with parent details
const assignedStudents = [
  {
    id: 1,
    studentName: 'Rahul Sharma',
    rollNo: 'CS2023001',
    email: 'rahul.sharma@cutm.ac.in',
    mobileNo: '+91 9876543210',
    department: 'Computer Science',
    college: 'CUTM',
    parentName: 'Rajesh Sharma',
    parentEmail: 'rajesh.sharma@gmail.com',
    parentPhone: '+91 9876543211',
    parentOccupation: 'Business',
    status: 'Active'
  },
  {
    id: 2,
    studentName: 'Priya Patel',
    rollNo: 'EC2023002',
    email: 'priya.patel@cutm.ac.in',
    mobileNo: '+91 9876543212',
    department: 'Electronics',
    college: 'CUTM',
    parentName: 'Manoj Patel',
    parentEmail: 'manoj.patel@gmail.com',
    parentPhone: '+91 9876543213',
    parentOccupation: 'Teacher',
    status: 'Active'
  },
  {
    id: 3,
    studentName: 'Amit Kumar',
    rollNo: 'ME2023003',
    email: 'amit.kumar@cutm.ac.in',
    mobileNo: '+91 9876543214',
    department: 'Mechanical',
    college: 'CUTM',
    parentName: 'Ramesh Kumar',
    parentEmail: 'ramesh.kumar@gmail.com',
    parentPhone: '+91 9876543215',
    parentOccupation: 'Engineer',
    status: 'Active'
  },
  {
    id: 4,
    studentName: 'Sneha Gupta',
    rollNo: 'CS2023004',
    email: 'sneha.gupta@cutm.ac.in',
    mobileNo: '+91 9876543216',
    department: 'Computer Science',
    college: 'CUTM',
    parentName: 'Vikram Gupta',
    parentEmail: 'vikram.gupta@gmail.com',
    parentPhone: '+91 9876543217',
    parentOccupation: 'Doctor',
    status: 'Active'
  },
  {
    id: 5,
    studentName: 'Rohan Singh',
    rollNo: 'EC2023005',
    email: 'rohan.singh@cutm.ac.in',
    mobileNo: '+91 9876543218',
    department: 'Electronics',
    college: 'CUTM',
    parentName: 'Amit Singh',
    parentEmail: 'amit.singh@gmail.com',
    parentPhone: '+91 9876543219',
    parentOccupation: 'Business',
    status: 'Active'
  },
  {
    id: 6,
    studentName: 'Neha Verma',
    rollNo: 'ME2023006',
    email: 'neha.verma@cutm.ac.in',
    mobileNo: '+91 9876543220',
    department: 'Mechanical',
    college: 'CUTM',
    parentName: 'Raj Verma',
    parentEmail: 'raj.verma@gmail.com',
    parentPhone: '+91 9876543221',
    parentOccupation: 'Engineer',
    status: 'Active'
  },
  {
    id: 7,
    studentName: 'Karan Malhotra',
    rollNo: 'CS2023007',
    email: 'karan.malhotra@cutm.ac.in',
    mobileNo: '+91 9876543222',
    department: 'Computer Science',
    college: 'CUTM',
    parentName: 'Ravi Malhotra',
    parentEmail: 'ravi.malhotra@gmail.com',
    parentPhone: '+91 9876543223',
    parentOccupation: 'Business',
    status: 'Active'
  },
  {
    id: 8,
    studentName: 'Anjali Reddy',
    rollNo: 'EC2023008',
    email: 'anjali.reddy@cutm.ac.in',
    mobileNo: '+91 9876543224',
    department: 'Electronics',
    college: 'CUTM',
    parentName: 'Suresh Reddy',
    parentEmail: 'suresh.reddy@gmail.com',
    parentPhone: '+91 9876543225',
    parentOccupation: 'Teacher',
    status: 'Active'
  },
  {
    id: 9,
    studentName: 'Vikram Joshi',
    rollNo: 'ME2023009',
    email: 'vikram.joshi@cutm.ac.in',
    mobileNo: '+91 9876543226',
    department: 'Mechanical',
    college: 'CUTM',
    parentName: 'Prakash Joshi',
    parentEmail: 'prakash.joshi@gmail.com',
    parentPhone: '+91 9876543227',
    parentOccupation: 'Engineer',
    status: 'Active'
  },
  {
    id: 10,
    studentName: 'Divya Kapoor',
    rollNo: 'CS2023010',
    email: 'divya.kapoor@cutm.ac.in',
    mobileNo: '+91 9876543228',
    department: 'Computer Science',
    college: 'CUTM',
    parentName: 'Rahul Kapoor',
    parentEmail: 'rahul.kapoor@gmail.com',
    parentPhone: '+91 9876543229',
    parentOccupation: 'Doctor',
    status: 'Active'
  }
];

const EmployeePanel = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [actionAnchorEl, setActionAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('complaintNo');
  const [selectedComplaints, setSelectedComplaints] = useState({});
  const [showAssignedOnly, setShowAssignedOnly] = useState(false);
  const [expandedStudent, setExpandedStudent] = useState(null);
  
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
    localStorage.removeItem('employeeAuth');
    navigate('/login');
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
    if (action === 'resolve') {
      // Handle resolve action
      console.log('Resolve complaint:', selectedComplaint.id);
    }
    handleActionClose();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  const handleRadioChange = (complaintId) => {
    setSelectedComplaints(prev => ({
      ...prev,
      [complaintId]: !prev[complaintId]
    }));
  };

  const handleAssignToMe = () => {
    const selectedIds = Object.entries(selectedComplaints)
      .filter(([_, isSelected]) => isSelected)
      .map(([id]) => id);
    console.log('Assigning complaints:', selectedIds);
    setShowAssignedOnly(true);
    // Add your assignment logic here
  };

  const handleStudentClick = (studentId) => {
    setExpandedStudent(expandedStudent === studentId ? null : studentId);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, page: 'dashboard' },
    { text: 'Complaint Inbox', icon: <ComplainIcon />, page: 'complaints' },
    { text: 'Complaint Status', icon: <StatusIcon />, page: 'status' },
    { text: 'Students', icon: <StudentsIcon />, page: 'students' },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Employee Panel
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
    // Prepare data for charts
    const complaintTypes = ['Academic', 'Hostel', 'Transport', 'Security', 'Other'];
    const complaintCounts = [5, 3, 2, 1, 1];
    const monthlyData = [3, 5, 2, 4, 6, 3, 2, 4, 5, 3, 4, 2];
    const statusData = {
      labels: ['Pending', 'In Progress', 'Resolved'],
      data: [
        assignedComplaints.filter(c => c.status === 'Pending').length,
        assignedComplaints.filter(c => c.status === 'In Progress').length,
        assignedComplaints.filter(c => c.status === 'Resolved').length
      ]
    };

    const barChartData = {
      labels: complaintTypes,
      datasets: [
        {
          label: 'Complaints by Type',
          data: complaintCounts,
          backgroundColor: [
            'rgba(66, 133, 244, 0.8)',
            'rgba(52, 168, 83, 0.8)',
            'rgba(251, 188, 5, 0.8)',
            'rgba(234, 67, 53, 0.8)',
            'rgba(168, 168, 168, 0.8)',
          ],
          borderColor: [
            'rgba(66, 133, 244, 1)',
            'rgba(52, 168, 83, 1)',
            'rgba(251, 188, 5, 1)',
            'rgba(234, 67, 53, 1)',
            'rgba(168, 168, 168, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const doughnutChartData = {
      labels: statusData.labels,
      datasets: [
        {
          data: statusData.data,
          backgroundColor: [
            'rgba(234, 67, 53, 0.8)',
            'rgba(251, 188, 5, 0.8)',
            'rgba(52, 168, 83, 0.8)',
          ],
          borderColor: [
            'rgba(234, 67, 53, 1)',
            'rgba(251, 188, 5, 1)',
            'rgba(52, 168, 83, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const lineChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Monthly Complaints',
          data: monthlyData,
          fill: false,
          backgroundColor: 'rgba(66, 133, 244, 0.8)',
          borderColor: 'rgba(66, 133, 244, 1)',
          tension: 0.1,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    };

    return (
      <>
        <Typography variant="h5" gutterBottom>
          Dashboard Overview
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#fff', boxShadow: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  TOTAL COMPLAINTS
                </Typography>
                <Typography variant="h4">{assignedComplaints.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#fff', boxShadow: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  PENDING COMPLAINTS
                </Typography>
                <Typography variant="h4">
                  {assignedComplaints.filter(c => c.status === 'Pending').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#fff', boxShadow: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  IN PROGRESS
                </Typography>
                <Typography variant="h4">
                  {assignedComplaints.filter(c => c.status === 'In Progress').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#fff', boxShadow: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  RESOLVED
                </Typography>
                <Typography variant="h4">
                  {assignedComplaints.filter(c => c.status === 'Resolved').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, boxShadow: 2, height: '400px' }}>
              <Typography variant="h6" gutterBottom>
                Complaints by Type
              </Typography>
              <Box sx={{ height: '300px' }}>
                <Bar data={barChartData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, boxShadow: 2, height: '400px' }}>
              <Typography variant="h6" gutterBottom>
                Complaint Status Distribution
              </Typography>
              <Box sx={{ height: '300px' }}>
                <Doughnut data={doughnutChartData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, boxShadow: 2, height: '400px' }}>
              <Typography variant="h6" gutterBottom>
                Monthly Complaint Trends
              </Typography>
              <Box sx={{ height: '300px' }}>
                <Line data={lineChartData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Recent Complaints
        </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Complaint No.</TableCell>
                <TableCell>Student Details</TableCell>
                <TableCell>Complaint Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignedComplaints.map((complaint) => (
                <TableRow 
                  key={complaint.id} 
                  hover
                  onClick={() => handleComplaintClick(complaint)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{complaint.complaintNo}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2">{complaint.studentName}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {complaint.mobileNo}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{complaint.complaintType}</TableCell>
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
                    {new Date(complaint.date).toLocaleDateString('en-GB')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
    const filteredComplaints = assignedComplaints.filter(complaint => {
      // First filter by search term
      const matchesSearch = !searchTerm || 
        (searchBy === 'complaintNo' && complaint.complaintNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (searchBy === 'mobileNo' && complaint.mobileNo.includes(searchTerm));

      // Then filter by assigned status if showAssignedOnly is true
      if (showAssignedOnly) {
        return matchesSearch && selectedComplaints[complaint.id];
      }
      return matchesSearch;
    });

    return (
      <>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Complaint Inbox
          </Typography>
        </Box>

        <Paper sx={{ p: 3, mb: 4, boxShadow: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Search By</InputLabel>
                <Select
                  value={searchBy}
                  onChange={handleSearchByChange}
                  label="Search By"
                >
                  <MenuItem value="complaintNo">Complaint Number</MenuItem>
                  <MenuItem value="mobileNo">Mobile Number</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder={`Search by ${searchBy === 'complaintNo' ? 'Complaint Number' : 'Mobile Number'}`}
              />
            </Grid>
          </Grid>
        </Paper>

        {renderComplaintSummary()}

        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Assign</TableCell>
                <TableCell>Complaint No.</TableCell>
                <TableCell>Student Details</TableCell>
                <TableCell>Mobile No.</TableCell>
                <TableCell>Complaint Type</TableCell>
                <TableCell>Description</TableCell>
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
                    <Radio
                      checked={selectedComplaints[complaint.id] || false}
                      onChange={() => handleRadioChange(complaint.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell>{complaint.complaintNo}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2">{complaint.studentName}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {complaint.mobileNo}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{complaint.mobileNo}</TableCell>
                  <TableCell>{complaint.complaintType}</TableCell>
                  <TableCell>{complaint.description}</TableCell>
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
                    {new Date(complaint.date).toLocaleDateString('en-GB')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setShowAssignedOnly(false);
              setSelectedComplaints({});
            }}
            disabled={!showAssignedOnly}
          >
            Show All Complaints
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonAddIcon />}
            onClick={handleAssignToMe}
            disabled={!Object.values(selectedComplaints).some(Boolean)}
          >
            Assign to Me
          </Button>
        </Box>
      </>
    );
  };

  const renderStatus = () => {
    const selectedComplaint = assignedComplaints[0]; // For demo, using first complaint

    return (
      <>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Complaint Status
          </Typography>
        </Box>

        <Paper sx={{ p: 3, mb: 4, boxShadow: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Timeline position="alternate">
                <TimelineItem>
                  <TimelineOppositeContent color="text.secondary">
                    {new Date(selectedComplaint.date).toLocaleDateString()}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="success" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="h6" component="span">
                      Complaint Resolved
                    </Typography>
                    <Typography>Complaint has been successfully resolved</Typography>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineOppositeContent color="text.secondary">
                    {new Date(selectedComplaint.date).toLocaleDateString()}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="warning" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="h6" component="span">
                      In Progress
                    </Typography>
                    <Typography>Complaint is being processed</Typography>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineOppositeContent color="text.secondary">
                    {new Date(selectedComplaint.date).toLocaleDateString()}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="error" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="h6" component="span">
                      Pending for Assignment
                    </Typography>
                    <Typography>Waiting for employee assignment</Typography>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineOppositeContent color="text.secondary">
                    {new Date(selectedComplaint.date).toLocaleDateString()}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="h6" component="span">
                      Complaint Filed
                    </Typography>
                    <Typography>Initial complaint submission</Typography>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Complaint Details
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Complaint Number
                  </Typography>
                  <Typography variant="body1">{selectedComplaint.complaintNo}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Student Name
                  </Typography>
                  <Typography variant="body1">{selectedComplaint.studentName}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Complaint Type
                  </Typography>
                  <Typography variant="body1">{selectedComplaint.complaintType}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Description
                  </Typography>
                  <Typography variant="body1">{selectedComplaint.description}</Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleActionClick}
                    startIcon={<SettingsIcon />}
                    fullWidth
                  >
                    Take Action
                  </Button>
                  <Menu
                    anchorEl={actionAnchorEl}
                    open={Boolean(actionAnchorEl)}
                    onClose={handleActionClose}
                  >
                    <MenuItem onClick={() => handleActionSelect('assign')}>
                      <ListItemIcon>
                        <PersonAddIcon fontSize="small" />
                      </ListItemIcon>
                      Assign
                    </MenuItem>
                    <MenuItem onClick={() => handleActionSelect('resolve')}>
                      <ListItemIcon>
                        <CheckCircleIcon fontSize="small" />
                      </ListItemIcon>
                      Resolve
                    </MenuItem>
                  </Menu>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  };

  const renderStudents = () => {
    return (
      <>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Assigned Students
          </Typography>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Student Details</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>College</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignedStudents.map((student) => (
                <React.Fragment key={student.id}>
                  <TableRow 
                    hover 
                    onClick={() => handleStudentClick(student.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2">{student.studentName}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          Roll No: {student.rollNo}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">{student.email}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {student.mobileNo}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.college}</TableCell>
                    <TableCell>
                      <Chip
                        label={student.status}
                        size="small"
                        sx={{
                          backgroundColor: '#e8f5e9',
                          color: '#2e7d32',
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  {expandedStudent === student.id && (
                    <TableRow>
                      <TableCell colSpan={5} sx={{ backgroundColor: '#fafafa' }}>
                        <Box sx={{ p: 2 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            Parent Details
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" color="textSecondary">
                                Parent Name
                              </Typography>
                              <Typography variant="body1">{student.parentName}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" color="textSecondary">
                                Email
                              </Typography>
                              <Typography variant="body1">{student.parentEmail}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" color="textSecondary">
                                Phone
                              </Typography>
                              <Typography variant="body1">{student.parentPhone}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" color="textSecondary">
                                Occupation
                              </Typography>
                              <Typography variant="body1">{student.parentOccupation}</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
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
      case 'complaints':
        return renderComplaints();
      case 'status':
        return renderStatus();
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
            <Avatar sx={{ width: 32, height: 32 }}>E</Avatar>
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
        <MenuItem>New complaint assigned</MenuItem>
        <MenuItem>Complaint status updated</MenuItem>
        <MenuItem>New student registered</MenuItem>
        <MenuItem>System update available</MenuItem>
      </Menu>
    </Box>
  );
};

export default EmployeePanel; 