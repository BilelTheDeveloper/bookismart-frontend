import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Auth & Theme Context Providers
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./pages/admin/Sidebar";

// Public Pages
import HomeLayout from "./pages/public/Home/HomeLayout";
import HowItWorksPage from "./pages/public/HowItWorks";
import ServicesPage from "./pages/public/Services";
import ProfessionalsPage from "./pages/public/Professionals";
import JoinAsOwner from "./pages/public/signup/JoinAsOwner";
import LoginPage from "./pages/public/Login";

// ✅ New: The Public Website Container & Booking Page
import MerchantPublicProfile from "./pages/public/MerchantPublicProfile";
import BookingPage from "./pages/public/BookingPage"; 

// Admin Pages (Super Admin)
import AdminDashboard from "./pages/admin/Dashboard";
import UserVerification from "./pages/admin/UserVerification";
import WebVerification from "./pages/admin/WebVerification";

// Merchant/User Pages
import MainUserPage from "./pages/users/MainUserPage";
import OwnerDashboard from "./pages/users/OwnerDashboard";
import TemplateGallery from "./pages/users/TemplateGallery";
import TemplateSetupForm from "./pages/users/TemplateSetupForm"; 

// Specialized Website Layouts
import BarberWebsite from "./themes/SmartStyle/Barbershops/Theme1/WebsiteLayout";
import HairSalonWebsite from "./themes/SmartStyle/HairSalons/Theme1/WebsiteLayout"; 
import MakeupArtistWebsite from "./themes/SmartStyle/MakeupArtists/Theme1/WebsiteLayout";
import NailSalonWebsite from "./themes/SmartStyle/NailSalons/Theme1/WebsiteLayout";
import SpaWebsite from "./themes/SmartStyle/Spas/Theme1/WebsiteLayout";

/**
 * ScrollToTop Component
 * Ensures every navigation resets the scroll position.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/**
 * LayoutWrapper
 * Dynamically handles layout visibility based on the URL path.
 */
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  
  const isAdminPath = location.pathname.startsWith("/admin");
  const isMerchantPath = location.pathname.startsWith("/merchant");
  const isPublicProfile = location.pathname.startsWith("/p/"); 
  const isBookingPath = location.pathname.startsWith("/book/"); // ✅ Added for clean booking view
  const isAuthPath = location.pathname === "/login" || location.pathname === "/join-as-owner";
  
  // Dashboard/Clean View: No Navbar/Footer for Admin, Merchant Dashboard, Public Profiles, or Bookings
  const isCleanLayout = isAdminPath || isMerchantPath || isPublicProfile || isBookingPath || isAuthPath;

  // --- ADMIN LAYOUT ---
  if (isAdminPath) {
    return (
      <div className="flex min-h-screen bg-[#F8FAFC]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto h-screen no-scrollbar">
          {children}
        </main>
      </div>
    );
  }

  // --- PUBLIC & PROFILE LAYOUT ---
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* Hide platform Navbar on Merchant Profiles, Booking pages, and Auth pages */}
      {!isCleanLayout && <Navbar />}
      
      <main className={`flex-grow ${(isPublicProfile || isBookingPath) ? 'w-full h-full' : ''}`}>
        {children}
      </main>

      {/* Hide platform Footer on Merchant Profiles, Booking pages, and Auth pages */}
      {!isCleanLayout && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop /> {/* ✅ Added: Vital for UX between home and profiles */}
          <LayoutWrapper>
            <Routes>
              {/* --- Public Routes --- */}
              <Route path="/" element={<HomeLayout />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/professionals" element={<ProfessionalsPage />} />
              <Route path="/join-as-owner" element={<JoinAsOwner />} />
              <Route path="/login" element={<LoginPage />} />

              {/* ✅ Correct dynamic path for Public Profiles */}
              <Route path="/p/:slug" element={<MerchantPublicProfile />} />
              
              {/* ✅ New: Dynamic path for Bookings */}
              <Route path="/book/:slug" element={<BookingPage />} />

              {/* --- Admin Routes --- */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/verification" element={<UserVerification />} />
              <Route path="/admin/web-verification" element={<WebVerification />} />

              {/* --- Merchant/Owner Dashboard --- */}
              <Route path="/merchant" element={<MainUserPage />}>
                <Route index element={<OwnerDashboard />} />
                <Route path="templates" element={<TemplateGallery />} />
                
                {/* Preview Routes (Static context) */}
                <Route path="templates/preview/barbershops" element={<BarberWebsite />} />
                <Route path="templates/preview/hair-salons" element={<HairSalonWebsite />} />
                <Route path="templates/preview/makeup-artists" element={<MakeupArtistWebsite />} />
                <Route path="templates/preview/nail-salons" element={<NailSalonWebsite />} />
                <Route path="templates/preview/spas" element={<SpaWebsite />} />
                
                <Route path="templates/setup/:id" element={<TemplateSetupForm />} />
              </Route>
            </Routes>
          </LayoutWrapper>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;