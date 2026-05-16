import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  ChevronRight,
  Calendar,
  TrendingUp,
  Award,
  Users,
  ArrowUpRight,
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
 * CONSULTANTS THEME — "ADVISORY EDGE"
 * Premium executive consulting. McKinsey meets luxury brand.
 */
const ConsultantsTheme = ({ data }) => {
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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const trustStats = [
    { value: "50+", label: "Clients Served" },
    { value: "$10M+", label: "Revenue Generated" },
    { value: "15 Yrs", label: "Experience" },
  ];

  const valuePillars = [
    {
      icon: <TrendingUp size={22} className="text-amber-500" />,
      title: "Results-Driven",
      desc: "Every engagement is anchored to measurable KPIs and tangible business outcomes.",
    },
    {
      icon: <Award size={22} className="text-amber-500" />,
      title: "Deep Expertise",
      desc: "Cross-industry mastery built over fifteen years of complex strategic mandates.",
    },
    {
      icon: <Users size={22} className="text-amber-500" />,
      title: "Long-Term Partnership",
      desc: "We don't vanish after the slide deck. We stay until the transformation holds.",
    },
  ];

  return (
    <div className="bg-[#080c12] text-white font-sans selection:bg-amber-600/30 overflow-x-hidden">

      {/* ── 1. GLASS NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-[#080c12]/85 backdrop-blur-2xl border-b border-white/[0.06]"
            : "py-7 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-600 flex items-center justify-center font-black text-white text-base tracking-tight shadow-lg shadow-amber-700/30">
              {ownerId?.businessName?.charAt(0) || "C"}
            </div>
            <span className="text-[15px] font-black tracking-[0.15em] uppercase text-white">
              {ownerId?.businessName || "Consilium"}
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-7 py-2.5 border border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all duration-200 active:scale-95">
                Book Consultation
              </button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-0 z-[1001] bg-[#080c12] flex flex-col px-8 py-10"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-[13px] font-black tracking-[0.2em] uppercase text-amber-500">
                Menu
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={28} className="text-white" />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-5xl font-black uppercase tracking-tighter text-white border-b border-white/[0.06] py-5 hover:text-amber-500 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto">
              <Link to={`/book/${ownerId?._id}`} onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-5 bg-amber-600 text-white font-black uppercase tracking-widest text-xs mt-12">
                  Book a Consultation
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 2. HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              hero?.backgroundImage ||
              "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
            })`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#080c12]/95 via-[#080c12]/80 to-[#0a1628]/95" />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#d97706 1px, transparent 1px), linear-gradient(90deg, #d97706 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 border border-amber-600/40 text-amber-500 text-[9px] font-black uppercase tracking-[0.5em] bg-amber-600/5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              {data.category || "Management Consulting"} &nbsp;•&nbsp; {ownerId?.ville || "Tunis"}
            </span>

            <h1 className="text-6xl md:text-[7.5rem] font-black uppercase tracking-tighter leading-[0.88] text-white mb-8">
              {hero?.title || (
                <>
                  Strategy
                  <br />
                  <span className="text-amber-500">That Wins.</span>
                </>
              )}
            </h1>

            <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mb-14">
              {hero?.slogan ||
                "We translate complexity into clarity and clarity into measurable results. Your competitive edge, engineered."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-24">
              <Link to={`/book/${ownerId?._id}`}>
                <button className="group flex items-center gap-3 px-10 py-5 bg-amber-600 hover:bg-amber-500 text-white font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-200 shadow-2xl shadow-amber-900/30 active:scale-95">
                  Book a Consultation
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </button>
              </Link>
              <a
                href="#services"
                className="flex items-center gap-3 px-10 py-5 border border-white/15 text-slate-300 hover:border-white/40 hover:text-white font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-200"
              >
                View Case Studies
                <ChevronRight size={16} />
              </a>
            </div>

            {/* Trust stats */}
            <div className="flex flex-wrap gap-0 border-t border-white/[0.07] pt-10">
              {trustStats.map((stat, i) => (
                <div
                  key={i}
                  className={`pr-12 ${i > 0 ? "pl-12 border-l border-white/[0.07]" : ""}`}
                >
                  <p className="text-3xl md:text-4xl font-black text-white tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. SERVICES ── */}
      <section id="services" className="py-36 bg-[#080c12]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-8">
            <div>
              <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.5em] mb-5">
                What We Do
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                Our Services
              </h2>
            </div>
            <p className="text-slate-500 text-base font-medium max-w-xs leading-relaxed border-l-2 border-amber-600 pl-6">
              Engagements designed to move the needle — not fill slide decks.
            </p>
          </div>

          {/* Service cards — borderless, typography-led */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-0">
            {services
              .filter((s) => s.active)
              .map((service, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="group border-b border-white/[0.06] py-10 flex justify-between items-start gap-6 cursor-default"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="text-amber-600/60 font-black text-xs tracking-widest tabular-nums">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-amber-400 transition-colors duration-200 uppercase tracking-tight truncate">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed pl-8 mb-4">
                      {service.description}
                    </p>
                    {service.duration && (
                      <p className="pl-8 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] flex items-center gap-2">
                        <Clock size={11} className="text-amber-600/50" />
                        {service.duration}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-2xl font-black text-white tabular-nums">
                        {service.price}
                      </span>
                      <span className="text-amber-500 text-[10px] font-black ml-1">TND</span>
                    </div>
                    <span className="w-8 h-8 flex items-center justify-center border border-white/10 group-hover:border-amber-600 group-hover:bg-amber-600/10 transition-all duration-200">
                      <ArrowUpRight
                        size={14}
                        className="text-slate-600 group-hover:text-amber-400 transition-colors"
                      />
                    </span>
                  </div>
                </motion.div>
              ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="group flex items-center gap-3 px-10 py-4 border border-amber-600/40 text-amber-500 hover:bg-amber-600 hover:text-white font-black uppercase tracking-widest text-[10px] transition-all duration-200">
                Start an Engagement
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. ABOUT ── */}
      {about?.show && (
        <section id="about" className="py-36 bg-[#0a1628]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-28">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[600px]"
              >
                <img
                  src={
                    about.image ||
                    "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop"
                  }
                  alt="Our team"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-[1.02] hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 to-transparent pointer-events-none" />
                {/* Credential badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#080c12]/90 backdrop-blur-md px-6 py-5 border-l-2 border-amber-600">
                  <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.4em] mb-1">
                    Lead Advisor
                  </p>
                  <p className="text-white font-black text-lg tracking-tight">
                    {ownerId?.businessName || "Strategic Advisory Group"}
                  </p>
                  <p className="text-slate-500 text-xs font-medium mt-0.5">
                    MBA &nbsp;·&nbsp; Former McKinsey &nbsp;·&nbsp; Published Author
                  </p>
                </div>
              </motion.div>

              {/* Copy */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="space-y-8"
              >
                <div className="w-12 h-[2px] bg-amber-600" />
                <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.5em]">
                  About the Firm
                </p>
                <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                  {about.title || "Built on Conviction."}
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed font-medium">
                  {about.text ||
                    "We are a boutique strategy firm with the reach of a global practice and the focus of a dedicated partner. Our clients are leaders who refuse to settle — and we exist to give them the unfair advantage they deserve."}
                </p>
                <p className="text-slate-500 text-base leading-relaxed font-medium">
                  Every mandate we take is personal. We embed alongside your team, master your market, and build strategies that outlast the engagement. No generic frameworks. No recycled slide decks. Just sharp thinking and hard execution.
                </p>
              </motion.div>
            </div>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/[0.06]">
              {valuePillars.map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className={`pt-12 pb-4 ${
                    i > 0 ? "md:pl-12 md:border-l border-white/[0.06]" : ""
                  } ${i < 2 ? "md:pr-12" : ""}`}
                >
                  <div className="mb-5">{pillar.icon}</div>
                  <h4 className="text-white font-black text-lg uppercase tracking-tight mb-3">
                    {pillar.title}
                  </h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. GALLERY (WORK) ── */}
      {gallery?.show && gallery?.images?.length > 0 && (
        <section id="gallery" className="py-36 bg-[#080c12]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
              <div>
                <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.5em] mb-5">
                  Our Work
                </p>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                  Case Studies
                </h2>
              </div>
              <p className="text-slate-500 text-sm font-medium max-w-xs leading-relaxed">
                A curated look at the engagements that defined our practice.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gallery.images.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 0.98 }}
                  onClick={() => setLightboxImg(img)}
                  className={`relative overflow-hidden cursor-pointer group bg-[#0a1628] ${
                    i === 0 ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-square"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Work ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                      View Project
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxImg && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxImg(null)}
                className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-md flex items-center justify-center p-8 cursor-zoom-out"
              >
                <button
                  className="absolute top-6 right-6 p-3 border border-white/10 hover:border-white/40 transition-colors"
                  onClick={(e) => { e.stopPropagation(); setLightboxImg(null); }}
                  aria-label="Close lightbox"
                >
                  <X size={22} className="text-white" />
                </button>
                <motion.img
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  src={lightboxImg}
                  alt="Gallery enlarged"
                  className="max-w-5xl max-h-[85vh] w-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* ── 6. FOOTER & CONTACT ── */}
      <footer id="contact" className="bg-[#0a1628]">
        {/* Gold accent line */}
        <div className="h-[2px] bg-gradient-to-r from-amber-600 via-amber-400 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">

            {/* Column 1 — Identity & Contact */}
            <div className="space-y-10">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-amber-600 flex items-center justify-center font-black text-white text-sm">
                    {ownerId?.businessName?.charAt(0) || "C"}
                  </div>
                  <span className="text-white font-black tracking-[0.12em] uppercase text-sm">
                    {ownerId?.businessName || "Consilium Advisory"}
                  </span>
                </div>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  Strategy, management consulting, and corporate transformation for leaders who demand results.
                </p>
              </div>

              <div className="space-y-5">
                {contact?.address && (
                  <div className="flex items-start gap-4">
                    <MapPin size={15} className="text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                      {contact.address}
                    </p>
                  </div>
                )}
                {contact?.phone && (
                  <div className="flex items-center gap-4">
                    <Phone size={15} className="text-amber-600 shrink-0" />
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-white font-black text-xl hover:text-amber-400 transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                )}
                {contact?.email && (
                  <div className="flex items-center gap-4">
                    <span className="text-amber-600 text-xs font-black">@</span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-slate-400 text-sm font-medium hover:text-white transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                )}
              </div>

              {/* Socials */}
              <div className="flex gap-3">
                {contact?.socials?.instagram && (
                  <a
                    href={contact.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-white/[0.08] text-slate-400 hover:border-amber-600 hover:text-amber-400 transition-all duration-200"
                  >
                    <InstagramIcon size={16} />
                  </a>
                )}
                {contact?.socials?.facebook && (
                  <a
                    href={contact.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-white/[0.08] text-slate-400 hover:border-amber-600 hover:text-amber-400 transition-all duration-200"
                  >
                    <FacebookIcon size={16} />
                  </a>
                )}
                {contact?.socials?.tiktok && (
                  <a
                    href={contact.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-white/[0.08] text-slate-400 hover:border-amber-600 hover:text-amber-400 transition-all duration-200"
                  >
                    <TikTokIcon size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Column 2 — Office Hours */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Clock size={14} className="text-amber-600" />
                <h4 className="text-[9px] font-black text-white uppercase tracking-[0.45em]">
                  Office Hours
                </h4>
              </div>
              <div className="space-y-0">
                {businessHours?.map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-3 border-b border-white/[0.05] last:border-0"
                  >
                    <span
                      className={`text-sm font-bold ${
                        h.isClosed ? "text-slate-600" : "text-slate-400"
                      }`}
                    >
                      {h.day}
                    </span>
                    <span
                      className={`text-xs font-black uppercase tracking-wider ${
                        h.isClosed ? "text-slate-600" : "text-white"
                      }`}
                    >
                      {h.isClosed ? "Closed" : `${h.open} – ${h.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3 — Booking CTA */}
            <div className="border border-amber-600/25 p-10 flex flex-col gap-7 relative overflow-hidden">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-600/40" />

              <div>
                <Calendar size={32} className="text-amber-500 mb-5" />
                <h4 className="text-2xl font-black text-white uppercase tracking-tight leading-tight mb-3">
                  Ready to Accelerate?
                </h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  Book a complimentary 30-minute discovery session. No commitment. Just clarity.
                </p>
              </div>

              <div className="space-y-3">
                <Link to={`/book/${ownerId?._id}`}>
                  <button className="group w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-black uppercase tracking-widest text-[10px] transition-all duration-200 flex items-center justify-center gap-3 shadow-xl shadow-amber-900/20">
                    Schedule Consultation
                    <ArrowUpRight
                      size={13}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </button>
                </Link>
                {contact?.phone && (
                  <a href={`tel:${contact.phone}`} className="w-full">
                    <button className="w-full py-4 border border-white/10 hover:border-white/30 text-slate-400 hover:text-white font-black uppercase tracking-widest text-[10px] transition-all duration-200">
                      Call Us Directly
                    </button>
                  </a>
                )}
              </div>

              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600 text-center">
                Response within 24 hours &nbsp;·&nbsp; Confidential
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.35em]">
              &copy; 2026 {ownerId?.businessName || "Consilium Advisory"} &nbsp;·&nbsp; All Rights Reserved
            </p>
            <p className="text-slate-700 text-[9px] font-black uppercase tracking-[0.35em]">
              Powered by Bookiify
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConsultantsTheme;
