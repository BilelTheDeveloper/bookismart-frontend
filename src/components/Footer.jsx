import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  MapPin, Mail, ShieldCheck, FileText, Users,
  LayoutGrid, HelpCircle, Clock, ArrowRight,
  Lock, CheckCircle2,
} from "lucide-react";

/* ── Social icon SVG ── */
function SocialIcon({ href, label, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all duration-200 group">
      {children}
    </a>
  );
}

/* ── Footer link ── */
function FLink({ to, icon: Icon, children }) {
  return (
    <li>
      <Link to={to}
        className="group flex items-center gap-2.5 text-slate-400 hover:text-white font-medium text-sm transition-colors duration-200">
        {Icon && <Icon size={13} className="text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0" />}
        <span>{children}</span>
      </Link>
    </li>
  );
}

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">

      {/* Top gradient accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-600 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-indigo-600/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-violet-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 xl:px-10">

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-10 py-16 sm:py-20 border-b border-white/[0.06]">

          {/* ── COLUMN 1: BRAND ── */}
          <div className="space-y-6 lg:pr-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-900/40 transition-transform group-hover:scale-105">
                <span className="text-xl font-black italic text-white">B</span>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950" />
              </div>
              <div>
                <p className="text-xl font-black tracking-tight">Book<span className="text-indigo-500">iify</span></p>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 mt-0.5">Professional Suite</p>
              </div>
            </Link>

            <p className="text-slate-400 font-medium leading-relaxed text-sm max-w-xs">
              {t("footer.tagline")}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              <SocialIcon href="https://facebook.com" label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://instagram.com" label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://linkedin.com" label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://twitter.com" label="X / Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.07] text-[10px] font-black uppercase tracking-wider text-slate-500">
                <ShieldCheck size={11} className="text-emerald-500" /> KYC Verified
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.07] text-[10px] font-black uppercase tracking-wider text-slate-500">
                <Lock size={11} className="text-indigo-400" /> SSL + 2FA
              </div>
            </div>
          </div>

          {/* ── COLUMN 2: PLATFORM ── */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 flex items-center gap-2">
              <span className="h-px w-4 bg-indigo-600" />
              {t("footer.platform")}
            </h4>
            <ul className="space-y-3.5">
              <FLink to="/professionals" icon={LayoutGrid}>{t("footer.links.browse")}</FLink>
              <FLink to="/signup"        icon={Users}      >{t("footer.links.professionals")}</FLink>
              <FLink to="/services"      icon={Clock}      >{t("footer.links.waiting")}</FLink>
              <FLink to="/how-it-works"  icon={HelpCircle} >{t("footer.links.help")}</FLink>
            </ul>

            <div className="pt-4 border-t border-white/[0.06]">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 mb-3">Quick Access</p>
              <div className="flex flex-col gap-2">
                <Link to="/login"  className="text-xs font-bold text-slate-500 hover:text-white transition-colors">→ Login to Dashboard</Link>
                <Link to="/signup" className="text-xs font-bold text-slate-500 hover:text-white transition-colors">→ Start Free Trial</Link>
                <Link to="/find-work" className="text-xs font-bold text-slate-500 hover:text-white transition-colors">→ Find Work in Tunisia</Link>
              </div>
            </div>
          </div>

          {/* ── COLUMN 3: SECURITY & LEGAL ── */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 flex items-center gap-2">
              <span className="h-px w-4 bg-indigo-600" />
              {t("footer.security")}
            </h4>
            <ul className="space-y-3.5">
              <FLink to="/how-it-works" icon={ShieldCheck}>{t("footer.securityLinks.shield")}</FLink>
              <FLink to="/privacy-policy" icon={FileText}>{t("footer.securityLinks.privacy")}</FLink>
              <FLink to="/terms"         icon={FileText}>{t("footer.securityLinks.terms")}</FLink>
              <FLink to="/professionals" icon={CheckCircle2}>{t("footer.securityLinks.partners")}</FLink>
            </ul>

            <div className="pt-4 border-t border-white/[0.06]">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <ShieldCheck size={13} className="text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-wider text-slate-500">Enterprise Security</p>
                    <p className="text-[10px] font-bold text-slate-400">Redis + Fingerprint + 2FA</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <Lock size={13} className="text-indigo-400 flex-shrink-0" />
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-wider text-slate-500">Data Protection</p>
                    <p className="text-[10px] font-bold text-slate-400">GDPR-aligned · Tunisia Law</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── COLUMN 4: NEWSLETTER + CONTACT ── */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 flex items-center gap-2">
              <span className="h-px w-4 bg-indigo-600" />
              {t("footer.newsletter")}
            </h4>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              Get product updates, tips, and Bookiify news delivered to your inbox.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-900/20 border border-emerald-800/40"
              >
                <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                <p className="text-sm font-bold text-emerald-400">You're subscribed!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t("footer.emailPlaceholder")}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-4 pr-24 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                  required
                />
                <button type="submit"
                  className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 rounded-xl font-black text-[11px] uppercase tracking-wider transition-colors">
                  {t("footer.joinBtn")}
                </button>
              </form>
            )}

            {/* Contact info */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <MapPin size={14} className="text-indigo-500 flex-shrink-0" />
                <span className="font-medium">{t("footer.location")}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Mail size={14} className="text-indigo-500 flex-shrink-0" />
                <a href="mailto:support@bookiify.com" className="font-medium hover:text-white transition-colors">
                  support@bookiify.com
                </a>
              </div>
            </div>

            {/* Powered by */}
            <div className="flex items-center gap-2 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center gap-2">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-600">{t("footer.poweredBy")}</span>
                <span className="text-xs font-black text-cyan-400">Render.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="py-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-600 text-xs font-bold">
            {t("footer.copyright", { year })}
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link to="/privacy-policy" className="text-[11px] text-slate-600 hover:text-slate-400 font-bold transition-colors">
              {t("footer.securityLinks.privacy")}
            </Link>
            <Link to="/terms" className="text-[11px] text-slate-600 hover:text-slate-400 font-bold transition-colors">
              {t("footer.securityLinks.terms")}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">
              {t("footer.securityVer")}
            </span>
            <div className="h-3 w-px bg-slate-800" />
            <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">
              {t("footer.saasVer")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
