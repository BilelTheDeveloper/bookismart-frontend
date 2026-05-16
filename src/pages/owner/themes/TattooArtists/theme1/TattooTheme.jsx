import React, { useState, useEffect } from "react";
import { Phone, MapPin, Clock, Menu, X, Calendar, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────
//  CUSTOM SVG ICONS
// ─────────────────────────────────────────────
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

// Decorative ink drip SVG used as section divider accent
const InkDripAccent = ({ className = "" }) => (
  <svg viewBox="0 0 120 20" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M0 0 Q10 12 20 5 Q30 18 40 3 Q50 16 60 2 Q70 18 80 4 Q90 15 100 1 Q110 14 120 0" stroke="#dc2626" strokeWidth="1.5" fill="none" opacity="0.6" />
    <circle cx="30" cy="18" r="2" fill="#dc2626" opacity="0.5" />
    <circle cx="70" cy="16" r="1.5" fill="#dc2626" opacity="0.4" />
    <circle cx="95" cy="17" r="1" fill="#dc2626" opacity="0.35" />
  </svg>
);

// Skull motif SVG for decorative use
const SkullMotif = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="32" cy="28" rx="18" ry="20" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <ellipse cx="24" cy="30" rx="5" ry="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <ellipse cx="40" cy="30" rx="5" ry="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M24 48 L28 44 L32 48 L36 44 L40 48" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="22" y="44" width="20" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <line x1="28" y1="44" x2="28" y2="50" stroke="currentColor" strokeWidth="1.2" />
    <line x1="32" y1="44" x2="32" y2="50" stroke="currentColor" strokeWidth="1.2" />
    <line x1="36" y1="44" x2="36" y2="50" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="32" cy="22" r="2" fill="currentColor" opacity="0.3" />
  </svg>
);

// Ink drop icon for service cards
const InkDropIcon = ({ className = "" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C12 2 5 9.5 5 14.5C5 18.09 8.13 21 12 21C15.87 21 19 18.09 19 14.5C19 9.5 12 2 12 2Z" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
    <path d="M8.5 15.5C8.5 17.43 10.07 19 12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─────────────────────────────────────────────
//  TATTOO THEME — INK ATELIER (ULTRA 2026)
// ─────────────────────────────────────────────
const TattooTheme = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredGallery, setHoveredGallery] = useState(null);

  if (!data) return null;

  const { hero, about, services, gallery, contact, businessHours, ownerId } = data;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#gallery" },
    { name: "Artist", href: "#about" },
    { name: "Book", href: "#contact" },
  ];

  const trustBadges = [
    { label: "Custom Designs Only" },
    { label: "Sterile Environment" },
    { label: "By Appointment Only" },
  ];

  const artistSpecializations = [
    "Realism",
    "Traditional",
    "Blackwork",
    "Neo-Traditional",
  ];

  return (
    <div className="bg-black text-[#e5e0d8] font-sans selection:bg-red-700/40 overflow-x-hidden">

      {/* ─── TEXTURE OVERLAY (entire page) ─── */}
      <div
        className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23fff'/%3E%3Crect width='1' height='1' fill='%23000'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════════
          1. GLASS NAVBAR
      ════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-black/90 backdrop-blur-xl border-b border-red-900/30"
            : "py-7 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo mark */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 border border-red-700/70 rotate-45" />
              <SkullMotif size={18} className="text-red-600 relative z-10" />
            </div>
            <span className="text-lg font-black tracking-[0.08em] uppercase text-white">
              {ownerId?.businessName || "Ink Atelier"}
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.35em] text-[#a09888] hover:text-red-500 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-6 py-2.5 bg-red-700 hover:bg-red-600 text-white text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border border-red-500/30">
                Book Session
              </button>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* ─── Mobile Menu Slide-In ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-0 z-[1001] bg-black flex flex-col p-8"
            style={{ borderLeft: "1px solid rgba(220,38,38,0.25)" }}
          >
            {/* Close button */}
            <div className="flex justify-between items-center mb-12">
              <SkullMotif size={24} className="text-red-700" />
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X size={32} className="text-white" />
              </button>
            </div>

            {/* Decorative drip */}
            <InkDripAccent className="w-48 mb-8 opacity-60" />

            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-5xl font-black uppercase tracking-tighter text-white border-b border-white/5 pb-5 hover:text-red-500 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto">
              <Link to={`/book/${ownerId?._id}`}>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-5 bg-red-700 text-white font-black uppercase tracking-widest text-sm"
                >
                  Book Your Session
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════
          2. FULL-SCREEN HERO
      ════════════════════════════════════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              hero?.backgroundImage ||
              "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2070&auto=format&fit=crop"
            })`,
          }}
        >
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black" />
          {/* Red left vignette */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-red-950/40 to-transparent" />
        </div>

        {/* Red slash accent element */}
        <div
          className="absolute left-0 top-0 h-full w-1 bg-red-700"
          style={{ boxShadow: "0 0 40px 8px rgba(220,38,38,0.35)" }}
        />
        <div className="absolute left-8 top-1/2 -translate-y-1/2 h-40 w-px bg-gradient-to-b from-transparent via-red-700 to-transparent" />

        {/* Skull watermark */}
        <div className="absolute right-10 bottom-16 opacity-[0.06]">
          <SkullMotif size={200} className="text-white" />
        </div>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-5xl"
        >
          {/* Category badge */}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-1.5 mb-10 border border-red-800/60 text-red-500 text-[10px] font-black uppercase tracking-[0.55em] bg-red-950/20"
          >
            <SkullMotif size={12} className="text-red-500" />
            {data.category || "Tattoo Studio"} &bull; {ownerId?.ville || "Tunis"}
          </motion.span>

          {/* Main headline */}
          <h1 className="text-6xl md:text-[7rem] xl:text-[9rem] font-black mb-6 tracking-tighter text-white leading-[0.88] uppercase">
            {hero?.title || (
              <>
                THE ART<br />
                <span className="text-red-600">OF SKIN</span>
              </>
            )}
          </h1>

          {/* Artist name */}
          <p className="text-red-400 font-black uppercase tracking-[0.5em] text-sm mb-6">
            {ownerId?.businessName || "Ink Atelier Studio"}
          </p>

          {/* Slogan */}
          <p className="text-lg md:text-xl text-[#a09888] font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            {hero?.slogan ||
              "Where permanent art meets living canvas. Every piece is a collaboration — your vision, our craft."}
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {trustBadges.map((badge) => (
              <span
                key={badge.label}
                className="flex items-center gap-2 px-4 py-2 border border-white/10 text-[#a09888] text-[10px] font-black uppercase tracking-widest"
              >
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full inline-block" />
                {badge.label}
              </span>
            ))}
          </div>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="w-full sm:w-auto px-12 py-5 bg-red-700 hover:bg-red-600 text-white font-black uppercase tracking-[0.25em] text-xs transition-all border border-red-500/30 shadow-2xl shadow-red-900/40">
                Book a Session
              </button>
            </Link>
            <div className="flex items-center gap-3 text-[#a09888]">
              <Phone size={16} className="text-red-600" />
              <span className="font-bold tracking-widest text-sm">{contact?.phone || ""}</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>

      {/* ═══════════════════════════════════════
          3. SERVICES — SESSION TYPES
      ════════════════════════════════════════ */}
      <section id="services" className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="mb-20">
            <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.55em] mb-4 flex items-center gap-3">
              <InkDropIcon className="text-red-600" /> The Sessions
            </p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                Ink Services
              </h2>
              <p className="text-[#6b6057] font-medium text-base border-l-2 border-red-800 pl-5 max-w-xs">
                Every session is a private consultation. No walk-ins — by appointment only.
              </p>
            </div>
            <InkDripAccent className="w-56 mt-8 opacity-70" />
          </div>

          {/* Service cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {services
              .filter((s) => s.active)
              .map((service, idx) => (
                <motion.div
                  key={idx}
                  onHoverStart={() => setHoveredService(idx)}
                  onHoverEnd={() => setHoveredService(null)}
                  whileHover={{ y: -4 }}
                  className="relative group bg-[#0a0a0a] border border-white/5 p-7 overflow-hidden transition-all duration-300"
                  style={{
                    borderLeft: hoveredService === idx
                      ? "3px solid #dc2626"
                      : "3px solid rgba(220,38,38,0.15)",
                    boxShadow: hoveredService === idx
                      ? "-6px 0 30px -5px rgba(220,38,38,0.35), 0 0 0 1px rgba(220,38,38,0.08)"
                      : "none",
                    transition: "border 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  {/* Card number watermark */}
                  <span className="absolute top-4 right-6 text-6xl font-black text-white/[0.03] select-none pointer-events-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Icon + title row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <InkDropIcon className="text-red-700 shrink-0" />
                      <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-red-400 transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[#6b6057] text-sm leading-relaxed mb-6">
                    {service.description || "Custom design. One-on-one private session."}
                  </p>

                  {/* Duration + Price */}
                  <div className="flex items-end justify-between border-t border-white/5 pt-5">
                    {service.duration && (
                      <div className="flex items-center gap-1.5 text-[#a09888]">
                        <Clock size={13} className="text-red-700" />
                        <span className="text-xs font-black uppercase tracking-widest">
                          {service.duration}
                        </span>
                      </div>
                    )}
                    <div className="text-right">
                      <span className="text-2xl font-black text-white">
                        {service.price}
                      </span>
                      <small className="text-red-600 text-xs font-black ml-1.5 uppercase tracking-wider">
                        TND
                      </small>
                    </div>
                  </div>

                  {/* Hover CTA */}
                  <AnimatePresence>
                    {hoveredService === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="mt-5"
                      >
                        <Link to={`/book/${ownerId?._id}`}>
                          <button className="w-full py-2.5 bg-red-700/20 border border-red-700/40 text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-700 hover:text-white transition-colors">
                            Book This Session
                          </button>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. FLASH ART PORTFOLIO GALLERY
      ════════════════════════════════════════ */}
      {gallery?.show && gallery?.images?.length > 0 && (
        <section id="gallery" className="py-32 bg-[#060606]">
          <div className="max-w-7xl mx-auto px-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.55em] mb-4 flex items-center gap-3">
                  <SkullMotif size={14} className="text-red-600" /> Flash Art
                </p>
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                  The Portfolio
                </h2>
              </div>
              <p className="text-[#6b6057] text-sm border-l border-red-900 pl-5 max-w-xs">
                A selection of original flash designs and completed works. All pieces available for booking.
              </p>
            </div>

            {/* Masonry dark grid */}
            <div className="columns-2 md:columns-3 xl:columns-4 gap-3 space-y-3">
              {gallery.images.map((img, i) => (
                <motion.div
                  key={i}
                  className="relative overflow-hidden break-inside-avoid group cursor-pointer"
                  onHoverStart={() => setHoveredGallery(i)}
                  onHoverEnd={() => setHoveredGallery(null)}
                  style={{ marginBottom: "0.75rem" }}
                >
                  <img
                    src={img}
                    alt={`Flash art ${i + 1}`}
                    className="w-full object-cover block transition-transform duration-700 group-hover:scale-105"
                    style={{
                      filter: "brightness(0.75) contrast(1.1)",
                    }}
                    onError={(e) => {
                      e.target.src = `https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=600&auto=format&fit=crop&sig=${i}`;
                    }}
                  />
                  {/* Red overlay on hover */}
                  <AnimatePresence>
                    {hoveredGallery === i && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-red-900/70 flex flex-col items-center justify-center gap-3"
                      >
                        <SkullMotif size={28} className="text-white/80" />
                        <Link to={`/book/${ownerId?._id}`}>
                          <span className="text-white text-[10px] font-black uppercase tracking-[0.4em] border border-white/40 px-4 py-2 hover:bg-white hover:text-red-700 transition-colors">
                            Book This Design
                          </span>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* CTA below gallery */}
            <div className="mt-16 text-center">
              <Link to={`/book/${ownerId?._id}`}>
                <button className="inline-flex items-center gap-3 px-10 py-4 border border-red-800/50 text-red-500 text-[11px] font-black uppercase tracking-widest hover:bg-red-700 hover:text-white hover:border-red-700 transition-all">
                  <Zap size={14} />
                  Commission a Custom Piece
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          5. ARTIST PROFILE / ABOUT
      ════════════════════════════════════════ */}
      {about?.show && (
        <section id="about" className="py-32 bg-black">
          <div className="max-w-7xl mx-auto px-6">

            {/* Section label */}
            <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.55em] mb-16 flex items-center gap-3">
              <InkDropIcon className="text-red-600" /> The Artist
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

              {/* Artist photo — left column */}
              <div className="relative group overflow-hidden">
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(220,38,38,0.18) 0%, transparent 60%)",
                    mixBlendMode: "color-dodge",
                  }}
                />
                {/* Red frame accent */}
                <div
                  className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-red-700 z-10"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-red-700 z-10"
                  aria-hidden="true"
                />
                <img
                  src={
                    about?.image ||
                    "https://images.unsplash.com/photo-1562887009-a1fc50d5ca52?q=80&w=1974&auto=format&fit=crop"
                  }
                  alt="Artist at work"
                  className="w-full h-[520px] object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-1000"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop";
                  }}
                />
                {/* Red tint layer on hover */}
                <div className="absolute inset-0 bg-red-950/20 group-hover:opacity-0 transition-opacity duration-700" />
              </div>

              {/* Artist info — right column */}
              <div className="space-y-8">
                <div className="w-12 h-px bg-red-700" />
                <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                  {about?.title || "The Artist Behind the Needle"}
                </h2>
                <p className="text-[#8a7f74] leading-relaxed text-lg italic border-l-2 border-red-900 pl-5">
                  "{about?.text ||
                    "Every piece is more than pigment in skin — it is a story made permanent. I work exclusively with clients who are ready to commit to a design that speaks their truth."}"
                </p>

                {/* Specializations */}
                <div>
                  <h5 className="text-white font-black uppercase text-[10px] tracking-[0.4em] mb-4">
                    Specializations
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {artistSpecializations.map((spec) => (
                      <span
                        key={spec}
                        className="px-4 py-1.5 border border-white/10 text-[#a09888] text-xs font-black uppercase tracking-widest hover:border-red-700/50 hover:text-red-400 transition-colors"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
                  <div>
                    <p className="text-4xl font-black text-white mb-1">10+</p>
                    <p className="text-[#6b6057] text-xs font-bold uppercase tracking-wider">
                      Years of Craft
                    </p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-white mb-1">500+</p>
                    <p className="text-[#6b6057] text-xs font-bold uppercase tracking-wider">
                      Pieces Created
                    </p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-red-600 mb-1">100%</p>
                    <p className="text-[#6b6057] text-xs font-bold uppercase tracking-wider">
                      Custom Only
                    </p>
                  </div>
                </div>

                {/* Philosophy */}
                <div className="bg-[#0a0a0a] border border-white/5 p-6">
                  <h5 className="text-white font-black uppercase text-[10px] tracking-[0.4em] mb-3">
                    Design Philosophy
                  </h5>
                  <p className="text-[#6b6057] text-sm leading-relaxed">
                    No flash off the wall. Every design starts from scratch — a conversation, a sketch, and a commitment. The body is the canvas, and it deserves original art.
                  </p>
                </div>

                <Link to={`/book/${ownerId?._id}`}>
                  <button className="mt-2 inline-flex items-center gap-3 px-8 py-4 bg-red-700 hover:bg-red-600 text-white font-black uppercase tracking-widest text-xs transition-all">
                    <Calendar size={14} /> Book a Consultation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          6. FOOTER — PURE BLACK
      ════════════════════════════════════════ */}
      <footer
        id="contact"
        className="pt-24 pb-12 bg-black"
        style={{ borderTop: "1px solid rgba(220,38,38,0.3)" }}
      >
        {/* Red accent top-border glow */}
        <div
          className="w-full h-px mb-24 opacity-60"
          style={{
            background:
              "linear-gradient(90deg, transparent, #dc2626 30%, #dc2626 70%, transparent)",
            boxShadow: "0 0 20px 2px rgba(220,38,38,0.4)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16 xl:gap-20">

          {/* ── Column 1: Brand + Contact ── */}
          <div className="space-y-8">
            {/* Brand */}
            <div className="flex items-center gap-3 mb-2">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 border border-red-700/60 rotate-45" />
                <SkullMotif size={20} className="text-red-600 relative z-10" />
              </div>
              <div>
                <p className="text-white font-black text-lg uppercase tracking-tight">
                  {ownerId?.businessName || "Ink Atelier"}
                </p>
                <p className="text-[#6b6057] text-[10px] font-bold uppercase tracking-widest">
                  Premium Tattoo Studio
                </p>
              </div>
            </div>

            <p className="text-[#6b6057] text-sm leading-relaxed max-w-xs">
              A private studio committed to original art and meticulous hygiene. Every session is by appointment — because your skin deserves that respect.
            </p>

            {/* Contact details */}
            <div className="space-y-4">
              {contact?.address && (
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-red-700 shrink-0 mt-0.5" />
                  <p className="text-[#a09888] text-sm font-medium">{contact.address}</p>
                </div>
              )}
              {contact?.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-red-700 shrink-0" />
                  <p className="text-white text-xl font-black tracking-wider">{contact.phone}</p>
                </div>
              )}
            </div>

            {/* Social links — Instagram VERY prominent */}
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#4a4540]">
                Follow the Work
              </p>
              <div className="flex items-center gap-3">
                {contact?.socials?.instagram && (
                  <a
                    href={contact.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-900/40 to-red-800/20 border border-red-700/40 text-white hover:bg-red-700 hover:border-red-600 transition-all group"
                    aria-label="Instagram"
                  >
                    <InstagramIcon size={18} />
                    <span className="text-xs font-black uppercase tracking-widest group-hover:text-white">
                      Instagram
                    </span>
                  </a>
                )}
                {contact?.socials?.facebook && (
                  <a
                    href={contact.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 border border-white/10 text-[#a09888] hover:bg-red-700 hover:text-white hover:border-red-600 transition-all"
                    aria-label="Facebook"
                  >
                    <FacebookIcon size={18} />
                  </a>
                )}
                {contact?.socials?.tiktok && (
                  <a
                    href={contact.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 border border-white/10 text-[#a09888] hover:bg-red-700 hover:text-white hover:border-red-600 transition-all"
                    aria-label="TikTok"
                  >
                    <TikTokIcon size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ── Column 2: Business Hours ── */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.45em] flex items-center gap-3">
              <Clock size={14} className="text-red-700" />
              Studio Hours
            </h4>

            {/* Appointment-only note */}
            <div className="flex items-start gap-2 p-3 border border-red-900/40 bg-red-950/10">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full shrink-0 mt-1.5" />
              <p className="text-red-500/80 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                All sessions by appointment only — no walk-ins accepted.
              </p>
            </div>

            <div className="space-y-3">
              {businessHours?.map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-sm border-b border-white/[0.04] pb-3"
                >
                  <span className={`font-bold ${h.isClosed ? "text-[#3a3530]" : "text-[#8a7f74]"}`}>
                    {h.day}
                  </span>
                  <span
                    className={`font-black uppercase text-xs tracking-wider ${
                      h.isClosed ? "text-red-900" : "text-white"
                    }`}
                  >
                    {h.isClosed ? "Closed" : `${h.open} – ${h.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Column 3: Booking CTA ── */}
          <div
            className="relative p-8 overflow-hidden"
            style={{
              border: "1px solid rgba(220,38,38,0.25)",
              background: "linear-gradient(135deg, rgba(220,38,38,0.06) 0%, transparent 60%)",
            }}
          >
            {/* BG skull watermark */}
            <div className="absolute bottom-4 right-4 opacity-[0.05] pointer-events-none">
              <SkullMotif size={120} className="text-white" />
            </div>

            <div className="relative z-10 space-y-6">
              <SkullMotif size={36} className="text-red-700" />
              <h4 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight">
                Ready to Get Inked?
              </h4>
              <p className="text-[#6b6057] text-sm leading-relaxed">
                Book your private consultation online. Bring your ideas — leave with a design that lasts forever.
              </p>

              <div className="space-y-3">
                <Link to={`/book/${ownerId?._id}`}>
                  <button className="w-full py-5 bg-red-700 hover:bg-red-600 text-white font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-red-900/30">
                    Book Your Session
                  </button>
                </Link>
                <p className="text-center text-[#3a3530] text-[10px] font-bold uppercase tracking-widest">
                  By Appointment Only
                </p>
              </div>

              {/* Micro-trust indicators */}
              <div className="pt-4 border-t border-white/5 space-y-2">
                {trustBadges.map((b) => (
                  <div key={b.label} className="flex items-center gap-2 text-[#6b6057]">
                    <span className="w-1 h-1 bg-red-700 rounded-full shrink-0" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 mx-6 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#3a3530] text-[10px] font-black uppercase tracking-[0.35em]">
            &copy; {new Date().getFullYear()} {ownerId?.businessName || "Ink Atelier"} &bull; All Rights Reserved
          </p>
          <p className="text-[#3a3530] text-[10px] font-black uppercase tracking-[0.35em]">
            Digital Experience by Bookiify
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TattooTheme;
