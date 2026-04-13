import React, { useState, useEffect } from "react";
import API from "../api/config"
import { Search, MapPin, Loader2, LayoutGrid } from "lucide-react";

const ProfessionalsPage = () => {
  const [professionals, setProfessionals] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Barber", "Health", "Beauty", "Consulting", "Restaurant"];

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
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="pt-40 pb-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
               <LayoutGrid className="text-indigo-600" size={18} />
               <span className="text-indigo-600 font-black text-sm uppercase tracking-[0.3em]">Live Marketplace</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
              Discover Top <br />
              <span className="text-slate-400 font-medium italic underline decoration-indigo-500">Verified Experts.</span>
            </h1>
            
            <div className="mt-12 flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search services in Tunisia..." 
                  className="w-full pl-16 pr-6 py-5 bg-slate-100 rounded-[2rem] border-none focus:ring-2 focus:ring-indigo-600 font-bold transition-all shadow-inner outline-none"
                />
              </div>
              <button className="px-10 py-5 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-indigo-600 transition-all active:scale-95">
                FIND EXPERTS
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                    ? "bg-indigo-600 text-white shadow-lg" 
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

      <main className="py-20 container mx-auto px-6">
        {loading ? (
          <div className="flex flex-col items-center py-20">
             <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
             <p className="font-black text-slate-400 tracking-widest text-sm">LOADING PARTNERS...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPros.map((pro) => (
              <div key={pro._id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={pro.image || `https://source.unsplash.com/featured/?${pro.category}`} 
                    alt={pro.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                    {pro.category}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                    {pro.name}
                  </h3>
                  <p className="text-slate-400 font-bold text-sm mt-2 flex items-center gap-2 uppercase tracking-tighter">
                    <MapPin size={14} className="text-indigo-500" /> {pro.location || "Tunisia"}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      Verified
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      {pro.slug}.bookify.tn
                    </span>
                  </div>

                  <a 
                    href={`https://${pro.slug}.bookify.tn`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 w-full block py-4 bg-slate-50 text-slate-900 text-center font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-900 hover:text-white transition-all"
                  >
                    View Website & Book
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfessionalsPage;