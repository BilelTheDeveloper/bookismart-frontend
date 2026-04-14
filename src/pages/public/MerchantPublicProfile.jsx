import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/config"; // ✅ Better to use your API config instance

// Import your Theme Layouts
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
        // ✅ Using the dynamic public route we created on the backend
        const response = await API.get(`/public/website/${slug}`);
        setWebsiteData(response.data);
      } catch (err) {
        console.error("Error fetching website:", err);
        setError("This professional profile is currently offline or does not exist.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchWebsite();
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Loading Experience...</p>
      </div>
    );
  }

  if (error || !websiteData) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <h2 className="text-4xl font-black text-slate-900 mb-4">Oups!</h2>
        <p className="text-slate-500 font-medium max-w-md mb-8">{error}</p>
        <a href="/" className="px-8 py-3 bg-indigo-600 text-white font-black rounded-full text-xs uppercase tracking-widest transition-all hover:bg-indigo-700">
          Back to Bookify
        </a>
      </div>
    );
  }

  /**
   * ✅ RENDER ENGINE
   * Maps the DB templateId to the correct React Component
   * Now passing 'websiteData' as the 'data' prop to match your theme update
   */
  const renderTheme = () => {
    switch (websiteData.templateId) {
      case "BARBER_THEME_01":
        return <BarberWebsite data={websiteData} />;
      case "HAIR_THEME_01":
        return <HairSalonWebsite data={websiteData} />;
      case "MAKEUP_THEME_01":
        return <MakeupArtistWebsite data={websiteData} />;
      case "NAIL_THEME_01":
        return <NailSalonWebsite data={websiteData} />;
      case "SPA_THEME_01":
        return <SpaWebsite data={websiteData} />;
      default:
        // Defaulting to Barber theme if ID is missing or mismatched
        return <BarberWebsite data={websiteData} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderTheme()}
      
      {/* Small subtle branding to maintain platform identity */}
      <footer className="py-8 text-center bg-[#0a0a0a] border-t border-white/5">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
          Powered by <span className="text-indigo-500">Bookify.tn</span>
        </p>
      </footer>
    </div>
  );
};

export default MerchantPublicProfile;