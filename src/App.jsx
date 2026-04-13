import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Auth & Theme Context Providers
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext"; // 🔐 Added for Auth synchronization

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./pages/admin/Sidebar"; // ⬅️ Imported Sidebar to use in Layout

// Public Pages
import HomeLayout from "./pages/public/Home/HomeLayout";
import HowItWorksPage from "./pages/public/HowItWorks";
import ServicesPage from "./pages/public/Services";
import ProfessionalsPage from "./pages/public/Professionals";
import JoinAsOwner from "./pages/public/signup/JoinAsOwner";
import LoginPage from "./pages/public/Login";

// Admin Pages (Super Admin)
import AdminDashboard from "./pages/admin/Dashboard";
import UserVerification from "./pages/admin/UserVerification";
import WebVerification from "./pages/admin/WebVerification"; // 🌐 New: Website KYC Verification

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
 * LayoutWrapper
 * Conditionally shows Navbar/Footer based on the route.
 * Admin and Merchant areas get a clean, full-screen dashboard UI.
 */
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  
  const isAdminPath = location.pathname.startsWith("/admin");
  const isMerchantPath = location.pathname.startsWith("/merchant");
  
  const isDashboardLayout = isAdminPath || isMerchantPath;

  // If it's an Admin route, we wrap it in the Sidebar layout
  if (isAdminPath) {
    return (
      <div className="flex min-h-screen bg-[#F8FAFC]">
        <Sidebar /> {/* ⬅️ Sidebar is now global for all /admin routes */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    );
  }

  // Standard layout for Public and Merchant pages
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!isDashboardLayout && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isDashboardLayout && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider> {/* 🛡️ Added this to wrap the entire application */}
      <ThemeProvider>
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

              {/* --- Admin Routes (Super Admin Overview) --- */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/verification" element={<UserVerification />} />
              <Route path="/admin/web-verification" element={<WebVerification />} /> {/* ✅ Added Web KYC Route */}

              {/* --- Merchant/Owner Routes (Web Inside Web) --- */}
              <Route path="/merchant" element={<MainUserPage />}>
                {/* Default Merchant Dashboard */}
                <Route index element={<OwnerDashboard />} />
                
                {/* Template Management Gallery */}
                <Route path="templates" element={<TemplateGallery />} />
                
                {/* Preview Routes (The Live Website Views) */}
                <Route path="templates/preview/barbershops" element={<BarberWebsite />} />
                <Route path="templates/preview/hair-salons" element={<HairSalonWebsite />} />
                <Route path="templates/preview/makeup-artists" element={<MakeupArtistWebsite />} />
                <Route path="templates/preview/nail-salons" element={<NailSalonWebsite />} />
                <Route path="templates/preview/spas" element={<SpaWebsite />} />
                
                {/* Setup/Customization Route (The Configuration Lab) */}
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