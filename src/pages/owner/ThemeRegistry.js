import ClassicBarber from "./themes/BeautyBarbers/Barbershops/theme1/ClassicBarber";
import LuxeNailSalon from "./themes/BeautyBarbers/NailSalons/theme1/NailSalons";
import MakeupArtistTheme from "./themes/BeautyBarbers/Makeup Artists/theme1/MakeupArtistTheme";
import LuxeSpaTemplate from "./themes/BeautyBarbers/Spas/theme1/spastemplate";
// --- NEW IMPORT ---
import HairSalonTemplate from "./themes/BeautyBarbers/HairSalons/theme1/HairSalonTemplate";
import HealthMedicalTheme from "./themes/HealthMedical/theme1/HealthMedicalTheme";
import FitnessTheme from "./themes/FitnessGyms/theme1/FitnessTheme";
import CreativeMediaTheme from "./themes/CreativeMedia/theme1/CreativeMediaTheme";
import CarServicesTheme from "./themes/CarServices/theme1/CarServicesTheme";
import MaintenanceTheme from "./themes/Maintenance/theme1/MaintenanceTheme";
import CoachingTutorsTheme from "./themes/CoachingTutors/theme1/CoachingTutorsTheme";
import ConsultantsTheme from "./themes/Consultants/theme1/ConsultantsTheme";
import EventsDJsTheme from "./themes/EventsDJs/theme1/EventsDJsTheme";
import GroomingVetsTheme from "./themes/GroomingVets/theme1/GroomingVetsTheme";

export const THEME_REGISTRY = [
  {
    id: "BB_THEME_01",
    name: "Classic Gentleman",
    category: "Beauty & Barbers",
    tags: ["Luxury", "Dark Mode", "Traditional"],
    description: "Deep slates, gold accents, and high-end typography designed for premium barbershops.",
    component: ClassicBarber,
    previewImage: "https://images.unsplash.com/photo-1512690199101-85a5324c5bc1?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-BB_THEME_01"
  },
  {
    id: "BB_THEME_02",
    name: "Luxe Polish & Co.",
    category: "Beauty & Barbers",
    tags: ["Minimalist", "Light Mode", "High-Fashion"],
    description: "Soft pinks, clean whites, and elegant serif typography tailored for high-end nail studios and spas.",
    component: LuxeNailSalon,
    previewImage: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1974&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-BB_THEME_02"
  },
  {
    id: "BB_THEME_03",
    name: "Vogue Artistry",
    category: "Beauty & Barbers",
    tags: ["Editorial", "Elegant", "Serif"],
    description: "High-fashion aesthetic with soft rose tones and masonry gallery for professional makeup artists.",
    component: MakeupArtistTheme,
    previewImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop",
    demoPath: "/p/demo-BB_THEME_03"
  },
  {
    id: "BB_THEME_04",
    name: "Pure Serenity Spa",
    category: "Beauty & Barbers",
    tags: ["Wellness", "Zen", "Minimalist"],
    description: "A sanctuary-inspired design using soft stone tones and elegant serif fonts for high-end spas and wellness centers.",
    component: LuxeSpaTemplate,
    previewImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80",
    demoPath: "/p/demo-BB_THEME_04"
  },
  // --- NEW HAIR SALON THEME ---
  {
    id: "BB_THEME_05",
    name: "Haute Hair Studio",
    category: "Beauty & Barbers",
    tags: ["Avant-Garde", "Editorial", "Modern"],
    description: "High-contrast, brutalist-inspired design for elite hair stylists and luxury hair studios.",
    component: HairSalonTemplate,
    previewImage: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-BB_THEME_05"
  },
  {
    id: "HM_THEME_01",
    name: "Clinical Prime",
    category: "Health & Medical",
    tags: ["Clean", "Trust", "Modern"],
    description: "A calm, structured template for clinics, doctors, and therapists.",
    component: HealthMedicalTheme,
    previewImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-HM_THEME_01"
  },
  {
    id: "FG_THEME_01",
    name: "Pulse Performance",
    category: "Fitness & Gyms",
    tags: ["Dynamic", "Bold", "Athletic"],
    description: "A high-energy layout designed for gyms, trainers, and fitness studios.",
    component: FitnessTheme,
    previewImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-FG_THEME_01"
  },
  {
    id: "CM_THEME_01",
    name: "photographer",
    category: "Creative & Media",
    tags: ["Portfolio", "Visual", "Modern"],
    description: "Perfect for photographers, videographers, and creative studios.",
    component: CreativeMediaTheme,
    previewImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-CM_THEME_01"
  },
  {
    id: "CS_THEME_01",
    name: "Garage Pro",
    category: "Car Services",
    tags: ["Reliable", "Industrial", "Fast"],
    description: "Built for garages, detailing services, and automotive specialists.",
    component: CarServicesTheme,
    previewImage: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1613214150388-6791f8a0f06d?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-CS_THEME_01"
  },
  {
    id: "MN_THEME_01",
    name: "FixFlow",
    category: "Maintenance",
    tags: ["Practical", "Clean", "Service"],
    description: "A professional service-first layout for maintenance businesses.",
    component: MaintenanceTheme,
    previewImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-MN_THEME_01"
  },
  {
    id: "CT_THEME_01",
    name: "Mentor Space",
    category: "Coaching & Tutors",
    tags: ["Education", "Focused", "Personal"],
    description: "Designed for teachers, tutors, coaches, and learning centers.",
    component: CoachingTutorsTheme,
    previewImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-CT_THEME_01"
  },
  {
    id: "CN_THEME_01",
    name: "Advisory Edge",
    category: "Consultants",
    tags: ["Premium", "Executive", "Sharp"],
    description: "A confident business look for legal, finance, and strategy consultants.",
    component: ConsultantsTheme,
    previewImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-CN_THEME_01"
  },
  {
    id: "ED_THEME_01",
    name: "Night Pulse",
    category: "Events & DJs",
    tags: ["Vibrant", "Nightlife", "Energy"],
    description: "A bold event-first design for planners, DJs, and venues.",
    component: EventsDJsTheme,
    previewImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-ED_THEME_01"
  },
  {
    id: "GV_THEME_01",
    name: "Pet Care Hub",
    category: "Grooming & Vets",
    tags: ["Friendly", "Clean", "Trusted"],
    description: "A warm and reliable look for pet care, grooming, and vet services.",
    component: GroomingVetsTheme,
    previewImage: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-GV_THEME_01"
  }
];

/**
 * Utility: Filter themes by business category
 * Uses .toLowerCase() and .trim() to ensure matching even with spaces or casing diffs
 * @param {string} category - e.g., 'Beauty & Barbers', 'health', 'fitness'
 */
export const getThemesByCategory = (category) => {
  if (!category) return [];
  const normalizedCategory = category.toLowerCase().trim();
  
  return THEME_REGISTRY.filter(
    (theme) => theme.category.toLowerCase().trim() === normalizedCategory
  );
};

/**
 * Utility: Get a specific theme by ID (Used by the Profile Engine)
 * Case-insensitive matching to prevent the "Default Barber" bug.
 * @param {string} id - The templateId stored in the Database
 */
export const getThemeById = (id) => {
  if (!id) return null;
  
  return THEME_REGISTRY.find(
    (theme) => theme.id.trim().toUpperCase() === id.trim().toUpperCase()
  );
};