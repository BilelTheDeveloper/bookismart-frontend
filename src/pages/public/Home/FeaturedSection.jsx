import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Calendar, Globe, Award, Zap, Shield, Sparkles } from "lucide-react";
import API from "../../../api/config";

const FEATURED_CATEGORIES = [
  { key: "Beauty & Barbers",  emoji: "✂️",  color: "from-rose-500 to-pink-600",    bg: "bg-rose-50",   border: "border-rose-100",   text: "text-rose-700" },
  { key: "Health & Medical",  emoji: "🏥",  color: "from-blue-500 to-cyan-600",    bg: "bg-blue-50",   border: "border-blue-100",   text: "text-blue-700" },
  { key: "Fitness & Gyms",    emoji: "🏋️",  color: "from-emerald-500 to-teal-600", bg: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-700" },
];

const renderStars = (rating) =>
  Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={11}
      className={i < Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}
    />
  ));

const FeaturedCard = ({ site, catMeta, index }) => {
  const isHighlyTrusted = site.completedCount >= 10 && (site.cancellationRate ?? 100) < 15;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-lg shadow-slate-200/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-300/50"
    >
      {/* Cover image */}
      <div className="relative h-44 overflow-hidden sm:h-48">
        <img
          src={
            site.hero?.backgroundImage ||
            `https://placehold.co/800x400/e2e8f0/94a3b8?text=${encodeURIComponent(site.ownerId?.businessName || "Business")}`
          }
          alt={site.ownerId?.businessName}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />

        {/* Category badge */}
        <div className="absolute left-3 top-3">
          <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-black backdrop-blur-sm bg-white/90 ${catMeta.border} ${catMeta.text}`}>
            <span>{catMeta.emoji}</span>
            <span>{catMeta.key}</span>
          </span>
        </div>

        {/* Trust badges */}
        <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
          {isHighlyTrusted && (
            <div className="flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-black text-amber-950 shadow-lg">
              <Award size={9} /> Top Pro
            </div>
          )}
        </div>

        {/* Bottom: avatar + name */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end gap-2.5 p-3">
          {site.ownerId?.profilePicUrl ? (
            <img
              src={site.ownerId.profilePicUrl}
              alt={site.ownerId.fullName}
              className="h-10 w-10 flex-shrink-0 rounded-2xl border-2 border-white/30 object-cover shadow-lg ring-2 ring-white/10"
            />
          ) : (
            <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${catMeta.color} text-sm font-black text-white shadow-lg`}>
              {(site.ownerId?.businessName || "B")[0].toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <h3 className="truncate text-sm font-black text-white">{site.ownerId?.businessName || site.ownerId?.fullName}</h3>
              <Shield size={10} className="shrink-0 text-emerald-400" />
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={9} className="text-white/50" />
              <span className="text-[10px] font-medium text-white/60">{site.ownerId?.ville}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Rating row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {site.rating ? (
              <>
                <span className="flex gap-0.5">{renderStars(site.rating)}</span>
                <span className="text-xs font-black text-slate-800">{site.rating.toFixed(1)}</span>
                <span className="text-[10px] text-slate-400">({site.reviewCount} reviews)</span>
              </>
            ) : (
              <span className="text-[11px] italic text-slate-400">No reviews yet</span>
            )}
          </div>
          <div className="flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
            <Zap size={9} /> Instant
          </div>
        </div>

        {/* Top services */}
        {(site.services || []).filter((s) => s.active !== false).slice(0, 2).length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {(site.services || [])
              .filter((s) => s.active !== false)
              .slice(0, 2)
              .map((svc, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-100 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600"
                >
                  {svc.title}
                  {svc.price && <span className="font-bold text-indigo-500">{svc.price} TND</span>}
                </span>
              ))}
          </div>
        )}

        <div className="flex-1" />

        {/* CTA */}
        <div className="flex gap-2">
          <Link
            to={`/book/${site.ownerId?._id}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2.5 text-xs font-black text-white shadow-md shadow-indigo-200 transition-all hover:bg-indigo-500 active:scale-95"
          >
            <Calendar size={12} /> Book Now
          </Link>
          <Link
            to={`/p/${site.slug}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50 active:scale-95"
          >
            <Globe size={12} /> Profile
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

const SkeletonCard = () => (
  <div className="overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-lg animate-pulse">
    <div className="h-44 bg-slate-200 sm:h-48" />
    <div className="space-y-3 p-4">
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-3 w-3 rounded-full bg-slate-200" />
        ))}
      </div>
      <div className="flex gap-2">
        <div className="h-6 w-20 rounded-lg bg-slate-200" />
        <div className="h-6 w-24 rounded-lg bg-slate-200" />
      </div>
      <div className="flex gap-2">
        <div className="h-9 flex-1 rounded-xl bg-slate-200" />
        <div className="h-9 flex-1 rounded-xl bg-slate-200" />
      </div>
    </div>
  </div>
);

const FeaturedSection = () => {
  const [featured, setFeatured] = useState([null, null, null]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const results = await Promise.allSettled(
          FEATURED_CATEGORIES.map((cat) =>
            API.get(`/public/discovery?sort=rating&category=${encodeURIComponent(cat.key)}`)
          )
        );
        const mapped = results.map((res) => {
          if (res.status === "fulfilled" && res.value.data?.success) {
            return res.value.data.data[0] || null;
          }
          return null;
        });
        setFeatured(mapped);
      } catch {
        setFeatured([null, null, null]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const hasAnyData = featured.some(Boolean);

  return (
    <section className="relative bg-white py-14 sm:py-16 md:py-20">
      {/* Subtle top divider glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center md:mb-10"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100">
                <Sparkles size={14} className="text-amber-500" />
              </span>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-600">Featured Professionals</span>
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Top Rated &amp; Most{" "}
              <span className="text-indigo-600">Trusted</span>
            </h2>
            <p className="mt-1.5 text-sm font-medium text-slate-500">
              Verified professionals with the highest ratings across top categories.
            </p>
          </div>
          <Link
            to="/professionals"
            className="shrink-0 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
          >
            View All →
          </Link>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {loading
            ? Array.from({ length: 3 }, (_, i) => <SkeletonCard key={i} />)
            : FEATURED_CATEGORIES.map((catMeta, i) =>
                featured[i] ? (
                  <FeaturedCard key={catMeta.key} site={featured[i]} catMeta={catMeta} index={i} />
                ) : (
                  /* Placeholder card when no real data yet */
                  <motion.div
                    key={catMeta.key}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.1 }}
                    className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 text-center"
                  >
                    <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${catMeta.color} text-3xl text-white shadow-lg`}>
                      {catMeta.emoji}
                    </div>
                    <h3 className="mt-4 text-base font-black text-slate-800">{catMeta.key}</h3>
                    <p className="mt-2 text-sm text-slate-500">Be the first top-rated professional in this category.</p>
                    <Link
                      to="/signup"
                      className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-black text-white shadow-md shadow-indigo-200 transition-all hover:bg-indigo-500"
                    >
                      Join Free
                    </Link>
                  </motion.div>
                )
              )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
