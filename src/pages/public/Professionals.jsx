import React, { useState } from "react";
import { Link } from "react-router-dom";

const professionals = [
  {
    id: 1,
    name: "Luxury Grooming Sousse",
    category: "Barber",
    location: "Sousse, Khezama",
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800",
    tags: ["Premium", "Men Only", "Hair & Beard"]
  },
  {
    id: 2,
    name: "Elite Dental Clinic",
    category: "Health",
    location: "Tunis, Berges du Lac",
    rating: 5.0,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1629909608135-ca29e0026b51?auto=format&fit=crop&q=80&w=800",
    tags: ["Medical", "Modern Equipment", "Surgical"]
  },
  {
    id: 3,
    name: "Vogue Beauty Space",
    category: "Beauty",
    location: "Sfax, Ville",
    rating: 4.8,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
    tags: ["Women Only", "Makeup", "Nails"]
  },
  {
    id: 4,
    name: "The Architect Studio",
    category: "Consulting",
    location: "Sousse, Sahloul",
    rating: 4.9,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    tags: ["Design", "Planning", "Interior"]
  }
];

const ProfessionalsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Barber", "Health", "Beauty", "Consulting"];

  const filteredPros = activeCategory === "All" 
    ? professionals 
    : professionals.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 🏙️ Search Header */}
      <section className="pt-40 pb-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <span className="text-indigo-600 font-black text-sm uppercase tracking-[0.3em]">Marketplace</span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-4 tracking-tighter">
              Discover Top <br />
              <span className="text-slate-400 font-medium italic underline decoration-indigo-500">Service Providers.</span>
            </h1>
            
            {/* 🔍 Search Bar UI */}
            <div className="mt-12 flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search for services or shops in Sousse..." 
                  className="w-full pl-16 pr-6 py-5 bg-slate-100 rounded-[2rem] border-none focus:ring-2 focus:ring-indigo-600 font-bold transition-all shadow-inner"
                />
              </div>
              <button className="px-10 py-5 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
                FIND EXPERTS
              </button>
            </div>

            {/* 🏷️ Filter Pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105" 
                    : "bg-white text-slate-500 border border-slate-200 hover:border-indigo-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🏢 Professionals Grid */}
      <main className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPros.map((pro) => (
            <div 
              key={pro.id} 
              className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
            >
              {/* Image Header */}
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={pro.image} 
                  alt={pro.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                    {pro.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-indigo-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black shadow-lg">
                  {pro.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                  {pro.name}
                </h3>
                <p className="text-slate-400 font-bold text-sm mt-2 flex items-center gap-2 uppercase tracking-tighter">
                  📍 {pro.location}
                </p>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {pro.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Link */}
                <Link 
                  to={`/professionals/${pro.id}`} 
                  className="mt-8 w-full block py-4 bg-slate-50 text-slate-900 text-center font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-900 hover:text-white transition-all group-hover:shadow-lg"
                >
                  View Profile & Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 📈 Bottom Empty State (If no results) */}
      {filteredPros.length === 0 && (
        <div className="py-40 text-center">
          <h3 className="text-2xl font-black text-slate-300 uppercase tracking-widest">No Professionals Found.</h3>
          <p className="text-slate-400 mt-2 font-medium">Try checking a different category.</p>
        </div>
      )}
    </div>
  );
};

export default ProfessionalsPage;