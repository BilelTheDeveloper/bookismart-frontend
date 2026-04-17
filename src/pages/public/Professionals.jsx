import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Search, MapPin, Loader2, LayoutGrid, Star, ShieldCheck, ArrowUpRight } from "lucide-react";

const ProfessionalsPage = () => {
  const [professionals, setProfessionals] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Category labels match the plural 'category' strings in your MongoDB
  const categories = [
    { label: "All", value: "All" },
    { label: "Barber", value: "barbershops" },
    { label: "Health", value: "health" },
    { label: "Beauty", value: "beauty" },
    { label: "Consulting", value: "consulting" },
    { label: "Restaurant", value: "restaurant" }
  ];

  useEffect(() => {
    const fetchPros = async () => {
      try {
        setLoading(true);
        const res = await API.get("/admin/websites/approved");
        setProfessionals(res.data);
      } catch (err) {
        console.error("Failed to load professionals:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPros();
  }, []);

  const filteredPros = professionals.filter((p) => {
    // ✅ Fix: Handles plural category mismatch
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    
    // ✅ Fix: Correctly maps to ownerId.businessName from your populate call
    const bizName = p.ownerId?.businessName || "";
    const matchesSearch = bizName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative pt-32 pb-20 bg-white border-b border-slate-200 overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
               <ShieldCheck className="text-indigo-600" size={16} />
               <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em]">Verified Professional Network</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Book Your Next <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Expert Experience.</span>
            </h1>
            
            <p className="mt-6 text-lg text-slate-500 font-medium max-w-2xl">
              Connect with the finest barbers, stylists, and consultants in Tunisia. 
              Verified quality, instant booking, professional results.
            </p>
            
            {/* --- ADVANCED SEARCH BAR --- */}
            <div className="mt-12 flex flex-col md:flex-row gap-4 p-2 bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-slate-100">
              <div className="flex-grow relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Who are you looking for?" 
                  className="w-full pl-16 pr-6 py-5 bg-transparent border-none font-bold text-slate-700 placeholder:text-slate-400 focus:ring-0 outline-none"
                />
              </div>
              <button className="px-10 py-5 bg-indigo-600 text-white font-black rounded-[2rem] hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 flex items-center justify-center gap-2">
                SEARCH MARKETPLACE
              </button>
            </div>

            {/* --- CATEGORY PILLS --- */}
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat.value 
                    ? "bg-slate-900 text-white shadow-xl translate-y-[-2px]" 
                    : "bg-white text-slate-500 border border-slate-200 hover:border-indigo-400 hover:text-indigo-600"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- RESULTS GRID --- */}
      <main className="py-20 container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
                <LayoutGrid className="text-indigo-600" size={24} />
                Available Professionals
            </h2>
            <div className="h-[1px] flex-grow mx-8 bg-slate-200 hidden md:block"></div>
            <span className="text-slate-400 font-bold text-sm">{filteredPros.length} Results Found</span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20">
             <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={20} />
             </div>
             <p className="mt-6 font-black text-slate-400 tracking-[0.3em] text-[10px] uppercase">Curating the best for you...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredPros.length > 0 ? (
              filteredPros.map((pro) => (
                <div key={pro._id} className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col">
                  
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img 
                      // ✅ Fix: Pulls correctly from WebsiteSchema 'hero.backgroundImage'
                      src={pro.hero?.backgroundImage || `https://images.unsplash.com/photo-1521791136064-7986c2959443?q=80&w=800`} 
                      alt={pro.ownerId?.businessName} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Badge Overlay */}
                    <div className="absolute top-5 left-5">
                        <div className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600 shadow-xl border border-white/20">
                          {pro.category}
                        </div>
                    </div>

                    {/* Quick View Icon */}
                    <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 scale-50 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                            <ArrowUpRight size={20} />
                        </div>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                        {/* ✅ Fix: Pulls correctly from populated ownerId.businessName */}
                        {pro.ownerId?.businessName || "Service Provider"}
                        </h3>
                        <div className="flex items-center gap-1 text-amber-500">
                            <Star size={14} fill="currentColor" />
                            <span className="text-xs font-black">5.0</span>
                        </div>
                    </div>

                    <p className="text-slate-400 font-bold text-[11px] flex items-center gap-2 uppercase tracking-widest">
                      <MapPin size={12} className="text-indigo-500" /> {pro.ownerId?.city || "Tunisia"}
                    </p>

                    <div className="mt-auto pt-8 flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Profile URL</span>
                            <span className="text-[11px] font-bold text-slate-500 italic">/p/{pro.slug}</span>
                        </div>
                        
                        <Link 
                          to={`/p/${pro.slug}`}
                          className="flex-shrink-0 w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300"
                        >
                          <ArrowUpRight size={20} />
                        </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-32 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
                    <Search size={32} />
                </div>
                <h3 className="text-xl font-black text-slate-900 uppercase">No Experts Found</h3>
                <p className="text-slate-400 font-medium mt-2 max-w-xs mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
                <button 
                    onClick={() => {setActiveCategory("All"); setSearchTerm("");}}
                    className="mt-8 text-indigo-600 font-black text-xs uppercase tracking-[0.2em] border-b-2 border-indigo-600 pb-1"
                >
                    Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfessionalsPage;