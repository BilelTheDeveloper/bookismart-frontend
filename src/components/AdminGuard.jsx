import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * 🛡️ ADVANCED ROLE-BASED ACCESS CONTROL (RBAC) GUARD (Cookie-Protocol Edition)
 * Purpose: Protects sensitive routes by verifying session data and roles.
 * Logic: Relies on the HttpOnly cookie (handled by the browser) and the user profile.
 */
const AdminGuard = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  
  /**
   * 1. Retrieve the session profile.
   * Since 'accessToken' is now an HttpOnly cookie, it is NO LONGER in localStorage.
   * The existence of the 'user' object indicates an active UI session.
   */
  const user = JSON.parse(localStorage.getItem('user')); 

  /**
   * 🚩 SECURITY GATE 1: SESSION CHECK
   * If the user profile is missing, the UI session is dead.
   * We redirect to login and save the 'from' location to return after re-auth.
   */
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  /**
   * 🚩 SECURITY GATE 2: ROLE AUTHORIZATION (RBAC)
   * We verify if the user's role matches the requirements for this route.
   * Logic: 'admin' and 'owner' are handled separately.
   */
  const hasAccess = allowedRoles.includes(user.role);

  if (!hasAccess) {
    console.error(`⛔ [Security Violation]: ${user.role} attempted unauthorized access to: ${location.pathname}`);
    
    /**
     * If they are logged in but just in the wrong neighborhood (e.g., an Owner hitting Admin routes),
     * we send them to /unauthorized without killing their session.
     */
    return <Navigate to="/unauthorized" replace />;
  }

  /**
   * ✅ SUCCESS: ROLE MATCHED
   * The guard allows the components to render. 
   * Note: The actual data fetching inside these components will still be 
   * verified by the Backend using the HttpOnly cookie.
   */
  return children;
};

export default AdminGuard;