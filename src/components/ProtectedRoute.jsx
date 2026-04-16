import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  // Get user data from wherever you store it (localStorage or AuthContext)
  const user = JSON.parse(localStorage.getItem('user')); 
  const token = localStorage.getItem('token');

  // If there is no token, or the user isn't an admin, send them home
  if (!token || !user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // If they are an admin, let them through
  return children;
};

export default ProtectedAdminRoute;