import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  ChevronRight,
  Calendar,
  BookOpen,
  Star,
  Award,
  Users,
  TrendingUp,
  CheckCircle,
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

/**
 * LEVEL BADGE COMPONENT
 */
const LevelBadge = ({ level }) => {
  const map = {
    Beginner: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Intermediate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    Advanced: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  };
  const cls = map[level] || "bg-violet-500/20 text-violet-300 border-violet-500/30";
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${cls}`}>
      {level || "All Levels"}
    </span>
  );
};

/**
 * SUBJECT BADGES — displayed in hero
 */
const SUBJECTS = ["Mathematics", "Sciences", "Languages", "Literature", "History", "Exam Prep"];

/**
 * STAT CARD
 */
const StatCard = ({ value, label, icon: Icon }) => (
  <div className="flex flex-col items-center gap-1 px-6 py-4 bg-white/5 border border-amber-400/10 rounded-2xl backdrop-blur-sm">
    <Icon size={20} className="text-amber-400 mb-1" />
    <span className="text-2xl font-black text-white">{value}</span>
    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
  </div>
);

/**
 * COACHING & TUTORS THEME — MENTOR SPACE EDITION
 * Deep purple authority × gold success signals × clean scholarly design
 */
const CoachingTutorsTheme = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!data) return null;

  const { hero, about, services, gallery, contact, businessHours, ownerId } = data;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Programs", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const galleryImages = (gallery?.images || []).filter(Boolean);

  const fallbackGallery = [
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1132&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1032&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1172&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543269664-647163eb34c9?q=80&w=1170&auto=format&fit=crop",
  ];

  const displayGallery = galleryImages.length > 0 ? galleryImages : fallbackGallery;

  return (
    <div
      className="bg-[#1e1b4b] text-[#e5e7eb] font-sans selection:bg-amber-400/30 overflow-x-hidden"
      style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. GLASS NAVBAR
      ───────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-[#1e1b4b]/90 backdrop-blur-xl border-b border-amber-400/10 shadow-lg shadow-black/20"
            : "py-7 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center shadow-lg shadow-amber-400/30">
              <BookOpen size={20} className="text-indigo-950" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-black tracking-tight text-white uppercase">
                {ownerId?.businessName || "Mentor Space"}
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-amber-400/80">
                {ownerId?.ville || "Academy"}
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-amber-400 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-indigo-950 text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-200 active:scale-95 shadow-md shadow-amber-400/20">
                Book Session
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE MENU — Slide from right
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[1001] bg-[#12103a] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-400 rounded-xl flex items-center justify-center">
                  <BookOpen size={18} className="text-indigo-950" strokeWidth={2.5} />
                </div>
                <span className="font-black text-white uppercase tracking-tight">
                  {ownerId?.businessName || "Mentor Space"}
                </span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white">
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-black uppercase tracking-tighter text-white border-b border-white/10 pb-5 pt-3 hover:text-amber-400 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto">
              <Link to={`/book/${ownerId?._id}`} onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-5 bg-amber-400 text-indigo-950 font-black rounded-2xl uppercase tracking-widest text-sm shadow-xl shadow-amber-400/20">
                  Book a Session
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO — Full Screen
      ───────────────────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              hero?.backgroundImage ||
              "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop"
            })`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b]/95 via-[#1e1b4b]/70 to-[#1e1b4b]" />
          {/* Purple tint overlay */}
          <div className="absolute inset-0 bg-indigo-900/30 mix-blend-multiply" />
        </div>

        {/* Decorative ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          {/* Category pill */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-5 py-1.5 mb-8 border border-amber-400/40 rounded-full text-amber-400 text-[10px] font-black uppercase tracking-[0.5em] bg-amber-400/5 backdrop-blur-sm"
          >
            {data.category || "Coaching & Tutors"} • {ownerId?.ville || "Tunisia"}
          </motion.span>

          {/* Hero Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-[7rem] font-black mb-6 tracking-tighter text-white leading-[0.88]">
            {hero?.title || "Unlock Your Potential"}
          </h1>

          {/* Slogan */}
          <p className="text-lg md:text-xl text-slate-300 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            {hero?.slogan ||
              "Personalized tutoring sessions engineered for academic excellence and real results."}
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <StatCard value="500+" label="Students Passed" icon={Users} />
            <StatCard value="98%" label="Success Rate" icon={TrendingUp} />
            <StatCard value="10+" label="Expert Tutors" icon={Award} />
          </div>

          {/* Subject Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {SUBJECTS.map((sub) => (
              <span
                key={sub}
                className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold text-slate-300 hover:border-amber-400/50 hover:text-amber-400 transition-colors cursor-default backdrop-blur-sm"
              >
                {sub}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="w-full sm:w-auto px-12 py-5 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-black rounded-2xl uppercase tracking-[0.2em] text-xs transition-all duration-200 shadow-2xl shadow-amber-400/25 active:scale-95">
                Book a Session
              </button>
            </Link>
            {contact?.phone && (
              <div className="flex items-center gap-3 text-slate-300">
                <div className="p-2 rounded-full border border-amber-400/30 bg-amber-400/5">
                  <Phone size={16} className="text-amber-400" />
                </div>
                <span className="font-bold tracking-widest">{contact.phone}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-[9px] font-black uppercase tracking-[0.4em]">Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 border-2 border-slate-600 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-amber-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. PROGRAMS / SERVICES SECTION
      ───────────────────────────────────────────────────────────── */}
      <section id="services" className="py-32 px-6 bg-[#1a1740]">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-amber-400 uppercase tracking-[0.5em] mb-4">
                Our Programs
              </h2>
              <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                Choose Your <br />
                <span className="text-amber-400">Learning Path</span>
              </h3>
            </div>
            <p className="text-slate-400 font-medium text-base border-l-4 border-amber-400 pl-5 max-w-xs leading-relaxed">
              Every session is tailored to your learning style, pace, and academic goals.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {(services || [])
              .filter((s) => s?.active !== false)
              .map((service, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="group relative bg-white/[0.04] border border-white/10 hover:border-amber-400/40 rounded-3xl p-7 flex flex-col gap-5 transition-colors duration-300 overflow-hidden"
                >
                  {/* Gold left accent bar */}
                  <div className="absolute left-0 top-6 bottom-6 w-1 bg-amber-400 rounded-r-full opacity-80" />

                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4 pl-4">
                    <div>
                      <h4 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors leading-tight mb-2">
                        {service.title}
                      </h4>
                      <LevelBadge level={service.level} />
                    </div>
                    <div className="shrink-0 w-12 h-12 bg-amber-400/10 border border-amber-400/20 rounded-2xl flex items-center justify-center group-hover:bg-amber-400/20 transition-colors">
                      <BookOpen size={22} className="text-amber-400" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed pl-4 flex-1">
                    {service.description || "Tailored one-on-one sessions designed to fast-track your academic progress."}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 pl-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock size={13} className="text-amber-400/70" />
                      <span className="text-xs font-semibold">
                        {service.duration || "60 min"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-white">
                        {service.price}
                      </span>
                      <span className="text-amber-400 text-xs font-black ml-1">TND</span>
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-3xl bg-amber-400/0 group-hover:bg-amber-400/[0.03] transition-colors duration-300 pointer-events-none" />
                </motion.div>
              ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="inline-flex items-center gap-3 px-10 py-4 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-black rounded-2xl uppercase tracking-widest text-xs transition-all duration-200 shadow-xl shadow-amber-400/20 active:scale-95">
                <Calendar size={16} />
                Reserve Your Spot
                <ChevronRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. ABOUT / EDUCATOR SECTION — Conditional
      ───────────────────────────────────────────────────────────── */}
      {about?.show && (
        <section id="about" className="py-32 bg-[#1e1b4b]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Photo column */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src={
                    about.image ||
                    "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1170&auto=format&fit=crop"
                  }
                  className="w-full h-[520px] object-cover group-hover:scale-105 transition-transform duration-1000"
                  alt="Educator"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b]/80 via-transparent to-transparent" />
              </div>

              {/* Credentials floating badge */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="absolute -right-6 top-10 bg-[#12103a] border border-amber-400/30 rounded-2xl p-5 shadow-2xl max-w-[180px]"
              >
                <Award size={24} className="text-amber-400 mb-2" />
                <p className="text-white font-black text-sm leading-tight">Certified Educator</p>
                <p className="text-slate-400 text-xs mt-1">12+ Years Experience</p>
              </motion.div>

              {/* Success badge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="absolute -left-6 bottom-10 bg-amber-400 rounded-2xl p-5 shadow-2xl"
              >
                <TrendingUp size={24} className="text-indigo-950 mb-2" />
                <p className="text-indigo-950 font-black text-sm leading-tight">98% Success</p>
                <p className="text-indigo-950/70 text-xs mt-1">Student Pass Rate</p>
              </motion.div>
            </div>

            {/* Text column */}
            <div className="space-y-8">
              <div className="w-16 h-1 bg-amber-400 rounded-full" />
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]">
                {about.title || "Why Learn With Us?"}
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg font-medium">
                {about.text ||
                  "We believe every student has untapped potential waiting to be unlocked. Our methodology combines proven academic frameworks with personalized coaching to deliver measurable, lasting results."}
              </p>

              {/* Qualifications grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
                {[
                  { title: "Personalized Plans", desc: "Every learning roadmap is crafted around your specific needs and goals." },
                  { title: "Expert Tutors", desc: "All educators hold advanced degrees in their subject specializations." },
                  { title: "Proven Methodology", desc: "Scientifically-backed teaching techniques adapted to each learner." },
                  { title: "Ongoing Tracking", desc: "Regular progress reports to keep you and your family informed." },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-5 bg-white/[0.04] border border-white/5 rounded-2xl hover:border-amber-400/20 transition-colors"
                  >
                    <CheckCircle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-white font-black text-sm mb-1">{item.title}</h5>
                      <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Achievement stats */}
              <div className="flex flex-wrap gap-6 pt-4 border-t border-white/5">
                {[
                  { value: "500+", label: "Students Mentored" },
                  { value: "15+", label: "Subjects Covered" },
                  { value: "4.9★", label: "Average Rating" },
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-3xl font-black text-amber-400">{stat.value}</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. GALLERY SECTION — Conditional, Masonry-style grid
      ───────────────────────────────────────────────────────────── */}
      {gallery?.show && displayGallery.length > 0 && (
        <section id="gallery" className="py-32 bg-[#12103a]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-[10px] font-black text-amber-400 uppercase tracking-[0.5em] mb-4">
                Learning Environment
              </h2>
              <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                Our Space
              </h3>
            </div>

            {/* Masonry-style grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {displayGallery.slice(0, 6).map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`relative overflow-hidden rounded-2xl bg-indigo-950 group ${
                    i === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                  style={{ minHeight: i === 0 ? "380px" : "180px" }}
                >
                  <img
                    src={img}
                    alt={`Learning environment ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    style={{ height: i === 0 ? "380px" : "180px" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          6. FOOTER — Deep dark purple with gold accents
      ───────────────────────────────────────────────────────────── */}
      <footer id="contact" className="pt-24 pb-12 bg-[#0d0b2e] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-14">

          {/* Column 1 — Brand + contact */}
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center shadow-lg shadow-amber-400/20">
                <BookOpen size={22} className="text-indigo-950" strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="text-xl font-black text-white uppercase tracking-tight">
                  {ownerId?.businessName || "Mentor Space"}
                </h4>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400/80">
                  Premium Tutoring Academy
                </p>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Elite academic coaching for students who refuse to settle for average.
            </p>

            {/* Contact details */}
            <div className="space-y-4">
              {contact?.address && (
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-slate-300 text-sm font-medium">{contact.address}</p>
                </div>
              )}
              {contact?.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-amber-400 shrink-0" />
                  <p className="text-white font-black text-lg">{contact.phone}</p>
                </div>
              )}
              {contact?.email && (
                <div className="flex items-center gap-3">
                  <Star size={16} className="text-amber-400 shrink-0" />
                  <p className="text-slate-300 text-sm">{contact.email}</p>
                </div>
              )}
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {contact?.socials?.instagram && (
                <a
                  href={contact.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-amber-400 hover:border-amber-400 hover:text-indigo-950 transition-all duration-200 text-slate-300"
                >
                  <InstagramIcon size={18} />
                </a>
              )}
              {contact?.socials?.facebook && (
                <a
                  href={contact.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-amber-400 hover:border-amber-400 hover:text-indigo-950 transition-all duration-200 text-slate-300"
                >
                  <FacebookIcon size={18} />
                </a>
              )}
              {contact?.socials?.tiktok && (
                <a
                  href={contact.socials.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-amber-400 hover:border-amber-400 hover:text-indigo-950 transition-all duration-200 text-slate-300"
                >
                  <TikTokIcon size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Column 2 — Business Hours */}
          <div className="space-y-8">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.4em] flex items-center gap-3">
              <Clock size={15} className="text-amber-400" />
              Session Hours
            </h4>
            <div className="space-y-3">
              {(businessHours || []).map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b border-white/5 pb-3"
                >
                  <span
                    className={`text-sm font-semibold ${
                      h.isClosed ? "text-slate-600" : "text-slate-300"
                    }`}
                  >
                    {h.day}
                  </span>
                  {h.isClosed ? (
                    <span className="text-xs font-black uppercase tracking-wider text-rose-500">
                      Closed
                    </span>
                  ) : (
                    <span className="text-xs font-black text-amber-400">
                      {h.open} – {h.close}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 — Booking CTA box */}
          <div className="bg-gradient-to-br from-amber-400/10 to-amber-400/5 border border-amber-400/25 p-8 rounded-3xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-amber-400/20 border border-amber-400/30 rounded-2xl flex items-center justify-center">
                <Calendar size={22} className="text-amber-400" />
              </div>
              <h4 className="text-2xl font-black text-white leading-tight">
                Ready to Excel?
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Book your first session in under 60 seconds. No commitment required — your potential is waiting.
              </p>

              {/* Mini trust signals */}
              <div className="space-y-2 pt-2">
                {[
                  "Free initial assessment",
                  "Flexible scheduling",
                  "Cancel anytime",
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle size={13} className="text-amber-400 shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <Link to={`/book/${ownerId?._id}`}>
              <button className="w-full py-5 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-black rounded-2xl uppercase tracking-widest text-xs transition-all duration-200 shadow-xl shadow-amber-400/20 active:scale-95">
                Book Your Session
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-white/5 max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
            &copy; 2026 {ownerId?.businessName || "Mentor Space"} • All Rights Reserved
          </p>
          <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.3em]">
            Powered by Bookiify
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CoachingTutorsTheme;
