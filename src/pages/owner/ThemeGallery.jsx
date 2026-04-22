import React, { useState } from "react";
import { CheckCircle2, Eye, Palette, Sparkles, Layout } from "lucide-react";

const ThemeGallery = () => {
  // 1. Get the user's specific category from storage
  const user = JSON.parse(localStorage.getItem("user")) || {
    category: "Beauty & Barbers", // Fallback for safety
    businessName: "My Business"
  };

  // 2. This represents your Master Theme Database
  // In a real app, this would likely come from an API/Config file
  const allThemes = [
    { id: "style_1", name: "Modern Barber", category: "Beauty & Barbers", preview: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=500", type: "Premium" },
    { id: "style_2", name: "Classic Noir", category: "Beauty & Barbers", preview: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=500", type: "Free" },
    { id: "doc_1", name: "HealthCare Pro", category: "Health & Medical", preview: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=500", type: "Free" },
    { id: "fit_1", name: "Iron Gym", category: "Fitness & Gyms", preview: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500", type: "Premium" },
    { id: "style_3", name: "Glow Spa", category: "Beauty & Barbers", preview: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=500", type: "Premium" },
  ];

  // 3. THE AUTO-FILTER LOGIC
  const filteredThemes = allThemes.filter(t => t.category === user.category);

  // State to track which theme is active (Mocking the DB saved value)
  const [activeTheme, setActiveTheme] = useState("style_1");

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Sparkles size={18} />
            <span className="text-xs font-black uppercase tracking-widest">Theme Engine</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900">
            {user.category} <span className="text-slate-400">Templates</span>
          </h2>
          <p className="text-slate-500 mt-1 font-medium">
            We've filtered these themes specifically for your business type.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 flex items-center gap-2">
            <Layout size={18} className="text-slate-400" />
            <span className="text-sm font-bold text-slate-600">{filteredThemes.length} Available</span>
          </div>
        </div>
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredThemes.map((theme) => {
          const isLive = activeTheme === theme.id;
          
          return (
            <div 
              key={theme.id} 
              className={`group relative bg-white rounded-[2.5rem] overflow-hidden border-2 transition-all duration-500 ${
                isLive ? "border-indigo-500 shadow-xl shadow-indigo-100" : "border-transparent shadow-sm hover:shadow-xl hover:border-slate-200"
              }`}
            >
              {/* Image Preview Area */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={theme.preview} 
                  alt={theme.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
                
                {/* Badge for Premium/Free */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    theme.type === 'Premium' ? "bg-amber-400 text-amber-900" : "bg-white/90 text-slate-900"
                  }`}>
                    {theme.type}
                  </span>
                </div>

                {/* Live Badge */}
                {isLive && (
                  <div className="absolute top-4 right-4 bg-indigo-500 text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                    <CheckCircle2 size={12} />
                    <span className="text-[10px] font-black uppercase tracking-wider">Currently Live</span>
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="p-6">
                <h3 className="text-xl font-black text-slate-900">{theme.name}</h3>
                <p className="text-slate-500 text-sm font-medium mt-1 italic">Optimized for {theme.category}</p>
                
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-colors text-sm group">
                    <Eye size={16} />
                    Preview
                  </button>
                  <button 
                    onClick={() => setActiveTheme(theme.id)}
                    disabled={isLive}
                    className={`flex items-center justify-center gap-2 py-3 px-4 font-bold rounded-2xl transition-all text-sm ${
                      isLive 
                      ? "bg-emerald-50 text-emerald-600 cursor-default" 
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100"
                    }`}
                  >
                    {isLive ? <CheckCircle2 size={16} /> : <Palette size={16} />}
                    {isLive ? "Activated" : "Apply Theme"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Help Section */}
      <div className="bg-indigo-900 rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-2xl font-black italic">Don't see a theme you like?</h3>
          <p className="text-indigo-200 font-medium mt-2">
            Our designers are constantly creating new industry-specific templates.
          </p>
        </div>
        <button className="relative z-10 px-8 py-4 bg-white text-indigo-900 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">
          Request Custom Theme
        </button>
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
      </div>
    </div>
  );
};

export default ThemeGallery;