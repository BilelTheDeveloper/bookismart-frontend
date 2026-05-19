import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// i18n — only loaded when VITE_I18N_ENABLED=true
if (import.meta.env.VITE_I18N_ENABLED === 'true') {
  await import('./i18n/index.js');
}

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
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </AuthProvider>
  </StrictMode>,
);

// PWA: register service worker (production only)
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}