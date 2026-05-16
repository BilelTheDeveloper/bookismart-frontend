import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  Calendar,
  Leaf,
  Heart,
  Star,
  Wind,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * CUSTOM SVG COMPONENTS
 */
const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

/** Decorative lotus SVG for section accents */
const LotusIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <path
      d="M32 52 C32 52 12 40 12 24 C12 16 20 10 28 14 C29.5 8 34.5 8 36 14 C44 10 52 16 52 24 C52 40 32 52 32 52Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32 52 C32 52 20 38 20 26 C20 22 24 19 28 21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M32 52 C32 52 44 38 44 26 C44 22 40 19 36 21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M32 52 L32 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="32" cy="26" r="3" fill="currentColor" opacity="0.3" />
  </svg>
);

/**
 * 🧘 YOGA THEME — FLOW & BALANCE (2026)
 * For: Yoga studios, Pilates centers, mindful movement & wellness practices
 */
const YogaTheme = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!data) return null;

  const { hero, about, services, gallery, contact, businessHours, ownerId } = data;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Classes", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const trustBadges = [
    { icon: <Leaf size={14} />, label: "All Levels Welcome" },
    { icon: <Star size={14} />, label: "Certified Instructors" },
    { icon: <Heart size={14} />, label: "Small Class Sizes" },
  ];

  const levelColors = {
    "All Levels": "bg-[#e8f5e9] text-[#16a34a]",
    Beginner: "bg-[#fff3e0] text-[#c2410c]",
    Intermediate: "bg-[#fce4d6] text-[#c2410c]",
    Advanced: "bg-[#fbe9e7] text-[#b71c1c]",
  };

  const getLevelStyle = (level = "All Levels") => {
    const key = Object.keys(levelColors).find((k) =>
      level.toLowerCase().includes(k.toLowerCase())
    );
    return levelColors[key] || levelColors["All Levels"];
  };

  const fallbackHero =
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2070&auto=format&fit=crop";
  const fallbackAbout =
    "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1974&auto=format&fit=crop";
  const fallbackGallery = [
    "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588286840104-8957b019727f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1617519716867-4c8e80c0ab49?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1601925228008-3e53e98d4d61?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
  ];

  const displayImages =
    gallery?.images?.length > 0 ? gallery.images : fallbackGallery;

  return (
    <div
      className="bg-[#faf7f2] text-[#3d2c1e] font-sans selection:bg-orange-200/50 overflow-x-hidden"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
    >
      {/* ─────────────────────────────────────────────
          1. GLASS NAVBAR
      ───────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-[#faf7f2]/90 backdrop-blur-xl border-b border-[#c2410c]/10 shadow-sm"
            : "py-7 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#c2410c] flex items-center justify-center shadow-lg shadow-orange-700/20">
              <LotusIcon size={20} className="text-white" />
            </div>
            <span
              className={`text-xl font-black tracking-tight transition-colors ${
                isScrolled ? "text-[#3d2c1e]" : "text-white"
              }`}
            >
              {ownerId?.businessName || "Flow Studio"}
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[11px] font-bold uppercase tracking-[0.25em] hover:text-[#c2410c] transition-colors ${
                  isScrolled ? "text-[#3d2c1e]" : "text-white/90"
                }`}
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-6 py-2.5 bg-[#c2410c] hover:bg-orange-600 text-white text-[11px] font-bold uppercase tracking-widest rounded-full transition-all active:scale-95 shadow-md shadow-orange-700/20">
                Book Class
              </button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden transition-colors ${
              isScrolled ? "text-[#3d2c1e]" : "text-white"
            }`}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu — slides from right */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-0 z-[1001] bg-[#faf7f2] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-14">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#c2410c] flex items-center justify-center">
                  <LotusIcon size={16} className="text-white" />
                </div>
                <span className="text-[#3d2c1e] font-black text-lg">
                  {ownerId?.businessName || "Flow Studio"}
                </span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X size={28} className="text-[#3d2c1e]" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-black text-[#3d2c1e] border-b border-[#c2410c]/10 py-5 hover:text-[#c2410c] transition-colors tracking-tight"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto">
              <Link to={`/book/${ownerId?._id}`} onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-5 bg-[#c2410c] text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-lg shadow-orange-700/20">
                  Book Your Class
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────
          2. HERO — FULL SCREEN
      ───────────────────────────────────────────── */}
      <section className="relative h-screen flex items-end justify-start overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${
              hero?.backgroundImage || fallbackHero
            })`,
          }}
        >
          {/* Warm gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3d2c1e]/80 via-[#c2410c]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3d2c1e]/60 to-transparent" />
        </div>

        {/* Decorative lotus watermark */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-10 hidden lg:block">
          <LotusIcon size={320} className="text-[#c2410c]" />
        </div>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 px-8 md:px-16 pb-20 max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-white/30 rounded-full text-white/80 text-[10px] font-bold uppercase tracking-[0.4em] bg-white/5 backdrop-blur-sm">
            <LotusIcon size={12} className="text-[#f97316]" />
            {data?.category || "Yoga & Pilates"} &bull; {ownerId?.ville || "Studio"}
          </span>

          <h1 className="text-7xl md:text-[110px] font-black text-white leading-[0.88] tracking-tight mb-6 uppercase">
            {hero?.title || "Find Your Flow"}
          </h1>

          <p className="text-lg md:text-xl text-white/75 font-medium mb-10 max-w-xl leading-relaxed">
            {hero?.slogan ||
              "Breathe deeper. Move with intention. Discover the practice that transforms your body, calms your mind, and nourishes your soul."}
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 mb-10">
            {trustBadges.map((badge, i) => (
              <span
                key={i}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs font-semibold"
              >
                <span className="text-[#f97316]">{badge.icon}</span>
                {badge.label}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-10 py-5 bg-[#c2410c] hover:bg-orange-600 text-white font-black rounded-2xl uppercase tracking-[0.15em] text-sm transition-all shadow-2xl shadow-orange-900/40 active:scale-95">
                Reserve Your Spot
              </button>
            </Link>
            <a href="#services">
              <button className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 font-bold rounded-2xl uppercase tracking-[0.15em] text-sm transition-all">
                Explore Classes
              </button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────────
          3. SCHEDULE STRIP — days of week
      ───────────────────────────────────────────── */}
      <div className="bg-[#c2410c] py-5 overflow-hidden">
        <div className="flex gap-0">
          {[...Array(2)].map((_, repeat) => (
            <motion.div
              key={repeat}
              className="flex shrink-0 gap-8 items-center pr-8"
              animate={{ x: ["0%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
            >
              {(businessHours || []).map((h, i) => (
                <span
                  key={i}
                  className="flex items-center gap-3 text-white/90 text-xs font-bold uppercase tracking-widest whitespace-nowrap"
                >
                  <Wind size={12} className="text-white/50" />
                  <span className="text-white">{h.day}</span>
                  <span className="text-white/50">
                    {h.isClosed ? "Closed" : `${h.open} – ${h.close}`}
                  </span>
                </span>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          4. SERVICES — CLASS CARDS
      ───────────────────────────────────────────── */}
      <section id="services" className="py-32 px-6 bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <LotusIcon size={18} className="text-[#c2410c]" />
                <span className="text-[10px] font-black text-[#c2410c] uppercase tracking-[0.5em]">
                  Our Practice
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-[#3d2c1e] tracking-tight leading-none uppercase">
                Our Classes
              </h2>
            </div>
            <p className="text-[#7a6555] font-medium text-base max-w-sm border-l-2 border-[#c2410c]/30 pl-5 mb-1 leading-relaxed">
              From gentle Hatha flows to dynamic Vinyasa and reformer Pilates — find the practice that fits your journey.
            </p>
          </div>

          {/* Class cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {(services || []).filter((s) => s.active).map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative bg-[#f5ede3] rounded-3xl p-8 border border-[#e8d5c0] hover:border-[#c2410c]/40 hover:shadow-xl hover:shadow-orange-900/10 transition-all overflow-hidden cursor-pointer"
              >
                {/* Decorative top-right lotus */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <LotusIcon size={56} className="text-[#c2410c]" />
                </div>

                {/* Card number */}
                <span className="text-[10px] font-black text-[#c2410c]/50 uppercase tracking-[0.4em] mb-4 block">
                  Class {String(idx + 1).padStart(2, "0")}
                </span>

                <h3 className="text-2xl font-black text-[#3d2c1e] mb-3 leading-tight group-hover:text-[#c2410c] transition-colors">
                  {service.title}
                </h3>

                {service.description && (
                  <p className="text-[#7a6555] text-sm leading-relaxed mb-6 line-clamp-2">
                    {service.description}
                  </p>
                )}

                {/* Level + Duration badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.level && (
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getLevelStyle(service.level)}`}
                    >
                      {service.level}
                    </span>
                  )}
                  {service.duration && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#e8d5c0] text-[#7a6555]">
                      <Clock size={9} className="inline mr-1 -mt-0.5" />
                      {service.duration}
                    </span>
                  )}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#e8d5c0]/60">
                  <div>
                    <span className="text-3xl font-black text-[#3d2c1e]">
                      {service.price}
                    </span>
                    <span className="text-xs font-bold text-[#c2410c] ml-1">TND</span>
                  </div>
                  <Link to={`/book/${ownerId?._id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2.5 bg-[#c2410c] text-white text-[11px] font-bold uppercase tracking-widest rounded-full shadow-md shadow-orange-700/20 hover:bg-orange-600 transition-colors"
                    >
                      Book
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          5. ABOUT — INSTRUCTOR / STUDIO STORY
      ───────────────────────────────────────────── */}
      {about?.show && (
        <section id="about" className="py-32 bg-[#f0e8de]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left — image with overlay */}
              <div className="relative group">
                <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
                  <img
                    src={about.image || fallbackAbout}
                    alt="Instructor"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Terracotta tint on hover */}
                  <div className="absolute inset-0 bg-[#c2410c]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Floating cert badge */}
                <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-[#faf7f2] rounded-2xl p-5 shadow-xl border border-[#e8d5c0]">
                  <LotusIcon size={28} className="text-[#c2410c] mb-2" />
                  <div className="text-xs font-black text-[#3d2c1e] uppercase tracking-wide">
                    Certified
                  </div>
                  <div className="text-[10px] text-[#7a6555] font-semibold">
                    RYT-200 / RYT-500
                  </div>
                </div>

                {/* Decorative lotus watermark */}
                <div className="absolute -top-8 -left-8 opacity-5">
                  <LotusIcon size={200} className="text-[#c2410c]" />
                </div>
              </div>

              {/* Right — story */}
              <div className="space-y-8 lg:pl-6">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-0.5 bg-[#c2410c]" />
                    <span className="text-[10px] font-black text-[#c2410c] uppercase tracking-[0.45em]">
                      Our Story
                    </span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-black text-[#3d2c1e] tracking-tight leading-[0.92] mb-6 uppercase">
                    {about.title || "Rooted in Mindful Practice"}
                  </h2>
                  <p className="text-[#7a6555] leading-relaxed text-lg font-medium italic border-l-4 border-[#c2410c]/30 pl-5">
                    "{about.text ||
                      "We believe yoga is not a performance — it's a conversation between your body, breath, and the present moment. Our studio was born from a deep love for authentic practice and a desire to share it with every body."}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-2">
                  <div className="bg-[#faf7f2] rounded-2xl p-5 border border-[#e8d5c0]">
                    <Leaf size={20} className="text-[#16a34a] mb-3" />
                    <h5 className="text-[#3d2c1e] font-black uppercase text-xs tracking-widest mb-2">
                      Teaching Philosophy
                    </h5>
                    <p className="text-[#7a6555] text-sm leading-relaxed">
                      Breath-first alignment, compassionate adjustments, and space for every level to thrive.
                    </p>
                  </div>
                  <div className="bg-[#faf7f2] rounded-2xl p-5 border border-[#e8d5c0]">
                    <Star size={20} className="text-[#c2410c] mb-3" />
                    <h5 className="text-[#3d2c1e] font-black uppercase text-xs tracking-widest mb-2">
                      Certifications
                    </h5>
                    <p className="text-[#7a6555] text-sm leading-relaxed">
                      RYT-200, RYT-500, Pilates Mat & Reformer, Prenatal Yoga, Yin & Restorative.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to={`/book/${ownerId?._id}`}>
                    <button className="px-9 py-4 bg-[#c2410c] hover:bg-orange-600 text-white font-black rounded-2xl uppercase tracking-widest text-xs transition-all shadow-lg shadow-orange-700/20 active:scale-95">
                      Start Your Journey
                    </button>
                  </Link>
                  <a href="#services">
                    <button className="px-9 py-4 border-2 border-[#c2410c]/30 text-[#c2410c] hover:border-[#c2410c] font-bold rounded-2xl uppercase tracking-widest text-xs transition-all">
                      View All Classes
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          6. GALLERY — MASONRY
      ───────────────────────────────────────────── */}
      {gallery?.show && displayImages.length > 0 && (
        <section id="gallery" className="py-32 bg-[#faf7f2]">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-10 h-0.5 bg-[#c2410c]/30" />
                <LotusIcon size={18} className="text-[#c2410c]" />
                <div className="w-10 h-0.5 bg-[#c2410c]/30" />
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-[#3d2c1e] tracking-tight uppercase">
                Studio Life
              </h2>
              <p className="text-[#7a6555] mt-4 text-base font-medium">
                Glimpses of our space, our community, and the practice we love.
              </p>
            </div>

            {/* Masonry-style grid */}
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {displayImages.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover="hover"
                  className="relative overflow-hidden rounded-2xl break-inside-avoid group cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`Studio ${i + 1}`}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "4/3" : "1/1" }}
                  />
                  {/* Terracotta hover overlay */}
                  <motion.div
                    variants={{
                      hover: { opacity: 1 },
                    }}
                    initial={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#c2410c]/50 flex items-center justify-center transition-opacity"
                  >
                    <LotusIcon size={48} className="text-white/80" />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-14">
              <Link to={`/book/${ownerId?._id}`}>
                <button className="px-12 py-5 bg-[#3d2c1e] hover:bg-[#c2410c] text-white font-black rounded-2xl uppercase tracking-[0.15em] text-sm transition-all shadow-lg active:scale-95">
                  Join the Community
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          7. FOOTER & CONTACT
      ───────────────────────────────────────────── */}
      <footer
        id="contact"
        className="bg-[#2a1a10] text-[#c9b49a] pt-24 pb-12 border-t border-[#c2410c]/10"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">

          {/* Col 1 — Brand + Contact */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c2410c] flex items-center justify-center shadow-lg shadow-orange-700/30">
                <LotusIcon size={20} className="text-white" />
              </div>
              <div>
                <h4 className="text-white font-black text-lg leading-tight">
                  {ownerId?.businessName || "Flow Studio"}
                </h4>
                <p className="text-[10px] text-[#c2410c] font-bold uppercase tracking-widest">
                  Yoga & Pilates
                </p>
              </div>
            </div>

            <p className="text-[#8a7565] text-sm leading-relaxed font-medium max-w-xs">
              A sanctuary for mindful movement in the heart of {ownerId?.ville || "your city"}.
              All levels, all bodies, all welcome.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#c2410c] shrink-0 mt-0.5" />
                <p className="text-[#c9b49a] text-sm font-medium">
                  {contact?.address || "Studio Address, City"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#c2410c] shrink-0" />
                <p className="text-white text-xl font-black tracking-wide">
                  {contact?.phone || "+216 XX XXX XXX"}
                </p>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {contact?.socials?.instagram && (
                <a
                  href={contact.socials.instagram}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#c2410c] flex items-center justify-center text-[#c9b49a] hover:text-white transition-all"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={18} />
                </a>
              )}
              {contact?.socials?.facebook && (
                <a
                  href={contact.socials.facebook}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#c2410c] flex items-center justify-center text-[#c9b49a] hover:text-white transition-all"
                  aria-label="Facebook"
                >
                  <FacebookIcon size={18} />
                </a>
              )}
              {contact?.socials?.tiktok && (
                <a
                  href={contact.socials.tiktok}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#c2410c] flex items-center justify-center text-[#c9b49a] hover:text-white transition-all"
                  aria-label="TikTok"
                >
                  <TikTokIcon size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Col 2 — Business Hours */}
          <div className="space-y-8">
            <h4 className="text-white text-xs font-black uppercase tracking-[0.4em] flex items-center gap-3">
              <Clock size={14} className="text-[#c2410c]" />
              Studio Hours
            </h4>
            <div className="space-y-3">
              {(businessHours || []).map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b border-white/5 pb-3 text-sm"
                >
                  <span
                    className={`font-semibold ${
                      h.isClosed ? "text-[#4a3828]" : "text-[#c9b49a]"
                    }`}
                  >
                    {h.day}
                  </span>
                  <span
                    className={`font-black uppercase text-xs tracking-wider ${
                      h.isClosed ? "text-red-700/70" : "text-white"
                    }`}
                  >
                    {h.isClosed ? "Closed" : `${h.open} – ${h.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3 — Booking CTA */}
          <div className="bg-[#c2410c]/10 border border-[#c2410c]/25 rounded-3xl p-8 flex flex-col gap-6 self-start">
            <div className="w-12 h-12 rounded-2xl bg-[#c2410c]/20 flex items-center justify-center">
              <Calendar size={24} className="text-[#c2410c]" />
            </div>
            <div>
              <h4 className="text-2xl font-black text-white leading-tight mb-2 uppercase tracking-tight">
                Begin Your Practice
              </h4>
              <p className="text-[#8a7565] text-sm leading-relaxed font-medium">
                Reserve your first class online. No experience needed — just show up, breathe, and begin.
              </p>
            </div>

            <Link to={`/book/${ownerId?._id}`}>
              <button className="w-full py-5 bg-[#c2410c] hover:bg-orange-600 text-white font-black rounded-2xl uppercase tracking-widest text-xs shadow-xl shadow-orange-900/30 transition-all active:scale-95">
                Book Your First Class
              </button>
            </Link>

            <div className="flex items-center gap-2 text-[#8a7565] text-xs font-medium">
              <Heart size={12} className="text-[#c2410c]" />
              First class introductory offer available
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#4a3828] text-[10px] font-black uppercase tracking-[0.3em] text-center">
            &copy; 2026 {ownerId?.businessName || "Flow Studio"} &bull; Digital Experience by{" "}
            <span className="text-[#c2410c]">Bookiify</span>
          </p>
          <div className="flex items-center gap-2">
            <LotusIcon size={14} className="text-[#c2410c]" />
            <span className="text-[#4a3828] text-[10px] font-bold uppercase tracking-widest">
              Flow &amp; Balance
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default YogaTheme;
