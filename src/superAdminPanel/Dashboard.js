import {
  Box, 
  Paper,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
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
  } from "recharts";

const DashboardManagement = () => {
 
  // Sample data for charts

  const userGrowthData = [
    { month: "Jan", users: 400 },
    { month: "Feb", users: 450 },
    { month: "Mar", users: 500 },
    { month: "Apr", users: 520 },
    { month: "May", users: 530 },
    { month: "Jun", users: 550 },
  ];

  const departmentDistribution = [
    { name: "Academic", value: 30 },
    { name: "Administration", value: 25 },
    { name: "Finance", value: 20 },
    { name: "Student Affairs", value: 15 },
    { name: "IT", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const complaintStatusData = [
    { status: "Resolved", count: 45 },
    { status: "Pending", count: 20 },
    { status: "In Progress", count: 15 },
    { status: "New", count: 10 },
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
                     <Line
                       type="monotone"
                       dataKey="users"
                       stroke="#8884d8"
                       activeDot={{ r: 8 }}
                     />
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
                       label={({ name, percent }) =>
                         `${name} ${(percent * 100).toFixed(0)}%`
                       }
                     >
                       {departmentDistribution.map((entry, index) => (
                         <Cell
                           key={`cell-${index}`}
                           fill={COLORS[index % COLORS.length]}
                         />
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
   
export default DashboardManagement;
