import ClassicBarber from "./themes/BeautyBarbers/Barbershops/theme1/ClassicBarber";
import LuxeNailSalon from "./themes/BeautyBarbers/NailSalons/theme1/NailSalons";
import MakeupArtistTheme from "./themes/BeautyBarbers/Makeup Artists/theme1/MakeupArtistTheme";
// --- NEW IMPORT ---
import LuxeSpaTemplate from "./themes/BeautyBarbers/Spas/theme1/spastemplate";

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
  // --- NEW SPA THEME ADDED HERE ---
  {
    id: "BB_THEME_04",
    name: "Pure Serenity Spa",
    category: "Beauty & Barbers",
    tags: ["Wellness", "Zen", "Minimalist"],
    description: "A sanctuary-inspired design using soft stone tones and elegant serif fonts for high-end spas and wellness centers.",
    component: LuxeSpaTemplate,
    previewImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
    cardBg: "https://images.unsplash.com/photo-1540555700478-4be289fbecee?q=80&w=2070&auto=format&fit=crop",
    demoPath: "/p/demo-BB_THEME_04"
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