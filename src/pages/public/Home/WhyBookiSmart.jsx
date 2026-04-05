import React from "react";

const WhyBookiSmart = () => {
  const benefits = {
    owners: [
      { title: "Dashboard Control", desc: "Manage staff, schedules, and analytics in one place.", icon: "📊" },
      { title: "Zero No-Shows", desc: "Automated SMS/Email reminders keep your calendar full.", icon: "🚫" },
      { title: "Flouci Integration", desc: "Get paid instantly and securely via Tunisia's top wallet.", icon: "💳" },
    ],
    clients: [
      { title: "Account-Free", desc: "Book in 15 seconds. No passwords to remember.", icon: "✨" },
      { title: "Smart Alerts", desc: "Get notified the moment a spot opens up on the waitlist.", icon: "📱" },
      { title: "Discovery", desc: "Find the best-rated professionals in your city instantly.", icon: "🔍" },
    ],
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* 🏆 Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight">
            Built for <span className="text-indigo-600">Pros</span>,<br /> 
            Loved by <span className="text-cyan-500">Clients.</span>
          </h2>
          <p className="mt-6 text-slate-500 font-medium text-lg">
            A dual-sided ecosystem designed to remove friction from every appointment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* 💼 FOR PROJECT OWNERS */}
          <div className="relative group p-8 md:p-12 rounded-[3rem] bg-slate-900 text-white overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl group-hover:bg-indigo-600/40 transition-all duration-700" />
            
            <div className="relative z-10">
              <span className="px-4 py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-xs font-black uppercase tracking-widest">
                Business Owners
              </span>
              <h3 className="text-3xl md:text-4xl font-black mt-6 mb-8">Scale your <br/>Professional Shop.</h3>
              
              <div className="space-y-8">
                {benefits.owners.map((b, i) => (
                  <div key={i} className="flex gap-5 items-start">
                    <div className="w-12 h-12 shrink-0 bg-white/10 rounded-2xl flex items-center justify-center text-2xl border border-white/10">
                      {b.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{b.title}</h4>
                      <p className="text-slate-400 text-sm mt-1 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ⚡ FOR CLIENTS */}
          <div className="relative group p-8 md:p-12 rounded-[3rem] bg-slate-50 border border-slate-200 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200">
             {/* Background Glow */}
             <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl group-hover:bg-cyan-400/20 transition-all duration-700" />

            <div className="relative z-10">
              <span className="px-4 py-1.5 bg-cyan-100 border border-cyan-200 rounded-full text-cyan-600 text-xs font-black uppercase tracking-widest">
                Clients & Users
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mt-6 mb-8">Booking has <br/>never been faster.</h3>
              
              <div className="space-y-8">
                {benefits.clients.map((b, i) => (
                  <div key={i} className="flex gap-5 items-start">
                    <div className="w-12 h-12 shrink-0 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-slate-100">
                      {b.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{b.title}</h4>
                      <p className="text-slate-500 text-sm mt-1 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* 🚀 Action Link */}
        <div className="mt-16 text-center">
            <p className="text-slate-400 font-bold text-sm">Join 500+ businesses already using Bookismart in Sousse & Tunis.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyBookiSmart;