import { make } from "./templates";

/* ════════════════════════════════════════════════════════════════════════
   SMART SITE GENERATOR
   Rule-based (no external API): turns a few inputs into a complete,
   category-tailored multi-section site + theme. Instant & offline.
   ════════════════════════════════════════════════════════════════════════ */

const pick = (arr, seed = Math.random()) => arr[Math.floor(seed * arr.length) % arr.length];

const CATEGORY = {
  "Beauty & Barbers": {
    accent: "#f59e0b", mode: "dark",
    badge: "Premium grooming",
    titles: ["Look sharp. Feel unstoppable.", "Where style meets precision.", "Your best look, booked in seconds."],
    subs: ["Premium cuts and care from a team that treats every client like a regular.", "Skip the wait — reserve your chair online anytime."],
    aboutTitle: "Craft, not just a cut",
    aboutText: "We blend classic technique with a modern eye. Every visit is a clean, relaxed experience designed around you.",
    services: [{ title: "Signature Cut", description: "Consultation, cut & styling", price: "30" }, { title: "Beard Sculpt", description: "Shape, line-up & hot towel", price: "20" }, { title: "Full Grooming", description: "Cut + beard + wash", price: "45" }],
  },
  "Health & Medical": {
    accent: "#0d9488", mode: "light",
    badge: "Trusted care",
    titles: ["Your health, in expert hands.", "Care you can count on.", "Book your visit in under a minute."],
    subs: ["Compassionate, professional care with online booking that respects your time.", "A calmer, clearer way to manage your appointments."],
    aboutTitle: "Care built on trust",
    aboutText: "Our team is committed to clear communication, modern standards, and a comfortable experience for every patient.",
    services: [{ title: "Consultation", description: "Comprehensive assessment", price: "60" }, { title: "Follow-up", description: "Review & next steps", price: "40" }, { title: "Check-up", description: "Routine examination", price: "50" }],
  },
  "Fitness & Gyms": {
    accent: "#10b981", mode: "dark",
    badge: "Train with us",
    titles: ["Show up. Level up.", "Stronger starts today.", "Book your session and bring your A-game."],
    subs: ["Coaching and classes that meet you where you are — and push you further.", "Lock in your spot online and never miss a session."],
    aboutTitle: "Results, with real coaching",
    aboutText: "We're more than a gym — we're a team that keeps you accountable, motivated, and progressing.",
    services: [{ title: "Personal Training", description: "1-on-1 coaching session", price: "40" }, { title: "Group Class", description: "High-energy workout", price: "15" }, { title: "Assessment", description: "Goals & body composition", price: "25" }],
  },
  "Consultants": {
    accent: "#0ea5e9", mode: "dark",
    badge: "Advisory",
    titles: ["Clarity that drives results.", "Strategy, sharpened.", "Book a session with our experts."],
    subs: ["Practical advice and measurable outcomes from a team that's been there.", "Reserve a consultation that moves your goals forward."],
    aboutTitle: "Outcomes over opinions",
    aboutText: "We combine experience and data to give you advice you can actually act on — with results you can measure.",
    services: [{ title: "Strategy Session", description: "Deep-dive on your goals", price: "120" }, { title: "Advisory Call", description: "Focused 60-min consult", price: "80" }, { title: "Audit", description: "Full review & report", price: "200" }],
  },
  "Creative & Media": {
    accent: "#8b5cf6", mode: "dark",
    badge: "Creative studio",
    titles: ["Stories worth telling.", "Your vision, beautifully made.", "Book a session and let's create."],
    subs: ["From concept to final cut — a studio obsessed with craft and detail.", "Reserve your shoot or session online in seconds."],
    aboutTitle: "Made with intention",
    aboutText: "Every frame, every detail — crafted to tell your story the way it deserves to be told.",
    services: [{ title: "Photo Session", description: "Studio or on-location", price: "150" }, { title: "Video Production", description: "Concept to delivery", price: "300" }, { title: "Mini Session", description: "Quick branded shoot", price: "90" }],
  },
  "Car Services": {
    accent: "#ef4444", mode: "dark",
    badge: "Auto care",
    titles: ["Your car, handled right.", "Precision care for your ride.", "Book your service in seconds."],
    subs: ["Reliable, transparent auto care from specialists who treat your car like their own.", "Reserve your slot online — no waiting around."],
    aboutTitle: "Done right, every time",
    aboutText: "We pair real expertise with honest pricing and a clean, fast turnaround you can count on.",
    services: [{ title: "Full Service", description: "Inspection & maintenance", price: "120" }, { title: "Detailing", description: "Interior & exterior", price: "80" }, { title: "Diagnostics", description: "Full system check", price: "40" }],
  },
};

const DEFAULT = {
  accent: "#6366f1", mode: "dark",
  badge: "Welcome",
  titles: ["Premium service, booked in seconds.", "Your time, beautifully managed.", "Book with us in under a minute."],
  subs: ["A modern, effortless way to reserve your appointment — anytime, any device.", "Quality service and an experience built around you."],
  aboutTitle: "Built around you",
  aboutText: "We focus on what matters — your time, your experience, and a result that keeps you coming back.",
  services: [{ title: "Service One", description: "Describe this service", price: "30" }, { title: "Service Two", description: "Describe this service", price: "45" }, { title: "Service Three", description: "Describe this service", price: "60" }],
};

/**
 * generateSite({ businessName, category, city, services, vibe })
 *   - businessName: used in hero/about
 *   - category: drives copy + accent + mode
 *   - city: used in contact
 *   - services: real services [{title,description,price}] if available (else defaults)
 *   - vibe: { accent?, mode?, align? } overrides
 * Returns { sections, theme }
 */
export function generateSite({ businessName = "", category = "", city = "", services = [], vibe = {} } = {}) {
  const c = CATEGORY[category] || DEFAULT;
  const seed = Math.random();
  const accent = vibe.accent || c.accent;
  const mode = vibe.mode || c.mode;
  const align = vibe.align || "center";

  const heroTitle = pick(c.titles, seed);
  const heroSub = pick(c.subs, seed);
  const svcItems = (services && services.length)
    ? services.slice(0, 6).map((s) => ({ title: s.title || "Service", description: s.description || "", price: String(s.price || "").replace(/[^0-9.]/g, "") || "" }))
    : c.services;

  const sections = [
    make("hero", { badge: c.badge, title: businessName ? `${heroTitle}` : heroTitle, subtitle: heroSub, align, showBook: true, bookLabel: "Book an Appointment" }),
    make("stats", { items: [{ value: "10+", label: "Years" }, { value: "5k+", label: "Clients" }, { value: "4.9", label: "Rating" }, { value: "100%", label: "Verified" }] }),
    make("about", { title: c.aboutTitle, text: businessName ? `At ${businessName}, ${c.aboutText.charAt(0).toLowerCase()}${c.aboutText.slice(1)}` : c.aboutText }),
    make("services", { eyebrow: "What we offer", title: "Our Services", items: svcItems }),
    make("gallery", { title: "Our Work", images: ["", "", "", ""] }),
    make("cta", { title: "Ready to book?", subtitle: "Reserve your spot online in under a minute.", bookLabel: "Book Now" }),
    make("contact", { title: "Visit us", address: city || "", phone: "", hours: [{ day: "Mon–Fri", value: "09:00 – 19:00" }, { day: "Saturday", value: "09:00 – 17:00" }, { day: "Sunday", value: "Closed" }] }),
  ];

  return { sections, theme: { accent, mode } };
}

export const GENERATOR_ACCENTS = ["#6366f1", "#0d9488", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#0ea5e9"];
