import React, { useState, useEffect } from "react";
import { 
  Layout, 
  Image as ImageIcon, 
  Settings, 
  Eye, 
  Save, 
  Plus, 
  Trash2, 
  Globe,
  Clock,
  CheckCircle2,
  X,
  Smartphone,
  Monitor
} from "lucide-react";

const SetupTemplate = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Syncing state with your Mongoose Schema
  const [siteData, setSiteData] = useState({
    slug: "vogue-studio-tunis",
    hero: { title: "Premium Barber Experience", slogan: "Precision and Style in every cut.", backgroundImage: "" },
    about: { show: true, title: "Our Story", text: "Founded in 2026...", image: "" },
    services: [
      { title: "Classic Haircut", description: "Standard cut & wash", price: "25.000", active: true }
    ],
    contact: { phone: "+216 22 000 000", socials: { instagram: "@vogue_tunis" } }
  });

  const handleInputChange = (section, field, value) => {
    setSiteData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  return (
    <div className="relative min-h-screen space-y-8 animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl">
            <Layout size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Theme Editor</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Globe size={12} /> bookiify.com/p/{siteData.slug}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsPreviewOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
          >
            <Eye size={18} /> Live Preview
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
            <Save size={18} /> Publish Site
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT: NAVIGATION --- */}
        <div className="lg:col-span-3 space-y-2">
          {['hero', 'about', 'services', 'gallery', 'hours'].map((sec) => (
            <button 
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all capitalize font-black text-sm tracking-widest ${
                activeSection === sec ? "bg-white shadow-md text-indigo-600" : "text-slate-400 hover:bg-slate-50"
              }`}
            >
              {sec} {activeSection === sec && <CheckCircle2 size={16} />}
            </button>
          ))}
        </div>

        {/* --- CENTER: EDITING FORM --- */}
        <div className="lg:col-span-9 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm min-h-[600px]">
          
          {activeSection === "hero" && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                <Settings className="text-indigo-600" />
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Hero Section</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase px-2 tracking-widest">Headline Title</label>
                  <input 
                    type="text" 
                    value={siteData.hero.title}
                    onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
                    className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase px-2 tracking-widest">Slogan / Subtitle</label>
                  <textarea 
                    rows="3"
                    value={siteData.hero.slogan}
                    onChange={(e) => handleInputChange('hero', 'slogan', e.target.value)}
                    className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold transition-all"
                  />
                </div>
                <div className="p-10 border-4 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center text-slate-400 hover:border-indigo-200 transition-all cursor-pointer">
                  <ImageIcon size={40} className="mb-2" />
                  <span className="font-black text-xs uppercase">Upload Hero Background</span>
                </div>
              </div>
            </div>
          )}

          {activeSection === "services" && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Manage Services</h3>
                <button className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all">
                  <Plus size={20} />
                </button>
              </div>

              {siteData.services.map((s, idx) => (
                <div key={idx} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-indigo-600 shadow-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900">{s.title}</h4>
                      <p className="text-xs text-slate-500 font-bold italic underline">{s.price} TND</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-rose-500"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- FULLSCREEN LIVE PREVIEW POPUP --- */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-10">
          <div className="w-full max-w-6xl h-full bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col">
            
            {/* Mockup Toolbar */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-rose-400 rounded-full" />
                <div className="w-3 h-3 bg-amber-400 rounded-full" />
                <div className="w-3 h-3 bg-emerald-400 rounded-full" />
              </div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200">
                <button className="p-2 bg-slate-100 rounded-lg text-indigo-600"><Monitor size={16} /></button>
                <button className="p-2 text-slate-400"><Smartphone size={16} /></button>
              </div>
              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 hover:bg-slate-200 rounded-full transition-all text-slate-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* The Live Content Container */}
            <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
              {/* --- MOCK PREVIEW UI START --- */}
              <div className="relative h-[400px] bg-slate-800 flex items-center justify-center text-center p-10 overflow-hidden">
                <div className="relative z-10 space-y-4">
                   <h1 className="text-6xl font-black text-white tracking-tighter">{siteData.hero.title || "Headline Goes Here"}</h1>
                   <p className="text-xl text-slate-300 font-medium max-w-2xl mx-auto">{siteData.hero.slogan || "Your slogan text will appear here."}</p>
                   <button className="px-8 py-4 bg-indigo-600 text-white font-black rounded-full uppercase tracking-widest text-sm shadow-xl">Book Appointment</button>
                </div>
                {/* Visual Placeholder for background image */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/50 to-slate-900 opacity-80" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80')] bg-cover bg-center" />
              </div>

              <div className="p-20 text-center max-w-4xl mx-auto">
                <h2 className="text-3xl font-black text-slate-900 mb-6 italic underline">{siteData.about.title}</h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {siteData.about.text || "Start writing your story in the editor to see it appear here live. This helps your customers get to know your brand better."}
                </p>
              </div>

              <div className="bg-slate-50 p-20">
                 <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-black mb-10 text-center uppercase tracking-[0.3em]">Our Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {siteData.services.map((s, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl flex justify-between items-center shadow-sm border border-slate-100">
                          <div>
                            <p className="font-black text-slate-900">{s.title}</p>
                            <p className="text-xs text-slate-500 font-medium">{s.description}</p>
                          </div>
                          <span className="font-black text-indigo-600">{s.price} TND</span>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>
              {/* --- MOCK PREVIEW UI END --- */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetupTemplate;