import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutTemplate, AlignLeft, Briefcase, Users, Image as ImageIcon,
  Megaphone, Star, Phone, MapPin, Clock, Calendar, ChevronRight,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════════════════
   THEME TOKENS — every section is rendered against these, so a single theme
   { accent, mode } drives the whole site (like Shopify theme settings).
   ════════════════════════════════════════════════════════════════════════ */
export const tokens = (mode = "dark") =>
  mode === "light"
    ? { bg: "#ffffff", bg2: "#f6f7fb", text: "#0b1220", sub: "#5b677a", border: "rgba(11,18,32,0.08)", card: "#ffffff", cardBorder: "rgba(11,18,32,0.08)" }
    : { bg: "#0a0c12", bg2: "#0c0e15", text: "#ffffff", sub: "#94a3b8", border: "rgba(255,255,255,0.10)", card: "rgba(255,255,255,0.035)", cardBorder: "rgba(255,255,255,0.10)" };

const BookButton = ({ ownerId, accent, label = "Book Now", className = "" }) => (
  <Link to={`/book/${ownerId || ""}`}>
    <button
      className={`inline-flex items-center justify-center gap-2 font-black uppercase tracking-widest text-white rounded-full transition-all active:scale-95 ${className}`}
      style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, boxShadow: `0 16px 40px ${accent}40` }}
    >
      <Calendar size={15} /> {label}
    </button>
  </Link>
);

/* ─────────────────────── HERO ─────────────────────── */
const HeroSection = ({ settings = {}, theme, ownerId }) => {
  const t = tokens(theme.mode);
  return (
    <section className="relative min-h-[88vh] flex items-center" style={{ background: t.bg }}>
      <div className="absolute inset-0">
        {settings.image && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${settings.image})` }} />}
        <div className="absolute inset-0" style={{ background: theme.mode === "light" ? "linear-gradient(to right, #ffffffee, #ffffff88)" : "linear-gradient(to bottom, #0a0c12bb, #0a0c12ee)" }} />
        <div className="absolute -top-24 -right-24 w-[26rem] h-[26rem] rounded-full blur-[120px] opacity-30" style={{ background: theme.accent }} />
      </div>
      <div className={`relative z-10 max-w-7xl mx-auto px-6 w-full ${settings.align === "center" ? "text-center" : ""}`}>
        {settings.badge && (
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border text-[10px] font-black uppercase tracking-[0.3em]" style={{ borderColor: t.border, color: t.text, background: theme.mode === "light" ? "#0000000a" : "#ffffff0d" }}>
            <Star size={12} style={{ color: theme.accent }} /> {settings.badge}
          </span>
        )}
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.95] mb-6" style={{ color: t.text, maxWidth: settings.align === "center" ? "none" : "60rem" }}>
          {settings.title || "Your headline goes here"}
        </h1>
        <p className="text-lg sm:text-2xl font-medium max-w-2xl leading-relaxed mb-9" style={{ color: t.sub, marginInline: settings.align === "center" ? "auto" : "0" }}>
          {settings.subtitle || "A clear, compelling sentence about what you do and why clients should book with you."}
        </p>
        <div className={`flex flex-col sm:flex-row gap-4 ${settings.align === "center" ? "justify-center" : ""}`}>
          {settings.showBook !== false && <BookButton ownerId={ownerId} accent={theme.accent} label={settings.bookLabel || "Book an Appointment"} className="px-10 py-5 text-xs" />}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────── ABOUT / RICH TEXT ─────────────────────── */
const AboutSection = ({ settings = {}, theme }) => {
  const t = tokens(theme.mode);
  return (
    <section className="py-24 px-6" style={{ background: t.bg2 }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {settings.image && (
          <div className="rounded-[2rem] overflow-hidden order-2 lg:order-1">
            <img src={settings.image} alt="" className="w-full h-full object-cover aspect-[4/3]" />
          </div>
        )}
        <div className={settings.image ? "order-1 lg:order-2" : "lg:col-span-2 max-w-3xl mx-auto text-center"}>
          <span className="inline-block w-14 h-1.5 rounded-full mb-6" style={{ background: theme.accent, marginInline: settings.image ? "0" : "auto" }} />
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-5" style={{ color: t.text }}>{settings.title || "About us"}</h2>
          <p className="text-lg font-medium leading-relaxed whitespace-pre-line" style={{ color: t.sub }}>
            {settings.text || "Tell your story. What makes your business special, your experience, your values, and why clients keep coming back."}
          </p>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────── SERVICES ─────────────────────── */
const ServicesSection = ({ settings = {}, theme, ownerId }) => {
  const t = tokens(theme.mode);
  const items = settings.items?.length ? settings.items : [{ title: "Service name", description: "Short description", price: "30" }];
  return (
    <section className="py-24 px-6" style={{ background: t.bg }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h3 className="text-[11px] font-black uppercase tracking-[0.4em] mb-3" style={{ color: theme.accent }}>{settings.eyebrow || "What we offer"}</h3>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter" style={{ color: t.text }}>{settings.title || "Our Services"}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((s, i) => (
            <div key={i} className="rounded-[1.5rem] border p-7 flex flex-col" style={{ background: t.card, borderColor: t.cardBorder }}>
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-xl font-black" style={{ color: t.text }}>{s.title}</h4>
                {s.price && <span className="text-lg font-black whitespace-nowrap" style={{ color: theme.accent }}>{s.price} <small style={{ color: t.sub, fontSize: 11 }}>TND</small></span>}
              </div>
              {s.description && <p className="text-sm mt-3 leading-relaxed flex-1" style={{ color: t.sub }}>{s.description}</p>}
              <Link to={`/book/${ownerId || ""}`} className="mt-6 pt-5 border-t flex items-center justify-between text-[11px] font-black uppercase tracking-widest" style={{ borderColor: t.cardBorder, color: theme.accent }}>
                Book <ChevronRight size={13} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────── TEAM ─────────────────────── */
const TeamSection = ({ settings = {}, theme }) => {
  const t = tokens(theme.mode);
  const items = settings.items?.length ? settings.items : [{ name: "Team member", role: "Role" }];
  return (
    <section className="py-24 px-6" style={{ background: t.bg2 }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h3 className="text-[11px] font-black uppercase tracking-[0.4em] mb-3" style={{ color: theme.accent }}>{settings.eyebrow || "Our people"}</h3>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter" style={{ color: t.text }}>{settings.title || "Meet the Team"}</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((m, i) => (
            <div key={i} className="rounded-[1.5rem] overflow-hidden border" style={{ background: t.card, borderColor: t.cardBorder }}>
              <div className="aspect-[3/4] overflow-hidden">
                <img src={m.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name || "Team")}&size=600&background=1e293b&color=fff`} alt={m.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <p className="text-lg font-black" style={{ color: t.text }}>{m.name}</p>
                <p className="text-sm font-bold" style={{ color: theme.accent }}>{m.role || "Specialist"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────── GALLERY ─────────────────────── */
const GallerySection = ({ settings = {}, theme }) => {
  const t = tokens(theme.mode);
  const imgs = (settings.images || []).filter(Boolean);
  return (
    <section className="py-24 px-6" style={{ background: t.bg }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-center mb-12" style={{ color: t.text }}>{settings.title || "Gallery"}</h2>
        {imgs.length === 0 ? (
          <p className="text-center" style={{ color: t.sub }}>Add image URLs to fill the gallery.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {imgs.map((img, i) => (
              <div key={i} className={`overflow-hidden rounded-2xl ${i % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                <img src={img} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

/* ─────────────────────── STATS ─────────────────────── */
const StatsSection = ({ settings = {}, theme }) => {
  const t = tokens(theme.mode);
  const items = settings.items?.length ? settings.items : [{ value: "10+", label: "Years" }, { value: "5k+", label: "Clients" }, { value: "4.9", label: "Rating" }, { value: "12", label: "Experts" }];
  return (
    <section className="py-16 px-6" style={{ background: t.bg2 }}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((s, i) => (
          <div key={i} className="rounded-2xl border p-6 text-center" style={{ background: t.card, borderColor: t.cardBorder }}>
            <p className="text-4xl font-black" style={{ color: theme.accent }}>{s.value}</p>
            <p className="text-[11px] font-bold uppercase tracking-widest mt-1" style={{ color: t.sub }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─────────────────────── CTA ─────────────────────── */
const CTASection = ({ settings = {}, theme, ownerId }) => {
  const t = tokens(theme.mode);
  return (
    <section className="py-24 px-6" style={{ background: t.bg }}>
      <div className="max-w-5xl mx-auto rounded-[2.5rem] border p-10 sm:p-16 text-center" style={{ background: `linear-gradient(135deg, ${theme.accent}14, transparent)`, borderColor: t.cardBorder }}>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-4" style={{ color: t.text }}>{settings.title || "Ready to book?"}</h2>
        <p className="text-lg font-medium mb-9 max-w-xl mx-auto" style={{ color: t.sub }}>{settings.subtitle || "Reserve your spot online in under a minute."}</p>
        <BookButton ownerId={ownerId} accent={theme.accent} label={settings.bookLabel || "Book Now"} className="px-12 py-5 text-xs" />
      </div>
    </section>
  );
};

/* ─────────────────────── CONTACT / HOURS ─────────────────────── */
const ContactSection = ({ settings = {}, theme }) => {
  const t = tokens(theme.mode);
  const hours = settings.hours?.length ? settings.hours : [{ day: "Mon–Fri", value: "09:00 – 19:00" }, { day: "Saturday", value: "09:00 – 17:00" }, { day: "Sunday", value: "Closed" }];
  return (
    <section className="py-24 px-6" style={{ background: t.bg2 }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-6" style={{ color: t.text }}>{settings.title || "Visit us"}</h2>
          <div className="space-y-4">
            {settings.address && <div className="flex items-center gap-3"><MapPin size={18} style={{ color: theme.accent }} /><span style={{ color: t.sub }} className="font-medium">{settings.address}</span></div>}
            {settings.phone && <div className="flex items-center gap-3"><Phone size={18} style={{ color: theme.accent }} /><span style={{ color: t.text }} className="font-black text-lg">{settings.phone}</span></div>}
          </div>
        </div>
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-2 mb-5" style={{ color: t.text }}><Clock size={15} style={{ color: theme.accent }} /> Opening Hours</h4>
          <div className="space-y-3">
            {hours.map((h, i) => (
              <div key={i} className="flex justify-between items-center text-sm pb-2 border-b" style={{ borderColor: t.cardBorder }}>
                <span style={{ color: t.sub }} className="font-bold">{h.day}</span>
                <span style={{ color: /closed/i.test(h.value) ? "#f43f5e" : t.text }} className="font-black">{h.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════════════════════
   SECTION REGISTRY — type → { name, icon, Component, defaultSettings, schema }
   Schema field types: text | textarea | image | toggle | select | repeater
   ════════════════════════════════════════════════════════════════════════ */
export const SECTIONS = {
  hero: {
    name: "Hero", icon: LayoutTemplate, Component: HeroSection,
    defaultSettings: { badge: "Welcome", title: "Premium service, booked in seconds", subtitle: "A clear sentence about what you do and why clients should choose you.", image: "", align: "left", showBook: true, bookLabel: "Book an Appointment" },
    schema: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Headline", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "image", label: "Background image URL", type: "image" },
      { key: "align", label: "Alignment", type: "select", options: ["left", "center"] },
      { key: "showBook", label: "Show Book button", type: "toggle" },
      { key: "bookLabel", label: "Book button text", type: "text" },
    ],
  },
  about: {
    name: "About", icon: AlignLeft, Component: AboutSection,
    defaultSettings: { title: "About us", text: "Tell your story here.", image: "" },
    schema: [
      { key: "title", label: "Title", type: "text" },
      { key: "text", label: "Body text", type: "textarea" },
      { key: "image", label: "Image URL (optional)", type: "image" },
    ],
  },
  services: {
    name: "Services", icon: Briefcase, Component: ServicesSection,
    defaultSettings: { eyebrow: "What we offer", title: "Our Services", items: [{ title: "Haircut", description: "Classic cut & finish", price: "30" }, { title: "Beard Trim", description: "Shape & line up", price: "20" }, { title: "Full Package", description: "Cut + beard + wash", price: "45" }] },
    schema: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "items", label: "Services", type: "repeater", fields: [{ key: "title", label: "Title", type: "text" }, { key: "description", label: "Description", type: "text" }, { key: "price", label: "Price (TND)", type: "text" }] },
    ],
  },
  team: {
    name: "Team", icon: Users, Component: TeamSection,
    defaultSettings: { eyebrow: "Our people", title: "Meet the Team", items: [{ name: "Sarah M.", role: "Lead Specialist", photo: "" }, { name: "Karim B.", role: "Senior Expert", photo: "" }] },
    schema: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "items", label: "Members", type: "repeater", fields: [{ key: "name", label: "Name", type: "text" }, { key: "role", label: "Role", type: "text" }, { key: "photo", label: "Photo URL", type: "image" }] },
    ],
  },
  stats: {
    name: "Stats", icon: Star, Component: StatsSection,
    defaultSettings: { items: [{ value: "10+", label: "Years" }, { value: "5k+", label: "Clients" }, { value: "4.9", label: "Rating" }, { value: "12", label: "Experts" }] },
    schema: [{ key: "items", label: "Stats", type: "repeater", fields: [{ key: "value", label: "Value", type: "text" }, { key: "label", label: "Label", type: "text" }] }],
  },
  gallery: {
    name: "Gallery", icon: ImageIcon, Component: GallerySection,
    defaultSettings: { title: "Gallery", images: ["", "", "", ""] },
    schema: [
      { key: "title", label: "Title", type: "text" },
      { key: "images", label: "Images", type: "repeater", simple: "image", fields: [{ key: "_", label: "Image URL", type: "image" }] },
    ],
  },
  cta: {
    name: "Call to action", icon: Megaphone, Component: CTASection,
    defaultSettings: { title: "Ready to book?", subtitle: "Reserve your spot online in under a minute.", bookLabel: "Book Now" },
    schema: [
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "bookLabel", label: "Button text", type: "text" },
    ],
  },
  contact: {
    name: "Contact & Hours", icon: Phone, Component: ContactSection,
    defaultSettings: { title: "Visit us", address: "12 Avenue Habib Bourguiba, Tunis", phone: "+216 71 000 000", hours: [{ day: "Mon–Fri", value: "09:00 – 19:00" }, { day: "Saturday", value: "09:00 – 17:00" }, { day: "Sunday", value: "Closed" }] },
    schema: [
      { key: "title", label: "Title", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "hours", label: "Hours", type: "repeater", fields: [{ key: "day", label: "Day", type: "text" }, { key: "value", label: "Hours", type: "text" }] },
    ],
  },
};

export const SECTION_LIST = Object.entries(SECTIONS).map(([type, def]) => ({ type, ...def }));

/* Public renderer: render an ordered sections array against a theme */
export const SectionRenderer = ({ sections = [], theme = { accent: "#6366f1", mode: "dark" }, ownerId }) => (
  <div style={{ background: tokens(theme.mode).bg }}>
    {sections.filter((s) => s.visible !== false).map((s) => {
      const def = SECTIONS[s.type];
      if (!def) return null;
      const Cmp = def.Component;
      return <Cmp key={s.id} settings={s.settings} theme={theme} ownerId={ownerId} />;
    })}
  </div>
);

export default SectionRenderer;
