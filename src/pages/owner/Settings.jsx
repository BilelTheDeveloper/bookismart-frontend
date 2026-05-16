import React, { useState, useEffect } from "react";
import {
  UserCircle, ShieldCheck, Bell, Save, Eye, EyeOff,
  CheckCircle2, AlertCircle, Loader2, Lock, Phone,
  Building2, Mail, ChevronRight, RefreshCw, BellOff, BellRing,
} from "lucide-react";
import API from "../../api/config";

/* ─── Inline alert ─── */
const InlineAlert = ({ type, message }) => {
  if (!message) return null;
  const styles = type === "success"
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : "bg-rose-50 text-rose-700 border-rose-200";
  const Icon = type === "success" ? CheckCircle2 : AlertCircle;
  return (
    <div className={`flex items-center gap-3 p-4 rounded-2xl border ${styles} text-sm font-bold`}>
      <Icon size={16} className="shrink-0" /> {message}
    </div>
  );
};

/* ─── Toggle switch ─── */
const Toggle = ({ enabled, onChange, disabled }) => (
  <button
    onClick={() => !disabled && onChange(!enabled)}
    disabled={disabled}
    className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${enabled ? "bg-indigo-600" : "bg-slate-200"} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
  >
    <div className={`w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${enabled ? "translate-x-6" : "translate-x-0"}`} />
  </button>
);

/* ─── Field wrapper ─── */
const Field = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{label}</label>
    {children}
  </div>
);

const inputClass = "w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-indigo-500 transition-all outline-none disabled:text-slate-400 disabled:cursor-not-allowed";

const TABS = [
  { id: "profile", label: "Profile", icon: UserCircle },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);

  /* ── Profile tab state ── */
  const [profile, setProfile] = useState({ fullName: "", email: "", phone: "", businessName: "", ville: "", category: "" });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileAlert, setProfileAlert] = useState(null);

  /* ── Security tab state ── */
  const [pwd, setPwd] = useState({ current: "", newPwd: "", confirm: "" });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwdSaving, setPwdSaving] = useState(false);
  const [pwdAlert, setPwdAlert] = useState(null);

  /* ── Notifications tab state ── */
  const [notifs, setNotifs] = useState({ newBookingEmail: true, cancellationEmail: true });
  const [notifSaving, setNotifSaving] = useState(false);
  const [notifAlert, setNotifAlert] = useState(null);

  useEffect(() => {
    API.get("/merchant/settings")
      .then((res) => {
        if (res.data?.success) {
          const d = res.data.data;
          setProfile({
            fullName: d.fullName || "",
            email: d.email || "",
            phone: d.phone || "",
            businessName: d.businessName || "",
            ville: d.ville || "",
            category: d.category || "",
          });
          setNotifs({
            newBookingEmail: d.notificationPrefs?.newBookingEmail ?? true,
            cancellationEmail: d.notificationPrefs?.cancellationEmail ?? true,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  /* ── Save profile ── */
  const saveProfile = async () => {
    setProfileSaving(true);
    setProfileAlert(null);
    try {
      const res = await API.patch("/merchant/settings/profile", {
        businessName: profile.businessName,
        phone: profile.phone,
      });
      if (res.data?.success) {
        setProfileAlert({ type: "success", message: "Profile updated successfully." });
        const stored = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem("user", JSON.stringify({ ...stored, businessName: profile.businessName, phone: profile.phone }));
      }
    } catch (err) {
      setProfileAlert({ type: "error", message: err.response?.data?.message || "Failed to save changes." });
    } finally {
      setProfileSaving(false);
    }
  };

  /* ── Change password ── */
  const changePassword = async () => {
    setPwdAlert(null);
    if (!pwd.current || !pwd.newPwd || !pwd.confirm) {
      setPwdAlert({ type: "error", message: "All fields are required." });
      return;
    }
    if (pwd.newPwd !== pwd.confirm) {
      setPwdAlert({ type: "error", message: "New passwords do not match." });
      return;
    }
    if (pwd.newPwd.length < 8) {
      setPwdAlert({ type: "error", message: "New password must be at least 8 characters." });
      return;
    }
    setPwdSaving(true);
    try {
      const res = await API.patch("/merchant/settings/password", {
        currentPassword: pwd.current,
        newPassword: pwd.newPwd,
      });
      if (res.data?.success) {
        setPwdAlert({ type: "success", message: "Password changed. You are now more secure." });
        setPwd({ current: "", newPwd: "", confirm: "" });
      }
    } catch (err) {
      setPwdAlert({ type: "error", message: err.response?.data?.message || "Failed to change password." });
    } finally {
      setPwdSaving(false);
    }
  };

  /* ── Save notifications ── */
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

      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Business Settings</h2>
        <p className="text-slate-500 font-medium mt-1">Manage your profile, password, and notification preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Left nav */}
        <div className="space-y-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                  active ? "bg-white shadow-md border border-slate-100 text-indigo-600" : "text-slate-500 hover:bg-white/60"
                }`}
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
                    <input
                      type="text"
                      value={profile.fullName}
                      disabled
                      className={inputClass}
                    />
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
                  <input
                    type="text"
                    value={profile.businessName}
                    onChange={(e) => setProfile((p) => ({ ...p, businessName: e.target.value }))}
                    placeholder="e.g. SmartStyle Barber"
                    className={inputClass}
                  />
                </Field>
                <Field label="Phone Number">
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="+216 -- --- ---"
                      className={`${inputClass} pl-10`}
                    />
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
                <button
                  onClick={saveProfile}
                  disabled={profileSaving}
                  className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all disabled:opacity-60"
                >
                  {profileSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {profileSaving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </section>
          )}

          {/* ── SECURITY TAB ── */}
          {activeTab === "security" && (
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
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={pwd.current}
                    onChange={(e) => setPwd((p) => ({ ...p, current: e.target.value }))}
                    placeholder="Enter current password"
                    className={`${inputClass} pl-10 pr-12`}
                  />
                  <button onClick={() => setShowCurrent((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="New Password">
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showNew ? "text" : "password"}
                      value={pwd.newPwd}
                      onChange={(e) => setPwd((p) => ({ ...p, newPwd: e.target.value }))}
                      placeholder="Min. 8 characters"
                      className={`${inputClass} pl-10 pr-12`}
                    />
                    <button onClick={() => setShowNew((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </Field>
                <Field label="Confirm New Password">
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={pwd.confirm}
                      onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))}
                      placeholder="Repeat new password"
                      className={`${inputClass} pl-10 pr-12`}
                    />
                    <button onClick={() => setShowConfirm((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </Field>
              </div>

              {/* Password strength indicator */}
              {pwd.newPwd && (
                <div className="space-y-1.5">
                  <div className="flex gap-1.5">
                    {[
                      pwd.newPwd.length >= 8,
                      /[A-Z]/.test(pwd.newPwd),
                      /[0-9]/.test(pwd.newPwd),
                      /[^A-Za-z0-9]/.test(pwd.newPwd),
                    ].map((met, i) => (
                      <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${met ? "bg-indigo-500" : "bg-slate-200"}`} />
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold">
                    {(() => {
                      const score = [pwd.newPwd.length >= 8, /[A-Z]/.test(pwd.newPwd), /[0-9]/.test(pwd.newPwd), /[^A-Za-z0-9]/.test(pwd.newPwd)].filter(Boolean).length;
                      return ["Too weak", "Weak", "Fair", "Strong", "Very strong"][score];
                    })()}
                    {" — "}8+ chars, uppercase, number, symbol
                  </p>
                </div>
              )}

              {/* Match indicator */}
              {pwd.confirm && (
                <div className={`flex items-center gap-2 text-xs font-bold ${pwd.newPwd === pwd.confirm ? "text-emerald-600" : "text-rose-500"}`}>
                  {pwd.newPwd === pwd.confirm ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                  {pwd.newPwd === pwd.confirm ? "Passwords match" : "Passwords do not match"}
                </div>
              )}

              <InlineAlert type={pwdAlert?.type} message={pwdAlert?.message} />

              <div className="flex justify-end">
                <button
                  onClick={changePassword}
                  disabled={pwdSaving}
                  className="flex items-center gap-2 px-8 py-3.5 bg-violet-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] hover:bg-violet-700 shadow-lg shadow-violet-100 transition-all disabled:opacity-60"
                >
                  {pwdSaving ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                  {pwdSaving ? "Updating…" : "Update Password"}
                </button>
              </div>
            </section>
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
                  {
                    key: "newBookingEmail",
                    icon: <BellRing size={18} className="text-indigo-600" />,
                    bg: "bg-indigo-50",
                    label: "New Booking Alert",
                    desc: "Get an email instantly whenever a customer schedules an appointment.",
                    badge: "Recommended",
                    badgeColor: "bg-indigo-100 text-indigo-700",
                  },
                  {
                    key: "cancellationEmail",
                    icon: <BellOff size={18} className="text-rose-600" />,
                    bg: "bg-rose-50",
                    label: "Cancellation Alert",
                    desc: "Get notified when a confirmed booking is cancelled.",
                    badge: null,
                  },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-2.5 rounded-xl ${item.bg} shrink-0`}>{item.icon}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-black text-slate-900">{item.label}</p>
                          {item.badge && (
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    <Toggle
                      enabled={notifs[item.key]}
                      onChange={(val) => setNotifs((n) => ({ ...n, [item.key]: val }))}
                      disabled={notifSaving}
                    />
                  </div>
                ))}
              </div>

              {/* Info box */}
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Mail size={16} className="text-slate-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 font-medium">
                  All emails are sent to <span className="font-black text-slate-900">{profile.email}</span>.
                  To change your email address, please contact support.
                </p>
              </div>

              <InlineAlert type={notifAlert?.type} message={notifAlert?.message} />

              <div className="flex justify-end">
                <button
                  onClick={saveNotifications}
                  disabled={notifSaving}
                  className="flex items-center gap-2 px-8 py-3.5 bg-amber-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] hover:bg-amber-600 shadow-lg shadow-amber-100 transition-all disabled:opacity-60"
                >
                  {notifSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {notifSaving ? "Saving…" : "Save Preferences"}
                </button>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;
