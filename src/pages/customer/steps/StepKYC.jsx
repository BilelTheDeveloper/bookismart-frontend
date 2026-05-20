import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Camera, Upload, CheckCircle2, Loader2, RefreshCw,
  ScanFace, CreditCard, AlertCircle, ChevronRight
} from "lucide-react";
import CAPI from "../../../api/customerConfig";

/* ── Sub-component: Live webcam capture ── */
const WebcamCapture = ({ onCapture, label, hint, overlayShape = "oval" }) => {
  const videoRef   = useRef(null);
  const canvasRef  = useRef(null);
  const streamRef  = useRef(null);
  const [active, setActive]   = useState(false);
  const [captured, setCaptured] = useState(null);
  const [error, setError]     = useState("");
  const [countdown, setCountdown] = useState(null);

  const startCamera = useCallback(async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setActive(true);
    } catch {
      setError("Camera access denied. Please allow camera permissions in your browser.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    setActive(false);
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  const triggerCountdown = () => {
    setCountdown(3);
    const tick = (n) => {
      if (n <= 0) { capturePhoto(); setCountdown(null); return; }
      setCountdown(n);
      setTimeout(() => tick(n - 1), 1000);
    };
    setTimeout(() => tick(2), 1000);
  };

  const capturePhoto = () => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    setCaptured(dataUrl);
    onCapture(dataUrl);
    stopCamera();
  };

  const retake = () => {
    setCaptured(null);
    onCapture(null);
    startCamera();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 bg-indigo-600/20 border border-indigo-500/30 rounded-lg flex items-center justify-center">
          {overlayShape === "oval" ? <ScanFace size={16} className="text-indigo-400" /> : <CreditCard size={16} className="text-indigo-400" />}
        </div>
        <div>
          <p className="text-white font-black text-sm">{label}</p>
          <p className="text-slate-500 text-xs">{hint}</p>
        </div>
      </div>

      {/* Camera / preview box */}
      <div className="relative bg-slate-800 rounded-2xl overflow-hidden aspect-[4/3] border border-slate-700">
        {!active && !captured && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center">
              <Camera size={28} className="text-slate-400" />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-rose-400 text-xs font-medium px-4 text-center">
                <AlertCircle size={14} /> {error}
              </div>
            )}
            <button
              type="button"
              onClick={startCamera}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black rounded-xl transition-all flex items-center gap-2"
            >
              <Camera size={16} /> Open Camera
            </button>
          </div>
        )}

        {active && (
          <>
            <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />

            {/* Overlay guide */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {overlayShape === "oval" ? (
                <div className="w-40 h-52 border-4 border-indigo-400/70 rounded-full shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]" />
              ) : (
                <div className="w-64 h-44 border-4 border-indigo-400/70 rounded-2xl shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]" />
              )}
            </div>

            {/* Corner brackets */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {overlayShape === "oval" ? null : (
                <>
                  <div className="absolute top-[calc(50%-88px)] left-[calc(50%-128px)] w-6 h-6 border-t-4 border-l-4 border-indigo-400 rounded-tl-md" />
                  <div className="absolute top-[calc(50%-88px)] right-[calc(50%-128px)] w-6 h-6 border-t-4 border-r-4 border-indigo-400 rounded-tr-md" />
                  <div className="absolute bottom-[calc(50%-88px)] left-[calc(50%-128px)] w-6 h-6 border-b-4 border-l-4 border-indigo-400 rounded-bl-md" />
                  <div className="absolute bottom-[calc(50%-88px)] right-[calc(50%-128px)] w-6 h-6 border-b-4 border-r-4 border-indigo-400 rounded-br-md" />
                </>
              )}
            </div>

            {/* Countdown overlay */}
            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="text-8xl font-black text-white animate-pulse">{countdown}</span>
              </div>
            )}

            {/* Hint */}
            <div className="absolute bottom-4 inset-x-0 text-center">
              <p className="text-white text-xs font-bold bg-black/50 backdrop-blur-sm inline-block px-4 py-1.5 rounded-full">
                {overlayShape === "oval" ? "Position your face within the oval" : "Align your ID within the frame"}
              </p>
            </div>

            {/* Capture button */}
            <div className="absolute bottom-14 inset-x-0 flex justify-center">
              <button
                type="button"
                onClick={triggerCountdown}
                disabled={countdown !== null}
                className="w-16 h-16 bg-white rounded-full border-4 border-indigo-500 hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50"
              />
            </div>
          </>
        )}

        {captured && (
          <>
            <img src={captured} alt="capture" className="w-full h-full object-cover" />
            <div className="absolute top-3 right-3">
              <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40">
                <CheckCircle2 size={20} className="text-white" />
              </div>
            </div>
            <button
              type="button"
              onClick={retake}
              className="absolute bottom-3 right-3 px-4 py-2 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-black rounded-xl border border-slate-700 hover:border-slate-500 transition-all flex items-center gap-1.5"
            >
              <RefreshCw size={12} /> Retake
            </button>
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

/* ── Sub-component: File upload fallback ── */
const FileUpload = ({ label, hint, onCapture, captured }) => {
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onCapture(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-amber-500/20 border border-amber-500/30 rounded-lg flex items-center justify-center">
          <CreditCard size={16} className="text-amber-400" />
        </div>
        <div>
          <p className="text-white font-black text-sm">{label}</p>
          <p className="text-slate-500 text-xs">{hint}</p>
        </div>
      </div>

      {captured ? (
        <div className="relative bg-slate-800 rounded-2xl overflow-hidden aspect-[16/9] border border-emerald-500/50">
          <img src={captured} alt="id" className="w-full h-full object-contain p-2" />
          <div className="absolute top-2 right-2">
            <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle2 size={14} className="text-white" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => { onCapture(null); inputRef.current.value = ""; }}
            className="absolute bottom-2 right-2 px-3 py-1.5 bg-slate-900/80 text-white text-xs font-black rounded-lg border border-slate-700 flex items-center gap-1"
          >
            <RefreshCw size={11} /> Change
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full aspect-[16/9] bg-slate-800/60 border-2 border-dashed border-slate-700 hover:border-amber-500/50 hover:bg-slate-800 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all group"
        >
          <div className="w-12 h-12 bg-slate-700 group-hover:bg-amber-500/20 rounded-xl flex items-center justify-center transition-all">
            <Upload size={22} className="text-slate-400 group-hover:text-amber-400 transition-colors" />
          </div>
          <div className="text-center">
            <p className="text-slate-300 text-sm font-bold">Click to upload</p>
            <p className="text-slate-500 text-xs mt-0.5">JPG, PNG — max 10MB</p>
          </div>
        </button>
      )}

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
};

/* ── Main Step Component ── */
const StepKYC = ({ token, onSuccess, api = CAPI, pathBase = "/customer/register" }) => {
  const [liveness, setLiveness] = useState(null);
  const [idFront,  setIdFront]  = useState(null);
  const [idBack,   setIdBack]   = useState(null);
  const [idMode,   setIdMode]   = useState("camera"); // camera | upload
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const allReady = liveness && idFront && idBack;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allReady) { setError("All three captures are required."); return; }
    setLoading(true);
    setError("");
    try {
      await api.post(`${pathBase}/${token}/kyc`, {
        livenessPhotoBase64: liveness,
        idFrontBase64: idFront,
        idBackBase64: idBack,
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 sm:p-8 md:p-10 space-y-6 sm:space-y-10">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-emerald-600/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <ScanFace size={28} className="text-emerald-400" />
        </div>
        <h2 className="text-2xl font-black text-white">Identity Verification</h2>
        <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
          Take a live selfie and provide both sides of a valid government-issued ID.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Step A: Liveness selfie */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-6 h-6 bg-indigo-600 text-white text-xs font-black rounded-md flex items-center justify-center">A</span>
            <h3 className="text-white font-black">Live Selfie</h3>
          </div>
          <WebcamCapture
            label="Take a selfie"
            hint="Face the camera clearly in good lighting"
            overlayShape="oval"
            onCapture={setLiveness}
          />
        </div>

        {/* Step B: ID card */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-amber-500 text-white text-xs font-black rounded-md flex items-center justify-center">B</span>
              <h3 className="text-white font-black">Government ID</h3>
            </div>
            {/* Mode switcher */}
            <div className="flex bg-slate-800 border border-slate-700 rounded-xl p-1 gap-1">
              {[["camera", "Scan Live"], ["upload", "Upload Photo"]].map(([mode, label]) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => { setIdMode(mode); setIdFront(null); setIdBack(null); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${idMode === mode ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {idMode === "camera" ? (
            <>
              <WebcamCapture label="ID Front" hint="Show the front of your ID" overlayShape="rect" onCapture={setIdFront} />
              <WebcamCapture label="ID Back"  hint="Flip and show the back of your ID" overlayShape="rect" onCapture={setIdBack} />
            </>
          ) : (
            <>
              <FileUpload label="ID Front" hint="Upload a clear photo of the front" captured={idFront} onCapture={setIdFront} />
              <FileUpload label="ID Back"  hint="Upload a clear photo of the back"  captured={idBack}  onCapture={setIdBack} />
            </>
          )}
        </div>

        {/* Progress summary */}
        <div className="grid grid-cols-3 gap-3">
          {[["Selfie", liveness], ["ID Front", idFront], ["ID Back", idBack]].map(([name, val]) => (
            <div key={name} className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${val ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-slate-800 border-slate-700 text-slate-500"}`}>
              {val ? <CheckCircle2 size={14} /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-current" />}
              {name}
            </div>
          ))}
        </div>

        {error && (
          <div className="flex items-center gap-3 bg-rose-500/10 border border-rose-500/30 rounded-xl p-4">
            <AlertCircle size={16} className="text-rose-400 shrink-0" />
            <p className="text-rose-300 text-sm font-medium">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !allReady}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-xl text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <ChevronRight size={18} />}
          {loading ? "Submitting…" : "Submit for Review"}
        </button>
      </form>
    </div>
  );
};

export default StepKYC;
