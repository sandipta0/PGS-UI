import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  LinearProgress,
  Link,
  Paper,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon, Description as DescriptionIcon, GetApp as GetAppIcon } from '@mui/icons-material';

const BulkEmployeeUpload = ({ open, handleClose, onSubmit }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const allowedFileTypes = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv'
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (allowedFileTypes.includes(file.type)) {
        setSelectedFile(file);
        setError('');
      } else {
        setError('Please upload only Excel or CSV files');
        setSelectedFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500);

    try {
      // Here you would normally send the file to your server
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      // await axios.post('/api/bulk-upload-employees', formData);

      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      onSubmit(selectedFile);
      handleClose();
      clearInterval(interval);
    } catch (err) {
      setError('Error uploading file. Please try again.');
      clearInterval(interval);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const downloadTemplate = () => {
    // In a real application, this would be a link to your template file
    console.log('Downloading template...');
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Bulk Upload Employees</Typography>
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Upload multiple employees using a CSV or Excel file.
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Please ensure your file follows the required format.
          </Typography>
          <Button
            variant="outlined"
            startIcon={<GetAppIcon />}
            onClick={downloadTemplate}
            sx={{ mt: 1 }}
          >
            Download Template
          </Button>
        </Box>

        <Paper
          variant="outlined"
          sx={{
            p: 3,
            textAlign: 'center',
            cursor: 'pointer',
            bgcolor: '#f8f8f8',
            '&:hover': { bgcolor: '#f0f0f0' },
          }}
          onClick={() => document.getElementById('file-input').click()}
        >
          <input
            type="file"
            id="file-input"
            hidden
            accept=".csv,.xlsx,.xls"
            onChange={handleFileSelect}
          />
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="body1" gutterBottom>
            Drag and drop your file here or click to browse
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Supported formats: .csv, .xlsx, .xls
          </Typography>
        </Paper>

        {selectedFile && (
          <Box sx={{ mt: 2 }}>
            <Paper sx={{ p: 2, bgcolor: '#f8f8f8' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DescriptionIcon color="primary" />
                <Typography variant="body2">
                  {selectedFile.name}
                </Typography>
              </Box>
            </Paper>
          </Box>
        )}

        {uploading && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress variant="determinate" value={uploadProgress} />
            <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1 }}>
              Uploading... {uploadProgress}%
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Important Notes:
          </Typography>
          <Typography variant="body2" color="textSecondary">
            • Ensure all required fields are filled in the template<br />
            • Maximum file size: 5MB<br />
            • For large files, the upload might take a few minutes<br />
            • Duplicate employee IDs will be flagged
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BulkEmployeeUpload;