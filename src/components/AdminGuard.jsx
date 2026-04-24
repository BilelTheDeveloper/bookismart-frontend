import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

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
   * Ensures we don't accidentally leak protected UI during the initial 
   * /verify-me handshake with Redis.
   */
  if (loading) {
    return null; // AuthProvider handles the enterprise spinner
  }

  /**
   * 🚩 SECURITY GATE 2: AUTHENTICATION CHECK
   * isAuthenticated is driven by our secure HttpOnly cookie logic.
   * If the session was revoked via Redis, this becomes 'false' instantly.
   */
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  /**
   * 🚩 SECURITY GATE 3: ROLE & ACCOUNT INTEGRITY
   * We verify the 'user.role' which is kept in the app's secure memory state.
   * We also ensure the account is active before rendering children.
   */
  const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  const hasAccess = rolesArray.includes(user.role);
  const isActive = user.accountStatus === 'active';

  if (!hasAccess || !isActive) {
    // 🚨 INTERNAL FORENSICS
    console.error(`🚨 [RBAC VIOLATION]: 
      User: ${user.email} 
      Role: ${user.role} 
      Status: ${user.accountStatus}
      Path: ${location.pathname}
    `);
    
    // If authenticated but unauthorized (e.g., a 'staff' user hitting /admin),
    // we send them to /unauthorized instead of /login to prevent loops.
    return <Navigate to="/unauthorized" replace />;
  }

  /**
   * ✅ SUCCESS: CLEARANCE GRANTED
   * The identity is cryptographic, the role is authorized, and the status is active.
   */
  return children;
};

export default AdminGuard;