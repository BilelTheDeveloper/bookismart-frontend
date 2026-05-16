import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  Play,
  Camera,
  Film,
  ChevronRight,
  Calendar,
  Star,
  Award,
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
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
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
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
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
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

const FilmReelIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
    <line x1="12" y1="2" x2="12" y2="9" />
    <line x1="12" y1="15" x2="12" y2="22" />
    <line x1="2" y1="12" x2="9" y2="12" />
    <line x1="15" y1="12" x2="22" y2="12" />
    <line x1="4.22" y1="4.22" x2="9.17" y2="9.17" />
    <line x1="14.83" y1="14.83" x2="19.78" y2="19.78" />
    <line x1="19.78" y1="4.22" x2="14.83" y2="9.17" />
    <line x1="9.17" y1="14.83" x2="4.22" y2="19.78" />
  </svg>
);

/**
 * CINEMATIC FRAME — VIDEOGRAPHER THEME
 * Premium video production studio aesthetic
 */
const VideographerTheme = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);

  if (!data) return null;

  const { hero, about, services, gallery, contact, businessHours, ownerId } = data;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const fallbackHero =
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop";
  const fallbackAbout =
    "https://images.unsplash.com/photo-1598387846148-47e82ee120cc?q=80&w=1976&auto=format&fit=crop";

  const defaultGallery = [
    "https://images.unsplash.com/photo-1601506521793-dc748fc80b67?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542328604-1ad7f3d1e18b?q=80&w=1976&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1635732829859-7a0f6b6eb6a3?q=80&w=1974&auto=format&fit=crop",
  ];

  const galleryImages =
    gallery?.images?.length > 0 ? gallery.images : defaultGallery;

  return (
    <div
      className="bg-[#09090b] text-[#e2e8f0] font-sans selection:bg-blue-600/30 overflow-x-hidden"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >

      {/* ─── 1. GLASS NAVBAR ─── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-[#09090b]/90 backdrop-blur-2xl border-b border-blue-600/10"
            : "py-7 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-600 rounded-lg opacity-20 blur-sm" />
              <div className="relative w-10 h-10 bg-blue-600/10 border border-blue-600/40 rounded-lg flex items-center justify-center">
                <Film size={18} className="text-blue-400" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-400">
                {data.category || "Videographer"}
              </span>
              <span className="text-lg font-black tracking-tight text-white">
                {ownerId?.businessName || "Cinematic Studio"}
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400 hover:text-blue-400 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/20 active:scale-95">
                Book Production
              </button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-0 z-[1001] bg-[#09090b] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center gap-2">
                <Film size={20} className="text-blue-400" />
                <span className="text-lg font-black text-white tracking-tight">
                  {ownerId?.businessName || "Cinematic Studio"}
                </span>
              </div>
              <X
                size={30}
                onClick={() => setMobileMenuOpen(false)}
                className="cursor-pointer text-slate-400 hover:text-white transition-colors"
              />
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="text-4xl font-black uppercase tracking-tighter text-white border-b border-white/5 pb-5 flex items-center justify-between group"
                >
                  {link.name}
                  <ChevronRight
                    size={22}
                    className="text-blue-600 group-hover:translate-x-1 transition-transform"
                  />
                </motion.a>
              ))}
            </div>

            <div className="mt-auto">
              <Link to={`/book/${ownerId?._id}`}>
                <button className="w-full py-5 bg-blue-600 text-white font-black text-sm uppercase tracking-widest rounded-xl shadow-2xl shadow-blue-600/30">
                  Book Your Production
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 2. CINEMATIC HERO ─── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Letterbox bars — cinema aspect ratio */}
        <div className="absolute top-0 left-0 w-full h-[7vh] bg-black z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[7vh] bg-black z-20 pointer-events-none" />

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${hero?.backgroundImage || fallbackHero})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-[#09090b]" />
          {/* Blue scan-line overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, #2563eb 2px, #2563eb 3px)",
            }}
          />
          {/* Blue vignette left */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-transparent" />
        </div>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 mb-10 border border-blue-500/30 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.5em] bg-blue-600/5 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {data.category || "Video Production"} &bull; {ownerId?.ville || "Tunis"}
          </motion.span>

          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mb-4 tracking-tighter text-white leading-[0.88] uppercase">
            {hero?.title || "Every Frame"}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[2px] w-16 bg-blue-600" />
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-blue-400 uppercase leading-none">
              Tells a Story.
            </h2>
            <div className="h-[2px] w-16 bg-blue-600" />
          </div>

          <p className="text-base md:text-xl text-slate-400 font-medium mb-14 max-w-2xl mx-auto leading-relaxed">
            {hero?.slogan ||
              "Cinematic storytelling that captures your most important moments with precision, artistry, and heart."}
          </p>

          {/* Quick-links for package types */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["Wedding Film", "Corporate", "Music Video", "Commercial", "Social Content"].map(
              (pkg) => (
                <a
                  key={pkg}
                  href="#services"
                  className="px-4 py-1.5 border border-white/10 hover:border-blue-500/50 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-400 transition-all duration-300 backdrop-blur-sm"
                >
                  {pkg}
                </a>
              )
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="w-full sm:w-auto flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl uppercase tracking-[0.2em] text-xs transition-all duration-300 shadow-2xl shadow-blue-600/30 group">
                <Play size={16} className="group-hover:scale-125 transition-transform" />
                Book Your Production
              </button>
            </Link>
            <div className="flex items-center gap-3 text-slate-400">
              <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">
                <Phone size={16} className="text-blue-400" />
              </div>
              <span className="font-bold tracking-widest text-sm">{contact?.phone}</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500/50 to-transparent" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-500/60">
            Scroll
          </span>
        </motion.div>
      </section>

      {/* ─── 3. PRODUCTION PACKAGES / SERVICES ─── */}
      <section id="services" className="py-32 px-6 bg-[#09090b]">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] mb-4 flex items-center gap-2">
                <FilmReelIcon size={14} /> Production Packages
              </p>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                What We <br />
                <span className="text-blue-500">Create</span>
              </h2>
            </div>
            <p className="text-slate-500 font-medium text-base border-l-2 border-blue-600 pl-6 max-w-xs leading-relaxed">
              Every project is crafted with a dedicated director, professional-grade equipment, and full post-production.
            </p>
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              ?.filter((s) => s.active)
              .map((service, idx) => (
                <motion.div
                  key={idx}
                  onHoverStart={() => setActiveService(idx)}
                  onHoverEnd={() => setActiveService(null)}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative group bg-[#0f0f12] border border-white/5 hover:border-blue-600/40 rounded-2xl overflow-hidden transition-all duration-500"
                >
                  {/* Blue accent top border */}
                  <div
                    className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 to-blue-400 transition-opacity duration-500 ${
                      activeService === idx ? "opacity-100" : "opacity-30"
                    }`}
                  />

                  {/* Blue glow on hover */}
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/3 transition-all duration-500 rounded-2xl" />

                  <div className="p-8 relative z-10">
                    {/* Card header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 bg-blue-600/10 border border-blue-600/20 rounded-xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                        <Film
                          size={20}
                          className="text-blue-400 group-hover:text-blue-300 transition-colors"
                        />
                      </div>
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest border border-white/5 px-3 py-1 rounded-full">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Service info */}
                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-blue-100 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                      {service.description || "Professional cinematic production with full post-processing, color grading, and sound design."}
                    </p>

                    {/* Deliverables tag */}
                    <div className="flex items-center gap-2 mb-4">
                      <Camera size={13} className="text-blue-500" />
                      <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">
                        Edited 4K Film
                      </span>
                    </div>

                    {/* Duration and price */}
                    <div className="pt-5 border-t border-white/5 flex items-center justify-between">
                      {service.duration && (
                        <div className="flex items-center gap-2">
                          <Clock size={13} className="text-slate-500" />
                          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                            {service.duration}h coverage
                          </span>
                        </div>
                      )}
                      <div className="ml-auto text-right">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-black text-white">
                            {service.price}
                          </span>
                          <span className="text-xs font-black text-blue-400 uppercase">
                            TND
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* CTA below services */}
          <div className="mt-16 text-center">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="inline-flex items-center gap-3 px-10 py-4 border border-blue-600/40 hover:border-blue-600 hover:bg-blue-600/10 text-blue-400 font-black uppercase tracking-widest text-xs rounded-xl transition-all duration-300">
                <Calendar size={16} />
                Schedule a Free Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 4. PORTFOLIO STRIP ─── */}
      <section
        id="portfolio"
        className="py-24 bg-[#070709] border-y border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] mb-3">
                Our Reel
              </p>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                Production <br />
                <span className="text-blue-500">Portfolio</span>
              </h2>
            </div>
            <p className="text-slate-500 text-sm font-medium border-l-2 border-blue-600 pl-5 max-w-xs leading-relaxed">
              A selection of frames from our most recent productions — weddings, brands, musicians, and more.
            </p>
          </div>

          {/* Film-frame grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {galleryImages.slice(0, 6).map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className={`relative group overflow-hidden bg-zinc-900 ${
                  i === 0 || i === 3
                    ? "col-span-2 row-span-2 md:col-span-2"
                    : "col-span-1"
                }`}
                style={{
                  aspectRatio: i === 0 || i === 3 ? "16/9" : "4/3",
                }}
              >
                {/* Film frame corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-blue-500/60 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-blue-500/60 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-blue-500/60 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-blue-500/60 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <img
                  src={img}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  alt={`Production still ${i + 1}`}
                />
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-all duration-500" />
                {/* Play icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-blue-600/80 backdrop-blur-sm flex items-center justify-center">
                    <Play size={18} className="text-white ml-1" fill="white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. ABOUT / DIRECTOR PROFILE ─── */}
      {about?.show && (
        <section id="about" className="py-32 bg-[#09090b]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
              {/* Director portrait */}
              <div className="relative">
                <div className="relative group overflow-hidden rounded-2xl aspect-[3/4] max-h-[640px]">
                  <img
                    src={about?.image || fallbackAbout}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    alt="Director"
                  />
                  {/* Blue overlay */}
                  <div className="absolute inset-0 bg-blue-600/20 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Credential badge */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-black/80 backdrop-blur-md border border-blue-600/20 rounded-xl p-4 flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center border border-blue-600/30">
                        <Award size={18} className="text-blue-400" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">
                          Director / DP
                        </p>
                        <p className="text-sm font-black text-white">
                          {about?.title || "Creative Director"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating stats */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="absolute -right-6 top-10 bg-[#0f0f12] border border-blue-600/20 rounded-xl p-5 hidden lg:block"
                >
                  <div className="text-3xl font-black text-white">200+</div>
                  <div className="text-[9px] font-black text-blue-400 uppercase tracking-widest mt-1">
                    Productions
                  </div>
                </motion.div>
              </div>

              {/* Director profile text */}
              <div className="space-y-8">
                <div className="w-12 h-[2px] bg-blue-600" />
                <div>
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] mb-4">
                    Behind the lens
                  </p>
                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                    {about?.title || "The Director's Vision"}
                  </h2>
                </div>

                <p className="text-slate-400 leading-relaxed text-lg font-medium italic border-l-2 border-blue-600 pl-6">
                  "{about?.text ||
                    "We believe every project deserves the full cinematic treatment. From pre-production planning to the final color grade, we craft films that move people, inspire brands, and stand the test of time."}"
                </p>

                {/* Equipment / credentials list */}
                <div className="space-y-3 pt-2">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                    <Camera size={12} /> Production Equipment
                  </p>
                  {[
                    "Canon EOS R5 — Primary Camera",
                    "DJI Ronin-S — Gimbal Stabilizer",
                    "DJI Mavic 3 Pro — Aerial Cinematography",
                    "Aputure 600D — Professional Lighting",
                    "Resolve Studio — Color Grading",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm text-slate-400 font-medium"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
                  {[
                    { value: "8+", label: "Years Active" },
                    { value: "200+", label: "Productions" },
                    { value: "4K", label: "Resolution" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl font-black text-blue-400">
                        {stat.value}
                      </div>
                      <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Link to={`/book/${ownerId?._id}`}>
                  <button className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all duration-300 shadow-xl shadow-blue-600/20 group">
                    <Play size={15} className="group-hover:scale-125 transition-transform" />
                    Start Your Project
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── 6. GALLERY — DARK MASONRY ─── */}
      {gallery?.show && gallery?.images?.length > 0 && (
        <section id="gallery" className="py-32 bg-[#070709]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] mb-4">
                Production Stills
              </p>
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
                The <span className="text-blue-500">Gallery</span>
              </h2>
            </div>

            {/* Masonry grid */}
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {gallery.images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative group break-inside-avoid overflow-hidden rounded-xl bg-zinc-900 block mb-4"
                >
                  <img
                    src={img}
                    className="w-full object-cover block transition-all duration-700 group-hover:scale-110"
                    alt={`Production still ${i + 1}`}
                  />
                  {/* Blue tint on hover */}
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/30 transition-all duration-500" />
                  {/* Film corner marks */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-blue-400/0 group-hover:border-blue-400/80 transition-all duration-300" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-blue-400/0 group-hover:border-blue-400/80 transition-all duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 7. CINEMATIC TESTIMONIAL / CTA STRIP ─── */}
      <section className="py-24 bg-blue-600/5 border-y border-blue-600/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6 gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className="text-amber-400 fill-amber-400"
              />
            ))}
          </div>
          <p className="text-2xl md:text-4xl font-black text-white tracking-tight leading-snug italic mb-8">
            "They turned our wedding day into a cinematic masterpiece. <br />
            <span className="text-blue-400">We cry every time we watch it."</span>
          </p>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-10">
            — A Recent Client
          </p>
          <Link to={`/book/${ownerId?._id}`}>
            <button className="inline-flex items-center gap-3 px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-sm rounded-xl transition-all duration-300 shadow-2xl shadow-blue-600/30 group">
              <Play size={18} fill="white" className="group-hover:scale-110 transition-transform" />
              Book Your Production Now
            </button>
          </Link>
        </div>
      </section>

      {/* ─── 8. FOOTER & CONTACT ─── */}
      <footer id="contact" className="pt-32 pb-12 bg-[#060608] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 xl:gap-24">

            {/* Brand + contact */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600/10 border border-blue-600/30 rounded-xl flex items-center justify-center">
                  <Film size={22} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.4em]">
                    {data.category || "Video Production"}
                  </p>
                  <p className="text-xl font-black text-white tracking-tight">
                    {ownerId?.businessName || "Cinematic Studio"}
                  </p>
                </div>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed font-medium max-w-xs">
                Premium video production services — from wedding films to brand commercials. We tell your story.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white/5 rounded-lg border border-white/5 shrink-0">
                    <MapPin size={15} className="text-blue-400" />
                  </div>
                  <p className="text-slate-400 font-medium text-sm leading-relaxed">
                    {contact?.address || "Studio District, Tunis, Tunisia"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-white/5 rounded-lg border border-white/5 shrink-0">
                    <Phone size={15} className="text-blue-400" />
                  </div>
                  <p className="text-xl font-black text-white">
                    {contact?.phone}
                  </p>
                </div>
              </div>

              {/* Social icons */}
              <div className="flex gap-3 pt-2">
                {contact?.socials?.instagram && (
                  <a
                    href={contact.socials.instagram}
                    className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-blue-600 hover:border-blue-600 text-slate-400 hover:text-white transition-all duration-300"
                  >
                    <InstagramIcon size={18} />
                  </a>
                )}
                {contact?.socials?.facebook && (
                  <a
                    href={contact.socials.facebook}
                    className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-blue-600 hover:border-blue-600 text-slate-400 hover:text-white transition-all duration-300"
                  >
                    <FacebookIcon size={18} />
                  </a>
                )}
                {contact?.socials?.tiktok && (
                  <a
                    href={contact.socials.tiktok}
                    className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-blue-600 hover:border-blue-600 text-slate-400 hover:text-white transition-all duration-300"
                  >
                    <TikTokIcon size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Business hours */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] flex items-center gap-2.5">
                <Clock size={14} className="text-blue-400" />
                Studio Hours
              </h4>
              <div className="space-y-3">
                {businessHours?.map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm border-b border-white/5 pb-3 last:border-0"
                  >
                    <span
                      className={`font-bold ${
                        h.isClosed ? "text-slate-700" : "text-slate-400"
                      }`}
                    >
                      {h.day}
                    </span>
                    <span
                      className={`font-black uppercase text-xs tracking-wider ${
                        h.isClosed ? "text-rose-600" : "text-white"
                      }`}
                    >
                      {h.isClosed ? "Closed" : `${h.open} — ${h.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking CTA card */}
            <div
              className="relative bg-[#0a0a10] border border-blue-600/20 rounded-2xl p-8 overflow-hidden"
              style={{
                boxShadow: "0 0 60px rgba(37, 99, 235, 0.08)",
              }}
            >
              {/* Glow effect */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-5">
                <div className="w-12 h-12 bg-blue-600/10 border border-blue-600/20 rounded-xl flex items-center justify-center">
                  <Calendar size={22} className="text-blue-400" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                    Book Your Production
                  </h4>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">
                    Schedule a free consultation. Let's discuss your vision and craft a cinematic plan together.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    "Free creative consultation",
                    "Custom production proposal",
                    "Transparent pricing",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span className="text-xs text-slate-400 font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <Link to={`/book/${ownerId?._id}`}>
                  <button
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl uppercase tracking-widest text-xs transition-all duration-300 mt-4 flex items-center justify-center gap-2 group"
                    style={{ boxShadow: "0 8px 32px rgba(37, 99, 235, 0.25)" }}
                  >
                    <Play size={14} fill="white" className="group-hover:scale-110 transition-transform" />
                    Book Now — It's Free
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.3em]">
              &copy; 2026 {ownerId?.businessName || "Cinematic Studio"} — All rights reserved
            </p>
            <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.3em]">
              Digital Experience by{" "}
              <span className="text-blue-600/60">Bookiify</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VideographerTheme;
