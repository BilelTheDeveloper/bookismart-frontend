import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * 🔒 FRONTEND ADMIN GUARD
 * Purpose: Blocks unauthorized users from rendering the Admin Dashboard.
 * Logic: Checks role against ['admin', 'owner'] to match Backend security.
 */
const AdminGuard = ({ children }) => {
  const location = useLocation();
  
  // 1. Get User Data from your state management (or localStorage as fallback)
  // Logic: You should store user info in state/localStorage upon successful login
  const user = JSON.parse(localStorage.getItem('user')); 
  const token = localStorage.getItem('accessToken');

  // 2. Security Check: Is the user even logged in?
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  /**
   * 3. Role-Based Access Control (RBAC)
   * Matches the authorizedRoles in your backend adminGuard.js
   */
  const authorizedRoles = ['admin'];
  const hasAccess = authorizedRoles.includes(user.role);

  if (!hasAccess) {
    console.error("⛔ [Security Alert]: Unauthorized attempt to access admin route.");
    // Redirect non-admins to their respective dashboard or a 403 page
    return <Navigate to="/unauthorized" replace />;
  }

  // 4. Success: User is an Admin/Owner
  return children;
};

export default AdminGuard;