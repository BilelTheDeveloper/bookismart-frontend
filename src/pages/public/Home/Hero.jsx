import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 pb-20 pt-28 sm:pt-32 md:pb-24 lg:pb-32 lg:pt-40">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/75 to-slate-950" />
        <motion.div
          className="absolute -left-12 top-16 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, 18, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-8 top-36 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
          animate={{ x: [0, -24, 0], y: [0, -18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            Modern Booking Engine
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Book appointments faster with a
            <span className="block bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              premium digital experience.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-300 sm:text-lg md:text-xl">
            From salons to clinics, Bookiify helps clients book instantly while your team runs on autopilot.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.65 }}
          className="mx-auto mt-10 max-w-5xl"
        >
          <div className="rounded-[2rem] border border-white/20 bg-white/95 p-2 shadow-[0_30px_80px_rgba(2,6,23,0.45)] md:rounded-full">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <div className="w-full px-5 py-3 text-left md:flex-1 md:border-r md:border-slate-100 md:px-7">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Service</span>
                <input
                  type="text"
                  placeholder="Hair Salon, Dentist, Therapist..."
                  className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 md:text-base"
                />
              </div>
              <div className="w-full px-5 py-3 text-left md:flex-1 md:px-7">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">City</span>
                <input
                  type="text"
                  placeholder="Tunis, Sousse, Sfax..."
                  className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 md:text-base"
                />
              </div>
              <button className="mx-1 mb-1 mt-1 rounded-[1.3rem] bg-gradient-to-r from-indigo-600 to-cyan-500 px-8 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-95 md:mx-0 md:mb-0 md:mt-0 md:rounded-full md:px-10">
                Search Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white via-white/70 to-transparent" />
    </section>
  );
};

export default Hero;