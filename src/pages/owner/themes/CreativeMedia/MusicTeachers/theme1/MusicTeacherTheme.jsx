import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  Calendar,
  Music,
  Music2,
  Mic2,
  Star,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────
   CUSTOM SVG ICONS
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   DECORATIVE SVG: WAVEFORM
───────────────────────────────────────────── */
const WaveformSVG = ({ className = "" }) => (
  <svg
    viewBox="0 0 200 60"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    {[4, 12, 20, 28, 36, 44, 52, 60, 68, 76, 84, 92, 100, 108, 116, 124, 132, 140, 148, 156, 164, 172, 180, 188, 196].map(
      (x, i) => {
        const heights = [10, 28, 18, 42, 24, 50, 16, 44, 30, 52, 20, 46, 36, 48, 22, 40, 14, 44, 26, 50, 18, 38, 28, 44, 12];
        const h = heights[i] || 20;
        return (
          <rect
            key={x}
            x={x}
            y={(60 - h) / 2}
            width="4"
            height={h}
            rx="2"
            fill="currentColor"
            opacity={0.4 + (i % 3) * 0.2}
          />
        );
      }
    )}
  </svg>
);

/* ─────────────────────────────────────────────
   FLOATING MUSIC NOTE
───────────────────────────────────────────── */
const FloatingNote = ({ style, char }) => (
  <motion.span
    style={style}
    className="absolute text-violet-400/20 text-5xl font-black select-none pointer-events-none"
    animate={{ y: [0, -24, 0], rotate: [-8, 8, -8], opacity: [0.15, 0.35, 0.15] }}
    transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
  >
    {char}
  </motion.span>
);

/* ─────────────────────────────────────────────
   INSTRUMENT LEVEL BADGE
───────────────────────────────────────────── */
const LevelBadge = ({ level }) => {
  const map = {
    beginner: { label: "Beginner", bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
    intermediate: { label: "Intermediate", bg: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
    advanced: { label: "Advanced", bg: "bg-violet-500/10 text-violet-400 border-violet-500/30" },
    "all levels": { label: "All Levels", bg: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
  };
  const cfg = map[(level || "all levels").toLowerCase()] || map["all levels"];
  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${cfg.bg}`}>
      {cfg.label}
    </span>
  );
};

/* ─────────────────────────────────────────────
   LESSON ICON
───────────────────────────────────────────── */
const LessonIcon = ({ title = "" }) => {
  const t = title.toLowerCase();
  if (t.includes("vocal") || t.includes("voice") || t.includes("chant")) return <Mic2 size={22} className="text-violet-400" />;
  if (t.includes("theor") || t.includes("composit")) return <Music2 size={22} className="text-violet-400" />;
  return <Music size={22} className="text-violet-400" />;
};

/* ─────────────────────────────────────────────
   INSTRUMENT TAGS (decorative)
───────────────────────────────────────────── */
const INSTRUMENT_TAGS = ["Guitar", "Piano", "Vocals", "Violin", "Drums", "Bass", "Flute", "Theory", "Online"];

/* ═════════════════════════════════════════════
   MUSIC TEACHER THEME — MAIN COMPONENT
═════════════════════════════════════════════ */
const MusicTeacherTheme = ({ data }) => {
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
    { name: "Lessons", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  /* floating note positions */
  const floatingNotes = [
    { char: "♩", style: { top: "18%", left: "6%" } },
    { char: "♪", style: { top: "30%", left: "88%" } },
    { char: "♫", style: { top: "62%", left: "5%" } },
    { char: "♬", style: { top: "72%", left: "91%" } },
    { char: "𝄞", style: { top: "45%", left: "50%" } },
    { char: "♩", style: { top: "10%", left: "55%" } },
  ];

  return (
    <div className="bg-[#12082e] text-slate-200 font-sans selection:bg-violet-500/30 overflow-x-hidden">

      {/* ─── 1. GLASS NAVBAR ─── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-[#12082e]/90 backdrop-blur-xl border-b border-violet-500/10 shadow-lg shadow-violet-900/20"
            : "py-7 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-800 rounded-xl flex items-center justify-center shadow-lg shadow-violet-700/30">
              <Music size={20} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tight text-white">
              {ownerId?.businessName || "Sound Studio"}
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-violet-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all shadow-lg shadow-violet-700/30 active:scale-95">
                Book a Lesson
              </button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* ─── MOBILE MENU SLIDE-IN ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-0 z-[1001] bg-[#0d0520] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-14">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center">
                  <Music size={18} className="text-white" />
                </div>
                <span className="text-white font-black tracking-tight">
                  {ownerId?.businessName || "Sound Studio"}
                </span>
              </div>
              <X size={30} className="text-white cursor-pointer" onClick={() => setMobileMenuOpen(false)} />
            </div>
            <div className="flex flex-col gap-6 mt-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-black uppercase tracking-tighter text-white border-b border-white/5 pb-5 hover:text-violet-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Link to={`/book/${ownerId?._id}`} onClick={() => setMobileMenuOpen(false)}>
                <button className="mt-8 w-full py-5 bg-violet-600 text-white font-black rounded-xl uppercase tracking-widest text-sm shadow-xl shadow-violet-700/30">
                  Book a Lesson
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 2. FULL-SCREEN HERO ─── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* BG image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              hero.backgroundImage ||
              "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop"
            })`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#12082e]/85 via-[#12082e]/60 to-[#12082e]" />
        </div>

        {/* Violet radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-violet-700/20 blur-[120px] pointer-events-none" />

        {/* Floating musical notes */}
        {floatingNotes.map((n, i) => (
          <FloatingNote key={i} char={n.char} style={n.style} />
        ))}

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 px-5 py-1.5 mb-8 border border-violet-500/40 rounded-full text-violet-400 text-[10px] font-black uppercase tracking-[0.5em] bg-violet-500/5">
            <Music size={12} />
            {data.category || "Music Academy"} &bull; {ownerId?.ville || "Tunisia"}
          </span>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl xl:text-9xl font-black mb-6 text-white leading-[0.88] tracking-tighter uppercase">
            WHERE MUSIC{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-400">
              BECOMES
            </span>{" "}
            MASTERY
          </h1>

          {/* Slogan */}
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
            {hero.slogan ||
              "Professional music instruction for all ages and levels. Private lessons, group classes, and online sessions."}
          </p>

          {/* Instrument tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {INSTRUMENT_TAGS.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-white/5 border border-white/10 text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Trust badges + CTA */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-10">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-12 py-5 bg-violet-600 hover:bg-violet-500 text-white font-black rounded-xl uppercase tracking-[0.2em] text-xs transition-all shadow-2xl shadow-violet-800/50 active:scale-95">
                Book Your First Lesson
              </button>
            </Link>
            <a
              href="#services"
              className="flex items-center gap-2 text-slate-300 font-bold text-sm hover:text-violet-400 transition-colors"
            >
              Explore Lessons <ChevronRight size={16} />
            </a>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
            {["All Ages Welcome", "From Beginner to Pro", "Certified Instructors", "Free Trial Lesson"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Star size={10} className="text-amber-400 fill-amber-400" />
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Waveform decoration bottom */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center opacity-20 pointer-events-none">
          <WaveformSVG className="w-64 h-10 text-violet-400" />
        </div>
      </section>

      {/* ─── 3. SERVICES / LESSONS ─── */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <h2 className="text-[10px] font-black text-violet-400 uppercase tracking-[0.5em] mb-4 flex items-center gap-2">
                <Music size={12} /> Our Programs
              </h2>
              <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase">
                Lesson{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-amber-400">
                  Catalog
                </span>
              </h3>
            </div>
            <p className="text-slate-500 font-medium text-lg border-l-2 border-violet-600 pl-6 mb-1 max-w-xs">
              Tailored instruction for every instrument, every level, every goal.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              .filter((s) => s.active)
              .map((service, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, boxShadow: "0 0 40px 0 rgba(124,58,237,0.25)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative bg-[#1a0f3a] border border-violet-800/30 rounded-2xl p-7 flex flex-col gap-4 cursor-default overflow-hidden"
                >
                  {/* Top border accent */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-600 to-amber-500 rounded-t-2xl" />

                  {/* Icon + title row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-11 h-11 rounded-xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center shrink-0 group-hover:bg-violet-600/25 transition-colors">
                      <LessonIcon title={service.title} />
                    </div>
                    <LevelBadge level={service.level} />
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-black text-white group-hover:text-violet-300 transition-colors leading-tight">
                    {service.title}
                  </h4>

                  {/* Description */}
                  {service.description && (
                    <p className="text-slate-500 text-sm leading-relaxed flex-1">{service.description}</p>
                  )}

                  {/* Footer row: duration + price */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <Clock size={11} className="text-violet-500" />
                      {service.duration || "45 min lesson"}
                    </span>
                    <span className="text-2xl font-black text-white">
                      {service.price}{" "}
                      <small className="text-amber-400 text-xs font-black">TND</small>
                    </span>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* CTA under services */}
          <div className="mt-16 text-center">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-10 py-4 bg-violet-600 hover:bg-violet-500 text-white font-black rounded-xl uppercase tracking-widest text-[11px] transition-all shadow-lg shadow-violet-800/30 active:scale-95">
                Schedule a Lesson
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 4. ABOUT / INSTRUCTOR PROFILE ─── */}
      {about.show && (
        <section id="about" className="py-32 bg-[#0e0628]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Portrait */}
            <div className="relative group overflow-hidden rounded-3xl aspect-[4/5]">
              <img
                src={
                  about.image ||
                  "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop"
                }
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                alt="Music instructor"
              />
              {/* Violet overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/60 via-transparent to-transparent" />
              {/* Credential badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#12082e]/90 backdrop-blur-sm rounded-2xl p-5 border border-violet-500/20">
                <div className="flex items-center gap-3 mb-1">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
                    Certified Instructor
                  </span>
                </div>
                <p className="text-white font-black text-sm">
                  {about.credential || "Berklee College of Music — Master's in Music Education"}
                </p>
              </div>
            </div>

            {/* Text content */}
            <div className="space-y-8">
              <div className="w-16 h-1 bg-gradient-to-r from-violet-600 to-amber-500 rounded-full" />
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.92] uppercase">
                {about.title || "Passion. Precision. Purpose."}
              </h2>

              <p className="text-slate-400 text-xl font-medium italic leading-relaxed border-l-4 border-violet-600 pl-6">
                "{about.text ||
                  "Music is not just a skill — it is a language. My mission is to give every student the tools to speak it fluently and fearlessly."}"
              </p>

              <p className="text-slate-500 leading-relaxed">
                {about.bio ||
                  "With over 15 years of teaching experience and a background spanning classical conservatory training to contemporary production, our instructors bring unmatched depth to every lesson."}
              </p>

              {/* Credential grid */}
              <div className="grid grid-cols-2 gap-6 pt-4">
                {[
                  { label: "Conservatory Trained", desc: "Classical foundation meets modern technique." },
                  { label: "Instruments Mastered", desc: "Piano, Guitar, Violin, Voice & more." },
                  { label: "Teaching Philosophy", desc: "Patient, structured, and student-centered." },
                  { label: "Years of Experience", desc: "15+ years shaping musicians of all levels." },
                ].map((item) => (
                  <div key={item.label}>
                    <h5 className="text-white font-black text-xs uppercase tracking-widest mb-1.5">
                      {item.label}
                    </h5>
                    <p className="text-slate-500 text-sm leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Link to={`/book/${ownerId?._id}`}>
                <button className="mt-4 flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-black rounded-xl uppercase tracking-widest text-[11px] transition-all shadow-lg shadow-violet-800/30 active:scale-95">
                  Start Learning <ChevronRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── 5. GALLERY ─── */}
      {gallery.show && gallery.images?.length > 0 && (
        <section id="gallery" className="py-32 bg-[#12082e]">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-20">
              <h2 className="text-[10px] font-black text-violet-400 uppercase tracking-[0.5em] mb-4">
                Studio Life
              </h2>
              <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
                The{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-400">
                  Gallery
                </span>
              </h3>
            </div>

            {/* Masonry grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.images.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover="hover"
                  className={`group relative overflow-hidden rounded-2xl bg-[#1a0f3a] ${
                    i % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                  style={{ minHeight: i % 5 === 0 ? 360 : 180 }}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={`Music studio ${i + 1}`}
                  />
                  {/* Violet overlay on hover */}
                  <motion.div
                    variants={{ hover: { opacity: 1 } }}
                    initial={{ opacity: 0 }}
                    className="absolute inset-0 bg-violet-700/40 flex items-center justify-center transition-opacity"
                  >
                    <Music size={32} className="text-white" />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Fallback gallery when no real images */}
            {gallery.images.length === 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=2070&auto=format&fit=crop",
                ].map((src, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-2xl aspect-video">
                    <img
                      src={src}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={`Music ${i + 1}`}
                    />
                    <div className="absolute inset-0 bg-violet-700/0 group-hover:bg-violet-700/40 transition-colors flex items-center justify-center">
                      <Music size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─── 6. FOOTER + CONTACT ─── */}
      <footer id="contact" className="pt-32 pb-16 bg-[#0a0520] border-t border-violet-800/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Col 1: Brand + contact + socials */}
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-violet-600 to-purple-900 rounded-xl flex items-center justify-center shadow-lg shadow-violet-700/30">
                <Music size={20} className="text-white" />
              </div>
              <div>
                <h4 className="text-white font-black text-xl tracking-tight">
                  {ownerId?.businessName || "Sound Studio"}
                </h4>
                <p className="text-violet-400 text-[10px] font-bold uppercase tracking-widest">
                  Music Academy
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-violet-400 shrink-0 mt-0.5" />
                <p className="text-slate-400 font-medium">{contact.address || "Main Street, Tunis, Tunisia"}</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={18} className="text-violet-400 shrink-0" />
                <p className="text-white font-black text-lg tracking-wide">{contact.phone}</p>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {contact.socials?.instagram && (
                <a
                  href={contact.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 bg-white/5 rounded-full hover:bg-violet-600 transition-colors text-white"
                >
                  <InstagramIcon size={18} />
                </a>
              )}
              {contact.socials?.facebook && (
                <a
                  href={contact.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 bg-white/5 rounded-full hover:bg-violet-600 transition-colors text-white"
                >
                  <FacebookIcon size={18} />
                </a>
              )}
              {contact.socials?.tiktok && (
                <a
                  href={contact.socials.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 bg-white/5 rounded-full hover:bg-violet-600 transition-colors text-white"
                >
                  <TikTokIcon size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Business Hours */}
          <div className="space-y-8">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.4em] flex items-center gap-2">
              <Clock size={14} className="text-violet-400" /> Studio Hours
            </h4>
            <div className="space-y-3">
              {businessHours.map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-sm border-b border-white/5 pb-2.5"
                >
                  <span className={`font-bold ${h.isClosed ? "text-slate-600" : "text-slate-400"}`}>
                    {h.day}
                  </span>
                  <span
                    className={`font-black uppercase text-xs tracking-wide ${
                      h.isClosed ? "text-rose-500" : "text-white"
                    }`}
                  >
                    {h.isClosed ? "Closed" : `${h.open} – ${h.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Booking CTA */}
          <div className="bg-violet-600/5 border border-violet-500/20 rounded-3xl p-10 space-y-6 flex flex-col">
            <div className="w-12 h-12 bg-violet-600/15 rounded-2xl flex items-center justify-center">
              <Calendar size={24} className="text-violet-400" />
            </div>
            <h4 className="text-2xl font-black text-white tracking-tight leading-snug">
              Book Your First Lesson
            </h4>
            <p className="text-slate-400 font-medium leading-relaxed">
              Your first trial lesson is{" "}
              <span className="text-amber-400 font-black">completely free</span>. No commitment, no pressure — just pure music.
            </p>
            <ul className="space-y-2">
              {["Free Trial Lesson Included", "All Ages & Skill Levels", "In-Person or Online"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-400">
                  <Star size={11} className="text-amber-400 fill-amber-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to={`/book/${ownerId?._id}`} className="mt-auto">
              <button className="w-full py-5 bg-violet-600 hover:bg-violet-500 text-white font-black rounded-xl uppercase tracking-widest text-xs shadow-xl shadow-violet-700/30 transition-all active:scale-95">
                Reserve My Free Lesson
              </button>
            </Link>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-24 pt-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
              &copy; 2026 {ownerId?.businessName || "Sound Studio"} &bull; Powered by Bookiify
            </p>
            <div className="flex items-center gap-2 opacity-40">
              <WaveformSVG className="w-20 h-5 text-violet-400" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MusicTeacherTheme;
