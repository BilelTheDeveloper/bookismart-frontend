import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// 🔐 IMPORT THE SECURITY ENGINE
// This holds the user's login state in memory (Super Secure)
import { AuthProvider } from './context/AuthContext';

// 🚀 IMPORT THE THEME ENGINE
// This allows the entire app to react to the merchant's category
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 🔐 First, we handle the Security/User session */}
    <AuthProvider>
      {/* 🎩 Then, we handle the Visual Theme based on that user */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);