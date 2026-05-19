import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getThemeById } from "../owner/ThemeRegistry";
import {
  Sparkles, Globe, Loader2, MapPin, Navigation,
  Play, Pause, Volume2, VolumeX,
  Shield, CheckCircle2, Star, Users, Timer, Award,
  ThumbsUp, MessageSquare, ChevronLeft, ChevronRight, X,
} from "lucide-react";
import API from "../../api/config";

// ─── Presentation Reel section ───────────────────────────────────────────────
const PresentationReelSection = ({ reel }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying]   = useState(false);
  const [muted,   setMuted]     = useState(true);
  const [ready,   setReady]     = useState(false);

  // Autoplay muted as soon as the video enters the viewport
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          el.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) { el.play(); setPlaying(true); }
    else           { el.pause(); setPlaying(false); }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  return (
    <section className="bg-slate-950 py-16 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-violet-400">
            <Play size={11} className="fill-violet-400" />
            Présentation
          </span>
          <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl">
            {reel.title || 'Notre savoir-faire en vidéo'}
          </h2>
          {reel.subtitle && (
            <p className="mt-2 text-sm font-medium text-slate-400">{reel.subtitle}</p>
          )}
        </div>

        {/* Video player */}
        <div
          className="relative cursor-pointer overflow-hidden rounded-[2rem] bg-slate-900 shadow-2xl shadow-black/60 aspect-video"
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src={reel.videoUrl}
            className="h-full w-full object-cover"
            playsInline
            muted
            loop
            preload="metadata"
            onCanPlay={() => setReady(true)}
          />

          {/* Gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Loading shimmer */}
          {!ready && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
              <div className="h-12 w-12 rounded-full border-4 border-violet-500 border-t-transparent animate-spin" />
            </div>
          )}

          {/* Play/pause overlay */}
          {ready && !playing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all hover:scale-110">
                <Play size={32} className="text-white fill-white ml-1" />
              </div>
            </div>
          )}

          {/* Controls bar */}
          {ready && (
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-sm px-3 py-1.5">
                <div className={`h-2 w-2 rounded-full ${playing ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
                <span className="text-[11px] font-bold text-white">{playing ? 'En lecture' : 'En pause'}</span>
              </div>
              <button
                onClick={toggleMute}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white hover:bg-black/60 transition-all"
              >
                {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
            </div>
          )}
        </div>

        {/* Tap hint */}
        <p className="mt-4 text-center text-xs font-medium text-slate-600">
          Appuyez sur la vidéo pour lecture / pause
        </p>
      </div>
    </section>
  );
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const renderStars = (rating, size = 16) =>
  Array.from({ length: 5 }, (_, i) => {
    const filled  = i < Math.floor(rating);
    const partial = !filled && i < rating;
    return (
      <span key={i} style={{ position: "relative", display: "inline-block", width: size, height: size }}>
        <Star size={size} className="text-slate-200" fill="currentColor" />
        {(filled || partial) && (
          <span style={{ position: "absolute", inset: 0, overflow: "hidden", width: partial ? `${(rating % 1) * 100}%` : "100%" }}>
            <Star size={size} className="text-amber-400" fill="currentColor" />
          </span>
        )}
      </span>
    );
  });

// ─── Trust Signals Section ────────────────────────────────────────────────────
const TrustSignalsSection = ({ data }) => {
  const {
    rating, reviewCount, completedCount, uniqueClients,
    cancellationRate, avgResponseHours,
  } = data;

  const responseLabel = avgResponseHours == null ? null
    : avgResponseHours < 1  ? "< 1 heure"
    : avgResponseHours < 24 ? `~${Math.round(avgResponseHours)}h`
    : `~${Math.round(avgResponseHours / 24)} jours`;

  const successRate = completedCount > 0
    ? Math.max(0, 100 - (cancellationRate ?? 0))
    : null;

  const metrics = [
    { icon: Shield,       value: "Vérifié",   label: "Profil certifié",   color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
    { icon: Users,        value: uniqueClients > 0 ? `${uniqueClients}+` : "—", label: "Clients uniques", color: "text-indigo-400", bg: "bg-indigo-400/10 border-indigo-400/20" },
    { icon: CheckCircle2, value: completedCount > 0 ? `${completedCount}` : "—", label: "RDV réalisés", color: "text-violet-400", bg: "bg-violet-400/10 border-violet-400/20" },
    { icon: Timer,        value: responseLabel ?? "—", label: "Tps de réponse", color: "text-cyan-400", bg: "bg-cyan-400/10 border-cyan-400/20" },
    { icon: ThumbsUp,     value: successRate !== null ? `${successRate}%` : "—", label: "Taux de succès", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
    { icon: Star,         value: rating ? `${rating.toFixed(1)}/5` : "—", label: `${reviewCount ?? 0} avis clients`, color: "text-rose-400", bg: "bg-rose-400/10 border-rose-400/20" },
  ];

  return (
    <section className="bg-slate-950 border-t border-slate-800/60 py-14 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-emerald-400">
            <Shield size={11} />
            Signaux de confiance
          </span>
          <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl">
            Ce profil est <span className="text-emerald-400">vérifié</span> et fiable
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            Données réelles basées sur l'activité de ce professionnel sur Bookiify
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {metrics.map(({ icon: Icon, value, label, color, bg }) => (
            <div
              key={label}
              className={`flex flex-col items-center gap-3 rounded-2xl border p-5 ${bg} transition-all hover:scale-[1.02]`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${bg}`}>
                <Icon size={20} className={color} />
              </div>
              <div className="text-center">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust statement */}
        <div className="mt-8 flex items-start gap-3 rounded-2xl bg-white/5 border border-white/10 p-5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Shield size={14} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Profil certifié Bookiify</p>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Ce professionnel a complété le processus de vérification d'identité (KYC) Bookiify.
              Ses informations ont été validées par notre équipe. Réservez en toute confiance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Reviews Section ──────────────────────────────────────────────────────────
const ReviewsSection = ({ ownerId, initialReviews, initialRating, initialCount }) => {
  const [reviews,  setReviews]  = useState(initialReviews || []);
  const [rating,   setRating]   = useState(initialRating ?? null);
  const [total,    setTotal]    = useState(initialCount  ?? 0);
  const [page,     setPage]     = useState(1);
  const [pages,    setPages]    = useState(1);
  const [dist,     setDist]     = useState([]);
  const [loading,  setLoading]  = useState(false);

  const load = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const res = await API.get(`/public/reviews/${ownerId}?page=${p}&limit=5`);
      if (res.data.success) {
        const d = res.data.data;
        setReviews(d.reviews);
        setRating(d.avgRating);
        setTotal(d.total);
        setPage(p);
        setPages(d.pages);
        setDist(d.distribution || []);
      }
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, [ownerId]);

  useEffect(() => { load(1); }, [load]);

  if (total === 0 && !loading) return null;

  return (
    <section className="bg-slate-900 border-t border-slate-800/60 py-14 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-amber-400">
            <Star size={11} className="fill-amber-400" />
            Avis clients
          </span>
          <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl">
            Ce que disent nos clients
          </h2>
        </div>

        {/* Rating overview */}
        {rating && (
          <div className="flex flex-col sm:flex-row gap-6 items-center mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
            {/* Big score */}
            <div className="text-center flex-shrink-0">
              <p className="text-6xl font-black text-white">{rating.toFixed(1)}</p>
              <div className="flex gap-0.5 justify-center mt-1">
                {renderStars(rating, 18)}
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">{total} avis au total</p>
            </div>
            {/* Distribution bars */}
            {dist.length > 0 && (
              <div className="flex-1 w-full space-y-1.5">
                {dist.map(({ star, count }) => {
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-400 w-4 text-right">{star}</span>
                      <Star size={9} className="text-amber-400 fill-amber-400 flex-shrink-0" />
                      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium w-8">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Review cards */}
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((r, i) => (
              <div
                key={r._id || i}
                className="rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/8 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                      {(r.customerName || "C")[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{r.customerName}</p>
                      <p className="text-[11px] text-slate-500">
                        {r.createdAt ? new Date(r.createdAt).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" }) : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 flex-shrink-0">
                    {Array.from({ length: 5 }, (_, j) => (
                      <Star key={j} size={13} className={j < r.rating ? "text-amber-400 fill-amber-400" : "text-slate-700 fill-slate-700"} />
                    ))}
                  </div>
                </div>
                {r.text && (
                  <p className="text-sm text-slate-300 leading-relaxed">{r.text}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              disabled={page <= 1}
              onClick={() => load(page - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-bold text-slate-400">{page} / {pages}</span>
            <button
              disabled={page >= pages}
              onClick={() => load(page + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// ─── Before / After Gallery Section ──────────────────────────────────────────
const BeforeAfterSection = ({ gallery }) => {
  const [active, setActive] = useState(null);
  const pairs = (gallery || []).filter((p) => p.before && p.after);
  if (!pairs.length) return null;

  return (
    <section className="bg-slate-950 border-t border-slate-800/60 py-14 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-violet-400">
            <Sparkles size={11} />
            Avant / Après
          </span>
          <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl">
            Nos transformations
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            La preuve par l'image — nos résultats parlent d'eux-mêmes
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {pairs.map((pair, i) => (
            <button
              key={i}
              onClick={() => setActive(pair)}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-violet-500/40 transition-all hover:scale-[1.01] text-left"
            >
              <div className="flex h-56">
                <div className="flex-1 relative">
                  <img src={pair.before} alt="Avant" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 rounded-full bg-black/60 backdrop-blur px-2.5 py-1 text-[10px] font-black text-white/80">
                    AVANT
                  </div>
                </div>
                <div className="w-px bg-white/20" />
                <div className="flex-1 relative">
                  <img src={pair.after} alt="Après" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 right-2 rounded-full bg-violet-600/80 backdrop-blur px-2.5 py-1 text-[10px] font-black text-white">
                    APRÈS
                  </div>
                </div>
              </div>
              {pair.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-xs font-semibold text-white/90">{pair.caption}</p>
                </div>
              )}
              <div className="absolute inset-0 bg-violet-600/0 group-hover:bg-violet-600/5 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <button
            onClick={() => setActive(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <X size={18} />
          </button>
          <div className="flex max-w-3xl w-full gap-2 rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex-1 relative">
              <img src={active.before} alt="Avant" className="w-full object-cover rounded-xl" />
              <div className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur px-3 py-1 text-xs font-black text-white/80">AVANT</div>
            </div>
            <div className="flex-1 relative">
              <img src={active.after} alt="Après" className="w-full object-cover rounded-xl" />
              <div className="absolute top-3 right-3 rounded-full bg-violet-600 px-3 py-1 text-xs font-black text-white">APRÈS</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
const ProfilePreview = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Determine if this is a demo based on the URL prefix
  const isDemo = slug.startsWith("demo-");

  useEffect(() => {
    const loadWebsite = async () => {
      setLoading(true);
      if (isDemo) {
        // --- 1. DEMO MODE LOGIC (Session Storage + Safety Injection) ---
        try {
          const sessionRaw = sessionStorage.getItem("preview_mode_data");
          let demoData = sessionRaw ? JSON.parse(sessionRaw) : null;

          // CRITICAL FIX: Ensure all required sub-objects exist to prevent ".show" undefined errors
          if (!demoData) {
            const templateIdFromUrl = slug.replace("demo-", "");
            demoData = { templateId: templateIdFromUrl };
          }

          // Safety Injection: If these objects are missing in session, create them
          // This stops the "Cannot read properties of undefined (reading 'show')" crash
          const safeData = {
            ...demoData,
            templateId: demoData.templateId || slug.replace("demo-", "") || "BB_THEME_01",
            hero: demoData.hero || { title: "Demo Mode", slogan: "Previewing layout" },
            about: demoData.about || { show: true, title: "Our Story", text: "About us text..." },
            gallery: demoData.gallery || { show: true, images: [] },
            services: demoData.services || [],
            contact: demoData.contact || { phone: "", socials: {} },
            businessHours: demoData.businessHours || [],
            ownerId: demoData.ownerId || { businessName: "Professional", ville: "" }
          };

          setData(safeData);
        } catch (err) {
          console.error("Demo data parse error", err);
        }
        setLoading(false);
      } else {
        // --- 2. LIVE MODE LOGIC (Backend API) ---
        try {
          const res = await API.get(`/public/site/${slug}`);
          if (res.data.success) {
            // Even with live data, we merge with defaults to be 100% safe
            const liveData = res.data.data;
            const safeLiveData = {
              ...liveData,
              hero:                liveData.hero                || {},
              about:               liveData.about               || { show: false },
              gallery:             liveData.gallery             || { show: false, images: [] },
              presentationReel:    liveData.presentationReel    || { show: false, videoUrl: '' },
              beforeAfterGallery:  liveData.beforeAfterGallery  || [],
              reviews:             liveData.reviews             || [],
              rating:              liveData.rating              ?? null,
              reviewCount:         liveData.reviewCount         ?? 0,
              completedCount:      liveData.completedCount      ?? 0,
              uniqueClients:       liveData.uniqueClients       ?? 0,
              cancellationRate:    liveData.cancellationRate    ?? 0,
              avgResponseHours:    liveData.avgResponseHours    ?? null,
            };
            setData(safeLiveData);
          }
        } catch (err) {
          console.error("Error loading live site:", err);
          setData(null);
        } finally {
          setLoading(false);
        }
      }
    };

    loadWebsite();
  }, [slug, isDemo]);

  /**
   * NAVIGATION LOGIC:
   * 1. If Demo/Owner -> Go back to Theme Gallery
   * 2. If Public Visitor -> Go back to Professionals Discovery Page
   */
  const handleExitPreview = () => {
    if (isDemo) {
      navigate("/owner/dashboard/themes");
    } else {
      navigate("/professionals");
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-[#0f1115] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
          Launching Engine...
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-10 text-center">
        <h1 className="text-6xl font-black mb-4 tracking-tighter text-indigo-500">404</h1>
        <p className="text-slate-400 font-medium mb-8">
          This professional space hasn't been published yet or the link is invalid.
        </p>
        <button 
          onClick={() => navigate("/professionals")}
          className="px-6 py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition-all"
        >
          Return to Discovery
        </button>
      </div>
    );
  }

  // 🛡️ UPDATED: Safely find the theme. Case-insensitivity is now handled inside getThemeById.
  const themeConfig = getThemeById(data.templateId) || getThemeById("BB_THEME_01");
  
  if (!themeConfig) {
    return (
      <div className="h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="p-8 bg-red-500/20 border border-red-500 rounded-2xl text-center">
          <p className="font-black uppercase tracking-widest text-red-500">Registry Error</p>
          <p className="text-sm opacity-80">Theme ID "{data.templateId}" not found in system.</p>
        </div>
      </div>
    );
  }

  const SelectedTheme = themeConfig.component;

  // Build a displayable address from localization fields or contact.address
  const loc = data.setupConfig?.localization || {};
  const addressParts = [loc.address, loc.city, loc.country].filter(Boolean);
  const fullAddress = addressParts.length > 0 ? addressParts.join(", ") : (data.contact?.address || "");
  const mapsQuery = encodeURIComponent(fullAddress);

  return (
    <div className="flex flex-col min-h-screen bg-black">

      {/* --- TOP BRANDING BAR --- */}
      {/* You can re-enable your top bar here if you want it visible on public profiles */}

      {/* --- THE ACTUAL THEME INJECTION --- */}
      <main className="flex-grow">
        <SelectedTheme data={data} />
      </main>

      {/* --- PRESENTATION REEL --- */}
      {data.presentationReel?.show && data.presentationReel?.videoUrl && (
        <PresentationReelSection reel={data.presentationReel} />
      )}

      {/* --- BEFORE / AFTER GALLERY --- */}
      {!isDemo && (
        <BeforeAfterSection gallery={data.beforeAfterGallery} />
      )}

      {/* --- TRUST SIGNALS --- */}
      {!isDemo && (
        <TrustSignalsSection data={data} />
      )}

      {/* --- REVIEWS --- */}
      {!isDemo && data.ownerId?._id && (
        <ReviewsSection
          ownerId={String(data.ownerId._id)}
          initialReviews={data.reviews}
          initialRating={data.rating}
          initialCount={data.reviewCount}
        />
      )}

      {/* --- LOCATION / GOOGLE MAPS SECTION --- */}
      {!isDemo && fullAddress && (
        <section className="bg-slate-900 border-t border-slate-800 py-10 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <MapPin size={16} className="text-rose-400" />
              </div>
              <div>
                <p className="text-white font-black text-base">Find Us</p>
                <p className="text-slate-400 text-xs font-medium">{fullAddress}</p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noreferrer"
                className="ml-auto flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 hover:bg-rose-500/20 transition-all font-bold text-sm"
              >
                <Navigation size={14} />
                Get Directions
              </a>
            </div>
            <div className="w-full rounded-2xl overflow-hidden border border-slate-700" style={{ height: 320 }}>
              <iframe
                title="Business Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${mapsQuery}&output=embed`}
              />
            </div>
          </div>
        </section>
      )}

      {/* --- BOTTOM FLOATING BRANDING (Only for Public Views) --- */}
      {!isDemo && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-fit px-4">
          <a 
            href="https://bookiify.vercel.app/login" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full hover:bg-black/80 transition-all group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="p-2 bg-amber-600 rounded-lg text-white group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/20">
              <Globe size={14} />
            </div>
            <div className="pr-2 text-left">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Create your own</p>
              <p className="text-[10px] font-black text-white uppercase tracking-tighter leading-none">Powered by Bookiify</p>
            </div>
          </a>
        </div>
      )}

    </div>
  );
};

export default ProfilePreview;