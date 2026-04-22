import React from "react";
import { motion } from "framer-motion";

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
    <section className="overflow-hidden bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <h2 className="text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl">
            Built for <span className="text-indigo-600">Pros</span>,<br /> 
            Loved by <span className="text-cyan-500">Clients.</span>
          </h2>
          <p className="mt-6 text-lg font-medium text-slate-500">
            A dual-sided ecosystem designed to remove friction from every appointment.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="group relative overflow-hidden rounded-[2.2rem] bg-slate-900 p-8 text-white shadow-2xl shadow-indigo-900/10 md:p-10"
          >
            <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-indigo-500/25 blur-3xl transition-all duration-700 group-hover:scale-110" />
            <div className="relative z-10">
              <span className="rounded-full border border-indigo-400/30 bg-indigo-500/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-indigo-300">
                Business Owners
              </span>
              <h3 className="mb-8 mt-6 text-3xl font-black md:text-4xl">Scale your professional shop.</h3>
              
              <div className="space-y-8">
                {benefits.owners.map((b, i) => (
                  <div key={b.title} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-2xl">
                      {b.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{b.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="group relative overflow-hidden rounded-[2.2rem] border border-slate-200 bg-slate-50 p-8 shadow-xl shadow-slate-200/50 md:p-10"
          >
             <div className="absolute -bottom-16 -left-14 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl transition-all duration-700 group-hover:scale-110" />
            <div className="relative z-10">
              <span className="rounded-full border border-cyan-200 bg-cyan-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-cyan-600">
                Clients & Users
              </span>
              <h3 className="mb-8 mt-6 text-3xl font-black text-slate-900 md:text-4xl">Booking has never been faster.</h3>
              
              <div className="space-y-8">
                {benefits.clients.map((b, i) => (
                  <div key={b.title} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white text-2xl shadow-sm">
                      {b.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{b.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        <div className="mt-16 text-center">
          <p className="text-sm font-bold text-slate-400">
            Join 500+ businesses already using Bookiify in Sousse and Tunis.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyBookiSmart;