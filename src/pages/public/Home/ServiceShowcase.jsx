import React from "react";

const ServiceShowcase = () => {
  const features = [
    {
      title: "Web Inside a Web",
      desc: "Your own professional digital storefront. No coding, just a powerful dashboard to manage your entire business.",
      icon: "🌐",
    },
    {
      title: "Smart Booking",
      desc: "Clients book in 3 clicks. No accounts, no passwords, no wasted time. Just pure speed.",
      icon: "⚡",
    },
    {
      title: "Smart Waiting List",
      desc: "An appointment cancelled? Our system automatically notifies the next person on the list. Zero empty slots.",
      icon: "🔔",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* 🖼️ Left Side: Visual "App Preview" - Fully Responsive */}
          <div className="w-full lg:flex-1 relative order-2 lg:order-1">
            {/* Main Mockup Container */}
            <div className="relative z-10 bg-[#0f172a] rounded-[2rem] md:rounded-[3rem] p-1.5 md:p-2.5 shadow-[0_40px_80px_-15px_rgba(15,23,42,0.2)] border-[6px] md:border-[10px] border-slate-900 mx-auto max-w-lg lg:max-w-none">
              <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden aspect-video flex flex-col">
                {/* Mockup Browser Header */}
                <div className="h-8 md:h-12 border-b border-slate-100 flex items-center px-4 md:px-6 gap-1.5 md:gap-2">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-400" />
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-amber-400" />
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-emerald-400" />
                </div>
                {/* Mockup Content Layout */}
                <div className="p-4 md:p-8 flex-1 bg-slate-50">
                  <div className="w-20 md:w-32 h-3 md:h-4 bg-slate-200 rounded-full mb-6" />
                  <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8">
                    <div className="h-16 md:h-24 bg-indigo-50 rounded-xl md:rounded-3xl border border-indigo-100 animate-pulse" />
                    <div className="h-16 md:h-24 bg-indigo-50 rounded-xl md:rounded-3xl border border-indigo-100 animate-pulse" />
                    <div className="h-16 md:h-24 bg-indigo-50 rounded-xl md:rounded-3xl border border-indigo-100 animate-pulse" />
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <div className="w-full h-10 md:h-14 bg-white rounded-lg md:rounded-2xl shadow-sm border border-slate-100" />
                    <div className="w-full h-10 md:h-14 bg-white rounded-lg md:rounded-2xl shadow-sm border border-slate-100 opacity-50" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* 🛡️ Floating Badge - Responsive Sizing */}
            <div className="absolute -bottom-4 -right-2 md:-bottom-8 md:-right-8 z-20 bg-cyan-400 text-slate-900 p-4 md:p-7 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl scale-75 md:scale-100 border-4 border-white">
              <p className="text-[10px] font-black uppercase tracking-widest mb-1">Live Demo</p>
              <p className="font-black text-sm md:text-lg leading-tight">Waiting List<br/>Active ⚡</p>
            </div>
          </div>

          {/* 📝 Right Side: Content - Centered on Mobile */}
          <div className="w-full lg:flex-1 space-y-8 md:space-y-12 order-1 lg:order-2 text-center lg:text-left">
            <div>
              <span className="text-indigo-600 font-black text-sm uppercase tracking-[0.3em]">
                Engine Features
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mt-4 leading-[1.1] tracking-tighter">
                Your business, <br />
                <span className="text-slate-400">on autopilot.</span>
              </h2>
              <p className="text-slate-500 text-base md:text-xl mt-6 font-medium max-w-xl mx-auto lg:mx-0">
                A high-performance ecosystem designed to save you hours every week. More bookings, zero stress.
              </p>
            </div>

            <div className="space-y-6 md:space-y-10 text-left">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-4 md:gap-6 group">
                  <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-white rounded-xl md:rounded-2xl shadow-md flex items-center justify-center text-xl md:text-3xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-2xl font-black text-slate-900">{f.title}</h3>
                    <p className="text-slate-500 text-sm md:text-base font-medium mt-1 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button className="w-full sm:w-auto px-10 md:px-12 py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 transition-all text-sm md:text-lg">
                Start 3-Month Free Trial
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceShowcase;