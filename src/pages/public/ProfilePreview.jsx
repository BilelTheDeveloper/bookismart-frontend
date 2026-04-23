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
        // --- 1. DEMO MODE LOGIC (Session Storage + Self-Healing Fallback) ---
        try {
          // Attempt to get user-specific customizations from session
          let demoData = JSON.parse(sessionStorage.getItem("preview_mode_data"));
          
          // FIX: If session is empty (e.g. direct link/new tab), generate mock data to prevent crash
          if (!demoData) {
            const templateIdFromUrl = slug.replace("demo-", ""); 
            
            demoData = {
              templateId: templateIdFromUrl,
              category: "Preview Mode",
              hero: { 
                title: "Template Preview", 
                slogan: "This is a live preview of the layout. You can customize all this content in your dashboard.",
                backgroundImage: "" 
              },
              about: { 
                show: true, 
                title: "Modern Excellence", 
                text: "This section showcases your professional story and philosophy to your clients." 
              },
              services: [
                { title: "Signature Service", price: "45", description: "A detailed description of your premium offering.", active: true },
                { title: "Express Treatment", price: "25", description: "Quick quality service for clients on the go.", active: true }
              ],
              gallery: { show: true, images: [] },
              contact: { 
                phone: "+216 00 000 000", 
                address: "Your Business Address, Tunis", 
                socials: { instagram: "#", facebook: "#", tiktok: "#" } 
              },
              businessHours: [
                { day: "Monday", open: "09:00", close: "19:00", isClosed: false },
                { day: "Tuesday", open: "09:00", close: "19:00", isClosed: false },
                { day: "Wednesday", open: "09:00", close: "19:00", isClosed: false },
                { day: "Thursday", open: "09:00", close: "19:00", isClosed: false },
                { day: "Friday", open: "09:00", close: "19:00", isClosed: false },
                { day: "Saturday", open: "10:00", close: "15:00", isClosed: false },
                { day: "Sunday", open: "00:00", close: "00:00", isClosed: true },
              ],
              ownerId: { businessName: "Demo Business", ville: "Tunis" }
            };
          }
          
          setData(demoData);
        } catch (err) {
          console.error("Demo data error:", err);
        }
        setLoading(false);
      } else {
        // --- 2. LIVE MODE LOGIC (Backend API) ---
        try {
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
    <div className="flex flex-col min-h-screen bg-black">
      
      {/* --- THE ACTUAL THEME INJECTION --- */}
      <main className="flex-grow"> 
        <SelectedTheme data={data} />
      </main>

      {/* --- BOTTOM FLOATING BRANDING (Only for Public Views) --- */}
      {!isDemo && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-fit px-4">
          <a 
            href="https://bookiify.vercel.app/login" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full hover:bg-black/80 transition-all group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="p-2 bg-amber-600 rounded-lg text-white group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/20">
              <Globe size={14} />
            </div>
            <div className="pr-2 text-left">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Create your own</p>
              <p className="text-[10px] font-black text-white uppercase tracking-tighter leading-none">Powered by Bookiify</p>
            </div>
          </a>
        </div>
      )}

    </div>
  );
};

export default ProfilePreview;