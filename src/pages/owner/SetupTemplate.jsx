import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
  Save, ArrowLeft, Eye, EyeOff, X, Camera, 
  Upload, Link as LinkIcon, MapPin, Phone, Sparkles, Plus, Trash2
} from 'lucide-react';

// Import our new Central Registry
import { getThemeById } from "../owner/ThemeRegistry";

const TemplateSetupForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get themeId from navigation state (passed from Gallery)
  const themeId = location.state?.selectedThemeId || "BB_THEME_01";
  const themeConfig = getThemeById(themeId);

  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);
  const aboutFileRef = useRef(null);

  // 1. Model-Compliant State Structure
  const [merchantData, setMerchantData] = useState({
    templateId: themeId,
    name: "",
    slug: "", 
    hero: {
      title: "",
      slogan: "",
      backgroundImage: themeConfig?.cardBg || ""
    },
    about: {
      show: true,
      title: "Our Story",
      text: "",
      image: ""
    },
    services: [
      { title: "Premium Service", description: "Deep cleaning and styling.", price: "50", active: true }
    ],
    gallery: {
      show: true,
      images: ["", "", "", ""]
    },
    contact: {
      phone: "",
      address: "",
      socials: { instagram: "", facebook: "", tiktok: "" }
    },
    businessHours: [
      { day: 'Monday', open: '09:00', close: '19:00', isClosed: false },
      { day: 'Tuesday', open: '09:00', close: '19:00', isClosed: false },
      { day: 'Wednesday', open: '09:00', close: '19:00', isClosed: false },
      { day: 'Thursday', open: '09:00', close: '19:00', isClosed: false },
      { day: 'Friday', open: '09:00', close: '19:00', isClosed: false },
      { day: 'Saturday', open: '09:00', close: '19:00', isClosed: false },
      { day: 'Sunday', isClosed: true },
    ]
  });

  // Load existing data if available
  useEffect(() => {
    const fetchMySite = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/merchant/website/my-site', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data) setMerchantData(res.data);
      } catch (err) {
        console.log("Starting with default template data.");
      }
    };
    fetchMySite();
  }, []);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    
    if (keys.length === 3) { 
        setMerchantData(prev => ({
            ...prev,
            [keys[0]]: {
                ...prev[keys[0]],
                [keys[1]]: { ...prev[keys[0]][keys[1]], [keys[2]]: value }
            }
        }));
    } else if (keys.length === 2) { 
        setMerchantData(prev => ({
            ...prev,
            [keys[0]]: { ...prev[keys[0]], [keys[1]]: value }
        }));
    } else {
        setMerchantData(prev => ({ ...prev, [name]: value }));
    }
  };

  const updateService = (index, field, value) => {
    const newServices = [...merchantData.services];
    newServices[index][field] = value;
    setMerchantData({ ...merchantData, services: newServices });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/merchant/website/save', merchantData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Website published successfully!");
    } catch (error) {
      alert("Failed to save. Connect your backend to finish.");
    } finally {
      setIsSaving(false);
    }
  };

  // The Magic Injection: Renders whichever theme was selected in the gallery
  const renderLivePreview = () => {
    if (!themeConfig) return <div className="p-20 text-center font-black">Theme Not Found</div>;
    const SelectedTheme = themeConfig.component;
    return <SelectedTheme data={merchantData} />;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* --- TOP STICKY BAR --- */}
      <nav className="sticky top-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-slate-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate(-1)} className="p-3 hover:bg-slate-100 rounded-2xl transition-all">
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div className="h-10 w-[1px] bg-slate-200" />
          <div>
            <h1 className="text-sm font-black uppercase tracking-widest text-slate-900">Site Editor</h1>
            <div className="flex items-center gap-2">
              <Sparkles size={12} className="text-indigo-500" />
              <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.2em]">{themeConfig?.name}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={() => setShowPreview(true)} className="flex items-center gap-3 bg-white border border-slate-200 text-slate-900 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-indigo-500 transition-all shadow-sm">
            <Eye size={16} /> Live Preview
          </button>
          <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-3 bg-indigo-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
            {isSaving ? "Saving..." : <><Save size={16} /> Save & Publish</>}
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-16 px-8 space-y-12">
        {/* STEP 1: HERO */}
        <section className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 space-y-10">
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-4">
            <span className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-sm">01</span>
            Hero Branding
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase text-slate-400">Business Name</label>
              <input name="name" value={merchantData.name} onChange={handleChange} className="w-full bg-slate-50 rounded-2xl p-5 text-sm font-bold outline-none border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all" placeholder="Vogue Luxury" />
            </div>
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase text-slate-400">Website Slug (URL)</label>
              <input name="slug" value={merchantData.slug} onChange={handleChange} className="w-full bg-slate-50 rounded-2xl p-5 text-sm font-bold outline-none border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all" placeholder="vogue-luxury" />
            </div>
            <div className="space-y-3 md:col-span-2">
              <label className="text-[11px] font-black uppercase text-slate-400">Hero Title</label>
              <input name="hero.title" value={merchantData.hero.title} onChange={handleChange} className="w-full bg-slate-50 rounded-2xl p-5 text-sm font-bold outline-none border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all" placeholder="Where style meets precision" />
            </div>
          </div>
        </section>

        {/* STEP 2: SERVICES */}
        <section className="space-y-8">
          <div className="flex justify-between items-center px-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-4">
              <span className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-sm">02</span>
              Pricing & Services
            </h2>
            <button onClick={() => setMerchantData(p => ({...p, services: [...p.services, {title:"", description:"", price:"", active:true}]}))} className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 flex items-center gap-2">
              <Plus size={16} /> Add Service
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {merchantData.services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative group hover:border-indigo-200 transition-all">
                <button onClick={() => setMerchantData(p => ({...p, services: p.services.filter((_,i) => i !== index)}))} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <input value={service.title} onChange={(e) => updateService(index, 'title', e.target.value)} className="flex-grow bg-slate-50 rounded-xl p-4 text-[11px] font-black uppercase tracking-widest outline-none focus:bg-white" placeholder="Service Name" />
                    <input value={service.price} onChange={(e) => updateService(index, 'price', e.target.value)} className="w-32 bg-indigo-50 text-indigo-600 rounded-xl p-4 text-[11px] font-black uppercase text-center outline-none" placeholder="Price" />
                  </div>
                  <textarea value={service.description} onChange={(e) => updateService(index, 'description', e.target.value)} className="w-full bg-slate-50 rounded-xl p-4 text-xs font-medium h-24 outline-none border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all" placeholder="Brief description..." />
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Note: I've kept the structure but moved to the indigo/slate color palette to match your new professional dashboard theme */}
      </div>

      {/* --- PREVIEW MODAL --- */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-in zoom-in duration-300">
          <div className="bg-white w-full h-full rounded-[3rem] overflow-hidden shadow-2xl relative">
            <button onClick={() => setShowPreview(false)} className="absolute top-8 right-8 z-[110] bg-slate-900 text-white p-5 rounded-full hover:bg-indigo-600 transition-all shadow-2xl scale-110 active:scale-95">
              <X size={24} />
            </button>
            <div className="h-full w-full overflow-y-auto">
              {renderLivePreview()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSetupForm;