import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  Calendar,
  Heart,
  Star,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────────────────────
   CUSTOM SVG SOCIAL ICONS
───────────────────────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────────────────────
   FLORAL DIVIDER — decorative SVG element
───────────────────────────────────────────────────────────────────────────── */
const FloralDivider = ({ className = "" }) => (
  <svg
    viewBox="0 0 200 30"
    className={`w-40 mx-auto ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="0" y1="15" x2="75" y2="15" stroke="#b45309" strokeWidth="0.8" strokeDasharray="2 3" />
    <circle cx="100" cy="15" r="4" fill="#b45309" opacity="0.6" />
    <circle cx="88" cy="15" r="2" fill="#f43f5e" opacity="0.4" />
    <circle cx="112" cy="15" r="2" fill="#f43f5e" opacity="0.4" />
    <path d="M96 11 Q100 7 104 11 Q100 9 96 11Z" fill="#f43f5e" opacity="0.5" />
    <path d="M96 19 Q100 23 104 19 Q100 21 96 19Z" fill="#f43f5e" opacity="0.5" />
    <line x1="125" y1="15" x2="200" y2="15" stroke="#b45309" strokeWidth="0.8" strokeDasharray="2 3" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────────
   HEART BADGE — decorative package motif
───────────────────────────────────────────────────────────────────────────── */
const HeartBadge = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="#f43f5e" className="inline-block">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────────
   WEDDING PLANNER THEME — "Forever & Co."
───────────────────────────────────────────────────────────────────────────── */
const WeddingPlannerTheme = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGalleryImg, setActiveGalleryImg] = useState(null);

  if (!data) return null;

  const { hero, about, services, gallery, contact, businessHours, ownerId } = data;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Packages", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const trustBadges = [
    { icon: <Star size={16} className="text-amber-700" />, label: "200+ Weddings" },
    { icon: <Heart size={16} className="text-rose-500" />, label: "Full-Service Planning" },
    { icon: <ChevronRight size={16} className="text-amber-700" />, label: "Trusted Vendors Network" },
  ];

  const fallbackHero =
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop";
  const fallbackAbout =
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1974&auto=format&fit=crop";
  const fallbackGallery = [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800&auto=format&fit=crop",
  ];

  const galleryImages =
    gallery?.show && gallery?.images?.length > 0
      ? gallery.images
      : fallbackGallery;

  return (
    <div
      className="font-sans overflow-x-hidden"
      style={{ backgroundColor: "#fdf8f0", color: "#3b2a1a" }}
    >
      {/* ───────────────────────────────────────────────────────────
          1. STICKY GLASS NAVBAR
      ─────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 shadow-lg border-b"
            : "py-6 bg-transparent"
        }`}
        style={
          isScrolled
            ? {
                backgroundColor: "rgba(253,248,240,0.88)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderColor: "rgba(180,83,9,0.15)",
              }
            : {}
        }
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-md"
              style={{ background: "linear-gradient(135deg,#f43f5e,#b45309)" }}
            >
              {ownerId?.businessName?.charAt(0) || "W"}
            </div>
            <div className="leading-tight">
              <span
                className="block text-base font-extrabold tracking-tight"
                style={{ color: "#3b2a1a", fontFamily: "Georgia, serif" }}
              >
                {ownerId?.businessName || "Forever & Co."}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.25em]" style={{ color: "#b45309" }}>
                Wedding Planners
              </span>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] font-bold uppercase tracking-[0.25em] transition-colors hover:text-rose-500"
                style={{ color: "#6b4f3a" }}
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button
                className="px-7 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-white transition-all active:scale-95 shadow-md hover:shadow-lg"
                style={{ background: "linear-gradient(135deg,#f43f5e,#e11d48)" }}
              >
                Begin Journey
              </button>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden"
            style={{ color: "#3b2a1a" }}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* ───────────────────────────────────────────────────────────
          MOBILE MENU — slide from right
      ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-0 z-[1001] flex flex-col p-10"
            style={{ backgroundColor: "#fdf8f0" }}
          >
            <div className="flex justify-end mb-10">
              <button onClick={() => setMobileMenuOpen(false)} style={{ color: "#3b2a1a" }}>
                <X size={30} />
              </button>
            </div>

            {/* Decorative hearts */}
            <div className="text-center mb-8 opacity-30 text-5xl" style={{ color: "#f43f5e" }}>
              ♥
            </div>

            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-extrabold uppercase tracking-widest border-b pb-5 transition-colors hover:text-rose-500"
                  style={{
                    fontFamily: "Georgia, serif",
                    color: "#3b2a1a",
                    borderColor: "rgba(180,83,9,0.15)",
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-auto">
              <Link to={`/book/${ownerId?._id}`}>
                <button
                  className="w-full py-5 rounded-full font-bold uppercase tracking-widest text-sm text-white shadow-lg"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ background: "linear-gradient(135deg,#f43f5e,#e11d48)" }}
                >
                  Begin Your Journey
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────────────────────────────────────────────────────────
          2. FULL-SCREEN HERO
      ─────────────────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${hero?.backgroundImage || fallbackHero})`,
          }}
        >
          {/* Overlay layers */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(253,248,240,0.55) 0%, rgba(253,248,240,0.2) 40%, rgba(244,63,94,0.18) 100%)",
            }}
          />
          {/* Top vignette */}
          <div
            className="absolute top-0 left-0 right-0 h-40"
            style={{
              background: "linear-gradient(to bottom, rgba(253,248,240,0.85), transparent)",
            }}
          />
          {/* Bottom rose gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-56"
            style={{
              background: "linear-gradient(to top, rgba(244,63,94,0.25), transparent)",
            }}
          />
        </div>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          {/* Category pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 text-[10px] font-bold uppercase tracking-[0.4em]"
            style={{
              background: "rgba(253,248,240,0.8)",
              border: "1px solid rgba(180,83,9,0.3)",
              color: "#b45309",
              backdropFilter: "blur(8px)",
            }}
          >
            <HeartBadge />
            {data.category || "Wedding Planners"} · {ownerId?.ville || "Tunisia"}
          </motion.div>

          {/* Main headline */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] mb-7 tracking-tight"
            style={{ fontFamily: "Georgia, serif", color: "#1c1008" }}
          >
            {hero?.title || "YOUR PERFECT DAY,"}
            <span className="block" style={{ color: "#f43f5e" }}>
              {hero?.slogan ? "" : "PERFECTLY PLANNED."}
            </span>
            {hero?.slogan && (
              <span className="block" style={{ color: "#f43f5e" }}>
                {hero.slogan}
              </span>
            )}
          </h1>

          {/* Subtext */}
          <p
            className="text-base md:text-xl font-medium mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#5c3d28" }}
          >
            We transform your vision into an unforgettable celebration — crafting every detail with love,
            elegance, and a touch of magic.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {trustBadges.map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
                style={{
                  background: "rgba(253,248,240,0.85)",
                  border: "1px solid rgba(180,83,9,0.25)",
                  color: "#3b2a1a",
                  backdropFilter: "blur(6px)",
                }}
              >
                {badge.icon}
                {badge.label}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to={`/book/${ownerId?._id}`}>
              <button
                className="px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-sm text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
                style={{ background: "linear-gradient(135deg,#f43f5e,#e11d48)", boxShadow: "0 12px 40px rgba(244,63,94,0.35)" }}
              >
                Plan My Wedding
              </button>
            </Link>
            <a
              href={`tel:${contact?.phone}`}
              className="flex items-center gap-3 px-8 py-5 rounded-full font-bold text-sm transition-all hover:scale-105"
              style={{
                background: "rgba(253,248,240,0.75)",
                border: "1px solid rgba(180,83,9,0.3)",
                color: "#3b2a1a",
                backdropFilter: "blur(8px)",
              }}
            >
              <Phone size={18} style={{ color: "#f43f5e" }} />
              {contact?.phone || "+216 00 000 000"}
            </a>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-[9px] uppercase tracking-[0.4em]" style={{ color: "#b45309" }}>
            Discover
          </span>
          <div className="w-px h-8" style={{ background: "linear-gradient(to bottom,#b45309,transparent)" }} />
        </motion.div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          3. SERVICES / PACKAGES SECTION
      ─────────────────────────────────────────────────────────── */}
      <section id="services" className="py-32 px-6" style={{ backgroundColor: "#fdf8f0" }}>
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-6">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.45em]"
              style={{ color: "#b45309" }}
            >
              Our Offerings
            </span>
            <h2
              className="text-4xl md:text-6xl font-extrabold mt-3 mb-4 tracking-tight"
              style={{ fontFamily: "Georgia, serif", color: "#1c1008" }}
            >
              Wedding Packages
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#7a5c42" }}>
              From intimate elopements to grand ballroom affairs — every package is tailored to your love story.
            </p>
          </div>
          <FloralDivider className="mb-16" />

          {/* Service cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.filter((s) => s.active).map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8, boxShadow: "0 24px 60px rgba(244,63,94,0.14)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative rounded-3xl overflow-hidden cursor-pointer"
                style={{
                  background: "linear-gradient(160deg,#fff9f5 0%,#fdf0f4 100%)",
                  border: "1px solid rgba(244,63,94,0.12)",
                  boxShadow: "0 4px 24px rgba(180,83,9,0.07)",
                }}
              >
                {/* Gold top accent bar */}
                <div
                  className="h-1 w-full"
                  style={{ background: "linear-gradient(90deg,#b45309,#f43f5e,#b45309)" }}
                />

                <div className="p-8">
                  {/* Heart icon + number */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(244,63,94,0.1)" }}
                    >
                      <Heart size={20} style={{ color: "#f43f5e" }} />
                    </div>
                    <span
                      className="text-xs font-black uppercase tracking-widest"
                      style={{ color: "rgba(180,83,9,0.4)" }}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-extrabold mb-2 group-hover:text-rose-500 transition-colors"
                    style={{ fontFamily: "Georgia, serif", color: "#1c1008" }}
                  >
                    {service.title}
                  </h3>

                  {/* Duration badge */}
                  {service.duration && (
                    <div className="flex items-center gap-1.5 mb-3">
                      <Clock size={12} style={{ color: "#b45309" }} />
                      <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#b45309" }}>
                        {service.duration}
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-8" style={{ color: "#7a5c42" }}>
                    {service.description}
                  </p>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span
                        className="text-2xl font-black"
                        style={{ color: "#1c1008" }}
                      >
                        {service.price}
                      </span>
                      <small className="ml-1.5 text-xs font-bold" style={{ color: "#b45309" }}>
                        TND
                      </small>
                    </div>
                    <Link to={`/book/${ownerId?._id}`}>
                      <button
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white transition-all active:scale-95"
                        style={{ background: "linear-gradient(135deg,#f43f5e,#e11d48)" }}
                      >
                        Book <ChevronRight size={14} />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          4. ABOUT SECTION (conditional)
      ─────────────────────────────────────────────────────────── */}
      {about?.show && (
        <section
          id="about"
          className="py-32 px-6"
          style={{
            background: "linear-gradient(135deg,#fff9f5 0%,#ffeef2 50%,#fff9f5 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Portrait with floral-frame effect */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Decorative rose blobs behind image */}
              <div
                className="absolute -top-6 -left-6 w-48 h-48 rounded-full opacity-20 blur-2xl"
                style={{ background: "#f43f5e" }}
              />
              <div
                className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full opacity-15 blur-2xl"
                style={{ background: "#b45309" }}
              />

              {/* Image with layered border effect */}
              <div
                className="relative rounded-[2.5rem] overflow-hidden"
                style={{
                  boxShadow:
                    "0 0 0 4px rgba(244,63,94,0.12), 0 0 0 8px rgba(180,83,9,0.07), 0 30px 80px rgba(180,83,9,0.12)",
                }}
              >
                <img
                  src={about.image || fallbackAbout}
                  alt="Wedding Planner"
                  className="w-full h-[520px] object-cover"
                />
                {/* Soft gold tint overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top,rgba(180,83,9,0.15),transparent 60%)" }}
                />
              </div>

              {/* Floating stat card */}
              <div
                className="absolute -bottom-8 -right-4 md:-right-10 px-7 py-5 rounded-2xl shadow-2xl"
                style={{
                  background: "linear-gradient(135deg,#f43f5e,#e11d48)",
                  color: "white",
                }}
              >
                <p className="text-3xl font-black">200+</p>
                <p className="text-xs font-bold uppercase tracking-widest opacity-80">Weddings Planned</p>
              </div>
            </motion.div>

            {/* Text column */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <span
                className="text-[10px] font-bold uppercase tracking-[0.45em]"
                style={{ color: "#b45309" }}
              >
                Our Philosophy
              </span>
              <h2
                className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight"
                style={{ fontFamily: "Georgia, serif", color: "#1c1008" }}
              >
                {about.title || "Love is in Every Detail"}
              </h2>

              <FloralDivider className="mx-0" />

              <p
                className="text-lg leading-loose font-medium italic"
                style={{ color: "#7a5c42", borderLeft: "3px solid #f43f5e", paddingLeft: "1.25rem" }}
              >
                "{about.text ||
                  "We believe every couple deserves a wedding that feels unmistakably them — beautifully personal, flawlessly executed, and utterly unforgettable. We pour our hearts into every celebration we create."}"
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                {[
                  { label: "Signature Style", value: "Romantic Luxury" },
                  { label: "Experience", value: "10+ Years" },
                  { label: "Famous Venues", value: "Sofitel, Four Seasons" },
                  { label: "Network", value: "500+ Vendors" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl"
                    style={{
                      background: "rgba(253,248,240,0.8)",
                      border: "1px solid rgba(244,63,94,0.12)",
                    }}
                  >
                    <h6
                      className="text-[10px] font-black uppercase tracking-widest mb-1"
                      style={{ color: "#b45309" }}
                    >
                      {item.label}
                    </h6>
                    <p className="text-sm font-bold" style={{ color: "#1c1008" }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <Link to={`/book/${ownerId?._id}`}>
                <button
                  className="mt-4 flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
                  style={{ background: "linear-gradient(135deg,#f43f5e,#e11d48)" }}
                >
                  <Heart size={16} /> Start Planning Together
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ───────────────────────────────────────────────────────────
          5. GALLERY SECTION (conditional)
      ─────────────────────────────────────────────────────────── */}
      {gallery?.show && galleryImages.length > 0 && (
        <section id="gallery" className="py-32 px-6" style={{ backgroundColor: "#1c0f0a" }}>
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.45em]"
                style={{ color: "#b45309" }}
              >
                Our Portfolio
              </span>
              <h2
                className="text-4xl md:text-6xl font-extrabold mt-3 mb-4 tracking-tight text-white"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Love Stories in Frames
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
                A glimpse of the enchanting weddings we've had the honour of bringing to life.
              </p>
            </div>
            <FloralDivider className="mb-16" />

            {/* Masonry-style grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`relative group overflow-hidden rounded-2xl cursor-pointer ${
                    i % 5 === 0
                      ? "md:col-span-2 md:row-span-2 aspect-square"
                      : "aspect-[4/5]"
                  }`}
                  style={{ background: "#2c1a12" }}
                  onClick={() => setActiveGalleryImg(img)}
                >
                  <img
                    src={img}
                    alt={`Wedding moment ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Rose tint hover overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: "rgba(244,63,94,0.35)" }}
                  >
                    <Heart size={40} fill="white" stroke="none" className="drop-shadow-xl" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {activeGalleryImg && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[2000] flex items-center justify-center p-6"
                style={{ background: "rgba(0,0,0,0.92)" }}
                onClick={() => setActiveGalleryImg(null)}
              >
                <motion.img
                  initial={{ scale: 0.85 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.85 }}
                  src={activeGalleryImg}
                  alt="Gallery"
                  className="max-h-[90vh] max-w-full rounded-2xl shadow-2xl object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  className="absolute top-6 right-6 text-white opacity-70 hover:opacity-100 transition-opacity"
                  onClick={() => setActiveGalleryImg(null)}
                >
                  <X size={32} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* ───────────────────────────────────────────────────────────
          6. RICH FOOTER
      ─────────────────────────────────────────────────────────── */}
      <footer
        id="contact"
        className="pt-28 pb-12"
        style={{ background: "linear-gradient(135deg,#1c0f0a 0%,#2d1220 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">

            {/* Column 1 — Brand + Contact */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  style={{ background: "linear-gradient(135deg,#f43f5e,#b45309)" }}
                >
                  {ownerId?.businessName?.charAt(0) || "W"}
                </div>
                <div>
                  <h4
                    className="text-xl font-extrabold text-white tracking-tight"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {ownerId?.businessName || "Forever & Co."}
                  </h4>
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: "#b45309" }}>
                    Wedding Planners
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                Crafting unforgettable weddings across Tunisia with passion, precision, and a touch of magic.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin size={18} style={{ color: "#f43f5e", flexShrink: 0 }} />
                  <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {contact?.address || "Les Berges du Lac, Tunis, Tunisia"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={18} style={{ color: "#f43f5e", flexShrink: 0 }} />
                  <p
                    className="text-xl font-black text-white"
                  >
                    {contact?.phone || "+216 00 000 000"}
                  </p>
                </div>
              </div>

              {/* Social icons */}
              <div className="flex gap-3">
                {contact?.socials?.instagram && (
                  <a
                    href={contact.socials.instagram}
                    className="p-3 rounded-full transition-all hover:scale-110"
                    style={{
                      background: "rgba(244,63,94,0.12)",
                      border: "1px solid rgba(244,63,94,0.2)",
                      color: "#f43f5e",
                    }}
                  >
                    <InstagramIcon size={18} />
                  </a>
                )}
                {contact?.socials?.facebook && (
                  <a
                    href={contact.socials.facebook}
                    className="p-3 rounded-full transition-all hover:scale-110"
                    style={{
                      background: "rgba(244,63,94,0.12)",
                      border: "1px solid rgba(244,63,94,0.2)",
                      color: "#f43f5e",
                    }}
                  >
                    <FacebookIcon size={18} />
                  </a>
                )}
                {contact?.socials?.tiktok && (
                  <a
                    href={contact.socials.tiktok}
                    className="p-3 rounded-full transition-all hover:scale-110"
                    style={{
                      background: "rgba(244,63,94,0.12)",
                      border: "1px solid rgba(244,63,94,0.2)",
                      color: "#f43f5e",
                    }}
                  >
                    <TikTokIcon size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Column 2 — Business Hours */}
            <div className="space-y-8">
              <h5
                className="text-xs font-black uppercase tracking-[0.4em] flex items-center gap-3 text-white"
              >
                <Clock size={16} style={{ color: "#b45309" }} />
                Studio Hours
              </h5>
              <div className="space-y-3">
                {businessHours?.map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2.5 border-b"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: h.isClosed ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.55)" }}
                    >
                      {h.day}
                    </span>
                    <span
                      className="text-sm font-black uppercase tracking-wide"
                      style={{ color: h.isClosed ? "#f43f5e" : "white" }}
                    >
                      {h.isClosed ? "Closed" : `${h.open} – ${h.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3 — "Begin Your Journey" CTA card */}
            <div
              className="rounded-3xl p-10 flex flex-col gap-6"
              style={{
                background: "linear-gradient(160deg,rgba(244,63,94,0.12),rgba(180,83,9,0.08))",
                border: "1px solid rgba(244,63,94,0.2)",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(244,63,94,0.15)" }}
              >
                <Calendar size={28} style={{ color: "#f43f5e" }} />
              </div>

              <div>
                <h4
                  className="text-2xl font-extrabold text-white mb-2 tracking-tight"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Begin Your Journey
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Let's schedule a complimentary consultation and start writing your love story together.
                </p>
              </div>

              <Link to={`/book/${ownerId?._id}`}>
                <button
                  className="w-full py-5 rounded-full font-bold uppercase tracking-widest text-sm text-white transition-all hover:scale-[1.03] active:scale-95 shadow-2xl"
                  style={{
                    background: "linear-gradient(135deg,#f43f5e,#e11d48)",
                    boxShadow: "0 12px 40px rgba(244,63,94,0.35)",
                  }}
                >
                  Book a Consultation
                </button>
              </Link>

              <div
                className="flex items-center justify-center gap-2 text-xs font-bold"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                <Heart size={12} style={{ color: "#f43f5e" }} />
                Free initial consultation — no commitment
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              &copy; 2026 {ownerId?.businessName || "Forever & Co."} · All Rights Reserved
            </p>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: "rgba(180,83,9,0.4)" }}
            >
              Digital Experience by Bookiify
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WeddingPlannerTheme;
