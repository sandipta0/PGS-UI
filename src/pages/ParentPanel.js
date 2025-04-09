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
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Mail as GrievanceIcon,
  Assignment as StatusIcon,
  Feedback as FeedbackIcon,
  School as MentorIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Assignment as AssignmentIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { authenticateUser, getParentAuth, logoutUser } from '../utils/auth';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const drawerWidth = 240;

// Mock data for visualizations
const complaintStats = [
  { name: 'Total Complaints', value: 12 },
  { name: 'Resolved', value: 8 },
  { name: 'Pending', value: 3 },
  { name: 'In Progress', value: 1 },
];

const statusDistribution = [
  { name: 'Resolved', value: 8 },
  { name: 'Pending', value: 3 },
  { name: 'In Progress', value: 1 },
];

const COLORS = ['#4CAF50', '#FFC107', '#2196F3'];

// Sample data for complaints
const complaints = [
  {
    id: 1,
    complaintNo: 'CMP2023001',
    type: 'Academic',
    description: 'Issue with course material access',
    status: 'In Progress',
    date: '2023-01-15',
    response: 'We are looking into the issue and will update you soon.'
  },
  {
    id: 2,
    complaintNo: 'CMP2023002',
    type: 'Hostel',
    description: 'Room maintenance issue',
    status: 'Resolved',
    date: '2023-01-16',
    response: 'The maintenance work has been completed.'
  }
];

// Sample data for feedback
const feedbackList = [
  {
    id: 1,
    date: '2023-01-10',
    rating: 4,
    comment: 'Good response time and resolution.',
    response: 'Thank you for your feedback!'
  },
  {
    id: 2,
    date: '2023-01-15',
    rating: 5,
    comment: 'Excellent service and support.',
    response: 'We appreciate your kind words!'
  }
];

// Sample data for student mentor
const mentorInfo = {
  name: 'Dr. Amit Kumar',
  email: 'amit.kumar@cutm.ac.in',
  phone: '+91 9876543210',
  department: 'Computer Science',
  designation: 'Associate Professor',
  officeHours: 'Monday to Friday, 10:00 AM - 4:00 PM'
};

const ParentPanel = () => {
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
    rating: 0,
    comment: '',
    category: '',
    suggestions: '',
    recommendation: '',
    contactNumber: '',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newComplaint, setNewComplaint] = useState({
    type: '',
    description: '',
  });
  const [grievanceForm, setGrievanceForm] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    address: '',
    relationship: '',
    studentName: '',
    studentRollNumber: '',
    category: '',
    description: '',
    dateOfIncident: '',
    supportingDocuments: null,
    preferredResolution: '',
    otherCategory: ''
  });

  useEffect(() => {
    const auth = authenticateUser();
    if (!auth) {
      navigate('/login');
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
      rating: 0,
      comment: '',
      category: '',
      suggestions: '',
      recommendation: '',
      contactNumber: '',
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
    setNewComplaint({
      type: '',
      description: '',
    });
  };

  const handleSubmitComplaint = () => {
    // Handle complaint submission
    handleCloseDialog();
  };

  const handleGrievanceSubmit = (e) => {
    e.preventDefault();
    // Handle grievance submission logic here
    console.log('Grievance Form Data:', grievanceForm);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setGrievanceForm({ ...grievanceForm, supportingDocuments: file });
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, page: 'dashboard' },
    { text: 'Grievance', icon: <GrievanceIcon />, page: 'grievance' },
    { text: 'Complaint Status', icon: <StatusIcon />, page: 'status' },
    { text: 'Feedback', icon: <FeedbackIcon />, page: 'feedback' },
    { text: 'Student Mentor', icon: <MentorIcon />, page: 'mentor' },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Parent Panel
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
      <Typography variant="h4" gutterBottom>
        Parent Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', bgcolor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Complaints
              </Typography>
              <Typography variant="h4" component="div">
                12
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', bgcolor: '#e8f5e9' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Resolved
              </Typography>
              <Typography variant="h4" component="div" color="success.main">
                8
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', bgcolor: '#fff3e0' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Pending
              </Typography>
              <Typography variant="h4" component="div" color="warning.main">
                3
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h4" component="div" color="info.main">
                1
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Complaint Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Complaint Statistics
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={complaintStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4285F4" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Activity Timeline */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        <Timeline>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              10:30 am
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success">
                <CheckCircleIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle1">Complaint #1234 Resolved</Typography>
              <Typography variant="body2" color="text.secondary">
                Your complaint about hostel maintenance has been resolved
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              09:15 am
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="warning">
                <PendingIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle1">New Complaint Filed</Typography>
              <Typography variant="body2" color="text.secondary">
                Complaint #1235 about mess food quality has been filed
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              08:00 am
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="info">
                <AssignmentIcon />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle1">Complaint Assigned</Typography>
              <Typography variant="body2" color="text.secondary">
                Complaint #1236 has been assigned to Mr. John Doe
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Paper>

      {/* Existing Complaint Table */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Your Complaints</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setNewComplaintOpen(true)}
          >
            File New Complaint
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Complaint ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.map((complaint) => (
                <React.Fragment key={complaint.id}>
                  <TableRow
                    hover
                    onClick={() => handleRowClick(complaint.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{complaint.id}</TableCell>
                    <TableCell>{complaint.type}</TableCell>
                    <TableCell>
                      <Chip
                        label={complaint.status}
                        color={
                          complaint.status === 'Resolved'
                            ? 'success'
                            : complaint.status === 'Pending'
                            ? 'warning'
                            : 'info'
                        }
                      />
                    </TableCell>
                    <TableCell>{complaint.date}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleComplaintClick(complaint);
                        }}
                      >
                        {expandedRows[complaint.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {expandedRows[complaint.id] && (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Box sx={{ p: 2 }}>
                          <Typography variant="subtitle1">Details</Typography>
                          <Typography>{complaint.description}</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );

  const renderGrievance = () => (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Grievance Registration Form
        </Typography>
        <form onSubmit={handleGrievanceSubmit}>
          {/* Parent/Guardian Information */}
          <Typography variant="h6" gutterBottom sx={{ mt: 3, color: '#4285F4' }}>
            Parent/Guardian Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Full Name"
                value={grievanceForm.fullName}
                onChange={(e) => setGrievanceForm({ ...grievanceForm, fullName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Contact Number"
                value={grievanceForm.contactNumber}
                onChange={(e) => setGrievanceForm({ ...grievanceForm, contactNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email Address"
                type="email"
                value={grievanceForm.email}
                onChange={(e) => setGrievanceForm({ ...grievanceForm, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Relationship to Student</InputLabel>
                <Select
                  value={grievanceForm.relationship}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, relationship: e.target.value })}
                  label="Relationship to Student"
                >
                  <MenuItem value="mother">Mother</MenuItem>
                  <MenuItem value="father">Father</MenuItem>
                  <MenuItem value="guardian">Guardian</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                multiline
                rows={2}
                value={grievanceForm.address}
                onChange={(e) => setGrievanceForm({ ...grievanceForm, address: e.target.value })}
              />
            </Grid>
          </Grid>

          {/* Student Information */}
          <Typography variant="h6" gutterBottom sx={{ mt: 3, color: '#4285F4' }}>
            Student Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Student Name"
                value={grievanceForm.studentName}
                onChange={(e) => setGrievanceForm({ ...grievanceForm, studentName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Student's Roll Number"
                value={grievanceForm.studentRollNumber}
                onChange={(e) => setGrievanceForm({ ...grievanceForm, studentRollNumber: e.target.value })}
              />
            </Grid>
          </Grid>

          {/* Grievance Details */}
          <Typography variant="h6" gutterBottom sx={{ mt: 3, color: '#4285F4' }}>
            Grievance Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Category of Grievance</InputLabel>
                <Select
                  value={grievanceForm.category}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, category: e.target.value })}
                  label="Category of Grievance"
                >
                  <MenuItem value="academic">Academic Issues</MenuItem>
                  <MenuItem value="disciplinary">Disciplinary Concerns</MenuItem>
                  <MenuItem value="safety">Safety & Security</MenuItem>
                  <MenuItem value="teacher">Teacher/Staff Behavior</MenuItem>
                  <MenuItem value="facilities">Facilities & Infrastructure</MenuItem>
                  <MenuItem value="bullying">Bullying/Harassment</MenuItem>
                  <MenuItem value="administrative">Administrative Issues</MenuItem>
                  <MenuItem value="other">Others (Specify)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {grievanceForm.category === 'other' && (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Specify Category"
                  value={grievanceForm.otherCategory}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, otherCategory: e.target.value })}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Description of the Issue"
                multiline
                rows={4}
                value={grievanceForm.description}
                onChange={(e) => setGrievanceForm({ ...grievanceForm, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Date of Incident"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={grievanceForm.dateOfIncident}
                onChange={(e) => setGrievanceForm({ ...grievanceForm, dateOfIncident: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="file"
                label="Supporting Documents"
                InputLabelProps={{ shrink: true }}
                onChange={handleFileChange}
                helperText="Upload any relevant documents (PDF, JPG, PNG)"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Preferred Resolution"
                multiline
                rows={2}
                value={grievanceForm.preferredResolution}
                onChange={(e) => setGrievanceForm({ ...grievanceForm, preferredResolution: e.target.value })}
                helperText="Please describe how you would like this issue to be resolved"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ px: 4 }}
            >
              Submit Grievance
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );

  const renderStatus = () => (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Complaint Status
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Complaint Timeline
            </Typography>
            <Timeline>
              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                  Resolved
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="success">
                    <CheckCircleIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="subtitle1">Complaint #1234</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hostel maintenance issue resolved
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Resolved on: 2024-03-15
                  </Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                  Pending
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="warning">
                    <PendingIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="subtitle1">Complaint #1235</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mess food quality issue under review
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Filed on: 2024-03-10
                  </Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                  Pending for Assignment
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="info">
                    <AssignmentIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="subtitle1">Complaint #1236</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Academic issue waiting for assignment
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Filed on: 2024-03-05
                  </Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                  Complaint Filed
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="error">
                    <ErrorIcon />
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="subtitle1">Complaint #1237</Typography>
                  <Typography variant="body2" color="text.secondary">
                    New complaint filed about hostel facilities
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Filed on: 2024-03-01
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );

  const renderFeedback = () => (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Feedback Form
        </Typography>
        <form onSubmit={handleFeedbackSubmit}>
          {/* Overall Experience */}
          <Typography variant="h6" gutterBottom sx={{ mt: 3, color: '#4285F4' }}>
            Overall Experience
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                How would you rate your overall experience with the grievance system?
              </Typography>
              <Rating
                name="overall-rating"
                value={feedbackForm.rating}
                onChange={(event, newValue) => {
                  setFeedbackForm({ ...feedbackForm, rating: newValue });
                }}
                size="large"
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          {/* Specific Feedback */}
          <Typography variant="h6" gutterBottom sx={{ mt: 3, color: '#4285F4' }}>
            Specific Feedback
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Feedback Category</InputLabel>
                <Select
                  value={feedbackForm.category}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, category: e.target.value })}
                  label="Feedback Category"
                >
                  <MenuItem value="grievance">Grievance Handling</MenuItem>
                  <MenuItem value="response">Response Time</MenuItem>
                  <MenuItem value="communication">Communication</MenuItem>
                  <MenuItem value="resolution">Resolution Process</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Your Feedback"
                multiline
                rows={4}
                value={feedbackForm.comment}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, comment: e.target.value })}
                helperText="Please provide detailed feedback about your experience"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Suggestions for Improvement"
                multiline
                rows={3}
                value={feedbackForm.suggestions}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, suggestions: e.target.value })}
                helperText="Any suggestions to improve our services"
              />
            </Grid>
          </Grid>

          {/* Additional Information */}
          <Typography variant="h6" gutterBottom sx={{ mt: 3, color: '#4285F4' }}>
            Additional Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Would you recommend our service?</InputLabel>
                <Select
                  value={feedbackForm.recommendation}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, recommendation: e.target.value })}
                  label="Would you recommend our service?"
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                  <MenuItem value="maybe">Maybe</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number (Optional)"
                value={feedbackForm.contactNumber}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, contactNumber: e.target.value })}
                helperText="If you'd like us to follow up with you"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ px: 4 }}
            >
              Submit Feedback
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );

  const renderMentor = () => (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Student Mentor Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Name
            </Typography>
            <Typography variant="body1">{mentorInfo.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Email
            </Typography>
            <Typography variant="body1">{mentorInfo.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Phone
            </Typography>
            <Typography variant="body1">{mentorInfo.phone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Department
            </Typography>
            <Typography variant="body1">{mentorInfo.department}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Designation
            </Typography>
            <Typography variant="body1">{mentorInfo.designation}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Office Hours
            </Typography>
            <Typography variant="body1">{mentorInfo.officeHours}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
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
      case 'mentor':
        return renderMentor();
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
            <Avatar sx={{ width: 32, height: 32 }}>P</Avatar>
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
        <MenuItem>Mentor meeting scheduled</MenuItem>
        <MenuItem>Feedback response received</MenuItem>
      </Menu>

      {/* New Complaint Dialog */}
      <Dialog open={newComplaintOpen} onClose={handleNewComplaintClose} maxWidth="md" fullWidth>
        <DialogTitle>File New Complaint</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Complaint Type</InputLabel>
                <Select
                  value={complaintForm.type}
                  onChange={(e) => setComplaintForm({ ...complaintForm, type: e.target.value })}
                  label="Complaint Type"
                >
                  <MenuItem value="hostel">Hostel</MenuItem>
                  <MenuItem value="mess">Mess</MenuItem>
                  <MenuItem value="academic">Academic</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={complaintForm.description}
                onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewComplaintClose}>Cancel</Button>
          <Button onClick={handleComplaintSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Complaint Details Dialog */}
      <Dialog
        open={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Complaint Details</DialogTitle>
        <DialogContent>
          {selectedComplaint && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Complaint ID: {selectedComplaint.id}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Type: {selectedComplaint.type}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Status: {selectedComplaint.status}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Description:</Typography>
                  <Typography>{selectedComplaint.description}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedComplaint(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ParentPanel; 