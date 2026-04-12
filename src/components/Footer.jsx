import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 overflow-hidden relative">
      {/* 🌌 Background Glow for "Premium" Feel */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* 🚀 Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 group cursor-default">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <span className="font-black text-xl">B</span>
              </div>
              <span className="text-2xl font-black tracking-tighter italic">
                Book<span className="text-indigo-500">ify</span>
              </span>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed max-w-xs">
              The first "Web inside a Web" ecosystem in Tunisia. Empowering professionals to automate their growth.
            </p>
            <div className="flex gap-4">
              {['fb', 'ig', 'in'].map((social) => (
                <div key={social} className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-all cursor-pointer">
                  <span className="text-xs font-black uppercase tracking-widest">{social}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 🔗 Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-400">Platform</h4>
            <ul className="space-y-4">
              {['Browse Categories', 'For Professionals', 'Smart Waiting List', 'Help Center'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 font-bold hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* 🛡️ Trust & Security */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-400">Security</h4>
            <ul className="space-y-4">
              {['Ultra-Pro Shield', 'Privacy Policy', 'Terms of Service', 'Verified Partners'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 font-bold hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
            {/* Flouci Badge */}
            <div className="pt-4 flex items-center gap-3">
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-slate-400">Powered by</span>
                <span className="text-sm font-black text-cyan-400">Flouci</span>
              </div>
            </div>
          </div>

          {/* 📬 Newsletter / Sousse Office */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-400">Newsletter</h4>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Your email address" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-indigo-600 text-white px-4 rounded-xl font-black text-xs hover:bg-indigo-700 transition-colors">
                JOIN
              </button>
            </div>
            <p className="text-xs text-slate-500 font-bold flex items-center gap-2">
              📍 Based in Sousse, Tunisia
            </p>
          </div>
        </div>

        {/* 📜 Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">
            © {currentYear} TunisiaSmart Ecosystem. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] font-black text-slate-600 tracking-tighter uppercase cursor-default hover:text-indigo-400 transition-colors">Ultra Security V1.0</span>
            <span className="text-[10px] font-black text-slate-600 tracking-tighter uppercase cursor-default hover:text-indigo-400 transition-colors">Tunisia SaaS v4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;