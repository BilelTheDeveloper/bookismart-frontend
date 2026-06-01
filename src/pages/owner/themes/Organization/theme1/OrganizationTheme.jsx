import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, MapPin, Clock, Menu, X, Calendar, ArrowRight, Star,
  ShieldCheck, Users, Building2, Award, Sparkles, ChevronRight,
  CheckCircle2,
} from "lucide-react";

/* Social icons (lucide v1.8 doesn't export brand icons) */
const Instagram = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const Facebook = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const Linkedin = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);

/**
 * 🏢 ORGANIZATION TEMPLATE — "Enterprise Prestige" (2026)
 *
 * A premium, category-aware multi-section website built for ORGANIZATIONS
 * (clinics, salons, gyms, agencies with a team & multiple locations).
 *
 * Difference vs. the solo templates: a dedicated TEAM section, an org stats
 * strip, a "why us" trust block, and a locations block — all data-driven.
 * Uses the SAME data contract as solo templates + an extra `team` array.
 */

/* ── Per-category accent theming ── */
const ACCENTS = {
  "Beauty & Barbers":  { name: "amber",   from: "#f59e0b", to: "#d97706" },
  "Health & Medical":  { name: "teal",    from: "#14b8a6", to: "#0d9488" },
  "Fitness & Gyms":    { name: "emerald", from: "#10b981", to: "#059669" },
  "Creative & Media":  { name: "violet",  from: "#8b5cf6", to: "#7c3aed" },
  "Car Services":      { name: "red",     from: "#ef4444", to: "#dc2626" },
  "Maintenance":       { name: "orange",  from: "#f97316", to: "#ea580c" },
  "Coaching & Tutors": { name: "indigo",  from: "#6366f1", to: "#4f46e5" },
  "Consultants":       { name: "sky",     from: "#0ea5e9", to: "#0284c7" },
  "Events & DJs":      { name: "fuchsia", from: "#d946ef", to: "#c026d3" },
  "Grooming & Vets":   { name: "cyan",    from: "#06b6d4", to: "#0891b2" },
};
const DEFAULT_ACCENT = { name: "indigo", from: "#6366f1", to: "#7c3aed" };

const OrganizationTheme = ({ data }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!data) return null;

  const {
    hero = {}, about = {}, services = [], gallery = {}, contact = {},
    businessHours = [], team = [], teamSection = {}, ownerId = {}, category,
  } = data;

  const accent = ACCENTS[category] || DEFAULT_ACCENT;
  const gradient = `linear-gradient(135deg, ${accent.from}, ${accent.to})`;
  const orgName = ownerId?.businessName || data?.organization?.name || "Our Organization";
  const bookHref = `/book/${ownerId?._id || ""}`;
  const activeServices = (services || []).filter((s) => s.active !== false);
  const teamMembers = Array.isArray(team) ? team : [];

  const stats = [
    { icon: Award,     value: "10+",  label: "Years Experience" },
    { icon: Users,     value: teamMembers.length > 0 ? `${teamMembers.length}+` : `${data?.organization?.teamSize || "Expert"}`, label: "Expert Team" },
    { icon: Building2, value: data?.organization?.branchCount ? `${data.organization.branchCount}` : "Multi", label: "Locations" },
    { icon: Star,      value: "4.9",  label: "Avg. Rating" },
  ];

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Team", href: "#team" },
    { name: "Visit", href: "#contact" },
  ];

  const BookBtn = ({ className = "", children = "Book Now" }) => (
    <Link to={bookHref}>
      <button
        className={`inline-flex items-center justify-center gap-2 font-black uppercase tracking-widest text-white rounded-full transition-all active:scale-95 shadow-xl ${className}`}
        style={{ background: gradient, boxShadow: `0 16px 40px ${accent.from}40` }}
      >
        {children}
      </button>
    </Link>
  );

  return (
    <div className="bg-[#0a0c12] text-slate-200 font-sans overflow-x-hidden selection:bg-white/20">

      {/* ── NAV ── */}
      <nav className={`fixed top-0 inset-x-0 z-[1000] transition-all duration-500 ${scrolled ? "py-3 bg-[#0a0c12]/85 backdrop-blur-xl border-b border-white/10" : "py-6 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shadow-lg" style={{ background: gradient }}>
              {orgName.charAt(0).toUpperCase()}
            </div>
            <div className="leading-none">
              <span className="block text-base sm:text-lg font-black tracking-tight text-white">{orgName}</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500">Organization</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-9">
            {navLinks.map((l) => (
              <a key={l.name} href={l.href} className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-300 hover:text-white transition-colors">{l.name}</a>
            ))}
            <BookBtn className="px-6 py-2.5 text-[10px]" />
          </div>

          <button className="lg:hidden text-white" onClick={() => setMenuOpen(true)}><Menu size={26} /></button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[1001] bg-[#0a0c12] p-8 flex flex-col lg:hidden">
            <div className="flex justify-end mb-12"><X size={30} className="text-white cursor-pointer" onClick={() => setMenuOpen(false)} /></div>
            <div className="flex flex-col gap-7 text-center">
              {navLinks.map((l) => (
                <a key={l.name} href={l.href} onClick={() => setMenuOpen(false)} className="text-3xl font-black uppercase tracking-tight text-white border-b border-white/10 pb-4">{l.name}</a>
              ))}
              <BookBtn className="px-8 py-4 text-xs mt-4" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-28 pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${hero.backgroundImage || "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"})` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c12]/70 via-[#0a0c12]/85 to-[#0a0c12]" />
          <div className="absolute -top-20 -right-20 w-[28rem] h-[28rem] rounded-full blur-[120px] opacity-30" style={{ background: gradient }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-7 rounded-full border border-white/15 bg-white/5 backdrop-blur text-[10px] font-black uppercase tracking-[0.3em] text-white">
              <Sparkles size={12} style={{ color: accent.from }} /> {category || "Professional"} {ownerId?.ville ? `• ${ownerId.ville}` : ""}
            </span>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.95] mb-6">
              {hero.title || orgName}
            </h1>
            <p className="text-lg sm:text-2xl text-slate-300 font-medium max-w-2xl leading-relaxed mb-10">
              {hero.slogan || "A team of certified professionals delivering excellence across every location. Book your appointment in seconds."}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <BookBtn className="px-10 py-5 text-xs"><Calendar size={16} /> Book an Appointment</BookBtn>
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-3 px-6 py-4 rounded-full border border-white/15 bg-white/5 backdrop-blur text-white font-bold hover:bg-white/10 transition-all">
                  <Phone size={16} style={{ color: accent.from }} /> {contact.phone}
                </a>
              )}
            </div>
          </motion.div>

          {/* Stats strip */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur px-5 py-5">
                  <Icon size={20} style={{ color: accent.from }} />
                  <p className="text-3xl font-black text-white mt-3">{s.value}</p>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mt-0.5">{s.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      {about.show !== false && (
        <section id="about" className="py-24 sm:py-32 px-5 sm:px-8 bg-[#0c0e15]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="relative rounded-[2rem] overflow-hidden">
              <img src={about.image || "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"} alt="About" className="w-full h-full object-cover aspect-[4/3]" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${accent.from}20, transparent)` }} />
            </div>
            <div>
              <span className="inline-block w-14 h-1.5 rounded-full mb-6" style={{ background: gradient }} />
              <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white leading-tight mb-6">
                {about.title || "Built on trust & expertise."}
              </h2>
              <p className="text-lg text-slate-400 font-medium leading-relaxed mb-8">
                {about.text || `${orgName} brings together a team of certified professionals under one roof. We combine craft, care, and modern standards to deliver a consistent, premium experience at every visit.`}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: ShieldCheck, t: "Certified", d: "Vetted professionals" },
                  { icon: Users,       t: "A Real Team", d: "Specialists for every need" },
                  { icon: Award,       t: "Premium", d: "Consistent quality" },
                ].map((v, i) => {
                  const Icon = v.icon;
                  return (
                    <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <Icon size={22} style={{ color: accent.from }} />
                      <p className="text-white font-black mt-3">{v.t}</p>
                      <p className="text-slate-500 text-sm mt-1">{v.d}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── SERVICES ── */}
      {activeServices.length > 0 && (
        <section id="services" className="py-24 sm:py-32 px-5 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-[11px] font-black uppercase tracking-[0.4em] mb-4" style={{ color: accent.from }}>What We Offer</h2>
              <h3 className="text-4xl sm:text-6xl font-black tracking-tighter text-white">Our Services</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeServices.map((s, i) => (
                <motion.div key={i} whileHover={{ y: -6 }}
                  className="group relative rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 flex flex-col transition-all hover:border-white/20">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-xl font-black text-white">{s.title}</h4>
                    {s.price && <span className="text-lg font-black whitespace-nowrap" style={{ color: accent.from }}>{s.price} <small className="text-slate-500 text-xs">TND</small></span>}
                  </div>
                  {s.description && <p className="text-slate-400 text-sm mt-3 leading-relaxed flex-1">{s.description}</p>}
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/10">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5"><Clock size={12} /> {s.duration || 30} min</span>
                    <Link to={bookHref} className="text-[11px] font-black uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: accent.from }}>
                      Book <ChevronRight size={13} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TEAM (the organization differentiator) ── */}
      {teamSection.show !== false && teamMembers.length > 0 && (
        <section id="team" className="py-24 sm:py-32 px-5 sm:px-8 bg-[#0c0e15]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-[11px] font-black uppercase tracking-[0.4em] mb-4" style={{ color: accent.from }}>Our People</h2>
              <h3 className="text-4xl sm:text-6xl font-black tracking-tighter text-white">{teamSection.title || "Meet Our Team"}</h3>
              <p className="text-slate-400 font-medium mt-4">{teamSection.subtitle || "The certified experts behind every appointment."}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {teamMembers.map((m, i) => (
                <motion.div key={i} whileHover={{ y: -6 }} className="group rounded-[1.75rem] overflow-hidden border border-white/10 bg-white/[0.03]">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img src={m.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&size=600&background=1e293b&color=fff`} alt={m.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c12] via-transparent to-transparent" />
                    {m.socials && (m.socials.instagram || m.socials.linkedin) && (
                      <div className="absolute top-4 right-4 flex gap-2">
                        {m.socials.instagram && <a href={m.socials.instagram} className="p-2 rounded-full bg-white/10 backdrop-blur text-white hover:bg-white/20"><Instagram size={14} /></a>}
                        {m.socials.linkedin && <a href={m.socials.linkedin} className="p-2 rounded-full bg-white/10 backdrop-blur text-white hover:bg-white/20"><Linkedin size={14} /></a>}
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-lg font-black text-white">{m.name}</p>
                    <p className="text-sm font-bold mt-0.5" style={{ color: accent.from }}>{m.role || "Specialist"}</p>
                    {m.bio && <p className="text-slate-500 text-xs mt-2 leading-relaxed line-clamp-2">{m.bio}</p>}
                    {m.specialties?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {m.specialties.map((sp, si) => (
                          <span key={si} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300">{sp}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── WHY US ── */}
      <section className="py-24 sm:py-32 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto rounded-[2.5rem] border border-white/10 p-8 sm:p-14 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent.from}10, transparent)` }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl sm:text-5xl font-black tracking-tighter text-white leading-tight">Why book with {orgName}?</h3>
              <p className="text-slate-400 font-medium mt-5 text-lg">A modern organization built around your time and trust.</p>
              <BookBtn className="px-8 py-4 text-xs mt-8"><Calendar size={15} /> Reserve Your Spot</BookBtn>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Book online in 30 seconds",
                "Certified, vetted professionals",
                "Consistent quality every visit",
                "Instant confirmation & reminders",
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <CheckCircle2 size={20} style={{ color: accent.from }} className="shrink-0 mt-0.5" />
                  <p className="text-white font-bold text-sm">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      {gallery.show !== false && gallery.images?.length > 0 && (
        <section className="py-24 sm:py-32 px-5 sm:px-8 bg-[#0c0e15]">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-4xl sm:text-6xl font-black tracking-tighter text-white text-center mb-14">Our Work</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {gallery.images.map((img, i) => (
                <div key={i} className={`overflow-hidden rounded-2xl ${i % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                  <img src={img} alt={`Work ${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT / FOOTER ── */}
      <footer id="contact" className="pt-24 pb-12 px-5 sm:px-8 bg-[#07080c] border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Brand + location */}
          <div className="space-y-7">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-white" style={{ background: gradient }}>{orgName.charAt(0)}</div>
              <span className="text-xl font-black text-white">{orgName}</span>
            </div>
            <div className="flex items-start gap-3"><MapPin size={18} style={{ color: accent.from }} className="shrink-0 mt-0.5" /><p className="text-slate-400 font-medium">{contact.address || ownerId?.ville || "Tunisia"}</p></div>
            {contact.phone && <div className="flex items-center gap-3"><Phone size={18} style={{ color: accent.from }} /><p className="text-xl font-black text-white">{contact.phone}</p></div>}
            <div className="flex gap-3">
              {contact.socials?.instagram && <a href={contact.socials.instagram} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"><Instagram size={18} /></a>}
              {contact.socials?.facebook && <a href={contact.socials.facebook} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"><Facebook size={18} /></a>}
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-5">
            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-2"><Clock size={15} style={{ color: accent.from }} /> Opening Hours</h4>
            <div className="space-y-3">
              {(businessHours.length > 0 ? businessHours : [
                { day: "Monday", open: "09:00", close: "19:00" }, { day: "Saturday", open: "09:00", close: "17:00" }, { day: "Sunday", isClosed: true },
              ]).map((h, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                  <span className={h.isClosed ? "text-slate-600" : "text-slate-400 font-bold"}>{h.day}</span>
                  <span className={`font-black ${h.isClosed ? "text-rose-500" : "text-white"}`}>{h.isClosed ? "Closed" : `${h.open} - ${h.close}`}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-[2rem] p-9 border border-white/10" style={{ background: `linear-gradient(135deg, ${accent.from}12, transparent)` }}>
            <Calendar size={36} style={{ color: accent.from }} />
            <h4 className="text-2xl font-black text-white mt-5">Ready to book?</h4>
            <p className="text-slate-400 font-medium mt-2">Reserve with our team online in under a minute.</p>
            <BookBtn className="w-full py-4 text-xs mt-6">Book Appointment Now</BookBtn>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.25em]">© 2026 {orgName} • Powered by Bookiify</p>
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500"><ShieldCheck size={13} style={{ color: accent.from }} /> Bookiify Verified Organization</span>
        </div>
      </footer>
    </div>
  );
};

export default OrganizationTheme;
