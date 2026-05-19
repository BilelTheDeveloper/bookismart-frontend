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
import BookingPage from "./pages/public/BookingPage"; // 🆕 Added Booking Update

// --- Onboarding & Auth ---
import SignupLayout from "./pages/public/signup/SignupLayout";
import Login from "./pages/public/auth/Login";
import ForgotPassword from "./pages/public/auth/ForgotPassword";
import ResetPassword from "./pages/public/auth/ResetPassword";
import OnboardingStatus from './pages/public/auth/OnboardingStatus'

// --- Admin Pages ---
import AdminLayout from "./pages/admin/AdminLayout";
import IdentityVerify from "./pages/admin/IdentityVerify";
import AdminVerification from "./pages/admin/AdminVerification.jsx";
import SecurityAlerts from "./pages/admin/SecurityAlerts.jsx";

// --- Owner Pages ---
import OwnerDashboardLayout from "./pages/owner/DashboardLayout";
import OwnerOverview from "./pages/owner/Overview";
import ThemeGallery from "./pages/owner/ThemeGallery"; 
import SetupTemplate from "./pages/owner/SetupTemplate"; 
import Billing from "./pages/owner/Billing";
import Analytics from "./pages/owner/Analytics";
import Finance from "./pages/owner/Finance";
import Invoices from "./pages/owner/Invoices";
import Loyalty from "./pages/owner/Loyalty";
import Appointments from "./pages/owner/Appointments";
import Customers from "./pages/owner/Customers";
import Settings from "./pages/owner/Settings";
import KYCVerification from "./pages/owner/KYCVerification";
import WorkMode from "./pages/owner/WorkMode";
import SmartAssistant from "./pages/owner/SmartAssistant";
import CustomerHistory from "./pages/owner/CustomerHistory";
import Recruitment from "./pages/owner/Recruitment";
import Staff from "./pages/owner/Staff";
import Chat from "./pages/owner/Chat";
import WorkerWorkMode from "./pages/workmode/WorkerWorkMode";

// --- Customer Portal ---
import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerRegisterLayout from "./pages/customer/CustomerRegisterLayout";
import CustomerLayout from "./pages/customer/portal/CustomerLayout";
import CustomerProfile from "./pages/customer/portal/CustomerProfile";
import CustomerAppointments from "./pages/customer/portal/CustomerAppointments";
import CustomerInvoices from "./pages/customer/portal/CustomerInvoices";
import CustomerLoyalty from "./pages/customer/portal/CustomerLoyalty";
import CustomerBooking from "./pages/customer/portal/CustomerBooking";
import CustomerSession from "./pages/customer/portal/CustomerSession";
import { CustomerAuthProvider } from "./context/CustomerAuthContext";

// --- Owner: Customer access ---
import CustomerAccessPage from "./pages/owner/CustomerAccessPage";

// --- Admin: Customer + Staff review ---
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminRecruitment from "./pages/admin/AdminRecruitment";
import AdminStaff from "./pages/admin/AdminStaff";

// --- Staff: Registration + Login + Portal ---
import StaffRegisterLayout from "./pages/staff/StaffRegisterLayout";
import StaffLogin from "./pages/staff/StaffLogin";
import StaffLayout from "./pages/staff/portal/StaffLayout";
import StaffDashboard from "./pages/staff/portal/StaffDashboard";
import StaffBookings from "./pages/staff/portal/StaffBookings";
import { StaffAuthProvider } from "./context/StaffAuthContext";

// --- Public: Find Work ---
import FindWorkPage from "./pages/public/FindWork/FindWorkPage";
import JobDetailPage from "./pages/public/FindWork/JobDetailPage";
import ReviewPage from "./pages/public/ReviewPage";
import DisplayScreen from "./pages/public/DisplayScreen";

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
      localStorage.removeItem("csrf_token");
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
  
  const isSignupPage    = location.pathname === "/signup";
  const isAuthPage      = ["/login", "/forgot-password", "/reset-password", "/onboarding-status"].includes(location.pathname);
  const isAdminPage     = location.pathname.startsWith("/admin");
  const isOwnerPage     = location.pathname.startsWith("/owner");
  const isProfilePreview = location.pathname.startsWith("/p/");
  const isBookingPage   = location.pathname.startsWith("/book/");
  const isReviewPage    = location.pathname.startsWith("/review/");
  const isDisplayPage   = location.pathname.startsWith("/display/");
  const isCustomerPage  = location.pathname.startsWith("/customer");
  const isStaffPage     = location.pathname.startsWith("/staff");

  // 🛡️ Hide Chrome for high-immersion pages
  const hideChrome = isSignupPage || isAuthPage || isAdminPage || isOwnerPage || isProfilePreview || isBookingPage || isReviewPage || isDisplayPage || isCustomerPage || isStaffPage;

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
    <StaffAuthProvider>
    <CustomerAuthProvider>
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
          <Route path="/book/:merchantId" element={<BookingPage />} />
          <Route path="/review/:token" element={<ReviewPage />} />
          <Route path="/display/:slug" element={<DisplayScreen />} />
          <Route path="/work-mode/worker" element={<WorkerWorkMode />} />
          <Route path="/find-work" element={<FindWorkPage />} />
          <Route path="/find-work/:id" element={<JobDetailPage />} />

          {/* --- 2. Auth Routes --- */}
          <Route path="/signup" element={<SignupLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password"  element={<ResetPassword />} />
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
            <Route path="dashboard"       element={<div className="p-6 font-bold text-slate-800">Admin Statistics</div>} />
            <Route path="verification"    element={<AdminVerification />} />
            <Route path="security-alerts" element={<SecurityAlerts />} />
            <Route path="customers"       element={<AdminCustomers />} />
            <Route path="recruitment"     element={<AdminRecruitment />} />
            <Route path="staff"           element={<AdminStaff />} />
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
            <Route path="dashboard/customers/:customerKey" element={<CustomerHistory />} />
            <Route path="dashboard/finance" element={<Finance />} />
            <Route path="dashboard/invoices" element={<Invoices />} />
            <Route path="dashboard/loyalty" element={<Loyalty />} />
            <Route path="dashboard/billing" element={<Billing />} />
            <Route path="dashboard/themes" element={<ThemeGallery />} /> 
            <Route path="theme/customize-site" element={<SetupTemplate />} />
            <Route path="dashboard/stats" element={<Analytics />} />
            <Route path="dashboard/settings" element={<Settings />} />
            <Route path="dashboard/kyc"      element={<KYCVerification />} />
            <Route path="dashboard/work-mode" element={<WorkMode />} />
            <Route path="dashboard/recruitment" element={<Recruitment />} />
            <Route path="dashboard/staff"       element={<Staff />} />
            <Route path="dashboard/chat"        element={<Chat />} />
            <Route path="dashboard/smart-ai"    element={<SmartAssistant />} />
          </Route>
          
          {/* --- 5. Customer Registration (public, no auth) --- */}
          <Route path="/customer/login"              element={<CustomerLogin />} />
          <Route path="/customer/register/:token"    element={<CustomerRegisterLayout />} />

          {/* --- 6. Customer Portal (protected by CustomerAuthContext) --- */}
          <Route path="/customer/portal" element={<CustomerLayout />}>
            <Route index                  element={<CustomerProfile />} />
            <Route path="profile"         element={<CustomerProfile />} />
            <Route path="appointments"    element={<CustomerAppointments />} />
            <Route path="invoices"        element={<CustomerInvoices />} />
            <Route path="loyalty"         element={<CustomerLoyalty />} />
            <Route path="booking"         element={<CustomerBooking />} />
            <Route path="session"         element={<CustomerSession />} />
          </Route>

          {/* --- 7. Staff Registration + Login + Portal --- */}
          <Route path="/staff/register/:token" element={<StaffRegisterLayout />} />
          <Route path="/staff/login"           element={<StaffLogin />} />
          <Route path="/staff/portal"          element={<StaffLayout />}>
            <Route index element={<StaffDashboard />} />
            {/* Dynamic pages — rendered inside StaffLayout, content loaded per route */}
            <Route path="bookings"    element={<StaffBookings />} />
            <Route path="customers"   element={<div className="text-white p-8 font-bold">Customers — coming soon</div>} />
            <Route path="finance"     element={<div className="text-white p-8 font-bold">Finance — coming soon</div>} />
            <Route path="chat"        element={<div className="text-white p-8 font-bold">Chat — coming soon</div>} />
            <Route path="invoices"    element={<div className="text-white p-8 font-bold">Invoices — coming soon</div>} />
            <Route path="loyalty"     element={<div className="text-white p-8 font-bold">Loyalty — coming soon</div>} />
            <Route path="work-mode"   element={<WorkMode />} />
            <Route path="recruitment" element={<div className="text-white p-8 font-bold">Recruitment — coming soon</div>} />
            <Route path="analytics"   element={<div className="text-white p-8 font-bold">Analytics — coming soon</div>} />
          </Route>

          {/* --- 8. Owner: Customer access management --- */}
          <Route
            path="/owner/dashboard/customers/:id/access"
            element={
              <AdminGuard allowedRoles={["owner"]}>
                <OwnerDashboardLayout />
              </AdminGuard>
            }
          >
            <Route index element={<CustomerAccessPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<HomeLayout />} />
        </Routes>
      </LayoutManager>
    </Router>
    </CustomerAuthProvider>
    </StaffAuthProvider>
  );
}

export default App;