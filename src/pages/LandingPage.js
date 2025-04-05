import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TimelineIcon from '@mui/icons-material/Timeline';

// Background images array
const backgroundImages = [
  '/images/bg1.svg',
  '/images/bg2.svg',
  '/images/bg3.svg',
  '/images/bg4.svg',
  '/images/bg5.svg',
];

const features = [
  {
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    title: 'Easy Submission',
    description: 'Submit your grievances quickly and easily through our user-friendly platform.',
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    title: 'Secure Platform',
    description: 'Your data is protected with industry-standard security measures.',
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
    title: '24/7 Support',
    description: 'Get assistance anytime with our round-the-clock support system.',
  },
  {
    icon: <TimelineIcon sx={{ fontSize: 40 }} />,
    title: 'Real-time Tracking',
    description: 'Track the status of your grievances in real-time.',
  },
];

const LandingPage = () => {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to change background image
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      {/* Hero Section with Dynamic Background */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'opacity 1s ease-in-out',
            opacity: 0.7,
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                Parent Grievance System
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                Your voice matters. Submit and track grievances effortlessly.
              </Typography>
              <Button
                component={RouterLink}
                to="/signup"
                variant="contained"
                color="primary"
                size="large"
                sx={{ 
                  mr: 2,
                  background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #3367d6 0%, #2d9246 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Sign Up
              </Button>
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                sx={{ 
                  color: 'white', 
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
                size="large"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Why Choose Us?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{ mb: 4, fontWeight: 700 }}
          >
            Ready to Get Started?
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Join thousands of parents who trust our platform for their grievance management needs.
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              component={RouterLink}
              to="/signup"
              variant="contained"
              color="primary"
              size="large"
              sx={{ 
                mr: 2,
                background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #3367d6 0%, #2d9246 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Sign Up Now
            </Button>
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              color="primary"
              size="large"
              sx={{
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Login
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage; 