import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  Megaphone, Send, Users, Mail, Check, Loader2, Sparkles,
  UserMinus, UserCheck, Clock, MessageCircle, CheckCircle2, XCircle,
} from "lucide-react";
import API from "../../api/config";

const SEGMENTS = [
  { id: "all",      labelKey: "marketing.segAll",      icon: Users,      hintKey: "marketing.segAllHint" },
  { id: "inactive", labelKey: "marketing.segInactive", icon: UserMinus,  hintKey: "marketing.segInactiveHint" },
  { id: "recent",   labelKey: "marketing.segRecent",   icon: UserCheck,  hintKey: "marketing.segRecentHint" },
];

const Marketing = () => {
  const { t } = useTranslation();
  const [segments, setSegments] = useState({ all: 0, inactive: 0, recent: 0 });
  const [channels, setChannels] = useState({ whatsapp: false, email: true, sms: false });
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const [segment, setSegment] = useState("all");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [useWa, setUseWa] = useState(false);
  const [useEmail, setUseEmail] = useState(true);
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [a, c] = await Promise.all([
        API.get("/merchant/marketing/audience"),
        API.get("/merchant/marketing/campaigns"),
      ]);
      setSegments(a.data.segments || {});
      setChannels(a.data.channels || {});
      setUseWa(!!a.data.channels?.whatsapp);
      setCampaigns(c.data.campaigns || []);
    } catch { toast.error(t("marketing.loadError")); }
    finally { setLoading(false); }
  }, [t]);
  useEffect(() => { load(); }, [load]);

  const send = async () => {
    if (!message.trim()) { toast.error(t("marketing.writeMessage")); return; }
    if (!useWa && !useEmail) { toast.error(t("marketing.pickChannel")); return; }
    setSending(true);
    try {
      const { data } = await API.post("/merchant/marketing/broadcast", {
        segment, subject, message, channels: { whatsapp: useWa, email: useEmail },
      });
      toast.success(t("marketing.sent", { n: data.sent }) + (data.capped ? t("marketing.capped") : ""));
      setMessage(""); setSubject("");
      load();
    } catch (e) { toast.error(e.response?.data?.message || t("marketing.broadcastFail")); }
    finally { setSending(false); }
  };

  const segCount = segments[segment] ?? 0;

  return (
    <div className="space-y-7">
      <div>
        <h1 className="flex items-center gap-2.5 text-2xl font-black text-slate-900 dark:text-white"><Megaphone className="text-indigo-600 dark:text-indigo-400" /> {t("marketing.title")}</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">{t("marketing.subtitle")}</p>
      </div>

      {/* Channel status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ChannelCard label={t("marketing.chWhatsApp")} icon={MessageCircle} on={channels.whatsapp} onHint={t("marketing.waOn")} offHint={t("marketing.waOff")} accent="emerald" />
        <ChannelCard label={t("marketing.chEmail")} icon={Mail} on={channels.email} onHint={t("marketing.emailOn")} offHint={t("marketing.emailOff")} accent="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Composer */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 space-y-5">
          <div>
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">{t("marketing.audience")}</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-2">
              {SEGMENTS.map((s) => {
                const Icon = s.icon; const active = segment === s.id;
                return (
                  <button key={s.id} onClick={() => setSegment(s.id)} className={`rounded-2xl border p-3.5 text-left transition-all ${active ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/15" : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"}`}>
                    <div className="flex items-center justify-between">
                      <Icon size={17} className={active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"} />
                      <span className={`text-lg font-black ${active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-900 dark:text-white"}`}>{loading ? "—" : (segments[s.id] ?? 0)}</span>
                    </div>
                    <p className={`text-xs font-black mt-2 ${active ? "text-indigo-700 dark:text-indigo-300" : "text-slate-700 dark:text-slate-200"}`}>{t(s.labelKey)}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{t(s.hintKey)}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">{t("marketing.emailSubject")}</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-indigo-500" placeholder={t("marketing.subjectPlaceholder")} />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">{t("marketing.message")}</label>
              <button onClick={() => setMessage((m) => m + "{name}")} className="text-[10px] font-black text-indigo-500 hover:text-indigo-400">{t("marketing.insertName")}</button>
            </div>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm font-medium text-slate-900 dark:text-white outline-none focus:border-indigo-500 resize-none" placeholder={t("marketing.messagePlaceholder")} />
            <p className="text-[11px] text-slate-400 mt-1.5">{t("marketing.nameHint")} {message.length}/1000</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Toggle label={t("marketing.chWhatsApp")} icon={MessageCircle} on={useWa} disabled={!channels.whatsapp} onClick={() => setUseWa((v) => !v)} />
            <Toggle label={t("marketing.chEmail")} icon={Mail} on={useEmail} onClick={() => setUseEmail((v) => !v)} />
          </div>

          <button onClick={send} disabled={sending} className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 font-black text-white hover:bg-indigo-500 transition-all disabled:opacity-60">
            {sending ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
            {t("marketing.sendTo", { n: segCount })}
          </button>
          {!channels.whatsapp && useWa === false && (
            <p className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1.5"><Sparkles size={12} /> {t("marketing.waTip")}</p>
          )}
        </div>

        {/* History */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6">
          <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4"><Clock size={14} /> {t("marketing.recentCampaigns")}</h3>
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-indigo-500" size={22} /></div>
          ) : campaigns.length === 0 ? (
            <p className="text-sm text-slate-400 py-8 text-center">{t("marketing.noCampaigns")}</p>
          ) : (
            <div className="space-y-3">
              {campaigns.map((c) => (
                <div key={c._id} className="rounded-2xl border border-slate-100 dark:border-slate-800 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{c.segment}</span>
                    <span className="text-[10px] text-slate-400">{new Date(c.createdAt).toLocaleDateString("en-GB")}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mt-1.5 line-clamp-2">{c.message}</p>
                  <div className="flex gap-3 mt-2 text-[11px] font-bold text-slate-400">
                    <span>👥 {c.recipientCount}</span>
                    {c.sentWhatsApp > 0 && <span className="text-emerald-500">WA {c.sentWhatsApp}</span>}
                    {c.sentEmail > 0 && <span className="text-indigo-500">✉ {c.sentEmail}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CHANNEL_ON = {
  emerald: { card: "border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10", icon: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" },
  indigo:  { card: "border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10",   icon: "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400" },
};
const ChannelCard = ({ label, icon: Icon, on, onHint, offHint, accent }) => {
  const sk = CHANNEL_ON[accent] || CHANNEL_ON.indigo;
  return (
    <div className={`flex items-center gap-4 rounded-3xl border p-5 ${on ? sk.card : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"}`}>
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${on ? sk.icon : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}><Icon size={20} /></div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-black text-slate-900 dark:text-white">{label}</p>
          {on ? <CheckCircle2 size={15} className="text-emerald-500" /> : <XCircle size={15} className="text-slate-400" />}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{on ? onHint : offHint}</p>
      </div>
    </div>
  );
};

const Toggle = ({ label, icon: Icon, on, disabled, onClick }) => (
  <button onClick={onClick} disabled={disabled} className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-black transition-all ${disabled ? "opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-700 text-slate-400" : on ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400" : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"}`}>
    <Icon size={15} /> {label} {on && !disabled && <Check size={14} />}
  </button>
);

export default Marketing;
