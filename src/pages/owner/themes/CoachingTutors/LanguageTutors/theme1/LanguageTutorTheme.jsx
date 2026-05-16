import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  ChevronRight,
  Calendar,
  Globe,
  BookOpen,
  Award,
  Users,
  Star,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────
   CUSTOM SVG ICONS
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   DECORATIVE WORLD-DOTS SVG BACKGROUND
───────────────────────────────────────── */
const WorldDotsBg = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none"
    viewBox="0 0 800 500"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    {Array.from({ length: 120 }).map((_, i) => (
      <circle
        key={i}
        cx={(i % 20) * 42 + 10}
        cy={Math.floor(i / 20) * 85 + 10}
        r="2"
        fill="#2563eb"
      />
    ))}
  </svg>
);

/* ─────────────────────────────────────────
   LEVEL BADGE
───────────────────────────────────────── */
const LevelBadge = ({ level }) => {
  const colors = {
    A1: "bg-emerald-100 text-emerald-700",
    A2: "bg-emerald-100 text-emerald-700",
    B1: "bg-blue-100 text-blue-700",
    B2: "bg-blue-100 text-blue-700",
    C1: "bg-purple-100 text-purple-700",
    C2: "bg-purple-100 text-purple-700",
    All: "bg-amber-100 text-amber-700",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
        colors[level] || "bg-slate-100 text-slate-600"
      }`}
    >
      {level}
    </span>
  );
};

/* ─────────────────────────────────────────
   STAT CARD
───────────────────────────────────────── */
const StatCard = ({ icon: Icon, value, label }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="flex flex-col items-center gap-2 px-8 py-6 bg-white rounded-2xl shadow-sm border border-slate-100"
  >
    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
      <Icon size={20} className="text-red-600" />
    </div>
    <span className="text-3xl font-black text-slate-900 tracking-tight">{value}</span>
    <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest text-center">{label}</span>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT — LANGUAGE TUTOR THEME  (Lingua Lab Edition 2026)
═══════════════════════════════════════════════════════════════════ */
const LanguageTutorTheme = ({ data }) => {
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
    { name: "Languages", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const flagRow = ["🇬🇧", "🇫🇷", "🇪🇸", "🇩🇪", "🇮🇹", "🇦🇷"];

  return (
    <div className="bg-[#f8fafc] text-slate-800 font-sans selection:bg-red-200 overflow-x-hidden">

      {/* ───────────────────────────────────────
          1. STICKY GLASS NAVBAR
      ─────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
              <Globe size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-black tracking-tight text-slate-900">
                {ownerId?.businessName || "Lingua Lab"}
              </span>
              <span className="text-[9px] font-bold text-red-600 uppercase tracking-[0.25em]">
                Language Academy
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-600 hover:text-red-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all shadow-lg shadow-red-200 active:scale-95">
                Book a Class
              </button>
            </Link>
          </div>

          {/* Mobile Burger */}
          <button
            className="md:hidden text-slate-800 hover:text-red-600 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* ───────────────────────────────────────
          MOBILE MENU (slide from right)
      ─────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.32 }}
            className="fixed inset-0 z-[1001] bg-white flex flex-col px-8 py-10"
          >
            {/* Close */}
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-2">
                <Globe size={22} className="text-red-600" />
                <span className="font-black text-slate-900 text-lg">
                  {ownerId?.businessName || "Lingua Lab"}
                </span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X size={28} className="text-slate-700" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-5 border-b border-slate-100 text-2xl font-black text-slate-800 hover:text-red-600 transition-colors"
                >
                  {link.name}
                  <ChevronRight size={18} className="text-slate-300" />
                </motion.a>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-auto">
              <Link to={`/book/${ownerId?._id}`} onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-5 bg-red-600 text-white font-black rounded-2xl text-sm uppercase tracking-widest shadow-xl shadow-red-200">
                  Book Your First Class
                </button>
              </Link>
              <p className="text-center text-xs text-slate-400 font-semibold mt-4">
                First trial class available — ask us!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────────────────────────────────────
          2. HERO SECTION — "SPEAK THE WORLD"
      ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              hero?.backgroundImage ||
              "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop"
            })`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/80 to-blue-50/70" />
        </div>

        {/* Coral gradient blob */}
        <div className="absolute top-24 right-0 w-96 h-96 bg-gradient-to-br from-red-400/20 to-orange-300/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-64 h-64 bg-gradient-to-tr from-blue-400/15 to-blue-200/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full border border-red-200 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-[0.4em]"
          >
            <Globe size={12} />
            {data?.category || "Language Academy"} &bull; {ownerId?.ville || "Tunisia"}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-slate-900 leading-[0.95] mb-6"
          >
            {hero?.title || (
              <>
                SPEAK THE{" "}
                <span className="text-red-600">WORLD.</span>
              </>
            )}
          </motion.h1>

          {/* Slogan */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {hero?.slogan ||
              "Expert tutors. Proven methods. Real fluency — from your first lesson."}
          </motion.p>

          {/* Flags Row */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.34 }}
            className="flex justify-center gap-3 mb-10"
          >
            {flagRow.map((flag, i) => (
              <span
                key={i}
                className="text-3xl md:text-4xl drop-shadow-sm select-none"
                title="Language flag"
              >
                {flag}
              </span>
            ))}
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {["20+ Languages", "CEFR Certified Methods", "All Levels Welcome"].map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-slate-200 text-xs font-bold text-slate-700 shadow-sm"
              >
                <Check size={12} className="text-red-600" />
                {badge}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-10 py-4 bg-red-600 hover:bg-red-500 text-white font-black text-sm uppercase tracking-widest rounded-full shadow-xl shadow-red-200 transition-all active:scale-95">
                Book Your First Class
              </button>
            </Link>
            <a
              href="#services"
              className="flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 hover:border-blue-400 rounded-full text-sm font-bold text-slate-700 transition-all shadow-sm"
            >
              <BookOpen size={15} className="text-blue-600" />
              View Programs
            </a>
          </motion.div>

          {/* Phone */}
          {contact?.phone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center items-center gap-2 mt-8 text-slate-500"
            >
              <Phone size={14} className="text-red-500" />
              <span className="text-sm font-bold tracking-widest">{contact.phone}</span>
            </motion.div>
          )}
        </div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-slate-300 to-transparent" />
        </motion.div>
      </section>

      {/* ───────────────────────────────────────
          3. STATS STRIP
      ─────────────────────────────────────── */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Users} value="1000+" label="Students Taught" />
          <StatCard icon={Globe} value="20+" label="Languages" />
          <StatCard icon={Award} value="95%" label="Exam Pass Rate" />
          <StatCard icon={Star} value="5★" label="Native & Certified Teachers" />
        </div>
      </section>

      {/* ───────────────────────────────────────
          4. LANGUAGE PROGRAMS / SERVICES
      ─────────────────────────────────────── */}
      <section id="services" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-[10px] font-black text-red-600 uppercase tracking-[0.5em] mb-3">
              Our Programs
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-4">
              Learn Any Language.<br />
              <span className="text-red-600">At Any Level.</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">
              From beginner conversations to exam-ready mastery — we have a program built for you.
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {services
              .filter((s) => s.active)
              .map((service, idx) => {
                const level = service.level || "All";
                const flag = service.flag || "🌐";
                const duration = service.duration || "60 min lesson";

                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6, boxShadow: "0 20px 50px -10px rgba(220,38,38,0.13)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm overflow-hidden group cursor-default"
                  >
                    {/* Coral left border accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-red-400 rounded-l-2xl" />

                    {/* Header row */}
                    <div className="flex items-start justify-between mb-4 pl-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl select-none" title={service.title}>
                          {flag}
                        </span>
                        <div>
                          <h3 className="text-lg font-black text-slate-900 leading-tight">
                            {service.title}
                          </h3>
                          <LevelBadge level={level} />
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <span className="text-2xl font-black text-slate-900">
                          {service.price}
                        </span>
                        <span className="text-xs font-bold text-red-600 ml-1">TND</span>
                      </div>
                    </div>

                    {/* Description */}
                    {service.description && (
                      <p className="text-sm text-slate-500 font-medium leading-relaxed pl-3 mb-4">
                        {service.description}
                      </p>
                    )}

                    {/* Footer meta */}
                    <div className="flex items-center justify-between pl-3 pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock size={13} />
                        <span className="text-xs font-bold">{duration}</span>
                      </div>
                      <Link to={`/book/${ownerId?._id}`}>
                        <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-red-600 hover:text-red-500 transition-colors">
                          Enroll <ChevronRight size={12} />
                        </button>
                      </Link>
                    </div>

                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/[0.03] to-blue-600/[0.03] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />
                  </motion.div>
                );
              })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-14">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-12 py-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-lg transition-all active:scale-95">
                Book a Class Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────
          5. ABOUT — TUTOR PROFILE
      ─────────────────────────────────────── */}
      {about?.show && (
        <section id="about" className="py-28 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Portrait side */}
            <div className="relative">
              {/* World-dot pattern backdrop */}
              <div className="absolute -top-6 -left-6 w-full h-full rounded-3xl bg-gradient-to-br from-blue-50 to-red-50 -z-10" />
              <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-slate-200">
                <WorldDotsBg />
                <img
                  src={
                    about.image ||
                    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
                  }
                  alt={about.title || "Language Tutor"}
                  className="w-full h-[480px] object-cover object-center"
                />
                {/* Coral overlay tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 via-transparent to-transparent" />
                {/* Badge on image */}
                <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg">
                  <Globe size={20} className="text-red-600" />
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-widest">
                      Certified Tutor
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold">
                      CEFR · IELTS · DELF · DELE
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text side */}
            <div className="space-y-7">
              <div>
                <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em]">
                  Meet Your Tutor
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[0.95] mt-3">
                  {about.title || "Passionate About Language & People."}
                </h2>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                {about.text ||
                  "With over a decade of teaching experience and fluency in multiple languages, I bring energy, structure, and a genuine love of communication to every session. Whether you're aiming for the IELTS, planning to travel, or simply want to have real conversations — we'll get you there."}
              </p>

              {/* Expertise grid */}
              <div className="grid grid-cols-2 gap-5 pt-2">
                {[
                  {
                    icon: Award,
                    title: "Qualifications",
                    text: "TEFL, DALF C2, DELE C1 — internationally recognised teaching certifications.",
                  },
                  {
                    icon: Globe,
                    title: "Languages Spoken",
                    text: "English, French, Spanish, Arabic — native or near-native proficiency.",
                  },
                  {
                    icon: BookOpen,
                    title: "Teaching Method",
                    text: "CEFR-aligned curriculum with immersive, communicative techniques.",
                  },
                  {
                    icon: Users,
                    title: "Experience",
                    text: "1000+ students taught — teens, adults, corporate teams & exam candidates.",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-100 space-y-1"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={15} className="text-red-600" />
                      <h5 className="text-xs font-black uppercase tracking-widest text-slate-900">
                        {title}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{text}</p>
                  </div>
                ))}
              </div>

              <Link to={`/book/${ownerId?._id}`}>
                <button className="mt-4 flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-lg shadow-red-200 transition-all active:scale-95">
                  <Calendar size={15} />
                  Schedule a Session
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ───────────────────────────────────────
          6. GALLERY — MASONRY GRID
      ─────────────────────────────────────── */}
      {gallery?.show && gallery?.images?.length > 0 && (
        <section id="gallery" className="py-28 bg-[#f8fafc] border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-16">
              <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.5em] block mb-3">
                Our Space & Students
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                Learning in Action
              </h2>
            </div>

            {/* Masonry grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
              {gallery.images.map((img, i) => {
                const isLarge = i % 5 === 0;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`relative overflow-hidden rounded-2xl bg-slate-200 group ${
                      isLarge ? "md:col-span-2 md:row-span-2" : ""
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Gallery image ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Coral hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-red-700/60 via-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    {/* Hover label */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/90">
                        Lingua Lab
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ───────────────────────────────────────
          7. FOOTER & CONTACT
      ─────────────────────────────────────── */}
      <footer
        id="contact"
        className="pt-24 pb-12 bg-[#0f172a] text-slate-300 border-t border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Flag strip decoration */}
          <div className="flex justify-center gap-4 mb-14 opacity-30 select-none">
            {["🇬🇧", "🇫🇷", "🇪🇸", "🇩🇪", "🇮🇹", "🇦🇷", "🇧🇷", "🇯🇵"].map((flag, i) => (
              <span key={i} className="text-2xl grayscale">
                {flag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Col 1 — Brand + Contact */}
            <div className="space-y-8">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/50">
                  <Globe size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-black text-xl leading-none">
                    {ownerId?.businessName || "Lingua Lab"}
                  </p>
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.3em]">
                    Language Academy
                  </p>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-xs">
                Your gateway to global fluency — expert tutors, proven methods, and a community that speaks the world.
              </p>

              {/* Contact details */}
              <div className="space-y-4">
                {contact?.address && (
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-400">{contact.address}</span>
                  </div>
                )}
                {contact?.phone && (
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-red-500 shrink-0" />
                    <span className="text-lg font-black text-white">{contact.phone}</span>
                  </div>
                )}
              </div>

              {/* Socials */}
              <div className="flex gap-3">
                {contact?.socials?.instagram && (
                  <a
                    href={contact.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-white/5 hover:bg-red-600/80 rounded-xl transition-colors text-slate-400 hover:text-white"
                    aria-label="Instagram"
                  >
                    <InstagramIcon size={18} />
                  </a>
                )}
                {contact?.socials?.facebook && (
                  <a
                    href={contact.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-white/5 hover:bg-red-600/80 rounded-xl transition-colors text-slate-400 hover:text-white"
                    aria-label="Facebook"
                  >
                    <FacebookIcon size={18} />
                  </a>
                )}
                {contact?.socials?.tiktok && (
                  <a
                    href={contact.socials.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-white/5 hover:bg-red-600/80 rounded-xl transition-colors text-slate-400 hover:text-white"
                    aria-label="TikTok"
                  >
                    <TikTokIcon size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Col 2 — Business Hours */}
            <div className="space-y-6">
              <h4 className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-[0.4em]">
                <Clock size={14} className="text-red-500" />
                Class Hours
              </h4>
              <div className="space-y-3">
                {businessHours?.map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm border-b border-white/[0.06] pb-3"
                  >
                    <span
                      className={`font-semibold ${
                        h.isClosed ? "text-slate-600" : "text-slate-400"
                      }`}
                    >
                      {h.day}
                    </span>
                    <span
                      className={`font-black text-xs uppercase tracking-wider ${
                        h.isClosed ? "text-rose-500" : "text-white"
                      }`}
                    >
                      {h.isClosed ? "Closed" : `${h.open} – ${h.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 3 — Booking CTA */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 p-8 rounded-3xl space-y-5 shadow-2xl shadow-red-900/40">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🎓</span>
                <span className="text-white font-black text-xl leading-tight">
                  First Class Free
                </span>
              </div>
              <p className="text-red-100 text-sm font-medium leading-relaxed">
                Book your first trial session at no cost. Discover your level, meet your tutor, and set your language goals — all in one session.
              </p>
              <ul className="space-y-2">
                {[
                  "Personalised level assessment",
                  "Curriculum tailored to your goals",
                  "Native & certified instructors",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-white font-semibold">
                    <Check size={13} className="text-red-200 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to={`/book/${ownerId?._id}`}>
                <button className="w-full py-4 bg-white hover:bg-red-50 text-red-700 font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg transition-all active:scale-95 mt-2">
                  Book Your Free Class
                </button>
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-20 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
              &copy; 2026 {ownerId?.businessName || "Lingua Lab"} &bull; Digital Experience by{" "}
              <span className="text-red-600">Bookiify</span>
            </p>
            <div className="flex gap-3 text-[9px] text-slate-700 font-bold uppercase tracking-widest">
              {flagRow.map((f, i) => (
                <span key={i} className="opacity-50 select-none">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LanguageTutorTheme;
