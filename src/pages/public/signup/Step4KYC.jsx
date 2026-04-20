import React, { useState, useRef } from "react";
import { Check, Camera, Upload, RefreshCw, ArrowLeft, ShieldCheck } from "lucide-react";

const Step4KYC = ({ formData, setFormData, onNext, onPrev }) => {
  const [step, setStep] = useState("docs"); 
  const [recording, setRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  // 1. Handle ID File Uploads
  const handleFile = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file }));
    }
  };

  // 2. Camera Logic
  const startLivenessCheck = async () => {
    try {
      setStep("camera");
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 720 } }, 
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const chunks = [];
      // WEBM is standard for browser recording
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        
        // --- CRITICAL FIX ---
        // We name the file 'liveness.webm' so Multer/Cloudinary recognize it
        const videoFile = new File([blob], "liveness.webm", { type: "video/webm" });
        
        // We save it to BOTH common keys to ensure Step 5 and AuthService find it
        setFormData((prev) => ({ 
          ...prev, 
          livenessVideo: videoFile,
          video: videoFile 
        }));
      };

      mediaRecorder.start();
      setRecording(true);

      let timer = 0;
      const interval = setInterval(() => {
        timer += 0.1;
        const currentProgress = (timer / 5) * 100;
        setProgress(currentProgress);

        if (timer >= 5) {
          clearInterval(interval);
          stopRecording(stream);
        }
      }, 100);
    } catch (err) {
      console.error("Camera Error:", err);
      alert("Camera access is required for identity verification.");
      setStep("docs");
    }
  };

  const stopRecording = (stream) => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
    stream.getTracks().forEach((track) => track.stop());
  };

  const isDocsComplete = formData.idFront && formData.idBack;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
      <header className="text-left">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
          </div>
          <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Security Layer</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 leading-tight">Identity Trust</h2>
        <p className="text-slate-500 mt-2">Verify your business identity to unlock your dashboard.</p>
      </header>

      {step === "docs" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-[2.5rem] cursor-pointer transition-all duration-300 group ${
              formData.idFront ? "border-emerald-500 bg-emerald-50/30" : "border-slate-200 bg-white hover:border-indigo-400"
            }`}>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFile(e, "idFront")} />
              {formData.idFront ? (
                <div className="text-center animate-in zoom-in duration-300">
                  <div className="bg-emerald-500 rounded-full p-2 mx-auto mb-3">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-emerald-700 font-black text-xs uppercase tracking-tighter">ID Front Captured</p>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 text-slate-300 group-hover:text-indigo-500 mb-3 mx-auto transition-colors" />
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-tighter">ID Card Front</p>
                </div>
              )}
            </label>

            <label className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-[2.5rem] cursor-pointer transition-all duration-300 group ${
              formData.idBack ? "border-emerald-500 bg-emerald-50/30" : "border-slate-200 bg-white hover:border-indigo-400"
            }`}>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFile(e, "idBack")} />
              {formData.idBack ? (
                <div className="text-center animate-in zoom-in duration-300">
                  <div className="bg-emerald-500 rounded-full p-2 mx-auto mb-3">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-emerald-700 font-black text-xs uppercase tracking-tighter">ID Back Captured</p>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 text-slate-300 group-hover:text-indigo-500 mb-3 mx-auto transition-colors" />
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-tighter">ID Card Back</p>
                </div>
              )}
            </label>
          </div>

          <button 
            onClick={startLivenessCheck}
            disabled={!isDocsComplete}
            className="group w-full py-6 bg-indigo-600 text-white font-black rounded-[2rem] disabled:bg-slate-100 disabled:text-slate-300 transition-all shadow-xl shadow-indigo-200 active:scale-95 flex items-center justify-center gap-3"
          >
            <Camera className="w-5 h-5" />
            PROCEED TO BIOMETRIC SCAN
          </button>
          
          <button onClick={onPrev} className="w-full text-slate-400 font-bold text-sm py-2 hover:text-slate-600 transition-colors">
            Back to Step 3
          </button>
        </div>
      ) : (
        <div className="space-y-8 text-center animate-in zoom-in-95 duration-500">
          <div className="relative w-72 h-72 mx-auto">
            <div className="absolute inset-0 bg-slate-900 rounded-full overflow-hidden border-4 border-indigo-600 shadow-[0_0_50px_rgba(79,70,229,0.3)]">
              <video 
                ref={videoRef} 
                autoPlay 
                muted 
                playsInline 
                className="w-full h-full object-cover grayscale contrast-125" 
              />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-900/10">
                <div className="absolute top-12 left-0 right-0">
                  <div className="bg-indigo-600 text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full inline-block tracking-widest shadow-lg animate-bounce">
                    {progress < 33 && "Look Straight"}
                    {progress >= 33 && progress < 66 && "Turn Head Left"}
                    {progress >= 66 && progress < 100 && "Turn Head Right"}
                    {progress >= 100 && "Scan Complete"}
                  </div>
                </div>
              </div>

              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                <circle cx="144" cy="144" r="140" fill="none" stroke="white" strokeWidth="8" strokeOpacity="0.1" />
                <circle 
                  cx="144" cy="144" r="140" fill="none" stroke="#4f46e5" strokeWidth="8" 
                  strokeDasharray="880" 
                  strokeDashoffset={880 - (880 * progress) / 100} 
                  className="transition-all duration-100 ease-linear"
                />
              </svg>
            </div>
          </div>

          <div className="max-w-xs mx-auto">
            {progress >= 100 ? (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl border border-emerald-100 animate-in slide-in-from-bottom-2">
                  <Check className="w-5 h-5 font-black" />
                  <span className="font-black text-xs uppercase">Biometrics Verified</span>
                </div>
                <button 
                  onClick={onNext}
                  className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow-2xl hover:bg-black transition-all active:scale-95 uppercase tracking-widest text-sm"
                >
                  Finalize Application
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em] animate-pulse">Analyzing Motion...</p>
                <p className="text-slate-400 text-[10px] uppercase font-bold">Keep your face within the frame</p>
              </div>
            )}
            
            <button 
              onClick={() => { setStep("docs"); setProgress(0); }} 
              className="mt-6 flex items-center justify-center gap-2 mx-auto text-slate-400 hover:text-slate-600 font-bold text-xs uppercase"
            >
              <RefreshCw className="w-3 h-3" /> Retry Scan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4KYC;