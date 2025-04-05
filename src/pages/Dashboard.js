import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
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
  AreaChart,
  Area,
} from 'recharts';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  Timeline as TimelineIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';

// Sample data for charts
const monthlyGrievanceData = [
  { name: 'Jan', total: 20, resolved: 12, pending: 5, inProgress: 3 },
  { name: 'Feb', total: 26, resolved: 15, pending: 7, inProgress: 4 },
  { name: 'Mar', total: 29, resolved: 18, pending: 6, inProgress: 5 },
  { name: 'Apr', total: 34, resolved: 20, pending: 8, inProgress: 6 },
  { name: 'May', total: 38, resolved: 22, pending: 9, inProgress: 7 },
  { name: 'Jun', total: 43, resolved: 25, pending: 10, inProgress: 8 },
];

const categoryData = [
  { name: 'Academic', value: 35, color: '#0088FE' },
  { name: 'Administrative', value: 25, color: '#00C49F' },
  { name: 'Infrastructure', value: 20, color: '#FFBB28' },
  { name: 'Other', value: 20, color: '#FF8042' },
];

const resolutionTimeData = [
  { name: 'Week 1', time: 5 },
  { name: 'Week 2', time: 4 },
  { name: 'Week 3', time: 3 },
  { name: 'Week 4', time: 2 },
  { name: 'Week 5', time: 2 },
  { name: 'Week 6', time: 1 },
];

const recentGrievances = [
  { id: 1, title: 'Library Book Availability', status: 'Resolved', date: '2024-03-15' },
  { id: 2, title: 'Classroom Maintenance', status: 'In Progress', date: '2024-03-14' },
  { id: 3, title: 'Exam Schedule', status: 'Pending', date: '2024-03-13' },
  { id: 4, title: 'Transportation Issue', status: 'Resolved', date: '2024-03-12' },
];

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e3f2fd', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PeopleIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Total Students</Typography>
                  <Typography variant="h4">1,234</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#f3e5f5', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AssignmentIcon sx={{ fontSize: 40, color: '#9c27b0', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Active Grievances</Typography>
                  <Typography variant="h4">45</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e8f5e9', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon sx={{ fontSize: 40, color: '#2e7d32', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Resolved</Typography>
                  <Typography variant="h4">120</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff3e0', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ fontSize: 40, color: '#f57c00', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Resolution Rate</Typography>
                  <Typography variant="h4">85%</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Monthly Grievance Trends */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TimelineIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Monthly Grievance Trends</Typography>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyGrievanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="resolved" fill="#2e7d32" name="Resolved" />
                <Bar dataKey="pending" fill="#f57c00" name="Pending" />
                <Bar dataKey="inProgress" fill="#1976d2" name="In Progress" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Grievance Categories */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Grievance Categories</Typography>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Resolution Time Trend */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TimelineIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Average Resolution Time (Days)</Typography>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={resolutionTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="time"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Grievances */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AssignmentIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Recent Grievances</Typography>
            </Box>
            <List>
              {recentGrievances.map((grievance) => (
                <React.Fragment key={grievance.id}>
                  <ListItem>
                    <ListItemIcon>
                      {grievance.status === 'Resolved' ? (
                        <CheckCircleIcon color="success" />
                      ) : grievance.status === 'In Progress' ? (
                        <WarningIcon color="warning" />
                      ) : (
                        <AssignmentIcon color="action" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={grievance.title}
                      secondary={`Status: ${grievance.status} - ${grievance.date}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 