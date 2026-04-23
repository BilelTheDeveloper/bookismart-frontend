import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Eye, Palette, Sparkles, Layout, ArrowRight } from "lucide-react";
import API from "../../api/config"; // Ensure this path matches your API config file
// Import the central registry we created
import { THEME_REGISTRY, getThemesByCategory } from "./ThemeRegistry";

const ThemeGallery = () => {
  const navigate = useNavigate();

  // 1. Get the user's specific category from storage
  const user = JSON.parse(localStorage.getItem("user")) || {
    category: "Beauty & Barbers", 
    businessName: "My Business"
  };

  // 2. THE AUTO-FILTER LOGIC (Using the Registry helper)
  const filteredThemes = getThemesByCategory(user.category);

  // --- FIX 1: State for actual active theme from DB ---
  const [activeThemeId, setActiveThemeId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- FIX 2: Load the real saved site data on mount ---
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

  // --- FIX 3: Pass the selected ID to the next page ---
  const handleApplyTheme = (themeId) => {
    navigate("/owner/theme/customize-site", { 
      state: { 
        selectedThemeId: themeId,
        category: user.category 
      } 
    });
  };

  // --- FULL SCREEN PREVIEW LOGIC ---
  const handleLiveDemo = (theme) => {
    const demoData = {
      templateId: theme.id,
      hero: { 
        title: "The Master's Touch", 
        slogan: "Premium grooming for the modern man. Experience the difference.",
        backgroundImage: theme.cardBg 
      },
      about: { 
        show: true, 
        title: "Our Heritage", 
        text: "With over 15 years of experience, we provide the highest quality services in a luxury environment.",
        image: theme.previewImage
      },
      services: [
        { title: "Signature Service", description: "Our most popular premium treatment.", price: "35.000", active: true },
        { title: "Standard Treatment", description: "Quality care for your daily needs.", price: "25.000", active: true }
      ],
      businessHours: [
        { day: "Monday", open: "09:00", close: "20:00", isClosed: false },
        { day: "Tuesday", open: "09:00", close: "20:00", isClosed: false },
        { day: "Wednesday", open: "09:00", close: "20:00", isClosed: false },
        { day: "Thursday", open: "09:00", close: "20:00", isClosed: false },
        { day: "Friday", open: "14:00", close: "22:00", isClosed: false },
        { day: "Saturday", open: "09:00", close: "22:00", isClosed: false },
        { day: "Sunday", isClosed: true }
      ],
      contact: { 
        phone: "+216 71 000 000", 
        address: "Les Berges du Lac, Tunis",
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
            We've filtered our registry to show only designs optimized for your industry.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <pointer-events-none>
                <Layout size={18} className="text-indigo-600" />
              </pointer-events-none>
            </div>
            <span className="text-sm font-black text-slate-600 uppercase tracking-tighter">
              {filteredThemes.length} Designs Ready
            </span>
          </div>
        </div>
      </div>

      {/* --- THEMES GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredThemes.map((theme) => {
          // Compare against the ID fetched from the database
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