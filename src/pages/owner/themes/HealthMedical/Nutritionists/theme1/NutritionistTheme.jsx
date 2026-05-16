import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Check,
  Menu,
  X,
  ChevronRight,
  Calendar,
  Leaf,
  Star,
  Award,
  Users,
  Heart,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────
   CUSTOM SVG ICONS
───────────────────────────────────────────────────────────── */
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

/* Nutrition-specific small food icons as SVG */
const AppleIcon = ({ size = 24, className = "" }) => (
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
    <path d="M12 2a4 4 0 0 1 4 4" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
  </svg>
);

const SaladIcon = ({ size = 24, className = "" }) => (
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
    <path d="M2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10" />
    <path d="M12 12V2" />
    <path d="M12 7c1.5-2 4-3 6-2" />
    <path d="M12 10c-2-2-4.5-2-6-1" />
  </svg>
);

const ScaleIcon = ({ size = 24, className = "" }) => (
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
    <path d="M12 3v18" />
    <path d="M3 9l9-6 9 6" />
    <circle cx="6" cy="15" r="3" />
    <circle cx="18" cy="15" r="3" />
    <path d="M3 15h6M15 15h6" />
  </svg>
);

const ClipboardIcon = ({ size = 24, className = "" }) => (
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
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M9 2v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V2" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   SERVICE ICON MAPPER
───────────────────────────────────────────────────────────── */
const serviceIconMap = [AppleIcon, ClipboardIcon, ScaleIcon, SaladIcon, Leaf, Heart, Zap, Award];

/* ─────────────────────────────────────────────────────────────
   🥗 NUTRITIONIST THEME — "NOURISH HUB" (2026)
───────────────────────────────────────────────────────────── */
const NutritionistTheme = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);

  if (!data) return null;

  const { hero, about, services, gallery, contact, businessHours, ownerId } = data;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Programs", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const stats = [
    { value: "200+", label: "Clients Transformed", icon: Users },
    { value: "500+", label: "Meal Plans Created", icon: ClipboardIcon },
    { value: "10+", label: "Years Experience", icon: Award },
    { value: "100%", label: "Holistic Approach", icon: Heart },
  ];

  const trustBadges = [
    "Science-Based Plans",
    "200+ Clients Transformed",
    "Certified Nutritionist",
  ];

  const qualifications = [
    { degree: "BSc Nutrition & Dietetics", institution: "Faculty of Health Sciences" },
    { degree: "MSc Clinical Dietetics", institution: "Postgraduate Institute" },
    { degree: "Certified Health Coach", institution: "International Coaching Federation" },
  ];

  return (
    <div className="bg-white text-gray-800 font-sans selection:bg-green-200 overflow-x-hidden">

      {/* ═══════════════════════════════════════════
          1. STICKY GLASS NAVBAR
      ═══════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-white/90 backdrop-blur-xl shadow-md shadow-green-100/60 border-b border-green-100"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/25">
              <Leaf size={20} className="text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className={`text-lg font-black tracking-tight transition-colors ${
                  isScrolled ? "text-gray-900" : "text-gray-900"
                }`}
              >
                {ownerId?.businessName || "Nourish Hub"}
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-green-600">
                Nutrition & Wellness
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-600 hover:text-green-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-7 py-3 bg-green-600 hover:bg-green-500 text-white text-[11px] font-black uppercase tracking-widest rounded-full transition-all shadow-lg shadow-green-600/30 active:scale-95 hover:shadow-xl hover:shadow-green-600/40">
                Book Free Call
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-700 hover:text-green-600 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          MOBILE MENU — slides from right
      ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1001] bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 z-[1002] bg-white shadow-2xl flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <Leaf size={16} className="text-white" />
                  </div>
                  <span className="font-black text-gray-900">
                    {ownerId?.businessName || "Nourish Hub"}
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center justify-between py-4 border-b border-gray-100 text-gray-700 font-bold text-lg hover:text-green-600 transition-colors group"
                  >
                    {link.name}
                    <ChevronRight
                      size={16}
                      className="text-gray-300 group-hover:text-green-500 transition-colors"
                    />
                  </motion.a>
                ))}
              </div>

              <div className="mt-8">
                <Link to={`/book/${ownerId?._id}`} onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full py-4 bg-green-600 text-white font-black rounded-2xl uppercase tracking-widest text-sm hover:bg-green-500 transition-all shadow-lg shadow-green-600/25">
                    Book Free Discovery Call
                  </button>
                </Link>
                <p className="text-center text-xs text-gray-400 mt-3">
                  No commitment required
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          2. FULL-SCREEN HERO
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${
              hero?.backgroundImage ||
              "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop"
            })`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-green-50/85 to-lime-50/80" />
        </div>

        {/* Decorative green blob */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-green-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-28 pb-20">
          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-200 rounded-full text-green-700 text-[10px] font-black uppercase tracking-[0.4em]">
              <Leaf size={12} />
              {data.category || "Nutrition & Dietetics"} • {ownerId?.ville || "Tunis"}
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[0.92] tracking-tight">
              {hero?.title ? (
                hero.title
              ) : (
                <>
                  NOURISH YOUR BODY.{" "}
                  <span className="text-green-600">TRANSFORM</span> YOUR LIFE.
                </>
              )}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg font-medium">
              {hero?.slogan ||
                "Personalized nutrition plans rooted in science and tailored to your lifestyle. Eat smart. Feel vibrant. Live better."}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {trustBadges.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-green-200 rounded-full shadow-sm"
                >
                  <Check size={13} className="text-green-600 flex-shrink-0" />
                  <span className="text-xs font-bold text-gray-700">{badge}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to={`/book/${ownerId?._id}`}>
                <button className="w-full sm:w-auto px-10 py-5 bg-green-600 hover:bg-green-500 text-white font-black rounded-2xl uppercase tracking-widest text-xs transition-all shadow-xl shadow-green-600/30 hover:shadow-2xl hover:shadow-green-600/40 hover:-translate-y-0.5 active:scale-95">
                  Book Your Free Discovery Call
                </button>
              </Link>
              <a href="#services" className="w-full sm:w-auto">
                <button className="w-full px-10 py-5 bg-white hover:bg-green-50 text-green-700 font-black rounded-2xl uppercase tracking-widest text-xs transition-all border-2 border-green-200 hover:border-green-400">
                  View Programs
                </button>
              </a>
            </div>

            {/* Phone */}
            {contact?.phone && (
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Call us anytime
                  </p>
                  <p className="font-black text-gray-900 text-lg tracking-wide">
                    {contact.phone}
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Hero image card */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-green-900/20">
              <img
                src={
                  hero?.backgroundImage ||
                  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop"
                }
                alt="Healthy food"
                className="w-full h-[560px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl shadow-gray-200/80 border border-green-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <Users size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-900">200+</p>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    Lives Changed
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute -top-4 -right-4 bg-green-600 text-white rounded-2xl px-5 py-3 shadow-lg shadow-green-600/30"
            >
              <div className="flex items-center gap-2">
                <Star size={14} className="fill-white" />
                <span className="font-black text-sm">Certified Expert</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom green gradient strip */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-green-600 to-lime-500" />
      </section>

      {/* ═══════════════════════════════════════════
          3. STATS STRIP
      ═══════════════════════════════════════════ */}
      <section className="bg-green-600 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center mb-1">
                    <Icon size={22} className="text-white" />
                  </div>
                  <p className="text-4xl font-black tracking-tight">{stat.value}</p>
                  <p className="text-green-200 text-xs font-bold uppercase tracking-widest">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. SERVICES / PROGRAMS SECTION
      ═══════════════════════════════════════════ */}
      <section id="services" className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-5">
              Our Programs
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-5">
              Plans Built <span className="text-green-600">For You</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto font-medium">
              Every body is different. Every plan is unique. Science-backed nutrition
              designed around your goals, lifestyle, and preferences.
            </p>
          </div>

          {/* Service cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.filter((s) => s.active).map((service, idx) => {
              const ServiceIcon = serviceIconMap[idx % serviceIconMap.length];
              const isActive = activeService === idx;

              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onHoverStart={() => setActiveService(idx)}
                  onHoverEnd={() => setActiveService(null)}
                  className={`group relative bg-white rounded-3xl p-8 shadow-sm border-2 transition-all duration-300 cursor-default ${
                    isActive
                      ? "border-green-500 shadow-xl shadow-green-100"
                      : "border-transparent hover:border-green-200"
                  }`}
                >
                  {/* Top accent bar */}
                  <div
                    className={`absolute top-0 left-8 right-8 h-0.5 rounded-full transition-all duration-300 ${
                      isActive ? "bg-green-500" : "bg-transparent"
                    }`}
                  />

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                      isActive ? "bg-green-600" : "bg-green-50"
                    }`}
                  >
                    <ServiceIcon
                      size={24}
                      className={`transition-colors ${isActive ? "text-white" : "text-green-600"}`}
                    />
                  </div>

                  {/* Title + index */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-black text-gray-900 group-hover:text-green-700 transition-colors leading-tight pr-2">
                      {service.title}
                    </h3>
                    <span className="text-[10px] font-black text-green-400 uppercase tracking-widest flex-shrink-0 pt-1">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {service.description ||
                      "Personalized nutrition consultation tailored to your unique health goals and dietary needs."}
                  </p>

                  {/* Duration + Price */}
                  <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                    {service.duration && (
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Clock size={14} />
                        <span className="text-xs font-bold">{service.duration}</span>
                      </div>
                    )}
                    <div className="ml-auto text-right">
                      <span className="text-2xl font-black text-gray-900">
                        {service.price}
                      </span>
                      <span className="text-xs font-bold text-green-600 ml-1">TND</span>
                    </div>
                  </div>

                  {/* Book link */}
                  <Link to={`/book/${ownerId?._id}`}>
                    <motion.button
                      whileHover={{ x: 4 }}
                      className="mt-5 w-full py-3 rounded-xl bg-green-50 hover:bg-green-600 text-green-700 hover:text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      Book This Program
                      <ChevronRight
                        size={14}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </motion.button>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-500 mb-5 font-medium">
              Not sure which program is right for you?
            </p>
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-10 py-4 bg-green-600 hover:bg-green-500 text-white font-black rounded-full uppercase tracking-widest text-xs transition-all shadow-lg shadow-green-600/25 hover:shadow-xl">
                Get a Free Discovery Call
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. ABOUT SECTION (conditional)
      ═══════════════════════════════════════════ */}
      {about?.show && (
        <section id="about" className="py-32 px-6 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left: Image with decorative elements */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/80">
                <img
                  src={
                    about.image ||
                    "https://images.unsplash.com/photo-1594488506255-7c7a2b77b6e5?q=80&w=1974&auto=format&fit=crop"
                  }
                  alt="Nutritionist"
                  className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                {/* Green tint overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 via-transparent to-transparent" />

                {/* Credential badge floating bottom-left */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600 mb-3">
                    Qualifications
                  </p>
                  <div className="space-y-2">
                    {qualifications.map((q, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                        <p className="text-xs font-bold text-gray-800">{q.degree}</p>
                        <span className="text-[10px] text-gray-400 ml-auto flex-shrink-0">
                          {q.institution}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative blob */}
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-lime-100 rounded-full -z-10 blur-2xl" />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-green-100 rounded-full -z-10 blur-2xl" />
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-8"
            >
              <div className="w-16 h-1.5 bg-green-500 rounded-full" />
              <span className="block text-[11px] font-black uppercase tracking-[0.4em] text-green-600">
                About Your Nutritionist
              </span>

              <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[0.9]">
                {about.title || (
                  <>
                    Food Is Medicine.{" "}
                    <span className="text-green-600">Science</span> Is the Guide.
                  </>
                )}
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed italic border-l-4 border-green-300 pl-5">
                "{about.text ||
                  "I believe nourishment goes far beyond calories. My approach blends evidence-based dietetics with intuitive eating principles — helping you build a sustainable, joyful relationship with food."}"
              </p>

              {/* Approach pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
                {[
                  {
                    icon: Leaf,
                    title: "Anti-Diet Philosophy",
                    desc: "No restrictions. Just sustainable, balanced choices.",
                  },
                  {
                    icon: Zap,
                    title: "Functional Nutrition",
                    desc: "Root-cause approach to energy and wellness.",
                  },
                  {
                    icon: Heart,
                    title: "Intuitive Eating",
                    desc: "Reconnect with your body's natural hunger cues.",
                  },
                ].map((pillar, i) => {
                  const PillarIcon = pillar.icon;
                  return (
                    <div
                      key={i}
                      className="bg-green-50 rounded-2xl p-5 border border-green-100 hover:border-green-300 hover:shadow-md transition-all"
                    >
                      <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center mb-3">
                        <PillarIcon size={18} className="text-white" />
                      </div>
                      <h5 className="font-black text-gray-900 text-sm mb-1">{pillar.title}</h5>
                      <p className="text-gray-500 text-xs leading-relaxed">{pillar.desc}</p>
                    </div>
                  );
                })}
              </div>

              <Link to={`/book/${ownerId?._id}`}>
                <button className="mt-4 px-10 py-5 bg-green-600 hover:bg-green-500 text-white font-black rounded-2xl uppercase tracking-widest text-xs transition-all shadow-xl shadow-green-600/25 hover:-translate-y-0.5 active:scale-95">
                  Start Your Nutrition Journey
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          6. GALLERY SECTION (conditional, masonry)
      ═══════════════════════════════════════════ */}
      {gallery?.show && gallery?.images?.length > 0 && (
        <section id="gallery" className="py-32 bg-gray-50 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-5">
                Food & Lifestyle
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
                Nourishing <span className="text-green-600">Gallery</span>
              </h2>
              <p className="text-gray-500 mt-4 text-lg max-w-lg mx-auto font-medium">
                Real meals, real transformations, real life — colorful, vibrant, and full of flavor.
              </p>
            </div>

            {/* Masonry grid */}
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {gallery.images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group overflow-hidden rounded-2xl break-inside-avoid mb-4 shadow-sm"
                >
                  <img
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Green tint on hover */}
                  <div className="absolute inset-0 bg-green-600/0 group-hover:bg-green-600/25 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <Leaf size={18} className="text-green-600" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Gallery CTA */}
            <div className="text-center mt-12">
              <Link to={`/book/${ownerId?._id}`}>
                <button className="px-10 py-4 bg-white border-2 border-green-500 text-green-600 hover:bg-green-600 hover:text-white font-black rounded-full uppercase tracking-widest text-xs transition-all shadow-sm hover:shadow-lg hover:shadow-green-600/20">
                  Start Your Transformation
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          7. FOOTER + CONTACT
      ═══════════════════════════════════════════ */}
      <footer id="contact" className="bg-[#14532d] text-white pt-24 pb-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-700/30 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-green-800/40 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">

            {/* Column 1: Brand + Contact */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-900/30">
                  <Leaf size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight">
                    {ownerId?.businessName || "Nourish Hub"}
                  </h3>
                  <p className="text-green-300 text-[10px] font-bold uppercase tracking-widest">
                    Nutrition & Wellness
                  </p>
                </div>
              </div>

              <p className="text-green-200 font-medium leading-relaxed text-sm max-w-xs">
                Helping you build a vibrant, nourished life through personalized nutrition
                and evidence-based wellness strategies.
              </p>

              <div className="space-y-4">
                {contact?.address && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin size={14} className="text-green-300" />
                    </div>
                    <p className="text-green-200 text-sm font-medium">{contact.address}</p>
                  </div>
                )}
                {contact?.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone size={14} className="text-green-300" />
                    </div>
                    <p className="text-white font-black text-lg tracking-wide">{contact.phone}</p>
                  </div>
                )}
              </div>

              {/* Social icons */}
              <div className="flex gap-3 pt-2">
                {contact?.socials?.instagram && (
                  <a
                    href={contact.socials.instagram}
                    className="w-10 h-10 bg-green-700 hover:bg-green-500 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  >
                    <InstagramIcon size={18} />
                  </a>
                )}
                {contact?.socials?.facebook && (
                  <a
                    href={contact.socials.facebook}
                    className="w-10 h-10 bg-green-700 hover:bg-green-500 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  >
                    <FacebookIcon size={18} />
                  </a>
                )}
                {contact?.socials?.tiktok && (
                  <a
                    href={contact.socials.tiktok}
                    className="w-10 h-10 bg-green-700 hover:bg-green-500 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  >
                    <TikTokIcon size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Column 2: Business Hours */}
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-[0.4em] text-green-300 flex items-center gap-2">
                <Clock size={14} />
                Opening Hours
              </h4>
              <div className="space-y-3">
                {businessHours?.map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2.5 border-b border-green-800/60"
                  >
                    <span
                      className={`text-sm font-bold ${
                        h.isClosed ? "text-green-700" : "text-green-200"
                      }`}
                    >
                      {h.day}
                    </span>
                    <span
                      className={`text-sm font-black uppercase tracking-wide ${
                        h.isClosed ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {h.isClosed ? "Closed" : `${h.open} – ${h.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Booking CTA box */}
            <div className="bg-green-500/15 border border-green-500/30 backdrop-blur-sm rounded-3xl p-8 flex flex-col space-y-6">
              <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-900/30">
                <Calendar size={26} className="text-white" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-white tracking-tight leading-tight mb-2">
                  Book Your Free Discovery Call
                </h4>
                <p className="text-green-200 text-sm font-medium leading-relaxed">
                  A 20-minute conversation to understand your goals and see if we're the right fit.
                  No pressure, no commitment — just clarity.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {[
                  "Personalized nutrition roadmap",
                  "No cost, no obligation",
                  "Online or in-person",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2">
                    <Check size={14} className="text-green-400 flex-shrink-0" />
                    <span className="text-green-100 text-xs font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <Link to={`/book/${ownerId?._id}`} className="mt-auto">
                <button className="w-full py-5 bg-white hover:bg-green-50 text-green-700 font-black rounded-2xl uppercase tracking-widest text-xs transition-all shadow-xl shadow-green-900/30 hover:-translate-y-0.5 active:scale-95">
                  Reserve My Free Call
                </button>
              </Link>

              <p className="text-center text-green-400 text-[10px] font-bold">
                Usually responds within 2 hours
              </p>
            </div>
          </div>

          {/* Footer bottom bar */}
          <div className="pt-8 border-t border-green-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-green-600 text-[10px] font-black uppercase tracking-[0.3em]">
              &copy; 2026 {ownerId?.businessName || "Nourish Hub"} — All rights reserved
            </p>
            <p className="text-green-700 text-[10px] font-black uppercase tracking-[0.3em]">
              Digital Experience by{" "}
              <span className="text-green-500 hover:text-green-300 transition-colors cursor-default">
                Bookiify
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NutritionistTheme;
