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
  Heart,
  Check,
  Star,
  UserCheck,
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
 * HEALTH & MEDICAL THEME — "CLINICAL PRIME"
 * Premium private clinic experience. Clean, trustworthy, minimal.
 */
const HealthMedicalTheme = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  if (!data) return null;

  const { hero, about, services, gallery, contact, businessHours, ownerId } = data;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when lightbox open
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
    { icon: Shield, label: "Licensed Practice" },
    { icon: UserCheck, label: "Private Consultations" },
    { icon: Calendar, label: "Same-Day Appointments" },
    { icon: Award, label: "Certified Specialists" },
  ];

  const highlights = [
    "Board-certified medical professionals",
    "State-of-the-art diagnostic equipment",
    "Strict patient confidentiality standards",
    "Multilingual medical staff",
  ];

  return (
    <div
      className="bg-[#f8fafc] text-slate-800 font-sans selection:bg-blue-200 overflow-x-hidden"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}
    >
      {/* ─── 1. FIXED GLASS NAVBAR ─── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-200/80"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg text-white shadow-md transition-all duration-300 ${
                isScrolled ? "bg-blue-700" : "bg-blue-700/90"
              }`}
            >
              {ownerId?.businessName?.charAt(0) || "H"}
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className={`text-base font-black tracking-tight transition-colors duration-300 ${
                  isScrolled ? "text-slate-900" : "text-white"
                }`}
              >
                {ownerId?.businessName || "HealthCare Clinic"}
              </span>
              <span
                className={`text-[10px] font-semibold uppercase tracking-widest transition-colors duration-300 ${
                  isScrolled ? "text-blue-700" : "text-blue-200"
                }`}
              >
                Medical Center
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
                    ? "text-slate-600 hover:text-blue-700"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-6 py-2.5 bg-blue-700 hover:bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest rounded-lg transition-all shadow-md shadow-blue-700/20 active:scale-95">
                Book Appointment
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`md:hidden transition-colors ${
              isScrolled ? "text-slate-800" : "text-white"
            }`}
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
              className="fixed inset-0 z-[1001] bg-slate-900/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 z-[1002] bg-white shadow-2xl flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center font-black text-white text-sm">
                    {ownerId?.businessName?.charAt(0) || "H"}
                  </div>
                  <span className="font-black text-slate-900 tracking-tight">
                    {ownerId?.businessName || "HealthCare Clinic"}
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-4 rounded-xl hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-semibold text-base transition-colors group"
                  >
                    {link.name}
                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-8">
                <Link to={`/book/${ownerId?._id}`} onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full py-4 bg-blue-700 hover:bg-blue-600 text-white font-black rounded-xl uppercase tracking-widest text-xs shadow-lg shadow-blue-700/20 transition-all">
                    Book Appointment
                  </button>
                </Link>
                <div className="flex items-center gap-2 mt-4 justify-center text-slate-500">
                  <Phone size={14} className="text-blue-600" />
                  <span className="text-sm font-semibold">{contact?.phone}</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── 2. FULL-SCREEN HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              hero?.backgroundImage ||
              "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop"
            })`,
          }}
        >
          {/* Clinical Blue Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/75 to-blue-900/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-transparent to-[#f8fafc]" />
        </div>

        {/* Decorative vertical accent line */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-60" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24"
        >
          {/* Category pill */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-[11px] font-bold uppercase tracking-[0.4em]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            {data?.category || "Medical Clinic"} &nbsp;•&nbsp; {ownerId?.ville || "Tunis"}
          </motion.span>

          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight text-white leading-[1.05]">
            {hero?.title || "Your Health,"}
            <span className="block text-teal-300">
              {hero?.subtitle || "Our Priority"}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100/90 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            {hero?.slogan ||
              "Compassionate, evidence-based medicine delivered by a team of specialists committed to your long-term wellbeing."}
          </p>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to={`/book/${ownerId?._id}`}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-5 bg-white text-blue-700 font-black rounded-xl uppercase tracking-[0.2em] text-sm shadow-2xl hover:bg-blue-50 transition-all"
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
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
          >
            {trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-4 py-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/15 text-white"
              >
                <badge.icon size={16} className="text-teal-300 shrink-0" />
                <span className="text-[11px] font-bold leading-tight">{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── 3. SERVICES SECTION ─── */}
      <section id="services" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <p className="text-[11px] font-black text-blue-700 uppercase tracking-[0.5em] mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-blue-700 inline-block" />
                Medical Services
              </p>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                Expert Care,{" "}
                <span className="text-blue-700">Every Visit</span>
              </h2>
            </div>
            <p className="text-slate-500 font-medium text-base max-w-xs lg:text-right leading-relaxed border-l-4 border-blue-100 pl-5">
              All consultations include a comprehensive assessment and personalised treatment plan.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {services
              .filter((s) => s.active)
              .map((service, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative bg-[#f8fafc] border border-slate-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 overflow-hidden"
                >
                  {/* Blue left accent border */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-blue-700 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Index + Duration pill */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-[11px] font-black text-blue-700/50 uppercase tracking-widest">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                    {service.duration && (
                      <span className="px-3 py-1 bg-teal-50 text-teal-700 text-[10px] font-black uppercase tracking-wider rounded-full border border-teal-200">
                        {service.duration} min
                      </span>
                    )}
                  </div>

                  {/* Service Icon */}
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-700 transition-colors duration-300">
                    <Heart size={20} className="text-blue-700 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-700 transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    {service.description || "Professional medical consultation with our certified specialists."}
                  </p>

                  {/* Footer row */}
                  <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">{service.price}</span>
                      <span className="text-xs font-bold text-blue-700 uppercase">TND</span>
                    </div>
                    <Link to={`/book/${ownerId?._id}`}>
                      <button className="flex items-center gap-1.5 text-[11px] font-black text-blue-700 uppercase tracking-widest hover:gap-3 transition-all">
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-blue-700 hover:bg-blue-600 text-white font-black rounded-xl uppercase tracking-widest text-xs shadow-xl shadow-blue-700/25 transition-all"
              >
                <Calendar size={16} />
                Schedule Your Consultation
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 4. ABOUT / DOCTOR SECTION ─── */}
      {about?.show && (
        <section id="about" className="py-32 bg-[#f0f4ff]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: Doctor Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-blue-900/15">
                  <img
                    src={
                      about.image ||
                      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"
                    }
                    className="w-full h-full object-cover"
                    alt="Medical professional"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent" />
                </div>

                {/* Floating credential card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-slate-100 max-w-[220px]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                      <Award size={14} className="text-white" />
                    </div>
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wide">Certified</span>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={12} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold">Trusted by 2,000+ patients</p>
                </motion.div>

                {/* Blue accent line decoration */}
                <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-blue-700 rounded-2xl opacity-30" />
              </motion.div>

              {/* Right: Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="space-y-8"
              >
                <div>
                  <p className="text-[11px] font-black text-blue-700 uppercase tracking-[0.5em] mb-4 flex items-center gap-2">
                    <span className="w-8 h-px bg-blue-700 inline-block" />
                    About Our Practice
                  </p>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                    {about.title || "Medicine Built on Trust"}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-lg font-medium">
                    {about.text ||
                      "We believe that quality healthcare should be accessible, personal, and compassionate. Our team of board-certified physicians brings decades of combined experience to every patient interaction, ensuring you receive the highest standard of medical care."}
                  </p>
                </div>

                {/* Credentials / Bullet Points */}
                <div className="space-y-4 pt-2">
                  {highlights.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i + 0.3 }}
                      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm"
                    >
                      <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                        <Check size={14} className="text-blue-700 font-black" strokeWidth={3} />
                      </div>
                      <span className="text-slate-700 font-semibold text-sm">{point}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  {[
                    { value: "15+", label: "Years Experience" },
                    { value: "98%", label: "Patient Satisfaction" },
                    { value: "2K+", label: "Patients Served" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="text-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm"
                    >
                      <div className="text-2xl font-black text-blue-700 mb-1">{stat.value}</div>
                      <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wide leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Link to={`/book/${ownerId?._id}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-2 inline-flex items-center gap-3 px-8 py-4 bg-blue-700 hover:bg-blue-600 text-white font-black rounded-xl uppercase tracking-widest text-xs shadow-lg shadow-blue-700/25 transition-all"
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

      {/* ─── 5. GALLERY SECTION ─── */}
      {gallery?.show && gallery?.images?.length > 0 && (
        <section id="gallery" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-16">
              <p className="text-[11px] font-black text-blue-700 uppercase tracking-[0.5em] mb-4 flex items-center justify-center gap-2">
                <span className="w-8 h-px bg-blue-700 inline-block" />
                Our Clinic
                <span className="w-8 h-px bg-blue-700 inline-block" />
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                A Look Inside Our Facility
              </h2>
              <p className="text-slate-500 mt-4 max-w-xl mx-auto text-base font-medium">
                Designed for patient comfort and clinical excellence — every detail matters.
              </p>
            </div>

            {/* Masonry-style Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.images.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setLightboxImg(img)}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer group bg-slate-100 shadow-sm hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 ${
                    i === 0 ? "col-span-2 row-span-2" : ""
                  } ${i === 5 ? "col-span-2" : ""}`}
                  style={{ aspectRatio: i === 0 ? "1 / 1" : i === 5 ? "2 / 1" : "1 / 1" }}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt={`Clinic ${i + 1}`}
                  />
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/25 transition-all duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <ChevronRight size={18} className="text-blue-700" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
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

      {/* ─── 6. FOOTER & CONTACT ─── */}
      <footer id="contact" className="bg-[#0f172a] text-white pt-0 pb-12">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-teal-400 to-blue-700" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Top Footer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 pt-16 pb-16 border-b border-white/10">

            {/* Col 1: Brand + Contact */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center font-black text-lg text-white">
                    {ownerId?.businessName?.charAt(0) || "H"}
                  </div>
                  <div>
                    <span className="font-black text-white text-base block leading-tight">
                      {ownerId?.businessName || "HealthCare Clinic"}
                    </span>
                    <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                      Medical Center
                    </span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mt-4">
                  Providing compassionate, world-class medical care to our community since day one.
                </p>
              </div>

              <div className="space-y-4">
                {contact?.address && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-700/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={14} className="text-blue-400" />
                    </div>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">{contact.address}</p>
                  </div>
                )}
                {contact?.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-700/20 rounded-lg flex items-center justify-center shrink-0">
                      <Phone size={14} className="text-blue-400" />
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-white font-black text-lg hover:text-blue-400 transition-colors"
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
                    className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white transition-all border border-white/10"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon size={16} />
                  </a>
                )}
                {contact?.socials?.facebook && (
                  <a
                    href={contact.socials.facebook}
                    className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white transition-all border border-white/10"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon size={16} />
                  </a>
                )}
                {contact?.socials?.tiktok && (
                  <a
                    href={contact.socials.tiktok}
                    className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white transition-all border border-white/10"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TikTokIcon size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Col 2: Business Hours */}
            <div className="space-y-6">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.4em] flex items-center gap-3">
                <Clock size={14} className="text-blue-400" />
                Clinic Hours
              </h4>
              <div className="space-y-2">
                {businessHours?.map((h, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center py-2.5 border-b text-sm transition-colors ${
                      h.isClosed
                        ? "border-white/5 opacity-50"
                        : "border-white/5 hover:border-blue-700/40"
                    }`}
                  >
                    <span className="font-semibold text-slate-400 w-28">{h.day}</span>
                    <span
                      className={`font-black text-right ${
                        h.isClosed ? "text-rose-400 text-xs uppercase tracking-widest" : "text-white"
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
              <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-8 space-y-6 border border-blue-600/40 shadow-2xl shadow-blue-900/50">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Calendar size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-white mb-2 leading-tight">
                    Ready to See a Doctor?
                  </h4>
                  <p className="text-blue-200 text-sm font-medium leading-relaxed">
                    Skip the waiting room. Book your appointment online in under a minute.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link to={`/book/${ownerId?._id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-4 bg-white hover:bg-blue-50 text-blue-700 font-black rounded-xl uppercase tracking-widest text-xs shadow-lg transition-all"
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

                {/* Trust micro-badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Secure", "Confidential", "Instant Confirmation"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-blue-100 uppercase tracking-wider"
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
              <span className="text-slate-400">{ownerId?.businessName || "HealthCare Clinic"}</span>
              {" "}— All rights reserved.
            </p>
            <p className="font-semibold tracking-wider uppercase text-[10px]">
              Digital Experience by{" "}
              <span className="text-blue-500 font-black">Bookiify</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HealthMedicalTheme;
