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
  Heart,
  Shield,
  Star,
  Users,
  Leaf,
  MessageCircle,
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
 * MIND & SOUL — MENTAL HEALTH PRACTICE THEME (2026)
 * Designed for psychologists, therapists, counselors, life coaches, wellness centers.
 */
const MentalHealthTheme = ({ data }) => {
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
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const trustBadges = [
    { icon: Shield, label: "Confidential", desc: "Your privacy is sacred" },
    { icon: Heart, label: "Judgment-Free", desc: "A space of total acceptance" },
    { icon: Star, label: "Licensed Therapists", desc: "Certified & experienced" },
  ];

  const stats = [
    { value: "500+", label: "Clients Helped" },
    { value: "8+", label: "Years Practice" },
    { value: "12+", label: "Specializations" },
    { value: "100%", label: "Compassionate Care" },
  ];

  const modalities = ["CBT", "DBT", "EMDR", "Mindfulness", "ACT", "Somatic"];

  return (
    <div
      className="bg-[#f5f3ff] text-[#1e1b4b] font-sans selection:bg-violet-200 overflow-x-hidden"
      style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* 1. GLASS NAVBAR                                                      */}
      {/* ------------------------------------------------------------------ */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-white/80 backdrop-blur-xl border-b border-violet-100 shadow-sm shadow-violet-100"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-violet-700 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-300/40">
              <Leaf size={18} className="text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-bold tracking-tight text-[#1e1b4b]">
                {ownerId?.businessName || "Mind & Soul Therapy"}
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-violet-400">
                Mental Wellness Practice
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 hover:text-violet-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-[11px] font-semibold uppercase tracking-widest rounded-full transition-all shadow-md shadow-violet-300/40 active:scale-95">
                Book a Session
              </button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-violet-700"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* MOBILE MENU — slide from right                                       */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-0 z-[1001] bg-white flex flex-col px-8 py-10"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center">
                  <Leaf size={16} className="text-white" />
                </div>
                <span className="font-bold text-[#1e1b4b] text-base">
                  {ownerId?.businessName || "Mind & Soul"}
                </span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-500">
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-bold text-[#1e1b4b] hover:text-violet-600 transition-colors border-b border-violet-50 pb-4"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-auto">
              <Link to={`/book/${ownerId?._id}`}>
                <button
                  className="w-full py-5 bg-violet-600 text-white font-semibold rounded-2xl uppercase tracking-widest text-sm shadow-lg shadow-violet-300/40"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book a Session
                </button>
              </Link>
              <p className="text-center text-xs text-slate-400 mt-4">
                Confidential • Judgment-Free • Licensed
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------------ */}
      {/* 2. HERO — Full screen soft lavender gradient                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Soft bg image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              hero?.backgroundImage ||
              "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2070&auto=format&fit=crop"
            })`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#ede9fe]/92 via-[#f5f3ff]/85 to-[#f5f3ff]" />
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-100/40 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          {/* Category badge */}
          <span className="inline-flex items-center gap-2 px-5 py-2 mb-8 border border-violet-200 rounded-full text-violet-500 text-[10px] font-semibold uppercase tracking-[0.4em] bg-white/60 backdrop-blur-sm">
            <Leaf size={11} />
            {data.category || "Mental Health Practice"} &bull; {ownerId?.ville || "Your City"}
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-[#1e1b4b] leading-[1.05]">
            {hero?.title || "A Safe Space to\nHeal and Grow"}
          </h1>

          <p className="text-lg md:text-xl text-slate-500 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            {hero?.slogan ||
              "You deserve to feel heard, understood, and supported. We're here to walk alongside you — at your own pace, on your own terms."}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="w-full sm:w-auto px-10 py-5 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-2xl uppercase tracking-[0.15em] text-xs transition-all shadow-xl shadow-violet-300/50 active:scale-95">
                Book Your First Session
              </button>
            </Link>
            <a
              href="#contact"
              className="flex items-center gap-2 text-violet-600 font-semibold text-sm hover:text-violet-800 transition-colors"
            >
              <Phone size={16} />
              <span>{contact?.phone || "Call Us"}</span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
            {trustBadges.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-violet-100 rounded-2xl px-6 py-4 shadow-sm"
              >
                <div className="w-9 h-9 bg-violet-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={17} className="text-violet-500" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#1e1b4b] uppercase tracking-wide">{label}</p>
                  <p className="text-[11px] text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-10 bg-gradient-to-b from-violet-300 to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-violet-300 font-semibold">Explore</span>
        </motion.div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. STATS STRIP                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-white border-y border-violet-50">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-1"
            >
              <p className="text-4xl font-extrabold text-violet-600">{value}</p>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. SERVICES SECTION                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section id="services" className="py-28 px-6 bg-[#f5f3ff]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-[0.45em] mb-3 block">
              Our Offerings
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#1e1b4b] tracking-tight leading-tight mb-4">
              Therapy Services Tailored to You
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Every session is a step toward clarity, resilience, and a life that feels more like yours.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {services.filter((s) => s.active).map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(124,58,237,0.12)" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group bg-white rounded-3xl p-8 border border-violet-100 border-l-4 border-l-violet-500 shadow-sm hover:border-violet-200 transition-all cursor-default"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 bg-violet-50 rounded-2xl flex items-center justify-center group-hover:bg-violet-100 transition-colors">
                    <MessageCircle size={19} className="text-violet-500" />
                  </div>
                  <span className="text-[11px] font-bold text-green-600 uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full">
                    {service.duration ? `${service.duration} min` : "Session"}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#1e1b4b] mb-2 group-hover:text-violet-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {service.description ||
                    "A dedicated, confidential session designed around your unique journey and goals."}
                </p>

                <div className="flex items-end justify-between pt-4 border-t border-violet-50">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-0.5">Starting from</p>
                    <p className="text-2xl font-extrabold text-[#1e1b4b]">
                      {service.price}{" "}
                      <small className="text-violet-500 font-semibold text-xs">TND</small>
                    </p>
                  </div>
                  <Link to={`/book/${ownerId?._id}`}>
                    <button className="flex items-center gap-1 text-violet-600 hover:text-violet-800 font-semibold text-xs uppercase tracking-widest transition-colors">
                      Book <ChevronRight size={14} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. ABOUT SECTION (conditional)                                       */}
      {/* ------------------------------------------------------------------ */}
      {about?.show && (
        <section id="about" className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Portrait side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative group"
            >
              <div className="overflow-hidden rounded-[2.5rem] shadow-xl shadow-violet-200/40">
                <img
                  src={
                    about.image ||
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                  }
                  className="w-full h-[560px] object-cover group-hover:scale-105 transition-transform duration-1000"
                  alt="Therapist"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/30 to-transparent rounded-[2.5rem]" />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg shadow-violet-200/50 border border-violet-50 px-6 py-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <Users size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="font-extrabold text-[#1e1b4b] text-lg leading-none">500+</p>
                  <p className="text-xs text-slate-400 mt-0.5">Lives Transformed</p>
                </div>
              </div>
            </motion.div>

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div>
                <span className="text-[10px] font-bold text-violet-500 uppercase tracking-[0.4em] mb-3 block">
                  About the Practice
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#1e1b4b] tracking-tight leading-tight">
                  {about.title || "You Are Not Alone\non This Journey"}
                </h2>
              </div>

              <p className="text-slate-500 leading-relaxed text-lg">
                {about.text ||
                  "We believe healing is not a destination — it's a deeply human process. Our practice was founded on the belief that every person deserves a compassionate, skilled professional in their corner. We don't offer quick fixes. We offer genuine connection and evidence-based tools to help you navigate life's most difficult chapters."}
              </p>

              {/* Modalities */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Therapy Modalities
                </p>
                <div className="flex flex-wrap gap-2">
                  {modalities.map((m) => (
                    <span
                      key={m}
                      className="px-4 py-2 bg-violet-50 text-violet-700 rounded-full text-xs font-semibold border border-violet-100"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Values */}
              <div className="grid grid-cols-2 gap-5">
                {[
                  { title: "Evidence-Based", desc: "All approaches grounded in current clinical research." },
                  { title: "Client-Led", desc: "Your pace, your goals — we follow your lead always." },
                  { title: "Culturally Sensitive", desc: "Inclusive practice respecting every background." },
                  { title: "Ongoing Support", desc: "We're here between sessions too when you need us." },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1e1b4b]">{title}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-violet-400 italic text-sm font-medium border-l-2 border-violet-200 pl-4">
                "The bravest thing you can do is ask for help. We're ready when you are."
              </p>

              <Link to={`/book/${ownerId?._id}`}>
                <button className="px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-semibold text-sm uppercase tracking-widest transition-all shadow-lg shadow-violet-300/40 active:scale-95">
                  Meet the Team
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 6. GALLERY SECTION (conditional)                                     */}
      {/* ------------------------------------------------------------------ */}
      {gallery?.show && gallery?.images?.length > 0 && (
        <section id="gallery" className="py-28 bg-[#f5f3ff]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-[0.45em] mb-3 block">
                Our Space
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold text-[#1e1b4b] tracking-tight">
                A Place of Calm & Comfort
              </h2>
              <p className="text-slate-400 mt-4 text-lg max-w-xl mx-auto">
                Thoughtfully designed spaces to help you feel safe, grounded, and at ease from the moment you arrive.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.images.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`overflow-hidden rounded-3xl bg-violet-100 shadow-md ${
                    i === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                  style={{ minHeight: i === 0 ? "380px" : "200px" }}
                >
                  <div className="relative w-full h-full group">
                    <img
                      src={img}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt={`Space ${i + 1}`}
                    />
                    <div className="absolute inset-0 bg-violet-600/0 group-hover:bg-violet-600/15 transition-all duration-500 rounded-3xl" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Fallback gallery when no images but section is enabled */}
            {gallery.images.length === 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1170&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1170&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1170&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1170&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1604881991720-f91add269bed?q=80&w=1170&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=1170&auto=format&fit=crop",
                ].map((src, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`overflow-hidden rounded-3xl shadow-md ${i === 0 ? "md:col-span-2" : ""}`}
                    style={{ height: i === 0 ? "340px" : "200px" }}
                  >
                    <div className="relative w-full h-full group">
                      <img
                        src={src}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt={`Therapy space ${i + 1}`}
                      />
                      <div className="absolute inset-0 bg-violet-600/0 group-hover:bg-violet-600/15 transition-all duration-500 rounded-3xl" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 7. FOOTER & CONTACT                                                  */}
      {/* ------------------------------------------------------------------ */}
      <footer
        id="contact"
        className="pt-28 pb-12 bg-gradient-to-b from-[#1e1b4b] to-[#13102e] text-white"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">

          {/* Column 1: Brand + Contact + Socials */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-violet-500/20 border border-violet-400/30 rounded-2xl flex items-center justify-center">
                <Leaf size={18} className="text-violet-300" />
              </div>
              <div>
                <p className="font-bold text-white text-base leading-none">
                  {ownerId?.businessName || "Mind & Soul Therapy"}
                </p>
                <p className="text-[10px] text-violet-400 uppercase tracking-widest mt-0.5">
                  Licensed Practice
                </p>
              </div>
            </div>

            <p className="text-violet-200/70 text-sm leading-relaxed">
              Providing compassionate, evidence-based mental health care to individuals, couples, and groups. You matter. Your healing matters.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-violet-400 shrink-0 mt-0.5" />
                <p className="text-violet-200/80 text-sm">
                  {contact?.address || "123 Serenity Lane, Tunis"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-violet-400 shrink-0" />
                <p className="text-xl font-extrabold text-white">
                  {contact?.phone || "+216 00 000 000"}
                </p>
              </div>
              {contact?.email && (
                <div className="flex items-center gap-3">
                  <MessageCircle size={16} className="text-violet-400 shrink-0" />
                  <p className="text-violet-200/80 text-sm">{contact.email}</p>
                </div>
              )}
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {contact?.socials?.instagram && (
                <a
                  href={contact.socials.instagram}
                  className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-violet-500/20 hover:border-violet-400/30 transition-all text-violet-300"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={18} />
                </a>
              )}
              {contact?.socials?.facebook && (
                <a
                  href={contact.socials.facebook}
                  className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-violet-500/20 hover:border-violet-400/30 transition-all text-violet-300"
                  aria-label="Facebook"
                >
                  <FacebookIcon size={18} />
                </a>
              )}
              {contact?.socials?.tiktok && (
                <a
                  href={contact.socials.tiktok}
                  className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-violet-500/20 hover:border-violet-400/30 transition-all text-violet-300"
                  aria-label="TikTok"
                >
                  <TikTokIcon size={18} />
                </a>
              )}
            </div>

            {/* Crisis line note */}
            <div className="flex items-start gap-3 bg-green-900/20 border border-green-500/20 rounded-2xl p-4">
              <Shield size={16} className="text-green-400 shrink-0 mt-0.5" />
              <p className="text-green-300/80 text-xs leading-relaxed">
                <span className="font-bold text-green-400 block mb-0.5">Crisis Support</span>
                If you are in immediate distress, please contact the national crisis line:{" "}
                <span className="font-bold text-white">3011</span> (24/7, free & confidential)
              </p>
            </div>
          </div>

          {/* Column 2: Business Hours */}
          <div className="space-y-8">
            <h4 className="text-xs font-bold text-violet-300 uppercase tracking-[0.4em] flex items-center gap-2">
              <Clock size={14} /> Practice Hours
            </h4>
            <div className="space-y-3">
              {businessHours?.map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-sm border-b border-white/5 pb-3"
                >
                  <span
                    className={`font-medium ${
                      h.isClosed ? "text-slate-600" : "text-violet-200/80"
                    }`}
                  >
                    {h.day}
                  </span>
                  <span
                    className={`font-bold text-xs uppercase tracking-wide ${
                      h.isClosed
                        ? "text-rose-400"
                        : "text-green-400"
                    }`}
                  >
                    {h.isClosed ? "Closed" : `${h.open} – ${h.close}`}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-violet-500/10 border border-violet-400/20 rounded-2xl p-5">
              <p className="text-violet-300 text-xs font-semibold uppercase tracking-wider mb-2">
                Online Sessions Available
              </p>
              <p className="text-violet-200/60 text-xs leading-relaxed">
                Prefer to connect from the comfort of home? We offer secure video therapy sessions — same quality care, wherever you are.
              </p>
            </div>
          </div>

          {/* Column 3: Booking CTA Box */}
          <div className="bg-white/5 backdrop-blur-sm border border-violet-400/20 rounded-3xl p-8 flex flex-col justify-between space-y-8">
            <div>
              <div className="w-14 h-14 bg-violet-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Calendar size={26} className="text-violet-300" />
              </div>
              <h4 className="text-2xl font-extrabold text-white tracking-tight leading-snug mb-3">
                Take the First Step
              </h4>
              <p className="text-violet-200/70 text-sm leading-relaxed">
                Reaching out is the hardest part — and the most courageous. Let us take care of everything else. Book a session in minutes, completely confidential.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Free 15-min discovery call",
                "Flexible scheduling available",
                "In-person & online options",
                "Sliding scale fees on request",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
                    <Check size={9} className="text-green-400" />
                  </div>
                  <p className="text-violet-200/80 text-sm">{point}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              <Link to={`/book/${ownerId?._id}`}>
                <button className="w-full py-5 bg-violet-500 hover:bg-violet-400 text-white font-semibold rounded-2xl uppercase tracking-widest text-xs transition-all shadow-xl shadow-violet-900/40 active:scale-95">
                  Book a Session Now
                </button>
              </Link>
              <p className="text-center text-violet-400/60 text-[10px] uppercase tracking-widest">
                Confidential &bull; No Judgment &bull; Licensed
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 text-center flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto px-6">
          <p className="text-violet-400/50 text-[10px] font-semibold uppercase tracking-[0.3em]">
            &copy; 2026 {ownerId?.businessName || "Mind & Soul Therapy"} &bull; All Rights Reserved
          </p>
          <p className="text-violet-400/50 text-[10px] font-semibold uppercase tracking-[0.3em]">
            Digital Experience by{" "}
            <span className="text-violet-400">Bookiify</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MentalHealthTheme;
