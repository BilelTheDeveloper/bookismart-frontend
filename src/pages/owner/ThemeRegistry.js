// ─── Beauty & Barbers (existing) ───────────────────────────────────────────
import ClassicBarber from "./themes/BeautyBarbers/Barbershops/theme1/ClassicBarber";
import LuxeNailSalon from "./themes/BeautyBarbers/NailSalons/theme1/NailSalons";
import MakeupArtistTheme from "./themes/BeautyBarbers/Makeup Artists/theme1/MakeupArtistTheme";
import LuxeSpaTemplate from "./themes/BeautyBarbers/Spas/theme1/spastemplate";
import HairSalonTemplate from "./themes/BeautyBarbers/HairSalons/theme1/HairSalonTemplate";

// ─── Health & Medical ──────────────────────────────────────────────────────
import HealthMedicalTheme from "./themes/HealthMedical/theme1/HealthMedicalTheme";
import DentistTheme from "./themes/HealthMedical/Dentists/theme1/DentistTheme";
import MentalHealthTheme from "./themes/HealthMedical/MentalHealth/theme1/MentalHealthTheme";
import NutritionistTheme from "./themes/HealthMedical/Nutritionists/theme1/NutritionistTheme";

// ─── Fitness & Gyms ────────────────────────────────────────────────────────
import FitnessTheme from "./themes/FitnessGyms/theme1/FitnessTheme";
import YogaTheme from "./themes/FitnessGyms/Yoga/theme1/YogaTheme";
import PersonalTrainerTheme from "./themes/FitnessGyms/PersonalTrainers/theme1/PersonalTrainerTheme";

// ─── Creative & Media ──────────────────────────────────────────────────────
import CreativeMediaTheme from "./themes/CreativeMedia/Photographers/theme1/CreativeMediaTheme";
import VideographerTheme from "./themes/CreativeMedia/Videographers/theme1/VideographerTheme";
import MusicTeacherTheme from "./themes/CreativeMedia/MusicTeachers/theme1/MusicTeacherTheme";

// ─── Car Services ──────────────────────────────────────────────────────────
import CarServicesTheme from "./themes/CarServices/theme1/CarServicesTheme";
import CarDetailingTheme from "./themes/CarServices/CarDetailing/theme1/CarDetailingTheme";

// ─── Maintenance ───────────────────────────────────────────────────────────
import MaintenanceTheme from "./themes/Maintenance/theme1/MaintenanceTheme";
import CleaningTheme from "./themes/Maintenance/CleaningServices/theme1/CleaningTheme";

// ─── Coaching & Tutors ─────────────────────────────────────────────────────
import CoachingTutorsTheme from "./themes/CoachingTutors/theme1/CoachingTutorsTheme";
import LifeCoachTheme from "./themes/CoachingTutors/LifeCoaches/theme1/LifeCoachTheme";
import LanguageTutorTheme from "./themes/CoachingTutors/LanguageTutors/theme1/LanguageTutorTheme";

// ─── Consultants ───────────────────────────────────────────────────────────
import ConsultantsTheme from "./themes/Consultants/theme1/ConsultantsTheme";
import LegalTheme from "./themes/Consultants/Legal/theme1/LegalTheme";
import FinancialAdvisorTheme from "./themes/Consultants/FinancialAdvisors/theme1/FinancialAdvisorTheme";

// ─── Events & DJs ──────────────────────────────────────────────────────────
import EventsDJsTheme from "./themes/EventsDJs/theme1/EventsDJsTheme";
import WeddingPlannerTheme from "./themes/EventsDJs/WeddingPlanners/theme1/WeddingPlannerTheme";

// ─── Grooming & Vets ───────────────────────────────────────────────────────
import GroomingVetsTheme from "./themes/GroomingVets/theme1/GroomingVetsTheme";
import VetTheme from "./themes/GroomingVets/Veterinarians/theme1/VetTheme";

// ─── New Categories ────────────────────────────────────────────────────────
import TattooTheme from "./themes/TattooArtists/theme1/TattooTheme";
import RealEstateTheme from "./themes/RealEstate/theme1/RealEstateTheme";
import InteriorDesignTheme from "./themes/InteriorDesign/theme1/InteriorDesignTheme";

export const THEME_REGISTRY = [

  // ── BEAUTY & BARBERS ────────────────────────────────────────────────────
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
    description: "Soft pinks, clean whites, and elegant serif typography tailored for high-end nail studios.",
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
    description: "High-fashion aesthetic with soft rose tones and masonry gallery for makeup artists.",
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
    description: "A sanctuary-inspired design using soft stone tones and elegant serif fonts for spas.",
    component: LuxeSpaTemplate,
    previewImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80",
    demoPath: "/p/demo-BB_THEME_04"
  },
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

  // ── HEALTH & MEDICAL ────────────────────────────────────────────────────
  {
    id: "HM_THEME_01",
    name: "Clinical Prime",
    category: "Health & Medical",
    tags: ["Clean", "Trust", "Modern"],
    description: "A calm, structured template for clinics, doctors, and general practitioners.",
    component: HealthMedicalTheme,
    previewImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-HM_THEME_01"
  },
  {
    id: "HM_THEME_02",
    name: "Bright Smile Studio",
    category: "Health & Medical",
    tags: ["Dental", "Clean", "Modern"],
    description: "Crystal clean aesthetic with teal accents — perfect for dental clinics and orthodontists.",
    component: DentistTheme,
    previewImage: "https://images.unsplash.com/photo-1588776814546-1ffbb5e09408?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-HM_THEME_02"
  },
  {
    id: "HM_THEME_03",
    name: "Mind & Soul",
    category: "Health & Medical",
    tags: ["Therapy", "Calm", "Wellness"],
    description: "Soft lavender tones and a warm, judgment-free aesthetic for therapists and counselors.",
    component: MentalHealthTheme,
    previewImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-HM_THEME_03"
  },
  {
    id: "HM_THEME_04",
    name: "Nourish Hub",
    category: "Health & Medical",
    tags: ["Nutrition", "Fresh", "Natural"],
    description: "Fresh greens and a science-meets-nature design for nutritionists and dieticians.",
    component: NutritionistTheme,
    previewImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-HM_THEME_04"
  },

  // ── FITNESS & GYMS ──────────────────────────────────────────────────────
  {
    id: "FG_THEME_01",
    name: "Pulse Performance",
    category: "Fitness & Gyms",
    tags: ["Dynamic", "Bold", "Athletic"],
    description: "A high-energy layout with emerald accents designed for gyms and fitness studios.",
    component: FitnessTheme,
    previewImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-FG_THEME_01"
  },
  {
    id: "FG_THEME_02",
    name: "Flow & Balance",
    category: "Fitness & Gyms",
    tags: ["Yoga", "Zen", "Wellness"],
    description: "Warm earth tones and a mindful design for yoga studios and pilates centers.",
    component: YogaTheme,
    previewImage: "https://images.unsplash.com/photo-1588286840104-8957b019727f?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-FG_THEME_02"
  },
  {
    id: "FG_THEME_03",
    name: "Iron Will",
    category: "Fitness & Gyms",
    tags: ["Personal Training", "Intense", "Results"],
    description: "Black and blood-red power design for personal trainers who demand elite results.",
    component: PersonalTrainerTheme,
    previewImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-FG_THEME_03"
  },

  // ── CREATIVE & MEDIA ────────────────────────────────────────────────────
  {
    id: "CM_THEME_01",
    name: "Lens & Light",
    category: "Creative & Media",
    tags: ["Portfolio", "Visual", "Modern"],
    description: "Advanced animations and a portfolio-first layout for photographers and visual artists.",
    component: CreativeMediaTheme,
    previewImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-CM_THEME_01"
  },
  {
    id: "CM_THEME_02",
    name: "Cinematic Frame",
    category: "Creative & Media",
    tags: ["Video", "Cinematic", "Dark"],
    description: "Electric blue on black — a cinematic brand for videographers and film producers.",
    component: VideographerTheme,
    previewImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1536240478700-b869ad10e128?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-CM_THEME_02"
  },
  {
    id: "CM_THEME_03",
    name: "Sound Studio",
    category: "Creative & Media",
    tags: ["Music", "Creative", "Dark"],
    description: "Deep violet with gold highlights — where music becomes mastery.",
    component: MusicTeacherTheme,
    previewImage: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-CM_THEME_03"
  },

  // ── CAR SERVICES ────────────────────────────────────────────────────────
  {
    id: "CS_THEME_01",
    name: "Garage Pro",
    category: "Car Services",
    tags: ["Reliable", "Industrial", "Fast"],
    description: "Dark industrial design with red accents for garages and auto repair specialists.",
    component: CarServicesTheme,
    previewImage: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1613214150388-6791f8a0f06d?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-CS_THEME_01"
  },
  {
    id: "CS_THEME_02",
    name: "Shine Detail Co.",
    category: "Car Services",
    tags: ["Detailing", "Luxury", "Premium"],
    description: "Pure black with electric blue neon accents — a supercar spa experience.",
    component: CarDetailingTheme,
    previewImage: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=2071&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-CS_THEME_02"
  },

  // ── MAINTENANCE ─────────────────────────────────────────────────────────
  {
    id: "MN_THEME_01",
    name: "FixFlow",
    category: "Maintenance",
    tags: ["Practical", "Clean", "Service"],
    description: "Orange accents on dark slate — a dependable look for home and commercial maintenance.",
    component: MaintenanceTheme,
    previewImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-MN_THEME_01"
  },
  {
    id: "MN_THEME_02",
    name: "Sparkle Pro",
    category: "Maintenance",
    tags: ["Cleaning", "Fresh", "Professional"],
    description: "Sky blue and crisp white — a premium cleaning brand built on trust and eco-values.",
    component: CleaningTheme,
    previewImage: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-MN_THEME_02"
  },

  // ── COACHING & TUTORS ───────────────────────────────────────────────────
  {
    id: "CT_THEME_01",
    name: "Mentor Space",
    category: "Coaching & Tutors",
    tags: ["Education", "Focused", "Personal"],
    description: "Deep indigo and gold for tutors and learning centers that inspire academic excellence.",
    component: CoachingTutorsTheme,
    previewImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-CT_THEME_01"
  },
  {
    id: "CT_THEME_02",
    name: "Rise & Lead",
    category: "Coaching & Tutors",
    tags: ["Life Coaching", "Aspirational", "Premium"],
    description: "Dark charcoal with champagne gold — transformational coaching for ambitious minds.",
    component: LifeCoachTheme,
    previewImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-CT_THEME_02"
  },
  {
    id: "CT_THEME_03",
    name: "Lingua Lab",
    category: "Coaching & Tutors",
    tags: ["Languages", "Energetic", "Global"],
    description: "Bright coral on white — a modern language academy brand that speaks the world.",
    component: LanguageTutorTheme,
    previewImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
    demoPath: "/p/demo-CT_THEME_03"
  },

  // ── CONSULTANTS ─────────────────────────────────────────────────────────
  {
    id: "CN_THEME_01",
    name: "Advisory Edge",
    category: "Consultants",
    tags: ["Premium", "Executive", "Sharp"],
    description: "Near-black with sharp gold lines — confident business consulting for measurable outcomes.",
    component: ConsultantsTheme,
    previewImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-CN_THEME_01"
  },
  {
    id: "CN_THEME_02",
    name: "Lex Counsel",
    category: "Consultants",
    tags: ["Legal", "Authoritative", "Distinguished"],
    description: "Deep navy and rich amber gold — a prestigious law firm aesthetic. Justice. Strategy. Results.",
    component: LegalTheme,
    previewImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2012&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1453945995579-db1d3e5e6b27?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-CN_THEME_02"
  },
  {
    id: "CN_THEME_03",
    name: "Wealth Axis",
    category: "Consultants",
    tags: ["Finance", "Wealth", "Premium"],
    description: "Forest green and gold — a private banking aesthetic for financial advisors and wealth managers.",
    component: FinancialAdvisorTheme,
    previewImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    demoPath: "/p/demo-CN_THEME_03"
  },

  // ── EVENTS & DJs ────────────────────────────────────────────────────────
  {
    id: "ED_THEME_01",
    name: "Night Pulse",
    category: "Events & DJs",
    tags: ["Vibrant", "Nightlife", "Energy"],
    description: "Neon pink and violet on pure black — electric energy for DJs and event entertainers.",
    component: EventsDJsTheme,
    previewImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-ED_THEME_01"
  },
  {
    id: "ED_THEME_02",
    name: "Forever & Co.",
    category: "Events & DJs",
    tags: ["Wedding", "Romantic", "Luxury"],
    description: "Cream, blush rose, and dusty gold — an elegant bridal planner aesthetic for your perfect day.",
    component: WeddingPlannerTheme,
    previewImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-ED_THEME_02"
  },

  // ── GROOMING & VETS ─────────────────────────────────────────────────────
  {
    id: "GV_THEME_01",
    name: "Pet Care Hub",
    category: "Grooming & Vets",
    tags: ["Friendly", "Clean", "Trusted"],
    description: "Warm cream and teal — a premium pet grooming studio loved by pets and owners alike.",
    component: GroomingVetsTheme,
    previewImage: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-GV_THEME_01"
  },
  {
    id: "GV_THEME_02",
    name: "Vet Care",
    category: "Grooming & Vets",
    tags: ["Veterinary", "Medical", "Trusted"],
    description: "Deep blue authority with warm teal — expert veterinary care for your beloved companions.",
    component: VetTheme,
    previewImage: "https://images.unsplash.com/photo-1559190394-df5a28aab5c5?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-GV_THEME_02"
  },

  // ── TATTOO ARTISTS (new category) ───────────────────────────────────────
  {
    id: "TA_THEME_01",
    name: "Ink Atelier",
    category: "Tattoo Artists",
    tags: ["Dark", "Artistic", "Premium"],
    description: "Pure black with blood red — a premium tattoo studio aesthetic. The art of skin.",
    component: TattooTheme,
    previewImage: "https://images.unsplash.com/photo-1590246814883-57c511e7f2e5?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-TA_THEME_01"
  },

  // ── REAL ESTATE (new category) ──────────────────────────────────────────
  {
    id: "RE_THEME_01",
    name: "Prime Property",
    category: "Real Estate",
    tags: ["Modern", "Clean", "Premium"],
    description: "Clean white with navy and gold — a luxury real estate agency that finds your dream property.",
    component: RealEstateTheme,
    previewImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-RE_THEME_01"
  },

  // ── INTERIOR DESIGN (new category) ──────────────────────────────────────
  {
    id: "ID_THEME_01",
    name: "Studio Space",
    category: "Interior Design",
    tags: ["Elegant", "Warm", "Editorial"],
    description: "Warm sand, terracotta, and aged bronze — an editorial studio for spaces that tell your story.",
    component: InteriorDesignTheme,
    previewImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    demoPath: "/p/demo-ID_THEME_01"
  },

];

/**
 * Filter themes by business category
 */
export const getThemesByCategory = (category) => {
  if (!category) return [];
  const normalizedCategory = category.toLowerCase().trim();
  return THEME_REGISTRY.filter(
    (theme) => theme.category.toLowerCase().trim() === normalizedCategory
  );
};

/**
 * Get a specific theme by ID (case-insensitive)
 */
export const getThemeById = (id) => {
  if (!id) return null;
  return THEME_REGISTRY.find(
    (theme) => theme.id.trim().toUpperCase() === id.trim().toUpperCase()
  );
};
