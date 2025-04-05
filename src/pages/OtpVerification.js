import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Fade,
  Zoom,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Security as SecurityIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if value is entered
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const otpValue = otp.join('');
      if (otpValue.length !== 6) {
        throw new Error('Please enter a valid OTP');
      }

      // TODO: Replace with actual API call
      const response = await fetch('http://localhost:8080/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otpValue }),
      });

      if (!response.ok) {
        throw new Error('Invalid OTP');
      }

      navigate('/reset-password');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Zoom in={mounted} timeout={500}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Fade in={mounted} timeout={800}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <SecurityIcon
                  sx={{
                    fontSize: 60,
                    color: 'primary.main',
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Verify OTP
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Please enter the 6-digit OTP sent to your email
                </Typography>
              </Box>
            </Fade>

            {error && (
              <Fade in={mounted} timeout={1000}>
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              </Fade>
            )}

            <form onSubmit={handleSubmit}>
              <Fade in={mounted} timeout={1200}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 4,
                    gap: 1,
                  }}
                >
                  {otp.map((digit, index) => (
                    <TextField
                      key={index}
                      id={`otp-input-${index}`}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      inputProps={{
                        maxLength: 1,
                        style: { textAlign: 'center' },
                      }}
                      sx={{
                        width: '50px',
                        '& input': {
                          fontSize: '24px',
                          padding: '8px',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Fade>

              <Fade in={mounted} timeout={1400}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/forgot-password')}
                    sx={{
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'rgba(33, 150, 243, 0.04)',
                      },
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: '50px',
                      boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(0,118,255,0.23)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </Button>
                </Box>
              </Fade>
            </form>
          </Paper>
        </Zoom>
      </Container>
    </Box>
  );
};

export default OTPVerification; 