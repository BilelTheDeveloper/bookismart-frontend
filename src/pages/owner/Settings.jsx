import React from "react";
import { 
    Plus,
  Building2, 
  Clock, 
  ShieldCheck, 
  Globe, 
  Camera, 
  MapPin, 
  Bell, 
  Save,
  ChevronRight
} from "lucide-react";

const Settings = () => {
  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Business Settings</h2>
          <p className="text-slate-500 font-medium font-black italic">Configure your brand identity and operational rules.</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all">
          <Save size={18} /> Save All Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT: NAVIGATION TABS --- */}
        <div className="space-y-2">
          {[
            { id: 'brand', label: 'Brand Identity', icon: <Building2 size={18} /> },
            { id: 'hours', label: 'Working Hours', icon: <Clock size={18} /> },
            { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
            { id: 'security', label: 'Security & Access', icon: <ShieldCheck size={18} /> },
            { id: 'domain', label: 'Custom Domain', icon: <Globe size={18} /> },
          ].map((tab) => (
            <button 
              key={tab.id}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                tab.id === 'brand' ? "bg-white shadow-md border border-slate-100 text-indigo-600" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-3 font-black text-sm uppercase tracking-widest">
                {tab.icon} {tab.label}
              </div>
              <ChevronRight size={16} className={tab.id === 'brand' ? "opacity-100" : "opacity-0"} />
            </button>
          ))}
        </div>

        {/* --- RIGHT: SETTINGS FORM --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Brand Identity Section */}
          <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-24 h-24 bg-slate-100 rounded-[2rem] border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-indigo-400 transition-all cursor-pointer overflow-hidden">
                   <Camera size={24} />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1.5 rounded-lg shadow-lg">
                  <Plus size={12} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Business Logo</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Public Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. SmartStyle Barber" 
                  className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-indigo-500 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Support Phone</label>
                <input 
                  type="text" 
                  placeholder="+216 -- --- ---" 
                  className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-indigo-500 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Business Address (Tunisia)</label>
              <div className="relative">
                <MapPin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Street name, City, Governorate" 
                  className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-indigo-500 transition-all outline-none"
                />
              </div>
            </div>
          </section>

          {/* Operational Rules Section */}
          <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Clock className="text-indigo-600" /> Operational Rules
            </h3>
            
            <div className="space-y-4">
              {[
                { label: "Online Booking", desc: "Allow customers to book from your website profile.", active: true },
                { label: "Instant Confirmation", desc: "Bookings are confirmed without manual approval.", active: true },
                { label: "SMS Reminders", desc: "Send automated text alerts 2 hours before.", active: false },
              ].map((rule, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-sm font-black text-slate-900">{rule.label}</p>
                    <p className="text-xs text-slate-500 font-medium">{rule.desc}</p>
                  </div>
                  <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-all duration-300 ${rule.active ? "bg-indigo-600" : "bg-slate-300"}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 ${rule.active ? "translate-x-6" : "translate-x-0"}`} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Danger Zone */}
          <section className="bg-rose-50 rounded-[2.5rem] p-8 border border-rose-100">
            <h3 className="text-lg font-black text-rose-900">Danger Zone</h3>
            <p className="text-sm text-rose-700/70 font-medium mt-1">Once you delete your business account, there is no going back.</p>
            <button className="mt-4 px-6 py-3 bg-white text-rose-600 border border-rose-200 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-rose-600 hover:text-white transition-all">
              Deactivate Business
            </button>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Settings;