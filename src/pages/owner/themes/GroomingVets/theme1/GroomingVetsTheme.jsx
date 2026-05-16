import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  Calendar,
  Heart,
  ShieldCheck,
  Star,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * CUSTOM SVG ICONS
 */
const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const PawIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <ellipse cx="6" cy="7.5" rx="2" ry="2.5" />
    <ellipse cx="11" cy="5.5" rx="2" ry="2.5" />
    <ellipse cx="16" cy="7.5" rx="2" ry="2.5" />
    <ellipse cx="19.5" cy="11.5" rx="1.5" ry="2" />
    <ellipse cx="4.5" cy="11.5" rx="1.5" ry="2" />
    <path d="M12 22c-3.5 0-7-2.5-7-6 0-2 1-3.5 2.5-4.5S10 10 12 10s3.5.5 4.5 1.5S19 14 19 16c0 3.5-3.5 6-7 6z" />
  </svg>
);

const ScissorsIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);

const StethoscopeIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
    <circle cx="20" cy="10" r="2" />
  </svg>
);

const SyringeIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m18 2 4 4" />
    <path d="m17 7 3-3" />
    <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
    <path d="m9 11 4 4" />
    <path d="m5 19-3 3" />
    <path d="m14 4 6 6" />
  </svg>
);

const BathIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
    <line x1="10" y1="5" x2="8" y2="7" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="7" y1="19" x2="7" y2="21" />
    <line x1="17" y1="19" x2="17" y2="21" />
  </svg>
);

const SERVICE_ICONS = {
  grooming: ScissorsIcon,
  bath: BathIcon,
  vet: StethoscopeIcon,
  vaccine: SyringeIcon,
  default: PawIcon,
};

const getServiceIcon = (title = "") => {
  const t = title.toLowerCase();
  if (t.includes("groom") || t.includes("cut") || t.includes("trim") || t.includes("hair")) return SERVICE_ICONS.grooming;
  if (t.includes("bath") || t.includes("wash") || t.includes("spa")) return SERVICE_ICONS.bath;
  if (t.includes("vet") || t.includes("exam") || t.includes("check") || t.includes("consult")) return SERVICE_ICONS.vet;
  if (t.includes("vaccine") || t.includes("shot") || t.includes("inject")) return SERVICE_ICONS.vaccine;
  return SERVICE_ICONS.default;
};

const FALLBACK_HERO =
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop";
const FALLBACK_ABOUT =
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop";
const FALLBACK_GALLERY = [
  "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560743641-3914f2c45636?q=80&w=800&auto=format&fit=crop",
];

/**
 * 🐾 GROOMING & VETS THEME — "PET CARE HUB" EDITION (2026)
 */
const GroomingVetsTheme = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

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

  const filterTabs = ["All", "Dogs", "Cats"];

  const filteredServices = (services || []).filter((s) => {
    if (!s?.active && s?.active !== undefined) return false;
    if (activeFilter === "All") return true;
    const keywords = activeFilter === "Dogs" ? ["dog", "canine", "puppy"] : ["cat", "feline", "kitten"];
    const haystack = `${s.title} ${s.description}`.toLowerCase();
    return keywords.some((k) => haystack.includes(k));
  });

  const galleryImages =
    gallery?.images?.filter(Boolean).length > 0 ? gallery.images : FALLBACK_GALLERY;

  const trustBadges = [
    { icon: ShieldCheck, label: "Licensed Vet Team" },
    { icon: Heart, label: "Fear-Free Approach" },
    { icon: Star, label: "All Breeds Welcome" },
  ];

  return (
    <div
      className="font-sans overflow-x-hidden"
      style={{ backgroundColor: "#fefef8", color: "#1c1917" }}
    >
      {/* ─── 1. STICKY GLASS NAVBAR ─── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-[#fefef8]/85 backdrop-blur-xl border-b border-stone-200/80 shadow-sm"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md"
              style={{ backgroundColor: "#0d9488" }}
            >
              <PawIcon size={20} className="text-white" />
            </div>
            <span className="text-xl font-black tracking-tight" style={{ color: "#1c1917" }}>
              {ownerId?.businessName || "Pet Care Hub"}
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] font-bold uppercase tracking-[0.25em] transition-colors hover:text-teal-600"
                style={{ color: "#57534e" }}
              >
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button
                className="px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest text-white transition-all active:scale-95 shadow-lg"
                style={{ backgroundColor: "#0d9488" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0f766e")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0d9488")}
              >
                Book Now
              </button>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden"
            style={{ color: "#1c1917" }}
            onClick={() => setMobileMenuOpen(true)}
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
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[1001] flex flex-col p-8"
            style={{ backgroundColor: "#fefef8" }}
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#0d9488" }}>
                  <PawIcon size={18} className="text-white" />
                </div>
                <span className="font-black text-lg" style={{ color: "#1c1917" }}>
                  {ownerId?.businessName || "Pet Care Hub"}
                </span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} style={{ color: "#1c1917" }}>
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-black tracking-tight pb-4 border-b"
                  style={{ color: "#1c1917", borderColor: "#e7e5e4" }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto">
              <Link to={`/book/${ownerId?._id}`} onClick={() => setMobileMenuOpen(false)}>
                <button
                  className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm text-white shadow-xl"
                  style={{ backgroundColor: "#0d9488" }}
                >
                  Book Appointment
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 2. FULL-SCREEN HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${hero?.backgroundImage || FALLBACK_HERO})`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(254,254,248,0.92) 0%, rgba(254,254,248,0.72) 50%, rgba(13,148,136,0.18) 100%)",
            }}
          />
        </div>

        {/* Decorative teal blob */}
        <div
          className="absolute top-32 right-0 w-[520px] h-[520px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ backgroundColor: "#0d9488" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-32"
        >
          {/* Category pill */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.4em] mb-8 border"
            style={{ color: "#0d9488", borderColor: "#0d9488", backgroundColor: "rgba(13,148,136,0.08)" }}
          >
            <PawIcon size={14} />
            {data.category || "Grooming & Veterinary"} {ownerId?.ville ? `• ${ownerId.ville}` : ""}
          </motion.span>

          {/* Headline */}
          <h1
            className="text-5xl md:text-8xl font-black leading-[0.95] tracking-tighter mb-6"
            style={{ color: "#1c1917" }}
          >
            BECAUSE THEY{" "}
            <span
              className="relative inline-block"
              style={{ color: "#0d9488" }}
            >
              DESERVE
              <span
                className="absolute -bottom-1 left-0 right-0 h-1 rounded-full"
                style={{ backgroundColor: "#0d9488", opacity: 0.3 }}
              />
            </span>{" "}
            THE BEST
          </h1>

          <p
            className="text-lg md:text-2xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#78716c" }}
          >
            {hero?.slogan ||
              "Professional grooming and veterinary care your furry family members truly deserve."}
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to={`/book/${ownerId?._id}`}>
              <button
                className="px-10 py-5 rounded-2xl text-white font-black uppercase tracking-widest text-sm shadow-2xl transition-all active:scale-95"
                style={{ backgroundColor: "#0d9488", boxShadow: "0 20px 40px rgba(13,148,136,0.3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0f766e")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0d9488")}
              >
                Book Appointment
              </button>
            </Link>
            {contact?.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-3 px-8 py-5 rounded-2xl font-bold text-sm border-2 transition-all"
                style={{ color: "#1c1917", borderColor: "#d6d3d1", backgroundColor: "transparent" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#0d9488";
                  e.currentTarget.style.color = "#0d9488";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#d6d3d1";
                  e.currentTarget.style.color = "#1c1917";
                }}
              >
                <Phone size={18} style={{ color: "#0d9488" }} />
                {contact.phone}
              </a>
            )}
          </div>

          {/* Trust badges */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold"
                style={{ backgroundColor: "rgba(255,255,255,0.85)", color: "#1c1917", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
              >
                <Icon size={16} style={{ color: "#0d9488" }} />
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: "#a8a29e" }}>
            Scroll
          </span>
          <div className="w-px h-8" style={{ backgroundColor: "#0d9488", opacity: 0.5 }} />
        </motion.div>
      </section>

      {/* ─── 3. SERVICES SECTION ─── */}
      <section id="services" className="py-28 px-6" style={{ backgroundColor: "#fefef8" }}>
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-14">
            <p
              className="text-[11px] font-black uppercase tracking-[0.5em] mb-3"
              style={{ color: "#0d9488" }}
            >
              What We Offer
            </p>
            <h2
              className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-4"
              style={{ color: "#1c1917" }}
            >
              Our Services
            </h2>
            <p className="text-lg font-medium max-w-xl mx-auto" style={{ color: "#78716c" }}>
              Tailored care for every pet, from a quick bath to a full health check-up.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex justify-center gap-3 mb-12">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className="px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-wider transition-all"
                style={
                  activeFilter === tab
                    ? { backgroundColor: "#0d9488", color: "#fff" }
                    : { backgroundColor: "#f5f5f4", color: "#78716c" }
                }
              >
                {tab === "All" ? "🐾 All" : tab === "Dogs" ? "🐶 Dogs" : "🐱 Cats"}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {(filteredServices.length > 0
                ? filteredServices
                : (services || []).filter((s) => s?.active !== false)
              ).map((service, idx) => {
                const ServiceIcon = getServiceIcon(service.title);
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(13,148,136,0.12)" }}
                    className="relative rounded-3xl p-6 flex flex-col gap-4 cursor-default transition-shadow"
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #e7e5e4",
                      borderTopColor: "#0d9488",
                      borderTopWidth: "4px",
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: "rgba(13,148,136,0.1)" }}
                    >
                      <ServiceIcon size={24} style={{ color: "#0d9488" }} />
                    </div>

                    {/* Name */}
                    <h3
                      className="text-xl font-black leading-tight"
                      style={{ color: "#1c1917" }}
                    >
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed flex-1" style={{ color: "#78716c" }}>
                      {service.description}
                    </p>

                    {/* Footer row */}
                    <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "#f5f5f4" }}>
                      {service.duration && (
                        <span
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                          style={{ backgroundColor: "#f5f5f4", color: "#57534e" }}
                        >
                          <Clock size={12} />
                          {service.duration}
                        </span>
                      )}
                      <div className="ml-auto text-right">
                        <span
                          className="text-2xl font-black"
                          style={{ color: "#0d9488" }}
                        >
                          {service.price}
                        </span>
                        <span className="text-xs font-bold ml-1" style={{ color: "#a8a29e" }}>
                          TND
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA */}
          <div className="text-center mt-14">
            <Link to={`/book/${ownerId?._id}`}>
              <button
                className="px-10 py-4 rounded-2xl text-white font-black uppercase tracking-widest text-sm shadow-lg transition-all active:scale-95"
                style={{ backgroundColor: "#0d9488" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0f766e")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0d9488")}
              >
                Book a Service
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 4. ABOUT SECTION ─── */}
      {about?.show && (
        <section id="about" className="py-28 px-6" style={{ backgroundColor: "#f5f5f0" }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative group overflow-hidden rounded-3xl"
              style={{ minHeight: 460 }}
            >
              <img
                src={about?.image || FALLBACK_ABOUT}
                alt="Our team"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                style={{ minHeight: 460 }}
              />
              {/* Warm overlay */}
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-10 transition-opacity duration-700"
                style={{ background: "linear-gradient(135deg, #0d9488, #f59e0b)" }}
              />
              {/* Stats strip */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6 flex gap-6"
                style={{ background: "linear-gradient(to top, rgba(28,25,23,0.85), transparent)" }}
              >
                {[
                  { value: "10+", label: "Yrs Practice" },
                  { value: "5K+", label: "Animals Cared" },
                  { value: "100%", label: "Fear-Free" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-white">
                    <div className="text-2xl font-black" style={{ color: "#99f6e4" }}>{value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div>
                <p
                  className="text-[11px] font-black uppercase tracking-[0.5em] mb-3"
                  style={{ color: "#0d9488" }}
                >
                  Our Story
                </p>
                <h2
                  className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95]"
                  style={{ color: "#1c1917" }}
                >
                  {about?.title || "We Are Pet People Too."}
                </h2>
              </div>

              <p
                className="text-lg leading-relaxed font-medium"
                style={{ color: "#78716c" }}
              >
                {about?.text ||
                  "Founded by a passionate team of veterinarians and certified groomers, our mission is simple — every pet that walks through our door leaves feeling loved, healthy, and looking their absolute best. We believe in fear-free handling and personalized care for every breed and every age."}
              </p>

              <div className="grid grid-cols-2 gap-6 pt-2">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Licensed & Certified",
                    text: "Our entire team holds professional certifications and undergoes continuous training.",
                  },
                  {
                    icon: Heart,
                    title: "Fear-Free Certified",
                    text: "We use gentle, compassionate techniques proven to reduce anxiety in animals.",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="p-5 rounded-2xl"
                    style={{ backgroundColor: "#fff", border: "1px solid #e7e5e4" }}
                  >
                    <Icon size={22} style={{ color: "#0d9488" }} className="mb-3" />
                    <h4 className="font-black text-sm mb-1" style={{ color: "#1c1917" }}>
                      {title}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "#a8a29e" }}>
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <Link to={`/book/${ownerId?._id}`}>
                <button
                  className="px-8 py-4 rounded-2xl text-white font-black uppercase tracking-widest text-sm transition-all active:scale-95 shadow-lg mt-2"
                  style={{ backgroundColor: "#0d9488" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0f766e")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0d9488")}
                >
                  Meet the Team
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── 5. GALLERY SECTION ─── */}
      {gallery?.show && galleryImages.length > 0 && (
        <section id="gallery" className="py-28 px-6" style={{ backgroundColor: "#fefef8" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p
                className="text-[11px] font-black uppercase tracking-[0.5em] mb-3"
                style={{ color: "#0d9488" }}
              >
                Happy Patients
              </p>
              <h2
                className="text-4xl md:text-6xl font-black tracking-tighter"
                style={{ color: "#1c1917" }}
              >
                Our Gallery
              </h2>
            </div>

            {/* Masonry-style grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.slice(0, 6).map((img, i) => (
                <motion.div
                  key={i}
                  className={`relative group overflow-hidden rounded-3xl ${
                    i === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                  style={{ minHeight: i === 0 ? 400 : 200 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={img}
                    alt={`Pet ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ minHeight: i === 0 ? 400 : 200 }}
                  />
                  {/* Teal hover overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ backgroundColor: "rgba(13,148,136,0.65)" }}
                  >
                    <Heart size={36} className="text-white drop-shadow-lg" fill="white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 6. RICH FOOTER ─── */}
      <footer
        id="contact"
        className="pt-24 pb-10"
        style={{ backgroundColor: "#1c1917", color: "#d6d3d1" }}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16 mb-16">

          {/* Brand + contact */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "#0d9488" }}
              >
                <PawIcon size={22} className="text-white" />
              </div>
              <div>
                <h4 className="font-black text-xl text-white leading-tight">
                  {ownerId?.businessName || "Pet Care Hub"}
                </h4>
                <p className="text-xs" style={{ color: "#78716c" }}>
                  Grooming & Veterinary Care
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {contact?.address && (
                <div className="flex items-start gap-3">
                  <MapPin size={16} style={{ color: "#0d9488" }} className="shrink-0 mt-1" />
                  <p className="text-sm leading-relaxed">{contact.address}</p>
                </div>
              )}
              {contact?.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={16} style={{ color: "#0d9488" }} className="shrink-0" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-xl font-black text-white hover:text-teal-400 transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              )}
              {/* Emergency line */}
              {contact?.emergencyPhone && (
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ backgroundColor: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)" }}
                >
                  <AlertCircle size={16} className="text-red-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-red-400">
                      24/7 Emergency
                    </p>
                    <a
                      href={`tel:${contact.emergencyPhone}`}
                      className="text-white font-black text-sm"
                    >
                      {contact.emergencyPhone}
                    </a>
                  </div>
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
                  className="p-3 rounded-xl transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0d9488")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)")}
                >
                  <InstagramIcon size={18} className="text-white" />
                </a>
              )}
              {contact?.socials?.facebook && (
                <a
                  href={contact.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0d9488")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)")}
                >
                  <FacebookIcon size={18} className="text-white" />
                </a>
              )}
              {contact?.socials?.tiktok && (
                <a
                  href={contact.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0d9488")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)")}
                >
                  <TikTokIcon size={18} className="text-white" />
                </a>
              )}
            </div>
          </div>

          {/* Business hours */}
          <div className="space-y-8">
            <h4
              className="text-xs font-black uppercase tracking-[0.4em] flex items-center gap-2 text-white"
            >
              <Clock size={14} style={{ color: "#0d9488" }} />
              Opening Hours
            </h4>
            <div className="space-y-3">
              {(businessHours || []).map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <span
                    className="text-sm font-semibold"
                    style={{ color: h.isClosed ? "#57534e" : "#d6d3d1" }}
                  >
                    {h.day}
                  </span>
                  <span
                    className="text-sm font-black"
                    style={{ color: h.isClosed ? "#ef4444" : "#0d9488" }}
                  >
                    {h.isClosed ? "Closed" : `${h.open} – ${h.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Booking CTA box */}
          <div
            className="rounded-3xl p-8 flex flex-col gap-6"
            style={{
              background: "linear-gradient(135deg, rgba(13,148,136,0.15) 0%, rgba(13,148,136,0.05) 100%)",
              border: "1px solid rgba(13,148,136,0.3)",
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(13,148,136,0.2)" }}
            >
              <Calendar size={28} style={{ color: "#0d9488" }} />
            </div>
            <div>
              <h4 className="text-2xl font-black text-white leading-tight mb-2">
                Ready to Pamper Your Pet?
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: "#a8a29e" }}>
                Book in under 60 seconds. Choose your service, pick a time, and we'll handle the rest.
              </p>
            </div>

            <div className="space-y-3">
              {[
                "No waiting room stress",
                "Instant confirmation",
                "Reminders & updates",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "#d6d3d1" }}>
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(13,148,136,0.25)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {item}
                </div>
              ))}
            </div>

            <Link to={`/book/${ownerId?._id}`}>
              <button
                className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm text-white shadow-xl transition-all active:scale-95"
                style={{ backgroundColor: "#0d9488", boxShadow: "0 8px 24px rgba(13,148,136,0.35)" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0f766e")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0d9488")}
              >
                Book Appointment Now
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#57534e" }}>
            &copy; {new Date().getFullYear()} {ownerId?.businessName || "Pet Care Hub"} — All rights reserved
          </p>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#57534e" }}>
            Digital Experience by{" "}
            <span style={{ color: "#0d9488" }}>Bookiify</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GroomingVetsTheme;
