import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ Import your Auth Hook

const ProtectedAdminRoute = ({ children }) => {
  // ✅ Get the user and loading state from the Context (Memory), NOT LocalStorage
  const { user, loading } = useAuth();

  // 1. 🛡️ WAIT for the server. 
  // If we don't wait, 'user' is null for a split second and you get kicked.
  if (loading) {
    return null; // Or a loading spinner
  }

  // 2. 🛡️ SECURE CHECK
  // We don't check for 'token' anymore because the token is a hidden cookie.
  // We only check if the user exists in memory and if they are an admin.
  if (!user || user.role !== 'admin') {
    console.warn("🚫 Access Denied: Not an Admin");
    return <Navigate to="/" replace />;
  }

  // 3. ✅ SUCCESS
  return children;
};

export default ProtectedAdminRoute;