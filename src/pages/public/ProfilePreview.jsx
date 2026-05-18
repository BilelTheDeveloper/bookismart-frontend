import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getThemeById } from "../owner/ThemeRegistry";
import { Sparkles, Globe, ArrowLeft, Loader2, MapPin, Navigation } from "lucide-react";
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
        // --- 1. DEMO MODE LOGIC (Session Storage + Safety Injection) ---
        try {
          const sessionRaw = sessionStorage.getItem("preview_mode_data");
          let demoData = sessionRaw ? JSON.parse(sessionRaw) : null;

          // CRITICAL FIX: Ensure all required sub-objects exist to prevent ".show" undefined errors
          if (!demoData) {
            const templateIdFromUrl = slug.replace("demo-", "");
            demoData = { templateId: templateIdFromUrl };
          }

          // Safety Injection: If these objects are missing in session, create them
          // This stops the "Cannot read properties of undefined (reading 'show')" crash
          const safeData = {
            ...demoData,
            templateId: demoData.templateId || slug.replace("demo-", "") || "BB_THEME_01",
            hero: demoData.hero || { title: "Demo Mode", slogan: "Previewing layout" },
            about: demoData.about || { show: true, title: "Our Story", text: "About us text..." },
            gallery: demoData.gallery || { show: true, images: [] },
            services: demoData.services || [],
            contact: demoData.contact || { phone: "", socials: {} },
            businessHours: demoData.businessHours || [],
            ownerId: demoData.ownerId || { businessName: "Professional", ville: "" }
          };

          setData(safeData);
        } catch (err) {
          console.error("Demo data parse error", err);
        }
        setLoading(false);
      } else {
        // --- 2. LIVE MODE LOGIC (Backend API) ---
        try {
          const res = await API.get(`/public/site/${slug}`);
          if (res.data.success) {
            // Even with live data, we merge with defaults to be 100% safe
            const liveData = res.data.data;
            const safeLiveData = {
              ...liveData,
              hero: liveData.hero || {},
              about: liveData.about || { show: false },
              gallery: liveData.gallery || { show: false, images: [] }
            };
            setData(safeLiveData);
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

  // 🛡️ UPDATED: Safely find the theme. Case-insensitivity is now handled inside getThemeById.
  const themeConfig = getThemeById(data.templateId) || getThemeById("BB_THEME_01");
  
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

  // Build a displayable address from localization fields or contact.address
  const loc = data.setupConfig?.localization || {};
  const addressParts = [loc.address, loc.city, loc.country].filter(Boolean);
  const fullAddress = addressParts.length > 0 ? addressParts.join(", ") : (data.contact?.address || "");
  const mapsQuery = encodeURIComponent(fullAddress);

  return (
    <div className="flex flex-col min-h-screen bg-black">

      {/* --- TOP BRANDING BAR --- */}
      {/* You can re-enable your top bar here if you want it visible on public profiles */}

      {/* --- THE ACTUAL THEME INJECTION --- */}
      <main className="flex-grow">
        <SelectedTheme data={data} />
      </main>

      {/* --- LOCATION / GOOGLE MAPS SECTION --- */}
      {!isDemo && fullAddress && (
        <section className="bg-slate-900 border-t border-slate-800 py-10 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <MapPin size={16} className="text-rose-400" />
              </div>
              <div>
                <p className="text-white font-black text-base">Find Us</p>
                <p className="text-slate-400 text-xs font-medium">{fullAddress}</p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noreferrer"
                className="ml-auto flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 hover:bg-rose-500/20 transition-all font-bold text-sm"
              >
                <Navigation size={14} />
                Get Directions
              </a>
            </div>
            <div className="w-full rounded-2xl overflow-hidden border border-slate-700" style={{ height: 320 }}>
              <iframe
                title="Business Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${mapsQuery}&output=embed`}
              />
            </div>
          </div>
        </section>
      )}

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