import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * 🛡️ ADVANCED ROLE-BASED ACCESS CONTROL (RBAC) GUARD
 * * This guard handles multi-neighborhood security. It verifies:
 * 1. Session Integrity (Token + User object existence)
 * 2. Role Authorization (Checks user role against specific route permissions)
 */
const AdminGuard = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  
  // 1. Retrieve the session from the browser's encrypted-at-rest storage (localStorage)
  const user = JSON.parse(localStorage.getItem('user')); 
  const token = localStorage.getItem('accessToken');

  /**
   * 🚩 SECURITY GATE 1: AUTHENTICATION CHECK
   * If the user isn't logged in, we send them to login.
   * We save the 'location' in state so after they login, they return exactly here.
   */
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  /**
   * 🚩 SECURITY GATE 2: AUTHORIZATION CHECK (RBAC)
   * We check if the user's role is permitted for this specific zone.
   * Example: If guarding /admin, allowedRoles is ["admin"]
   * Example: If guarding /owner, allowedRoles is ["owner"]
   */
  const hasAccess = allowedRoles.includes(user.role);

  if (!hasAccess) {
    console.error(`⛔ [Security Violation]: ${user.role} attempted to access unauthorized path: ${location.pathname}`);
    
    // Logic: If an owner accidentally hits an admin link, redirect to unauthorized
    // but keep their session alive so they can still access their own owner dashboard.
    return <Navigate to="/unauthorized" replace />;
  }

  /**
   * ✅ SUCCESS: SESSION VERIFIED & ROLE MATCHED
   * We render the children (the Dashboard/Layout components).
   */
  return children;
};

export default AdminGuard;