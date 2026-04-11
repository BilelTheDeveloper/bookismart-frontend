import { 
  Scissors, Hospital, Dumbbell, Camera, Car, 
  Home, GraduationCap, Scale, PartyPopper, PawPrint 
} from "lucide-react";

export const CATEGORY_THEMES = {
  1: {
    id: 1,
    title: "SmartStyle",
    category: "Beauty & Barbers",
    icon: Scissors,
    color: "#f43f5e",
    accent: "bg-rose-500",
    lightAccent: "bg-rose-50",
    textAccent: "text-rose-600",
    borderAccent: "border-rose-100",
    terminology: { client: "Client", service: "Treatment" }
  },
  2: {
    id: 2,
    title: "SmartDoc",
    category: "Health & Medical",
    icon: Hospital,
    color: "#3b82f6",
    accent: "bg-blue-500",
    lightAccent: "bg-blue-50",
    textAccent: "text-blue-600",
    borderAccent: "border-blue-100",
    terminology: { client: "Patient", service: "Consultation" }
  },
  3: {
    id: 3,
    title: "SmartFit",
    category: "Fitness & Gyms",
    icon: Dumbbell,
    color: "#10b981",
    accent: "bg-emerald-500",
    lightAccent: "bg-emerald-50",
    textAccent: "text-emerald-600",
    borderAccent: "border-emerald-100",
    terminology: { client: "Member", service: "Workout" }
  },
  4: {
    id: 4,
    title: "SmartLens",
    category: "Creative & Media",
    icon: Camera,
    color: "#8b5cf6",
    accent: "bg-violet-500",
    lightAccent: "bg-violet-50",
    textAccent: "text-violet-600",
    borderAccent: "border-violet-100",
    terminology: { client: "Client", service: "Shoot" }
  },
  5: {
    id: 5,
    title: "SmartAuto",
    category: "Car Services",
    icon: Car,
    color: "#334155",
    accent: "bg-slate-700",
    lightAccent: "bg-slate-50",
    textAccent: "text-slate-700",
    borderAccent: "border-slate-200",
    terminology: { client: "Vehicle Owner", service: "Repair" }
  },
  6: {
    id: 6,
    title: "SmartHome",
    category: "Maintenance",
    icon: Home,
    color: "#f97316",
    accent: "bg-orange-500",
    lightAccent: "bg-orange-50",
    textAccent: "text-orange-600",
    borderAccent: "border-orange-100",
    terminology: { client: "Homeowner", service: "Job" }
  },
  7: {
    id: 7,
    title: "SmartEdu",
    category: "Coaching & Tutors",
    icon: GraduationCap,
    color: "#4f46e5",
    accent: "bg-indigo-600",
    lightAccent: "bg-indigo-50",
    textAccent: "text-indigo-600",
    borderAccent: "border-indigo-100",
    terminology: { client: "Student", service: "Lesson" }
  },
  8: {
    id: 8,
    title: "SmartPro",
    category: "Consultants",
    icon: Scale,
    color: "#d97706",
    accent: "bg-amber-600",
    lightAccent: "bg-amber-50",
    textAccent: "text-amber-600",
    borderAccent: "border-amber-100",
    terminology: { client: "Client", service: "Consultation" }
  },
  9: {
    id: 9,
    title: "SmartEvent",
    category: "Events & DJs",
    icon: PartyPopper,
    color: "#ec4899",
    accent: "bg-pink-500",
    lightAccent: "bg-pink-50",
    textAccent: "text-pink-600",
    borderAccent: "border-pink-100",
    terminology: { client: "Organizer", service: "Booking" }
  },
  10: {
    id: 10,
    title: "SmartPet",
    category: "Grooming & Vets",
    icon: PawPrint,
    color: "#14b8a6",
    accent: "bg-teal-500",
    lightAccent: "bg-teal-50",
    textAccent: "text-teal-600",
    borderAccent: "border-teal-100",
    terminology: { client: "Pet Owner", service: "Visit" }
  }
};