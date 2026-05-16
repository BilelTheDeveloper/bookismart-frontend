import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  ChevronRight,
  Calendar,
  Shield,
  Award,
  Check,
  Star,
  Zap,
  Smile,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * CUSTOM SVG COMPONENTS (Lucide Replacements)
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
 * Tooth SVG icon — dental-specific accent
 */
const ToothIcon = ({ size = 22, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2C9.5 2 7 4 7 6.5c0 1.5.5 3 1 4.5-.5 3-1 5.5-1 7.5 0 1.7 1.3 3.5 3 3.5.8 0 1.6-.5 2-1.5.4 1 1.2 1.5 2 1.5 1.7 0 3-1.8 3-3.5 0-2-.5-4.5-1-7.5.5-1.5 1-3 1-4.5C17 4 14.5 2 12 2z" />
  </svg>
);

/**
 * DENTIST THEME — "BRIGHT SMILE STUDIO"
 * Crystal-clean aesthetic. White dominates with teal accents.
 * Premium luxury dental spa — radiant, trustworthy, high-tech.
 */
const DentistTheme = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  if (!data) return null;

  const { hero, about, services, gallery, contact, businessHours, ownerId, setupConfig } = data;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (lightboxImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxImg]);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const trustBadges = [
    { icon: Zap, label: "Pain-Free Treatment" },
    { icon: Shield, label: "Modern Equipment" },
    { icon: Award, label: "Certified Specialists" },
    { icon: Calendar, label: "Same-Week Appointments" },
  ];

  const stats = [
    { value: "2000+", label: "Smiles Created" },
    { value: "15+", label: "Years Experience" },
    { value: "98%", label: "Patient Satisfaction" },
    { value: "5★", label: "Rating" },
  ];

  const qualifications = [
    "Board-certified dental specialists",
    "State-of-the-art digital X-ray & 3D imaging",
    "Strict sterilisation & hygiene protocols",
    "Painless anaesthesia techniques",
  ];

  const fallbackHero =
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&auto=format&fit=crop";
  const fallbackAbout =
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop";

  return (
    <div
      className="bg-white text-slate-800 font-sans selection:bg-cyan-100 overflow-x-hidden"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}
    >
      {/* ─── 1. FIXED GLASS NAVBAR ─── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-white/95 backdrop-blur-xl shadow-md shadow-cyan-900/5 border-b border-cyan-100/80"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg text-white shadow-md transition-all duration-300 ${
                isScrolled ? "bg-cyan-600" : "bg-white/20 backdrop-blur-sm border border-white/40"
              }`}
            >
              <span className={isScrolled ? "text-white" : "text-white font-black"}>
                {ownerId?.businessName?.charAt(0) || "D"}
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className={`text-base font-black tracking-tight transition-colors duration-300 ${
                  isScrolled ? "text-slate-900" : "text-white"
                }`}
              >
                {ownerId?.businessName || "Bright Smile Studio"}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                  isScrolled ? "text-cyan-600" : "text-cyan-200"
                }`}
              >
                Dental Clinic
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-colors duration-200 ${
                  isScrolled
                    ? "text-slate-500 hover:text-cyan-600"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-black uppercase tracking-widest rounded-lg transition-all shadow-md shadow-cyan-600/25 active:scale-95">
                Book Now
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`md:hidden transition-colors ${isScrolled ? "text-slate-800" : "text-white"}`}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* ─── MOBILE MENU (slides from right) ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1001] bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 z-[1002] bg-white shadow-2xl shadow-slate-900/20 flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-cyan-600 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-md">
                    {ownerId?.businessName?.charAt(0) || "D"}
                  </div>
                  <div>
                    <span className="font-black text-slate-900 text-sm block leading-tight">
                      {ownerId?.businessName || "Bright Smile Studio"}
                    </span>
                    <span className="text-cyan-600 text-[10px] font-bold uppercase tracking-widest">
                      Dental Clinic
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col gap-1 flex-1">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-4 rounded-xl hover:bg-cyan-50 text-slate-700 hover:text-cyan-600 font-semibold text-base transition-colors group"
                  >
                    {link.name}
                    <ChevronRight
                      size={16}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </motion.a>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-8 space-y-4">
                <Link to={`/book/${ownerId?._id}`} onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-xl uppercase tracking-widest text-xs shadow-lg shadow-cyan-600/25 transition-all">
                    Book Appointment
                  </button>
                </Link>
                {contact?.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-2 justify-center text-slate-500 hover:text-cyan-600 transition-colors"
                  >
                    <Phone size={14} className="text-cyan-600" />
                    <span className="text-sm font-semibold">{contact.phone}</span>
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── 2. FULL-SCREEN HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${hero?.backgroundImage || fallbackHero})`,
          }}
        >
          {/* Crystal-clean teal gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/85 via-slate-800/70 to-cyan-800/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10" />
        </div>

        {/* Decorative sparkle line */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-cyan-400/70 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-cyan-300/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-28"
        >
          {/* Category pill */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-100 text-[11px] font-bold uppercase tracking-[0.4em]"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            {data?.category || "Dental Clinic"}&nbsp;•&nbsp;{ownerId?.ville || "Tunis"}
          </motion.span>

          {/* Main headline */}
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight text-white leading-[1.0]">
            {hero?.title || "YOUR PERFECT"}
            <span className="block text-cyan-300 mt-1">
              {hero?.subtitle || "SMILE STARTS HERE"}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-cyan-100/90 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            {hero?.slogan ||
              "Precision dental care in a calm, modern environment. From routine check-ups to full smile transformations — your comfort is our standard."}
          </p>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to={`/book/${ownerId?._id}`}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-5 bg-white text-cyan-700 font-black rounded-xl uppercase tracking-[0.2em] text-sm shadow-2xl shadow-black/20 hover:bg-cyan-50 transition-all"
              >
                Book an Appointment
              </motion.button>
            </Link>
            <a href="#services">
              <button className="px-10 py-5 bg-transparent border-2 border-white/40 hover:border-white/80 text-white font-black rounded-xl uppercase tracking-[0.2em] text-sm transition-all backdrop-blur-sm">
                Our Services
              </button>
            </a>
          </div>

          {/* Trust Badges Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
          >
            {trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-4 py-3.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/15 text-white"
              >
                <badge.icon size={16} className="text-cyan-300 shrink-0" />
                <span className="text-[11px] font-bold leading-tight">{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom wave separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 60"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ─── 3. STATS STRIP ─── */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className="text-center group"
              >
                <div className="text-4xl md:text-5xl font-black text-cyan-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. SERVICES SECTION ─── */}
      <section id="services" className="py-32 px-6 bg-[#f0f9ff]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <p className="text-[11px] font-black text-cyan-600 uppercase tracking-[0.5em] mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-cyan-600 inline-block" />
                Dental Services
              </p>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                Care Tailored{" "}
                <span className="text-cyan-600">For Your Smile</span>
              </h2>
            </div>
            <p className="text-slate-500 font-medium text-base max-w-xs lg:text-right leading-relaxed border-l-4 border-cyan-200 pl-5">
              Every treatment is designed around your comfort and long-term dental health.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {services
              .filter((s) => s.active)
              .map((service, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(8,145,178,0.12)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative bg-white border border-slate-100 rounded-2xl p-8 hover:border-cyan-200 transition-all duration-300 overflow-hidden shadow-sm"
                >
                  {/* Teal top gradient border on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-cyan-600 to-sky-400 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Index + Duration pill */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-[11px] font-black text-cyan-500/60 uppercase tracking-widest">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                    {service.duration && (
                      <span className="px-3 py-1 bg-cyan-50 text-cyan-700 text-[10px] font-black uppercase tracking-wider rounded-full border border-cyan-100">
                        {service.duration} min
                      </span>
                    )}
                  </div>

                  {/* Tooth icon */}
                  <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-cyan-600 transition-colors duration-300 border border-cyan-100 group-hover:border-cyan-600">
                    <ToothIcon
                      size={22}
                      className="text-cyan-600 group-hover:text-white transition-colors duration-300"
                    />
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-cyan-700 transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    {service.description ||
                      "Professional dental care delivered with precision and compassion by our certified specialists."}
                  </p>

                  {/* Footer row */}
                  <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-slate-900">{service.price}</span>
                      <span className="text-xs font-black text-cyan-600 uppercase tracking-wide">
                        TND
                      </span>
                    </div>
                    <Link to={`/book/${ownerId?._id}`}>
                      <button className="flex items-center gap-1.5 text-[11px] font-black text-cyan-600 uppercase tracking-widest hover:gap-3 transition-all group/btn">
                        Book
                        <ChevronRight size={14} />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-16 text-center">
            <Link to={`/book/${ownerId?._id}`}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-xl uppercase tracking-widest text-xs shadow-xl shadow-cyan-600/25 transition-all"
              >
                <Smile size={16} />
                Schedule Your Visit Today
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 5. ABOUT / DOCTOR SECTION ─── */}
      {about?.show && (
        <section id="about" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              {/* Left: Doctor / Team Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-cyan-900/10">
                  <img
                    src={about.image || fallbackAbout}
                    className="w-full h-full object-cover"
                    alt="Dental professional"
                  />
                  {/* Subtle teal gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/30 via-transparent to-transparent" />
                </div>

                {/* Floating credential card — "Dr. [businessName]" */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 }}
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-slate-100 max-w-[230px]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 bg-cyan-600 rounded-xl flex items-center justify-center shadow-md">
                      <Award size={15} className="text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                        Lead Dentist
                      </span>
                      <span className="text-sm font-black text-slate-900 leading-tight">
                        Dr. {ownerId?.businessName || "Al-Smile"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={12} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold leading-snug">
                    Trusted by 2,000+ patients across the region
                  </p>
                </motion.div>

                {/* Decorative border accent */}
                <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-cyan-300 rounded-2xl opacity-40" />
              </motion.div>

              {/* Right: Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.15 }}
                className="space-y-8"
              >
                <div>
                  <p className="text-[11px] font-black text-cyan-600 uppercase tracking-[0.5em] mb-4 flex items-center gap-2">
                    <span className="w-8 h-px bg-cyan-600 inline-block" />
                    About Our Practice
                  </p>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                    {about.title || "Gentle Care,\nBrilliant Results"}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-lg font-medium">
                    {about.text ||
                      "We combine cutting-edge dental technology with a gentle, patient-first philosophy. Our certified specialists ensure every visit is as comfortable as possible, whether you are here for a routine clean or a complete smile transformation."}
                  </p>
                </div>

                {/* Qualification bullet points */}
                <div className="space-y-3 pt-2">
                  {qualifications.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i + 0.3 }}
                      className="flex items-center gap-4 p-4 bg-[#f0f9ff] rounded-xl border border-cyan-100"
                    >
                      <div className="w-7 h-7 bg-cyan-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                        <Check size={13} className="text-white" strokeWidth={3} />
                      </div>
                      <span className="text-slate-700 font-semibold text-sm">{point}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Mini stats row */}
                <div className="grid grid-cols-3 gap-4 pt-2">
                  {[
                    { value: "15+", label: "Years" },
                    { value: "98%", label: "Satisfaction" },
                    { value: "2K+", label: "Patients" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="text-center p-4 bg-[#f0f9ff] rounded-xl border border-cyan-100"
                    >
                      <div className="text-2xl font-black text-cyan-600 mb-1">{stat.value}</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Link to={`/book/${ownerId?._id}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-2 inline-flex items-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-xl uppercase tracking-widest text-xs shadow-lg shadow-cyan-600/25 transition-all"
                  >
                    <Calendar size={15} />
                    Book a Consultation
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ─── 6. GALLERY SECTION ─── */}
      {gallery?.show && gallery?.images?.length > 0 && (
        <section id="gallery" className="py-32 bg-[#f0f9ff]">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-16">
              <p className="text-[11px] font-black text-cyan-600 uppercase tracking-[0.5em] mb-4 flex items-center justify-center gap-2">
                <span className="w-8 h-px bg-cyan-600 inline-block" />
                Smile Gallery
                <span className="w-8 h-px bg-cyan-600 inline-block" />
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Real Smiles, Real Results
              </h2>
              <p className="text-slate-500 mt-4 max-w-xl mx-auto text-base font-medium">
                Before & after transformations from our satisfied patients — each smile tells a story.
              </p>
            </div>

            {/* Masonry-style Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.images.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setLightboxImg(img)}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer group bg-slate-100 shadow-sm hover:shadow-xl hover:shadow-cyan-200/60 transition-all duration-300 ${
                    i === 0 ? "col-span-2 row-span-2" : ""
                  } ${i === 5 ? "col-span-2" : ""}`}
                  style={{
                    aspectRatio: i === 0 ? "1 / 1" : i === 5 ? "2 / 1" : "1 / 1",
                  }}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt={`Smile result ${i + 1}`}
                  />
                  {/* Teal overlay tint on hover */}
                  <div className="absolute inset-0 bg-cyan-600/0 group-hover:bg-cyan-600/20 transition-all duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <Smile size={18} className="text-cyan-600" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── LIGHTBOX ─── */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setLightboxImg(null)}
          >
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              src={lightboxImg}
              className="max-w-4xl w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              alt="Gallery enlarged"
            />
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 7. FOOTER & CONTACT ─── */}
      <footer id="contact" className="bg-[#0c2340] text-white pt-0 pb-12">
        {/* Top teal gradient accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-600" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Top Footer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 pt-16 pb-16 border-b border-white/10">

            {/* Col 1: Brand + Contact */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-cyan-600 rounded-xl flex items-center justify-center font-black text-lg text-white shadow-lg shadow-cyan-600/30">
                    {ownerId?.businessName?.charAt(0) || "D"}
                  </div>
                  <div>
                    <span className="font-black text-white text-base block leading-tight">
                      {ownerId?.businessName || "Bright Smile Studio"}
                    </span>
                    <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
                      Dental Clinic
                    </span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Delivering precision dental care in a warm, modern environment — because every smile deserves the best.
                </p>
              </div>

              {/* Emergency contact prominent */}
              {contact?.phone && (
                <div className="p-4 bg-cyan-600/15 border border-cyan-500/30 rounded-xl flex items-center gap-3">
                  <div className="w-9 h-9 bg-cyan-600 rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={15} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-0.5">
                      Emergency / Appointments
                    </p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-white font-black text-lg hover:text-cyan-300 transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Address */}
              {contact?.address && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                    <MapPin size={14} className="text-cyan-400" />
                  </div>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">
                    {contact.address}
                  </p>
                </div>
              )}

              {/* Social Links */}
              <div className="flex gap-3">
                {contact?.socials?.instagram && (
                  <a
                    href={contact.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 hover:bg-cyan-600 hover:text-white transition-all border border-white/10"
                  >
                    <InstagramIcon size={16} />
                  </a>
                )}
                {contact?.socials?.facebook && (
                  <a
                    href={contact.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 hover:bg-cyan-600 hover:text-white transition-all border border-white/10"
                  >
                    <FacebookIcon size={16} />
                  </a>
                )}
                {contact?.socials?.tiktok && (
                  <a
                    href={contact.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 hover:bg-cyan-600 hover:text-white transition-all border border-white/10"
                  >
                    <TikTokIcon size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Col 2: Business Hours Table */}
            <div className="space-y-6">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.4em] flex items-center gap-3">
                <Clock size={14} className="text-cyan-400" />
                Clinic Hours
              </h4>
              <div className="space-y-1">
                {businessHours?.map((h, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center py-2.5 border-b text-sm ${
                      h.isClosed
                        ? "border-white/5 opacity-50"
                        : "border-white/5 hover:border-cyan-600/40 transition-colors"
                    }`}
                  >
                    <span className="font-semibold text-slate-400 w-28">{h.day}</span>
                    <span
                      className={`font-black text-right ${
                        h.isClosed
                          ? "text-rose-400 text-[10px] uppercase tracking-widest"
                          : "text-cyan-300"
                      }`}
                    >
                      {h.isClosed ? "Closed" : `${h.open} – ${h.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 3: Booking CTA Card */}
            <div>
              <div className="bg-gradient-to-br from-cyan-600 to-sky-700 rounded-2xl p-8 space-y-6 border border-cyan-500/30 shadow-2xl shadow-cyan-900/50">
                <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center">
                  <Smile size={26} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-white mb-2 leading-tight">
                    Ready for Your Best Smile?
                  </h4>
                  <p className="text-cyan-100 text-sm font-medium leading-relaxed">
                    Skip the wait. Book your appointment online in under a minute — no phone calls needed.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link to={`/book/${ownerId?._id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-4 bg-white hover:bg-cyan-50 text-cyan-700 font-black rounded-xl uppercase tracking-widest text-xs shadow-lg transition-all"
                    >
                      Book Appointment Now
                    </motion.button>
                  </Link>
                  {contact?.phone && (
                    <a href={`tel:${contact.phone}`} className="block">
                      <button className="w-full py-3.5 bg-transparent border-2 border-white/30 hover:border-white/60 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all">
                        <Phone size={14} />
                        Call Us Directly
                      </button>
                    </a>
                  )}
                </div>

                {/* Trust micro-tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Pain-Free", "Certified", "Instant Confirmation"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/15 rounded-full text-[10px] font-bold text-cyan-100 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Bar */}
          <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-600 text-xs">
            <p className="font-semibold">
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-slate-400">{ownerId?.businessName || "Bright Smile Studio"}</span>
              {" "}— All rights reserved.
            </p>
            <p className="font-semibold tracking-wider uppercase text-[10px]">
              Digital Experience by{" "}
              <span className="text-cyan-400 font-black">Bookiify</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DentistTheme;
