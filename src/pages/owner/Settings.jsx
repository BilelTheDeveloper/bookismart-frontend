import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  UserCircle, ShieldCheck, Bell, Save, Eye, EyeOff,
  CheckCircle2, AlertCircle, Loader2, Lock, Phone,
  Mail, ChevronRight, BellOff, BellRing,
  KeyRound, QrCode, Copy, Check, X, ShieldOff,
  Globe, Download, ExternalLink,
} from "lucide-react";
import { QRCode } from "react-qr-code";
import API from "../../api/config";
import { twoFaSetup, twoFaEnable, twoFaDisable } from "../../services/authService";
import { toast } from "react-hot-toast";

/* ─── helpers ─── */
const InlineAlert = ({ type, message }) => {
  if (!message) return null;
  const s = type === "success"
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : "bg-rose-50 text-rose-700 border-rose-200";
  const Icon = type === "success" ? CheckCircle2 : AlertCircle;
  return (
    <div className={`flex items-center gap-3 p-4 rounded-2xl border ${s} text-sm font-bold`}>
      <Icon size={16} className="shrink-0" /> {message}
    </div>
  );
};

const Toggle = ({ enabled, onChange, disabled }) => (
  <button
    onClick={() => !disabled && onChange(!enabled)}
    disabled={disabled}
    className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${enabled ? "bg-indigo-600" : "bg-slate-200"} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
  >
    <div className={`w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${enabled ? "translate-x-6" : "translate-x-0"}`} />
  </button>
);

const Field = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{label}</label>
    {children}
  </div>
);

const inputClass = "w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-indigo-500 transition-all outline-none disabled:text-slate-400 disabled:cursor-not-allowed";

const TABS = [
  { id: "profile",       label: "Profile",       icon: UserCircle },
  { id: "security",      label: "Security",       icon: ShieldCheck },
  { id: "notifications", label: "Notifications",  icon: Bell },
  { id: "website",       label: "QR Code",        icon: QrCode },
];

/* ─────────────────────────────────────────────────────────────────────
   WEBSITE QR CODE PANEL
───────────────────────────────────────────────────────────────────── */
const WebsiteQRPanel = ({ website, loading }) => {
  const [urlCopied, setUrlCopied] = useState(false);
  const qrRef = useRef(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="animate-spin text-indigo-600" size={28} />
      </div>
    );
  }

  if (!website) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-5 text-center">
        <div className="p-5 bg-slate-100 rounded-3xl">
          <Globe size={32} className="text-slate-400" />
        </div>
        <div>
          <p className="text-lg font-black text-slate-900">No Website Yet</p>
          <p className="text-sm text-slate-500 font-medium mt-1 max-w-xs">
            Build your public booking page first — your QR code will appear here once your site is created.
          </p>
        </div>
        <Link
          to="/owner/dashboard/themes"
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
        >
          Build My Site
        </Link>
      </div>
    );
  }

  const publicUrl = `https://bookiify.vercel.app/p/${website.slug}`;
  const isLive = website.verificationStatus === "approved" && website.isPublished;

  const copyUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  const downloadPNG = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;
    const size = 512;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);
      const a = document.createElement("a");
      a.download = `${website.slug}-qr.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = url;
  };

  const downloadSVG = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = `${website.slug}-qr.svg`;
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {!isLive && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 font-medium">
            Your website is not live yet. The QR code is ready to print, but customers won't be able to book until your site is approved and published.
          </p>
        </div>
      )}

      {/* QR Code display */}
      <div className="flex flex-col items-center gap-6 py-6">
        <div ref={qrRef} className="p-6 bg-white border-2 border-slate-100 rounded-3xl shadow-lg">
          <QRCode value={publicUrl} size={200} fgColor="#0f172a" bgColor="#ffffff" />
        </div>

        {/* URL row */}
        <div className="flex items-center gap-2 w-full max-w-sm">
          <div className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-600 truncate">
            {publicUrl}
          </div>
          <button
            onClick={copyUrl}
            title="Copy link"
            className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all shrink-0"
          >
            {urlCopied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} className="text-slate-500" />}
          </button>
          {isLive && (
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open booking page"
              className="p-3 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-all shrink-0"
            >
              <ExternalLink size={15} className="text-emerald-700" />
            </a>
          )}
        </div>

        {/* Download buttons */}
        <div className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={downloadPNG}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
          >
            <Download size={15} /> Download PNG
          </button>
          <button
            onClick={downloadSVG}
            className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-300 transition-all"
          >
            <Download size={15} /> Download SVG
          </button>
        </div>
      </div>

      {/* Info tip */}
      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <QrCode size={15} className="text-indigo-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-500 font-medium">
          Print this QR code and place it at your front desk or entrance. Customers who scan it go straight to your online booking page — no app required.
        </p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────
   2FA PANEL  (self-contained sub-component)
───────────────────────────────────────────────────────────────────── */
const TwoFactorPanel = ({ enabled: initialEnabled }) => {
  const [enabled,   setEnabled]   = useState(initialEnabled);
  const [phase, setPhase]         = useState("idle"); // idle | scanning | confirming | disabling
  const [setupData, setSetupData] = useState(null);   // { secret, otpauthUri }
  const [code, setCode]           = useState("");
  const [disablePayload, setDisablePayload] = useState({ totpCode: "", password: "" });
  const [usePassword, setUsePassword]       = useState(false);
  const [loading, setLoading]     = useState(false);
  const [alert, setAlert]         = useState(null);
  const [copied, setCopied]       = useState(false);
  const [showDisablePwd, setShowDisablePwd] = useState(false);

  const clearAlert = () => setAlert(null);

  /* copy secret to clipboard */
  const copySecret = () => {
    navigator.clipboard.writeText(setupData?.secret || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* STEP 1 — request setup (get QR code) */
  const startSetup = async () => {
    setLoading(true);
    clearAlert();
    try {
      const data = await twoFaSetup();
      setSetupData(data.data);
      setPhase("scanning");
    } catch (err) {
      setAlert({ type: "error", message: err.response?.data?.message || "Failed to start 2FA setup." });
    } finally {
      setLoading(false);
    }
  };

  /* STEP 2 — confirm with first TOTP code */
  const confirmEnable = async () => {
    if (!code || code.length !== 6) {
      setAlert({ type: "error", message: "Enter the 6-digit code from your authenticator app." });
      return;
    }
    setLoading(true);
    clearAlert();
    try {
      await twoFaEnable(code);
      setEnabled(true);
      setPhase("idle");
      setCode("");
      setSetupData(null);
      toast.success("2FA is now active. Your account is more secure.");
    } catch (err) {
      setAlert({ type: "error", message: err.response?.data?.message || "Invalid code. Try again." });
    } finally {
      setLoading(false);
    }
  };

  /* disable 2FA */
  const confirmDisable = async () => {
    const payload = usePassword
      ? { password: disablePayload.password }
      : { totpCode: disablePayload.totpCode };

    const val = usePassword ? disablePayload.password : disablePayload.totpCode;
    if (!val) {
      setAlert({ type: "error", message: usePassword ? "Enter your account password." : "Enter your 6-digit authenticator code." });
      return;
    }
    setLoading(true);
    clearAlert();
    try {
      await twoFaDisable(payload);
      setEnabled(false);
      setPhase("idle");
      setDisablePayload({ totpCode: "", password: "" });
      toast.success("2FA has been disabled.");
    } catch (err) {
      setAlert({ type: "error", message: err.response?.data?.message || "Verification failed. 2FA was not disabled." });
    } finally {
      setLoading(false);
    }
  };

  const cancel = () => {
    setPhase("idle");
    setCode("");
    setSetupData(null);
    setDisablePayload({ totpCode: "", password: "" });
    clearAlert();
  };

  /* ── SCANNING PHASE: show QR code ── */
  if (phase === "scanning") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 rounded-xl"><QrCode size={20} className="text-indigo-600" /></div>
            <div>
              <p className="text-sm font-black text-slate-900">Scan with your authenticator app</p>
              <p className="text-xs text-slate-400 font-medium">Google Authenticator, Authy, or any TOTP app</p>
            </div>
          </div>
          <button onClick={cancel} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400"><X size={16} /></button>
        </div>

        {/* QR Code */}
        <div className="flex justify-center">
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-100 shadow-sm inline-block">
            {setupData?.otpauthUri && (
              <QRCode value={setupData.otpauthUri} size={180} level="M" />
            )}
          </div>
        </div>

        {/* Manual entry */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Can't scan? Enter this key manually</p>
          <div className="flex items-center gap-3">
            <code className="flex-1 text-sm font-black text-indigo-700 tracking-[0.3em] break-all">
              {setupData?.secret}
            </code>
            <button
              onClick={copySecret}
              className="shrink-0 p-2.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 text-slate-400 hover:text-indigo-600 transition-all"
            >
              {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
            </button>
          </div>
        </div>

        {/* Proceed to confirm step */}
        <button
          onClick={() => { setPhase("confirming"); clearAlert(); }}
          className="w-full py-3.5 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
        >
          I've scanned it — continue
        </button>
      </div>
    );
  }

  /* ── CONFIRMING PHASE: enter first code ── */
  if (phase === "confirming") {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-black text-slate-900">Confirm your authenticator code</p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Enter the 6-digit code now showing in your app.</p>
          </div>
          <button onClick={cancel} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400"><X size={16} /></button>
        </div>

        {/* 6 digit code input */}
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">6-digit TOTP code</label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => { setCode(e.target.value.replace(/\D/g, "").slice(0, 6)); clearAlert(); }}
            placeholder="000000"
            className={`${inputClass} mt-2 text-center text-2xl tracking-[0.5em] font-black`}
            autoFocus
          />
        </div>

        <InlineAlert type={alert?.type} message={alert?.message} />

        <div className="flex gap-3">
          <button onClick={cancel} className="flex-1 py-3.5 bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all">
            Cancel
          </button>
          <button
            onClick={confirmEnable}
            disabled={loading || code.length !== 6}
            className="flex-1 py-3.5 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <Loader2 size={15} className="animate-spin" /> : <ShieldCheck size={15} />}
            {loading ? "Verifying…" : "Activate 2FA"}
          </button>
        </div>
      </div>
    );
  }

  /* ── DISABLING PHASE ── */
  if (phase === "disabling") {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-black text-slate-900">Disable two-factor authentication</p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Verify your identity to turn off 2FA.</p>
          </div>
          <button onClick={cancel} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400"><X size={16} /></button>
        </div>

        {/* Toggle: TOTP or password */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <button
            onClick={() => setUsePassword(false)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${!usePassword ? "bg-white shadow text-indigo-600 border border-slate-200" : "text-slate-400"}`}
          >
            Authenticator code
          </button>
          <button
            onClick={() => setUsePassword(true)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${usePassword ? "bg-white shadow text-indigo-600 border border-slate-200" : "text-slate-400"}`}
          >
            Use password
          </button>
        </div>

        {!usePassword ? (
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">6-digit TOTP code</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={disablePayload.totpCode}
              onChange={(e) => {
                setDisablePayload((p) => ({ ...p, totpCode: e.target.value.replace(/\D/g, "").slice(0, 6) }));
                clearAlert();
              }}
              placeholder="000000"
              className={`${inputClass} mt-2 text-center text-2xl tracking-[0.5em] font-black`}
              autoFocus
            />
          </div>
        ) : (
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Account Password</label>
            <div className="relative mt-2">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showDisablePwd ? "text" : "password"}
                value={disablePayload.password}
                onChange={(e) => { setDisablePayload((p) => ({ ...p, password: e.target.value })); clearAlert(); }}
                placeholder="Your current password"
                className={`${inputClass} pl-10 pr-12`}
                autoFocus
              />
              <button onClick={() => setShowDisablePwd(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showDisablePwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        )}

        <InlineAlert type={alert?.type} message={alert?.message} />

        <div className="flex gap-3">
          <button onClick={cancel} className="flex-1 py-3.5 bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all">
            Cancel
          </button>
          <button
            onClick={confirmDisable}
            disabled={loading}
            className="flex-1 py-3.5 bg-rose-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-rose-700 shadow-lg shadow-rose-100 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <Loader2 size={15} className="animate-spin" /> : <ShieldOff size={15} />}
            {loading ? "Verifying…" : "Disable 2FA"}
          </button>
        </div>
      </div>
    );
  }

  /* ── IDLE PHASE: status card ── */
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-xl shrink-0 ${enabled ? "bg-emerald-50" : "bg-slate-100"}`}>
          <KeyRound size={18} className={enabled ? "text-emerald-600" : "text-slate-400"} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-black text-slate-900">Authenticator App (TOTP)</p>
            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${enabled ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
              {enabled ? "Active" : "Off"}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {enabled
              ? "Your account is protected with a time-based one-time password."
              : "Add a second layer of protection beyond your password."}
          </p>
        </div>
      </div>

      {enabled ? (
        <button
          onClick={() => { setPhase("disabling"); clearAlert(); }}
          disabled={loading}
          className="shrink-0 px-5 py-2.5 bg-rose-50 text-rose-600 border border-rose-200 font-black text-xs uppercase tracking-wider rounded-2xl hover:bg-rose-100 transition-all"
        >
          Disable
        </button>
      ) : (
        <button
          onClick={startSetup}
          disabled={loading}
          className="shrink-0 px-5 py-2.5 bg-indigo-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all flex items-center gap-2 disabled:opacity-60"
        >
          {loading ? <Loader2 size={13} className="animate-spin" /> : null}
          {loading ? "Loading…" : "Enable 2FA"}
        </button>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────
   MAIN SETTINGS PAGE
───────────────────────────────────────────────────────────────────── */
const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading]     = useState(true);

  /* Profile */
  const [profile, setProfile]       = useState({ fullName: "", email: "", phone: "", businessName: "", ville: "", category: "" });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileAlert, setProfileAlert]   = useState(null);

  /* Security / Password */
  const [pwd, setPwd]               = useState({ current: "", newPwd: "", confirm: "" });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwdSaving, setPwdSaving]     = useState(false);
  const [pwdAlert, setPwdAlert]       = useState(null);

  /* 2FA */
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);

  /* Website / QR */
  const [website, setWebsite]             = useState(null);
  const [websiteLoading, setWebsiteLoading] = useState(false);
  const [websiteFetched, setWebsiteFetched] = useState(false);

  /* Notifications */
  const [notifs, setNotifs]           = useState({ newBookingEmail: true, cancellationEmail: true });
  const [notifSaving, setNotifSaving] = useState(false);
  const [notifAlert, setNotifAlert]   = useState(null);

  useEffect(() => {
    API.get("/merchant/settings")
      .then((res) => {
        if (res.data?.success) {
          const d = res.data.data;
          setProfile({
            fullName:     d.fullName     || "",
            email:        d.email        || "",
            phone:        d.phone        || "",
            businessName: d.businessName || "",
            ville:        d.ville        || "",
            category:     d.category     || "",
          });
          setNotifs({
            newBookingEmail:   d.notificationPrefs?.newBookingEmail   ?? true,
            cancellationEmail: d.notificationPrefs?.cancellationEmail ?? true,
          });
          setTwoFaEnabled(d.twoFactor?.enabled ?? false);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeTab !== "website" || websiteFetched) return;
    setWebsiteLoading(true);
    API.get("/merchant/website/my-site")
      .then((res) => setWebsite(res.data))
      .catch(() => {})
      .finally(() => { setWebsiteLoading(false); setWebsiteFetched(true); });
  }, [activeTab, websiteFetched]);

  const saveProfile = async () => {
    setProfileSaving(true);
    setProfileAlert(null);
    try {
      const res = await API.patch("/merchant/settings/profile", {
        businessName: profile.businessName,
        phone: profile.phone,
      });
      if (res.data?.success) setProfileAlert({ type: "success", message: "Profile updated successfully." });
    } catch (err) {
      setProfileAlert({ type: "error", message: err.response?.data?.message || "Failed to save changes." });
    } finally {
      setProfileSaving(false);
    }
  };

  const changePassword = async () => {
    setPwdAlert(null);
    if (!pwd.current || !pwd.newPwd || !pwd.confirm) { setPwdAlert({ type: "error", message: "All fields are required." }); return; }
    if (pwd.newPwd !== pwd.confirm) { setPwdAlert({ type: "error", message: "New passwords do not match." }); return; }
    if (pwd.newPwd.length < 8) { setPwdAlert({ type: "error", message: "New password must be at least 8 characters." }); return; }
    setPwdSaving(true);
    try {
      const res = await API.patch("/merchant/settings/password", { currentPassword: pwd.current, newPassword: pwd.newPwd });
      if (res.data?.success) { setPwdAlert({ type: "success", message: "Password changed. You are now more secure." }); setPwd({ current: "", newPwd: "", confirm: "" }); }
    } catch (err) {
      setPwdAlert({ type: "error", message: err.response?.data?.message || "Failed to change password." });
    } finally {
      setPwdSaving(false);
    }
  };

  const saveNotifications = async () => {
    setNotifSaving(true);
    setNotifAlert(null);
    try {
      const res = await API.patch("/merchant/settings/notifications", notifs);
      if (res.data?.success) setNotifAlert({ type: "success", message: "Notification preferences saved." });
    } catch {
      setNotifAlert({ type: "error", message: "Failed to save preferences." });
    } finally {
      setNotifSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">

      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Business Settings</h2>
        <p className="text-slate-500 font-medium mt-1">Manage your profile, password, and notification preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Left nav */}
        <div className="space-y-2">
          {TABS.map((tab) => {
            const Icon  = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${active ? "bg-white shadow-md border border-slate-100 text-indigo-600" : "text-slate-500 hover:bg-white/60"}`}
              >
                <div className="flex items-center gap-3 font-black text-sm uppercase tracking-widest">
                  <Icon size={18} /> {tab.label}
                </div>
                <ChevronRight size={16} className={active ? "opacity-100" : "opacity-0"} />
              </button>
            );
          })}
        </div>

        {/* Right panel */}
        <div className="lg:col-span-3 space-y-6">

          {/* ── PROFILE TAB ── */}
          {activeTab === "profile" && (
            <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><UserCircle size={22} /></div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Profile Information</h3>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">Update your business name and contact number.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Full Name">
                  <div className="relative">
                    <input type="text" value={profile.fullName} disabled className={inputClass} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded-full">Read-only</span>
                  </div>
                </Field>
                <Field label="Email Address">
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="email" value={profile.email} disabled className={`${inputClass} pl-10`} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded-full">Read-only</span>
                  </div>
                </Field>
                <Field label="Business Name">
                  <input type="text" value={profile.businessName} onChange={(e) => setProfile((p) => ({ ...p, businessName: e.target.value }))} placeholder="e.g. SmartStyle Barber" className={inputClass} />
                </Field>
                <Field label="Phone Number">
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="tel" value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} placeholder="+216 -- --- ---" className={`${inputClass} pl-10`} />
                  </div>
                </Field>
                <Field label="Category">
                  <input type="text" value={profile.category} disabled className={inputClass} />
                </Field>
                <Field label="Governorate">
                  <input type="text" value={profile.ville} disabled className={inputClass} />
                </Field>
              </div>

              <InlineAlert type={profileAlert?.type} message={profileAlert?.message} />
              <div className="flex justify-end">
                <button onClick={saveProfile} disabled={profileSaving} className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all disabled:opacity-60">
                  {profileSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {profileSaving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </section>
          )}

          {/* ── SECURITY TAB ── */}
          {activeTab === "security" && (
            <div className="space-y-6">

              {/* Password change card */}
              <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-violet-50 text-violet-600 rounded-2xl"><ShieldCheck size={22} /></div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Change Password</h3>
                    <p className="text-xs text-slate-400 font-bold mt-0.5">Use a strong password with at least 8 characters.</p>
                  </div>
                </div>

                <Field label="Current Password">
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type={showCurrent ? "text" : "password"} value={pwd.current} onChange={(e) => setPwd((p) => ({ ...p, current: e.target.value }))} placeholder="Enter current password" className={`${inputClass} pl-10 pr-12`} />
                    <button onClick={() => setShowCurrent(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </Field>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="New Password">
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type={showNew ? "text" : "password"} value={pwd.newPwd} onChange={(e) => setPwd((p) => ({ ...p, newPwd: e.target.value }))} placeholder="Min. 8 characters" className={`${inputClass} pl-10 pr-12`} />
                      <button onClick={() => setShowNew(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </Field>
                  <Field label="Confirm New Password">
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type={showConfirm ? "text" : "password"} value={pwd.confirm} onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))} placeholder="Repeat new password" className={`${inputClass} pl-10 pr-12`} />
                      <button onClick={() => setShowConfirm(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </Field>
                </div>

                {pwd.newPwd && (
                  <div className="space-y-1.5">
                    <div className="flex gap-1.5">
                      {[pwd.newPwd.length >= 8, /[A-Z]/.test(pwd.newPwd), /[0-9]/.test(pwd.newPwd), /[^A-Za-z0-9]/.test(pwd.newPwd)].map((met, i) => (
                        <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${met ? "bg-indigo-500" : "bg-slate-200"}`} />
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold">
                      {["Too weak","Weak","Fair","Strong","Very strong"][[pwd.newPwd.length >= 8, /[A-Z]/.test(pwd.newPwd), /[0-9]/.test(pwd.newPwd), /[^A-Za-z0-9]/.test(pwd.newPwd)].filter(Boolean).length]}
                      {" — "}8+ chars, uppercase, number, symbol
                    </p>
                  </div>
                )}

                {pwd.confirm && (
                  <div className={`flex items-center gap-2 text-xs font-bold ${pwd.newPwd === pwd.confirm ? "text-emerald-600" : "text-rose-500"}`}>
                    {pwd.newPwd === pwd.confirm ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                    {pwd.newPwd === pwd.confirm ? "Passwords match" : "Passwords do not match"}
                  </div>
                )}

                <InlineAlert type={pwdAlert?.type} message={pwdAlert?.message} />
                <div className="flex justify-end">
                  <button onClick={changePassword} disabled={pwdSaving} className="flex items-center gap-2 px-8 py-3.5 bg-violet-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] hover:bg-violet-700 shadow-lg shadow-violet-100 transition-all disabled:opacity-60">
                    {pwdSaving ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                    {pwdSaving ? "Updating…" : "Update Password"}
                  </button>
                </div>
              </section>

              {/* ── 2FA CARD ── */}
              <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><KeyRound size={22} /></div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Two-Factor Authentication</h3>
                    <p className="text-xs text-slate-400 font-bold mt-0.5">Add a second layer of protection to your account.</p>
                  </div>
                </div>

                <TwoFactorPanel enabled={twoFaEnabled} />

                {/* Info box */}
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500 font-medium">
                  <ShieldCheck size={15} className="text-indigo-400 shrink-0 mt-0.5" />
                  When 2FA is active, you will need to enter a 6-digit code from your authenticator app each time you log in, even if someone knows your password.
                </div>
              </section>
            </div>
          )}

          {/* ── NOTIFICATIONS TAB ── */}
          {activeTab === "notifications" && (
            <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Bell size={22} /></div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Email Notifications</h3>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">Choose what alerts you receive at your inbox.</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { key: "newBookingEmail", icon: <BellRing size={18} className="text-indigo-600" />, bg: "bg-indigo-50", label: "New Booking Alert", desc: "Get an email instantly whenever a customer schedules an appointment.", badge: "Recommended", badgeColor: "bg-indigo-100 text-indigo-700" },
                  { key: "cancellationEmail", icon: <BellOff size={18} className="text-rose-600" />, bg: "bg-rose-50", label: "Cancellation Alert", desc: "Get notified when a confirmed booking is cancelled.", badge: null },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-2.5 rounded-xl ${item.bg} shrink-0`}>{item.icon}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-black text-slate-900">{item.label}</p>
                          {item.badge && (
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${item.badgeColor}`}>{item.badge}</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    <Toggle enabled={notifs[item.key]} onChange={(val) => setNotifs((n) => ({ ...n, [item.key]: val }))} disabled={notifSaving} />
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Mail size={16} className="text-slate-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 font-medium">
                  All emails are sent to <span className="font-black text-slate-900">{profile.email}</span>. To change your email address, please contact support.
                </p>
              </div>

              <InlineAlert type={notifAlert?.type} message={notifAlert?.message} />
              <div className="flex justify-end">
                <button onClick={saveNotifications} disabled={notifSaving} className="flex items-center gap-2 px-8 py-3.5 bg-amber-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] hover:bg-amber-600 shadow-lg shadow-amber-100 transition-all disabled:opacity-60">
                  {notifSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {notifSaving ? "Saving…" : "Save Preferences"}
                </button>
              </div>
            </section>
          )}

          {/* ── WEBSITE QR CODE TAB ── */}
          {activeTab === "website" && (
            <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><QrCode size={22} /></div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Booking QR Code</h3>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">Let customers scan and book instantly — no link needed.</p>
                </div>
              </div>
              <WebsiteQRPanel website={website} loading={websiteLoading} />
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;
