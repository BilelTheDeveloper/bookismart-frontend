import React from "react";

const Hero = () => {
  return (
    /* 🎨 Background: Midnight Navy (#0f172a) with adaptive padding for mobile/desktop */
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 lg:pt-48 lg:pb-40 overflow-hidden bg-[#0f172a]">
      
      {/* 🛡️ Soft Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.15)_0%,_transparent_55%)] -z-0" />

      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        
        {/* Responsive Headline: text-4xl for mobile, 7xl for large screens */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.2] md:leading-[1.1]">
          Réservez Votre Prochain <br className="hidden sm:block" />
          Rendez-vous en un 
          <span className="inline-block ml-2 md:ml-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 [text-shadow:0_0_20px_rgba(34,211,238,0.4)]">
             Éclair
          </span>
          <span className="text-white">.</span>
        </h1>
        
        <p className="mt-6 md:mt-8 text-base md:text-xl text-slate-300 max-w-2xl mx-auto font-medium opacity-90 leading-relaxed">
          Barbiers à Sousse, Dentistes à Tunis. <br className="hidden md:block" />
          Simple, rapide, et sans compte.
        </p>

        {/* 🚀 Super Responsive Search Bar */}
        <div className="mt-10 md:mt-14 max-w-4xl mx-auto">
          {/* On mobile (flex-col): uses rounded-3xl and gap-1 
              On desktop (md:flex-row): uses rounded-full and gap-2 
          */}
          <div className="bg-white p-2 rounded-[2rem] md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-center gap-1 md:gap-2 border border-white/10">
            
            {/* Input 1: Quel Service */}
            <div className="flex-[1.2] w-full px-6 md:px-8 py-3 flex flex-col items-start border-b md:border-b-0 md:border-r border-slate-100 text-left">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Quel Service ?</span>
              <input 
                type="text" 
                placeholder="e.g. Coiffeur, Médecin..." 
                className="w-full bg-transparent outline-none text-slate-900 font-bold placeholder:text-slate-300 text-sm md:text-base"
              />
            </div>

            {/* Input 2: Quelle Ville */}
            <div className="flex-1 w-full px-6 md:px-8 py-3 flex flex-col items-start text-left">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Quelle Ville ?</span>
              <input 
                type="text" 
                placeholder="Sousse, Tunis..." 
                className="w-full bg-transparent outline-none text-slate-900 font-bold placeholder:text-slate-300 text-sm md:text-base"
              />
            </div>

            {/* The Search Button: Full width on mobile, auto width on desktop */}
            <button className="w-full md:w-auto px-10 md:px-12 py-4 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-black rounded-[1.5rem] md:rounded-full hover:scale-[1.02] transition-all shadow-[0_10px_25px_rgba(6,182,212,0.4)] active:scale-95 cursor-pointer text-sm md:text-base">
              Rechercher
            </button>
          </div>
        </div>
      </div>

      {/* 🌊 Bottom Transition to White Section */}
      <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;