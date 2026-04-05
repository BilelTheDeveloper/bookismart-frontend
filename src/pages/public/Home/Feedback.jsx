import React from "react";

const feedbacks = [
  {
    id: 1,
    name: "Ahmed Ben Salem",
    role: "Owner, The Fade Shop",
    location: "Sousse",
    content: "Since moving my barbershop to BookiSmart, I've seen a 40% decrease in no-shows. The auto-reminders are a game changer for my staff.",
    avatar: "👨‍💼",
    rating: 5
  },
  {
    id: 2,
    name: "Selima Dridi",
    role: "Studio Director",
    location: "Tunis, Lac 2",
    content: "My clients love that they don't need an account. They just pick a time and book. It's the fastest system I've used in Tunisia.",
    avatar: "👩‍🎨",
    rating: 5
  },
  {
    id: 3,
    name: "Dr. Mourad K.",
    role: "Orthodontist",
    location: "Sfax",
    content: "The 'Smart Waiting List' is incredible. When a patient cancels, the spot is filled within minutes. Zero wasted time in my clinic.",
    avatar: "👨‍⚕️",
    rating: 5
  }
];

const Feedback = () => {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* 🌟 Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-indigo-600 font-black text-sm uppercase tracking-[0.3em]">Community</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 tracking-tighter">
            Trusted by <span className="text-slate-400">Professionals.</span>
          </h2>
          <p className="text-slate-500 font-medium mt-4">
            Hear from the business owners who scaled their projects with BookiSmart.
          </p>
        </div>

        {/* 💬 Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {feedbacks.map((f) => (
            <div 
              key={f.id} 
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div>
                <div className="flex gap-1 text-amber-400 mb-6">
                  {[...Array(f.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-slate-700 font-medium leading-relaxed italic">
                  "{f.content}"
                </p>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-2xl shadow-inner">
                  {f.avatar}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm leading-tight">{f.name}</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                    {f.role} • {f.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 📈 Trust Metric */}
        <div className="mt-16 pt-12 border-t border-slate-200 flex flex-wrap justify-center gap-8 md:gap-20 opacity-50 grayscale">
            <span className="font-black text-2xl text-slate-400 tracking-tighter italic">RELIABLE</span>
            <span className="font-black text-2xl text-slate-400 tracking-tighter italic">SECURE</span>
            <span className="font-black text-2xl text-slate-400 tracking-tighter italic">SMART</span>
            <span className="font-black text-2xl text-slate-400 tracking-tighter italic">FAST</span>
        </div>
      </div>
    </section>
  );
};

export default Feedback;