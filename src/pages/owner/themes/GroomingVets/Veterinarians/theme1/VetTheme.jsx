import React, { useState, useEffect } from "react";
import { Phone, MapPin, Clock, Menu, X, Calendar, CheckCircle, Heart, AlertCircle, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);
const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

const PawIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <ellipse cx="6" cy="8.5" rx="2" ry="3" />
    <ellipse cx="12" cy="6" rx="2" ry="3" />
    <ellipse cx="18" cy="8.5" rx="2" ry="3" />
    <path d="M12 14c-4 0-7 2-7 4.5S8 22 12 22s7-1.5 7-3.5S16 14 12 14z" />
  </svg>
);

const VetTheme = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!data) return null;
  const { hero, about, services, gallery, contact, businessHours, ownerId } = data;
  const activeServices = (services || []).filter(s => s?.active !== false);
  const galleryImages = (gallery?.images || []).filter(Boolean);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="bg-white text-slate-900 font-sans overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
        isScrolled ? "py-4 bg-white/95 backdrop-blur-xl border-b border-blue-100 shadow-sm" : "py-8 bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-700/30">
              <PawIcon size={20} className="text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 uppercase">
              {ownerId?.businessName || "Vet Care Clinic"}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-blue-700 transition-colors">
                {link.name}
              </a>
            ))}
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-6 py-2.5 bg-blue-700 hover:bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95">
                Book Appointment
              </button>
            </Link>
          </div>
          <button className="md:hidden text-slate-700" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[1001] bg-white p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-2">
                <PawIcon size={24} className="text-blue-700" />
                <span className="text-xl font-black text-blue-700 uppercase">{ownerId?.businessName || "Vet Care"}</span>
              </div>
              <X size={32} onClick={() => setMobileMenuOpen(false)} className="cursor-pointer text-slate-400" />
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-black uppercase tracking-tight text-slate-900 border-b border-slate-100 pb-4">
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-auto space-y-4">
              <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-200 rounded-2xl">
                <AlertCircle size={20} className="text-rose-500 shrink-0" />
                <div>
                  <p className="text-xs font-black text-rose-700 uppercase tracking-wide">Emergency Line</p>
                  <p className="text-rose-600 font-bold text-sm">{contact?.phone || "+216 XX XXX XXX"}</p>
                </div>
              </div>
              <Link to={`/book/${ownerId?._id}`}>
                <button className="w-full py-5 bg-blue-700 text-white font-black rounded-2xl uppercase tracking-widest text-xs">
                  Book Appointment
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero?.backgroundImage || "https://images.unsplash.com/photo-1559190394-df5a28aab5c5?q=80&w=2070&auto=format&fit=crop"})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/80 to-blue-900/30" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-6 max-w-7xl mx-auto w-full"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-teal-500/20 border border-teal-400/30 rounded-full text-teal-300 text-[10px] font-black uppercase tracking-[0.5em]">
              <PawIcon size={12} /> {data.category} • {ownerId?.ville}
            </span>
            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-white leading-[0.9]">
              EXPERT CARE<br />
              FOR YOUR<br />
              <span className="text-teal-300">COMPANIONS</span>
            </h1>
            <p className="text-xl text-blue-200 font-medium mb-10 leading-relaxed">
              {hero?.slogan || "Professional veterinary services with compassion, precision, and dedication to every patient."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start mb-12">
              <Link to={`/book/${ownerId?._id}`}>
                <button className="px-10 py-5 bg-teal-500 hover:bg-teal-400 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-xs transition-all shadow-xl">
                  Book Appointment
                </button>
              </Link>
              <div className="flex items-center gap-3 px-6 py-4 bg-rose-500/20 border border-rose-400/30 rounded-2xl">
                <AlertCircle size={18} className="text-rose-300" />
                <div>
                  <p className="text-[9px] text-rose-300 font-black uppercase tracking-widest">Emergency</p>
                  <p className="text-white font-black">{contact?.phone || "+216 XX XXX XXX"}</p>
                </div>
              </div>
            </div>
            {/* Trust badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Licensed Vets", "Emergency Care", "All Species", "Modern Equipment"].map((b, i) => (
                <div key={i} className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-xs text-blue-100 font-bold tracking-wide text-center">
                  <CheckCircle size={10} className="inline-block mr-1 text-teal-300" />{b}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[10px] font-black text-blue-700 uppercase tracking-[0.5em] mb-4">Medical Services</p>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Veterinary<br />Care
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeServices.length > 0 ? activeServices : [
              { title: "Wellness Exam", description: "Complete health check-up for your pet — annual or bi-annual.", price: "60", duration: "30" },
              { title: "Vaccination Pack", description: "Core vaccinations and booster shots tailored to your pet.", price: "80", duration: "20" },
              { title: "Dental Cleaning", description: "Professional dental prophylaxis under safe anesthesia.", price: "150", duration: "120" },
              { title: "Surgery Consult", description: "Pre-surgical consultation and evaluation with our surgical team.", price: "90", duration: "45" },
              { title: "Emergency Care", description: "24/7 emergency evaluation and stabilization services.", price: "120", duration: "60" },
              { title: "Exotic Pet Care", description: "Specialized care for birds, reptiles, rabbits, and small mammals.", price: "80", duration: "30" },
            ]).map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                    <PawIcon size={20} className="text-blue-700 group-hover:text-white transition-colors" />
                  </div>
                  {service.title === "Emergency Care" && (
                    <span className="px-2 py-0.5 bg-rose-50 border border-rose-200 rounded-full text-[9px] font-black text-rose-600 uppercase tracking-widest">24/7</span>
                  )}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{service.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <Clock size={12} className="text-teal-500" />
                    <span>{service.duration} min</span>
                  </div>
                  <span className="text-2xl font-black text-slate-900">{service.price} <small className="text-teal-500 text-xs">TND</small></span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to={`/book/${ownerId?._id}`}>
              <button className="px-12 py-5 bg-blue-700 hover:bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest text-xs transition-all shadow-xl shadow-blue-700/20">
                Book an Appointment
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      {about?.show && (
        <section id="about" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={about.image || "https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?q=80&w=2070&auto=format&fit=crop"}
                alt="Our veterinary team"
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3">
                {["Licensed & Certified", "Fear-Free Approach"].map((b, i) => (
                  <div key={i} className="bg-white/90 backdrop-blur-sm rounded-xl p-3 text-center">
                    <p className="text-xs font-black text-blue-700">{b}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div className="w-16 h-1 bg-blue-700" />
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                {about.title || "Every Pet Deserves Exceptional Care."}
              </h2>
              <p className="text-slate-500 leading-relaxed text-lg">
                {about.text || "Our veterinary team brings decades of combined experience, compassionate care, and state-of-the-art equipment to every appointment. Your pet's health and comfort is our top priority."}
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: "15+", label: "Years Experience" },
                  { num: "5000+", label: "Patients Treated" },
                  { num: "All", label: "Species Welcome" },
                  { num: "24/7", label: "Emergency Line" },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-2xl font-black text-blue-700">{stat.num}</p>
                    <p className="text-slate-500 text-xs uppercase tracking-widest mt-1 font-bold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {gallery?.show && galleryImages.length > 0 && (
        <section id="gallery" className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase">Our Clinic</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((img, i) => (
                <div key={i} className={`overflow-hidden rounded-2xl ${i % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                  <div className="relative group h-full min-h-[200px]">
                    <img src={img} alt={`Clinic ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-teal-500/0 group-hover:bg-teal-500/20 transition-all flex items-center justify-center">
                      <Heart size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer id="contact" className="pt-24 pb-12 bg-[#0a1f3d] text-white">
        {/* Emergency banner */}
        <div className="bg-rose-600 py-4">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle size={20} />
              <span className="font-black text-sm uppercase tracking-widest">Emergency Veterinary Care Available</span>
            </div>
            <p className="font-black text-xl">{contact?.phone || "+216 XX XXX XXX"}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-16 grid grid-cols-1 lg:grid-cols-3 gap-16">

          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center">
                <PawIcon size={22} className="text-white" />
              </div>
              <div>
                <h4 className="text-xl font-black text-white uppercase">{ownerId?.businessName || "Vet Care Clinic"}</h4>
                <p className="text-teal-400 text-xs font-bold tracking-widest">Bookiify Verified</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-teal-400 mt-1 shrink-0" />
                <p className="text-slate-400 text-sm">{contact?.address || "Tunis, Tunisia"}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-teal-400 shrink-0" />
                <p className="text-white font-black text-lg">{contact?.phone || "+216 XX XXX XXX"}</p>
              </div>
            </div>
            <div className="flex gap-3">
              {contact?.socials?.instagram && (
                <a href={contact.socials.instagram} className="p-3 bg-white/5 rounded-xl hover:bg-teal-500 transition-colors">
                  <InstagramIcon size={18} />
                </a>
              )}
              {contact?.socials?.facebook && (
                <a href={contact.socials.facebook} className="p-3 bg-white/5 rounded-xl hover:bg-teal-500 transition-colors">
                  <FacebookIcon size={18} />
                </a>
              )}
              {contact?.socials?.tiktok && (
                <a href={contact.socials.tiktok} className="p-3 bg-white/5 rounded-xl hover:bg-teal-500 transition-colors">
                  <TikTokIcon size={18} />
                </a>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.4em] flex items-center gap-2">
              <Clock size={14} className="text-teal-400" /> Clinic Hours
            </h4>
            <div className="space-y-3">
              {(businessHours || []).map((h, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                  <span className={`font-bold ${h.isClosed ? "text-slate-600" : "text-slate-400"}`}>{h.day}</span>
                  <span className={`font-black text-xs uppercase ${h.isClosed ? "text-rose-400" : "text-teal-300"}`}>
                    {h.isClosed ? "Closed" : `${h.open} – ${h.close}`}
                  </span>
                </div>
              ))}
              <p className="text-xs text-teal-400 font-bold pt-2">Emergency line available 24/7</p>
            </div>
          </div>

          <div className="bg-blue-700/20 border border-blue-500/20 p-8 rounded-3xl space-y-6">
            <Heart size={36} className="text-teal-400" />
            <h4 className="text-2xl font-black text-white">Book an Appointment</h4>
            <p className="text-slate-400 text-sm">Fast online booking — your pet will be seen by our expert team.</p>
            <ul className="space-y-2">
              {["Licensed veterinarians", "All species welcome", "Fear-free approach"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle size={12} className="text-teal-400 shrink-0" />{item}
                </li>
              ))}
            </ul>
            <Link to={`/book/${ownerId?._id}`}>
              <button className="w-full py-4 bg-teal-500 hover:bg-teal-400 text-white font-black rounded-xl uppercase tracking-widest text-xs transition-all">
                Book Now
              </button>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
            &copy; 2026 {ownerId?.businessName || "Vet Care Clinic"} • Digital Experience by Bookiify
          </p>
        </div>
      </footer>
    </div>
  );
};

export default VetTheme;
