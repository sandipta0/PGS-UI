import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Avatar,
  Link,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { authenticateUser } from "../utils/auth";
import { School as SchoolIcon } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for remembered credentials
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const isRemembered = localStorage.getItem("rememberMe") === "true";

    if (rememberedEmail && isRemembered) {
      setFormData((prev) => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { email, password, rememberMe } = formData;
      const trimmedEmail = email.trim();

      // Handle remember me
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", trimmedEmail);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberMe");
      }

      const response = await authenticateUser(trimmedEmail, password);

      if (response.success) {
        console.log("Login successful:", response.data);

        // Navigate to the appropriate dashboard

        const redirectTo = response.redirectTo;

        navigate(redirectTo, { replace: true });
      } else {
        setError(response.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);

      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #4285F4 0%, #34A853 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            'url("https://www.transparenttextures.com/patterns/cubes.png")',
          opacity: 0.1,
        },
      }}
    >
      {/* Your existing decorative elements */}

      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: "linear-gradient(90deg, #4285F4, #34A853)",
            },
          }}
        >
          {/* Logo and Title */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                margin: "0 auto 16px",
                background: "linear-gradient(135deg, #4285F4 0%, #34A853 100%)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                animation: "scaleIn 0.5s ease-out",
              }}
            >
              <SchoolIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom>
              School Portal
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in to access your dashboard
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="email"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="current-password"
              sx={{ mb: 2 }}
            />

            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 3 }}
            >
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
              </Grid>
              <Grid item>
                <Link
                  href="/forgot-password"
                  variant="body2"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                mt: 2,
                background: "linear-gradient(135deg, #4285F4 0%, #34A853 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #3367d6 0%, #2d9246 100%)",
                },
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
