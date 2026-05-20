import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [service, setService] = useState("");
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (service.trim()) params.set("service", service.trim());
    if (city.trim()) params.set("city", city.trim());
    navigate(`/professionals?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 pb-28 pt-28 sm:pt-32 md:pb-32 lg:pb-40 lg:pt-44">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950" />
        <motion.div
          className="absolute -left-12 top-16 h-64 w-64 rounded-full bg-indigo-500/25 blur-3xl sm:h-80 sm:w-80"
          animate={{ x: [0, 20, 0], y: [0, 18, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-8 top-36 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl sm:h-96 sm:w-96"
          animate={{ x: [0, -24, 0], y: [0, -18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 h-48 w-48 rounded-full bg-violet-500/15 blur-3xl"
          animate={{ x: [0, 16, 0], y: [0, -12, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200 sm:text-xs">
            {t("home.hero.badge")}
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:mt-6 sm:text-5xl md:text-6xl lg:text-7xl">
            {t("home.hero.title")}
            <span className="block bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              {t("home.hero.titleHighlight")}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-relaxed text-slate-300 sm:text-base md:text-xl">
            {t("home.hero.description")}
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.65 }}
          className="mx-auto mt-8 max-w-5xl sm:mt-10"
        >
          <form
            onSubmit={handleSearch}
            className="rounded-[2rem] border border-white/20 bg-white/95 p-2 shadow-[0_30px_80px_rgba(2,6,23,0.45)] md:rounded-full"
          >
            <div className="flex flex-col gap-0 md:flex-row md:items-center">
              {/* Service input */}
              <div className="flex w-full items-center gap-3 border-b border-slate-100 px-5 py-3 md:flex-1 md:border-b-0 md:border-r md:px-7">
                <Search size={16} className="shrink-0 text-slate-400" />
                <div className="flex-1 text-left">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{t("home.hero.serviceLabel")}</span>
                  <input
                    type="text"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    placeholder={t("home.hero.servicePlaceholder")}
                    className="mt-0.5 w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 md:text-base"
                  />
                </div>
              </div>

              {/* City input */}
              <div className="flex w-full items-center gap-3 px-5 py-3 md:flex-1 md:px-7">
                <MapPin size={16} className="shrink-0 text-slate-400" />
                <div className="flex-1 text-left">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{t("home.hero.cityLabel")}</span>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={t("home.hero.cityPlaceholder")}
                    className="mt-0.5 w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 md:text-base"
                  />
                </div>
              </div>

              {/* Search button */}
              <button
                type="submit"
                className="mx-1 mb-1 mt-1 rounded-[1.3rem] bg-gradient-to-r from-indigo-600 to-cyan-500 px-8 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95 md:mx-0 md:mb-0 md:mt-0 md:rounded-full md:px-10"
              >
                {t("home.hero.searchBtn")}
              </button>
            </div>
          </form>

          {/* Quick category chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-2"
          >
            {[
              { label: "✂️ Hair Salon", value: "Hair Salon" },
              { label: "🏥 Doctor", value: "Doctor" },
              { label: "🏋️ Gym", value: "Gym" },
              { label: "🐾 Vet", value: "Vet" },
              { label: "📸 Photographer", value: "Photographer" },
            ].map((chip) => (
              <button
                key={chip.value}
                type="button"
                onClick={() => { setService(chip.value); }}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20 hover:text-white active:scale-95"
              >
                {chip.label}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-white via-white/60 to-transparent" />
    </section>
  );
};

export default Hero;
