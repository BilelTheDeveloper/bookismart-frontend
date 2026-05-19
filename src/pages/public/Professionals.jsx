import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Star, Briefcase, Clock3, Loader2, Search, ChevronDown,
  X, SlidersHorizontal, CheckCircle2, Calendar, TrendingUp,
  Building2, Filter, ArrowUpDown, Sparkles, Globe, Zap,
} from "lucide-react";
import API from "../../api/config";

// ─── Tunisia governorates ────────────────────────────────────────────────────
const CITIES = [
  "Ariana","Beja","Ben Arous","Bizerte","Gabes","Gafsa",
  "Jendouba","Kairouan","Kasserine","Kebili","Kef","Mahdia",
  "Manouba","Medenine","Monastir","Nabeul","Sfax","Sidi Bouzid",
  "Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan",
];

const CATEGORY_META = {
  "Beauty & Barbers":  { emoji: "✂️",  color: "bg-pink-100 text-pink-700 border-pink-200" },
  "Health & Medical":  { emoji: "🏥",  color: "bg-blue-100 text-blue-700 border-blue-200" },
  "Fitness & Gyms":    { emoji: "💪",  color: "bg-orange-100 text-orange-700 border-orange-200" },
  "Creative & Media":  { emoji: "🎨",  color: "bg-purple-100 text-purple-700 border-purple-200" },
  "Car Services":      { emoji: "🚗",  color: "bg-slate-100 text-slate-700 border-slate-200" },
  "Maintenance":       { emoji: "🔧",  color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  "Coaching & Tutors": { emoji: "📚",  color: "bg-green-100 text-green-700 border-green-200" },
  "Consultants":       { emoji: "💼",  color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  "Events & DJs":      { emoji: "🎉",  color: "bg-rose-100 text-rose-700 border-rose-200" },
  "Grooming & Vets":   { emoji: "🐾",  color: "bg-teal-100 text-teal-700 border-teal-200" },
};

const SORT_OPTIONS = [
  { value: "rating",  label: "Top Rated",  icon: Star },
  { value: "reviews", label: "Most Reviewed", icon: TrendingUp },
  { value: "newest",  label: "Recently Added", icon: Sparkles },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const renderStars = (rating, size = 14) => {
  if (!rating) return null;
  return Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating);
    const partial = !filled && i < rating;
    return (
      <span key={i} style={{ position: "relative", display: "inline-block", width: size, height: size }}>
        <Star size={size} className="text-slate-200" fill="currentColor" />
        {(filled || partial) && (
          <span
            style={{ position: "absolute", inset: 0, overflow: "hidden", width: partial ? `${(rating % 1) * 100}%` : "100%" }}
          >
            <Star size={size} className="text-amber-400" fill="currentColor" />
          </span>
        )}
      </span>
    );
  });
};

const isOpenNow = (businessHours = []) => {
  if (!businessHours.length) return null;
  const now = new Date();
  const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const dayName = dayNames[now.getDay()];
  const todayConfig = businessHours.find((d) => d.day === dayName);
  if (!todayConfig || todayConfig.isClosed) return false;
  const [oh, om] = (todayConfig.open || "09:00").split(":").map(Number);
  const [ch, cm] = (todayConfig.close || "19:00").split(":").map(Number);
  const nowMins = now.getHours() * 60 + now.getMinutes();
  return nowMins >= oh * 60 + om && nowMins < ch * 60 + cm;
};

const priceFrom = (services = []) => {
  const active = services.filter((s) => s.active !== false && s.price);
  if (!active.length) return null;
  const nums = active
    .map((s) => parseFloat(String(s.price).replace(/[^0-9.]/g, "")))
    .filter((n) => !isNaN(n) && n > 0);
  if (!nums.length) return null;
  return Math.min(...nums);
};

// ─── Skeleton card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-sm animate-pulse">
    <div className="h-52 bg-slate-200" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-slate-200 rounded-lg w-3/4" />
      <div className="h-4 bg-slate-200 rounded-lg w-1/2" />
      <div className="flex gap-2 mt-2">
        <div className="h-6 bg-slate-200 rounded-full w-16" />
        <div className="h-6 bg-slate-200 rounded-full w-20" />
        <div className="h-6 bg-slate-200 rounded-full w-14" />
      </div>
      <div className="flex gap-2 mt-4">
        <div className="h-10 bg-slate-200 rounded-xl flex-1" />
        <div className="h-10 bg-slate-200 rounded-xl flex-1" />
      </div>
    </div>
  </div>
);

// ─── Professional card ────────────────────────────────────────────────────────
const ProfessionalCard = ({ site, index }) => {
  const catMeta = CATEGORY_META[site.ownerId?.category] || { emoji: "🏢", color: "bg-slate-100 text-slate-700 border-slate-200" };
  const openStatus = isOpenNow(site.businessHours || []);
  const minPrice = priceFrom(site.services || []);
  const topServices = (site.services || []).filter((s) => s.active !== false).slice(0, 3);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.36) }}
      className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-md shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-300/40"
    >
      {/* Cover image */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <img
          src={site.hero?.backgroundImage || `https://placehold.co/800x400/e2e8f0/94a3b8?text=${encodeURIComponent(site.ownerId?.businessName || "Business")}`}
          alt={site.ownerId?.businessName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${catMeta.color}`}>
            <span>{catMeta.emoji}</span>
            <span>{site.ownerId?.category}</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur border border-white/60 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
            <CheckCircle2 size={10} className="text-emerald-500" />
            Vérifié
          </span>
        </div>

        {/* Open/Closed badge */}
        {openStatus !== null && (
          <div className={`absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold backdrop-blur-sm border ${
            openStatus
              ? "bg-emerald-500/90 border-emerald-400/50 text-white"
              : "bg-slate-800/80 border-slate-700/50 text-slate-300"
          }`}>
            <span className={`h-1.5 w-1.5 rounded-full ${openStatus ? "bg-white animate-pulse" : "bg-slate-400"}`} />
            {openStatus ? "Ouvert" : "Fermé"}
          </div>
        )}

        {/* Avatar + name overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end gap-3">
          {site.ownerId?.profilePicUrl ? (
            <img
              src={site.ownerId.profilePicUrl}
              alt={site.ownerId.fullName}
              className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-lg flex-shrink-0"
            />
          ) : (
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-sm font-black text-white shadow-lg">
              {(site.ownerId?.businessName || "B")[0].toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="truncate text-sm font-black text-white leading-tight drop-shadow">
              {site.ownerId?.businessName || site.ownerId?.fullName}
            </h3>
            <p className="truncate text-xs font-medium text-white/80">
              par {site.ownerId?.fullName}
            </p>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Rating + price row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {site.rating ? (
              <>
                <span className="flex gap-0.5">{renderStars(site.rating)}</span>
                <span className="text-xs font-bold text-slate-700">{site.rating.toFixed(1)}</span>
                <span className="text-xs text-slate-400 font-medium">({site.reviewCount})</span>
              </>
            ) : (
              <span className="text-xs text-slate-400 font-medium italic">Aucun avis</span>
            )}
          </div>
          {minPrice && (
            <span className="rounded-lg bg-indigo-50 border border-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700">
              Dès {minPrice} TND
            </span>
          )}
        </div>

        {/* Location */}
        <div className="mt-2.5 flex items-center gap-1 text-xs font-semibold text-slate-500">
          <MapPin size={12} className="text-indigo-400 flex-shrink-0" />
          <span className="truncate">{site.ownerId?.ville}</span>
          <span className="text-slate-300 mx-1">·</span>
          <Zap size={11} className="text-emerald-500 flex-shrink-0" />
          <span className="text-slate-500">Réservation instantanée</span>
        </div>

        {/* Services preview */}
        {topServices.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {topServices.map((svc, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-lg bg-slate-50 border border-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600"
              >
                {svc.title}
                {svc.price && <span className="ml-1 text-indigo-500 font-bold">{svc.price} TND</span>}
              </span>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA buttons */}
        <div className="mt-4 flex gap-2">
          <Link
            to={`/book/${site.ownerId?._id}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-200 transition-all hover:bg-indigo-500 hover:shadow-indigo-300 active:scale-95"
          >
            <Calendar size={13} />
            Réserver
          </Link>
          <Link
            to={`/p/${site.slug}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95"
          >
            <Globe size={13} />
            Voir le profil
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

// ─── Stats counter ─────────────────────────────────────────────────────────
const StatCounter = ({ end, label, icon: Icon }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !end) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const duration = 1500;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(ease * end));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        <Icon size={16} className="text-indigo-400" />
        <span className="text-2xl font-black text-white tabular-nums">{count.toLocaleString()}+</span>
      </div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [stats, setStats]       = useState(null);
  const [loading, setLoading]   = useState(true);
  const [searchTerm, setSearchTerm]     = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy]     = useState("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const cityRef = useRef(null);
  const sortRef = useRef(null);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 320);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (cityRef.current && !cityRef.current.contains(e.target)) setCityDropdownOpen(false);
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Fetch discovery feed
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ sort: sortBy });
      if (selectedCity !== "all") params.set("city", selectedCity);
      if (selectedCategory !== "all") params.set("category", selectedCategory);

      const [feedRes, statsRes] = await Promise.all([
        API.get(`/public/discovery?${params}`),
        API.get("/public/discovery/stats"),
      ]);

      if (feedRes.data.success) setProfessionals(feedRes.data.data);
      if (statsRes.data.success) setStats(statsRes.data.data);
    } catch (err) {
      console.error("Discovery fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedCity, selectedCategory, sortBy]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Client-side text search on top of server results
  const filtered = useMemo(() => {
    if (!debouncedSearch.trim()) return professionals;
    const s = debouncedSearch.toLowerCase();
    return professionals.filter(
      (p) =>
        p.ownerId?.businessName?.toLowerCase().includes(s) ||
        p.ownerId?.fullName?.toLowerCase().includes(s) ||
        p.ownerId?.ville?.toLowerCase().includes(s) ||
        p.category?.toLowerCase().includes(s)
    );
  }, [professionals, debouncedSearch]);

  // Unique categories from results
  const availableCategories = useMemo(() => {
    const cats = professionals.map((p) => p.ownerId?.category).filter(Boolean);
    return [...new Set(cats)].sort();
  }, [professionals]);

  const activeFilterCount = [
    selectedCity !== "all",
    selectedCategory !== "all",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedCity("all");
    setSelectedCategory("all");
    setSearchTerm("");
    setSortBy("rating");
  };

  const currentSort = SORT_OPTIONS.find((o) => o.value === sortBy);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 pb-20 pt-28 text-white sm:pt-36">
        {/* Animated blobs */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute -left-24 top-0 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[100px]"
            animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-24 bottom-0 h-[400px] w-[400px] rounded-full bg-cyan-500/15 blur-[80px]"
            animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[60px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-300">
              <Sparkles size={12} className="text-indigo-400" />
              Partenaires vérifiés — Tunisie
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mt-6 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Trouvez et réservez
            <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              les meilleurs experts.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-sm font-medium text-slate-400 sm:text-base md:text-lg"
          >
            Coiffeurs, médecins, coachs, mécaniciens — tous vérifiés, disponibles, réservables en un clic.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mx-auto mt-8 max-w-xl"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Coiffeur à Tunis, dentiste à Sousse..."
                className="w-full rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md py-4 pl-12 pr-12 text-sm font-medium text-white placeholder:text-slate-500 outline-none transition-all focus:border-indigo-400/60 focus:bg-white/15 focus:ring-2 focus:ring-indigo-500/20"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </motion.div>

          {/* Stats */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8"
            >
              <StatCounter end={stats.businesses} label="Professionnels" icon={Building2} />
              <StatCounter end={stats.cities}     label="Villes"         icon={MapPin} />
              <StatCounter end={stats.reviews}    label="Avis"           icon={Star} />
            </motion.div>
          )}
        </div>
      </section>

      {/* ── FILTER BAR ───────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main filter row */}
          <div className="flex items-center gap-3 py-3">
            {/* Filter toggle (mobile) */}
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all sm:hidden ${
                activeFilterCount > 0
                  ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 bg-white text-slate-600"
              }`}
            >
              <Filter size={13} />
              Filtres
              {activeFilterCount > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Category pills — scrollable */}
            <div className="hidden sm:flex items-center gap-2 flex-1 overflow-x-auto no-scrollbar pb-px">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`flex-shrink-0 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                  selectedCategory === "all"
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                Tous
              </button>
              {Object.entries(CATEGORY_META).map(([cat, meta]) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? "all" : cat)}
                  className={`flex-shrink-0 inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span>{meta.emoji}</span>
                  <span className="hidden lg:inline">{cat}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 ml-auto flex-shrink-0">
              {/* City dropdown */}
              <div ref={cityRef} className="relative">
                <button
                  onClick={() => { setCityDropdownOpen((v) => !v); setSortDropdownOpen(false); }}
                  className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
                    selectedCity !== "all"
                      ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <MapPin size={12} />
                  {selectedCity === "all" ? "Toutes les villes" : selectedCity}
                  <ChevronDown size={12} className={`transition-transform ${cityDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {cityDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-200/80 overflow-hidden z-50"
                    >
                      <div className="max-h-64 overflow-y-auto p-1.5">
                        <button
                          onClick={() => { setSelectedCity("all"); setCityDropdownOpen(false); }}
                          className={`w-full rounded-xl px-3 py-2 text-left text-xs font-semibold transition-colors ${
                            selectedCity === "all" ? "bg-indigo-50 text-indigo-700" : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          Toutes les villes
                        </button>
                        {CITIES.map((city) => (
                          <button
                            key={city}
                            onClick={() => { setSelectedCity(city); setCityDropdownOpen(false); }}
                            className={`w-full rounded-xl px-3 py-2 text-left text-xs font-semibold transition-colors ${
                              selectedCity === city ? "bg-indigo-50 text-indigo-700 font-bold" : "text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sort dropdown */}
              <div ref={sortRef} className="relative">
                <button
                  onClick={() => { setSortDropdownOpen((v) => !v); setCityDropdownOpen(false); }}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-all hover:border-slate-300"
                >
                  <ArrowUpDown size={12} />
                  <span className="hidden sm:inline">{currentSort?.label}</span>
                  <ChevronDown size={12} className={`transition-transform ${sortDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {sortDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-44 rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-200/80 overflow-hidden z-50"
                    >
                      <div className="p-1.5">
                        {SORT_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => { setSortBy(opt.value); setSortDropdownOpen(false); }}
                            className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                              sortBy === opt.value ? "bg-indigo-50 text-indigo-700 font-bold" : "text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <opt.icon size={12} />
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Clear filters */}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition-all hover:bg-red-100"
                >
                  <X size={12} />
                  Effacer
                </button>
              )}
            </div>
          </div>

          {/* Mobile expanded filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden sm:hidden"
              >
                <div className="pb-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`rounded-xl border px-3 py-1.5 text-xs font-bold ${
                      selectedCategory === "all" ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    Tous
                  </button>
                  {Object.entries(CATEGORY_META).map(([cat, meta]) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(selectedCategory === cat ? "all" : cat)}
                      className={`inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-bold ${
                        selectedCategory === cat ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      <span>{meta.emoji}</span> {cat}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── RESULTS ──────────────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Results meta */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {loading ? (
              <Loader2 size={14} className="animate-spin text-slate-400" />
            ) : (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black text-white">
                {filtered.length > 99 ? "99+" : filtered.length}
              </span>
            )}
            <p className="text-sm font-bold text-slate-700">
              {loading ? "Chargement..." : `${filtered.length} professionnel${filtered.length !== 1 ? "s" : ""} trouvé${filtered.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          {/* Active filter chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {selectedCity !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
                <MapPin size={10} /> {selectedCity}
                <button onClick={() => setSelectedCity("all")} className="ml-0.5 hover:text-indigo-900"><X size={10} /></button>
              </span>
            )}
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
                {CATEGORY_META[selectedCategory]?.emoji} {selectedCategory}
                <button onClick={() => setSelectedCategory("all")} className="ml-0.5 hover:text-indigo-900"><X size={10} /></button>
              </span>
            )}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-20 text-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400 text-3xl mb-4">
              🔍
            </div>
            <h3 className="text-lg font-black text-slate-800">Aucun résultat</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-xs">
              Essayez d'ajuster vos filtres ou de rechercher une autre ville ou spécialité.
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 hover:bg-indigo-500 transition-all"
            >
              Effacer tous les filtres
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((site, i) => (
              <ProfessionalCard key={site._id} site={site} index={i} />
            ))}
          </div>
        )}

        {/* Bottom CTA — join as professional */}
        {!loading && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 overflow-hidden rounded-3xl bg-slate-950 px-8 py-12 text-center relative"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/4 top-0 h-60 w-60 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
              <div className="absolute right-1/4 bottom-0 h-60 w-60 translate-x-1/2 rounded-full bg-violet-600/15 blur-3xl" />
            </div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-indigo-300">
                <Briefcase size={11} /> Vous êtes professionnel ?
              </span>
              <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl">
                Rejoignez Bookiify gratuitement.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-slate-400 font-medium">
                Créez votre profil, gérez vos rendez-vous et développez votre clientèle avec nos outils avancés.
              </p>
              <Link
                to="/signup"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-900/50 transition-all hover:bg-indigo-500 hover:shadow-indigo-700/60 active:scale-95"
              >
                <Sparkles size={14} />
                Créer mon compte — C'est gratuit
              </Link>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Professionals;
