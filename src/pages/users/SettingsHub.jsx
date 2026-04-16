import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  User, 
  ShieldCheck, 
  Bell, 
  Palette, 
  CreditCard, 
  Globe, 
  Smartphone, 
  Zap,
  ChevronRight,
  Store
} from "lucide-react";

const SettingsHub = () => {
  const settingGroups = [
    {
      title: "Compte & Sécurité",
      description: "Gérez vos informations personnelles et la sécurité de votre accès.",
      items: [
        { name: "Profil Public", icon: User, color: "text-blue-500", bg: "bg-blue-50", path: "/merchant/settings/profile" },
        { name: "Sécurité", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50", path: "/merchant/settings/security" },
      ]
    },
    {
      title: "Gestion d'Établissement",
      description: "Configurez le fonctionnement de votre boutique et vos services.",
      items: [
        { name: "Infos Boutique", icon: Store, color: "text-indigo-500", bg: "bg-indigo-50", path: "/merchant/settings/shop" },
        { name: "Notifications", icon: Bell, color: "text-orange-500", bg: "bg-orange-50", path: "/merchant/settings/notifications" },
        { name: "Apparence Web", icon: Palette, color: "text-pink-500", bg: "bg-pink-50", path: "/merchant/settings/appearance" },
      ]
    },
    {
      title: "Paiements & Région",
      description: "Modes de paiement, facturation et préférences locales.",
      items: [
        { name: "Facturation", icon: CreditCard, color: "text-purple-500", bg: "bg-purple-50", path: "/merchant/settings/billing" },
        { name: "Langue & Région", icon: Globe, color: "text-cyan-500", bg: "bg-cyan-50", path: "/merchant/settings/region" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* 🔝 Ultra Pro Sticky Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link 
            to="/merchant" 
            className="group flex items-center gap-3 text-slate-500 hover:text-slate-900 transition-all font-bold"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
              <ArrowLeft size={20} />
            </div>
            <span className="text-sm uppercase tracking-widest">Retour au Dashboard</span>
          </Link>
          
          <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full">
            <Zap size={16} className="text-indigo-600 fill-indigo-600" />
            <span className="text-xs font-black text-indigo-600 uppercase">Mode Édition Activé</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-12">
        {/* Header Title */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Réglages <span className="text-indigo-600">Système</span>
          </h1>
          <p className="text-slate-500 font-medium mt-3 text-lg">
            Configurez chaque aspect de votre expérience Bookiify.
          </p>
        </div>

        {/* Settings Grid */}
        <div className="space-y-16">
          {settingGroups.map((group, idx) => (
            <section key={idx}>
              <div className="mb-6">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider">{group.title}</h2>
                <p className="text-slate-400 font-medium text-sm">{group.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.items.map((item, i) => (
                  <Link
                    key={i}
                    to={item.path}
                    className="group relative bg-white border border-slate-200/60 p-6 rounded-[2rem] hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-8">
                      <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6 shadow-sm`}>
                        <item.icon size={28} />
                      </div>
                      <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                    </div>
                    
                    <h3 className="text-lg font-black text-slate-900 mb-1">{item.name}</h3>
                    <p className="text-slate-400 text-sm font-medium">Configurer les options de {item.name.toLowerCase()}.</p>
                    
                    {/* Hover Decoration */}
                    <div className="absolute bottom-4 right-6 opacity-10 group-hover:opacity-10 transition-opacity">
                        <item.icon size={60} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* PRO FOOTER CARD */}
        <div className="mt-20 p-8 rounded-[2.5rem] bg-slate-900 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-black text-white mb-2">Besoin d'aide avancée ?</h3>
              <p className="text-slate-400 font-medium">Nos experts sont disponibles pour configurer votre boutique avec vous.</p>
            </div>
            <button className="px-8 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-indigo-50 transition-all shadow-xl">
              Contacter le Support Pro
            </button>
          </div>
          <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
             <Smartphone size={200} className="text-white rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsHub;