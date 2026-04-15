import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, User, Phone, Mail, FileText, 
  ChevronRight, CheckCircle, ArrowLeft, Loader2 
} from 'lucide-react';
import { CATEGORY_THEMES } from '../../config/ThemeConfig'; // Adjust path

const BookingPage = ({ websiteData, onBack }) => {
  // 1. Identify Theme based on Category ID
  const categoryId = websiteData?.ownerId?.category || 1;
  const theme = CATEGORY_THEMES[categoryId] || CATEGORY_THEMES[1];
  const { terminology } = theme;

  // 2. Form State mapping to Mongoose Model
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    service: null, // Selected service object
    appointmentDate: '',
    timeSlot: '',
    notes: ''
  });

  const [step, setStep] = useState(1); // 1: Service, 2: Date/Time, 3: Details
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Constants for Demo (In real app, fetch available slots)
  const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:30", "17:00"];

  const handleBooking = async () => {
    setIsSubmitting(true);
    
    // Prepare data for backend
    const bookingPayload = {
      ownerId: websiteData.ownerId._id,
      merchantId: websiteData._id,
      ...formData,
      service: {
        title: formData.service.title,
        price: formData.service.price,
        duration: formData.service.duration || 30
      },
      dateString: formData.appointmentDate,
      dayOfWeek: new Date(formData.appointmentDate).toLocaleDateString('en-US', { weekday: 'long' }),
      status: 'pending'
    };

    try {
      console.log("Submitting Booking:", bookingPayload);
      // await API.post('/bookings', bookingPayload);
      setStep(4); // Success State
    } catch (err) {
      alert("Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white font-sans selection:bg-rose-100">
      
      {/* --- LEFT SIDE: HERO & BRANDING --- */}
      <div className="relative lg:w-5/12 w-full min-h-[40vh] lg:min-h-screen flex flex-col justify-between p-12 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={websiteData?.hero?.backgroundImage || "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000"} 
            className="w-full h-full object-cover opacity-40 grayscale-[0.3]" 
            alt="Business Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-slate-900"></div>
        </div>

        <div className="relative z-10">
          <button onClick={onBack} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Return to Site</span>
          </button>
          
          <div className="space-y-4">
            <div className={`w-12 h-12 ${theme.accent} rounded-2xl flex items-center justify-center shadow-2xl`}>
              <theme.icon className="text-white" size={24} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Book your <br />
              <span className={theme.textAccent}>{terminology.service}</span>
            </h1>
            <p className="text-white/50 font-medium max-w-sm">
              {websiteData?.hero?.slogan || "Experience the pinnacle of professional care and style."}
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-12 border-t border-white/10">
          <p className="text-white font-bold text-lg">{websiteData?.ownerId?.businessName}</p>
          <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{theme.category}</p>
        </div>
      </div>

      {/* --- RIGHT SIDE: BOOKING FLOW --- */}
      <div className="lg:w-7/12 w-full bg-[#fdfcf9] flex items-center justify-center p-6 md:p-12 lg:p-24">
        <div className="w-full max-w-xl">
          
          {/* Progress Indicator */}
          {step < 4 && (
            <div className="flex gap-2 mb-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? theme.accent : 'bg-slate-200'}`} />
              ))}
            </div>
          )}

          {/* STEP 1: SERVICE SELECTION */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Select a {terminology.service}</h2>
                <p className="text-slate-500 font-medium">Choose the ritual that suits your needs today.</p>
              </div>
              <div className="grid gap-4">
                {websiteData?.services?.map((s, idx) => (
                  <button 
                    key={idx}
                    onClick={() => { setFormData({...formData, service: s}); setStep(2); }}
                    className={`flex justify-between items-center p-6 rounded-3xl border-2 transition-all text-left group
                      ${formData.service?.title === s.title ? `${theme.borderAccent} bg-white shadow-xl` : 'border-transparent bg-white/50 hover:bg-white hover:shadow-lg'}`}
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{s.title}</h4>
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-1">{s.duration || 30} Minutes</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-black ${theme.textAccent}`}>{s.price} <span className="text-[10px] opacity-50">TND</span></p>
                      <div className={`mt-2 opacity-0 group-hover:opacity-100 transition-opacity ${theme.textAccent}`}>
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: DATE & TIME */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">When should we expect you?</h2>
                <p className="text-slate-500 font-medium">Select your preferred date and time slot.</p>
              </div>
              <div className="space-y-6">
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 text-slate-400" size={20} />
                  <input 
                    type="date" 
                    onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map(slot => (
                    <button 
                      key={slot}
                      onClick={() => setFormData({...formData, timeSlot: slot})}
                      className={`py-4 rounded-2xl font-black text-sm transition-all border-2
                        ${formData.timeSlot === slot ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white border-transparent text-slate-400 hover:border-slate-200'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <button 
                  disabled={!formData.appointmentDate || !formData.timeSlot}
                  onClick={() => setStep(3)}
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all
                    ${(!formData.appointmentDate || !formData.timeSlot) ? 'bg-slate-100 text-slate-300' : `${theme.accent} text-white shadow-2xl shadow-rose-200 hover:scale-[1.02]`}`}
                >
                  Continue to Details
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CUSTOMER DETAILS */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Final Details</h2>
                <p className="text-slate-500 font-medium">We'll send a confirmation to your contact info.</p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="text" placeholder="Full Name" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="email" placeholder="Email Address" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                      onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="tel" placeholder="Phone Number" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                      onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 text-slate-300" size={18} />
                    <textarea 
                      placeholder="Special notes or requests..." 
                      rows="3"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  onClick={handleBooking}
                  disabled={isSubmitting || !formData.customerName || !formData.customerEmail}
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all
                    ${isSubmitting ? 'bg-slate-400' : `${theme.accent} text-white shadow-2xl hover:scale-[1.02]`}`}
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Confirm Ritual Booking'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS STATE */}
          {step === 4 && (
            <div className="animate-in zoom-in duration-700 text-center space-y-6">
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={48} className="text-emerald-500" />
              </div>
              <div>
                <h2 className="text-4xl font-black text-slate-900">It's Official!</h2>
                <p className="text-slate-500 font-medium mt-2">Your booking is confirmed for {formData.appointmentDate} at {formData.timeSlot}.</p>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 text-left space-y-4">
                <div className="flex justify-between border-b border-slate-50 pb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{terminology.service}</span>
                  <span className="font-bold text-slate-900">{formData.service?.title}</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Merchant</span>
                  <span className="font-bold text-slate-900">{websiteData?.ownerId?.businessName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Investment</span>
                  <span className={`font-black ${theme.textAccent}`}>{formData.service?.price} TND</span>
                </div>
              </div>
              <button 
                onClick={onBack}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 transition-colors"
              >
                Back to Sanctuary
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;