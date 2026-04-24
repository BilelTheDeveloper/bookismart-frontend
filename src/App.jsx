import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";

// --- Components ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminGuard from "./components/AdminGuard"; 

// --- Public Pages ---
import HomeLayout from "./pages/public/Home/HomeLayout";
import HowItWorksPage from "./pages/public/HowItWorks";
import ServicesPage from "./pages/public/Services";
import ProfessionalsPage from "./pages/public/Professionals";
import ProfilePreview from "./pages/public/ProfilePreview";

// --- Onboarding & Auth ---
import SignupLayout from "./pages/public/signup/SignupLayout";
import Login from "./pages/public/auth/Login";
import OnboardingStatus from './pages/public/auth/OnboardingStatus'

// --- Admin Pages ---
import AdminLayout from "./pages/admin/AdminLayout";
import IdentityVerify from "./pages/admin/IdentityVerify";
import AdminVerification from "./pages/admin/AdminVerification.jsx";

// --- Owner Pages ---
import OwnerDashboardLayout from "./pages/owner/DashboardLayout";
import OwnerOverview from "./pages/owner/Overview";
import ThemeGallery from "./pages/owner/ThemeGallery"; 
import SetupTemplate from "./pages/owner/SetupTemplate"; 
import Billing from "./pages/owner/Billing";
import Analytics from "./pages/owner/Analytics";
import Finance from "./pages/owner/Finance";
import Appointments from "./pages/owner/Appointments";
import Customers from "./pages/owner/Customers";
import Settings from "./pages/owner/Settings";

/**
 * 🛡️ SECURITY WATCHDOG
 * This component listens for the "Security Breach" signal from our API config.
 * If a fingerprint mismatch happens, it nukes local state to stop redirect loops.
 */
function SecurityWatchdog() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSecurityBreach = () => {
      console.warn("🚨 Security Breach Detected: Cleaning session...");
      localStorage.removeItem("user");
      // Optionally don't remove device_fingerprint so the ID stays consistent
      navigate("/login?reason=security_violation");
    };

    window.addEventListener("auth-security-breach", handleSecurityBreach);
    return () => window.removeEventListener("auth-security-breach", handleSecurityBreach);
  }, [navigate]);

  return null;
}

/**
 * ScrollToTop: Reset scroll position on route change.
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
 */
const LayoutManager = ({ children }) => {
  const location = useLocation();
  
  const isSignupPage = location.pathname === "/signup";
  const isAdminPage = location.pathname.startsWith("/admin");
  const isOwnerPage = location.pathname.startsWith("/owner");
  const isProfilePreview = location.pathname.startsWith("/p/");
  
  const hideChrome = isSignupPage || isAdminPage || isOwnerPage || isProfilePreview;

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
      <SecurityWatchdog /> {/* 🛡️ Active Security Monitoring */}
      <ScrollToTop />
      <LayoutManager>
        <Routes>
          {/* --- 1. Public Routes (Always Accessible) --- */}
          <Route path="/" element={<HomeLayout />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/professionals" element={<ProfessionalsPage />} />
          <Route path="/p/:slug" element={<ProfilePreview />} />

          {/* --- 2. Auth Routes --- */}
          <Route path="/signup" element={<SignupLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding-status" element={<OnboardingStatus />} />
          
          {/* --- 3. Admin Dashboard (Locked) --- */}
          <Route 
            path="/admin" 
            element={
              <AdminGuard allowedRoles={["admin"]}>
                <AdminLayout />
              </AdminGuard>
            }
          >
            <Route path="verify-identity" element={<IdentityVerify />} />
            <Route path="dashboard" element={<div className="p-6 font-bold text-slate-800">Admin Statistics</div>} />
            <Route path="verification" element={<AdminVerification />} />
          </Route>

          {/* --- 4. Owner Dashboard (Locked) --- */}
          <Route 
            path="/owner" 
            element={
              <AdminGuard allowedRoles={["owner"]}> 
                <OwnerDashboardLayout />
              </AdminGuard>
            } 
          >
            <Route path="dashboard" element={<OwnerOverview />} />
            <Route path="dashboard/bookings" element={<Appointments />} />
            <Route path="dashboard/customers" element={<Customers />} />
            <Route path="dashboard/finance" element={<Finance />} />
            <Route path="dashboard/billing" element={<Billing />} />
            <Route path="dashboard/themes" element={<ThemeGallery />} /> 
            <Route path="theme/customize-site" element={<SetupTemplate />} />
            <Route path="dashboard/stats" element={<Analytics />} />
            <Route path="dashboard/settings" element={<Settings />} />
          </Route>
          
          {/* Fallback */}
          <Route path="*" element={<HomeLayout />} />
        </Routes>
      </LayoutManager>
    </Router>
  );
}

export default App;