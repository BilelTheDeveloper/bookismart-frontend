import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  ChevronRight,
  Calendar,
  Wrench,
  Shield,
  Zap,
  Star,
  Check,
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

/* ─────────────────────────────────────────────
   TRUST BADGE COMPONENT
───────────────────────────────────────────── */
const TrustBadge = ({ icon: Icon, label, sub }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl px-5 py-3"
  >
    <div className="w-9 h-9 rounded-lg bg-red-600/20 flex items-center justify-center shrink-0">
      <Icon size={18} className="text-red-500" />
    </div>
    <div>
      <p className="text-white font-black text-xs uppercase tracking-widest leading-tight">{label}</p>
      {sub && <p className="text-slate-500 text-[10px] font-medium">{sub}</p>}
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   STAT COUNTER CARD
───────────────────────────────────────────── */
const StatCard = ({ value, label }) => (
  <div className="text-center">
    <p className="text-4xl md:text-5xl font-black text-red-500 leading-none">{value}</p>
    <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest mt-2">{label}</p>
  </div>
);

/* ─────────────────────────────────────────────
   🚗 CAR SERVICES THEME — GARAGE PRO EDITION
───────────────────────────────────────────── */
const CarServicesTheme = ({ data }) => {
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
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const activeServices = (services || []).filter((s) => s?.active !== false);

  const fallbackHero =
    "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2074&auto=format&fit=crop";
  const fallbackAbout =
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop";

  /* ── DIAGONAL STRIPE OVERLAY (CSS trick via inline SVG data URI) ── */
  const stripePattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23dc2626' fill-opacity='0.04'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <div
      className="bg-[#0d0d0d] text-slate-300 font-sans selection:bg-red-600/30 overflow-x-hidden"
      style={{ backgroundImage: stripePattern }}
    >
      {/* ══════════════════════════════════════
          1. FIXED NAVBAR
      ══════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/60"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/40">
              <Wrench size={20} className="text-white" />
            </div>
            <div className="leading-tight">
              <span className="block text-sm font-black tracking-tighter uppercase text-white leading-none">
                {ownerId?.businessName || "Garage Pro"}
              </span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-red-500">
                Auto Services
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400 hover:text-red-500 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all active:scale-95 shadow-lg shadow-red-900/30">
                Book Service
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          MOBILE MENU OVERLAY
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1001] bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm z-[1002] bg-[#0d0d0d] border-l border-white/5 p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center">
                  <Wrench size={18} className="text-white" />
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.07 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-5 border-b border-white/5 text-2xl font-black uppercase tracking-tighter text-white hover:text-red-500 transition-colors"
                  >
                    {link.name}
                    <ChevronRight size={18} className="text-red-600" />
                  </motion.a>
                ))}
              </div>

              <Link to={`/book/${ownerId?._id}`} onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl uppercase tracking-widest text-xs mt-8 transition-all">
                  Book a Service
                </button>
              </Link>

              <p className="text-center text-slate-700 text-[10px] font-bold uppercase tracking-widest mt-6">
                {contact?.phone}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          2. FULL-SCREEN HERO
      ══════════════════════════════════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${hero?.backgroundImage || fallbackHero})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-[#0d0d0d]" />
          {/* Red vignette bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-red-950/20 to-transparent" />
        </div>

        {/* Diagonal accent line */}
        <div
          className="absolute top-0 right-0 w-px h-full bg-red-600/30"
          style={{ transform: "skewX(-10deg) translateX(-120px)" }}
        />

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          {/* City + Category badge */}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-5 py-1.5 mb-8 border border-red-600/40 rounded-full text-red-500 text-[10px] font-black uppercase tracking-[0.5em] bg-red-600/5"
          >
            {data.category || "Auto Repair"} · {ownerId?.ville || "Tunis"}
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-6xl md:text-[7rem] lg:text-[9rem] font-black text-white leading-[0.85] tracking-tighter uppercase mb-6"
          >
            {hero?.title || (
              <>
                We Fix It
                <br />
                <span className="text-red-500">Right.</span>
              </>
            )}
          </motion.h1>

          {/* Slogan */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-lg md:text-xl text-slate-300 font-medium mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {hero?.slogan ||
              "Expert mechanics. Honest pricing. Every vehicle treated like it's our own."}
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-12 py-5 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl uppercase tracking-[0.2em] text-xs transition-all shadow-2xl shadow-red-900/50 active:scale-95">
                Book a Service
              </button>
            </Link>
            <a
              href="#services"
              className="flex items-center gap-3 text-slate-300 hover:text-white font-bold text-sm transition-colors group"
            >
              <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-red-500 transition-colors">
                <ChevronRight size={16} className="text-red-500" />
              </span>
              View Services
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <TrustBadge icon={Shield} label="ASE Certified" sub="Licensed technicians" />
            <TrustBadge icon={Zap} label="Same-Day Service" sub="Most repairs completed today" />
            <TrustBadge icon={Check} label="Free Diagnostic" sub="On every vehicle drop-off" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        >
          <div className="w-px h-10 bg-red-500" />
          <p className="text-[9px] font-black uppercase tracking-widest text-red-500">Scroll</p>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          3. SERVICES SECTION
      ══════════════════════════════════════ */}
      <section id="services" className="py-32 px-6 relative">
        {/* Subtle side accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-red-600 to-transparent opacity-30" />

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
            <div>
              <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.6em] mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-red-600 inline-block" />
                What We Do
              </p>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                Our <span className="text-red-500">Services</span>
              </h2>
            </div>
            <p className="text-slate-500 font-medium text-base max-w-sm border-l-2 border-red-600 pl-5 leading-relaxed">
              Precision auto care for every make and model — from routine maintenance to complex diagnostics.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {activeServices.length > 0 ? (
              activeServices.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07 }}
                  whileHover={{ x: 6, scale: 1.01 }}
                  className="group relative bg-white/[0.03] border border-white/[0.06] hover:border-red-600/40 rounded-2xl p-7 overflow-hidden transition-all duration-300 cursor-default"
                >
                  {/* Left red border accent */}
                  <div className="absolute left-0 top-4 bottom-4 w-1 bg-red-600 rounded-r-full opacity-80 group-hover:opacity-100 transition-opacity" />

                  {/* Faint background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 to-red-600/0 group-hover:from-red-600/[0.04] transition-all duration-500 rounded-2xl" />

                  <div className="relative pl-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        {/* Wrench icon */}
                        <div className="w-10 h-10 rounded-lg bg-red-600/10 border border-red-600/20 flex items-center justify-center shrink-0 group-hover:bg-red-600/20 transition-colors">
                          <Wrench size={17} className="text-red-500" />
                        </div>
                        <h3 className="text-xl font-black text-white group-hover:text-red-400 transition-colors uppercase tracking-tight leading-tight">
                          {service.title}
                        </h3>
                      </div>
                      {/* Price */}
                      <div className="text-right shrink-0">
                        <span className="text-2xl font-black text-white">
                          {service.price}
                        </span>
                        <span className="ml-1 text-xs font-black text-red-500">TND</span>
                      </div>
                    </div>

                    {/* Description */}
                    {service.description && (
                      <p className="text-slate-500 text-sm font-medium leading-relaxed mb-4 ml-13">
                        {service.description}
                      </p>
                    )}

                    {/* Duration badge */}
                    {service.duration && (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400">
                          <Clock size={11} className="text-red-500" />
                          {service.duration} min
                        </div>
                        <Link to={`/book/${ownerId?._id}`}>
                          <button className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-red-500 border border-red-600/30 hover:bg-red-600 hover:text-white transition-all">
                            Book <ChevronRight size={10} />
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Corner index number */}
                  <span className="absolute top-5 right-5 text-[11px] font-black text-white/5 group-hover:text-red-600/20 transition-colors">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              ))
            ) : (
              /* Placeholder cards */
              [
                { title: "Oil Change & Filter", price: "35", duration: "30", description: "Full synthetic or conventional oil change with filter replacement and multi-point inspection." },
                { title: "Brake Service", price: "120", duration: "90", description: "Complete brake pad and rotor inspection, replacement and calibration for optimal stopping power." },
                { title: "Tire Rotation & Balance", price: "25", duration: "45", description: "Even wear extension through professional rotation, dynamic balancing and pressure check." },
                { title: "Engine Diagnostics", price: "0", duration: "20", description: "Free computer scan to identify fault codes, engine warnings and system irregularities." },
                { title: "AC Recharge", price: "80", duration: "60", description: "Refrigerant recharge, leak check and system performance test to keep your cabin cool." },
                { title: "Full Vehicle Inspection", price: "50", duration: "60", description: "150-point mechanical safety inspection covering all major systems with written report." },
              ].map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07 }}
                  whileHover={{ x: 6, scale: 1.01 }}
                  className="group relative bg-white/[0.03] border border-white/[0.06] hover:border-red-600/40 rounded-2xl p-7 overflow-hidden transition-all duration-300"
                >
                  <div className="absolute left-0 top-4 bottom-4 w-1 bg-red-600 rounded-r-full opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 to-red-600/0 group-hover:from-red-600/[0.04] transition-all duration-500 rounded-2xl" />
                  <div className="relative pl-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-600/10 border border-red-600/20 flex items-center justify-center shrink-0 group-hover:bg-red-600/20 transition-colors">
                          <Wrench size={17} className="text-red-500" />
                        </div>
                        <h3 className="text-xl font-black text-white group-hover:text-red-400 transition-colors uppercase tracking-tight leading-tight">
                          {service.title}
                        </h3>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-2xl font-black text-white">{service.price}</span>
                        <span className="ml-1 text-xs font-black text-red-500">TND</span>
                      </div>
                    </div>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-4">{service.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <Clock size={11} className="text-red-500" />
                        {service.duration} min
                      </div>
                    </div>
                  </div>
                  <span className="absolute top-5 right-5 text-[11px] font-black text-white/5 group-hover:text-red-600/20 transition-colors">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              ))
            )}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-14">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-10 py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl uppercase tracking-widest text-xs transition-all shadow-xl shadow-red-900/30 active:scale-95">
                Book Any Service Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. STATS STRIP
      ══════════════════════════════════════ */}
      <section className="py-20 bg-[#111111] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          <StatCard value="12+" label="Years in Business" />
          <StatCard value="8,500+" label="Cars Serviced" />
          <StatCard value="98%" label="Satisfaction Rate" />
          <StatCard value="Same Day" label="Most Repairs" />
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. ABOUT SECTION
      ══════════════════════════════════════ */}
      {about?.show && (
        <section id="about" className="py-32 bg-[#0d0d0d] relative overflow-hidden">
          {/* Diagonal red accent */}
          <div
            className="absolute -right-20 top-0 bottom-0 w-96 bg-red-600/5"
            style={{ transform: "skewX(-8deg)" }}
          />

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl group">
                <img
                  src={about?.image || fallbackAbout}
                  className="w-full h-[520px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  alt="Our Garage"
                />
                {/* Red overlay tint */}
                <div className="absolute inset-0 bg-red-900/20 mix-blend-multiply" />
                {/* Corner bracket decoration */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-red-600" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-red-600" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full bg-red-600 flex flex-col items-center justify-center shadow-2xl shadow-red-900/60">
                <Star size={20} className="text-white mb-1" fill="white" />
                <p className="text-white font-black text-xl leading-none">ASE</p>
                <p className="text-white/80 text-[9px] font-black uppercase tracking-widest">Certified</p>
              </div>
            </motion.div>

            {/* Text Column */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div>
                <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.6em] mb-4 flex items-center gap-2">
                  <span className="w-6 h-px bg-red-600 inline-block" />
                  Our Story
                </p>
                <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                  {about?.title || "Built on Trust. Driven by Precision."}
                </h2>
              </div>

              <p className="text-slate-400 leading-relaxed text-lg font-medium border-l-2 border-red-600 pl-6">
                "{about?.text ||
                  "We started with two bays and a promise: fix it right the first time. Over a decade later, that promise still drives every job we take on. From oil changes to engine rebuilds, your car is in expert hands."}"
              </p>

              {/* Credential bullets */}
              <div className="space-y-4 pt-2">
                {[
                  "Factory-trained ASE-certified mechanics",
                  "State-of-the-art diagnostic equipment",
                  "OEM and premium aftermarket parts only",
                  "Fully insured — your vehicle is protected",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-600/20 border border-red-600/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} className="text-red-500" />
                    </div>
                    <p className="text-slate-400 text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link to={`/book/${ownerId?._id}`}>
                  <button className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl uppercase tracking-widest text-xs transition-all shadow-lg shadow-red-900/30 active:scale-95">
                    Book an Appointment
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          6. GALLERY SECTION
      ══════════════════════════════════════ */}
      {gallery?.show && gallery?.images?.length > 0 && (
        <section id="gallery" className="py-32 bg-black relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.6em] mb-4 flex items-center justify-center gap-2">
                <span className="w-6 h-px bg-red-600 inline-block" />
                Our Work
                <span className="w-6 h-px bg-red-600 inline-block" />
              </p>
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                The <span className="text-red-500">Garage</span>
              </h2>
            </div>

            {/* Masonry-style grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {gallery.images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`group overflow-hidden rounded-xl bg-zinc-900 border border-white/5 ${
                    i % 5 === 0
                      ? "md:col-span-2 md:row-span-2"
                      : i % 7 === 4
                      ? "md:col-span-1 md:row-span-2"
                      : ""
                  }`}
                  style={{
                    minHeight: i % 5 === 0 ? "320px" : "180px",
                  }}
                >
                  <img
                    src={img}
                    alt={`Workshop ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          7. FOOTER & CONTACT
      ══════════════════════════════════════ */}
      <footer
        id="contact"
        className="pt-24 pb-10 bg-[#080808] border-t border-white/5 relative overflow-hidden"
      >
        {/* Faint diagonal red sweep */}
        <div
          className="absolute -left-32 -top-32 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 mb-16">

            {/* Column 1 — Brand & Contact */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40">
                    <Wrench size={22} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white uppercase tracking-tight leading-tight">
                      {ownerId?.businessName || "Garage Pro"}
                    </h4>
                    <p className="text-red-500 text-[9px] font-black uppercase tracking-widest">
                      Auto Services
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 text-xs font-medium leading-relaxed max-w-xs">
                  Precision auto care you can count on. Serving the community with honesty and expertise.
                </p>
              </div>

              <div className="space-y-4">
                {contact?.address && (
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-slate-400 text-sm font-medium">{contact.address}</p>
                  </div>
                )}
                {contact?.phone && (
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-red-500 shrink-0" />
                    <p className="text-xl font-black text-white">{contact.phone}</p>
                  </div>
                )}
              </div>

              {/* Social Icons */}
              <div className="flex gap-3">
                {contact?.socials?.instagram && (
                  <a
                    href={contact.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all"
                  >
                    <InstagramIcon size={17} />
                  </a>
                )}
                {contact?.socials?.facebook && (
                  <a
                    href={contact.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all"
                  >
                    <FacebookIcon size={17} />
                  </a>
                )}
                {contact?.socials?.tiktok && (
                  <a
                    href={contact.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all"
                  >
                    <TikTokIcon size={17} />
                  </a>
                )}
              </div>
            </div>

            {/* Column 2 — Business Hours */}
            <div className="space-y-6">
              <h5 className="text-[10px] font-black text-white uppercase tracking-[0.4em] flex items-center gap-2">
                <Clock size={14} className="text-red-500" />
                Opening Hours
              </h5>
              <div className="space-y-2">
                {(businessHours || []).map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2.5 border-b border-white/[0.05]"
                  >
                    <span
                      className={`text-sm font-bold ${
                        h.isClosed ? "text-slate-700" : "text-slate-400"
                      }`}
                    >
                      {h.day}
                    </span>
                    <div className="flex items-center gap-2">
                      {/* Open/Closed indicator dot */}
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          h.isClosed ? "bg-red-900" : "bg-emerald-500"
                        }`}
                      />
                      <span
                        className={`text-sm font-black ${
                          h.isClosed ? "text-red-700" : "text-white"
                        }`}
                      >
                        {h.isClosed ? "Closed" : `${h.open} — ${h.close}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3 — Booking CTA Box */}
            <div className="relative bg-gradient-to-br from-red-950/50 to-black border border-red-600/25 rounded-2xl p-8 space-y-6 overflow-hidden">
              {/* Corner glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative">
                <Calendar size={36} className="text-red-500 mb-4" />
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight mb-3">
                  Ready to Book?
                </h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">
                  Drop off your car or reserve a service slot online. Same-day appointments available for most services.
                </p>

                <Link to={`/book/${ownerId?._id}`}>
                  <button className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl uppercase tracking-widest text-xs transition-all shadow-xl shadow-red-900/40 active:scale-95 mb-3">
                    Book an Appointment
                  </button>
                </Link>

                {contact?.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center justify-center gap-2 w-full py-3 border border-white/10 hover:border-red-600/40 rounded-xl text-slate-400 hover:text-white text-xs font-black uppercase tracking-widest transition-all"
                  >
                    <Phone size={13} className="text-red-500" />
                    Call {contact.phone}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.3em] text-center">
              &copy; 2026 {ownerId?.businessName || "Garage Pro"} · Digital Experience by{" "}
              <span className="text-red-800">Bookiify</span>
            </p>
            <div className="flex items-center gap-4 text-slate-800 text-[10px] font-black uppercase tracking-widest">
              <span>Privacy</span>
              <span>·</span>
              <span>Terms</span>
              <span>·</span>
              <span>Sitemap</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CarServicesTheme;
