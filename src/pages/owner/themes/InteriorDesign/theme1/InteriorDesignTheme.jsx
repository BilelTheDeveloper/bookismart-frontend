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
  Layers,
  Compass,
  Home,
  Building2,
  Coffee,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────
//  CUSTOM SVG ICONS
// ─────────────────────────────────────────
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

// ─────────────────────────────────────────
//  PORTFOLIO CATEGORY LABELS
// ─────────────────────────────────────────
const portfolioCategories = [
  "Living Room",
  "Kitchen",
  "Bedroom",
  "Office",
  "Dining Room",
  "Bathroom",
  "Open Plan",
  "Outdoor",
];

// ─────────────────────────────────────────
//  FALLBACK IMAGES (Unsplash — interior design)
// ─────────────────────────────────────────
const FALLBACK_HERO =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2100&auto=format&fit=crop";

const FALLBACK_ABOUT =
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1974&auto=format&fit=crop";

const FALLBACK_GALLERY = [
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1958&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=2080&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop",
];

// ─────────────────────────────────────────
//  SERVICE ICONS
// ─────────────────────────────────────────
const serviceIcons = [Compass, Layers, Home, Building2, Coffee, Award];

// ─────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────
/**
 * INTERIOR DESIGN THEME — "STUDIO SPACE"
 * Warm earth tones · Editorial luxury · Masonry gallery hero
 */
const InteriorDesignTheme = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredGallery, setHoveredGallery] = useState(null);

  if (!data) return null;

  const { hero, about, services, gallery, contact, businessHours, ownerId } = data;

  // ── scroll listener ──
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#gallery" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const galleryImages =
    gallery?.images?.length > 0 ? gallery.images : FALLBACK_GALLERY;

  // ── masonry span helper (every 3rd image gets a large col span) ──
  const getMasonryClass = (index) => {
    if (index % 5 === 0) return "md:col-span-2 md:row-span-2";
    if (index % 7 === 0) return "md:col-span-2";
    return "";
  };

  return (
    <div
      className="bg-[#f5f0e8] text-[#1c1917] font-sans selection:bg-orange-700/20 overflow-x-hidden"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* ══════════════════════════════════════════
          1. FIXED GLASS NAVBAR
      ══════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-[#f5f0e8]/90 backdrop-blur-xl border-b border-[#1c1917]/10 shadow-sm"
            : "py-7 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 flex items-center justify-center border-2 border-[#c2410c] text-[#c2410c] font-bold text-sm"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {ownerId?.businessName?.charAt(0) || "S"}
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-base font-bold tracking-widest uppercase text-[#1c1917]"
                style={{ letterSpacing: "0.2em" }}
              >
                {ownerId?.businessName || "Studio Space"}
              </span>
              <span
                className="text-[9px] tracking-[0.35em] uppercase text-[#92400e]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Interior Design
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#1c1917] hover:text-[#c2410c] transition-colors"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-7 py-2.5 bg-[#c2410c] hover:bg-[#a83a0a] text-white text-[10px] font-semibold uppercase tracking-[0.3em] transition-all active:scale-95 shadow-md shadow-[#c2410c]/20">
                Book Consultation
              </button>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-[#1c1917]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          MOBILE MENU — slide from right
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-0 z-[1001] bg-[#f5f0e8] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-14">
              <span
                className="text-xs tracking-[0.4em] uppercase text-[#92400e]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Navigation
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#1c1917]"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col gap-0">
              {navLinks.map((link, i) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center justify-between border-b border-[#1c1917]/10 py-7"
                >
                  <span
                    className="text-4xl font-bold tracking-tight text-[#1c1917] group-hover:text-[#c2410c] transition-colors"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {link.name}
                  </span>
                  <ChevronRight
                    size={20}
                    className="text-[#c2410c] opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>

            <div className="mt-auto pt-10">
              <Link to={`/book/${ownerId?._id}`}>
                <button className="w-full py-5 bg-[#c2410c] text-white text-sm font-semibold uppercase tracking-[0.3em]">
                  Book a Design Consultation
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          2. FULL-SCREEN HERO
      ══════════════════════════════════════════ */}
      <section className="relative h-screen flex items-end pb-24 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${hero?.backgroundImage || FALLBACK_HERO})`,
          }}
        >
          {/* Warm gradient overlay — sand to transparent */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/85 via-[#1c1917]/30 to-[#f5f0e8]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c1917]/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-4xl">
            {/* Atelier badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="h-px w-12 bg-[#c2410c]" />
              <span
                className="text-[10px] tracking-[0.5em] uppercase text-[#f5f0e8]/80"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Design Atelier · {ownerId?.ville || "Tunis"}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-5xl md:text-8xl font-bold text-[#f5f0e8] leading-[0.95] tracking-tight mb-8"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {hero?.title ? (
                hero.title
              ) : (
                <>
                  SPACES THAT{" "}
                  <em className="not-italic text-[#c2410c]">TELL</em>
                  <br />
                  YOUR STORY.
                </>
              )}
            </motion.h1>

            {/* Slogan */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-[#f5f0e8]/70 mb-12 max-w-xl leading-relaxed"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {hero?.slogan ||
                "We transform living spaces into curated environments that reflect who you are — with precision, warmth, and enduring elegance."}
            </motion.p>

            {/* CTAs + portfolio categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
            >
              <Link to={`/book/${ownerId?._id}`}>
                <button className="px-10 py-5 bg-[#c2410c] hover:bg-[#a83a0a] text-white font-semibold text-xs uppercase tracking-[0.3em] transition-all shadow-xl shadow-[#c2410c]/30 active:scale-95">
                  Book a Consultation
                </button>
              </Link>

              {/* Portfolio category pills */}
              <div className="flex items-center gap-3">
                {["Residential", "Commercial", "Hospitality"].map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1.5 border border-[#f5f0e8]/30 text-[#f5f0e8]/60 text-[9px] uppercase tracking-[0.3em]"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative vertical text */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
          <div className="h-24 w-px bg-[#f5f0e8]/20" />
          <span
            className="text-[8px] tracking-[0.6em] text-[#f5f0e8]/40 uppercase"
            style={{
              writingMode: "vertical-rl",
              fontFamily: "Georgia, serif",
            }}
          >
            Portfolio · 2026
          </span>
          <div className="h-24 w-px bg-[#f5f0e8]/20" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. SERVICES SECTION
      ══════════════════════════════════════════ */}
      <section id="services" className="py-32 px-6 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mb-20">
            <div>
              <p
                className="text-[10px] tracking-[0.5em] uppercase text-[#c2410c] mb-5"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Our Expertise
              </p>
              <h2
                className="text-5xl md:text-6xl font-bold text-[#1c1917] leading-[0.95] tracking-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Design
                <br />
                <em className="not-italic text-[#92400e]">Services</em>
              </h2>
            </div>
            <p
              className="text-[#1c1917]/60 leading-relaxed border-l-2 border-[#c2410c] pl-6 text-sm"
              style={{ fontFamily: "Georgia, serif" }}
            >
              From a single room to a complete estate, we offer a full spectrum
              of interior design services — each tailored to your lifestyle,
              vision, and budget.
            </p>
          </div>

          {/* Service cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1c1917]/10">
            {services?.filter((s) => s.active).map((service, idx) => {
              const Icon = serviceIcons[idx % serviceIcons.length];
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4, backgroundColor: "#ede8de" }}
                  transition={{ duration: 0.25 }}
                  className="group bg-[#f5f0e8] p-10 relative overflow-hidden cursor-default"
                >
                  {/* Terracotta left accent */}
                  <div className="absolute left-0 top-0 w-1 h-0 bg-[#c2410c] group-hover:h-full transition-all duration-500" />

                  {/* Icon */}
                  <div className="mb-8 flex items-center justify-between">
                    <Icon
                      size={22}
                      className="text-[#92400e] group-hover:text-[#c2410c] transition-colors"
                    />
                    <span
                      className="text-[10px] tracking-[0.4em] uppercase text-[#1c1917]/30"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold text-[#1c1917] mb-3 group-hover:text-[#c2410c] transition-colors leading-snug"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  {service.description && (
                    <p
                      className="text-sm text-[#1c1917]/60 mb-6 leading-relaxed"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {service.description}
                    </p>
                  )}

                  {/* Duration + Price */}
                  <div className="flex items-end justify-between mt-auto pt-6 border-t border-[#1c1917]/10">
                    {service.duration && (
                      <div className="flex items-center gap-2">
                        <Clock size={12} className="text-[#92400e]" />
                        <span
                          className="text-[10px] text-[#1c1917]/50 uppercase tracking-widest"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {service.duration}
                        </span>
                      </div>
                    )}
                    <div className="text-right">
                      <span
                        className="text-2xl font-bold text-[#1c1917]"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {service.price}
                      </span>
                      <span
                        className="text-xs text-[#c2410c] ml-1 font-semibold"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        TND
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA below services */}
          <div className="mt-14 text-center">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="inline-flex items-center gap-3 px-10 py-4 border-2 border-[#c2410c] text-[#c2410c] hover:bg-[#c2410c] hover:text-white text-[11px] font-semibold uppercase tracking-[0.35em] transition-all">
                Start Your Project
                <ChevronRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. PORTFOLIO / GALLERY — HERO FEATURE
      ══════════════════════════════════════════ */}
      {gallery?.show && (
        <section id="gallery" className="py-32 bg-[#1c1917]">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <p
                  className="text-[10px] tracking-[0.5em] uppercase text-[#c2410c] mb-4"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Selected Work
                </p>
                <h2
                  className="text-5xl md:text-7xl font-bold text-[#f5f0e8] leading-[0.9] tracking-tight"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Our
                  <br />
                  <em className="not-italic text-[#92400e]">Portfolio</em>
                </h2>
              </div>
              <p
                className="text-[#f5f0e8]/40 text-sm max-w-xs leading-relaxed"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Every project is a collaboration between our design vision and
                your personal narrative.
              </p>
            </div>

            {/* Masonry grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-3">
              {galleryImages.map((img, i) => {
                const category =
                  portfolioCategories[i % portfolioCategories.length];
                const spanClass = getMasonryClass(i);
                return (
                  <motion.div
                    key={i}
                    className={`relative overflow-hidden bg-[#2a2522] ${spanClass}`}
                    onHoverStart={() => setHoveredGallery(i)}
                    onHoverEnd={() => setHoveredGallery(null)}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={img}
                      alt={`Interior Design — ${category}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{
                        transform:
                          hoveredGallery === i ? "scale(1.08)" : "scale(1)",
                        transition: "transform 0.7s ease",
                      }}
                    />

                    {/* Overlay on hover */}
                    <AnimatePresence>
                      {hoveredGallery === i && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/90 via-[#1c1917]/30 to-transparent flex flex-col justify-end p-5"
                        >
                          <span
                            className="text-[9px] tracking-[0.45em] uppercase text-[#c2410c] mb-1"
                            style={{ fontFamily: "Georgia, serif" }}
                          >
                            Project Category
                          </span>
                          <span
                            className="text-lg font-bold text-[#f5f0e8]"
                            style={{ fontFamily: "Georgia, serif" }}
                          >
                            {category}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* View all CTA */}
            <div className="mt-12 text-center">
              <Link to={`/book/${ownerId?._id}`}>
                <button className="inline-flex items-center gap-3 text-[#f5f0e8]/60 hover:text-[#c2410c] text-[11px] uppercase tracking-[0.4em] transition-colors font-semibold">
                  Start a New Project
                  <ChevronRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          5. ABOUT — DESIGNER PROFILE
      ══════════════════════════════════════════ */}
      {about?.show && (
        <section id="about" className="py-32 bg-[#ede8de]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left — portrait with bronze frame accent */}
              <div className="relative">
                {/* Bronze frame decoration */}
                <div className="absolute -top-4 -left-4 w-32 h-32 border-2 border-[#92400e]/40 z-0" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-[#92400e]/40 z-0" />

                <div className="relative z-10 overflow-hidden">
                  <img
                    src={about.image || FALLBACK_ABOUT}
                    alt="Interior Designer Portrait"
                    className="w-full aspect-[4/5] object-cover"
                  />
                  {/* Bronze tint overlay */}
                  <div className="absolute inset-0 bg-[#92400e]/8 mix-blend-multiply" />
                </div>

                {/* Floating credential badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-8 -right-6 bg-[#f5f0e8] p-5 shadow-xl hidden md:block"
                >
                  <Award size={18} className="text-[#c2410c] mb-2" />
                  <p
                    className="text-[9px] tracking-[0.3em] uppercase text-[#92400e] mb-0.5"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    NCIDQ Certified
                  </p>
                  <p
                    className="text-xs font-bold text-[#1c1917]"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Interior Designer
                  </p>
                </motion.div>
              </div>

              {/* Right — designer profile copy */}
              <div className="space-y-8">
                {/* Label */}
                <div className="flex items-center gap-3">
                  <div className="h-px w-10 bg-[#c2410c]" />
                  <span
                    className="text-[10px] tracking-[0.5em] uppercase text-[#c2410c]"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    About the Studio
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="text-4xl md:text-5xl font-bold text-[#1c1917] leading-[0.95] tracking-tight"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {about.title || (
                    <>
                      Design That
                      <br />
                      <em className="not-italic text-[#92400e]">Endures.</em>
                    </>
                  )}
                </h2>

                {/* Bio */}
                <p
                  className="text-[#1c1917]/70 leading-relaxed text-[15px]"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {about.text ||
                    "We believe every space holds the potential for beauty, comfort, and meaning. Our studio brings together rigorous design thinking with an intimate understanding of how people live — crafting interiors that are both visually compelling and deeply personal."}
                </p>

                {/* Education + credentials */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="border-l-2 border-[#92400e] pl-5 py-1">
                    <h5
                      className="text-[9px] tracking-[0.4em] uppercase text-[#92400e] mb-2"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Education
                    </h5>
                    <p
                      className="text-sm font-semibold text-[#1c1917]"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      BFA Interior Design
                    </p>
                    <p
                      className="text-xs text-[#1c1917]/50"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      École des Beaux-Arts
                    </p>
                  </div>
                  <div className="border-l-2 border-[#92400e] pl-5 py-1">
                    <h5
                      className="text-[9px] tracking-[0.4em] uppercase text-[#92400e] mb-2"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Certification
                    </h5>
                    <p
                      className="text-sm font-semibold text-[#1c1917]"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      NCIDQ Certified
                    </p>
                    <p
                      className="text-xs text-[#1c1917]/50"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      National Council for Interior Design
                    </p>
                  </div>
                  <div className="border-l-2 border-[#92400e] pl-5 py-1">
                    <h5
                      className="text-[9px] tracking-[0.4em] uppercase text-[#92400e] mb-2"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Signature Style
                    </h5>
                    <p
                      className="text-sm font-semibold text-[#1c1917]"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Warm Minimalism
                    </p>
                    <p
                      className="text-xs text-[#1c1917]/50"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Natural materials · Layered textures
                    </p>
                  </div>
                  <div className="border-l-2 border-[#92400e] pl-5 py-1">
                    <h5
                      className="text-[9px] tracking-[0.4em] uppercase text-[#92400e] mb-2"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Recognition
                    </h5>
                    <p
                      className="text-sm font-semibold text-[#1c1917]"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Elle Décor · AD
                    </p>
                    <p
                      className="text-xs text-[#1c1917]/50"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Featured publications 2022–2025
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <Link to={`/book/${ownerId?._id}`}>
                  <button className="mt-4 inline-flex items-center gap-3 px-8 py-4 bg-[#1c1917] hover:bg-[#c2410c] text-[#f5f0e8] text-[10px] font-semibold uppercase tracking-[0.35em] transition-all">
                    Book a Consultation
                    <ChevronRight size={13} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          6. FOOTER & CONTACT
      ══════════════════════════════════════════ */}
      <footer id="contact" className="bg-[#1c1917] text-[#f5f0e8] pt-28 pb-12 border-t border-[#f5f0e8]/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">

            {/* Col 1 — Brand + contact */}
            <div className="space-y-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 border border-[#c2410c] flex items-center justify-center text-[#c2410c] text-xs font-bold">
                    {ownerId?.businessName?.charAt(0) || "S"}
                  </div>
                  <span
                    className="text-base font-bold uppercase tracking-[0.2em] text-[#f5f0e8]"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {ownerId?.businessName || "Studio Space"}
                  </span>
                </div>
                <p
                  className="text-[9px] tracking-[0.4em] uppercase text-[#92400e] pl-11"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Interior Design Studio
                </p>
              </div>

              <div className="space-y-5">
                {contact?.address && (
                  <div className="flex items-start gap-4">
                    <MapPin
                      size={16}
                      className="text-[#c2410c] shrink-0 mt-0.5"
                    />
                    <p
                      className="text-sm text-[#f5f0e8]/60 leading-relaxed"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {contact.address}
                    </p>
                  </div>
                )}
                {contact?.phone && (
                  <div className="flex items-center gap-4">
                    <Phone size={16} className="text-[#c2410c] shrink-0" />
                    <p
                      className="text-lg font-bold text-[#f5f0e8]"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {contact.phone}
                    </p>
                  </div>
                )}
                {contact?.email && (
                  <div className="flex items-center gap-4">
                    <ChevronRight
                      size={16}
                      className="text-[#c2410c] shrink-0"
                    />
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-[#f5f0e8]/60 hover:text-[#c2410c] transition-colors"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {contact.email}
                    </a>
                  </div>
                )}
              </div>

              {/* Social icons */}
              <div className="flex gap-3">
                {contact?.socials?.instagram && (
                  <a
                    href={contact.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-[#f5f0e8]/15 flex items-center justify-center text-[#f5f0e8]/50 hover:border-[#c2410c] hover:text-[#c2410c] transition-all"
                  >
                    <InstagramIcon size={16} />
                  </a>
                )}
                {contact?.socials?.facebook && (
                  <a
                    href={contact.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-[#f5f0e8]/15 flex items-center justify-center text-[#f5f0e8]/50 hover:border-[#c2410c] hover:text-[#c2410c] transition-all"
                  >
                    <FacebookIcon size={16} />
                  </a>
                )}
                {contact?.socials?.tiktok && (
                  <a
                    href={contact.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-[#f5f0e8]/15 flex items-center justify-center text-[#f5f0e8]/50 hover:border-[#c2410c] hover:text-[#c2410c] transition-all"
                  >
                    <TikTokIcon size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Col 2 — Business Hours */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Clock size={15} className="text-[#c2410c]" />
                <h4
                  className="text-[10px] tracking-[0.45em] uppercase text-[#f5f0e8]/50"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Studio Hours
                </h4>
              </div>

              <div className="space-y-3">
                {businessHours?.map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-xs border-b border-[#f5f0e8]/5 pb-3"
                  >
                    <span
                      className={`font-medium ${h.isClosed ? "text-[#f5f0e8]/25" : "text-[#f5f0e8]/55"}`}
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {h.day}
                    </span>
                    <span
                      className={`font-bold tracking-widest ${h.isClosed ? "text-[#c2410c]/60" : "text-[#f5f0e8]"}`}
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {h.isClosed ? "Closed" : `${h.open} – ${h.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 3 — Booking CTA card */}
            <div className="border border-[#c2410c]/25 bg-[#c2410c]/5 p-10 flex flex-col justify-between gap-8">
              <div>
                <Calendar size={28} className="text-[#c2410c] mb-6" />
                <h4
                  className="text-2xl font-bold text-[#f5f0e8] mb-3 leading-snug"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Book a Design
                  <br />
                  Consultation
                </h4>
                <p
                  className="text-sm text-[#f5f0e8]/50 leading-relaxed"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Your transformation begins with a conversation. Schedule your
                  complimentary discovery session today.
                </p>
              </div>
              <Link to={`/book/${ownerId?._id}`}>
                <button className="w-full py-5 bg-[#c2410c] hover:bg-[#a83a0a] text-white text-[11px] font-semibold uppercase tracking-[0.35em] transition-all shadow-lg shadow-[#c2410c]/20 active:scale-[0.98]">
                  Reserve Your Session
                </button>
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#f5f0e8]/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className="text-[9px] tracking-[0.4em] uppercase text-[#f5f0e8]/25"
              style={{ fontFamily: "Georgia, serif" }}
            >
              &copy; 2026{" "}
              {ownerId?.businessName || "Studio Space"} · All rights reserved
            </p>
            <p
              className="text-[9px] tracking-[0.3em] uppercase text-[#f5f0e8]/20"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Digital Experience by{" "}
              <span className="text-[#c2410c]/60">Bookiify</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InteriorDesignTheme;
