import React from "react";

const StepOne = ({ formData, handleChange }) => {
  const categories = [
    "Beauty & Barbers",
    "Health & Medical",
    "Fitness & Gyms",
    "Creative & Media",
    "Car Services",
    "Maintenance",
    "Coaching & Tutors",
    "Consultants",
    "Events & DJs",
    "Grooming & Vets"
];
  const cities = [
  "Ariana",
  "Beja",
  "Ben Arous",
  "Bizerte",
  "Gabes",
  "Gafsa",
  "Jendouba",
  "Kairouan",
  "Kasserine",
  "Kebili",
  "Kef",
  "Mahdia",
  "Manouba",
  "Medenine",
  "Monastir",
  "Nabeul",
  "Sfax",
  "Sidi Bouzid",
  "Siliana",
  "Sousse",
  "Tataouine",
  "Tozeur",
  "Tunis",
  "Zaghouan"
];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center mb-8">
        <label className="relative group cursor-pointer">
          <div className="w-24 h-24 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-indigo-400">
            {formData.profilePic ? (
              <img 
                src={URL.createObjectURL(formData.profilePic)} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <span className="text-4xl text-slate-300">📸</span>
            )}
          </div>
          <input 
            type="file" 
            name="profilePic" 
            onChange={handleChange} 
            className="hidden" 
            accept="image/*" 
          />
          <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter shadow-lg">
            Add Photo
          </div>
        </label>
        <p className="text-[10px] font-black uppercase text-slate-400 mt-3 tracking-widest text-center">
          Business Profile Image
        </p>
      </div>

      {/* Business Name */}
      <div>
        <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-2">Business Name</label>
        <input 
          type="text" 
          name="businessName" 
          value={formData.businessName} 
          onChange={handleChange} 
          placeholder="e.g., Luxury Grooming" 
          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold" 
          required 
        />
      </div>

      {/* Grid for Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-2">Your Name</label>
          <input 
            type="text" 
            name="fullName" 
            value={formData.fullName} 
            onChange={handleChange} 
            placeholder="Ahmed Ben Salem" 
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold" 
            required 
          />
        </div>
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-2">Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="ahmed@example.com" 
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold" 
            required 
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-2">Phone Number</label>
        <input 
          type="tel" 
          name="phone" 
          value={formData.phone} 
          onChange={handleChange} 
          placeholder="+216 -- --- ---" 
          className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold" 
          required 
        />
      </div>

      {/* Dropdowns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-2">Category</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold text-slate-700" 
            required
          >
            <option value="" disabled>Select category</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-2">City</label>
          <select 
            name="city" 
            value={formData.city} 
            onChange={handleChange} 
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold text-slate-700" 
            required
          >
            <option value="" disabled>Select city</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default StepOne;