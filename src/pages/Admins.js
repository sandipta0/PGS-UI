import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';

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

const Admins = () => {
  const handleEdit = (id) => {
    console.log('Edit admin:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete admin:', id);
  };

  return (
    <Box sx={{ p: 3 }}>
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
    </Box>
  );
};

export default Admins; 