/**
 * THEME REGISTRY
 * Centralized configuration for the "Web inside Web" engine.
 * Every time you create a new template file, add it here.
 */

import ClassicBarber from "./themes/BeautyBarbers/Barbershops/theme1/ClassicBarber";
import LuxeNailSalon from "./themes/BeautyBarbers/NailSalons/theme1/NailSalons";

export const THEME_REGISTRY = [
  {
    id: "BB_THEME_01",
    name: "Classic Gentleman",
    category: "Beauty & Barbers",
    tags: ["Luxury", "Dark Mode", "Traditional"],
    description: "Deep slates, gold accents, and high-end typography designed for premium barbershops.",
    // The actual React component
    component: ClassicBarber,
    // The image shown in the Gallery Card
    previewImage: "https://images.unsplash.com/photo-1512690199101-85a5324c5bc1?q=80&w=2070&auto=format&fit=crop",
    // Featured background for the Card UI
    cardBg: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop",
    // --- New: Demo Path for Full Screen Review ---
    demoPath: "/p/demo-BB_THEME_01"
  },
  {
    id: "BB_THEME_02",
    name: "Luxe Polish & Co.",
    category: "Beauty & Barbers",
    tags: ["Minimalist", "Light Mode", "High-Fashion"],
    description: "Soft pinks, clean whites, and elegant serif typography tailored for high-end nail studios and spas.",
    // The actual React component
    component: LuxeNailSalon,
    // The image shown in the Gallery Card
    previewImage: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1974&auto=format&fit=crop",
    // Featured background for the Card UI
    cardBg: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=2070&auto=format&fit=crop",
    // --- New: Demo Path for Full Screen Review ---
    demoPath: "/p/demo-BB_THEME_02"
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