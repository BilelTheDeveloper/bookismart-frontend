import React, { useState } from "react";
import { ChevronDown, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: 1, title: "SmartStyle", sub: "Beauty & Barbers", icon: "✂️", color: "bg-rose-500", details: ["Hair Salons", "Barbershops", "Nail Salons", "Spas", "Makeup Artists"] },
  { id: 2, title: "SmartDoc", sub: "Health & Medical", icon: "🏥", color: "bg-blue-500", details: ["Dentists", "General Doctors", "Opticians", "Physiotherapists", "Psychologists"] },
  { id: 8, title: "SmartPro", sub: "Consultants", icon: "⚖️", color: "bg-amber-600", details: ["Lawyers", "Accountants", "Real Estate Agents", "Business Consultants"] },
  { id: 5, title: "SmartAuto", sub: "Car Services", icon: "🚗", color: "bg-slate-700", details: ["Repair Garages", "Car Wash", "Tire Services", "Vehicle Inspection"] },
  { id: 10, title: "SmartPet", sub: "Grooming & Vets", icon: "🐾", color: "bg-teal-500", details: ["Veterinarians", "Pet Grooming", "Dog Trainers", "Pet Boarding"] },
  { id: 3, title: "SmartFit", sub: "Fitness & Gyms", icon: "🏋️", color: "bg-emerald-500", details: ["Personal Trainers", "Yoga Studios", "Gyms", "Pilates", "Martial Arts"] },
  { id: 4, title: "SmartLens", sub: "Creative & Media", icon: "📸", color: "bg-violet-500", details: ["Photographers", "Videographers", "Recording Studios", "Podcast Hubs"] },
  { id: 6, title: "SmartHome", sub: "Maintenance", icon: "🏠", color: "bg-orange-500", details: ["Plumbers", "Electricians", "AC Repair", "Cleaning Services", "Pest Control"] },
  { id: 7, title: "SmartEdu", sub: "Coaching & Tutors", icon: "🎓", color: "bg-indigo-600", details: ["Private Tutors", "Language Schools", "Music Teachers", "Driving Schools"] },
  { id: 9, title: "SmartEvent", sub: "Events & DJs", icon: "🎉", color: "bg-pink-500", details: ["Event Planners", "Party Venues", "DJs", "Catering Services"] },
];

const Categories = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);

  const visibleCategories = showAll ? categories : categories.slice(0, 5);

  return (
    <section className="relative bg-white pb-24 pt-12 sm:pt-14 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14 md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">
            <Sparkles size={14} />
            Top categories
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Book <span className="text-indigo-600">everything</span> in one place.
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium text-slate-500 sm:text-lg">
            Explore curated services with a modern discovery experience built for speed.
          </p>
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5"
        >
          {visibleCategories.map((cat) => (
            <motion.button
              layout
              key={cat.id}
              onClick={() => setSelectedCat(cat)}
              whileHover={{ y: -6, rotateX: 3, rotateY: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="group relative overflow-hidden rounded-[1.8rem] border border-slate-100 bg-white p-5 text-center shadow-lg shadow-slate-200/40 transition-all sm:p-7"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-x-6 top-0 h-20 rounded-b-[2rem] bg-gradient-to-b from-slate-50 to-transparent" />
              <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl text-white shadow-lg sm:mb-6 sm:h-16 sm:w-16 ${cat.color}`}>
                {cat.icon}
              </div>
              <h3 className="text-base font-black leading-tight text-slate-900 sm:text-lg">{cat.title}</h3>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:text-xs">{cat.sub}</p>
              <div className="mt-5 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-700">
                Explore
              </div>
            </motion.button>
          ))}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-indigo-600 active:scale-95"
          >
            {showAll ? "Show Less" : "See All Categories"}
            <ChevronDown size={16} className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedCat && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/65 backdrop-blur-sm"
              onClick={() => setSelectedCat(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24, rotateX: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ type: "spring", stiffness: 230, damping: 24 }}
              className="relative w-full max-w-lg rounded-[2rem] border border-slate-100 bg-white p-6 shadow-2xl sm:p-8"
              style={{ transformStyle: "preserve-3d" }}
            >
              <button
                onClick={() => setSelectedCat(null)}
                className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-500"
                aria-label="Close category details"
              >
                <X size={18} />
              </button>

              <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-4xl text-white shadow-lg ${selectedCat.color}`}>
                {selectedCat.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900">{selectedCat.title}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">{selectedCat.sub}</p>

              <div className="mt-6 space-y-2.5">
                {selectedCat.details.map((item) => (
                  <div key={item} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Categories;