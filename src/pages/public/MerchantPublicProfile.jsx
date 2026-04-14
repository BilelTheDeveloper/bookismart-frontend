import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
        // We will create this backend route next
        const response = await axios.get(`https://bookismart-backend.onrender.com/api/public/website/${slug}`);
        setWebsiteData(response.data);
      } catch (err) {
        console.error("Error fetching website:", err);
        setError("Website not found or is currently offline.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchWebsite();
  }, [slug]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading your experience...</div>;
  if (error || !websiteData) return <div className="h-screen flex items-center justify-center text-red-500">{error}</div>;

  // Decide which theme to render based on the templateId saved in the DB
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
        return <BarberWebsite data={websiteData} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderTheme()}
      
      {/* Small subtle branding */}
      <footer className="py-6 text-center bg-white border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Powered by <span className="font-semibold text-indigo-600">Bookify.tn</span>
        </p>
      </footer>
    </div>
  );
};

export default MerchantPublicProfile;