import React, { useRef, useState, useEffect } from "react";

const StepFour = ({ formData, setFormData }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);

  // 🛡️ Cleanup: Stop camera when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // 📸 Start Camera automatically on load
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: 480, height: 480 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setCameraActive(true);
    } catch (err) {
      alert("Camera access denied. Please enable camera to verify your identity.");
    }
  };

  // 🖼️ Capture Photo from Video Stream
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      const file = new File([blob], "live-photo.jpg", { type: "image/jpeg" });
      setFormData({ ...formData, livePhoto: file });
      stopCamera();
    }, 'image/jpeg');
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setCameraActive(false);
    }
  };

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const FileUploadBox = ({ name, label, icon, currentFile }) => (
    <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-[2rem] cursor-pointer hover:border-indigo-500 transition-all group relative overflow-hidden h-32">
      {currentFile ? (
        <div className="absolute inset-0 w-full h-full bg-emerald-50 flex items-center justify-center">
          <span className="text-emerald-600 font-black text-[10px] uppercase tracking-widest">✅ Ready</span>
        </div>
      ) : (
        <>
          <span className="text-2xl mb-1">{icon}</span>
          <span className="text-[9px] font-black uppercase text-slate-500 tracking-tighter text-center">{label}</span>
        </>
      )}
      {/* 🛠️ FIXED: Removed 'required' to prevent 'not focusable' browser error */}
      <input 
        type="file" 
        name={name} 
        onChange={handleChange} 
        className="hidden" 
        accept="image/*" 
      />
    </label>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      
      <div className="text-center">
        <h3 className="text-xl font-black text-slate-900 tracking-tight">Identity & Facial Check</h3>
        <p className="text-slate-500 text-xs font-medium mt-2 leading-relaxed">
          Follow the guides to verify your account.
        </p>
      </div>

      {/* 🆔 ID UPLOADS GRID */}
      <div className="grid grid-cols-2 gap-4">
        <FileUploadBox name="idFront" label="CIN Front" icon="🪪" currentFile={formData.idFront} />
        <FileUploadBox name="idBack" label="CIN Back" icon="⬅️" currentFile={formData.idBack} />
      </div>

      {/* 🤳 LIVE CAMERA SECTION */}
      <div className="space-y-4">
        <div className="relative group bg-slate-950 rounded-[3rem] overflow-hidden aspect-square max-w-[280px] mx-auto border-4 border-white shadow-2xl shadow-indigo-100/50">
          
          {/* FACE INDICATOR OVERLAY */}
          {!formData.livePhoto && (
             <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                <div className="w-48 h-64 border-2 border-dashed border-cyan-400 rounded-[100%] opacity-50 animate-pulse"></div>
                <div className="absolute top-10 bg-cyan-400 text-slate-950 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    Place face inside circle
                </div>
             </div>
          )}

          {/* Video Stream */}
          {!formData.livePhoto ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover scale-x-[-1]" 
            />
          ) : (
            <img 
              src={URL.createObjectURL(formData.livePhoto)} 
              className="w-full h-full object-cover" 
              alt="Captured"
            />
          )}

          <canvas ref={canvasRef} className="hidden" />

          {/* Camera Buttons */}
          <div className="absolute bottom-6 inset-x-0 z-20 flex justify-center">
            {!cameraActive && !formData.livePhoto ? (
              <button 
                type="button" 
                onClick={startCamera} 
                className="bg-indigo-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
              >
                Enable Camera 📸
              </button>
            ) : !formData.livePhoto ? (
              <button 
                type="button" 
                onClick={capturePhoto} 
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-all border-4 border-indigo-100"
              >
                <div className="w-10 h-10 bg-indigo-600 rounded-full"></div>
              </button>
            ) : (
              <button 
                type="button" 
                onClick={() => { setFormData({...formData, livePhoto: null}); startCamera(); }} 
                className="bg-slate-900/80 backdrop-blur-md text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest"
              >
                Retake Photo 🔄
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-4">
        <span className="text-xl">💡</span>
        <p className="text-[10px] text-amber-800 font-black uppercase leading-tight">
          Warning: Use a bright room and look directly at the camera for instant approval.
        </p>
      </div>
    </div>
  );
};

export default StepFour;