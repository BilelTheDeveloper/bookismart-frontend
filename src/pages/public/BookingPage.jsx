import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, User, Phone, Mail, FileText, 
  ChevronRight, CheckCircle, ArrowLeft, Loader2 
} from 'lucide-react';
import API from "../api/config"; 
import { CATEGORY_THEMES } from '../../config/ThemeConfig'; 

const BookingPage = ({ websiteData: propData, onBack }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // --- 1. DATA INITIALIZATION ---
  const [websiteData, setWebsiteData] = useState(propData || null);
  const [loading, setLoading] = useState(!propData);
  const [error, setError] = useState(null);

  // Fetch data if accessed via URL slug instead of props
  useEffect(() => {
    const fetchMerchantData = async () => {
      if (!websiteData && slug) {
        try {
          setLoading(true);
          const response = await API.get(`/public/website/${slug}`);
          setWebsiteData(response.data);
        } catch (err) {
          console.error("Booking Fetch Error:", err);
          setError("Business not found or connection failed.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchMerchantData();
  }, [slug, websiteData]);

  /**
   * 🛡️ THEME RESOLUTION LOGIC
   * Maps string categories from DB to Numeric IDs in ThemeConfig
   */
  const getTheme = () => {
    if (!websiteData) return CATEGORY_THEMES[1];

    const categoryMap = {
      "medical": 2,
      "health": 2,
      "opticians": 2,   // ADD THIS
      "opticien": 2,    // ADD THIS
      "dentists": 2,    // ADD THIS
      "general-doctors": 2, // ADD THIS
      "physiotherapists": 2, // ADD THIS


      "barbershops": 1,
      "spas": 1,
      "beauty": 1,
      "hair-salons": 1,
      "makeup-artists": 1,
    };

    const dbCategory = websiteData.category?.toLowerCase() || "";
    const themeId = categoryMap[dbCategory] || 1;
    return CATEGORY_THEMES[themeId];
  };

  const theme = getTheme();
  const { terminology } = theme;

  // --- 2. FORM STATE ---
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    service: null,
    appointmentDate: '',
    timeSlot: '',
    notes: ''
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:30", "17:00"];

  // --- 3. SUBMISSION LOGIC ---
  const handleBooking = async () => {
    if (!formData.service || !formData.appointmentDate || !formData.timeSlot) {
        alert("Please complete all selection steps.");
        return;
    }

    setIsSubmitting(true);
    
    const bookingPayload = {
      ownerId: websiteData.ownerId._id,
      merchantId: websiteData._id,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      service: {
        title: formData.service.title,
        price: formData.service.price,
        duration: formData.service.duration || 30
      },
      dateString: formData.appointmentDate,
      timeSlot: formData.timeSlot,
      dayOfWeek: new Date(formData.appointmentDate).toLocaleDateString('en-US', { weekday: 'long' }),
      notes: formData.notes,
      status: 'pending'
    };

    try {
      await API.post('/bookings/create', bookingPayload);
      setStep(4); 
    } catch (err) {
      console.error("Booking Error:", err);
      alert(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackNavigation = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  // --- 4. RENDER GUARDS ---
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#fdfcf9]">
        <Loader2 className="animate-spin text-slate-900 mb-4" size={40} />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Sanctuary...</p>
      </div>
    );
  }

  if (error || !websiteData) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#fdfcf9] p-6 text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Oops!</h2>
        <p className="text-slate-500 mb-6">{error || "We couldn't find this business."}</p>
        <button onClick={() => navigate('/')} className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold uppercase text-[10px] tracking-widest">
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col lg:flex-row min-h-screen bg-white font-sans selection:${theme.lightAccent}`}>
      
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
          <button onClick={handleBackNavigation} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Return to Site</span>
          </button>
          
          <div className="space-y-4">
            <div className={`w-14 h-14 ${theme.accent} rounded-2xl flex items-center justify-center shadow-2xl`}>
              <theme.icon className="text-white" size={28} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {websiteData?.hero?.title || "Book your"} <br />
              <span className={theme.textAccent}>{terminology.service}</span>
            </h1>
            <p className="text-white/60 font-medium max-w-sm">
              {websiteData?.hero?.slogan || "Experience the pinnacle of professional care and style."}
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-12 border-t border-white/10">
          <p className="text-white font-bold text-lg">{websiteData?.ownerId?.businessName}</p>
          <div className="flex items-center gap-2 mt-1">
             <p className="text-white/40 text-xs uppercase tracking-widest">{theme.category}</p>
             <div className={`w-1 h-1 rounded-full ${theme.accent}`}></div>
             <p className="text-white/40 text-xs uppercase tracking-widest">{theme.title}</p>
          </div>
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
              <div className="grid gap-4 max-h-[50vh] overflow-y-auto pr-2 no-scrollbar">
                {websiteData?.services?.map((s, idx) => (
                  <button 
                    key={idx}
                    onClick={() => { setFormData({...formData, service: s}); setStep(2); }}
                    className={`flex justify-between items-center p-6 rounded-3xl border-2 transition-all text-left group
                      ${formData.service?.title === s.title ? `${theme.borderAccent} bg-white shadow-xl` : 'border-transparent bg-white/50 hover:bg-white hover:shadow-lg'}`}
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{s.title}</h4>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Estimated Duration: {s.duration || 30} MIN</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-black ${theme.textAccent}`}>{s.price} <span className="text-[10px] opacity-50 font-bold">TND</span></p>
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
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Schedule your {terminology.service}</h2>
                <p className="text-slate-500 font-medium">Select your preferred date and time slot.</p>
              </div>
              <div className="space-y-6">
                <div className="relative">
                  <Calendar className={`absolute left-4 top-4 ${theme.textAccent}`} size={20} />
                  <input 
                    type="date" 
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.appointmentDate}
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
                
                <div className="flex gap-4 pt-4">
                    <button onClick={() => setStep(1)} className="flex-1 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] bg-white border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all">
                        Back
                    </button>
                    <button 
                    disabled={!formData.appointmentDate || !formData.timeSlot}
                    onClick={() => setStep(3)}
                    className={`flex-[2] py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all
                        ${(!formData.appointmentDate || !formData.timeSlot) ? 'bg-slate-100 text-slate-300' : `${theme.accent} text-white shadow-2xl hover:scale-[1.02]`}`}
                    >
                    Continue to Details
                    </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: CUSTOMER DETAILS */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{terminology.client} Details</h2>
                <p className="text-slate-500 font-medium">We'll send a confirmation to your contact info.</p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="text" placeholder="Full Name" 
                      value={formData.customerName}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="email" placeholder="Email Address" 
                      value={formData.customerEmail}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                      onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="tel" placeholder="Phone Number" 
                      value={formData.customerPhone}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                      onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 text-slate-300" size={18} />
                    <textarea 
                      placeholder={`Special notes or requests for your ${terminology.service}...`}
                      rows="3"
                      value={formData.notes}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium"
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button onClick={() => setStep(2)} className="flex-1 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] bg-white border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all">
                        Back
                    </button>
                    <button 
                    onClick={handleBooking}
                    disabled={isSubmitting || !formData.customerName || !formData.customerEmail || !formData.customerPhone}
                    className={`flex-[2] py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all
                        ${(isSubmitting || !formData.customerName || !formData.customerEmail || !formData.customerPhone) ? 'bg-slate-200 text-slate-400' : `${theme.accent} text-white shadow-2xl hover:scale-[1.02]`}`}
                    >
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : `Confirm ${terminology.service}`}
                    </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS STATE */}
          {step === 4 && (
            <div className="animate-in zoom-in duration-700 text-center space-y-6">
              <div className={`w-24 h-24 ${theme.lightAccent} rounded-full flex items-center justify-center mx-auto`}>
                <CheckCircle size={48} className={theme.textAccent} />
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
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Business</span>
                  <span className="font-bold text-slate-900">{websiteData?.ownerId?.businessName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Investment</span>
                  <span className={`font-black ${theme.textAccent}`}>{formData.service?.price} TND</span>
                </div>
              </div>
              <button 
                onClick={handleBackNavigation}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 transition-colors"
              >
                Back to Site
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;