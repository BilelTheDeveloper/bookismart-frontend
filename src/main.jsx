import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

/**
 * 🔐 THE SECURITY ENGINE (AuthProvider)
 * Provides the "Source of Truth" for user identity.
 * Bypasses localStorage and relies on HttpOnly cookies.
 */
import { AuthProvider } from './context/AuthContext'; 

/**
 * 🚀 THE THEME ENGINE (CategoryProvider)
 * Manages the aesthetic and category-based features of the platform.
 * (If you haven't renamed this yet, ensure the path is correct)
 */
// import { CategoryProvider } from './context/CategoryContext'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Step 1: AuthProvider checks identity. 
        If no user is verified, it handles the redirect safely.
    */}
    <AuthProvider>
      
      {/* Step 2: Theme/Category Engine (Uncomment when ready) 
          This allows the merchants to see their specific tools.
      */}
      {/* <CategoryProvider> */}
        
        <App />
        
      {/* </CategoryProvider> */}

    </AuthProvider>
  </StrictMode>,
);