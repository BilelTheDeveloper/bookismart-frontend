import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// --- Components ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminGuard from "./components/AdminGuard"; 

// --- Public Pages ---
import HomeLayout from "./pages/public/Home/HomeLayout";
import HowItWorksPage from "./pages/public/HowItWorks";
import ServicesPage from "./pages/public/Services";
import ProfessionalsPage from "./pages/public/Professionals";
import ProfilePreview from "./pages/public/ProfilePreview"; // <--- Added the Preview Engine

// --- New Onboarding & Auth Pages ---
import SignupLayout from "./pages/public/signup/SignupLayout";
import Login from "./pages/public/auth/Login";
import OnboardingStatus from './pages/public/auth/OnboardingStatus'

// --- Admin Pages & Layout ---
import AdminLayout from "./pages/admin/AdminLayout";
import IdentityVerify from "./pages/admin/IdentityVerify";

// --- Owner Pages & Layout ---
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
 */
const LayoutManager = ({ children }) => {
  const location = useLocation();
  
  const isSignupPage = location.pathname === "/signup";
  const isAdminPage = location.pathname.startsWith("/admin");
  const isOwnerPage = location.pathname.startsWith("/owner");
  const isProfilePreview = location.pathname.startsWith("/p/"); // <--- Added to hide Chrome on previews
  
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
      <ScrollToTop />
      <LayoutManager>
        <Routes>
          {/* --- 1. Public Routes --- */}
          <Route path="/" element={<HomeLayout />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/professionals" element={<ProfessionalsPage />} />
          
          {/* Universal Profile & Demo Route */}
          <Route path="/p/:slug" element={<ProfilePreview />} />

          {/* --- 2. Advanced Onboarding & Auth --- */}
          <Route path="/signup" element={<SignupLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding-status" element={<OnboardingStatus />} />
          
          {/* --- 3. Admin Dashboard (Role Protected) --- */}
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
          </Route>

          {/* --- 4. Owner Dashboard (Role Protected) --- */}
          <Route 
            path="/owner" 
            element={
              <AdminGuard allowedRoles={["owner"]}> 
                <OwnerDashboardLayout />
              </AdminGuard>
            } 
          >
            {/* Main Overview */}
            <Route path="dashboard" element={<OwnerOverview />} />
            
            {/* Core Management Routes */}
            <Route path="/owner/dashboard/bookings" element={<Appointments />} />
            <Route path="/owner/dashboard/customers" element={<Customers />} />
            
            {/* Finance & Billing */}
            <Route path="/owner/dashboard/finance" element={<Finance />} />
            <Route path="/owner/dashboard/billing" element={<Billing />} />
            
            {/* Website & Themes Section */}
            <Route path="/owner/dashboard/themes" element={<ThemeGallery />} /> 
            <Route path="/owner/theme/customize-site" element={<SetupTemplate />} />
            
            {/* Settings & Analytics */}
            <Route path="/owner/dashboard/stats" element={<Analytics />} />
            <Route path="/owner/dashboard/settings" element={<Settings />} />
          </Route>
          
          {/* Fallback Redirect */}
          <Route path="*" element={<HomeLayout />} />
        </Routes>
      </LayoutManager>
    </Router>
  );
}

export default App;