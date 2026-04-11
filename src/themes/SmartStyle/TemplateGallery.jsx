import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Scissors, Flower2, Sparkles, Paintbrush, Wind, CheckCircle2, Layout } from 'lucide-react';

const templates = [
  { 
    id: 'barbershops', 
    name: 'Elite Barber', 
    category: 'barbershop', // Match with your DB workType
    themePath: 'barbershops', 
    icon: Scissors, 
    img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=500', 
    color: 'bg-orange-500' 
  },
  { 
    id: 'hair-salons', 
    name: 'Vogue Salon', 
    category: 'hair-salon', // Match with your DB workType
    themePath: 'hair-salons',
    icon: Wind, 
    img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=500', 
    color: 'bg-rose-500' 
  },
  { 
    id: 'spas', 
    name: 'Zen Retreat', 
    category: 'spa', // Match with your DB workType
    themePath: 'spas',
    icon: Flower2, 
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecee?q=80&w=500', 
    color: 'bg-teal-500' 
  },
  { 
    id: 'nail-salons', 
    name: 'Gloss & Glam', 
    category: 'nail-salon', // Match with your DB workType
    themePath: 'nail-salons',
    icon: Sparkles, 
    img: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=500', 
    color: 'bg-pink-500' 
  },
  { 
    id: 'makeup-artists', 
    name: 'Pro Visuals', 
    category: 'makeup-artist', // Match with your DB workType
    themePath: 'makeup-artists',
    icon: Paintbrush, 
    img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=500', 
    color: 'bg-violet-500' 
  },
];

const TemplateGallery = () => {
  const navigate = useNavigate();
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  
  // 🔍 Extract the user's category (workType)
  const userCategory = savedUser?.workType?.toLowerCase(); 
  const currentActive = savedUser?.workType;

  // 🛡️ Filter Logic: Only show templates that match the merchant's category
  const filteredTemplates = templates.filter(tpl => tpl.category === userCategory);

  return (
    <div className="p-10 bg-white min-h-screen">
      <header className="mb-12">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Website <span className="text-rose-500">Templates</span>
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          {filteredTemplates.length > 0 
            ? `Exclusive layouts for your ${userCategory} business.` 
            : "Choose a specialized layout for your online booking site."}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((tpl) => (
            <div 
              key={tpl.id}
              className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border-b-4 hover:border-b-rose-500 flex flex-col"
            >
              {/* Preview Image */}
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={tpl.img} 
                  alt={tpl.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                
                {/* Active Badge Logic */}
                {currentActive === tpl.name && (
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 shadow-lg z-10 animate-in fade-in zoom-in">
                    <CheckCircle2 size={12} /> Active
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`${tpl.color} p-2.5 rounded-xl text-white shadow-lg`}>
                    <tpl.icon size={20} />
                  </div>
                  <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">
                    {tpl.name}
                  </h3>
                </div>
                
                <div className="mt-auto flex gap-3">
                  <button 
                    onClick={() => navigate(`/merchant/templates/preview/${tpl.themePath}`)}
                    className="flex-1 py-3.5 rounded-2xl bg-slate-50 text-slate-900 text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all duration-300"
                  >
                    Live Preview
                  </button>

                  <button 
                    onClick={() => navigate(`/merchant/templates/setup/${tpl.id}`)}
                    className="flex-1 py-3.5 rounded-2xl bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 shadow-lg shadow-rose-100 transition-all duration-300"
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* Fallback when no theme matches the category yet */
          <div className="col-span-full py-20 border-2 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
              <Layout size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Custom Theme Required</h3>
            <p className="text-slate-500 max-w-xs mt-2 font-medium">
              We haven't launched a specialized template for <b>{userCategory || "your category"}</b> yet. 
              Contact support to request a custom layout!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateGallery;