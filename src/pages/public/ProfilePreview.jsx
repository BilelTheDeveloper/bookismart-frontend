import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getThemeById } from "../owner/ThemeRegistry";
import { Sparkles, Globe, ArrowLeft, Loader2 } from "lucide-react";
import API from "../../api/config"; // Ensure this points to your axios instance

const ProfilePreview = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Determine if this is a demo based on the URL prefix
  const isDemo = slug.startsWith("demo-");

  useEffect(() => {
    const loadWebsite = async () => {
      setLoading(true);
      if (isDemo) {
        // --- 1. DEMO MODE LOGIC (Session Storage) ---
        try {
          const demoData = JSON.parse(sessionStorage.getItem("preview_mode_data"));
          if (demoData) {
            setData(demoData);
          }
        } catch (err) {
          console.error("Demo data parse error", err);
        }
        setLoading(false);
      } else {
        // --- 2. LIVE MODE LOGIC (Backend API) ---
        try {
          // Calling the new Public API we created
          const res = await API.get(`/public/site/${slug}`);
          if (res.data.success) {
            setData(res.data.data);
          }
        } catch (err) {
          console.error("Error loading live site:", err);
          setData(null);
        } finally {
          setLoading(false);
        }
      }
    };

    loadWebsite();
  }, [slug, isDemo]);

  /**
   * NAVIGATION LOGIC:
   * 1. If Demo/Owner -> Go back to Theme Gallery
   * 2. If Public Visitor -> Go back to Professionals Discovery Page
   */
  const handleExitPreview = () => {
    if (isDemo) {
      navigate("/owner/dashboard/themes");
    } else {
      navigate("/professionals");
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-[#0f1115] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
          Launching Engine...
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-10 text-center">
        <h1 className="text-6xl font-black mb-4 tracking-tighter text-indigo-500">404</h1>
        <p className="text-slate-400 font-medium mb-8">
          This professional space hasn't been published yet or the link is invalid.
        </p>
        <button 
          onClick={() => navigate("/professionals")}
          className="px-6 py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition-all"
        >
          Return to Discovery
        </button>
      </div>
    );
  }

  const themeConfig = getThemeById(data.templateId || "BB_THEME_01");
  
  if (!themeConfig) {
    return (
      <div className="h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="p-8 bg-red-500/20 border border-red-500 rounded-2xl text-center">
          <p className="font-black uppercase tracking-widest text-red-500">Registry Error</p>
          <p className="text-sm opacity-80">Theme ID "{data.templateId}" not found in system.</p>
        </div>
      </div>
    );
  }

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
          {/* --- EXIT BUTTON: Dynamic behavior --- */}
          <button 
            onClick={handleExitPreview}
            className="flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-wider">
              {isDemo ? "Back to Dashboard" : "Discovery Feed"}
            </span>
          </button>

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
      {/* Added pt-12 to push content below the branding bar */}
      <div className="pt-10"> 
        <SelectedTheme data={data} />
      </div>

      {/* --- BOTTOM FLOATING BRANDING (Only for Public Views) --- */}
      {!isDemo && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-fit px-4">
          <a 
            href="https://bookiify.tn" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/20 transition-all group shadow-2xl shadow-black/50"
          >
            <div className="p-2 bg-indigo-600 rounded-lg text-white group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/50">
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