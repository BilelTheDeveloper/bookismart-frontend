import React, { useState, useRef, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import API from "../api/config"; // Adjust this path to your config file
import { 
  Save, ArrowLeft, PenTool, Image as ImageIcon, 
  Plus, Trash2, Eye, EyeOff, X, Camera, 
  Upload, Link as LinkIcon, Clock, MapPin, Phone , Globe
} from 'lucide-react';

// Import all theme layouts
import BarberWebsite from "../../themes/SmartStyle/Barbershops/Theme1/WebsiteLayout";
import HairSalonWebsite from "../../themes/SmartStyle/HairSalons/Theme1/WebsiteLayout";
import MakeupArtistWebsite from "../../themes/SmartStyle/MakeupArtists/Theme1/WebsiteLayout";
import NailSalonWebsite from "../../themes/SmartStyle/NailSalons/Theme1/WebsiteLayout";
import SpaWebsite from "../../themes/SmartStyle/Spas/Theme1/WebsiteLayout";

// Add these to your existing imports
import OpticianWebsite from "../../themes/SmartDoc/Opticians/OpticianWebsite";
import GeneralDoctorWebsite from "../../themes/SmartDoc/GeneralDoctors/GeneralDoctorWebsite";
import PhysioWebsite from "../../themes/SmartDoc/Physiotherapists/PhysioWebsite";
const TemplateSetupForm = () => {
  const { id } = useParams(); // This is our 'category'
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);
  const aboutFileRef = useRef(null);

  // ✅ New State to hold actual File objects for Cloudinary
  const [files, setFiles] = useState({
    heroImage: null,
    aboutImage: null,
    galleryImages: []
  });

  // 1. Model-Compliant State Structure
  const [merchantData, setMerchantData] = useState({
    name: "",
    slug: "", 
    hero: {
      title: "",
      slogan: "",
      backgroundImage: ""
    },
    about: {
      show: true,
      title: "Our Story",
      text: "",
      image: ""
    },
    services: [
      { title: "", description: "", price: "", active: true }
    ],
    gallery: {
      show: true,
      images: ["", "", "", ""]
    },
    contact: {
      phone: "",
      address: "",
      socials: {
        instagram: "",
        facebook: "",
        tiktok: ""
      }
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

  // --- UPDATED: Fetch using API instance ---
  useEffect(() => {
    const fetchMySite = async () => {
      try {
        const res = await API.get('/merchant/website/my-site');
        if (res.data) {
          setMerchantData(res.data);
        }
      } catch (err) {
        console.log("No existing site found, starting fresh.");
      }
    };
    fetchMySite();
  }, []);

  // --- Handlers ---
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

  const handleHourChange = (index, field, value) => {
    const newHours = [...merchantData.businessHours];
    newHours[index][field] = value;
    setMerchantData({ ...merchantData, businessHours: newHours });
  };

  // ✅ UPDATED: Captures both preview blob and actual file object
  const handleFileUpload = (e, type, index = null) => {
    const file = e.target.files[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file); 
      
      if (type === 'gallery') {
        const newImages = [...merchantData.gallery.images];
        newImages[index] = fakeUrl;
        setMerchantData({ ...merchantData, gallery: { ...merchantData.gallery, images: newImages } });
        
        // Save file for upload
        const newFileArray = [...files.galleryImages];
        newFileArray[index] = file;
        setFiles(prev => ({ ...prev, galleryImages: newFileArray }));

      } else if (type === 'hero') {
        setMerchantData({ ...merchantData, hero: { ...merchantData.hero, backgroundImage: fakeUrl } });
        setFiles(prev => ({ ...prev, heroImage: file }));

      } else if (type === 'about') {
        setMerchantData({ ...merchantData, about: { ...merchantData.about, image: fakeUrl } });
        setFiles(prev => ({ ...prev, aboutImage: file }));
      }
    }
  };

  const updateService = (index, field, value) => {
    const newServices = [...merchantData.services];
    newServices[index][field] = value;
    setMerchantData({ ...merchantData, services: newServices });
  };

  // ✅ UPDATED: Now uses FormData for Cloudinary compatibility
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const formData = new FormData();

      // 1. Prepare text data
      const dataPayload = {
        ...merchantData,
        category: id, 
        templateId: `${id?.toUpperCase()}_THEME_01` 
      };

      // 2. Append JSON data as a string (your backend controller parses this)
      formData.append('data', JSON.stringify(dataPayload));

      // 3. Append Image Files
      if (files.heroImage) formData.append('heroImage', files.heroImage);
      if (files.aboutImage) formData.append('aboutImage', files.aboutImage);
      
      // 4. Append Gallery Images
      files.galleryImages.forEach((imgFile) => {
        if (imgFile) formData.append('galleryImages', imgFile);
      });

      // 5. Send to API with multipart/form-data headers
      const response = await API.post('/merchant/website/save', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log("Success:", response.data);
      alert("Website configuration saved and sent for admin review!");
      
      // Update local state with the new Cloudinary URLs returned from backend
      if (response.data.website) {
        setMerchantData(response.data.website);
      }

    } catch (error) {
      console.error("Save Error:", error.response?.data || error.message);
      alert("Failed to save. Please check your connection.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderLivePreview = () => {
    const components = {
      'barbershops': BarberWebsite,
      'hair-salons': HairSalonWebsite,
      'makeup-artists': MakeupArtistWebsite,
      'nail-salons': NailSalonWebsite,
      'spas': SpaWebsite,

      'opticians': 'Medical & Health',
      'opticians': 'Medical & Health', // Added this just in case of typos
      'general-doctors': 'Medical & Health',
      'physiotherapists': 'Medical & Health'
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
            <h1 className="text-sm font-black uppercase tracking-widest text-slate-900">Website Builder</h1>
            <p className="text-[10px] text-rose-500 font-bold uppercase tracking-[0.2em]">{id?.replace('-', ' ')} Studio</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={() => setShowPreview(true)} className="flex items-center gap-3 bg-white border border-slate-200 text-slate-900 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-rose-500 hover:text-rose-500 transition-all shadow-sm">
            <Eye size={16} /> Live Preview
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-3 bg-rose-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-rose-200 disabled:opacity-50"
          >
            {isSaving ? "Publishing..." : <><Save size={16} /> Save & Publish</>}
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-16 px-8 grid grid-cols-1 gap-12">
        
        {/* STEP 1: BRAND & HERO */}
        <section className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 space-y-10 relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center font-black">01</div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">Hero Section</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase text-slate-400">Business Name</label>
              <input name="name" value={merchantData.name} onChange={handleChange} className="w-full bg-slate-50 border-2 border-transparent focus:border-rose-500 focus:bg-white rounded-2xl p-5 text-sm font-bold outline-none transition-all" placeholder="Vogue Luxury" />
            </div>
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase text-slate-400">Website Slug (URL)</label>
              <input name="slug" value={merchantData.slug} onChange={handleChange} className="w-full bg-slate-50 border-2 border-transparent focus:border-rose-500 focus:bg-white rounded-2xl p-5 text-sm font-bold outline-none transition-all" placeholder="vogue-luxury-tunis" />
            </div>
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase text-slate-400">Hero Title</label>
              <input name="hero.title" value={merchantData.hero.title} onChange={handleChange} className="w-full bg-slate-50 border-2 border-transparent focus:border-rose-500 focus:bg-white rounded-2xl p-5 text-sm font-bold outline-none transition-all" placeholder="Ex: Precision Haircuts" />
            </div>
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase text-slate-400">Hero Slogan</label>
              <input name="hero.slogan" value={merchantData.hero.slogan} onChange={handleChange} className="w-full bg-slate-50 border-2 border-transparent focus:border-rose-500 focus:bg-white rounded-2xl p-5 text-sm font-bold outline-none transition-all" placeholder="Ex: Where style meets soul" />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <label className="text-[11px] font-black uppercase text-slate-400">Background Image</label>
            <div className="flex gap-4">
               <div className="relative flex-grow">
                 <LinkIcon className="absolute left-5 top-5 text-slate-400" size={18} />
                 <input name="hero.backgroundImage" value={merchantData.hero.backgroundImage} onChange={handleChange} className="w-full bg-slate-50 border-2 border-transparent focus:border-rose-500 focus:bg-white rounded-2xl p-5 pl-14 text-sm font-medium outline-none transition-all" placeholder="Direct Image URL..." />
               </div>
               <button onClick={() => fileInputRef.current.click()} className="bg-slate-900 text-white px-8 rounded-2xl hover:bg-rose-500 transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                 <Upload size={18} />
               </button>
               <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => handleFileUpload(e, 'hero')} />
            </div>
          </div>
        </section>

        {/* STEP 2: ABOUT SECTION */}
        <section className={`bg-white rounded-[3rem] p-12 shadow-sm border-2 transition-all ${merchantData.about.show ? 'border-slate-100' : 'opacity-60 border-dashed'}`}>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center font-black">02</div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Our Story</h2>
            </div>
            <button onClick={() => setMerchantData(p => ({...p, about: {...p.about, show: !p.about.show}}))} className={`p-3 rounded-xl transition-all ${merchantData.about.show ? 'bg-rose-500 text-white' : 'bg-slate-200'}`}>
              {merchantData.about.show ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {merchantData.about.show && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <input name="about.title" value={merchantData.about.title} onChange={handleChange} className="w-full bg-slate-50 border-2 border-transparent focus:border-rose-500 focus:bg-white rounded-2xl p-5 text-sm font-bold outline-none" placeholder="About Title" />
                    <textarea name="about.text" value={merchantData.about.text} onChange={handleChange} className="w-full bg-slate-50 border-2 border-transparent focus:border-rose-500 focus:bg-white rounded-[2rem] p-8 text-sm font-medium h-48 outline-none transition-all" placeholder="Describe your history..." />
                </div>
                <div className="h-full">
                    <div onClick={() => aboutFileRef.current.click()} className="h-full min-h-[200px] border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-slate-50 overflow-hidden relative">
                        {merchantData.about.image ? <img src={merchantData.about.image} className="w-full h-full object-cover" /> : <><Camera size={30} className="text-slate-300"/><span className="text-[10px] font-black uppercase text-slate-400">About Photo</span></>}
                        <input type="file" ref={aboutFileRef} className="hidden" onChange={(e) => handleFileUpload(e, 'about')} />
                    </div>
                </div>
            </div>
          )}
        </section>

        {/* STEP 3: SERVICES */}
        <section className="space-y-8">
          <div className="flex justify-between items-center px-4">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center font-black">03</div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Price List</h2>
             </div>
             <button onClick={() => setMerchantData(p => ({...p, services: [...p.services, {title:"", description:"", price:"", active:true}]}))} className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 flex items-center gap-2">
               <Plus size={16} /> Add Service
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {merchantData.services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative group hover:border-rose-200 transition-all">
                <button onClick={() => setMerchantData(p => ({...p, services: p.services.filter((_,i) => i !== index)}))} className="absolute top-6 right-6 text-slate-300 hover:text-rose-500 transition-colors">
                  <Trash2 size={18} />
                </button>
                <div className="space-y-5">
                   <div className="flex gap-4">
                    <input value={service.title} onChange={(e) => updateService(index, 'title', e.target.value)} className="flex-grow bg-slate-50 rounded-xl p-4 text-[11px] font-black uppercase tracking-widest outline-none focus:bg-white transition-all" placeholder="Service Title" />
                    <input value={service.price} onChange={(e) => updateService(index, 'price', e.target.value)} className="w-32 bg-rose-50 text-rose-600 rounded-xl p-4 text-[11px] font-black uppercase text-center outline-none" placeholder="Price (TND)" />
                   </div>
                   <textarea value={service.description} onChange={(e) => updateService(index, 'description', e.target.value)} className="w-full bg-slate-50 rounded-xl p-4 text-xs font-medium h-24 outline-none border-2 border-transparent focus:border-rose-500 focus:bg-white transition-all" placeholder="Service description..." />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STEP 4: CONTACT & SOCIALS */}
        <section className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center font-black">04</div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Contact & Socials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2"><MapPin size={12}/> Business Address</label>
                    <input name="contact.address" value={merchantData.contact.address} onChange={handleChange} className="w-full bg-slate-50 rounded-xl p-4 text-xs font-bold" placeholder="La Marsa, Tunis" />
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2"><Phone size={12}/> Phone Number</label>
                    <input name="contact.phone" value={merchantData.contact.phone} onChange={handleChange} className="w-full bg-slate-50 rounded-xl p-4 text-xs font-bold" placeholder="+216 55 555 555" />
                </div>
            </div>
            <div className="space-y-6">
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2"> Instagram Username</label>
                    <input name="contact.socials.instagram" value={merchantData.contact.socials.instagram} onChange={handleChange} className="w-full bg-slate-50 rounded-xl p-4 text-xs font-bold" placeholder="@username" />
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2">Facebook Page Link</label>
                    <input name="contact.socials.facebook" value={merchantData.contact.socials.facebook} onChange={handleChange} className="w-full bg-slate-50 rounded-xl p-4 text-xs font-bold" placeholder="facebook.com/page" />
                </div>
            </div>
          </div>
        </section>

        {/* STEP 5: BUSINESS HOURS */}
        <section className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center font-black">05</div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Working Schedule</h2>
          </div>
          <div className="space-y-4">
            {merchantData.businessHours.map((bh, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="w-32 text-xs font-black uppercase text-slate-600 tracking-wider">{bh.day}</span>
                <div className="flex items-center gap-4">
                   {!bh.isClosed ? (
                     <>
                       <input type="time" value={bh.open} onChange={(e) => handleHourChange(index, 'open', e.target.value)} className="bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold" />
                       <span className="text-slate-400 text-xs">to</span>
                       <input type="time" value={bh.close} onChange={(e) => handleHourChange(index, 'close', e.target.value)} className="bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold" />
                     </>
                   ) : (
                     <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest px-8">Closed</span>
                   )}
                   <button 
                    onClick={() => handleHourChange(index, 'isClosed', !bh.isClosed)}
                    className={`ml-4 text-[9px] font-black uppercase p-2 rounded-lg transition-all ${bh.isClosed ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}
                   >
                     {bh.isClosed ? 'Open This Day' : 'Mark as Closed'}
                   </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STEP 6: GALLERY */}
        <section className={`bg-white rounded-[3rem] p-12 shadow-sm border-2 transition-all ${merchantData.gallery.show ? 'border-slate-100' : 'opacity-60 border-dashed'}`}>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center font-black">06</div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Showcase Gallery</h2>
            </div>
            <button onClick={() => setMerchantData(p => ({...p, gallery: {...p.gallery, show: !p.gallery.show}}))} className={`p-3 rounded-xl transition-all ${merchantData.gallery.show ? 'bg-rose-500 text-white' : 'bg-slate-200'}`}>
              {merchantData.gallery.show ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {merchantData.gallery.show && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {merchantData.gallery.images.map((img, index) => (
                <div key={index} className="space-y-3 group">
                  <div className="h-40 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center relative">
                    {img ? <img src={img} className="w-full h-full object-cover" /> : <Camera size={30} className="text-slate-200" />}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <label className="cursor-pointer bg-white text-slate-900 p-3 rounded-full shadow-lg">
                          <Upload size={16} />
                          <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'gallery', index)} />
                       </label>
                    </div>
                  </div>
                  <input value={img} onChange={(e) => {
                      const newImgs = [...merchantData.gallery.images];
                      newImgs[index] = e.target.value;
                      setMerchantData({...merchantData, gallery: {...merchantData.gallery, images: newImgs}});
                  }} className="w-full bg-slate-50 rounded-xl p-3 text-[9px] font-black uppercase tracking-widest outline-none" placeholder="Image URL" />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* --- PREVIEW MODAL --- */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-in zoom-in duration-300">
          <div className="bg-white w-full h-full rounded-[3rem] overflow-hidden shadow-2xl relative">
            <button onClick={() => setShowPreview(false)} className="absolute top-8 right-8 z-[110] bg-slate-900 text-white p-5 rounded-full hover:bg-rose-500 transition-all shadow-2xl scale-110 active:scale-95">
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