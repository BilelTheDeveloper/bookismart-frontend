import { SECTIONS } from "./sections";

let _seq = 0;
export const uid = () => `s_${Date.now().toString(36)}_${(_seq++).toString(36)}`;

/* Instantiate a section with its defaults (+ overrides) */
export const make = (type, settings = {}) => ({
  id: uid(),
  type,
  visible: true,
  settings: { ...(SECTIONS[type]?.defaultSettings || {}), ...settings },
});

/* ── Ready-made templates: each = a theme + an ordered sections array ── */
export const BUILDER_TEMPLATES = [
  {
    id: "prestige-dark",
    name: "Prestige",
    description: "Premium dark, conversion-focused. Great for barbers, clinics, studios.",
    cover: "https://images.unsplash.com/photo-1512690199101-85a5324c5bc1?q=80&w=1200&auto=format&fit=crop",
    theme: { accent: "#6366f1", mode: "dark" },
    build: () => [
      make("hero", { badge: "Premium Service", title: "Booked in seconds. Done with care.", subtitle: "Reserve your appointment online and skip the wait — anytime, from any device.", align: "left" }),
      make("stats"),
      make("about", { title: "Crafted with passion", text: "We blend craft, care, and modern standards to deliver a consistent, premium experience every visit." }),
      make("services"),
      make("team"),
      make("gallery"),
      make("cta"),
      make("contact"),
    ],
  },
  {
    id: "minimal-light",
    name: "Minimal",
    description: "Clean, light & elegant. Perfect for salons, spas, wellness & consultants.",
    cover: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200&auto=format&fit=crop",
    theme: { accent: "#0d9488", mode: "light" },
    build: () => [
      make("hero", { badge: "Welcome", title: "A calmer way to book your time.", subtitle: "Simple online booking for a beautiful, stress-free experience.", align: "center" }),
      make("about", { title: "Our philosophy", text: "Less noise, more care. We focus on what matters — your time and your experience." }),
      make("services"),
      make("stats"),
      make("gallery"),
      make("contact"),
      make("cta"),
    ],
  },
  {
    id: "bold-energy",
    name: "Bold",
    description: "High-energy & punchy. Ideal for gyms, trainers, events & car services.",
    cover: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    theme: { accent: "#10b981", mode: "dark" },
    build: () => [
      make("hero", { badge: "Let's go", title: "Show up. Book up. Level up.", subtitle: "Lock in your session in seconds and bring your A-game.", align: "center" }),
      make("stats"),
      make("services"),
      make("team"),
      make("cta"),
      make("gallery"),
      make("contact"),
    ],
  },
];

/* ── Build from scratch: a minimal but complete starting point ── */
export const blankSite = () => [
  make("hero", { title: "Your business name", subtitle: "Add your tagline here, then build your page section by section." }),
  make("services"),
  make("cta"),
  make("contact"),
];

export const getTemplate = (id) => BUILDER_TEMPLATES.find((t) => t.id === id);
