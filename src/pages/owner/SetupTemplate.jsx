import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from "../../api/config"; 
import { 
  Save, ArrowLeft, Eye, EyeOff, X, Camera, 
  Upload, Globe, Mail, Clock, Phone, Sparkles, Plus, Trash2, MapPin
} from 'lucide-react';

import { getThemeById } from "./ThemeRegistry";

// --- CUSTOM SVG BRAND ICONS ---
const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

const TemplateSetupForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 🛡️ Get the ID from the Gallery selection
  const themeId = location.state?.selectedThemeId || "BB_THEME_01";
  const themeConfig = getThemeById(themeId);

  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState(null); 
  const [validationErrors, setValidationErrors] = useState([]); 
  
  const heroFileRef = useRef(null);
  const aboutFileRef = useRef(null);

  const [merchantData, setMerchantData] = useState({
    templateId: themeId,
    category: location.state?.category || "barbershops",
    slug: "", 
    name: "",
    hero: { title: "", slogan: "", backgroundImage: "" },
    about: { show: true, title: "Our Story", text: "", image: "" },
    services: [{ title: "", description: "", price: "", active: true }],
    gallery: { show: true, images: ["", "", "", ""] },
    contact: {
      phone: "", email: "", address: "",
      socials: { instagram: "", facebook: "", tiktok: "" }
    },
    businessHours: [
      { day: 'Monday', open: '09:00', close: '19:00', isClosed: false },
      { day: 'Tuesday', open: '09:00', close: '19:00', isClosed: false },
      { day: 'Wednesday', open: '09:00', close: '19:00', isClosed: false },
      { day: 'Thursday', open: '09:00', close: '19:00', isClosed: false },
      { day: 'Friday', open: '09:00', close: '19:00', isClosed: false },
      { day: 'Saturday', open: '09:00', close: '19:00', isClosed: false },
      { day: 'Sunday', open: '09:00', close: '19:00', isClosed: true },
    ]
  });

  useEffect(() => {
    const fetchMySite = async () => {
      try {
        const res = await API.get('/merchant/website/my-site');
        if (res.data) {
          setMerchantData({
            ...res.data,
            // 🛡️ ALWAYS use the themeId from the Gallery state during selection
            templateId: themeId,
            // If the user picked a new category in the gallery, use that. Otherwise use saved.
            category: location.state?.category || res.data.category || "barbershops"
          });
        }
      } catch (err) {
        console.log("Starting fresh configuration.");
      }
    };
    fetchMySite();
  }, [themeId, location.state?.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValidationErrors(prev => prev.filter(err => err !== name));
    
    const keys = name.split('.');
    setMerchantData(prev => {
      let newData = { ...prev };
      if (keys.length === 3) {
        newData[keys[0]][keys[1]][keys[2]] = value;
      } else if (keys.length === 2) {
        newData[keys[0]][keys[1]] = value;
      } else {
        newData[name] = value;
      }
      return newData;
    });
  };

  const handleHourChange = (index, field, value) => {
    const newHours = [...merchantData.businessHours];
    newHours[index][field] = value;
    setMerchantData({ ...merchantData, businessHours: newHours });
  };

  const updateService = (index, field, value) => {
    const newServices = [...merchantData.services];
    newServices[index][field] = value;
    setMerchantData({ ...merchantData, services: newServices });
  };

  const handleFileUpload = async (e, targetPath, index = null) => {
    const file = e.target.files[0];
    if (!file) return;
    const fieldId = index !== null ? `${targetPath}.${index}` : targetPath;
    setUploadingField(fieldId);

    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await API.post('/merchant/website/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const secureUrl = response.data.url;

      if (index !== null) {
        const newImgs = [...merchantData.gallery.images];
        newImgs[index] = secureUrl;
        setMerchantData({ ...merchantData, gallery: { ...merchantData.gallery, images: newImgs } });
      } else {
        const keys = targetPath.split('.');
        setMerchantData(prev => ({
          ...prev,
          [keys[0]]: { ...prev[keys[0]], [keys[1]]: secureUrl }
        }));
      }
      setValidationErrors(prev => prev.filter(err => err !== fieldId));
    } catch (err) {
      alert("Upload failed.");
    } finally { setUploadingField(null); }
  };

  const handleSave = async () => {
    const errors = [];
    if (!merchantData.name) errors.push('name');
    if (!merchantData.slug) errors.push('slug');
    if (!merchantData.hero.title) errors.push('hero.title');
    if (!merchantData.hero.backgroundImage) errors.push('hero.backgroundImage');
    if (merchantData.about.show && !merchantData.about.text) errors.push('about.text');
    if (!merchantData.contact.phone) errors.push('contact.phone');
    if (!merchantData.contact.email) errors.push('contact.email');

    if (errors.length > 0) {
      setValidationErrors(errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSaving(true);
    try {
      // 🛡️ THE MASTER FIX: Specifically injecting the current themeId and current category
      const payload = { 
        ...merchantData, 
        templateId: themeId,
        category: merchantData.category // Ensure category matches the current UI
      };
      await API.post('/merchant/website/save', payload);
      alert("🚀 Website published! Your changes are live after review.");
    } catch (error) {
      alert(`Save Failed: ${error.response?.data?.message || "Error"}`);
    } finally { setIsSaving(false); }
  };

  const renderLivePreview = () => {
    const SelectedTheme = themeConfig?.component || (() => <div>Select a theme</div>);
    return <SelectedTheme data={merchantData} />;
  };

  const getErrorStyle = (field) => validationErrors.includes(field) 
    ? "border-2 border-rose-500 animate-shake ring-4 ring-rose-50" 
    : "border-none";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>

      {/* --- NAVIGATION --- */}
      <nav className="sticky top-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-slate-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate(-1)} className="p-3 hover:bg-slate-100 rounded-2xl transition-all">
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-sm font-black uppercase tracking-widest text-slate-900">Website Builder</h1>
            <div className="flex items-center gap-2">
              <span className="text-indigo-600"><Sparkles size={12} /></span>
              <p className="text-[10px] text-indigo-600 font-black uppercase tracking-[0.2em]">{themeConfig?.name}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={() => setShowPreview(true)} className="flex items-center gap-3 bg-white border border-slate-200 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-indigo-600 transition-all">
            <Eye size={16} /> Live Preview
          </button>
          <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-3 bg-indigo-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
            {isSaving ? "Publishing..." : <><Save size={16} /> Save & Publish</>}
          </button>
        </div>
      </nav>

      {/* --- FORM SECTIONS (Branding, About, Services, etc.) --- */}
      <div className="max-w-5xl mx-auto py-16 px-8 space-y-12">
        
        {/* 01: BRANDING */}
        <section className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black">01</div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">Branding & Hero</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-400">Business Name *</label>
              <input name="name" value={merchantData.name} onChange={handleChange} className={`w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none transition-all ${getErrorStyle('name')}`} placeholder="Vogue Studio" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-400">Website URL (Slug) *</label>
              <div className="relative">
                <input name="slug" value={merchantData.slug} onChange={handleChange} className={`w-full p-5 bg-slate-50 rounded-2xl font-bold pl-12 outline-none transition-all ${getErrorStyle('slug')}`} placeholder="vogue-studio" />
                <Globe size={16} className="absolute left-5 top-5 text-slate-400" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-400">Hero Title *</label>
              <input name="hero.title" value={merchantData.hero.title} onChange={handleChange} className={`w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none transition-all ${getErrorStyle('hero.title')}`} placeholder="Title" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-400">Hero Slogan</label>
              <input name="hero.slogan" value={merchantData.hero.slogan} onChange={handleChange} className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-none outline-none" placeholder="Slogan" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase text-slate-400">Hero Background *</label>
            <div className={`flex gap-4 p-2 bg-slate-50 rounded-2xl transition-all ${getErrorStyle('hero.backgroundImage')}`}>
              <input name="hero.backgroundImage" value={merchantData.hero.backgroundImage} onChange={handleChange} className="flex-grow p-3 bg-transparent text-xs outline-none" placeholder="Cloud URL..." readOnly />
              <button onClick={() => heroFileRef.current.click()} className="bg-slate-900 text-white px-6 rounded-xl hover:bg-indigo-600 transition-all flex items-center gap-2">
                {uploadingField === 'hero.backgroundImage' ? '...' : <Upload size={18}/>}
              </button>
              <input type="file" ref={heroFileRef} className="hidden" onChange={(e) => handleFileUpload(e, 'hero.backgroundImage')} />
            </div>
          </div>
        </section>

        {/* 02: ABOUT */}
        <section className={`bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 space-y-10 transition-all ${!merchantData.about.show && 'opacity-60 grayscale'}`}>
          <div className="flex justify-between items-center">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black">02</div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">Our Story</h2>
             </div>
             <button onClick={() => setMerchantData(p => ({...p, about: {...p.about, show: !p.about.show}}))} className={`p-3 rounded-xl ${merchantData.about.show ? 'bg-indigo-600 text-white' : 'bg-slate-200'}`}>
                {merchantData.about.show ? <Eye size={20} /> : <EyeOff size={20} />}
             </button>
          </div>
          {merchantData.about.show && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <input name="about.title" value={merchantData.about.title} onChange={handleChange} className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-none outline-none" placeholder="About Title" />
                <textarea name="about.text" value={merchantData.about.text} onChange={handleChange} className={`w-full p-5 bg-slate-50 rounded-2xl h-40 text-sm outline-none resize-none transition-all ${getErrorStyle('about.text')}`} placeholder="Tell your story..." />
              </div>
              <div onClick={() => aboutFileRef.current.click()} className="h-full min-h-[200px] border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden relative">
                 {merchantData.about.image ? <img src={merchantData.about.image} className="w-full h-full object-cover" alt="about" /> : <Camera className="text-slate-300" />}
                 {uploadingField === 'about.image' && <div className="absolute inset-0 bg-white/60 flex items-center justify-center font-black text-[10px]">UPLOADING...</div>}
                 <input type="file" ref={aboutFileRef} className="hidden" onChange={(e) => handleFileUpload(e, 'about.image')} />
              </div>
            </div>
          )}
        </section>

        {/* 03: SERVICES */}
        <section className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-4">
              <span className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">03</span>
              Price List
            </h2>
            <button onClick={() => setMerchantData(p => ({...p, services: [...p.services, {title:"", description:"", price:"", active:true}]}))} className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 flex items-center gap-2">
              <Plus size={16} /> Add Service
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {merchantData.services.map((s, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative group">
                <button onClick={() => setMerchantData(p => ({...p, services: p.services.filter((_,i) => i !== idx)}))} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <input value={s.title} onChange={(e) => updateService(idx, 'title', e.target.value)} className="flex-grow bg-slate-50 rounded-xl p-4 font-bold text-sm border-none outline-none" placeholder="Service Name" />
                    <input value={s.price} onChange={(e) => updateService(idx, 'price', e.target.value)} className="w-28 bg-indigo-50 text-indigo-600 rounded-xl p-4 font-black text-center border-none outline-none" placeholder="Price" />
                  </div>
                  <textarea value={s.description} onChange={(e) => updateService(idx, 'description', e.target.value)} className="w-full bg-slate-50 rounded-xl p-4 text-xs h-20 border-none outline-none resize-none" placeholder="Description..." />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 04: CONTACT & SOCIALS */}
        <section className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 space-y-10">
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-4">
            <span className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">04</span>
            Contact & Socials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-5">
              <div className={`flex items-center gap-4 bg-slate-50 rounded-2xl p-2 pr-5 transition-all ${getErrorStyle('contact.phone')}`}>
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm"><Phone size={18}/></div>
                <input name="contact.phone" value={merchantData.contact.phone} onChange={handleChange} className="flex-grow bg-transparent font-bold text-sm outline-none border-none" placeholder="Phone Number" />
              </div>
              <div className={`flex items-center gap-4 bg-slate-50 rounded-2xl p-2 pr-5 transition-all ${getErrorStyle('contact.email')}`}>
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm"><Mail size={18}/></div>
                <input name="contact.email" value={merchantData.contact.email} onChange={handleChange} className="flex-grow bg-transparent font-bold text-sm outline-none border-none" placeholder="Business Email" />
              </div>
              <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-2 pr-5">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm"><MapPin size={18}/></div>
                <input name="contact.address" value={merchantData.contact.address} onChange={handleChange} className="flex-grow bg-transparent font-bold text-sm outline-none border-none" placeholder="Physical Address" />
              </div>
            </div>
            <div className="space-y-5">
               <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-2 pr-5">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm"><InstagramIcon size={18}/></div>
                <input name="contact.socials.instagram" value={merchantData.contact.socials.instagram} onChange={handleChange} className="flex-grow bg-transparent font-bold text-sm outline-none border-none" placeholder="@username" />
              </div>
              <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-2 pr-5">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm"><FacebookIcon size={18}/></div>
                <input name="contact.socials.facebook" value={merchantData.contact.socials.facebook} onChange={handleChange} className="flex-grow bg-transparent font-bold text-sm outline-none border-none" placeholder="facebook.com/..." />
              </div>
              <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-2 pr-5">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-900 shadow-sm"><TikTokIcon size={18}/></div>
                <input name="contact.socials.tiktok" value={merchantData.contact.socials.tiktok} onChange={handleChange} className="flex-grow bg-transparent font-bold text-sm outline-none border-none" placeholder="@tiktokuser" />
              </div>
            </div>
          </div>
        </section>

        {/* 05: WORKING HOURS */}
        <section className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 space-y-10">
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-4">
            <span className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black">05</span>
            Working Hours
          </h2>
          <div className="space-y-3">
            {merchantData.businessHours.map((bh, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group transition-all hover:bg-slate-100">
                <span className="w-24 text-[11px] font-black uppercase text-slate-500">{bh.day}</span>
                <div className="flex items-center gap-4">
                  {!bh.isClosed ? (
                    <div className="flex items-center gap-2">
                      <input type="time" value={bh.open} onChange={(e) => handleHourChange(idx, 'open', e.target.value)} className="bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold" />
                      <span className="text-slate-400 text-[10px] font-bold">to</span>
                      <input type="time" value={bh.close} onChange={(e) => handleHourChange(idx, 'close', e.target.value)} className="bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold" />
                    </div>
                  ) : (
                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest px-8">Closed</span>
                  )}
                  <button onClick={() => handleHourChange(idx, 'isClosed', !bh.isClosed)} className={`ml-4 text-[9px] font-black uppercase p-2 rounded-lg ${bh.isClosed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    {bh.isClosed ? 'Open' : 'Close'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 06: GALLERY */}
        <section className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 space-y-10">
           <div className="flex justify-between items-center">
             <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-4">
                <span className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">06</span>
                Gallery Showcase
             </h2>
             <button onClick={() => setMerchantData(p => ({...p, gallery: {...p.gallery, show: !p.gallery.show}}))} className={`p-3 rounded-xl ${merchantData.gallery.show ? 'bg-indigo-600 text-white' : 'bg-slate-200'}`}>
                {merchantData.gallery.show ? <Eye size={20} /> : <EyeOff size={20} />}
             </button>
          </div>
          {merchantData.gallery.show && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {merchantData.gallery.images.map((img, idx) => (
                <div key={idx} className="group relative aspect-square bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center">
                  {img ? <img src={img} className="w-full h-full object-cover" alt="gallery" /> : <Camera className="text-slate-300" />}
                  {uploadingField === `gallery.${idx}` && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer bg-white p-3 rounded-full shadow-lg">
                      <Upload size={16} />
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'gallery', idx)} />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* --- PREVIEW MODAL --- */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 md:p-12">
          <div className="bg-white w-full h-full rounded-[3rem] overflow-hidden relative shadow-2xl border-4 border-white/20">
            <button onClick={() => setShowPreview(false)} className="absolute top-8 right-8 z-[110] bg-black text-white p-5 rounded-full hover:bg-indigo-600 transition-all shadow-xl">
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