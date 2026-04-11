import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, ArrowLeft, PenTool, Image as ImageIcon, 
  Plus, Trash2, Eye, EyeOff, X, Scissors, Camera, 
  Upload, Link as LinkIcon, Clock, MapPin, Phone
} from 'lucide-react';

// Import all theme layouts
import BarberWebsite from "../../themes/SmartStyle/Barbershops/Theme1/WebsiteLayout";
import HairSalonWebsite from "../../themes/SmartStyle/HairSalons/Theme1/WebsiteLayout";
import MakeupArtistWebsite from "../../themes/SmartStyle/MakeupArtists/Theme1/WebsiteLayout";
import NailSalonWebsite from "../../themes/SmartStyle/NailSalons/Theme1/WebsiteLayout";
import SpaWebsite from "../../themes/SmartStyle/Spas/Theme1/WebsiteLayout";

const TemplateSetupForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);

  // 1. Next-Level State Structure
  const [merchantData, setMerchantData] = useState({
    name: "",
    slogan: "",
    about: "",
    showAbout: true, // Toggle visibility
    heroImage: "",
    contact: {
      phone: "",
      address: "",
      hours: ""
    },
    services: [
      { name: "", desc: "", price: "" },
      { name: "", desc: "", price: "" }
    ],
    showGallery: true, // Toggle visibility
    gallery: ["", "", "", ""]
  });

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setMerchantData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setMerchantData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = (e, index = null) => {
    const file = e.target.files[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file); // In prod, upload to Cloudinary/S3
      if (index !== null) {
        updateGallery(index, fakeUrl);
      } else {
        setMerchantData(prev => ({ ...prev, heroImage: fakeUrl }));
      }
    }
  };

  const updateService = (index, field, value) => {
    const newServices = [...merchantData.services];
    newServices[index][field] = value;
    setMerchantData({ ...merchantData, services: newServices });
  };

  const updateGallery = (index, value) => {
    const newGallery = [...merchantData.gallery];
    newGallery[index] = value;
    setMerchantData({ ...merchantData, gallery: newGallery });
  };

  const renderLivePreview = () => {
    const components = {
      'barbershops': BarberWebsite,
      'hair-salons': HairSalonWebsite,
      'makeup-artists': MakeupArtistWebsite,
      'nail-salons': NailSalonWebsite,
      'spas': SpaWebsite
    };
    const SelectedTheme = components[id] || BarberWebsite;
    return <SelectedTheme merchantData={merchantData} />;
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
            <h1 className="text-sm font-black uppercase tracking-widest text-slate-900">Customization Lab</h1>
            <p className="text-[10px] text-rose-500 font-bold uppercase tracking-[0.2em]">{id?.replace('-', ' ')} Edition</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-3 bg-white border border-slate-200 text-slate-900 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-rose-500 hover:text-rose-500 transition-all shadow-sm"
          >
            <Eye size={16} /> Vue Aperçu
          </button>
          <button className="flex items-center gap-3 bg-rose-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-rose-200">
            <Save size={16} /> Save & Publish
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-16 px-8 grid grid-cols-1 gap-12">
        
        {/* STEP 1: BRAND IDENTITY */}
        <section className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <PenTool size={120} />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center font-black">01</div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">Brand Identity</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Establishment Name</label>
              <input name="name" value={merchantData.name} onChange={handleChange} className="w-full bg-slate-50 border-2 border-transparent focus:border-rose-500 focus:bg-white rounded-2xl p-5 text-sm font-bold transition-all outline-none" placeholder="Vogue Luxury" />
            </div>
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Slogan</label>
              <input name="slogan" value={merchantData.slogan} onChange={handleChange} className="w-full bg-slate-50 border-2 border-transparent focus:border-rose-500 focus:bg-white rounded-2xl p-5 text-sm font-bold transition-all outline-none" placeholder="Elegance in every detail" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Hero Banner Image</label>
              <span className="text-[9px] font-bold text-slate-300 uppercase">Link or Upload</span>
            </div>
            <div className="flex gap-4">
               <div className="relative flex-grow">
                 <LinkIcon className="absolute left-5 top-5 text-slate-400" size={18} />
                 <input name="heroImage" value={merchantData.heroImage} onChange={handleChange} className="w-full bg-slate-50 border-2 border-transparent focus:border-rose-500 focus:bg-white rounded-2xl p-5 pl-14 text-sm font-medium outline-none transition-all" placeholder="https://image-link.com/..." />
               </div>
               <button 
                onClick={() => fileInputRef.current.click()}
                className="bg-slate-900 text-white px-8 rounded-2xl hover:bg-rose-500 transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
               >
                 <Upload size={18} />
               </button>
               <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => handleFileUpload(e)} />
            </div>
          </div>
        </section>

        {/* STEP 2: ABOUT SECTION (OPTIONAL) */}
        <section className={`bg-white rounded-[3rem] p-12 shadow-sm border-2 transition-all ${merchantData.showAbout ? 'border-slate-100' : 'border-dashed border-slate-200 opacity-60'}`}>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${merchantData.showAbout ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-400'}`}>02</div>
              <h2 className="text-2xl font-black uppercase tracking-tight">About Story</h2>
            </div>
            <button 
              onClick={() => setMerchantData(p => ({...p, showAbout: !p.showAbout}))}
              className={`p-3 rounded-xl transition-all ${merchantData.showAbout ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-500'}`}
            >
              {merchantData.showAbout ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {merchantData.showAbout && (
            <textarea name="about" value={merchantData.about} onChange={handleChange} className="w-full bg-slate-50 border-2 border-transparent focus:border-rose-500 focus:bg-white rounded-[2rem] p-8 text-sm font-medium h-48 outline-none transition-all" placeholder="Describe your expertise, history, and values..." />
          )}
        </section>

        {/* STEP 3: SERVICES (DYNAMIC) */}
        <section className="space-y-8">
          <div className="flex justify-between items-center px-4">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center font-black">03</div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Services & Pricing</h2>
             </div>
             <button 
              disabled={merchantData.services.length >= 7}
              onClick={() => setMerchantData(p => ({...p, services: [...p.services, {name:"", desc:"", price:""}]}))}
              className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 disabled:opacity-20 transition-all flex items-center gap-2"
             >
               <Plus size={16} /> Add Service
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {merchantData.services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative group hover:border-rose-200 transition-all">
                {merchantData.services.length > 2 && (
                  <button onClick={() => setMerchantData(p => ({...p, services: p.services.filter((_,i) => i !== index)}))} className="absolute top-6 right-6 text-slate-300 hover:text-rose-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                )}
                <div className="space-y-5">
                   <div className="flex gap-4">
                    <input value={service.name} onChange={(e) => updateService(index, 'name', e.target.value)} className="flex-grow bg-slate-50 rounded-xl p-4 text-[11px] font-black uppercase tracking-widest outline-none focus:bg-white border-2 border-transparent focus:border-rose-500 transition-all" placeholder="Service Name" />
                    <input value={service.price} onChange={(e) => updateService(index, 'price', e.target.value)} className="w-32 bg-rose-50 text-rose-600 rounded-xl p-4 text-[11px] font-black uppercase text-center outline-none" placeholder="TND" />
                   </div>
                   <textarea value={service.desc} onChange={(e) => updateService(index, 'desc', e.target.value)} className="w-full bg-slate-50 rounded-xl p-4 text-xs font-medium h-24 outline-none border-2 border-transparent focus:border-rose-500 focus:bg-white transition-all" placeholder="What does this service include?" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STEP 4: CONTACT & HOURS */}
        <section className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center font-black">04</div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Location & Hours</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400"><MapPin size={12}/> Address</label>
              <input name="contact.address" value={merchantData.contact.address} onChange={handleChange} className="w-full bg-slate-50 rounded-xl p-4 text-xs font-bold" placeholder="La Marsa, Tunis" />
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400"><Phone size={12}/> Phone</label>
              <input name="contact.phone" value={merchantData.contact.phone} onChange={handleChange} className="w-full bg-slate-50 rounded-xl p-4 text-xs font-bold" placeholder="+216 ..." />
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400"><Clock size={12}/> Hours</label>
              <input name="contact.hours" value={merchantData.contact.hours} onChange={handleChange} className="w-full bg-slate-50 rounded-xl p-4 text-xs font-bold" placeholder="09:00 - 20:00" />
            </div>
          </div>
        </section>

        {/* STEP 5: GALLERY */}
        <section className={`bg-white rounded-[3rem] p-12 shadow-sm border-2 transition-all ${merchantData.showGallery ? 'border-slate-100' : 'border-dashed border-slate-200 opacity-60'}`}>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${merchantData.showGallery ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-400'}`}>05</div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Showcase Gallery</h2>
            </div>
            <button 
              onClick={() => setMerchantData(p => ({...p, showGallery: !p.showGallery}))}
              className={`p-3 rounded-xl transition-all ${merchantData.showGallery ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-500'}`}
            >
              {merchantData.showGallery ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {merchantData.showGallery && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {merchantData.gallery.map((img, index) => (
                <div key={index} className="space-y-3 group">
                  <div className="h-40 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center relative">
                    {img ? <img src={img} className="w-full h-full object-cover" /> : <Camera size={30} className="text-slate-200" />}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <label className="cursor-pointer bg-white text-slate-900 p-3 rounded-full shadow-lg">
                          <Upload size={16} />
                          <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, index)} />
                       </label>
                    </div>
                  </div>
                  <input value={img} onChange={(e) => updateGallery(index, e.target.value)} className="w-full bg-slate-50 rounded-xl p-3 text-[9px] font-black uppercase tracking-widest border border-transparent focus:border-rose-500 outline-none" placeholder="Image Link" />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* --- VUE APERCU MODAL --- */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-in zoom-in duration-300">
          <div className="bg-white w-full h-full rounded-[3rem] overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setShowPreview(false)}
              className="absolute top-8 right-8 z-[110] bg-slate-900 text-white p-5 rounded-full hover:bg-rose-500 transition-all shadow-2xl scale-110 active:scale-95"
            >
              <X size={24} />
            </button>
            <div className="h-full w-full">
              {renderLivePreview()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSetupForm;