import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/config"; 

// Import Theme Layouts
import BarberWebsite from "../../themes/SmartStyle/Barbershops/Theme1/WebsiteLayout";
import HairSalonWebsite from "../../themes/SmartStyle/HairSalons/Theme1/WebsiteLayout";
import MakeupArtistWebsite from "../../themes/SmartStyle/MakeupArtists/Theme1/WebsiteLayout";
import NailSalonWebsite from "../../themes/SmartStyle/NailSalons/Theme1/WebsiteLayout";
import SpaWebsite from "../../themes/SmartStyle/Spas/Theme1/WebsiteLayout";

const MerchantPublicProfile = () => {
  const { slug } = useParams();
  const [websiteData, setWebsiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        setLoading(true);
        // ✅ Targeted Public Route from your Controller
        const response = await API.get(`/public/website/${slug}`);
        setWebsiteData(response.data);
      } catch (err) {
        console.error("🔥 Profile Fetch Error:", err);
        setError("This professional profile is currently offline or does not exist.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchWebsite();
    
    // Force scroll to top on load for full-screen effect
    window.scrollTo(0, 0);
  }, [slug]);

  // --- FULL SCREEN LOADING STATE ---
  if (loading) {
    return (
      <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white">
        <div className="relative">
            <div className="w-16 h-16 border-[3px] border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
            </div>
        </div>
        <p className="mt-6 font-black text-slate-900 uppercase tracking-[0.4em] text-[10px] antialiased">
            Loading Experience
        </p>
      </div>
    );
  }

  // --- FULL SCREEN ERROR STATE ---
  if (error || !websiteData) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <h2 className="text-6xl font-black text-slate-900 mb-4 tracking-tighter">404</h2>
        <p className="text-slate-500 font-bold max-w-md mb-8 uppercase tracking-widest text-xs">{error}</p>
        <a href="/" className="px-10 py-4 bg-slate-900 text-white font-black rounded-full text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-200">
          Return to Marketplace
        </a>
      </div>
    );
  }

  /**
   * ✅ DYNAMIC THEME ENGINE
   * Directly injects the 'websiteData' into the chosen theme.
   */
  const renderTheme = () => {
    const themeProps = { data: websiteData };
    
    switch (websiteData.templateId) {
      case "BARBER_THEME_01":
        return <BarberWebsite {...themeProps} />;
      case "HAIR_THEME_01":
        return <HairSalonWebsite {...themeProps} />;
      case "MAKEUP_THEME_01":
        return <MakeupArtistWebsite {...themeProps} />;
      case "NAIL_THEME_01":
        return <NailSalonWebsite {...themeProps} />;
      case "SPA_THEME_01":
        return <SpaWebsite {...themeProps} />;
      default:
        return <BarberWebsite {...themeProps} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      {/* THEME RENDER 
         This takes 100% width and height. No margins, no padding.
      */}
      {renderTheme()}
      
      {/* ULTRA SUBTLE BRANDING FOOTER */}
      <footer className="py-12 text-center bg-[#050505] border-t border-white/5">
        <div className="flex flex-col items-center gap-4">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20">
              Powered by <span className="text-indigo-500">Bookify.tn</span>
            </p>
            <div className="w-8 h-[1px] bg-white/10"></div>
        </div>
      </footer>
    </div>
  );
};

export default MerchantPublicProfile;