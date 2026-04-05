import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import HomeLayout from "./pages/public/Home/HomeLayout";
import HowItWorksPage from "./pages/public/HowItWorks";
import ServicesPage from "./pages/public/Services";
import ProfessionalsPage from "./pages/public/Professionals";
import JoinAsOwner from "./pages/public/signup/JoinAsOwner";
import LoginPage from "./pages/public/Login";

// Admin Pages (New)
import AdminDashboard from "./pages/admin/Dashboard";
import UserVerification from "./pages/admin/UserVerification";
// Helper component to conditionally show/hide Layout elements
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  // Hide Navbar/Footer if the path starts with /admin
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!isAdminPath && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminPath && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<HomeLayout />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/professionals" element={<ProfessionalsPage />} />
          <Route path="/join-as-owner" element={<JoinAsOwner />} />
          <Route path="/login" element={<LoginPage />} />

          {/* --- Admin Routes --- */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/verification" element={<UserVerification />} />
          {/* You can add more admin sub-routes here later like /admin/kyc */}
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;