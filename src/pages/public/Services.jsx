import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Smart Booking System",
    desc: "A seamless, account-free booking experience for your clients. Optimized for mobile users in Tunisia.",
    icon: "📅",
    features: ["Instant Confirmation", "No Password Required", "Calendar Sync"],
    color: "from-indigo-600 to-blue-500"
  },
  {
    title: "Multi-User Dashboard",
    desc: "Manage your entire team. Assign specific roles, track performance, and view individual schedules effortlessly.",
    icon: "📊",
    features: ["Staff Accounts", "Role Permissions", "Real-time Analytics"],
    color: "from-cyan-500 to-blue-400"
  },
  {
    title: "Smart Waiting List",
    desc: "Never leave a gap in your schedule. When a client cancels, our system automatically notifies the next person in line.",
    icon: "🔔",
    features: ["Auto-Fill Gaps", "SMS Notifications", "Priority Queue"],
    color: "from-purple-600 to-indigo-400"
  },
  {
    title: "Secure Payments (Flouci)",
    desc: "Integrated with Tunisia's leading digital wallet. Accept deposits or full payments securely and instantly.",
    icon: "💳",
    features: ["Flouci Integration", "Ultra-Secure", "Automated Invoicing"],
    color: "from-emerald-500 to-teal-400"
  },
  {
    title: "CRM & Client History",
    desc: "Keep a digital record of every client. Know their preferences, past services, and total spending at a glance.",
    icon: "👤",
    features: ["Client Profiles", "Visit History", "Preference Notes"],
    color: "from-amber-500 to-orange-400"
  },
  {
    title: "Business Marketing",
    desc: "Get discovered in your city. Your business appears in our smart categories, helping new clients find you in Sousse, Tunis, and beyond.",
    icon: "📈",
    features: ["SEO Optimized", "City Discovery", "Review Management"],
    color: "from-rose-500 to-pink-400"
  }
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 🚀 Hero Header */}
      <section className="pt-40 pb-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-cyan-400 font-black text-sm uppercase tracking-[0.4em]">Our Capabilities</span>
          <h1 className="text-5xl md:text-7xl font-black mt-6 tracking-tighter leading-tight">
            The Full <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Digital Toolkit.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mt-8 max-w-3xl mx-auto font-medium">
            We provide the infrastructure. You provide the expertise. Together, we build the future of service-based business in Tunisia.
          </p>
        </div>
      </section>

      {/* 🛠️ Services Grid */}
      <main className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div 
              key={i} 
              className="group relative p-10 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              {/* Icon & Title */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-3xl text-white mb-8 shadow-lg`}>
                {s.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{s.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">
                {s.desc}
              </p>

              {/* Feature List */}
              <ul className="space-y-3 border-t border-slate-50 pt-8">
                {s.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-[3rem] border-2 border-transparent group-hover:border-indigo-100 transition-colors pointer-events-none" />
            </div>
          ))}
        </div>
      </main>

      {/* 🏁 Bottom Call to Action */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto bg-indigo-600 rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
          
          <h2 className="text-3xl md:text-5xl font-black tracking-tight relative z-10">
            Everything you need for <br /> <span className="italic opacity-80 underline decoration-cyan-400">90 days, for free.</span>
          </h2>
          <p className="text-indigo-100 font-medium mt-8 text-lg max-w-xl mx-auto relative z-10">
            Take your business to the next level with our ultra-secure ecosystem.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6 relative z-10">
            <Link to="/pricing" className="px-12 py-5 bg-white text-indigo-600 font-black rounded-2xl shadow-xl hover:bg-slate-50 transition-all active:scale-95">
              View Pricing
            </Link>
            <button className="px-12 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all active:scale-95">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;