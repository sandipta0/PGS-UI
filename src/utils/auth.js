// utils/auth.js
export const authenticateUser = async (email, password) => {
  try {
    const response = await fetch('http://localhost:8088/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Store full user data
      localStorage.setItem('userAuth', JSON.stringify({
        token: data.token,
        email: data.email,
        role: data.role.toLowerCase(),
        // Include any other necessary user info
      }));

      // Determine redirect path based on role
      const redirectPath = getRedirectPathByRole(data.role.toLowerCase());

      return {
        success: true,
        data,
        redirectTo: redirectPath
      };
    }

    return {
      success: false,
      message: data.message || 'Login failed'
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      success: false,
      message: 'An error occurred during login'
    };
  }
};

// Helper function to get redirect path
export const getRedirectPathByRole = (role) => {
  const rolePathMap = {
    'admin': '/admin/dashboard',
    'student': '/student/dashboard',
    'parent': '/parent/dashboard',
    'employee': '/employee/dashboard',
    'superadmin': '/superadmin/dashboard'
  };

  return rolePathMap[role] || '/dashboard';
};

// Get current user
export const getCurrentUser = () => {
  const auth = localStorage.getItem('userAuth');
  return auth ? JSON.parse(auth) : null;
};

// Logout utility
export const logoutUser = () => {
  localStorage.removeItem('userAuth');
  window.location.href = '/login';
};