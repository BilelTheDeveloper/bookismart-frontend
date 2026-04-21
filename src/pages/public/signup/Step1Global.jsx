import React, { useState } from "react";

const Step1Global = ({ formData, setFormData, onNext }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const categories = [
    "Beauty & Barbers", "Health & Medical", "Fitness & Gyms", 
    "Creative & Media", "Car Services", "Maintenance", 
    "Coaching & Tutors", "Consultants", "Events & DJs", "Grooming & Vets"
  ];

  const villes = [
    "Ariana", "Beja", "Ben Arous", "Bizerte", "Gabes", "Gafsa", 
      "Jendouba", "Kairouan", "Kasserine", "Kebili", "Kef", "Mahdia", 
      "Manouba", "Medenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", 
      "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"
    // ... rest of the 24 governorates from your model
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      
      <header>
        <h2 className="text-3xl font-black text-slate-900">Tell us about your business</h2>
        <p className="text-slate-500 mt-2">Let's start with the basics to set up your profile.</p>
      </header>

      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-slate-400 text-xs text-center px-2">Business Logo or Photo</span>
            )}
          </div>
          <input 
            type="file" 
            accept="image/*" 
            className="absolute inset-0 opacity-0 cursor-pointer" 
            onChange={handleImageChange}
          />
        </div>
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Click to upload</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-black text-slate-700 uppercase">Full Name</label>
          <input 
            type="text" 
            className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="Mohamed Ben Ali"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          />
        </div>

        {/* Business Name */}
        <div className="space-y-1">
          <label className="text-xs font-black text-slate-700 uppercase">Business Name</label>
          <input 
            type="text" 
            className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="Vogue Studio"
            value={formData.businessName}
            onChange={(e) => setFormData({...formData, businessName: e.target.value})}
          />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-xs font-black text-slate-700 uppercase">Category</label>
          <select 
            className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="">Select Category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        {/* Ville */}
        <div className="space-y-1">
          <label className="text-xs font-black text-slate-700 uppercase">Ville</label>
          <select 
            className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
            value={formData.ville}
            onChange={(e) => setFormData({...formData, ville: e.target.value})}
          >
            <option value="">Select City</option>
            {villes.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      </div>

      {/* Email & Phone */}
      <div className="space-y-4">
        <input 
          type="email" 
          placeholder="Email Address"
          className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="tel" 
          placeholder="Phone Number (e.g., 216...)"
          className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
      </div>

      <button 
        onClick={onNext}
        className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-200"
      >
        CONTINUE TO VERIFICATION
      </button>
    </div>
  );
};

export default Step1Global;