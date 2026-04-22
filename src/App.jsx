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

// Add your specific owner sub-pages here as you create them
// import OwnerOverview from "./pages/owner/Overview";

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
  
  // Chrome (Navbar/Footer) is hidden for Auth, Admin, and Owner Dashboards
  const hideChrome = isSignupPage || isAdminPage || isOwnerPage;

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
          
          {/* --- 3. Admin Dashboard (Strictly ONLY Admin) --- */}
          <Route 
            path="/admin" 
            element={
              <AdminGuard allowedRoles={["admin"]}>
                <AdminLayout />
              </AdminGuard>
            }
          >
            <Route path="verify-identity" element={<IdentityVerify />} />
            <Route path="dashboard" element={<div className="p-6 font-bold">Admin Statistics</div>} />
          </Route>

          {/* --- 4. Owner Dashboard (Strictly ONLY Owner) --- */}
          {/* Using a nested route so the Sidebar in OwnerDashboardLayout is persistent */}
          <Route 
            path="/owner" 
            element={
              <AdminGuard allowedRoles={["owner"]}> 
                <OwnerDashboardLayout />
              </AdminGuard>
            } 
          >
            {/* The index route is what shows at /owner/dashboard */}
            <Route path="dashboard" element={<OwnerOverview />} />
            
            {/* Future Owner Routes */}
            <Route path="bookings" element={<div className="p-4 font-bold text-2xl text-slate-800">Manage Appointments</div>} />
            <Route path="settings" element={<div className="p-4 font-bold text-2xl text-slate-800">Owner Settings</div>} />
          </Route>
          
          {/* Fallback Redirect */}
          <Route path="*" element={<HomeLayout />} />
        </Routes>
      </LayoutManager>
    </Router>
  );
}

export default App;