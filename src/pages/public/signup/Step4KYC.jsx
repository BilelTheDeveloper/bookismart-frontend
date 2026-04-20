import React, { useState, useRef } from "react";

const Step4KYC = ({ formData, setFormData, onNext, onPrev }) => {
  const [step, setStep] = useState("docs"); // docs -> camera
  const [cameraActive, setCameraActive] = useState(false);
  const [recording, setRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  
  // 1. Handle ID File Uploads (Updated to match field names)
  const handleFile = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      // Syncing with backend: idFront and idBack
      setFormData({ ...formData, [`id${side}`]: file });
    }
  };

  // 2. Camera Logic: 3 Positions + 5s Video
  const startLivenessCheck = async () => {
    try {
      setStep("camera");
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      videoRef.current.srcObject = stream;

      const chunks = [];
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        // Convert chunks to a single Blob and save it to formData
        const blob = new Blob(chunks, { type: "video/webm" });
        setFormData((prev) => ({ ...prev, livenessVideo: blob }));
      };

      mediaRecorder.start();
      setRecording(true);

      // Auto-stop after 5 seconds
      let timer = 0;
      const interval = setInterval(() => {
        timer += 1;
        setProgress((timer / 5) * 100);
        if (timer >= 5) {
          clearInterval(interval);
          stopRecording(stream);
        }
      }, 1000);
    } catch (err) {
      alert("Camera access denied. Please enable camera for identity verification.");
      setStep("docs");
    }
  };

  const stopRecording = (stream) => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
    stream.getTracks().forEach((track) => track.stop());
    setCameraActive(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <header>
        <h2 className="text-3xl font-black text-slate-900">Identity Trust</h2>
        <p className="text-slate-500 mt-2">Upload your ID and complete a quick live scan.</p>
      </header>

      {step === "docs" ? (
        <div className="grid grid-cols-1 gap-4">
          {/* ID Front */}
          <div className={`p-6 border-2 border-dashed rounded-[2rem] bg-white text-center transition-all ${formData.idFront ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200'}`}>
            <p className="text-xs font-black text-slate-400 uppercase mb-4">ID Card Front</p>
            <input type="file" accept="image/*" onChange={(e) => handleFile(e, "Front")} className="text-xs" />
            {formData.idFront && <p className="text-[10px] text-emerald-600 font-bold mt-2">✓ Selected</p>}
          </div>

          {/* ID Back */}
          <div className={`p-6 border-2 border-dashed rounded-[2rem] bg-white text-center transition-all ${formData.idBack ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200'}`}>
            <p className="text-xs font-black text-slate-400 uppercase mb-4">ID Card Back</p>
            <input type="file" accept="image/*" onChange={(e) => handleFile(e, "Back")} className="text-xs" />
            {formData.idBack && <p className="text-[10px] text-emerald-600 font-bold mt-2">✓ Selected</p>}
          </div>

          <button 
            onClick={startLivenessCheck}
            disabled={!formData.idFront || !formData.idBack}
            className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl disabled:bg-slate-100 disabled:text-slate-400 transition-all shadow-xl shadow-indigo-200 active:scale-95"
          >
            PROCEED TO LIVE SCAN
          </button>
        </div>
      ) : (
        <div className="space-y-6 text-center">
          <div className="relative w-full aspect-square max-w-[300px] mx-auto bg-black rounded-full overflow-hidden border-4 border-indigo-600 shadow-2xl">
            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover grayscale brightness-110" />
            
            {/* 3 Positions UI Overlay */}
            <div className="absolute inset-0 border-[12px] border-transparent pointer-events-none flex items-center justify-center">
                {progress < 33 && <p className="absolute top-10 text-white text-[12px] font-black uppercase bg-indigo-600 px-3 py-1 rounded-full">Look Center</p>}
                {progress >= 33 && progress < 66 && <p className="absolute top-10 text-white text-[12px] font-black uppercase bg-indigo-600 px-3 py-1 rounded-full">Turn Left</p>}
                {progress >= 66 && progress < 100 && <p className="absolute top-10 text-white text-[12px] font-black uppercase bg-indigo-600 px-3 py-1 rounded-full">Turn Right</p>}
            </div>

            {/* Progress Bar Circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="150" cy="150" r="145" fill="none" stroke="white" strokeWidth="6" strokeOpacity="0.2" />
                <circle cx="150" cy="150" r="145" fill="none" stroke="#4f46e5" strokeWidth="6" strokeDasharray="911" strokeDashoffset={911 - (911 * progress) / 100} style={{ transition: 'stroke-dashoffset 1s linear' }} />
            </svg>
          </div>

          {!recording && progress >= 100 ? (
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl font-bold border border-emerald-100 scale-in-center">
                ✓ Liveness Scan Captured
            </div>
          ) : (
            <p className="text-indigo-600 font-black animate-pulse uppercase tracking-widest">Recording Live Scan...</p>
          )}

          <div className="flex gap-4">
            <button onClick={() => setStep("docs")} className="flex-1 py-4 bg-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-300">BACK</button>
            <button 
                onClick={onNext} 
                disabled={progress < 100 || !formData.livenessVideo}
                className="flex-[2] py-4 bg-slate-900 text-white font-black rounded-2xl disabled:bg-slate-100 disabled:text-slate-400 shadow-lg"
            >
                FINISH KYC
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4KYC;