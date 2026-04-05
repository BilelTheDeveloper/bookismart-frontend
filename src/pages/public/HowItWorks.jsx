import React from "react";

const steps = [
  {
    id: "01",
    title: "Create Your Smart Shop",
    desc: "Sign up in 60 seconds. Customize your services, set your prices, and launch your dedicated booking link.",
    icon: "🏗️",
    color: "bg-indigo-600",
  },
  {
    id: "02",
    title: "Onboard Your Staff",
    desc: "Add your team members and assign their schedules. Each staff member gets their own mini-dashboard.",
    icon: "👥",
    color: "bg-cyan-500",
  },
  {
    id: "03",
    title: "Automate Bookings",
    desc: "Your clients book 24/7. Our Smart Waiting List and Flouci payments handle the rest while you work.",
    icon: "🚀",
    color: "bg-emerald-500",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      {/* 🎨 Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-32 -z-10" />

      <div className="container mx-auto px-6">
        
        {/* 🏆 Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-indigo-600 font-black text-sm uppercase tracking-[0.3em]">The Process</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mt-4 tracking-tighter">
            3 Steps to <span className="text-slate-400">Freedom.</span>
          </h2>
          <p className="text-slate-500 font-medium mt-6 text-lg">
            We’ve removed the complexity of tech. You focus on your craft; we handle the digital infrastructure.
          </p>
        </div>

        {/* 🛠️ Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-slate-200 -z-10" />

          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="group relative bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3"
            >
              {/* Number Badge */}
              <div className="absolute -top-6 left-10 w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-xl group-hover:bg-indigo-600 transition-colors">
                {step.id}
              </div>

              {/* Icon */}
              <div className={`w-20 h-20 ${step.color} rounded-[2rem] flex items-center justify-center text-4xl text-white mb-8 shadow-2xl shadow-inherit`}>
                {step.icon}
              </div>

              {/* Text */}
              <h3 className="text-2xl font-black text-slate-900 mb-4">{step.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                {step.desc}
              </p>

              {/* Decoration for flow */}
              {index !== steps.length - 1 && (
                <div className="absolute -right-6 top-1/2 hidden lg:block text-slate-300 animate-pulse text-2xl">
                  ➔
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 📊 Visual Proof / CTA */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8 bg-slate-900 p-8 md:p-12 rounded-[3rem] text-white">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-black italic tracking-tight">Ready to transform your business?</h4>
            <p className="text-slate-400 font-bold mt-1 text-sm uppercase tracking-widest">Start your 90-day journey today.</p>
          </div>
          <button className="px-10 py-5 bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-500/20 active:scale-95">
            GET STARTED NOW
          </button>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;