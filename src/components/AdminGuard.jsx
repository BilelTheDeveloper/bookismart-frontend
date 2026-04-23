import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 🛡️ Import the Security Brain

/**
 * 🔒 ULTRA-SECURE ROLE-BASED ACCESS CONTROL (RBAC)
 * Purpose: Protects sensitive routes by verifying REAL identity from the AuthContext.
 * Logic: Bypasses localStorage entirely. If it's not in the memory state, it's not real.
 */
const AdminGuard = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  /**
   * 🚩 SECURITY GATE 1: LOADING STATE
   * While the AuthProvider is calling /verify-me, we show nothing or a spinner.
   * This prevents "Flash of Protected Content" (FPC).
   */
  if (loading) {
    return null; // The AuthProvider already handles the global spinner
  }

  /**
   * 🚩 SECURITY GATE 2: AUTHENTICATION CHECK
   * If the backend said the cookie is invalid or missing, isAuthenticated will be false.
   * We kick them to login immediately.
   */
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  /**
   * 🚩 SECURITY GATE 3: DATABASE ROLE VERIFICATION
   * We check the role that came directly from your MongoDB. 
   * A hacker can edit LocalStorage, but they cannot edit this 'user.role' object
   * because it is stored in the app's private RAM.
   */
  const hasAccess = allowedRoles.includes(user.role);

  if (!hasAccess) {
    console.error(`🚨 [SECURITY BREACH ATTEMPT]: 
      User: ${user.email} 
      Actual Role: ${user.role} 
      Target Path: ${location.pathname}
    `);
    
    // Redirect unauthorized users (e.g., an Owner trying to hit /admin)
    return <Navigate to="/unauthorized" replace />;
  }

  /**
   * ✅ SUCCESS: CLEARANCE GRANTED
   * The user is verified by the backend and holds the correct role.
   */
  return children;
};

export default AdminGuard;