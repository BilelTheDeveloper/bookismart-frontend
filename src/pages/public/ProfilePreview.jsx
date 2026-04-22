import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getThemeById } from "../owner/ThemeRegistry";
import { Sparkles, Globe, ArrowLeft, X } from "lucide-react";

const ProfilePreview = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Determine if this is a demo based on the URL prefix we decided
  const isDemo = slug.startsWith("demo-");

  useEffect(() => {
    const loadWebsite = async () => {
      setLoading(true);
      if (isDemo) {
        // --- 1. DEMO MODE LOGIC ---
        const demoData = JSON.parse(sessionStorage.getItem("preview_mode_data"));
        setData(demoData);
        setLoading(false);
      } else {
        // --- 2. LIVE MODE LOGIC ---
        try {
          // Future API Call: 
          // const res = await fetch(`${process.env.REACT_APP_API_URL}/websites/public/${slug}`);
          // const result = await res.json();
          // setData(result);
          
          setLoading(false);
        } catch (err) {
          console.error("Error loading live site:", err);
          setLoading(false);
        }
      }
    };

    loadWebsite();
  }, [slug, isDemo]);

  // Function to handle returning to dashboard
  const handleExitPreview = () => {
    // If opened in a new tab, we can try to close it, 
    // otherwise navigate back to the themes gallery
    if (window.history.length > 1) {
      navigate("/owner/dashboard/themes");
    } else {
      window.close();
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-[#0f1115] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">Launching Engine...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-screen bg-slate-900 flex items-center justify-center text-white p-10 text-center">
        <div>
          <h1 className="text-6xl font-black mb-4 tracking-tighter">404</h1>
          <p className="text-slate-400 font-medium">This professional space hasn't been published yet.</p>
        </div>
      </div>
    );
  }

  const themeConfig = getThemeById(data.templateId || "BB_THEME_01");
  if (!themeConfig) return <div className="p-10 text-white bg-red-500">Registry Error: Theme Not Found</div>;

  const SelectedTheme = themeConfig.component;

  return (
    <div className="relative min-h-screen">
      
      {/* --- TOP BRANDING BAR (Ultra Pro) --- */}
      <div className={`fixed top-0 left-0 w-full z-[9999] flex items-center justify-between px-6 py-2 backdrop-blur-md border-b ${
        isDemo 
        ? "bg-indigo-600 text-white border-indigo-500" 
        : "bg-black/10 text-white border-white/10"
      }`}>
        
        <div className="flex items-center gap-4">
          {/* --- NEW: EXIT PREVIEW BUTTON (Only for Owners/Demo) --- */}
          {isDemo && (
            <button 
              onClick={handleExitPreview}
              className="flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-wider">Back to Dashboard</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <Sparkles size={14} className={isDemo ? "text-white" : "text-indigo-400"} />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">
              {isDemo ? "Live Template Preview" : "Verified Professional"}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 opacity-80">
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">by bookiify.tn</span>
        </div>
      </div>

      {/* --- THE ACTUAL THEME INJECTION --- */}
      <div className={isDemo ? "pt-10" : ""}> 
        <SelectedTheme data={data} />
      </div>

      {/* --- BOTTOM FLOATING BRANDING --- */}
      {!isDemo && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]">
          <a 
            href="https://bookiify.tn" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/20 transition-all group"
          >
            <div className="p-2 bg-indigo-600 rounded-lg text-white group-hover:scale-110 transition-transform">
              <Globe size={14} />
            </div>
            <div className="pr-2 text-left">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Create your own</p>
              <p className="text-[10px] font-black text-white uppercase tracking-tighter leading-none">Powered by Bookiify</p>
            </div>
          </a>
        </div>
      )}

    </div>
  );
};

export default ProfilePreview;