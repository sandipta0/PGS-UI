// Parent authentication
export const authenticateParent = (email, password) => {
  console.log('Attempting parent login with:', { email, password });
  if (email.toLowerCase() === 'debasis@gmail.com' && password === 'Deba@123') {
    const parentData = {
      id: 'P001',
      name: 'Debasis Das',
      email: email.toLowerCase(),
      role: 'parent',
      studentName: 'Rahul Sharma',
      studentRollNo: 'CS2023001',
      studentDepartment: 'Computer Science',
      studentCollege: 'CUTM'
    };
    localStorage.setItem('userAuth', JSON.stringify(parentData));
    return { success: true, data: parentData };
  }
  return { success: false, message: 'Invalid email or password' };
};

// Employee authentication
export const authenticateEmployee = (email, password) => {
  if (email.toLowerCase() === 'dibya@gmail.com' && password === 'dibya@123') {
    const employeeData = {
      id: 'E001',
      name: 'Dibya',
      email: email.toLowerCase(),
      role: 'employee',
      department: 'Grievance',
      designation: 'Grievance Officer'
    };
    localStorage.setItem('userAuth', JSON.stringify(employeeData));
    return { success: true, data: employeeData };
  }
  return { success: false, message: 'Invalid email or password' };
};

// Admin authentication
export const authenticateAdmin = (email, password) => {
  if (email.toLowerCase() === 'vishnu@gmail.com' && password === 'Vishnu@123') {
    const adminData = {
      id: 'A001',
      name: 'Vishnu',
      email: email.toLowerCase(),
      role: 'admin'
    };
    localStorage.setItem('userAuth', JSON.stringify(adminData));
    return { success: true, data: adminData };
  }
  return { success: false, message: 'Invalid email or password' };
};

// SuperAdmin authentication
export const authenticateSuperAdmin = (email, password) => {
  console.log('SuperAdmin login attempt:', { email, password });
  if (email.toLowerCase() === 'superadmin@gmail.com' && password === 'SuperAdmin@123') {
    const superAdminData = {
      id: 'SA001',
      name: 'Super Admin',
      email: email.toLowerCase(),
      role: 'superadmin'
    };
    localStorage.setItem('userAuth', JSON.stringify(superAdminData));
    console.log('SuperAdmin login successful:', superAdminData);
    return { success: true, data: superAdminData };
  }
  console.log('SuperAdmin login failed: Invalid credentials');
  return { success: false, message: 'Invalid credentials' };
};

// Student authentication
export const authenticateStudent = (email, password) => {
  console.log('Student login attempt:', email);
  if (email.toLowerCase() === 'sandeep@gmail.com' && password === 'Sandip@123') {
    const studentData = {
      id: 'STU001',
      name: 'Sandeep',
      email: email.toLowerCase(),
      role: 'student'
    };
    localStorage.setItem('userAuth', JSON.stringify(studentData));
    return { success: true, data: studentData };
  }
  return { success: false, message: 'Invalid email or password' };
};

// Common auth check functions
export const getParentAuth = () => {
  const auth = localStorage.getItem('userAuth');
  if (auth) {
    const data = JSON.parse(auth);
    return data.role === 'parent' ? data : null;
  }
  return null;
};

export const getEmployeeAuth = () => {
  const auth = localStorage.getItem('userAuth');
  if (auth) {
    const data = JSON.parse(auth);
    return data.role === 'employee' ? data : null;
  }
  return null;
};

export const getAdminAuth = () => {
  const auth = localStorage.getItem('userAuth');
  if (auth) {
    const data = JSON.parse(auth);
    return data.role === 'admin' ? data : null;
  }
  return null;
};

export const getSuperAdminAuth = () => {
  const auth = localStorage.getItem('userAuth');
  if (auth) {
    const data = JSON.parse(auth);
    return data.role === 'superadmin' ? data : null;
  }
  return null;
};

export const getStudentAuth = () => {
  const auth = localStorage.getItem('userAuth');
  if (auth) {
    const data = JSON.parse(auth);
    return data.role === 'student' ? data : null;
  }
  return null;
};

// Common logout function
export const logoutUser = () => {
  localStorage.removeItem('userAuth');
  console.log('User logged out');
}; 