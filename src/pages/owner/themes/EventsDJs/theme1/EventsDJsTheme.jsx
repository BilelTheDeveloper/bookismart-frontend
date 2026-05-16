import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  Calendar,
  Music,
  Zap,
  Users,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * CUSTOM SVG ICONS
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

/**
 * Waveform SVG decoration
 */
const WaveformSVG = () => (
  <svg
    viewBox="0 0 200 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-48 h-10 opacity-60"
  >
    {[4, 10, 18, 28, 36, 44, 52, 60, 68, 76, 84, 92, 100, 108, 116, 124, 132, 140, 148, 156, 164, 172, 180, 188, 196].map(
      (x, i) => {
        const heights = [8, 20, 32, 16, 38, 12, 30, 22, 36, 10, 28, 34, 40, 26, 14, 32, 18, 38, 8, 22, 36, 16, 28, 12, 6];
        const h = heights[i] || 10;
        return (
          <rect
            key={x}
            x={x}
            y={(40 - h) / 2}
            width="3"
            height={h}
            rx="1.5"
            fill="url(#waveGrad)"
          />
        );
      }
    )}
    <defs>
      <linearGradient id="waveGrad" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * 🎧 EVENTS & DJs THEME — "NIGHT PULSE" ULTRA EDITION
 */
const EventsDJsTheme = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGenre, setActiveGenre] = useState(0);

  if (!data) return null;

  const { hero, about, services, gallery, contact, businessHours, ownerId } = data;
  const images = (gallery?.images || []).filter(Boolean);

  const genres = about?.genres || ["House", "Techno", "Hip-Hop", "R&B", "Afrobeats"];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGenre((prev) => (prev + 1) % genres.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [genres.length]);

  const navLinks = [
    { name: "Packages", href: "#packages" },
    { name: "Bio", href: "#bio" },
    { name: "Gallery", href: "#gallery" },
    { name: "Booking", href: "#booking" },
  ];

  const fallbackHero =
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop";
  const fallbackAbout =
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop";
  const fallbackGallery = [
    "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?q=80&w=2070&auto=format&fit=crop",
  ];

  const displayImages = images.length > 0 ? images : fallbackGallery;

  const stats = [
    { label: "Events Hosted", value: "500+", icon: <Zap size={18} /> },
    { label: "Crowd Reached", value: "200K+", icon: <Users size={18} /> },
    { label: "Years of Experience", value: "10+", icon: <Star size={18} /> },
  ];

  return (
    <div
      className="bg-black text-white font-sans overflow-x-hidden selection:bg-pink-500/30"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ────────────────────────────────────────────────
          1. GLASS NAVBAR
      ──────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-black/85 backdrop-blur-2xl border-b border-pink-500/10"
            : "py-7 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg"
              style={{
                background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                boxShadow: "0 0 18px rgba(236,72,153,0.55)",
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.18, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border-2 border-pink-400/50"
              />
              {ownerId?.businessName?.charAt(0) || "D"}
            </div>
            <span
              className="text-xl font-black tracking-tight uppercase"
              style={{
                background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {ownerId?.businessName || "Night Pulse"}
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 hover:text-pink-400 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button
                className="px-6 py-2.5 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                  boxShadow: "0 0 16px rgba(236,72,153,0.4)",
                }}
              >
                Book Now
              </button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* dark backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* slide panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="fixed top-0 right-0 h-full w-80 z-[1001] bg-[#0a0a0a] border-l border-pink-500/15 p-8 flex flex-col"
            >
              <div className="flex justify-end mb-14">
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X size={30} className="text-white/70 hover:text-white" />
                </button>
              </div>
              <div className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-black uppercase tracking-tight text-white border-b border-white/5 pb-4 hover:text-pink-400 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <Link
                to={`/book/${ownerId?._id}`}
                className="mt-auto"
                onClick={() => setMobileMenuOpen(false)}
              >
                <button
                  className="w-full py-5 rounded-2xl text-white font-black text-xs uppercase tracking-widest"
                  style={{
                    background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                    boxShadow: "0 0 20px rgba(236,72,153,0.35)",
                  }}
                >
                  Book an Event
                </button>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ────────────────────────────────────────────────
          2. HERO SECTION
      ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${hero?.backgroundImage || fallbackHero})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black" />
          {/* Pink/purple glow blobs */}
          <div
            className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(236,72,153,0.18) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 mb-10 rounded-full border border-pink-500/30 bg-pink-500/8 text-pink-300 text-[10px] font-black uppercase tracking-[0.5em]"
          >
            <Music size={12} />
            {data?.category || "Events & Entertainment"} • {ownerId?.ville || "Tunisia"}
          </motion.div>

          {/* Waveform */}
          <div className="flex justify-center mb-6">
            <WaveformSVG />
          </div>

          {/* Main headline */}
          <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black uppercase tracking-tighter leading-[0.88] text-white mb-8">
            {hero?.title || (
              <>
                THE NIGHT
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  IS YOURS
                </span>
              </>
            )}
          </h1>

          <p className="text-lg md:text-xl text-white/60 font-medium mb-14 max-w-2xl mx-auto leading-relaxed">
            {hero?.slogan ||
              "Elite DJ sets. Immersive event production. Unforgettable energy from first beat to last drop."}
          </p>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20">
            <Link to={`/book/${ownerId?._id}`}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-12 py-5 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-xs transition-all"
                style={{
                  background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                  boxShadow: "0 0 30px rgba(236,72,153,0.5)",
                }}
              >
                Book Your Event
              </motion.button>
            </Link>
            {contact?.phone && (
              <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-white/50 hover:text-white transition-colors">
                <Phone size={16} className="text-pink-400" />
                <span className="font-bold tracking-widest text-sm">{contact.phone}</span>
              </a>
            )}
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="text-center px-4 py-5 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm"
              >
                <div className="flex justify-center mb-2 text-pink-400">{stat.icon}</div>
                <div
                  className="text-3xl font-black mb-1"
                  style={{
                    background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <div className="w-px h-10 bg-gradient-to-b from-pink-500 to-transparent" />
        </motion.div>
      </section>

      {/* ────────────────────────────────────────────────
          3. PACKAGES / SERVICES SECTION
      ──────────────────────────────────────────────── */}
      <section id="packages" className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-20">
            <p
              className="text-[10px] font-black uppercase tracking-[0.5em] mb-4"
              style={{ color: "#ec4899" }}
            >
              What We Offer
            </p>
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                Event Packages
              </h2>
              <p className="text-white/40 font-medium text-base border-l-2 border-pink-500 pl-5 mb-1 max-w-xs">
                Every package is tailored to your event's vibe and vision.
              </p>
            </div>
          </div>

          {/* Package Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(services || [])
              .filter((s) => s?.active !== false)
              .map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 0 32px rgba(236,72,153,0.35)",
                  }}
                  className="relative rounded-3xl border border-white/8 bg-[#0c0c0c] p-8 flex flex-col gap-5 transition-all duration-300 cursor-default overflow-hidden group"
                >
                  {/* Top glow accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(90deg, transparent, #ec4899, #8b5cf6, transparent)",
                    }}
                  />

                  {/* Package index */}
                  <span
                    className="text-[10px] font-black uppercase tracking-[0.4em]"
                    style={{ color: "#ec4899" }}
                  >
                    Package {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-white group-hover:text-pink-300 transition-colors uppercase tracking-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>

                  {/* Duration badge */}
                  {service.duration && (
                    <div className="flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-wider">
                      <Clock size={13} />
                      {service.duration}
                    </div>
                  )}

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/6">
                    <div>
                      <span className="text-3xl font-black text-white">{service.price}</span>
                      <span className="text-pink-400 text-xs font-black ml-1">TND</span>
                    </div>
                    <Link to={`/book/${ownerId?._id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-2.5 rounded-xl text-white text-[10px] font-black uppercase tracking-widest"
                        style={{
                          background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                          boxShadow: "0 0 14px rgba(236,72,153,0.3)",
                        }}
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

      {/* ────────────────────────────────────────────────
          4. ABOUT / DJ BIO SECTION
      ──────────────────────────────────────────────── */}
      {about?.show && (
        <section id="bio" className="py-32 bg-[#050505]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Artist photo */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-3xl"
              style={{ minHeight: "520px" }}
            >
              <img
                src={about.image || fallbackAbout}
                alt={about.title || "Artist"}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 min-h-[520px]"
                style={{ objectPosition: "top center" }}
              />
              {/* Pink gradient overlay */}
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background:
                    "linear-gradient(to top, rgba(236,72,153,0.6) 0%, rgba(139,92,246,0.3) 40%, transparent 80%)",
                }}
              />
              {/* Stage name overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-pink-300 mb-2 block">
                  Artist
                </span>
                <h3 className="text-4xl font-black text-white uppercase tracking-tighter">
                  {about.title || "DJ Night Pulse"}
                </h3>
              </div>
            </motion.div>

            {/* Bio content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div
                className="w-14 h-1 rounded-full"
                style={{ background: "linear-gradient(90deg, #ec4899, #8b5cf6)" }}
              />
              <p
                className="text-[10px] font-black uppercase tracking-[0.5em]"
                style={{ color: "#ec4899" }}
              >
                Artist Bio
              </p>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                {about.subtitle || "Feels the Beat. Commands the Room."}
              </h2>
              <p className="text-white/50 leading-relaxed text-lg font-medium italic border-l-2 border-pink-500/40 pl-5">
                "{about.text ||
                  "With over a decade on the decks, we turn every event into an unforgettable journey. From intimate private parties to massive festival stages — the energy never stops."}"
              </p>

              {/* Genre tags */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-white/30 mb-4">
                  Genres
                </p>
                <div className="flex flex-wrap gap-3">
                  {genres.map((genre, i) => (
                    <motion.span
                      key={genre}
                      animate={{
                        borderColor: i === activeGenre ? "#ec4899" : "rgba(255,255,255,0.1)",
                        color: i === activeGenre ? "#ec4899" : "rgba(255,255,255,0.4)",
                        boxShadow:
                          i === activeGenre
                            ? "0 0 12px rgba(236,72,153,0.4)"
                            : "none",
                      }}
                      transition={{ duration: 0.4 }}
                      className="px-4 py-2 rounded-full border text-xs font-black uppercase tracking-widest cursor-default"
                    >
                      {genre}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Booking stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="text-center p-4 rounded-2xl border border-white/6 bg-white/2"
                  >
                    <div
                      className="text-2xl font-black mb-1"
                      style={{
                        background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-white/30">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <Link to={`/book/${ownerId?._id}`}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-4 px-10 py-4 rounded-2xl text-white font-black text-xs uppercase tracking-widest"
                  style={{
                    background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                    boxShadow: "0 0 24px rgba(236,72,153,0.4)",
                  }}
                >
                  Book This Artist
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────
          5. GALLERY SECTION
      ──────────────────────────────────────────────── */}
      {gallery?.show && displayImages.length > 0 && (
        <section id="gallery" className="py-32 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-20">
              <p
                className="text-[10px] font-black uppercase tracking-[0.5em] mb-4"
                style={{ color: "#ec4899" }}
              >
                The Experience
              </p>
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
                Event Gallery
              </h2>
            </div>

            {/* Masonry-style dark grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {displayImages.map((img, i) => {
                const isLarge = i === 0 || i === 4;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className={`relative overflow-hidden rounded-2xl bg-zinc-900 group ${
                      isLarge ? "md:col-span-2 md:row-span-2" : ""
                    }`}
                    style={{ minHeight: isLarge ? "380px" : "200px" }}
                  >
                    <img
                      src={img}
                      alt={`Event ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      style={{ minHeight: isLarge ? "380px" : "200px" }}
                    />
                    {/* Pink tint overlay on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(236,72,153,0.3) 0%, rgba(139,92,246,0.2) 100%)",
                      }}
                    />
                    {/* Glow border on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        boxShadow: "inset 0 0 0 1px rgba(236,72,153,0.5)",
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────
          6. FOOTER & CONTACT
      ──────────────────────────────────────────────── */}
      <footer
        id="booking"
        className="pt-20 pb-12 bg-[#040404]"
        style={{
          borderTop: "1px solid transparent",
          borderImageSource: "linear-gradient(90deg, transparent, #ec4899, #8b5cf6, transparent)",
          borderImageSlice: 1,
        }}
      >
        {/* Neon top gradient line fallback */}
        <div
          className="w-full h-px mb-20"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #ec4899 30%, #8b5cf6 70%, transparent 100%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
          {/* Brand + Contact + Socials */}
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-black text-xl text-white"
                style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
              >
                {ownerId?.businessName?.charAt(0) || "D"}
              </div>
              <div>
                <h4
                  className="text-lg font-black uppercase tracking-tight"
                  style={{
                    background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {ownerId?.businessName || "Night Pulse"}
                </h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                  Bookiify Verified
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {contact?.address && (
                <div className="flex items-start gap-4">
                  <MapPin size={16} className="text-pink-400 shrink-0 mt-0.5" />
                  <p className="text-white/50 font-medium text-sm">{contact.address}</p>
                </div>
              )}
              {contact?.phone && (
                <div className="flex items-center gap-4">
                  <Phone size={16} className="text-pink-400 shrink-0" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-xl font-black text-white hover:text-pink-400 transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {contact?.socials?.instagram && (
                <a
                  href={contact.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full border border-white/10 text-white/50 hover:text-pink-400 hover:border-pink-500/50 transition-all duration-300"
                  style={{
                    ["--hover-shadow" as string]: "0 0 14px rgba(236,72,153,0.4)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 0 14px rgba(236,72,153,0.4)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.boxShadow = "none")
                  }
                >
                  <InstagramIcon size={18} />
                </a>
              )}
              {contact?.socials?.facebook && (
                <a
                  href={contact.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full border border-white/10 text-white/50 hover:text-violet-400 hover:border-violet-500/50 transition-all duration-300"
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 0 14px rgba(139,92,246,0.4)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.boxShadow = "none")
                  }
                >
                  <FacebookIcon size={18} />
                </a>
              )}
              {contact?.socials?.tiktok && (
                <a
                  href={contact.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full border border-white/10 text-white/50 hover:text-pink-400 hover:border-pink-500/50 transition-all duration-300"
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 0 14px rgba(236,72,153,0.4)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.boxShadow = "none")
                  }
                >
                  <TikTokIcon size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-8">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.4em] flex items-center gap-3">
              <Clock size={15} className="text-pink-400" />
              Availability
            </h4>
            <div className="space-y-3">
              {(businessHours || []).map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-sm border-b border-white/4 pb-2.5"
                >
                  <span
                    className={`font-bold ${
                      h.isClosed ? "text-white/20" : "text-white/50"
                    }`}
                  >
                    {h.day}
                  </span>
                  <span
                    className={`font-black text-xs uppercase tracking-wider ${
                      h.isClosed ? "text-rose-500/70" : "text-white"
                    }`}
                  >
                    {h.isClosed ? "Unavailable" : `${h.open} – ${h.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Booking CTA Card */}
          <div
            className="rounded-3xl p-8 space-y-6 flex flex-col"
            style={{
              background: "linear-gradient(135deg, rgba(236,72,153,0.08) 0%, rgba(139,92,246,0.08) 100%)",
              border: "1px solid rgba(236,72,153,0.2)",
            }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-fit"
            >
              <Calendar size={40} className="text-pink-400" />
            </motion.div>
            <h4 className="text-2xl font-black text-white uppercase tracking-tighter">
              Ready to light up your night?
            </h4>
            <p className="text-white/40 font-medium text-sm leading-relaxed flex-1">
              Reserve your date now. Our team will confirm within 24 hours and start crafting your perfect event experience.
            </p>
            <Link to={`/book/${ownerId?._id}`}>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 32px rgba(236,72,153,0.6)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs transition-all"
                style={{
                  background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                  boxShadow: "0 0 20px rgba(236,72,153,0.35)",
                }}
              >
                Book Your Event Now
              </motion.button>
            </Link>
            {contact?.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="text-center text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-pink-400 transition-colors"
              >
                Or call us: {contact.phone}
              </a>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()}{" "}
            {ownerId?.businessName || "Night Pulse"} • All Rights Reserved
          </p>
          <p className="text-white/15 text-[10px] font-black uppercase tracking-[0.3em]">
            Digital Experience by{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Bookiify
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EventsDJsTheme;
