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
  Star,
  Target,
  Zap,
  TrendingUp,
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

/**
 * TESTIMONIALS — hardcoded placeholders
 */
const TESTIMONIALS = [
  {
    quote:
      "Working with my coach completely rewired how I approach challenges. Within 90 days I doubled my revenue and finally felt in control of my life.",
    name: "Amir B.",
    role: "CEO, Tech Startup",
  },
  {
    quote:
      "I was stuck for years. The VIP Intensive Day gave me a 12-month roadmap in 8 hours. I left a different person. No exaggeration.",
    name: "Sarah K.",
    role: "Executive Director",
  },
  {
    quote:
      "The clarity sessions broke every limiting belief I held. I went from burnout to leading a team of 40 with full confidence.",
    name: "Mehdi L.",
    role: "Senior Manager, Finance",
  },
];

/**
 * COACH CREDENTIALS — hardcoded placeholders
 */
const CREDENTIALS = [
  "ICF Certified Professional Certified Coach (PCC)",
  "Tony Robbins Results Coach — Certified",
  "NLP Practitioner & Master Practitioner",
  "Positive Intelligence (PQ) Coach",
  "500+ hours of executive coaching delivered",
];

/**
 * HERO PILLARS
 */
const PILLARS = [
  { icon: Target, label: "Clarity", desc: "Define your vision with precision" },
  { icon: TrendingUp, label: "Strategy", desc: "Build a roadmap that actually works" },
  { icon: Zap, label: "Action", desc: "Execute with accountability & momentum" },
];

/**
 * ⚡ LIFE COACH THEME — "RISE & LEAD" ULTRA EDITION (2026)
 */
const LifeCoachTheme = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);

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
    { name: "Results", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div
      className="bg-[#111827] text-[#f9f5ee] font-sans selection:bg-amber-600/30 overflow-x-hidden"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
    >
      {/* ─────────────────────────────────────────────────
          1. PREMIUM GLASS NAVBAR
      ───────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-[#111827]/90 backdrop-blur-2xl border-b border-amber-600/10 shadow-2xl shadow-black/40"
            : "py-7 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg text-[#111827] shadow-lg shadow-amber-600/30"
              style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)" }}
            >
              {ownerId?.businessName?.charAt(0) || "L"}
            </div>
            <span className="text-lg font-black tracking-tight text-white uppercase">
              {ownerId?.businessName || "Rise & Lead"}
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400 hover:text-amber-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-7 py-2.5 text-[10px] font-black uppercase tracking-widest text-[#111827] rounded-full transition-all active:scale-95 shadow-lg shadow-amber-600/30 hover:shadow-amber-500/40"
                style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)" }}>
                Book Discovery Call
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Slide-In */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-0 z-[1001] bg-[#0d1117] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-white font-black uppercase tracking-tight text-xl">
                {ownerId?.businessName || "Rise & Lead"}
              </span>
              <X
                size={32}
                onClick={() => setMobileMenuOpen(false)}
                className="cursor-pointer text-white"
              />
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
                  className="text-5xl font-black uppercase tracking-tighter border-b border-white/5 pb-5 pt-3 text-white hover:text-amber-500 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto">
              <Link to={`/book/${ownerId?._id}`}>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-5 font-black uppercase tracking-widest text-sm text-[#111827] rounded-2xl shadow-2xl"
                  style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)" }}
                >
                  Book Discovery Call
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────
          2. FULL-SCREEN HERO
      ───────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${
              hero.backgroundImage ||
              "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=2064&auto=format&fit=crop"
            })`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#111827]/92 via-[#111827]/70 to-[#111827]" />
        </div>

        {/* Gold radial glow behind headline */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #d97706 0%, transparent 70%)" }}
        />

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        >
          {/* Category badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-5 py-1.5 mb-10 border border-amber-600/40 rounded-full text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] bg-amber-600/5"
          >
            {data.category || "Life Coaching"} • {ownerId?.ville || "Tunisia"}
          </motion.span>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-7xl md:text-[100px] font-black mb-6 tracking-tighter text-white leading-[0.88] uppercase">
            Become Your{" "}
            <span
              className="block"
              style={{
                background: "linear-gradient(90deg, #d97706, #f59e0b, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Best Self.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-2xl text-slate-300 font-medium mb-6 max-w-2xl mx-auto leading-relaxed">
            {hero.slogan ||
              "Stop waiting for the right moment. The right moment is engineered — through clarity, strategy, and relentless action."}
          </p>

          {/* Tagline */}
          <p className="text-amber-500/80 text-xs font-black uppercase tracking-[0.5em] mb-14">
            Stop Waiting. Start Becoming.
          </p>

          {/* 3 Pillars */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            {PILLARS.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex-1 max-w-[220px] mx-auto sm:mx-0 px-5 py-4 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm"
              >
                <Icon size={20} className="text-amber-500 mb-2 mx-auto" />
                <p className="text-white font-black uppercase tracking-widest text-xs mb-1">{label}</p>
                <p className="text-slate-400 text-[11px] leading-snug">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link to={`/book/${ownerId?._id}`}>
              <button
                className="px-14 py-5 font-black rounded-2xl uppercase tracking-[0.2em] text-xs text-[#111827] transition-all shadow-2xl shadow-amber-600/30 hover:shadow-amber-500/50 hover:scale-[1.03] active:scale-95"
                style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)" }}
              >
                Book Discovery Call
              </button>
            </Link>
            <a
              href="#services"
              className="flex items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors text-xs font-black uppercase tracking-widest"
            >
              Explore Programs <ChevronRight size={14} />
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-[1px] h-10 bg-gradient-to-b from-amber-600 to-transparent"
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          3. SERVICES — COACHING PACKAGES
      ───────────────────────────────────────────────── */}
      <section id="services" className="py-36 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mb-4">
                Coaching Programs
              </h2>
              <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                Your Path <br />
                <span className="text-amber-600">Starts Here.</span>
              </h3>
            </div>
            <p className="text-slate-500 font-medium text-lg border-l-2 border-amber-600 pl-6 mb-1 max-w-sm">
              Every program is tailored to your unique goals, timeline, and transformation readiness.
            </p>
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {services.filter((s) => s.active).map((service, idx) => {
              const isFeatured = service.featured || idx === 1;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onHoverStart={() => setActiveService(idx)}
                  onHoverEnd={() => setActiveService(null)}
                  className={`relative rounded-3xl p-8 flex flex-col gap-5 transition-all duration-300 cursor-default
                    ${
                      isFeatured
                        ? "border border-amber-600/40 bg-amber-600/5"
                        : "border border-white/5 bg-white/2 hover:border-amber-600/20"
                    }`}
                >
                  {/* Most Popular badge */}
                  {isFeatured && (
                    <div className="absolute -top-3.5 left-8">
                      <span
                        className="px-4 py-1 text-[9px] font-black uppercase tracking-widest text-[#111827] rounded-full"
                        style={{ background: "linear-gradient(90deg, #d97706, #f59e0b)" }}
                      >
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Gold left accent bar */}
                  <div
                    className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full"
                    style={{
                      background: isFeatured
                        ? "linear-gradient(180deg, #d97706, #f59e0b)"
                        : activeService === idx
                        ? "linear-gradient(180deg, #d97706, transparent)"
                        : "transparent",
                      transition: "background 0.3s",
                    }}
                  />

                  {/* Index */}
                  <span className="text-amber-600/50 font-black text-sm tracking-widest">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Title */}
                  <h4
                    className={`text-2xl font-black uppercase tracking-tight leading-tight ${
                      isFeatured ? "text-amber-400" : "text-white"
                    }`}
                  >
                    {service.title || `Coaching Package ${idx + 1}`}
                  </h4>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed flex-1">
                    {service.description ||
                      "A focused program built to drive measurable change in your life and career."}
                  </p>

                  {/* Duration */}
                  {service.duration && (
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                      <Clock size={13} className="text-amber-600/60" />
                      {service.duration}
                    </div>
                  )}

                  {/* Price + CTA */}
                  <div className="flex items-end justify-between pt-4 border-t border-white/5">
                    <div>
                      <span className="text-3xl font-black text-white">{service.price}</span>
                      <span className="text-amber-500 text-xs font-black ml-1.5 tracking-widest">TND</span>
                    </div>
                    <Link to={`/book/${ownerId?._id}`}>
                      <button
                        className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${
                          isFeatured
                            ? "text-[#111827]"
                            : "border border-white/10 text-white hover:border-amber-600/40 hover:text-amber-400"
                        }`}
                        style={
                          isFeatured
                            ? { background: "linear-gradient(135deg, #d97706, #f59e0b)" }
                            : {}
                        }
                      >
                        Book
                      </button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          4. TESTIMONIAL STRIP
      ───────────────────────────────────────────────── */}
      <section id="testimonials" className="py-28 bg-[#0d1117] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mb-3">
              Client Results
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
              Real Transformations.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative p-8 rounded-3xl border border-white/5 bg-white/2 hover:border-amber-600/20 transition-all"
              >
                {/* Quote mark */}
                <div
                  className="text-7xl font-black leading-none mb-4 select-none"
                  style={{
                    background: "linear-gradient(90deg, #d97706, transparent)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  "
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-8 italic">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#111827] font-black text-sm"
                    style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)" }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-black text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, si) => (
                      <Star
                        key={si}
                        size={11}
                        className="text-amber-500"
                        fill="#d97706"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────
          5. ABOUT — COACH PROFILE
      ───────────────────────────────────────────────── */}
      {about.show && (
        <section id="about" className="py-36 bg-[#111827]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Coach photo with gold frame */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Gold frame accent */}
              <div
                className="absolute -top-4 -left-4 w-3/4 h-3/4 rounded-3xl"
                style={{ border: "2px solid #d97706", opacity: 0.35 }}
              />
              <div className="relative overflow-hidden rounded-3xl aspect-[3/4] bg-[#0d1117]">
                <img
                  src={
                    about.image ||
                    "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop"
                  }
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000"
                  alt="Coach portrait"
                />
                {/* Gold overlay shimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                <div className="absolute inset-0 opacity-10 mix-blend-overlay"
                  style={{ background: "linear-gradient(135deg, #d97706, transparent)" }} />
              </div>
              {/* Floating stat badge */}
              <div className="absolute -bottom-6 -right-4 bg-[#0d1117] border border-amber-600/30 rounded-2xl px-6 py-4 text-center shadow-2xl shadow-black/50">
                <p className="text-3xl font-black text-amber-500">500+</p>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mt-0.5">
                  Hours Coached
                </p>
              </div>
            </motion.div>

            {/* Coach details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 pt-6"
            >
              <div>
                <div className="w-16 h-[3px] mb-6"
                  style={{ background: "linear-gradient(90deg, #d97706, transparent)" }} />
                <h2 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mb-4">
                  Your Coach
                </h2>
                <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                  {about.title || "Lead From Within."}
                </h3>
              </div>

              <p className="text-slate-400 leading-relaxed text-lg font-medium">
                {about.text ||
                  "After years navigating high-pressure corporate environments and hitting a wall of burnout, I discovered that sustainable success comes not from doing more — but from becoming more. I rebuilt my life using the very frameworks I now share with executives and leaders around the world."}
              </p>

              {/* Coaching philosophy */}
              <div className="p-6 rounded-2xl border border-amber-600/15 bg-amber-600/5">
                <p className="text-amber-400/80 text-xs font-black uppercase tracking-widest mb-3">
                  Coaching Philosophy
                </p>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "Every person is the architect of their own transformation. My role is to hand you the blueprint, the tools, and the accountability to build the life you actually deserve."
                </p>
              </div>

              {/* Credentials */}
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 flex items-center gap-2">
                  <Award size={12} className="text-amber-600" /> Certifications & Credentials
                </p>
                <div className="space-y-2.5">
                  {CREDENTIALS.map((cred, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-[7px] shrink-0"
                        style={{ background: "#d97706" }}
                      />
                      <span className="text-slate-300 text-sm font-medium">{cred}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link to={`/book/${ownerId?._id}`}>
                <button
                  className="mt-4 px-10 py-4 font-black rounded-xl uppercase tracking-widest text-xs text-[#111827] transition-all shadow-lg shadow-amber-600/20 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-95"
                  style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)" }}
                >
                  Book a Session
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────
          6. GALLERY — MASONRY
      ───────────────────────────────────────────────── */}
      {gallery.show && gallery.images?.length > 0 && (
        <section id="gallery" className="py-32 bg-[#0d1117]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mb-4">
                Behind the Transformation
              </h2>
              <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                Sessions &amp; <br />
                <span className="text-amber-600">Breakthroughs.</span>
              </h3>
            </div>

            {/* Masonry-style grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
              {gallery.images.map((img, i) => {
                const isLarge = i % 5 === 0;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`group relative overflow-hidden rounded-2xl bg-[#111827] ${
                      isLarge ? "col-span-2 row-span-2" : ""
                    }`}
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={`Gallery ${i + 1}`}
                    />
                    {/* Gold hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(217,119,6,0.35), rgba(245,158,11,0.15))",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full border-2 border-amber-400/80 flex items-center justify-center">
                        <Zap size={18} className="text-amber-400" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Fallback if empty after filter */}
            {gallery.images.length === 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2069&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
                ].map((src, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-2xl aspect-square bg-[#111827]">
                    <img
                      src={src}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={`Coaching ${i + 1}`}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: "linear-gradient(135deg, rgba(217,119,6,0.35), transparent)" }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────
          7. FOOTER & CONTACT
      ───────────────────────────────────────────────── */}
      <footer id="contact" className="pt-32 pb-16 bg-[#090d13] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Col 1 — Brand + Contact */}
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg text-[#111827] shadow-lg shadow-amber-600/20"
                style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)" }}
              >
                {ownerId?.businessName?.charAt(0) || "L"}
              </div>
              <div>
                <h4 className="text-white font-black uppercase tracking-tight text-lg">
                  {ownerId?.businessName || "Rise & Lead"}
                </h4>
                <p className="text-amber-600/70 text-[9px] font-black uppercase tracking-[0.3em]">
                  Executive Life Coaching
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {contact.address && (
                <div className="flex items-start gap-4">
                  <MapPin size={16} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-slate-400 text-sm font-medium">{contact.address}</p>
                </div>
              )}
              <div className="flex items-center gap-4">
                <Phone size={16} className="text-amber-500 shrink-0" />
                <p className="text-xl font-black text-white">{contact.phone || "+216 XX XXX XXX"}</p>
              </div>
              {contact.email && (
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-sm border border-amber-500/70" />
                  </div>
                  <p className="text-slate-400 text-sm">{contact.email}</p>
                </div>
              )}
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {contact.socials?.instagram && (
                <a
                  href={contact.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white/4 border border-white/5 hover:border-amber-600/40 hover:text-amber-500 text-slate-400 transition-all"
                >
                  <InstagramIcon size={18} />
                </a>
              )}
              {contact.socials?.facebook && (
                <a
                  href={contact.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white/4 border border-white/5 hover:border-amber-600/40 hover:text-amber-500 text-slate-400 transition-all"
                >
                  <FacebookIcon size={18} />
                </a>
              )}
              {contact.socials?.tiktok && (
                <a
                  href={contact.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white/4 border border-white/5 hover:border-amber-600/40 hover:text-amber-500 text-slate-400 transition-all"
                >
                  <TikTokIcon size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Col 2 — Business Hours */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] flex items-center gap-3">
              <Clock size={14} className="text-amber-500" /> Availability
            </h4>
            <div className="space-y-3">
              {businessHours.map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-sm border-b border-white/4 pb-3"
                >
                  <span
                    className={`font-bold tracking-wide ${
                      h.isClosed ? "text-slate-600" : "text-slate-400"
                    }`}
                  >
                    {h.day}
                  </span>
                  <span
                    className={`font-black uppercase text-xs tracking-widest ${
                      h.isClosed ? "text-rose-500/70" : "text-white"
                    }`}
                  >
                    {h.isClosed ? "Unavailable" : `${h.open} – ${h.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3 — Booking CTA */}
          <div
            className="rounded-3xl p-10 flex flex-col gap-6 border"
            style={{
              background: "linear-gradient(145deg, rgba(217,119,6,0.08), rgba(245,158,11,0.03))",
              borderColor: "rgba(217,119,6,0.25)",
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-600/20"
              style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)" }}
            >
              <Calendar size={24} className="text-[#111827]" />
            </div>
            <div>
              <h4 className="text-2xl font-black text-white uppercase tracking-tight leading-tight mb-2">
                Book Your Discovery Call
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                A free 30-minute call to explore your goals, assess your readiness, and find the right coaching path for you.
              </p>
            </div>
            <ul className="space-y-2.5">
              {["No commitment required", "100% confidential", "Clarity guaranteed or rebooked free"].map(
                (item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-xs font-medium">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(217,119,6,0.2)", border: "1px solid rgba(217,119,6,0.5)" }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    </div>
                    {item}
                  </li>
                )
              )}
            </ul>
            <Link to={`/book/${ownerId?._id}`} className="mt-2">
              <button
                className="w-full py-5 font-black rounded-2xl uppercase tracking-widest text-xs text-[#111827] transition-all shadow-xl shadow-amber-600/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-95"
                style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)" }}
              >
                Book Discovery Call — Free
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-white/4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.35em]">
            &copy; 2026 {ownerId?.businessName || "Rise & Lead"} — All rights reserved
          </p>
          <p className="text-slate-700 text-[9px] font-black uppercase tracking-[0.3em]">
            Digital Experience by{" "}
            <span className="text-amber-700/70">Bookiify</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LifeCoachTheme;
