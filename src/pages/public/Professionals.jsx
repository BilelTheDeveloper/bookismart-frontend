import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, Briefcase, Clock3, Loader2, Search } from "lucide-react";
import API from "../../api/config"; // 🛡️ Linked to your advanced config

const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  /**
   * 📡 FETCH LIVE DISCOVERY DATA
   */
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        setLoading(true);
        const res = await API.get("/public/discovery");
        if (res.data.success) {
          setProfessionals(res.data.data);
        }
      } catch (err) {
        console.error("Discovery Feed Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfessionals();
  }, []);

  const categories = useMemo(() => {
    // Categories are pulled from the User objects linked to the Websites
    const allCategories = professionals.map((site) => site.ownerId?.category);
    return ["All", ...new Set(allCategories.filter(Boolean))];
  }, [professionals]);

  const filteredProfessionals = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return professionals.filter((site) => {
      const matchesCategory =
        selectedCategory === "All" || site.ownerId?.category === selectedCategory;

      const matchesSearch =
        !search ||
        site.ownerId?.businessName?.toLowerCase().includes(search) ||
        site.ownerId?.fullName?.toLowerCase().includes(search) ||
        site.ownerId?.ville?.toLowerCase().includes(search) ||
        site.category?.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory, professionals]);

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
        <p className="mt-4 text-xs font-black uppercase tracking-[0.3em] text-slate-400">
          Syncing Discovery Feed...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-slate-950 pb-16 pt-28 text-white sm:pt-32 md:pb-20">
        <div className="absolute inset-0">
          <motion.div
            className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl"
            animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-10 top-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, -18, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            Verified Partners
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Discover and book top experts
            <span className="block bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              near your city.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
            Explore verified specialists in beauty, health, and fitness. Fast booking, zero friction.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {/* --- FILTER BAR --- */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, city, or specialty..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 md:w-64"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <p className="mt-3 text-xs font-semibold text-slate-500 sm:text-sm">
            Showing {filteredProfessionals.length} expert{filteredProfessionals.length !== 1 ? "s" : ""} active now
          </p>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProfessionals.map((site, i) => (
            <motion.article
              key={site._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="overflow-hidden rounded-[1.8rem] border border-slate-100 bg-white shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={site.hero?.backgroundImage || "https://via.placeholder.com/800x400"}
                  alt={site.ownerId?.businessName}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute left-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                  {site.ownerId?.category}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight">
                      {site.ownerId?.businessName || site.ownerId?.fullName}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-indigo-600">
                       By {site.ownerId?.fullName}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    4.9 {/* Static for now, can be dynamic later */}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-semibold text-slate-600 sm:text-sm">
                  <div className="inline-flex items-center gap-1.5">
                    <MapPin size={14} className="text-indigo-500" />
                    {site.ownerId?.ville}
                  </div>
                  <div className="inline-flex items-center gap-1.5">
                    <Briefcase size={14} className="text-indigo-500" />
                    Verified
                  </div>
                  <div className="inline-flex items-center gap-1.5">
                    <Clock3 size={14} className="text-indigo-500" />
                    Instant Book
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to={`/p/${site.slug}`}
                    className="flex-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-center text-sm font-bold text-white transition-all hover:bg-indigo-500 shadow-md shadow-indigo-200"
                  >
                    View Website
                  </Link>
                  <Link
                    to="/signup"
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-bold text-slate-700 transition-all hover:bg-slate-50"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* --- EMPTY STATE --- */}
        {filteredProfessionals.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Search size={24} />
            </div>
            <p className="mt-4 text-base font-bold text-slate-700">No professionals found.</p>
            <p className="mt-1 text-sm text-slate-500">Try adjusting your filters or searching for a different city.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Professionals;