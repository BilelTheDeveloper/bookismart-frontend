import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  TrendingUp,
  Calendar,
  Shield,
  Award,
  ChevronRight,
  BarChart2,
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
 * FINANCIAL ADVISOR THEME — "WEALTH AXIS"
 * Dark forest green + rich gold. Premium wealth management brand.
 */
const FinancialAdvisorTheme = ({ data }) => {
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
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Performance", href: "#performance" },
    { name: "Contact", href: "#contact" },
  ];

  const defaultServices = [
    {
      title: "Portfolio Review",
      description: "Comprehensive analysis of your current holdings with rebalancing strategy.",
      duration: "90 min",
      price: 350,
      active: true,
    },
    {
      title: "Investment Strategy",
      description: "Custom multi-asset allocation tailored to your risk profile and goals.",
      duration: "120 min",
      price: 500,
      active: true,
    },
    {
      title: "Retirement Planning",
      description: "Long-horizon wealth projection with tax-efficient retirement roadmap.",
      duration: "120 min",
      price: 450,
      active: true,
    },
    {
      title: "Tax Optimisation",
      description: "Legal tax minimisation strategies across income, capital gains and estates.",
      duration: "90 min",
      price: 400,
      active: true,
    },
    {
      title: "Estate Planning",
      description: "Structured wealth transfer planning with fiduciary protection.",
      duration: "120 min",
      price: 600,
      active: true,
    },
    {
      title: "Business Finance",
      description: "Corporate treasury management, M&A advisory and growth capital strategy.",
      duration: "180 min",
      price: 800,
      active: true,
    },
  ];

  const displayServices = services?.filter((s) => s.active).length
    ? services.filter((s) => s.active)
    : defaultServices;

  const serviceIcons = [TrendingUp, BarChart2, Shield, Briefcase, Award, Briefcase];

  const performanceStats = [
    { label: "Assets Under Management", value: "€50M+", sub: "across client portfolios" },
    { label: "Satisfied Clients", value: "200+", sub: "private & institutional" },
    { label: "Years of Experience", value: "15", sub: "in wealth management" },
    { label: "Certified Financial Planner", value: "CFP®", sub: "CFA® Charterholder" },
  ];

  return (
    <div
      className="text-white font-sans selection:bg-amber-600/30 overflow-x-hidden"
      style={{ backgroundColor: "#042f2e" }}
    >
      {/* ─── 1. GLASS NAVBAR ─── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-4 backdrop-blur-xl border-b border-amber-600/10"
            : "py-7 bg-transparent"
        }`}
        style={
          isScrolled
            ? { backgroundColor: "rgba(4,47,46,0.92)" }
            : {}
        }
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg shadow-lg"
              style={{ backgroundColor: "#d97706", color: "#042f2e" }}
            >
              {ownerId?.businessName?.charAt(0) || "W"}
            </div>
            <span className="text-lg font-black tracking-tight uppercase text-white">
              {ownerId?.businessName || "Wealth Axis"}
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-300 hover:text-amber-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button
                className="px-7 py-3 text-[10px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95 shadow-lg"
                style={{ backgroundColor: "#d97706", color: "#042f2e" }}
              >
                Schedule a Call
              </button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* ─── MOBILE MENU ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-0 z-[1001] flex flex-col p-10"
            style={{ backgroundColor: "#021a1a" }}
          >
            <div className="flex justify-end mb-14">
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X size={32} className="text-white" />
              </button>
            </div>
            <div className="flex flex-col gap-9 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-black uppercase tracking-tighter border-b pb-5"
                  style={{ borderColor: "rgba(217,119,6,0.15)", color: "#fff" }}
                >
                  {link.name}
                </a>
              ))}
              <Link to={`/book/${ownerId?._id}`} onClick={() => setMobileMenuOpen(false)}>
                <button
                  className="mt-4 w-full py-5 font-black uppercase tracking-widest rounded-2xl text-sm"
                  style={{ backgroundColor: "#d97706", color: "#042f2e" }}
                >
                  Schedule a Portfolio Review
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 2. HERO ─── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              hero?.backgroundImage ||
              "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop"
            })`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(4,47,46,0.96) 0%, rgba(4,47,46,0.80) 50%, rgba(2,24,24,0.95) 100%)",
            }}
          />
        </div>

        {/* Gold gradient left accent bar */}
        <div
          className="absolute left-0 top-0 h-full w-1.5"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #d97706 30%, #d97706 70%, transparent)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          {/* Category badge */}
          <span
            className="inline-block px-5 py-2 mb-10 rounded-full text-[10px] font-black uppercase tracking-[0.5em] border"
            style={{
              borderColor: "rgba(217,119,6,0.45)",
              color: "#d97706",
              backgroundColor: "rgba(217,119,6,0.06)",
            }}
          >
            {data.category || "Financial Advisory"} &bull; {ownerId?.ville || "Tunis"}
          </span>

          {/* Headline */}
          <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.88] tracking-tighter mb-8">
            <span className="text-white">YOUR </span>
            <span style={{ color: "#d97706" }}>WEALTH,</span>
            <br />
            <span className="text-white">EXPERTLY MANAGED.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto mb-14 leading-relaxed opacity-90">
            {hero?.slogan ||
              "Precision-driven strategies. Fiduciary commitment. Your financial future, secured."}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20">
            <Link to={`/book/${ownerId?._id}`}>
              <button
                className="px-12 py-5 font-black uppercase tracking-[0.2em] text-sm rounded-xl transition-all shadow-2xl active:scale-95"
                style={{
                  backgroundColor: "#d97706",
                  color: "#042f2e",
                  boxShadow: "0 20px 50px rgba(217,119,6,0.30)",
                }}
              >
                Schedule a Portfolio Review
              </button>
            </Link>
            <a
              href="#services"
              className="flex items-center gap-2 text-slate-300 font-bold text-sm tracking-widest uppercase hover:text-amber-400 transition-colors"
            >
              Explore Services <ChevronRight size={16} />
            </a>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl"
            style={{ backgroundColor: "rgba(217,119,6,0.15)" }}
          >
            {performanceStats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center py-6 px-4"
                style={{ backgroundColor: "rgba(4,47,46,0.85)" }}
              >
                <span className="text-2xl md:text-3xl font-black" style={{ color: "#d97706" }}>
                  {stat.value}
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 mt-1 text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── 3. SERVICES ─── */}
      <section id="services" className="py-32 px-6" style={{ backgroundColor: "#042f2e" }}>
        <div className="max-w-7xl mx-auto">
          {/* Section heading */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div>
              <p
                className="text-[10px] font-black uppercase tracking-[0.5em] mb-4"
                style={{ color: "#d97706" }}
              >
                What We Offer
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white">
                Advisory
                <br />
                Services
              </h2>
            </div>
            <p
              className="text-slate-400 font-medium text-lg border-l-4 pl-6 max-w-xs leading-relaxed"
              style={{ borderColor: "#d97706" }}
            >
              Every engagement begins with a confidential discovery session — no obligation.
            </p>
          </div>

          {/* Service cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service, idx) => {
              const Icon = serviceIcons[idx % serviceIcons.length] || TrendingUp;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(217,119,6,0.18)" }}
                  onHoverStart={() => setActiveService(idx)}
                  onHoverEnd={() => setActiveService(null)}
                  className="relative rounded-2xl p-8 border-l-4 cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(3,35,35,0.85)",
                    borderLeftColor: "#d97706",
                    borderTop: "1px solid rgba(217,119,6,0.10)",
                    borderRight: "1px solid rgba(217,119,6,0.06)",
                    borderBottom: "1px solid rgba(217,119,6,0.06)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: "rgba(217,119,6,0.12)" }}
                  >
                    <Icon size={22} style={{ color: "#d97706" }} />
                  </div>

                  {/* Index */}
                  <span
                    className="text-[10px] font-black uppercase tracking-widest mb-3 block"
                    style={{ color: "rgba(217,119,6,0.55)" }}
                  >
                    0{idx + 1}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-black uppercase tracking-tight text-white mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Duration + Price */}
                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "rgba(217,119,6,0.12)" }}>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                      <Clock size={13} /> {service.duration || "60 min"}
                    </span>
                    <span className="text-xl font-black text-white">
                      {service.price}{" "}
                      <small className="text-xs font-black" style={{ color: "#d97706" }}>
                        TND
                      </small>
                    </span>
                  </div>

                  {/* Gold hover glow overlay */}
                  <AnimatePresence>
                    {activeService === idx && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(ellipse at top left, rgba(217,119,6,0.07) 0%, transparent 70%)",
                        }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* CTA below services */}
          <div className="text-center mt-16">
            <Link to={`/book/${ownerId?._id}`}>
              <button
                className="px-12 py-5 font-black uppercase tracking-widest text-xs rounded-xl transition-all active:scale-95"
                style={{ backgroundColor: "#d97706", color: "#042f2e" }}
              >
                Book a Service Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 4. PERFORMANCE STRIP ─── */}
      <section
        id="performance"
        className="py-20 px-6"
        style={{
          background:
            "linear-gradient(90deg, #021a1a 0%, #053d3c 50%, #021a1a 100%)",
          borderTop: "1px solid rgba(217,119,6,0.18)",
          borderBottom: "1px solid rgba(217,119,6,0.18)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left label */}
            <div className="text-center lg:text-left">
              <p
                className="text-[10px] font-black uppercase tracking-[0.5em] mb-3"
                style={{ color: "#d97706" }}
              >
                Track Record
              </p>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                Consistent
                <br />
                Outperformance
              </h3>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-16 text-center">
              {[
                {
                  label: "Avg. Client Portfolio Growth",
                  value: "+23%",
                  note: "5-year annualised (2019–2024)",
                },
                {
                  label: "Risk-Adjusted Return (Sharpe)",
                  value: "1.84",
                  note: "vs. benchmark 0.97",
                },
                {
                  label: "Client Retention Rate",
                  value: "96%",
                  note: "year-over-year",
                },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center"
                >
                  <span
                    className="text-4xl md:text-5xl font-black mb-2"
                    style={{ color: "#d97706" }}
                  >
                    {m.value}
                  </span>
                  <span className="text-xs font-black uppercase tracking-widest text-white mb-1">
                    {m.label}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">{m.note}</span>
                </motion.div>
              ))}
            </div>

            {/* Trending icon accent */}
            <div
              className="hidden lg:flex w-20 h-20 rounded-2xl items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(217,119,6,0.10)" }}
            >
              <TrendingUp size={36} style={{ color: "#d97706" }} />
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-10 text-[10px] text-slate-600 text-center font-medium tracking-wide">
            Past performance is not indicative of future results. All figures are illustrative of
            typical client outcomes and are not a guarantee of returns.
          </p>
        </div>
      </section>

      {/* ─── 5. ABOUT / ADVISOR PROFILE ─── */}
      {about?.show && (
        <section id="about" className="py-32 px-6" style={{ backgroundColor: "#021a1a" }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Portrait with gold frame */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Gold outer frame accent */}
              <div
                className="absolute -inset-3 rounded-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(217,119,6,0.35) 0%, transparent 60%)",
                }}
              />
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
                <img
                  src={
                    about.image ||
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                  }
                  className="w-full h-full object-cover"
                  alt="Financial advisor portrait"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(2,26,26,0.8) 0%, transparent 50%)",
                  }}
                />
              </div>

              {/* Designation badge */}
              <div
                className="absolute bottom-6 left-6 right-6 rounded-2xl px-6 py-5 backdrop-blur-md"
                style={{
                  backgroundColor: "rgba(4,47,46,0.90)",
                  border: "1px solid rgba(217,119,6,0.25)",
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shrink-0"
                    style={{ backgroundColor: "#d97706", color: "#042f2e" }}
                  >
                    CFP
                  </div>
                  <div>
                    <p className="text-white font-black text-sm">
                      {about.advisorName || "Certified Financial Planner"}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      CFP® · CFA® Charterholder · Fiduciary
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-8"
            >
              <div
                className="w-16 h-1 rounded-full"
                style={{ backgroundColor: "#d97706" }}
              />
              <p
                className="text-[10px] font-black uppercase tracking-[0.5em]"
                style={{ color: "#d97706" }}
              >
                Advisor Profile
              </p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                {about.title || "Discipline Builds Dynasties."}
              </h2>

              <p className="text-slate-300 text-lg leading-relaxed font-medium italic border-l-4 pl-6"
                style={{ borderColor: "#d97706" }}
              >
                "{about.philosophy ||
                  "Wealth is built on discipline and vision. Every portfolio I manage is guided by a long-term fiduciary commitment to my clients' best interests — not commissions."}"
              </p>

              <p className="text-slate-400 leading-relaxed">
                {about.text ||
                  "With over 15 years of experience across private banking, institutional asset management and independent advisory, our practice focuses on preserving and growing multi-generational wealth with rigor and transparency."}
              </p>

              {/* Credentials grid */}
              <div className="grid grid-cols-2 gap-6 pt-4">
                {[
                  {
                    icon: Award,
                    title: "Designations",
                    desc: "CFP®, CFA® Charterholder, Series 65 Licensed",
                  },
                  {
                    icon: Briefcase,
                    title: "Prior Firms",
                    desc: "Goldman Sachs Private Wealth, HSBC Global AM",
                  },
                  {
                    icon: Shield,
                    title: "Fiduciary",
                    desc: "100% fee-only. Your interest, always first.",
                  },
                  {
                    icon: TrendingUp,
                    title: "AUM",
                    desc: "€50M+ actively managed across 200+ clients",
                  },
                ].map(({ icon: Icon, title, desc }, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-5"
                    style={{
                      backgroundColor: "rgba(4,47,46,0.6)",
                      border: "1px solid rgba(217,119,6,0.10)",
                    }}
                  >
                    <Icon size={18} className="mb-3" style={{ color: "#d97706" }} />
                    <h5 className="text-white font-black uppercase text-[11px] tracking-widest mb-1">
                      {title}
                    </h5>
                    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <Link to={`/book/${ownerId?._id}`}>
                <button
                  className="mt-4 px-10 py-4 font-black uppercase tracking-widest text-xs rounded-xl transition-all active:scale-95"
                  style={{ backgroundColor: "#d97706", color: "#042f2e" }}
                >
                  Meet for a Discovery Call
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── 6. GALLERY ─── */}
      {gallery?.show && gallery?.images?.length > 0 && (
        <section id="gallery" className="py-32 px-6" style={{ backgroundColor: "#042f2e" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <p
                className="text-[10px] font-black uppercase tracking-[0.5em] mb-4"
                style={{ color: "#d97706" }}
              >
                Our Environment
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
                The Practice
              </h2>
            </div>

            {/* Masonry-style grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.images.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className={`relative overflow-hidden rounded-2xl group ${
                    i === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                  style={{ minHeight: i === 0 ? "420px" : "200px" }}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={`Office ${i + 1}`}
                    style={{ minHeight: "inherit" }}
                  />
                  {/* Gold overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(217,119,6,0.25) 0%, rgba(4,47,46,0.40) 100%)",
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Fallback images if gallery.images is empty-ish */}
            {gallery.images.length === 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2070&auto=format&fit=crop",
                ].map((src, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className={`relative overflow-hidden rounded-2xl group ${
                      i === 0 ? "md:col-span-2" : ""
                    }`}
                    style={{ minHeight: "220px" }}
                  >
                    <img
                      src={src}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={`Office ${i + 1}`}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(217,119,6,0.25) 0%, rgba(4,47,46,0.40) 100%)",
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─── 7. FOOTER ─── */}
      <footer
        id="contact"
        className="pt-24 pb-12"
        style={{
          backgroundColor: "#021a1a",
          borderTop: "3px solid #d97706",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
          {/* Column 1 — Brand + contact */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shadow-lg"
                style={{ backgroundColor: "#d97706", color: "#042f2e" }}
              >
                {ownerId?.businessName?.charAt(0) || "W"}
              </div>
              <div>
                <span className="text-lg font-black uppercase tracking-tight text-white block">
                  {ownerId?.businessName || "Wealth Axis"}
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Financial Advisory
                </span>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <MapPin size={18} className="shrink-0 mt-0.5" style={{ color: "#d97706" }} />
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                  {contact?.address || "Avenue Habib Bourguiba, Tunis 1001"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={18} className="shrink-0" style={{ color: "#d97706" }} />
                <p className="text-xl font-black text-white">{contact?.phone || "+216 XX XXX XXX"}</p>
              </div>
              {contact?.email && (
                <div className="flex items-center gap-4">
                  <span
                    className="text-xs font-black uppercase tracking-widest"
                    style={{ color: "#d97706" }}
                  >
                    @
                  </span>
                  <p className="text-slate-400 font-medium text-sm">{contact.email}</p>
                </div>
              )}
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {contact?.socials?.instagram && (
                <a
                  href={contact.socials.instagram}
                  className="p-3 rounded-full transition-colors text-white"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#d97706")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")
                  }
                >
                  <InstagramIcon size={18} />
                </a>
              )}
              {contact?.socials?.facebook && (
                <a
                  href={contact.socials.facebook}
                  className="p-3 rounded-full transition-colors text-white"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#d97706")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")
                  }
                >
                  <FacebookIcon size={18} />
                </a>
              )}
              {contact?.socials?.tiktok && (
                <a
                  href={contact.socials.tiktok}
                  className="p-3 rounded-full transition-colors text-white"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#d97706")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")
                  }
                >
                  <TikTokIcon size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Column 2 — Business Hours */}
          <div className="space-y-8">
            <h4
              className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3"
              style={{ color: "#d97706" }}
            >
              <Clock size={14} /> Office Hours
            </h4>
            <div className="space-y-3">
              {businessHours?.map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-sm pb-3 border-b"
                  style={{ borderColor: "rgba(217,119,6,0.08)" }}
                >
                  <span
                    className="font-bold"
                    style={{ color: h.isClosed ? "#475569" : "#94a3b8" }}
                  >
                    {h.day}
                  </span>
                  <span
                    className="font-black uppercase text-xs tracking-widest"
                    style={{ color: h.isClosed ? "#ef4444" : "#fff" }}
                  >
                    {h.isClosed ? "Closed" : `${h.open} – ${h.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 — CTA card */}
          <div
            className="rounded-3xl p-10 space-y-6"
            style={{
              border: "1px solid rgba(217,119,6,0.25)",
              background:
                "linear-gradient(135deg, rgba(217,119,6,0.07) 0%, rgba(4,47,46,0.50) 100%)",
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(217,119,6,0.15)" }}
            >
              <Calendar size={28} style={{ color: "#d97706" }} />
            </div>
            <h4 className="text-2xl font-black uppercase tracking-tight text-white">
              Schedule a Portfolio Review
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              A confidential, no-obligation session to assess your current financial position and
              explore how we can grow your wealth together.
            </p>
            <Link to={`/book/${ownerId?._id}`}>
              <button
                className="w-full py-5 font-black uppercase tracking-widest text-xs rounded-xl transition-all active:scale-95 shadow-2xl mt-2"
                style={{
                  backgroundColor: "#d97706",
                  color: "#042f2e",
                  boxShadow: "0 12px 35px rgba(217,119,6,0.25)",
                }}
              >
                Book Your Review Now
              </button>
            </Link>
            <p className="text-[10px] text-slate-600 font-medium text-center">
              Fiduciary obligation &bull; 100% confidential &bull; No obligation
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="max-w-7xl mx-auto px-6 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: "rgba(217,119,6,0.12)" }}
        >
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] text-center">
            &copy; 2026 {ownerId?.businessName || "Wealth Axis"} &bull; All rights reserved
          </p>
          <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.3em] text-center">
            Digital Experience by{" "}
            <span style={{ color: "#d97706" }}>Bookiify</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FinancialAdvisorTheme;
