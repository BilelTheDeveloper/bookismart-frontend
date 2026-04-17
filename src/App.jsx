import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import HomeLayout from "./pages/public/Home/HomeLayout";
import HowItWorksPage from "./pages/public/HowItWorks";
import ServicesPage from "./pages/public/Services";
import ProfessionalsPage from "./pages/public/Professionals";






function App() {
  return (


        <Router>
 
          <Navbar />
            <Routes>
              {/* --- Public Routes --- */}
              <Route path="/" element={<HomeLayout />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/professionals" element={<ProfessionalsPage />} />
            




              
            </Routes>
          <Footer />
        </Router>

  );
}

export default App;