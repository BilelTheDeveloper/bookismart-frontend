import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Star, Loader2, CheckCircle2, AlertCircle, Sparkles, ArrowLeft } from "lucide-react";
import API from "../../api/config";

const ReviewPage = () => {
  const { token } = useParams();
  const navigate   = useNavigate();
  const { t, i18n } = useTranslation();
  const locale = i18n.language?.slice(0, 2) || "fr";

  const [info,       setInfo]       = useState(null);
  const [loadErr,    setLoadErr]    = useState(null);
  const [loadDone,   setLoadDone]   = useState(false);
  const [rating,     setRating]     = useState(0);
  const [hovered,    setHovered]    = useState(0);
  const [text,       setText]       = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success,    setSuccess]    = useState(false);
  const [submitErr,  setSubmitErr]  = useState(null);

  const LABELS = t("review.ratingLabels", { returnObjects: true });
  const COLORS = [
    "text-red-400",
    "text-orange-400",
    "text-amber-400",
    "text-lime-400",
    "text-emerald-400",
  ];

  // Load booking info from token
  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/public/reviews/lookup?token=${token}`);
        if (res.data.success) {
          setInfo(res.data.data);
        } else {
          setLoadErr(res.data.message || t("review.invalidLink"));
        }
      } catch (err) {
        const msg = err.response?.data?.message;
        if (err.response?.data?.alreadySubmitted) {
          setLoadErr(t("review.alreadySubmitted"));
        } else {
          setLoadErr(msg || t("review.invalidLink"));
        }
      } finally {
        setLoadDone(true);
      }
    };
    load();
  }, [token, t]);

  const handleSubmit = async () => {
    if (!rating) return;
    setSubmitting(true);
    setSubmitErr(null);
    try {
      const res = await API.post("/public/reviews/submit", { token, rating, text });
      if (res.data.success) {
        setSuccess(true);
      }
    } catch (err) {
      setSubmitErr(err.response?.data?.message || t("common.error"));
    } finally {
      setSubmitting(false);
    }
  };

  const displayRating = hovered || rating;

  // ── Loading ──
  if (!loadDone) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm font-medium">{t("review.verifyingLink")}</p>
        </div>
      </div>
    );
  }

  // ── Error state ──
  if (loadErr) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-sm w-full text-center">
          <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-rose-400" />
          </div>
          <h2 className="text-xl font-black text-white mb-2">{t("review.invalidTitle")}</h2>
          <p className="text-slate-400 text-sm mb-8">{loadErr}</p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/10 rounded-xl text-white text-sm font-semibold hover:bg-white/15 transition-all"
          >
            <ArrowLeft size={14} /> {t("review.returnHome")}
          </button>
        </div>
      </div>
    );
  }

  // ── Success state ──
  if (success) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-sm w-full text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-400/30 flex items-center justify-center mx-auto animate-pulse">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full animate-ping opacity-30" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">{t("review.success")}</h1>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            {t("review.publicNotice")}
          </p>
          <div className="flex justify-center gap-1 mb-8">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={28}
                className={i < rating ? "text-amber-400 fill-amber-400" : "text-slate-700 dark:text-slate-200 fill-slate-700"}
              />
            ))}
          </div>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-indigo-600 rounded-xl font-bold text-white hover:bg-indigo-500 transition-all"
          >
            {t("review.returnToBookiify")}
          </button>
        </div>
      </div>
    );
  }

  // ── Review form ──
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-amber-500/5 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-400">
            <Sparkles size={11} />
            {t("review.yourOpinion")}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
          {/* Booking info card */}
          <div className="bg-white/5 border border-white/8 rounded-2xl p-4 mb-8">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">{t("review.yourAppointment")}</p>
            <p className="text-white font-bold text-base">{info.service}</p>
            <p className="text-slate-400 text-sm mt-0.5">{t("review.at")} {info.businessName}</p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-[11px] font-medium text-slate-500">
                {info.date ? new Date(info.date).toLocaleDateString(locale, { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : ""}
              </span>
            </div>
          </div>

          {/* Star picker */}
          <div className="text-center mb-6">
            <p className="text-sm font-black text-white mb-1">
              {t("review.helloGreeting", { name: info.customerName?.split(" ")[0] || "" })}
            </p>
            <p className="text-xs text-slate-500 mb-5">{t("review.tapToRate")}</p>

            <div className="flex justify-center gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-125 active:scale-110"
                >
                  <Star
                    size={40}
                    className={`transition-colors duration-150 ${
                      star <= displayRating
                        ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                        : "text-slate-700 dark:text-slate-200 fill-slate-700"
                    }`}
                  />
                </button>
              ))}
            </div>

            {displayRating > 0 && (
              <p className={`text-sm font-black transition-all ${COLORS[displayRating - 1]}`}>
                {Array.isArray(LABELS) ? LABELS[displayRating - 1] : ""}
              </p>
            )}
          </div>

          {/* Text input */}
          <div className="mb-6">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">
              {t("review.commentLabel")}
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t("review.commentPlaceholder")}
              rows={4}
              maxLength={1200}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder:text-slate-600 dark:text-slate-300 outline-none transition-all focus:border-amber-400/40 focus:bg-white/8 resize-none"
            />
            <p className="text-right text-[10px] text-slate-600 dark:text-slate-300 mt-1">{text.length} / 1200</p>
          </div>

          {/* Error */}
          {submitErr && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-2">
              <AlertCircle size={14} className="text-rose-400 flex-shrink-0 mt-0.5" />
              <p className="text-rose-300 text-xs">{submitErr}</p>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!rating || submitting}
            className="w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/25 hover:shadow-amber-400/40"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("review.submitting")}
              </>
            ) : (
              <>
                <Star size={15} className="fill-amber-950" />
                {t("review.publishReview")}
              </>
            )}
          </button>

          <p className="text-center text-[10px] text-slate-600 dark:text-slate-300 mt-4">
            {t("review.publicNotice")}
          </p>
        </div>

        <p className="text-center text-[11px] text-slate-600 dark:text-slate-300 mt-6">
          Powered by <span className="font-black text-slate-500">Bookiify</span>
        </p>
      </div>
    </div>
  );
};

export default ReviewPage;
