import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { submitKYC, getKYCStatus } from "../../services/authService";
import { toast } from "react-hot-toast";
import {
  ShieldCheck, Upload, Check, Camera, RefreshCw,
  Clock, XCircle, CheckCircle2, Loader2, AlertTriangle,
} from "lucide-react";

/* ── Upload card ── */
function DocCard({ label, field, file, onFile }) {
  return (
    <label className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300 group ${
      file ? "border-emerald-500 bg-emerald-50/30" : "border-slate-200 bg-white hover:border-indigo-400"
    }`}>
      <input type="file" className="hidden" accept="image/*" onChange={(e) => onFile(field, e.target.files[0])} />
      {file ? (
        <div className="text-center">
          <div className="bg-emerald-500 rounded-full p-2 mx-auto mb-3 w-fit">
            <Check className="w-6 h-6 text-white" />
          </div>
          <p className="text-emerald-700 font-black text-xs uppercase tracking-tighter">{label} Uploaded</p>
          <p className="text-emerald-600 text-[10px] mt-1 truncate max-w-[120px]">{file.name}</p>
        </div>
      ) : (
        <div className="text-center">
          <Upload className="w-8 h-8 text-slate-300 group-hover:text-indigo-500 mb-3 mx-auto transition-colors" />
          <p className="text-slate-400 font-bold text-xs uppercase tracking-tighter">{label}</p>
        </div>
      )}
    </label>
  );
}

/* ── Liveness recorder ── */
function LivenessCapture({ onDone, onCancel }) {
  const videoRef  = useRef(null);
  const mrRef     = useRef(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone]         = useState(false);

  useEffect(() => {
    let interval;
    let stream;

    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 720 } },
          audio: false,
        });
        if (videoRef.current) videoRef.current.srcObject = stream;

        const chunks = [];
        const mr = new MediaRecorder(stream, { mimeType: "video/webm" });
        mrRef.current = mr;

        mr.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
        mr.onstop = () => {
          const blob = new Blob(chunks, { type: "video/webm" });
          const file = new File([blob], "liveness.webm", { type: "video/webm" });
          stream.getTracks().forEach((t) => t.stop());
          onDone(file);
          setDone(true);
        };

        mr.start();
        let timer = 0;
        interval = setInterval(() => {
          timer += 0.1;
          setProgress((timer / 5) * 100);
          if (timer >= 5) {
            clearInterval(interval);
            mr.stop();
          }
        }, 100);
      } catch {
        toast.error("Camera access is required for identity verification.");
        onCancel();
      }
    };

    start();
    return () => {
      clearInterval(interval);
      if (mrRef.current?.state !== "inactive") mrRef.current?.stop();
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <div className="text-center space-y-6">
      <div className="relative w-64 h-64 mx-auto">
        <div className="absolute inset-0 bg-slate-900 rounded-full overflow-hidden border-4 border-indigo-600 shadow-xl">
          <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover grayscale contrast-125" />
          <div className="absolute top-10 inset-x-0 flex justify-center">
            <div className="bg-indigo-600 text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest animate-bounce">
              {progress < 33 && "Look Straight"}
              {progress >= 33 && progress < 66 && "Turn Head Left"}
              {progress >= 66 && "Turn Head Right"}
            </div>
          </div>
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle cx="128" cy="128" r="124" fill="none" stroke="white" strokeWidth="8" strokeOpacity="0.1" />
            <circle
              cx="128" cy="128" r="124" fill="none" stroke="#4f46e5" strokeWidth="8"
              strokeDasharray="779" strokeDashoffset={779 - (779 * progress) / 100}
              className="transition-all duration-100"
            />
          </svg>
        </div>
      </div>

      {done ? (
        <p className="text-emerald-600 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2">
          <Check className="w-5 h-5" /> Scan Complete
        </p>
      ) : (
        <p className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em] animate-pulse">
          Analyzing Motion… keep face in frame
        </p>
      )}

      <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 font-bold text-xs uppercase flex items-center gap-1.5 mx-auto">
        <RefreshCw className="w-3 h-3" /> Cancel
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
export default function KYCVerification() {
  const { user, refreshUser } = useAuth();
  const accountStatus = user?.accountStatus;

  const [files, setFiles]         = useState({ idFront: null, idBack: null, livenessVideo: null });
  const [showCamera, setShowCamera] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const setFile = (field, file) => setFiles((prev) => ({ ...prev, [field]: file }));
  const onLivenessDone = (file) => { setFiles((prev) => ({ ...prev, livenessVideo: file })); setShowCamera(false); };

  const allReady = files.idFront && files.idBack && files.livenessVideo;

  const handleSubmit = async () => {
    if (!allReady) return;
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("idFront",       files.idFront);
      data.append("idBack",        files.idBack);
      data.append("livenessVideo", files.livenessVideo);
      await submitKYC(data);
      toast.success("Documents submitted! We'll review within 24h.");
      await refreshUser();
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── ALREADY ACTIVE ── */
  if (accountStatus === "active") {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="p-6 bg-emerald-50 rounded-full w-fit mx-auto mb-6">
          <CheckCircle2 size={48} className="text-emerald-600" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-3">You're Verified</h2>
        <p className="text-slate-500 font-bold">Your identity has been confirmed. You have full access to all features.</p>
      </div>
    );
  }

  /* ── UNDER REVIEW ── */
  if (accountStatus === "review") {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="p-6 bg-amber-50 rounded-full w-fit mx-auto mb-6">
          <Clock size={48} className="text-amber-500" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-3">Under Review</h2>
        <p className="text-slate-500 font-bold leading-relaxed">
          Your documents are with our compliance team. You'll receive an email within <strong>24 hours</strong>.
        </p>
        <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800 font-bold">
          📧 Confirmation sent to <span className="underline">{user?.email}</span>
        </div>
      </div>
    );
  }

  /* ── REJECTED ── */
  const rejectionReason = user?.kycRejectionReason;

  /* ── FORM (pending_kyc or rejected) ── */
  return (
    <div className="max-w-2xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-4 bg-indigo-50 rounded-2xl">
          <ShieldCheck size={28} className="text-indigo-600" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900">Identity Verification</h1>
          <p className="text-slate-500 font-bold text-sm mt-0.5">
            {accountStatus === "rejected"
              ? "Your previous submission was rejected. Please resubmit with correct documents."
              : "Upload your documents to unlock full dashboard access."}
          </p>
        </div>
      </div>

      {/* Rejection banner */}
      {accountStatus === "rejected" && (
        <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-200 rounded-2xl">
          <XCircle className="text-rose-500 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <p className="font-black text-rose-700 text-sm">Rejected</p>
            <p className="text-rose-600 text-sm mt-0.5">{rejectionReason || "Documents could not be verified. Please resubmit clear photos."}</p>
          </div>
        </div>
      )}

      {/* Step 1 — ID documents */}
      {!showCamera ? (
        <>
          <section className="space-y-4">
            <h2 className="text-sm font-black text-slate-700 uppercase tracking-widest">Step 1 — ID Documents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DocCard label="ID Card Front" field="idFront"   file={files.idFront}  onFile={setFile} />
              <DocCard label="ID Card Back"  field="idBack"    file={files.idBack}   onFile={setFile} />
            </div>
          </section>

          {/* Step 2 — Liveness */}
          <section className="space-y-4">
            <h2 className="text-sm font-black text-slate-700 uppercase tracking-widest">Step 2 — Biometric Scan</h2>
            {files.livenessVideo ? (
              <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <CheckCircle2 className="text-emerald-600" size={20} />
                <div>
                  <p className="font-black text-emerald-700 text-sm">Liveness recorded</p>
                  <button onClick={() => setFiles((p) => ({ ...p, livenessVideo: null }))} className="text-xs text-slate-500 hover:text-rose-500 font-bold underline mt-0.5">
                    Re-record
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowCamera(true)}
                disabled={!files.idFront || !files.idBack}
                className="w-full flex items-center justify-center gap-3 py-6 bg-indigo-600 text-white font-black rounded-3xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Camera size={20} />
                START BIOMETRIC SCAN
              </button>
            )}
            {(!files.idFront || !files.idBack) && (
              <p className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <AlertTriangle size={12} /> Upload both ID photos first to enable the scan.
              </p>
            )}
          </section>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!allReady || submitting}
            className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-600 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <><Loader2 className="w-5 h-5 animate-spin" />SUBMITTING DOSSIER…</>
            ) : (
              "SUBMIT FOR REVIEW"
            )}
          </button>

          <p className="text-xs text-center text-slate-400 font-bold">
            Your documents are encrypted and only reviewed by authorized Bookiify staff.
          </p>
        </>
      ) : (
        /* Camera view */
        <div className="py-8">
          <LivenessCapture onDone={onLivenessDone} onCancel={() => setShowCamera(false)} />
        </div>
      )}
    </div>
  );
}
