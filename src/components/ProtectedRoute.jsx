import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

/**
 * 🛡️ PROTECTED ADMIN ROUTE
 * This component guards admin-only pages. 
 * It relies entirely on the AuthContext (RAM) and the HttpOnly cookie handshake.
 */
const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1. ⏳ THE SYNCHRONIZATION PHASE
  // We must wait for the AuthContext to finish the '/me' check with the server.
  // Without this, 'user' is null initially, and the app would 'kick' you incorrectly.
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 2. 🔐 THE SECURITY GATE
  // We strictly check the role from the decoded user object in memory.
  if (!user || user.role !== 'admin') {
    console.warn(`🚫 [Security Guard]: Unauthorized access attempt to ${location.pathname}`);
    
    // We redirect to home and save the 'from' location so we can redirect them back 
    // after they login with the correct account if needed.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 3. ✅ ACCESS GRANTED
  // If the user exists and is an admin, render the requested page.
  return children;
};

export default ProtectedAdminRoute;