import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// 🔐 IMPORT THE SECURITY ENGINE
// This holds the user's login state in memory (Super Secure)


// 🚀 IMPORT THE THEME ENGINE
// This allows the entire app to react to the merchant's category


createRoot(document.getElementById('root')).render(
  <StrictMode>


        <App />


  </StrictMode>,
);