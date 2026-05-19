import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from "../../api/config"; 
import {
  Save, ArrowLeft, Eye, EyeOff, X, Camera,
  Upload, Globe, Mail, Clock, Phone, Sparkles, Plus, Trash2, MapPin,
  CalendarRange, Timer, Video, Play, AlertCircle, CheckCircle2
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
  
  const heroFileRef  = useRef(null);
  const aboutFileRef = useRef(null);
  const reelFileRef  = useRef(null);

  const [merchantData, setMerchantData] = useState({
    templateId: themeId,
    category: location.state?.category || "barbershops",
    slug: "", 
    name: "",
    hero: { title: "", slogan: "", backgroundImage: "" },
    about: { show: true, title: "Our Story", text: "", image: "" },
    services: [{ title: "", description: "", price: "", duration: 30, bufferTime: 0, active: true }],
    gallery: { show: true, images: ["", "", "", ""] },
    beforeAfterGallery: [],
    presentationReel: { show: false, videoUrl: '', title: 'Notre savoir-faire en vidéo', subtitle: '' },
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
    ],
    seasonalHours: [],
    setupConfig: {
      maxCustomersPerDay: 25,
      restMinutesBetweenConsultations: 0,
      pauseWindows: [{ label: "Lunch break", start: "12:00", end: "13:00" }],
      localization: { country: "", city: "", address: "", timezone: "UTC" }
    }
  });

  useEffect(() => {
    const fetchMySite = async () => {
      try {
        const res = await API.get('/merchant/website/my-site');
        if (res.data) {
          const incomingConfig = res.data.setupConfig || {};
          setMerchantData({
            ...res.data,
            templateId: themeId,
            category: location.state?.category || res.data.category || "barbershops",
            seasonalHours: res.data.seasonalHours || [],
            beforeAfterGallery: res.data.beforeAfterGallery || [],
            presentationReel: res.data.presentationReel || { show: false, videoUrl: '', title: 'Notre savoir-faire en vidéo', subtitle: '' },
            setupConfig: {
              maxCustomersPerDay: incomingConfig.maxCustomersPerDay ?? 25,
              restMinutesBetweenConsultations: incomingConfig.restMinutesBetweenConsultations ?? 0,
              pauseWindows: incomingConfig.pauseWindows?.length
                ? incomingConfig.pauseWindows
                : [{ label: "Lunch break", start: "12:00", end: "13:00" }],
              localization: {
                country: incomingConfig.localization?.country || "",
                city: incomingConfig.localization?.city || "",
                address: incomingConfig.localization?.address || "",
                timezone: incomingConfig.localization?.timezone || "UTC"
              }
            }
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

  const updateSetupConfig = (field, value) => {
    setMerchantData(prev => ({
      ...prev,
      setupConfig: {
        ...prev.setupConfig,
        [field]: value
      }
    }));
  };

  const updatePauseWindow = (index, field, value) => {
    setMerchantData(prev => {
      const next = [...(prev.setupConfig?.pauseWindows || [])];
      next[index] = { ...next[index], [field]: value };
      return {
        ...prev,
        setupConfig: {
          ...prev.setupConfig,
          pauseWindows: next
        }
      };
    });
  };

  const updateLocalization = (field, value) => {
    setMerchantData(prev => ({
      ...prev,
      setupConfig: {
        ...prev.setupConfig,
        localization: {
          ...prev.setupConfig.localization,
          [field]: value
        }
      }
    }));
  };

  const addSeasonalHour = () => {
    setMerchantData(prev => ({
      ...prev,
      seasonalHours: [
        ...(prev.seasonalHours || []),
        { label: 'Special Period', startDate: '', endDate: '', isClosed: false, open: '09:00', close: '18:00' }
      ]
    }));
  };

  const removeSeasonalHour = (idx) => {
    setMerchantData(prev => ({
      ...prev,
      seasonalHours: (prev.seasonalHours || []).filter((_, i) => i !== idx)
    }));
  };

  const updateSeasonalHour = (idx, field, value) => {
    setMerchantData(prev => {
      const next = [...(prev.seasonalHours || [])];
      next[idx] = { ...next[idx], [field]: value };
      return { ...prev, seasonalHours: next };
    });
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

  const handleReelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Client-side duration check via HTMLVideoElement
    const checkDuration = () =>
      new Promise((resolve) => {
        const vid = document.createElement('video');
        vid.preload = 'metadata';
        vid.onloadedmetadata = () => { URL.revokeObjectURL(vid.src); resolve(vid.duration); };
        vid.onerror = () => resolve(null);
        vid.src = URL.createObjectURL(file);
      });

    const duration = await checkDuration();
    if (duration !== null && duration > 32) {
      alert(`⚠️ Video too long (${Math.round(duration)}s). Maximum is 30 seconds.`);
      e.target.value = '';
      return;
    }

    setUploadingField('presentationReel');
    try {
      const formData = new FormData();
      formData.append('presentationReel', file);
      const res = await API.post('/merchant/website/upload/reel', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMerchantData(prev => ({
        ...prev,
        presentationReel: {
          ...prev.presentationReel,
          show: true,
          videoUrl: res.data.url,
        },
      }));
    } catch (err) {
      alert(err.response?.data?.message || 'Reel upload failed.');
    } finally {
      setUploadingField(null);
      e.target.value = '';
    }
  };

  const handleReelDelete = async () => {
    if (!window.confirm('Remove this presentation reel?')) return;
    setUploadingField('reelDelete');
    try {
      await API.delete('/merchant/website/upload/reel');
      setMerchantData(prev => ({
        ...prev,
        presentationReel: { show: false, videoUrl: '', title: prev.presentationReel?.title || '', subtitle: '' },
      }));
    } catch {
      alert('Could not remove reel.');
    } finally {
      setUploadingField(null);
    }
  };

  const handleBeforeAfterImageUpload = async (pairIdx, side, file) => {
    if (!file) return;
    const fieldKey = `ba.${pairIdx}.${side}`;
    setUploadingField(fieldKey);
    try {
      const formData = new FormData();
      formData.append('beforeAfterImage', file);
      const res = await API.post('/merchant/website/upload/beforeafter', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMerchantData(prev => {
        const gallery = [...(prev.beforeAfterGallery || [])];
        gallery[pairIdx] = { ...gallery[pairIdx], [side]: res.data.url };
        return { ...prev, beforeAfterGallery: gallery };
      });
    } catch {
      alert('Image upload failed.');
    } finally {
      setUploadingField(null);
    }
  };

  const addBeforeAfterPair = () => {
    if ((merchantData.beforeAfterGallery || []).length >= 10) return;
    setMerchantData(prev => ({
      ...prev,
      beforeAfterGallery: [...(prev.beforeAfterGallery || []), { before: '', after: '', caption: '' }],
    }));
  };

  const removeBeforeAfterPair = (idx) => {
    setMerchantData(prev => ({
      ...prev,
      beforeAfterGallery: (prev.beforeAfterGallery || []).filter((_, i) => i !== idx),
    }));
  };

  const updateBeforeAfterCaption = (idx, value) => {
    setMerchantData(prev => {
      const gallery = [...(prev.beforeAfterGallery || [])];
      gallery[idx] = { ...gallery[idx], caption: value };
      return { ...prev, beforeAfterGallery: gallery };
    });
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
            <button onClick={() => setMerchantData(p => ({...p, services: [...p.services, {title:"", description:"", price:"", duration:30, bufferTime:0, active:true}]}))} className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 flex items-center gap-2">
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
                  <div className="flex gap-3">
                    <div className="flex-1 space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1"><Clock size={10} /> Duration (min)</label>
                      <input type="number" min="5" max="480" value={s.duration || 30} onChange={(e) => updateService(idx, 'duration', Number(e.target.value))} className="w-full bg-slate-100 text-slate-700 rounded-xl p-3 font-black text-center border-none outline-none" placeholder="30" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1"><Timer size={10} /> Buffer (min)</label>
                      <input type="number" min="0" max="120" value={s.bufferTime ?? 0} onChange={(e) => updateService(idx, 'bufferTime', Number(e.target.value))} className="w-full bg-amber-50 text-amber-700 rounded-xl p-3 font-black text-center border-none outline-none" placeholder="0" />
                    </div>
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

        {/* 06: SEASONAL HOURS */}
        <section className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-4">
              <span className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                <CalendarRange size={22} />
              </span>
              Special Periods
            </h2>
            <button
              onClick={addSeasonalHour}
              className="bg-amber-500 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 flex items-center gap-2 transition-all"
            >
              <Plus size={16} /> Add Period
            </button>
          </div>

          <p className="text-sm text-slate-500 font-medium -mt-2">
            Override your weekly hours for holidays, vacations, or special events. These take priority over regular business hours.
          </p>

          {(merchantData.seasonalHours || []).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-200 rounded-3xl text-center">
              <CalendarRange size={40} className="text-slate-300 mb-3" />
              <p className="text-sm font-bold text-slate-400">No special periods configured</p>
              <p className="text-xs text-slate-400 mt-1">Add a period for holidays, vacations, or events</p>
            </div>
          ) : (
            <div className="space-y-4">
              {(merchantData.seasonalHours || []).map((sh, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-6 space-y-4 relative border border-slate-100">
                  <button
                    onClick={() => removeSeasonalHour(idx)}
                    className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-8">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400">Period Label</label>
                      <input
                        value={sh.label || ''}
                        onChange={(e) => updateSeasonalHour(idx, 'label', e.target.value)}
                        className="w-full bg-white rounded-xl px-4 py-3 text-sm font-bold outline-none border border-slate-200"
                        placeholder="e.g. Summer Vacation"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400">Start Date</label>
                      <input
                        type="date"
                        value={sh.startDate || ''}
                        onChange={(e) => updateSeasonalHour(idx, 'startDate', e.target.value)}
                        className="w-full bg-white rounded-xl px-4 py-3 text-sm font-bold outline-none border border-slate-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400">End Date</label>
                      <input
                        type="date"
                        value={sh.endDate || ''}
                        onChange={(e) => updateSeasonalHour(idx, 'endDate', e.target.value)}
                        className="w-full bg-white rounded-xl px-4 py-3 text-sm font-bold outline-none border border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateSeasonalHour(idx, 'isClosed', !sh.isClosed)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        sh.isClosed
                          ? 'bg-rose-100 text-rose-600 border border-rose-200'
                          : 'bg-emerald-100 text-emerald-600 border border-emerald-200'
                      }`}
                    >
                      {sh.isClosed ? 'Closed All Day' : 'Open — Custom Hours'}
                    </button>

                    {!sh.isClosed && (
                      <div className="flex items-center gap-3">
                        <input
                          type="time"
                          value={sh.open || '09:00'}
                          onChange={(e) => updateSeasonalHour(idx, 'open', e.target.value)}
                          className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold outline-none"
                        />
                        <span className="text-slate-400 text-xs font-bold">to</span>
                        <input
                          type="time"
                          value={sh.close || '18:00'}
                          onChange={(e) => updateSeasonalHour(idx, 'close', e.target.value)}
                          className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold outline-none"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 07: GALLERY */}
        <section className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 space-y-10">
           <div className="flex justify-between items-center">
             <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-4">
                <span className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">07</span>
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

        {/* 07B: BEFORE & AFTER GALLERY */}
        <section className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-4">
              <span className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                <Camera size={22} />
              </span>
              Before &amp; After
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                {(merchantData.beforeAfterGallery || []).length} / 10
              </span>
              <button
                onClick={addBeforeAfterPair}
                disabled={(merchantData.beforeAfterGallery || []).length >= 10}
                className="bg-amber-500 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus size={16} /> Add Pair
              </button>
            </div>
          </div>

          <p className="text-sm text-slate-500 font-medium -mt-2">
            Showcase your transformations. Upload before &amp; after image pairs to build trust with potential clients. Max 10 pairs.
          </p>

          {(merchantData.beforeAfterGallery || []).length === 0 ? (
            <div
              onClick={addBeforeAfterPair}
              className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-amber-200 rounded-3xl bg-amber-50/30 cursor-pointer hover:bg-amber-50/60 hover:border-amber-400 transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-amber-100 group-hover:bg-amber-200 flex items-center justify-center transition-all mb-3">
                <Camera size={26} className="text-amber-600" />
              </div>
              <p className="text-sm font-black text-slate-700">Add your first transformation</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Click to add a before &amp; after pair</p>
            </div>
          ) : (
            <div className="space-y-6">
              {(merchantData.beforeAfterGallery || []).map((pair, idx) => (
                <div key={idx} className="bg-slate-50 rounded-3xl p-6 space-y-4 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Pair {idx + 1}</span>
                    <button onClick={() => removeBeforeAfterPair(idx)} className="text-slate-300 hover:text-rose-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Before */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" /> Before
                      </label>
                      <div
                        className="relative aspect-square bg-white rounded-2xl border-2 border-dashed border-rose-200 overflow-hidden flex items-center justify-center cursor-pointer hover:border-rose-400 hover:bg-rose-50/40 transition-all group"
                        onClick={() => {
                          const inp = document.createElement('input');
                          inp.type = 'file'; inp.accept = 'image/*';
                          inp.onchange = (e) => handleBeforeAfterImageUpload(idx, 'before', e.target.files[0]);
                          inp.click();
                        }}
                      >
                        {pair.before
                          ? <img src={pair.before} className="w-full h-full object-cover" alt="before" />
                          : <div className="flex flex-col items-center gap-2">
                              <Upload size={20} className="text-rose-300" />
                              <span className="text-[10px] font-black text-rose-300 uppercase tracking-wider">Upload</span>
                            </div>
                        }
                        {uploadingField === `ba.${idx}.before` && (
                          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                        {pair.before && (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="bg-white rounded-full p-2"><Upload size={14} /></div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* After */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> After
                      </label>
                      <div
                        className="relative aspect-square bg-white rounded-2xl border-2 border-dashed border-emerald-200 overflow-hidden flex items-center justify-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/40 transition-all group"
                        onClick={() => {
                          const inp = document.createElement('input');
                          inp.type = 'file'; inp.accept = 'image/*';
                          inp.onchange = (e) => handleBeforeAfterImageUpload(idx, 'after', e.target.files[0]);
                          inp.click();
                        }}
                      >
                        {pair.after
                          ? <img src={pair.after} className="w-full h-full object-cover" alt="after" />
                          : <div className="flex flex-col items-center gap-2">
                              <Upload size={20} className="text-emerald-300" />
                              <span className="text-[10px] font-black text-emerald-300 uppercase tracking-wider">Upload</span>
                            </div>
                        }
                        {uploadingField === `ba.${idx}.after` && (
                          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                        {pair.after && (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="bg-white rounded-full p-2"><Upload size={14} /></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400">Caption (optional)</label>
                    <input
                      value={pair.caption || ''}
                      onChange={(e) => updateBeforeAfterCaption(idx, e.target.value)}
                      maxLength={120}
                      className="w-full bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none border border-slate-200"
                      placeholder="e.g. Complete color transformation — 3h session"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 06B: PRESENTATION REEL — optional 30s showcase video */}
        <section className={`bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 space-y-8 transition-all ${!merchantData.presentationReel?.show && merchantData.presentationReel?.videoUrl === '' ? '' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center">
                <Video size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">Presentation Reel</h2>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Optional · Max 30 seconds</p>
              </div>
            </div>
            {/* Toggle show/hide on the profile */}
            {merchantData.presentationReel?.videoUrl && (
              <button
                onClick={() => setMerchantData(p => ({
                  ...p,
                  presentationReel: { ...p.presentationReel, show: !p.presentationReel.show }
                }))}
                className={`p-3 rounded-xl transition-all ${merchantData.presentationReel.show ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}
              >
                {merchantData.presentationReel.show ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            )}
          </div>

          {/* Info banner */}
          <div className="flex items-start gap-3 rounded-2xl bg-violet-50 border border-violet-100 px-5 py-4">
            <AlertCircle size={16} className="text-violet-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs font-semibold text-violet-700 leading-relaxed">
              Add a short video (max 30s) showcasing your skills, your space, or your work. It will autoplay (muted) on your public profile in a dedicated section. You can skip this step and add it later.
            </p>
          </div>

          {/* Upload area */}
          {!merchantData.presentationReel?.videoUrl ? (
            <div
              onClick={() => reelFileRef.current?.click()}
              className="relative flex flex-col items-center justify-center min-h-[220px] border-2 border-dashed border-violet-200 rounded-[2rem] bg-violet-50/40 cursor-pointer hover:bg-violet-50 hover:border-violet-400 transition-all group"
            >
              {uploadingField === 'presentationReel' ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-violet-400 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs font-black uppercase tracking-widest text-violet-500">Uploading…</p>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-violet-100 group-hover:bg-violet-200 flex items-center justify-center transition-all mb-3">
                    <Play size={28} className="text-violet-600 ml-1" />
                  </div>
                  <p className="text-sm font-black text-slate-700">Click to upload your reel</p>
                  <p className="text-xs text-slate-400 font-medium mt-1">MP4, MOV, WEBM · Max 30 seconds · Up to 80 MB</p>
                </>
              )}
              <input
                ref={reelFileRef}
                type="file"
                accept="video/mp4,video/quicktime,video/webm"
                className="hidden"
                onChange={handleReelUpload}
              />
            </div>
          ) : (
            <div className="space-y-5">
              {/* Video preview */}
              <div className="relative rounded-[2rem] overflow-hidden bg-slate-950 aspect-video">
                <video
                  src={merchantData.presentationReel.videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                />
                <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-emerald-500/90 backdrop-blur px-3 py-1">
                  <CheckCircle2 size={12} className="text-white" />
                  <span className="text-[11px] font-black text-white">Reel uploaded</span>
                </div>
              </div>

              {/* Caption fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400">Section Title</label>
                  <input
                    value={merchantData.presentationReel.title || ''}
                    onChange={(e) => setMerchantData(p => ({ ...p, presentationReel: { ...p.presentationReel, title: e.target.value } }))}
                    className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-sm outline-none"
                    placeholder="Notre savoir-faire en vidéo"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400">Subtitle (optional)</label>
                  <input
                    value={merchantData.presentationReel.subtitle || ''}
                    onChange={(e) => setMerchantData(p => ({ ...p, presentationReel: { ...p.presentationReel, subtitle: e.target.value } }))}
                    className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-sm outline-none"
                    placeholder="Regardez notre équipe en action"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => reelFileRef.current?.click()}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-700 hover:border-violet-400 hover:text-violet-600 transition-all"
                >
                  <Upload size={14} /> Replace video
                </button>
                <button
                  onClick={handleReelDelete}
                  disabled={uploadingField === 'reelDelete'}
                  className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3 text-xs font-black uppercase tracking-widest text-rose-600 hover:bg-rose-100 transition-all disabled:opacity-50"
                >
                  <Trash2 size={14} /> {uploadingField === 'reelDelete' ? 'Removing…' : 'Remove'}
                </button>
                <input
                  ref={reelFileRef}
                  type="file"
                  accept="video/mp4,video/quicktime,video/webm"
                  className="hidden"
                  onChange={handleReelUpload}
                />
              </div>
            </div>
          )}
        </section>

        {/* 07: BOOKING CONFIGURATION */}
        <section className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 space-y-10">
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-4">
            <span className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">08</span>
            Booking Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-400">Max Customers / Day</label>
              <input
                type="number"
                min="1"
                max="500"
                value={merchantData.setupConfig?.maxCustomersPerDay ?? 25}
                onChange={(e) => updateSetupConfig('maxCustomersPerDay', Number(e.target.value))}
                className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-400">Rest Between Consultations (Minutes)</label>
              <input
                type="number"
                min="0"
                max="180"
                value={merchantData.setupConfig?.restMinutesBetweenConsultations ?? 0}
                onChange={(e) => updateSetupConfig('restMinutesBetweenConsultations', Number(e.target.value))}
                className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black uppercase text-slate-700 tracking-widest">Pause Windows</h3>
              <button
                onClick={() => setMerchantData(prev => ({
                  ...prev,
                  setupConfig: {
                    ...prev.setupConfig,
                    pauseWindows: [...(prev.setupConfig?.pauseWindows || []), { label: "Pause", start: "12:00", end: "13:00" }]
                  }
                }))}
                className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest"
              >
                Add Pause
              </button>
            </div>

            {(merchantData.setupConfig?.pauseWindows || []).map((pause, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl items-center">
                <input
                  value={pause.label || ""}
                  onChange={(e) => updatePauseWindow(idx, 'label', e.target.value)}
                  className="md:col-span-2 bg-white rounded-xl px-4 py-3 text-sm font-bold outline-none"
                  placeholder="Pause label"
                />
                <input
                  type="time"
                  value={pause.start || "12:00"}
                  onChange={(e) => updatePauseWindow(idx, 'start', e.target.value)}
                  className="bg-white rounded-xl px-4 py-3 text-sm font-bold outline-none"
                />
                <div className="flex gap-2">
                  <input
                    type="time"
                    value={pause.end || "13:00"}
                    onChange={(e) => updatePauseWindow(idx, 'end', e.target.value)}
                    className="w-full bg-white rounded-xl px-4 py-3 text-sm font-bold outline-none"
                  />
                  <button
                    onClick={() => setMerchantData(prev => ({
                      ...prev,
                      setupConfig: {
                        ...prev.setupConfig,
                        pauseWindows: (prev.setupConfig?.pauseWindows || []).filter((_, i) => i !== idx)
                      }
                    }))}
                    className="p-3 rounded-xl bg-rose-100 text-rose-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 08: LOCALIZATION */}
        <section className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 space-y-10">
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-4">
            <span className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">09</span>
            Localization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input value={merchantData.setupConfig?.localization?.country || ""} onChange={(e) => updateLocalization('country', e.target.value)} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none" placeholder="Country" />
            <input value={merchantData.setupConfig?.localization?.city || ""} onChange={(e) => updateLocalization('city', e.target.value)} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none" placeholder="City" />
            <input value={merchantData.setupConfig?.localization?.address || ""} onChange={(e) => updateLocalization('address', e.target.value)} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none md:col-span-2" placeholder="Address" />
            <input value={merchantData.setupConfig?.localization?.timezone || "UTC"} onChange={(e) => updateLocalization('timezone', e.target.value)} className="w-full p-5 bg-slate-50 rounded-2xl font-bold outline-none md:col-span-2" placeholder="Timezone (e.g. Africa/Tunis)" />
          </div>
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