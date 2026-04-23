import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Eye, Palette, Sparkles, Layout, ArrowRight } from "lucide-react";
import API from "../../api/config"; 
import { THEME_REGISTRY, getThemesByCategory } from "./ThemeRegistry";

const ThemeGallery = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {
    category: "Beauty & Barbers", 
    businessName: "My Business"
  };

  const filteredThemes = getThemesByCategory(user.category);

  const [activeThemeId, setActiveThemeId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentSite = async () => {
      try {
        const res = await API.get('/merchant/website/my-site');
        if (res.data && res.data.templateId) {
          setActiveThemeId(res.data.templateId);
        }
      } catch (err) {
        console.log("New user or no site found yet.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCurrentSite();
  }, []);

  const handleApplyTheme = (themeId) => {
    navigate("/owner/theme/customize-site", { 
      state: { 
        selectedThemeId: themeId,
        category: user.category 
      } 
    });
  };

  // --- IMPROVED: DYNAMIC DEMO LOGIC ---
  const handleLiveDemo = (theme) => {
    // We check the theme ID to provide relevant demo content
    const isMakeupArtist = theme.id === "BB_THEME_03";
    const isNailSalon = theme.id === "BB_THEME_02";

    const demoData = {
      templateId: theme.id,
      name: isMakeupArtist ? "Vogue Artistry" : isNailSalon ? "Luxe Polish" : "The Classic Gent",
      hero: { 
        title: isMakeupArtist ? "The Signature Glow" : "Elegant Fingertips", 
        slogan: isMakeupArtist 
          ? "Professional makeup artistry for your most unforgettable moments."
          : "Premium care for the modern individual.",
        backgroundImage: theme.cardBg 
      },
      about: { 
        show: true, 
        title: "Our Story", 
        text: "With years of industry expertise, we deliver a bespoke experience tailored to your unique style and needs.",
        image: theme.previewImage
      },
      services: isMakeupArtist ? [
        { title: "Bridal Glam", description: "Full wedding day application including trial.", price: "250", active: true },
        { title: "Editorial Look", description: "High-fashion makeup for photography.", price: "150", active: true }
      ] : [
        { title: "Signature Treatment", description: "Our most popular premium service.", price: "35", active: true },
        { title: "Standard Package", description: "Quality care for your daily needs.", price: "25", active: true }
      ],
      gallery: {
        show: true,
        images: [theme.previewImage, theme.cardBg, theme.previewImage, theme.cardBg]
      },
      businessHours: [
        { day: "Monday", open: "09:00", close: "20:00", isClosed: false },
        { day: "Tuesday", open: "09:00", close: "20:00", isClosed: false },
        { day: "Wednesday", open: "09:00", close: "20:00", isClosed: false },
        { day: "Thursday", open: "09:00", close: "20:00", isClosed: false },
        { day: "Friday", open: "09:00", close: "20:00", isClosed: false },
        { day: "Saturday", open: "09:00", close: "22:00", isClosed: false },
        { day: "Sunday", isClosed: true }
      ],
      contact: { 
        phone: "+216 71 000 000", 
        address: "Tunis, Tunisia",
        socials: { instagram: "@bookiify_demo", facebook: "bookiify.tn" }
      }
    };

    sessionStorage.setItem("preview_mode_data", JSON.stringify(demoData));
    window.open(theme.demoPath, "_blank");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Sparkles size={18} />
            <span className="text-xs font-black uppercase tracking-widest">Theme Engine v1.0</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 capitalize">
            {user.category.replace(/([A-Z])/g, ' $1').trim()} <span className="text-slate-400 font-medium italic">Templates</span>
          </h2>
          <p className="text-slate-500 mt-1 font-medium">
            Designs optimized for your specific industry and brand aesthetic.
          </p>
        </div>
        <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 flex items-center gap-3">
            <Layout size={18} className="text-indigo-600" />
            <span className="text-sm font-black text-slate-600 uppercase tracking-tighter">
              {filteredThemes.length} Designs Ready
            </span>
        </div>
      </div>

      {/* --- THEMES GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredThemes.map((theme) => {
          const isLive = activeThemeId === theme.id;
          
          return (
            <div 
              key={theme.id} 
              className={`group relative bg-white rounded-[3rem] overflow-hidden border-2 transition-all duration-500 ${
                isLive ? "border-indigo-500 shadow-2xl shadow-indigo-100" : "border-transparent shadow-sm hover:shadow-xl hover:border-slate-200"
              }`}
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={theme.cardBg || theme.previewImage} 
                  alt={theme.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                   {theme.tags?.map((tag, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-[9px] font-black text-white uppercase tracking-widest">
                        {tag}
                      </span>
                   ))}
                </div>

                {isLive && (
                  <div className="absolute top-6 right-6 bg-emerald-500 text-white px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg animate-pulse">
                    <CheckCircle2 size={12} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                  </div>
                )}

                <div className="absolute bottom-6 left-8">
                   <h3 className="text-2xl font-black text-white tracking-tight">{theme.name}</h3>
                </div>
              </div>

              <div className="p-8">
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-2">
                  {theme.description}
                </p>
                
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => handleApplyTheme(theme.id)}
                    className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${
                      isLive 
                      ? "bg-slate-900 text-white hover:bg-black" 
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100"
                    }`}
                  >
                    {isLive ? (
                      <>Edit Live Site <ArrowRight size={18} /></>
                    ) : (
                      <>Apply This Template <Palette size={18} /></>
                    )}
                  </button>
                  
                  <button 
                    onClick={() => handleLiveDemo(theme)}
                    className="w-full flex items-center justify-center gap-2 py-3 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-indigo-600 transition-colors"
                  >
                    <Eye size={14} /> Full Screen Review
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- BOTTOM CTA --- */}
      <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-3xl font-black italic tracking-tighter">Need a unique look?</h3>
          <p className="text-slate-400 font-medium mt-2 max-w-md">
            Our creative team can build a custom template exclusively for your brand.
          </p>
        </div>
        <button className="relative z-10 px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-500 transition-all shadow-2xl flex items-center gap-3 uppercase tracking-widest text-xs">
          Contact Design Studio <ArrowRight size={18} />
        </button>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
};

export default ThemeGallery;