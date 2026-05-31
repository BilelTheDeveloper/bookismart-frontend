import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Building2, MapPin } from "lucide-react";

const Step1Global = ({ formData, setFormData, onNext, onPrev }) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState([]); // Track which fields are empty

  const isOrg = formData.accountType === "organization";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: file });
      setPreview(URL.createObjectURL(file));
      setErrors(errors.filter((item) => item !== "profilePic"));
    }
  };

  const handleValidation = () => {
    const newErrors = [];
    const { fullName, businessName, category, ville, email, phone, profilePic, organizationName, branchCount, teamSize } = formData;

    if (!profilePic) newErrors.push("profilePic");
    if (!fullName.trim()) newErrors.push("fullName");
    if (!businessName.trim()) newErrors.push("businessName");
    if (!category) newErrors.push("category");
    if (!ville) newErrors.push("ville");
    if (!email.trim()) newErrors.push("email");
    if (!phone.trim()) newErrors.push("phone");
    if (isOrg) {
      if (!organizationName?.trim()) newErrors.push("organizationName");
      if (!branchCount) newErrors.push("branchCount");
      if (!teamSize) newErrors.push("teamSize");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      toast.error(t("signup.step1.fillAll"));
      setTimeout(() => setErrors([]), 1000);
      return;
    }

    onNext();
  };

  const categories = [
    "Beauty & Barbers", "Health & Medical", "Fitness & Gyms",
    "Creative & Media", "Car Services", "Maintenance",
    "Coaching & Tutors", "Consultants", "Events & DJs", "Grooming & Vets"
  ];

  const villes = [
    "Ariana", "Beja", "Ben Arous", "Bizerte", "Gabes", "Gafsa",
    "Jendouba", "Kairouan", "Kasserine", "Kebili", "Kef", "Mahdia",
    "Manouba", "Medenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid",
    "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"
  ];

  // Helper to apply Red Border + Shake Vibration
  const getErrorStyle = (field) =>
    errors.includes(field)
      ? "border-red-500 border-2 animate-shake bg-red-50 dark:bg-red-500/10"
      : "border-slate-200 dark:border-slate-700 focus:ring-indigo-500";

  const fieldBase =
    "w-full p-4 bg-white dark:bg-slate-800 border rounded-2xl outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">

      {/* CSS for Vibration Effect */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>

      <header>
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1 w-8 bg-indigo-600 rounded-full" />
          <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{t("signup.step1.stepLabel")}</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          {isOrg ? t("signup.step1.titleOrganization") : t("signup.step1.titleIndividual")}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">{t("signup.step1.subtitle")}</p>
      </header>

      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="relative group">
          <div className={`w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed flex items-center justify-center overflow-hidden transition-all ${errors.includes("profilePic") ? "border-red-500 border-2 animate-shake" : preview ? "border-indigo-500" : "border-slate-300 dark:border-slate-600"}`}>
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-slate-400 dark:text-slate-500 text-xs text-center px-2">{t("signup.step1.logo")}</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageChange}
          />
        </div>
        <p className={`text-xs font-bold uppercase tracking-widest ${errors.includes("profilePic") ? "text-red-500" : "text-indigo-600 dark:text-indigo-400"}`}>{t("signup.step1.uploadHint")}</p>
      </div>

      {/* Organization-only block */}
      {isOrg && (
        <div className="rounded-2xl border border-indigo-100 dark:border-indigo-500/20 bg-indigo-50/60 dark:bg-indigo-500/5 p-4 space-y-4">
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs font-black text-slate-700 dark:text-slate-300 uppercase">
              <Building2 size={13} className="text-indigo-500" /> {t("signup.step1.orgName")} *
            </label>
            <input
              type="text"
              className={`${fieldBase} ${getErrorStyle("organizationName")}`}
              placeholder={t("signup.step1.orgNamePlaceholder")}
              value={formData.organizationName}
              onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase">{t("signup.step1.branchCount")} *</label>
              <input
                type="number" min="1"
                className={`${fieldBase} ${getErrorStyle("branchCount")}`}
                placeholder="3"
                value={formData.branchCount}
                onChange={(e) => setFormData({ ...formData, branchCount: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase">{t("signup.step1.teamSize")} *</label>
              <input
                type="number" min="1"
                className={`${fieldBase} ${getErrorStyle("teamSize")}`}
                placeholder="8"
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase">{t("signup.step1.fullName")} *</label>
          <input
            type="text"
            className={`${fieldBase} ${getErrorStyle("fullName")}`}
            placeholder={t("signup.step1.fullNamePlaceholder")}
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>

        {/* Business Name */}
        <div className="space-y-1">
          <label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase">{t("signup.step1.businessName")} *</label>
          <input
            type="text"
            className={`${fieldBase} ${getErrorStyle("businessName")}`}
            placeholder={t("signup.step1.businessNamePlaceholder")}
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase">{t("signup.step1.category")} *</label>
          <select
            className={`${fieldBase} appearance-none ${getErrorStyle("category")}`}
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="">{t("signup.step1.selectCategory")}</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        {/* Ville */}
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-xs font-black text-slate-700 dark:text-slate-300 uppercase">
            <MapPin size={13} className="text-slate-400" /> {t("signup.step1.city")} *
          </label>
          <select
            className={`${fieldBase} appearance-none ${getErrorStyle("ville")}`}
            value={formData.ville}
            onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
          >
            <option value="">{t("signup.step1.selectCity")}</option>
            {villes.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      </div>

      {/* Email & Phone */}
      <div className="space-y-4">
        <input
          type="email"
          placeholder={t("signup.step1.emailPlaceholder")}
          className={`${fieldBase} ${getErrorStyle("email")}`}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder={t("signup.step1.phonePlaceholder")}
          className={`${fieldBase} ${getErrorStyle("phone")}`}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div className="flex gap-4">
        {onPrev && (
          <button
            onClick={onPrev}
            className="flex-1 py-5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
          >
            {t("signup.step2.back")}
          </button>
        )}
        <button
          onClick={handleValidation}
          className="flex-[2] py-5 bg-slate-900 dark:bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 active:scale-95"
        >
          {t("signup.step1.continue")}
        </button>
      </div>
    </div>
  );
};

export default Step1Global;
