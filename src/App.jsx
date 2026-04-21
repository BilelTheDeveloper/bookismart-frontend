import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// --- Components ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// --- Public Pages ---
import HomeLayout from "./pages/public/Home/HomeLayout";
import HowItWorksPage from "./pages/public/HowItWorks";
import ServicesPage from "./pages/public/Services";
import ProfessionalsPage from "./pages/public/Professionals";

// --- New Onboarding & Auth Pages ---
import SignupLayout from "./pages/public/signup/SignupLayout";
import Login from "./pages/public/auth/Login";
import OnboardingStatus from './pages/public/auth/OnboardingStatus'
// --- Admin Pages & Layout (Rule 3) ---
import AdminLayout from "./pages/admin/AdminLayout";
import IdentityVerify from "./pages/admin/IdentityVerify";



import OwnerDashboard from "./pages/owner/Dashboard";
/**
 * ScrollToTop: Ensures every route change starts at the top of the page.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * LayoutManager: Automatically hides Navbar/Footer on specific routes.
 * Hidden on: /signup and any route starting with /admin
 */
const LayoutManager = ({ children }) => {
  const location = useLocation();
  const isSignupPage = location.pathname === "/signup";
  const isAdminPage = location.pathname.startsWith("/admin");
  
  const hideChrome = isSignupPage || isAdminPage;

  return (
    <>
      {!hideChrome && <Navbar />}
      <main className={!hideChrome ? "min-h-screen" : ""}>
        {children}
      </main>
      {!hideChrome && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <LayoutManager>
        <Routes>
          {/* --- 1. Public Routes --- */}
          <Route path="/" element={<HomeLayout />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/professionals" element={<ProfessionalsPage />} />

          {/* --- 2. Advanced Onboarding (5 Steps) --- */}
          <Route path="/signup" element={<SignupLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding-status" element={<OnboardingStatus />} />
          
          {/* --- 3. Admin Dashboard & KYC Review (Nested) --- */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* These routes render inside AdminLayout's <Outlet /> */}
            <Route path="verify-identity" element={<IdentityVerify />} />
            <Route path="dashboard" element={<div className="font-bold">Admin Statistics Coming Soon</div>} />
          </Route>
          {/* --- 4. Owner Dashboard (Nested) --- */}
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          
          {/* Fallback Redirect */}
          <Route path="*" element={<HomeLayout />} />
        </Routes>
      </LayoutManager>
    </Router>
  );
}

export default App;