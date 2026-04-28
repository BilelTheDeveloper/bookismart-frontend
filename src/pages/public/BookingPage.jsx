import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    dateString: "",
    timeSlot: "",
    notes: ""
  });

  // Mock Data - In production, these come from your Merchant/Services API
  const availableSlots = ["09:00", "10:30", "13:00", "14:30", "16:00"];
  const service = {
    title: "Signature Haircut & Styling",
    price: "45.00",
    duration: 45
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Logic to call your backend /api/bookings
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Show Success
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-6xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
        
        {/* --- LEFT SIDE: BOOKING LOGIC --- */}
        <div className="w-full lg:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-black text-slate-900 leading-tight">Pick Your <span className="text-indigo-600">Time.</span></h2>
                  <p className="text-slate-500 font-medium mt-2">Select your preferred date and available slot.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Date</label>
                    <div className="relative flex items-center bg-slate-50 border border-slate-100 rounded-2xl p-4 focus-within:ring-2 ring-indigo-500 transition-all">
                      <Calendar className="text-slate-400 mr-3" size={20} />
                      <input 
                        type="date" 
                        className="bg-transparent outline-none w-full font-bold text-slate-800"
                        onChange={(e) => setFormData({...formData, dateString: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Available Slots</label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setFormData({...formData, timeSlot: slot})}
                          className={`py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                            formData.timeSlot === slot 
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                            : "bg-white border border-slate-200 text-slate-600 hover:border-indigo-300"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  disabled={!formData.dateString || !formData.timeSlot}
                  onClick={handleNext}
                  className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none"
                >
                  CONTINUE TO DETAILS <ChevronRight size={20} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <button onClick={handleBack} className="flex items-center gap-2 text-slate-400 font-bold text-sm hover:text-indigo-600 transition-colors">
                  <ArrowLeft size={16} /> GO BACK
                </button>
                
                <div>
                  <h2 className="text-3xl font-black text-slate-900">Your <span className="text-indigo-600">Information.</span></h2>
                  <p className="text-slate-500 font-medium mt-1">Tell us who is coming in for the appointment.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative flex items-center bg-slate-50 border border-slate-100 rounded-2xl p-4 focus-within:ring-2 ring-indigo-500 transition-all">
                    <User className="text-slate-400 mr-3" size={20} />
                    <input 
                      placeholder="Full Name"
                      className="bg-transparent outline-none w-full font-bold text-slate-800"
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative flex items-center bg-slate-50 border border-slate-100 rounded-2xl p-4 focus-within:ring-2 ring-indigo-500 transition-all">
                      <Mail className="text-slate-400 mr-3" size={20} />
                      <input 
                        type="email"
                        placeholder="Email Address"
                        className="bg-transparent outline-none w-full font-bold text-slate-800"
                        onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                        required
                      />
                    </div>
                    <div className="relative flex items-center bg-slate-50 border border-slate-100 rounded-2xl p-4 focus-within:ring-2 ring-indigo-500 transition-all">
                      <Phone className="text-slate-400 mr-3" size={20} />
                      <input 
                        placeholder="Phone Number"
                        className="bg-transparent outline-none w-full font-bold text-slate-800"
                        onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <textarea 
                    placeholder="Special requests or notes (Optional)..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-800 min-h-[100px] outline-none focus:ring-2 ring-indigo-500"
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
                  >
                    {loading ? "PROCESSING..." : "CONFIRM BOOKING"}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center h-full space-y-6"
              >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-4xl font-black text-slate-900">Appointment <span className="text-green-600">Booked!</span></h2>
                <p className="text-slate-500 font-bold text-lg max-w-sm">
                  We've sent a confirmation email to <span className="text-slate-900">{formData.customerEmail}</span>. See you soon!
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 bg-slate-900 text-white font-black rounded-xl"
                >
                  DONE
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- RIGHT SIDE: BRANDING & PREVIEW --- */}
        <div className="hidden lg:flex lg:w-2/5 relative bg-indigo-900 p-12 flex-col justify-between overflow-hidden">
          {/* Background Image with Mesh Gradient */}
          <div 
            className="absolute inset-0 z-0 opacity-40 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-1000"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/90 to-slate-900/90 z-10" />

          <div className="relative z-20">
            <div className="flex items-center gap-3 mb-12">
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
                <ShieldCheck className="w-6 h-6 text-indigo-400" />
              </div>
              <span className="text-xl font-black text-white tracking-tighter uppercase">Bookiify Verified</span>
            </div>

            <h1 className="text-5xl font-black text-white leading-none tracking-tight">
              ELEGANCE <br />
              <span className="text-indigo-400 italic font-light font-serif text-6xl">Defined.</span>
            </h1>
            <p className="mt-6 text-slate-300 text-lg font-medium leading-relaxed max-w-xs">
              Experience the pinnacle of service at your favorite merchant. Your time, prioritized.
            </p>
          </div>

          <div className="relative z-20 bg-white/5 backdrop-blur-2xl border border-white/10 p-6 rounded-[2rem] space-y-4">
             <div className="flex justify-between items-start">
                <p className="text-xs font-black text-indigo-300 uppercase tracking-widest">Selected Service</p>
                <p className="text-xl font-black text-white">${service.price}</p>
             </div>
             <div>
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
                <div className="flex items-center gap-2 text-slate-400 mt-1">
                   <Clock size={14} /> <span className="text-xs font-bold">{service.duration} Minutes</span>
                </div>
             </div>
             
             {formData.timeSlot && (
               <div className="pt-4 border-t border-white/10 flex items-center gap-3 text-indigo-400">
                  <Calendar size={18} />
                  <span className="text-sm font-black uppercase tracking-tighter">
                    {formData.dateString} @ {formData.timeSlot}
                  </span>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;