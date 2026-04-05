import React, { useState } from "react";

const categories = [
  { id: 1, title: "SmartStyle", sub: "Beauty & Barbers", icon: "✂️", color: "bg-rose-500", details: ["Hair Salons", "Barbershops", "Nail Salons", "Spas", "Makeup Artists"] },
  { id: 2, title: "SmartDoc", sub: "Health & Medical", icon: "🏥", color: "bg-blue-500", details: ["Dentists", "General Doctors", "Opticians", "Physiotherapists", "Psychologists"] },
  { id: 3, title: "SmartFit", sub: "Fitness & Gyms", icon: "🏋️", color: "bg-emerald-500", details: ["Personal Trainers", "Yoga Studios", "Gyms", "Pilates", "Martial Arts"] },
  { id: 4, title: "SmartLens", sub: "Creative & Media", icon: "📸", color: "bg-violet-500", details: ["Photographers", "Videographers", "Recording Studios", "Podcast Hubs"] },
  { id: 5, title: "SmartAuto", sub: "Car Services", icon: "🚗", color: "bg-slate-700", details: ["Repair Garages", "Car Wash", "Tire Services", "Vehicle Inspection"] },
  { id: 6, title: "SmartHome", sub: "Maintenance", icon: "🏠", color: "bg-orange-500", details: ["Plumbers", "Electricians", "AC Repair", "Cleaning Services", "Pest Control"] },
  { id: 7, title: "SmartEdu", sub: "Coaching & Tutors", icon: "🎓", color: "bg-indigo-600", details: ["Private Tutors", "Language Schools", "Music Teachers", "Driving Schools"] },
  { id: 8, title: "SmartPro", sub: "Consultants", icon: "⚖️", color: "bg-amber-600", details: ["Lawyers", "Accountants", "Real Estate Agents", "Business Consultants"] },
  { id: 9, title: "SmartEvent", sub: "Events & DJs", icon: "🎉", color: "bg-pink-500", details: ["Event Planners", "Party Venues", "DJs", "Catering Services"] },
  { id: 10, title: "SmartPet", sub: "Grooming & Vets", icon: "🐾", color: "bg-teal-500", details: ["Veterinarians", "Pet Grooming", "Dog Trainers", "Pet Boarding"] },
];

const Categories = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);

  const visibleCategories = showAll ? categories : categories.slice(0, 5);

  return (
    <section className="relative pb-32 bg-white">
      <div className="container mx-auto px-5 md:px-6">
        
        {/* 🛡️ Header */}
        <div className="mb-12 md:mb-44 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Book <span className="text-indigo-600">Everything.</span>
          </h2>
          <p className="text-slate-500 font-medium mt-4 text-lg max-w-xl">
            Click on a category to explore specialized services near you.
          </p>
        </div>

        {/* 🚀 THE SMART GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap- -mt-5 md:-mt-32 relative z-20 transition-all duration-700">
          {visibleCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCat(cat)}
              className="group bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl active:scale-95 cursor-pointer"
            >
              <div className={`w-14 h-14 md:w-20 md:h-20 ${cat.color} rounded-3xl flex items-center justify-center text-white text-3xl md:text-4xl shadow-lg mb-6 group-hover:rotate-6 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight">{cat.title}</h3>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{cat.sub}</p>
            </div>
          ))}
        </div>

        {/* ➕ See More Button */}
        <div className="mt-12 flex justify-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
          >
            {showAll ? "Show Less" : "See All Categories"}
            <span className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}>↓</span>
          </button>
        </div>
      </div>

      {/* 💎 ULTRA PRO MODAL (Pop-up) */}
      {selectedCat && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setSelectedCat(null)}
          />
          <div className="relative bg-white w-full max-w-md rounded-[3rem] p-8 md:p-12 shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedCat(null)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full font-bold text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              ✕
            </button>
            
            <div className={`w-20 h-20 ${selectedCat.color} rounded-[2rem] flex items-center justify-center text-5xl text-white shadow-2xl mb-8`}>
              {selectedCat.icon}
            </div>
            
            <h2 className="text-3xl font-black text-slate-900">{selectedCat.title}</h2>
            <p className="text-indigo-600 font-bold uppercase tracking-widest text-sm mt-1">{selectedCat.sub}</p>
            
            <div className="mt-8">
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">Available Services:</p>
              <div className="grid grid-cols-1 gap-3">
                {selectedCat.details.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-default">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full mt-8 py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all">
              EXPLORE {selectedCat.title.toUpperCase()}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Categories;