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
  BookOpen,
  Briefcase,
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

const ScalesIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3v18M5 21h14M3 7l4 8M17 7l4 8M3 7h18" />
    <path d="M7 15H3M21 15h-4" />
  </svg>
);

/**
 * ⚖️ LEX COUNSEL — LEGAL THEME (Ultra Professional Edition)
 * Business types: Law firms, Lawyers, Attorneys, Legal Consultants, Notaries
 */
const LegalTheme = ({ data }) => {
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
    { name: "Practice Areas", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Cases", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const trustPillars = [
    { label: "20+ Years Experience", icon: <Award size={18} className="text-amber-600" /> },
    { label: "500+ Cases Won", icon: <Shield size={18} className="text-amber-600" /> },
    { label: "Licensed & Certified", icon: <BookOpen size={18} className="text-amber-600" /> },
    { label: "Confidential Consultations", icon: <Briefcase size={18} className="text-amber-600" /> },
  ];

  const activeServices = services?.filter((s) => s.active) || [];

  return (
    <div
      className="bg-[#0a1628] text-[#faf7f0] font-sans selection:bg-amber-700/30 overflow-x-hidden"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* ─────────────────────────────────────────
          1. FIXED GLASS NAVBAR
      ───────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-[#0a1628]/90 backdrop-blur-xl border-b border-amber-700/20 shadow-2xl shadow-black/40"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/40">
              <ScalesIcon size={20} className="text-[#faf7f0]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-black tracking-wider uppercase text-[#faf7f0]">
                {ownerId?.businessName || "Lex Counsel"}
              </span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-amber-600 font-medium">
                Attorneys at Law
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#faf7f0]/70 hover:text-amber-500 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-7 py-3 bg-amber-700 hover:bg-amber-600 text-[#faf7f0] text-[10px] font-black uppercase tracking-widest transition-all duration-300 active:scale-95 border border-amber-600/30">
                Schedule Consultation
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-[#faf7f0]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* ─────────────────────────────────────────
          MOBILE MENU — slide from right
      ───────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-0 z-[1001] bg-[#06101f] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-700 flex items-center justify-center">
                  <ScalesIcon size={18} className="text-[#faf7f0]" />
                </div>
                <span className="text-sm font-black tracking-wider uppercase text-[#faf7f0]">
                  {ownerId?.businessName || "Lex Counsel"}
                </span>
              </div>
              <X
                size={30}
                onClick={() => setMobileMenuOpen(false)}
                className="cursor-pointer text-[#faf7f0]/60 hover:text-amber-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-0">
              {navLinks.map((link, idx) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-black uppercase tracking-tight text-[#faf7f0]/80 hover:text-amber-500 border-b border-[#faf7f0]/5 py-6 transition-colors flex items-center justify-between group"
                >
                  <span>{link.name}</span>
                  <ChevronRight
                    size={20}
                    className="text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>

            <div className="mt-auto">
              <Link to={`/book/${ownerId?._id}`}>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-5 bg-amber-700 text-[#faf7f0] font-black uppercase tracking-widest text-sm border border-amber-600/30"
                >
                  Schedule a Consultation
                </button>
              </Link>
              <p className="text-center text-[#faf7f0]/30 text-xs mt-6 tracking-widest uppercase">
                Justice · Strategy · Results
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────
          2. FULL-SCREEN HERO
      ───────────────────────────────────────── */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              hero?.backgroundImage ||
              "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop"
            })`,
          }}
        >
          {/* Deep navy + subtle gold gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/92 via-[#0a1628]/75 to-[#0a1628]" />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 via-transparent to-amber-900/5" />
        </div>

        {/* Decorative gold top border line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-600 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          {/* Category badge */}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 px-6 py-2 mb-10 border border-amber-600/40 text-amber-500 text-[9px] font-black uppercase tracking-[0.6em] bg-amber-700/5"
          >
            <ScalesIcon size={12} />
            {data.category || "Legal Services"} &bull; {ownerId?.ville || "Tunis"}
          </motion.span>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-8xl font-black mb-6 uppercase tracking-tight text-[#faf7f0] leading-[0.92]">
            {hero?.title ? (
              hero.title
            ) : (
              <>
                Justice.{" "}
                <span className="text-amber-500">Strategy.</span>
                <br />
                Results.
              </>
            )}
          </h1>

          {/* Subtext — area of specialization */}
          <p className="text-base md:text-xl text-[#faf7f0]/60 font-normal mb-4 max-w-2xl mx-auto leading-relaxed tracking-wide">
            {hero?.slogan ||
              "Providing distinguished legal counsel with unwavering commitment to protecting your rights and advancing your interests."}
          </p>

          {/* Thin gold divider */}
          <div className="w-24 h-[1px] bg-amber-600 mx-auto mb-10" />

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="w-full sm:w-auto px-12 py-5 bg-amber-700 hover:bg-amber-600 text-[#faf7f0] font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 shadow-2xl shadow-amber-900/40 border border-amber-600/40 active:scale-95">
                Schedule a Consultation
              </button>
            </Link>
            <a
              href={`tel:${contact?.phone}`}
              className="flex items-center gap-3 text-[#faf7f0]/70 hover:text-amber-500 transition-colors group"
            >
              <div className="w-10 h-10 border border-amber-700/40 flex items-center justify-center group-hover:border-amber-500 transition-colors">
                <Phone size={16} className="text-amber-600 group-hover:text-amber-400" />
              </div>
              <span className="font-bold tracking-wider text-sm">{contact?.phone}</span>
            </a>
          </div>

          {/* Trust Pillars Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex flex-wrap justify-center gap-0 border border-amber-700/20 bg-[#0a1628]/70 backdrop-blur-sm"
          >
            {trustPillars.map((pillar, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 px-8 py-5 ${
                  idx < trustPillars.length - 1
                    ? "border-r border-amber-700/20"
                    : ""
                }`}
              >
                {pillar.icon}
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#faf7f0]/70 whitespace-nowrap">
                  {pillar.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────
          3. PRACTICE AREAS / SERVICES
      ───────────────────────────────────────── */}
      <section id="services" className="py-32 px-6 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <p className="text-[9px] font-black text-amber-600 uppercase tracking-[0.6em] mb-4 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-amber-600 inline-block" />
                Our Expertise
              </p>
              <h2 className="text-5xl md:text-7xl font-black text-[#faf7f0] uppercase tracking-tight leading-none">
                Practice <br />
                <span className="text-amber-500">Areas</span>
              </h2>
            </div>
            <p className="text-[#faf7f0]/40 font-normal text-base border-l-2 border-amber-700 pl-6 max-w-xs leading-relaxed">
              Every case is approached with meticulous preparation, strategic thinking, and an unwavering pursuit of justice.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeServices.map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                onHoverStart={() => setActiveService(idx)}
                onHoverEnd={() => setActiveService(null)}
                className={`relative group border-l-4 border-amber-700 bg-[#0d1e35] p-8 transition-all duration-400 cursor-default ${
                  activeService === idx
                    ? "shadow-2xl shadow-amber-900/30 border-amber-500"
                    : "border-amber-700/60"
                }`}
              >
                {/* Gold glow on hover */}
                <div
                  className={`absolute inset-0 bg-amber-700/5 pointer-events-none transition-opacity duration-400 ${
                    activeService === idx ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Service Number */}
                <span className="text-[9px] font-black text-amber-700/60 uppercase tracking-[0.4em] mb-4 block">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Practice Area Name */}
                <h3 className="text-xl font-black text-[#faf7f0] uppercase tracking-wide mb-3 group-hover:text-amber-400 transition-colors duration-300">
                  {service.title || "Legal Service"}
                </h3>

                {/* Brief Description */}
                <p className="text-[#faf7f0]/45 text-sm leading-relaxed mb-6 font-normal">
                  {service.description ||
                    "Expert legal representation tailored to your unique circumstances with comprehensive case strategy."}
                </p>

                {/* Meta Row: Duration + Fee */}
                <div className="flex items-center justify-between pt-5 border-t border-amber-700/20">
                  {/* Consultation Duration */}
                  <div className="flex items-center gap-2">
                    <Clock size={13} className="text-amber-700" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#faf7f0]/40">
                      {service.duration ? `${service.duration} min` : "60 min session"}
                    </span>
                  </div>

                  {/* Consultation Fee */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-black text-[#faf7f0]">{service.price}</span>
                    <span className="text-[9px] font-black text-amber-600 uppercase tracking-wider">TND</span>
                  </div>
                </div>

                {/* Book CTA on hover */}
                <div
                  className={`mt-4 overflow-hidden transition-all duration-400 ${
                    activeService === idx ? "max-h-12 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <Link to={`/book/${ownerId?._id}`}>
                    <button className="w-full py-3 bg-amber-700 hover:bg-amber-600 text-[#faf7f0] text-[10px] font-black uppercase tracking-widest transition-colors border border-amber-600/30">
                      Book Consultation
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          4. ABOUT — ATTORNEY PROFILE (conditional)
      ───────────────────────────────────────── */}
      {about?.show && (
        <section id="about" className="py-32 bg-[#06101f]">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section label */}
            <div className="flex items-center gap-4 mb-20">
              <div className="h-[1px] w-16 bg-amber-700" />
              <span className="text-[9px] font-black text-amber-600 uppercase tracking-[0.6em]">
                The Firm
              </span>
              <div className="h-[1px] flex-1 bg-amber-700/20" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              {/* Professional Headshot with Gold Frame */}
              <div className="relative">
                {/* Outer gold accent frame */}
                <div className="absolute -top-4 -left-4 w-2/3 h-2/3 border border-amber-700/30 pointer-events-none z-0" />
                <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border border-amber-700/20 pointer-events-none z-0" />

                <div className="relative overflow-hidden z-10 group">
                  <img
                    src={
                      about?.image ||
                      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1974&auto=format&fit=crop"
                    }
                    className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    alt="Attorney"
                  />
                  {/* Gold overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 via-transparent to-transparent" />
                  {/* Gold border accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-700" />
                </div>
              </div>

              {/* Attorney Details */}
              <div className="space-y-8">
                <div>
                  <p className="text-[9px] font-black text-amber-600 uppercase tracking-[0.5em] mb-4">
                    Attorney Profile
                  </p>
                  <h2 className="text-5xl md:text-6xl font-black text-[#faf7f0] uppercase tracking-tight leading-[0.92] mb-6">
                    {about?.title || "Counsel You Can Trust"}
                  </h2>
                  <div className="w-12 h-[2px] bg-amber-700 mb-8" />
                  <p className="text-[#faf7f0]/55 leading-relaxed text-lg font-normal italic">
                    "{about?.text ||
                      "Every client deserves uncompromising legal representation. We combine deep legal expertise with strategic thinking to deliver results that matter."}"
                  </p>
                </div>

                {/* Credentials Grid */}
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="border border-amber-700/20 p-5 bg-[#0a1628]/60">
                    <Award size={20} className="text-amber-700 mb-3" />
                    <h5 className="text-[#faf7f0] font-black uppercase text-[10px] tracking-[0.3em] mb-2">
                      Bar Admission
                    </h5>
                    <p className="text-[#faf7f0]/40 text-xs leading-relaxed">
                      Licensed member of the national bar association with full practice rights.
                    </p>
                  </div>
                  <div className="border border-amber-700/20 p-5 bg-[#0a1628]/60">
                    <BookOpen size={20} className="text-amber-700 mb-3" />
                    <h5 className="text-[#faf7f0] font-black uppercase text-[10px] tracking-[0.3em] mb-2">
                      Education
                    </h5>
                    <p className="text-[#faf7f0]/40 text-xs leading-relaxed">
                      Maître en Droit — Faculté des Sciences Juridiques, Politiques et Sociales.
                    </p>
                  </div>
                  <div className="border border-amber-700/20 p-5 bg-[#0a1628]/60">
                    <Shield size={20} className="text-amber-700 mb-3" />
                    <h5 className="text-[#faf7f0] font-black uppercase text-[10px] tracking-[0.3em] mb-2">
                      Specializations
                    </h5>
                    <p className="text-[#faf7f0]/40 text-xs leading-relaxed">
                      Corporate law, litigation, family law, criminal defense, real estate.
                    </p>
                  </div>
                  <div className="border border-amber-700/20 p-5 bg-[#0a1628]/60">
                    <Briefcase size={20} className="text-amber-700 mb-3" />
                    <h5 className="text-[#faf7f0] font-black uppercase text-[10px] tracking-[0.3em] mb-2">
                      Philosophy
                    </h5>
                    <p className="text-[#faf7f0]/40 text-xs leading-relaxed italic">
                      "Protecting your rights with integrity, strategy, and relentless dedication."
                    </p>
                  </div>
                </div>

                <Link to={`/book/${ownerId?._id}`}>
                  <button className="flex items-center gap-4 px-10 py-4 bg-amber-700 hover:bg-amber-600 text-[#faf7f0] font-black uppercase tracking-widest text-[10px] transition-all duration-300 border border-amber-600/30 mt-4 group">
                    Book a Private Consultation
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────
          5. GALLERY — Office / Library / Cases
      ───────────────────────────────────────── */}
      {gallery?.show && gallery?.images?.length > 0 && (
        <section id="gallery" className="py-32 bg-[#0a1628]">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
              <div>
                <p className="text-[9px] font-black text-amber-600 uppercase tracking-[0.6em] mb-4 flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-amber-600 inline-block" />
                  Our Offices & Chambers
                </p>
                <h2 className="text-5xl md:text-6xl font-black text-[#faf7f0] uppercase tracking-tight leading-none">
                  The <span className="text-amber-500">Firm</span>
                </h2>
              </div>
              <p className="text-[#faf7f0]/35 text-sm max-w-xs leading-relaxed border-l border-amber-700/40 pl-5">
                Distinguished chambers equipped with comprehensive legal resources for exceptional client service.
              </p>
            </div>

            {/* Masonry Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
              {gallery.images.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className={`overflow-hidden bg-[#0d1e35] relative group ${
                    i % 5 === 0
                      ? "col-span-2 row-span-2"
                      : i % 7 === 0
                      ? "row-span-2"
                      : ""
                  }`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    alt={`Gallery ${i + 1}`}
                  />
                  {/* Subtle gold overlay on hover */}
                  <div className="absolute inset-0 bg-amber-700/0 group-hover:bg-amber-700/10 transition-all duration-500" />
                  {/* Bottom gold line */}
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-600 group-hover:w-full transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────
          6. FOOTER — Very dark navy with gold top border
      ───────────────────────────────────────── */}
      <footer id="contact" className="pt-24 pb-12 bg-[#050d1a] border-t-2 border-amber-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">

            {/* Col 1 — Brand & Contact */}
            <div className="space-y-10">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-amber-700 flex items-center justify-center">
                    <ScalesIcon size={20} className="text-[#faf7f0]" />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-base font-black tracking-wider uppercase text-[#faf7f0]">
                      {ownerId?.businessName || "Lex Counsel"}
                    </span>
                    <span className="text-[8px] tracking-[0.35em] uppercase text-amber-600">
                      Attorneys at Law
                    </span>
                  </div>
                </div>
                <p className="text-[#faf7f0]/30 text-sm leading-relaxed max-w-xs font-normal italic mt-4">
                  "Justice. Strategy. Results." — Providing exceptional legal counsel with the highest professional standards.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-5">
                {contact?.address && (
                  <div className="flex items-start gap-4">
                    <MapPin size={16} className="text-amber-700 mt-0.5 shrink-0" />
                    <p className="text-[#faf7f0]/50 text-sm leading-relaxed">{contact.address}</p>
                  </div>
                )}
                {contact?.phone && (
                  <div className="flex items-center gap-4">
                    <Phone size={16} className="text-amber-700 shrink-0" />
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-2xl font-black text-[#faf7f0] tracking-wider hover:text-amber-400 transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                )}
              </div>

              {/* Social Icons */}
              <div className="flex gap-3">
                {contact?.socials?.instagram && (
                  <a
                    href={contact.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 border border-amber-700/30 flex items-center justify-center text-[#faf7f0]/50 hover:border-amber-600 hover:text-amber-500 transition-all duration-300"
                  >
                    <InstagramIcon size={16} />
                  </a>
                )}
                {contact?.socials?.facebook && (
                  <a
                    href={contact.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 border border-amber-700/30 flex items-center justify-center text-[#faf7f0]/50 hover:border-amber-600 hover:text-amber-500 transition-all duration-300"
                  >
                    <FacebookIcon size={16} />
                  </a>
                )}
                {contact?.socials?.tiktok && (
                  <a
                    href={contact.socials.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 border border-amber-700/30 flex items-center justify-center text-[#faf7f0]/50 hover:border-amber-600 hover:text-amber-500 transition-all duration-300"
                  >
                    <TikTokIcon size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Col 2 — Office Hours */}
            <div className="space-y-8">
              <div>
                <h4 className="text-[9px] font-black text-[#faf7f0] uppercase tracking-[0.5em] mb-1 flex items-center gap-3">
                  <Clock size={14} className="text-amber-700" />
                  Office Hours
                </h4>
                <div className="w-full h-[1px] bg-amber-700/20 mt-4 mb-6" />
              </div>
              <div className="space-y-3">
                {businessHours?.map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm py-2 border-b border-[#faf7f0]/5"
                  >
                    <span
                      className={`font-medium tracking-wide ${
                        h.isClosed ? "text-[#faf7f0]/25" : "text-[#faf7f0]/55"
                      }`}
                    >
                      {h.day}
                    </span>
                    <span
                      className={`font-black text-[10px] uppercase tracking-widest ${
                        h.isClosed ? "text-rose-700" : "text-amber-500"
                      }`}
                    >
                      {h.isClosed ? "Closed" : `${h.open} – ${h.close}`}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border border-amber-700/20 p-5 bg-amber-700/5">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-600 mb-2">
                  Emergency Legal Line
                </p>
                <p className="text-[#faf7f0]/40 text-xs leading-relaxed">
                  Urgent matters outside office hours? Contact us for emergency consultation availability.
                </p>
              </div>
            </div>

            {/* Col 3 — Booking CTA Block */}
            <div className="border border-amber-700/30 bg-[#0a1628]/80 p-10 flex flex-col justify-between gap-8">
              <div>
                <Calendar size={36} className="text-amber-700 mb-6" />
                <h4 className="text-3xl font-black text-[#faf7f0] uppercase tracking-tight leading-none mb-4">
                  Schedule a<br />
                  <span className="text-amber-500">Consultation</span>
                </h4>
                <div className="w-10 h-[2px] bg-amber-700 mb-6" />
                <p className="text-[#faf7f0]/40 text-sm leading-relaxed font-normal">
                  Your first step toward justice begins with a confidential consultation. Speak directly with our legal team about your case.
                </p>
              </div>

              <div className="space-y-3">
                <Link to={`/book/${ownerId?._id}`}>
                  <button className="w-full py-5 bg-amber-700 hover:bg-amber-600 text-[#faf7f0] font-black uppercase tracking-widest text-[10px] transition-all duration-300 border border-amber-600/30 shadow-xl shadow-amber-900/20 active:scale-95">
                    Book Consultation Online
                  </button>
                </Link>
                <a href={`tel:${contact?.phone}`}>
                  <button className="w-full py-4 bg-transparent border border-amber-700/30 hover:border-amber-600 text-amber-500 hover:text-amber-400 font-black uppercase tracking-widest text-[10px] transition-all duration-300 flex items-center justify-center gap-3">
                    <Phone size={13} />
                    Call Directly
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[#faf7f0]/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#faf7f0]/20 text-[9px] font-bold uppercase tracking-[0.4em]">
              &copy; {new Date().getFullYear()} {ownerId?.businessName || "Lex Counsel"} — All Rights Reserved
            </p>
            <div className="flex items-center gap-6">
              <p className="text-[#faf7f0]/15 text-[9px] uppercase tracking-[0.35em]">
                Attorney–Client Confidentiality Guaranteed
              </p>
              <div className="h-3 w-[1px] bg-amber-700/30" />
              <p className="text-[#faf7f0]/15 text-[9px] uppercase tracking-[0.35em]">
                Powered by Bookiify
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LegalTheme;
