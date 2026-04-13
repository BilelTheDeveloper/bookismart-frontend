import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scissors, 
  Flower2, 
  Sparkles, 
  Paintbrush, 
  Wind, 
  Layout, 
  Eye, 
  Settings2,
  ChevronRight
} from 'lucide-react';

const templates = [
  { 
    id: 'barbershops', 
    name: 'Elite Barber', 
    category: "Beauty & Barbers", 
    themePath: 'barbershops', 
    icon: Scissors, 
    img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800', 
    color: 'bg-orange-500',
    description: 'Rugged, classic aesthetic for premium grooming.'
  },
  { 
    id: 'hair-salons', 
    name: 'Vogue Salon', 
    category: "Beauty & Barbers", 
    themePath: 'hair-salons',
    icon: Wind, 
    img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800', 
    color: 'bg-rose-500',
    description: 'High-fashion editorial layout for hair stylists.'
  },
  { 
    id: 'makeup-artists', 
    name: 'Glam Studio', 
    category: "Beauty & Barbers", 
    themePath: 'makeup-artists',
    icon: Paintbrush, 
    img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800', 
    color: 'bg-purple-500',
    description: 'Portfolio-first design for professional MUA artists.'
  },
  { 
    id: 'nail-salons', 
    name: 'Gloss & Glam', 
    category: "Beauty & Barbers", 
    themePath: 'nail-salons',
    icon: Sparkles, 
    img: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=800', 
    color: 'bg-pink-500',
    description: 'Modern, vibrant colors for nail art specialists.'
  },
  { 
    id: 'spas', 
    name: 'Zen Retreat', 
    category: "Beauty & Barbers", 
    themePath: 'spas',
    icon: Flower2, 
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecee?q=80&w=800', 
    color: 'bg-teal-500',
    description: 'Minimalist, tranquil layout for wellness centers.'
  }
];

const TemplateGallery = () => {
  const navigate = useNavigate();
  
  // 1. Get user from storage
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  
  // 2. CORRECTION: Using "category" from DB
  const userCategory = savedUser?.category; 

  // 3. Filter logic - Ensuring we match the "Beauty & Barbers" string exactly
  const filteredTemplates = templates.filter(tpl => tpl.category === userCategory);

  return (
    <div className="p-6 md:p-12 bg-white min-h-screen">
      <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
             <div className="h-1 w-8 bg-rose-500 rounded-full"></div>
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500">Selection Gallery</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Business <br /> <span className="text-slate-300">Templates</span>
          </h1>
          <p className="text-slate-500 font-medium mt-6 max-w-lg">
            {filteredTemplates.length > 0 
              ? `We have curated ${filteredTemplates.length} ultra-premium layouts specifically for your ${userCategory} brand.` 
              : `Browse our professional layouts designed for ${userCategory || 'modern businesses'}.`}
          </p>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 hidden lg:block">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                 <Layout className="text-slate-400" size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Category</p>
                 <p className="text-sm font-bold text-slate-900 uppercase">{userCategory || "Not Specified"}</p>
              </div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((tpl) => (
            <div 
              key={tpl.id}
              className="group bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col relative"
            >
              {/* IMAGE WRAPPER */}
              <div className="h-72 relative overflow-hidden">
                <img 
                  src={tpl.img} 
                  alt={tpl.name} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60"></div>
                
                {/* FLOATING ICON */}
                <div className={`absolute top-6 left-6 ${tpl.color} p-4 rounded-2xl text-white shadow-2xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-500`}>
                  <tpl.icon size={24} />
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2 group-hover:text-rose-500 transition-colors">
                    {tpl.name}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">
                    {tpl.description}
                  </p>
                </div>
                
                <div className="mt-auto grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => navigate(`/merchant/templates/preview/${tpl.themePath}`)}
                    className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-50 text-slate-900 text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all transform active:scale-95"
                  >
                    <Eye size={14} /> Preview
                  </button>

                  <button 
                    onClick={() => navigate(`/merchant/templates/setup/${tpl.id}`)}
                    className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 shadow-xl shadow-rose-100 transition-all transform active:scale-95"
                  >
                    <Settings2 size={14} /> Customize
                  </button>
                </div>
              </div>

              {/* ULTRA PRO TAG */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="bg-white/20 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full border border-white/30">
                   Premium Layout
                 </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-32 border-4 border-dashed border-slate-50 rounded-[4rem] flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-8">
              <Layout size={48} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">No Layouts Matched</h3>
            <p className="text-slate-400 max-w-sm mt-4 font-medium leading-relaxed">
              Your account is registered under <b className="text-slate-900">"{userCategory}"</b>. 
              Please ensure your business profile is correctly configured to see available themes.
            </p>
            <button 
               onClick={() => navigate('/merchant')}
               className="mt-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:gap-4 transition-all"
            >
              Back to Dashboard <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-20 pt-12 border-t border-slate-50 flex justify-between items-center opacity-30">
         <p className="text-[10px] font-black uppercase tracking-widest">Bookismart Engine v3.0</p>
         <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
         </div>
      </div>
    </div>
  );
};

export default TemplateGallery;