import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  ChevronRight,
  Calendar,
  Award,
  Home,
  TrendingUp,
  Star,
  Users,
  Shield,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * CUSTOM SVG COMPONENTS
 */
const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const BuildingIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="1" />
    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
  </svg>
);

const KeyIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3" />
  </svg>
);

/**
 * SERVICE ICON MAP
 */
const serviceIconMap = {
  0: <Home size={22} className="text-[#d97706]" />,
  1: <Users size={22} className="text-[#d97706]" />,
  2: <BuildingIcon size={22} className="text-[#d97706]" />,
  3: <TrendingUp size={22} className="text-[#d97706]" />,
  4: <KeyIcon size={22} className="text-[#d97706]" />,
  5: <MapPin size={22} className="text-[#d97706]" />,
};

/**
 * 🏠 REAL ESTATE THEME — "PRIME PROPERTY" EDITION (2026)
 * For: Real Estate Agents, Property Consultants, Brokers, Property Managers
 * Colors: White #ffffff / Light Gray #f8fafc / Navy #1e3a5f / Gold #d97706
 */
const RealEstateTheme = ({ data }) => {
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
    { name: "Properties", href: "#properties" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const trustStats = [
    { value: "500+", label: "Properties Sold" },
    { value: "Licensed", label: "Certified Agent" },
    { value: "15+", label: "Years Experience" },
    { value: "1000+", label: "Families Served" },
  ];

  return (
    <div
      className="bg-[#f8fafc] text-[#1e3a5f] font-sans selection:bg-[#d97706]/20 overflow-x-hidden"
      style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
    >

      {/* ─────────────────────────────────────────
          1. FIXED GLASS NAVBAR
      ───────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-white/90 backdrop-blur-xl border-b border-[#1e3a5f]/10 shadow-lg shadow-[#1e3a5f]/5"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1e3a5f] rounded-lg flex items-center justify-center shadow-lg">
              <Home size={18} className="text-[#d97706]" />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className={`text-lg font-black tracking-tight transition-colors duration-300 ${
                  isScrolled ? "text-[#1e3a5f]" : "text-white"
                }`}
              >
                {ownerId?.businessName || "Prime Property"}
              </span>
              <span
                className={`text-[9px] font-bold uppercase tracking-[0.25em] transition-colors duration-300 ${
                  isScrolled ? "text-[#d97706]" : "text-[#d97706]"
                }`}
              >
                Real Estate
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-[#d97706] ${
                  isScrolled ? "text-[#1e3a5f]" : "text-white/90"
                }`}
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-6 py-2.5 bg-[#d97706] hover:bg-[#b45309] text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg shadow-[#d97706]/30 active:scale-95">
                Book Consultation
              </button>
            </Link>
          </div>

          {/* Mobile Burger */}
          <button
            className={`md:hidden transition-colors ${isScrolled ? "text-[#1e3a5f]" : "text-white"}`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* ─────────────────────────────────────────
          MOBILE MENU — slide from right
      ───────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1001] bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[80vw] max-w-sm z-[1002] bg-[#1e3a5f] p-8 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-2">
                  <Home size={16} className="text-[#d97706]" />
                  <span className="text-white font-black text-sm tracking-wide uppercase">Menu</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X size={28} className="text-white/70 hover:text-white transition-colors" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-black text-white/80 hover:text-[#d97706] uppercase tracking-tight border-b border-white/10 py-4 transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
              <div className="mt-auto">
                <Link to={`/book/${ownerId?._id}`} onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full py-4 bg-[#d97706] hover:bg-[#b45309] text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-xl">
                    Book a Consultation
                  </button>
                </Link>
                {contact?.phone && (
                  <div className="flex items-center gap-3 mt-4 justify-center">
                    <Phone size={14} className="text-[#d97706]" />
                    <span className="text-white/60 text-sm font-bold">{contact.phone}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────
          2. FULL-SCREEN HERO
      ───────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              hero?.backgroundImage ||
              "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
            })`,
          }}
        >
          {/* Navy gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/90 via-[#1e3a5f]/70 to-[#0f2040]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2040]/60 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-[#d97706]/50 rounded-full bg-[#d97706]/10 backdrop-blur-sm"
            >
              <div className="w-2 h-2 rounded-full bg-[#d97706] animate-pulse" />
              <span className="text-[#d97706] text-[10px] font-black uppercase tracking-[0.4em]">
                {data.category || "Real Estate"} • {ownerId?.ville || "Tunisia"}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-6"
            >
              FIND YOUR{" "}
              <span className="text-[#d97706]">PERFECT</span>
              <br />
              PROPERTY.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/75 text-lg md:text-xl font-medium max-w-2xl mb-10 leading-relaxed"
            >
              {hero?.slogan ||
                "Expert guidance through every step of your real estate journey. From first viewing to final signing — we make it seamless."}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              <Link to={`/book/${ownerId?._id}`}>
                <button className="group flex items-center gap-3 px-8 py-4 bg-[#d97706] hover:bg-[#b45309] text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all duration-300 shadow-2xl shadow-[#d97706]/30 active:scale-95">
                  <Calendar size={16} />
                  Book Free Consultation
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              {contact?.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
                >
                  <div className="p-3 border border-white/20 rounded-full group-hover:border-[#d97706] transition-colors">
                    <Phone size={16} />
                  </div>
                  <span className="font-bold tracking-wider text-sm">{contact.phone}</span>
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Trust Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {trustStats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-2xl md:text-3xl font-black text-[#d97706]">{stat.value}</span>
                <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          3. SERVICES SECTION
      ───────────────────────────────────────── */}
      <section id="services" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20">
            <div>
              <p className="text-[#d97706] text-[10px] font-black uppercase tracking-[0.5em] mb-3 flex items-center gap-2">
                <span className="w-8 h-px bg-[#d97706] inline-block" />
                Our Expertise
              </p>
              <h2 className="text-4xl md:text-6xl font-black text-[#1e3a5f] tracking-tight leading-none">
                Professional
                <br />
                <span className="text-[#d97706]">Services</span>
              </h2>
            </div>
            <p className="text-slate-500 text-base font-medium max-w-sm leading-relaxed border-l-4 border-[#1e3a5f]/10 pl-5">
              Comprehensive real estate solutions tailored to your unique needs and goals.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.filter((s) => s.active).map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(30,58,95,0.12)" }}
                onHoverStart={() => setActiveService(idx)}
                onHoverEnd={() => setActiveService(null)}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`group relative bg-white border-2 rounded-2xl p-7 cursor-default transition-all duration-300 ${
                  activeService === idx
                    ? "border-[#d97706]"
                    : "border-[#1e3a5f]/10 hover:border-[#1e3a5f]/20"
                }`}
              >
                {/* Icon badge */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${
                    activeService === idx ? "bg-[#1e3a5f]" : "bg-[#f8fafc]"
                  }`}
                >
                  {serviceIconMap[idx % 6]}
                </div>

                {/* Index */}
                <span className="absolute top-6 right-7 text-[#1e3a5f]/10 font-black text-4xl leading-none select-none group-hover:text-[#d97706]/10 transition-colors">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <h3 className="text-lg font-black text-[#1e3a5f] mb-2 tracking-tight group-hover:text-[#1e3a5f] transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5 min-h-[3rem]">
                  {service.description}
                </p>

                {/* Meta row */}
                <div className="flex items-center justify-between pt-4 border-t border-[#1e3a5f]/5">
                  {service.duration && (
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                      <Clock size={13} />
                      {service.duration}
                    </div>
                  )}
                  <div className="ml-auto flex items-baseline gap-1">
                    <span className="text-xl font-black text-[#1e3a5f]">{service.price}</span>
                    <span className="text-[#d97706] text-xs font-black">TND</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 text-center">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="group inline-flex items-center gap-3 px-10 py-4 border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all duration-300">
                <Calendar size={15} />
                Schedule a Consultation
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          4. FEATURED PROPERTIES (Gallery)
      ───────────────────────────────────────── */}
      {gallery?.show && gallery?.images?.length > 0 && (
        <section id="properties" className="py-32 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
              <div>
                <p className="text-[#d97706] text-[10px] font-black uppercase tracking-[0.5em] mb-3 flex items-center gap-2">
                  <span className="w-8 h-px bg-[#d97706] inline-block" />
                  Featured Listings
                </p>
                <h2 className="text-4xl md:text-6xl font-black text-[#1e3a5f] tracking-tight leading-none">
                  Prime
                  <br />
                  <span className="text-[#d97706]">Properties</span>
                </h2>
              </div>
              <Link to={`/book/${ownerId?._id}`}>
                <button className="flex items-center gap-2 text-[#1e3a5f] hover:text-[#d97706] font-black uppercase tracking-widest text-[10px] transition-colors group">
                  View All Listings
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            {/* Masonry-style property grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {gallery.images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.08 }}
                  className={`group relative overflow-hidden rounded-2xl bg-[#1e3a5f] cursor-pointer ${
                    i === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                  style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}
                >
                  <img
                    src={img}
                    alt={`Property ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    style={{ transition: "transform 0.7s ease" }}
                    onError={(e) => {
                      e.target.src = `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&idx=${i}`;
                    }}
                  />
                  {/* Dark overlay always */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2040]/80 via-[#0f2040]/20 to-transparent" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#d97706]/0 group-hover:bg-[#d97706]/15 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 px-5 py-3 bg-white rounded-full font-black text-[#1e3a5f] text-xs uppercase tracking-widest shadow-xl">
                        <Eye size={14} />
                        View Listing
                      </div>
                    </motion.div>
                  </div>
                  {/* Property label */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <span className="text-white font-black text-sm drop-shadow-lg">
                      Property #{i + 1}
                    </span>
                    <span className="px-3 py-1 bg-[#d97706] text-white text-[9px] font-black uppercase tracking-wider rounded-full">
                      Available
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────
          5. ABOUT / AGENT PROFILE
      ───────────────────────────────────────── */}
      {about?.show && (
        <section id="about" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Agent photo */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-[#f8fafc]">
                  <img
                    src={
                      about.image ||
                      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=987&auto=format&fit=crop"
                    }
                    alt={about.title || "Agent Profile"}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?q=80&w=987&auto=format&fit=crop";
                    }}
                  />
                  {/* Navy overlay bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1e3a5f]/60 to-transparent" />
                </div>
                {/* Floating credential card */}
                <div className="absolute -bottom-6 -right-4 md:right-6 bg-[#1e3a5f] text-white px-6 py-5 rounded-2xl shadow-2xl shadow-[#1e3a5f]/30 min-w-[180px]">
                  <div className="flex items-center gap-2 mb-1">
                    <Award size={14} className="text-[#d97706]" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#d97706]">Certified</span>
                  </div>
                  <p className="text-sm font-black leading-tight">Real Estate Agent</p>
                  <p className="text-white/50 text-xs mt-0.5">Licensed & Insured</p>
                </div>
                {/* Gold accent block */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#d97706]/10 rounded-2xl -z-10" />
              </motion.div>

              {/* Agent bio */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="space-y-8"
              >
                <div>
                  <p className="text-[#d97706] text-[10px] font-black uppercase tracking-[0.5em] mb-3 flex items-center gap-2">
                    <span className="w-8 h-px bg-[#d97706] inline-block" />
                    About the Agent
                  </p>
                  <h2 className="text-4xl md:text-5xl font-black text-[#1e3a5f] tracking-tight leading-tight mb-2">
                    {about.title || "Your Trusted Real Estate Expert"}
                  </h2>
                </div>

                <p className="text-slate-500 text-lg leading-relaxed font-medium italic border-l-4 border-[#d97706] pl-5">
                  "{about.text ||
                    "Finding the right home changes everything. For over 15 years, I've been matching families with properties that become their greatest investment and their happiest memories."}"
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#1e3a5f]/8">
                  {[
                    { value: "500+", label: "Properties Sold", icon: <Home size={16} className="text-[#d97706]" /> },
                    { value: "15+", label: "Years Active", icon: <Star size={16} className="text-[#d97706]" /> },
                    { value: "98%", label: "Client Satisfaction", icon: <Users size={16} className="text-[#d97706]" /> },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="flex justify-center mb-1">{stat.icon}</div>
                      <p className="text-2xl font-black text-[#1e3a5f]">{stat.value}</p>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wide">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Credentials */}
                <div className="space-y-3">
                  {[
                    "Certified Real Estate Agent (CRE)",
                    "Accredited Buyer's Representative (ABR)",
                    "Residential & Commercial Specialist",
                    "Member — National Association of Realtors",
                  ].map((cred, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#d97706]/15 flex items-center justify-center flex-shrink-0">
                        <Shield size={10} className="text-[#d97706]" />
                      </div>
                      <span className="text-slate-600 text-sm font-medium">{cred}</span>
                    </div>
                  ))}
                </div>

                <Link to={`/book/${ownerId?._id}`}>
                  <button className="group flex items-center gap-3 px-8 py-4 bg-[#1e3a5f] hover:bg-[#d97706] text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all duration-300 shadow-lg shadow-[#1e3a5f]/20 active:scale-95 mt-4">
                    <Calendar size={15} />
                    Book a Consultation
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────
          6. WHY CHOOSE US — VALUE STRIP
      ───────────────────────────────────────── */}
      <section className="py-20 bg-[#1e3a5f] relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d97706]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/3 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <p className="text-[#d97706] text-[10px] font-black uppercase tracking-[0.5em] mb-3">Why Choose Us</p>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              The Prime Property Advantage
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield size={24} className="text-[#d97706]" />,
                title: "Licensed & Certified",
                desc: "Fully accredited with all required certifications and professional memberships.",
              },
              {
                icon: <TrendingUp size={24} className="text-[#d97706]" />,
                title: "Market Intelligence",
                desc: "Deep knowledge of local market trends to help you buy or sell at the best price.",
              },
              {
                icon: <Users size={24} className="text-[#d97706]" />,
                title: "Dedicated Support",
                desc: "Personal attention throughout the entire process, never just another number.",
              },
              {
                icon: <Star size={24} className="text-[#d97706]" />,
                title: "Proven Track Record",
                desc: "500+ successful transactions and a 98% client satisfaction rate speak for themselves.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl border border-white/10 hover:border-[#d97706]/40 hover:bg-white/5 transition-all duration-300"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-white font-black text-base mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          7. DARK NAVY FOOTER
      ───────────────────────────────────────── */}
      <footer id="contact" className="bg-[#0f2040] text-white pt-20 pb-10 border-t-4 border-[#d97706]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">

            {/* Col 1: Brand + Contact */}
            <div className="lg:col-span-4 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#d97706] rounded-xl flex items-center justify-center shadow-lg shadow-[#d97706]/30">
                    <Home size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-black text-lg tracking-tight leading-none">
                      {ownerId?.businessName || "Prime Property"}
                    </p>
                    <p className="text-[#d97706] text-[9px] font-black uppercase tracking-[0.3em]">Real Estate</p>
                  </div>
                </div>
                <p className="text-white/40 text-sm leading-relaxed font-medium max-w-xs">
                  Turning property dreams into reality since 2009. Your trusted partner in every real estate transaction.
                </p>
              </div>

              <div className="space-y-4">
                {contact?.phone && (
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-[#d97706]/15 flex items-center justify-center group-hover:bg-[#d97706] transition-colors">
                      <Phone size={16} className="text-[#d97706] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest">Direct Line</p>
                      <p className="text-white font-black text-lg tracking-wide">{contact.phone}</p>
                    </div>
                  </a>
                )}
                {contact?.address && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} className="text-[#d97706]" />
                    </div>
                    <div>
                      <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mb-0.5">Office</p>
                      <p className="text-white/60 text-sm font-medium">{contact.address}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Social links */}
              <div className="flex gap-3">
                {contact?.socials?.instagram && (
                  <a
                    href={contact.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#d97706] flex items-center justify-center transition-colors"
                  >
                    <InstagramIcon size={16} />
                  </a>
                )}
                {contact?.socials?.facebook && (
                  <a
                    href={contact.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#d97706] flex items-center justify-center transition-colors"
                  >
                    <FacebookIcon size={16} />
                  </a>
                )}
                {contact?.socials?.tiktok && (
                  <a
                    href={contact.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#d97706] flex items-center justify-center transition-colors"
                  >
                    <TikTokIcon size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Col 2: Office Hours */}
            <div className="lg:col-span-4 space-y-6">
              <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-[#d97706]">
                <Clock size={14} />
                Office Hours
              </h4>
              <div className="space-y-2">
                {businessHours?.map((h, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center py-2 border-b border-white/5 text-sm ${
                      h.isClosed ? "opacity-40" : ""
                    }`}
                  >
                    <span className="font-semibold text-white/70 w-28">{h.day}</span>
                    <span
                      className={`font-black text-xs tracking-wide ${
                        h.isClosed ? "text-red-400" : "text-white"
                      }`}
                    >
                      {h.isClosed ? "Closed" : `${h.open} – ${h.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 3: Consultation CTA */}
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-br from-[#d97706] to-[#b45309] rounded-3xl p-8 space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <Calendar size={36} className="text-white mb-4" />
                  <h4 className="text-2xl font-black text-white leading-tight mb-2">
                    Ready to Find Your Dream Property?
                  </h4>
                  <p className="text-white/75 text-sm leading-relaxed mb-6">
                    Book a free consultation. No obligation. No pressure. Just expert advice to help you make the right move.
                  </p>
                  <Link to={`/book/${ownerId?._id}`}>
                    <button className="w-full py-4 bg-white hover:bg-[#f8fafc] text-[#1e3a5f] font-black uppercase tracking-widest text-xs rounded-xl transition-all duration-300 shadow-xl active:scale-95">
                      Book a Consultation
                    </button>
                  </Link>
                  {contact?.phone && (
                    <p className="text-center text-white/60 text-xs mt-3 font-medium">
                      Or call us directly:{" "}
                      <a href={`tel:${contact.phone}`} className="text-white font-black hover:underline">
                        {contact.phone}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/25 text-[10px] font-black uppercase tracking-[0.3em] text-center md:text-left">
              &copy; 2026 {ownerId?.businessName || "Prime Property"} — All Rights Reserved
            </p>
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
              Digital Experience by{" "}
              <span className="text-[#d97706]/60">Bookiify</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RealEstateTheme;
