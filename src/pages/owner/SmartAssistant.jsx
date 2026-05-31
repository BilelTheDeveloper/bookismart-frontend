import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/config';
import {
  Sparkles, Loader2, TrendingUp, Users, CalendarCheck, BarChart3,
  DollarSign, AlertTriangle, Clock, ArrowRight, RefreshCw, Target,
  ChevronUp, ChevronDown, CheckCircle2, XCircle, Zap, Star,
} from 'lucide-react';

// ─── Question catalog ─────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    key: 'performance',
    label: 'Performance',
    color: 'indigo',
    icon: TrendingUp,
    questions: [
      { id: 'busiest_day',      label: 'What is my busiest day of the week?',      icon: CalendarCheck },
      { id: 'busiest_hour',     label: 'What is my peak booking hour?',             icon: Clock         },
      { id: 'success_rate',     label: 'What is my success rate this month?',       icon: Target        },
      { id: 'month_comparison', label: 'How did this month compare to last month?', icon: TrendingUp    },
    ],
  },
  {
    key: 'services',
    label: 'Services',
    color: 'violet',
    icon: Star,
    questions: [
      { id: 'top_services',       label: 'Which service is most popular?',           icon: Star          },
      { id: 'revenue_by_service', label: 'Which service makes me the most revenue?', icon: DollarSign    },
    ],
  },
  {
    key: 'clients',
    label: 'Clients',
    color: 'emerald',
    icon: Users,
    questions: [
      { id: 'top_clients',       label: 'Who are my most loyal clients?',          icon: Users         },
      { id: 'inactive_clients',  label: 'How many inactive clients do I have?',    icon: AlertTriangle },
      { id: 'new_clients_month', label: 'How many new clients joined this month?', icon: Users         },
      { id: 'avg_ticket',        label: 'What is my average revenue per client?',  icon: DollarSign    },
    ],
  },
  {
    key: 'operations',
    label: 'Operations',
    color: 'amber',
    icon: BarChart3,
    questions: [
      { id: 'no_shows',          label: 'How many no-shows did I have this month?', icon: XCircle       },
      { id: 'cancellation_rate', label: 'What is my cancellation rate?',            icon: AlertTriangle },
    ],
  },
];

const COLOR_MAP = {
  indigo:  { bg: 'bg-indigo-500/10',  border: 'border-indigo-500/20',  text: 'text-indigo-400',  fill: 'bg-indigo-500'  },
  violet:  { bg: 'bg-violet-500/10',  border: 'border-violet-500/20',  text: 'text-violet-400',  fill: 'bg-violet-500'  },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', fill: 'bg-emerald-500' },
  amber:   { bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   text: 'text-amber-400',   fill: 'bg-amber-500'   },
  rose:    { bg: 'bg-rose-500/10',    border: 'border-rose-500/20',    text: 'text-rose-400',    fill: 'bg-rose-500'    },
  slate:   { bg: 'bg-slate-700/40',   border: 'border-slate-700/40',   text: 'text-slate-400',   fill: 'bg-slate-500'   },
};

const BAR_COLOR = {
  emerald: 'bg-emerald-400',
  rose:    'bg-rose-400',
  amber:   'bg-amber-400',
  indigo:  'bg-indigo-400',
  slate:   'bg-slate-600',
  violet:  'bg-violet-400',
};

// ─── Answer card renderer ──────────────────────────────────────────────────────

function BarRow({ label, count, max, color = 'indigo', value }) {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-300 font-medium truncate max-w-[60%]">{label}</span>
        <span className="text-slate-400 font-bold tabular-nums">{value ?? count}</span>
      </div>
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${BAR_COLOR[color] || BAR_COLOR.indigo} rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function StatPill({ label, value }) {
  return (
    <div className="flex-1 bg-slate-800/60 rounded-2xl px-4 py-3 text-center border border-slate-700/40">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-0.5">{label}</p>
      <p className="text-base font-black text-white">{value}</p>
    </div>
  );
}

function AnswerCard({ data, questionLabel, catColor }) {
  const c = COLOR_MAP[catColor] || COLOR_MAP.indigo;

  if (data.empty) {
    return (
      <div className="bg-slate-800/60 rounded-3xl border border-slate-700/40 p-6 text-center">
        <p className="text-slate-400 text-sm font-semibold">Not enough data yet.</p>
        <p className="text-slate-500 text-xs mt-1">Start collecting bookings to unlock this insight.</p>
      </div>
    );
  }

  return (
    <div className={`rounded-3xl border ${c.border} bg-slate-900 overflow-hidden`}>
      {/* Headline */}
      <div className={`${c.bg} px-6 py-5 border-b border-white/5`}>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{questionLabel}</p>
        <p className={`text-4xl font-black ${c.text} leading-none`}>{data.headline}</p>
        <p className="text-slate-400 text-sm font-medium mt-1">{data.subline}</p>
      </div>

      {/* Breakdown */}
      {data.breakdown?.length > 0 && (
        <div className="px-6 py-5 space-y-3">
          {data.breakdown.map((row, i) => (
            row.count !== undefined
              ? <BarRow
                  key={i}
                  label={row.label}
                  count={row.count}
                  max={data.max || Math.max(...data.breakdown.map(r => r.count || 0))}
                  color={row.color || catColor}
                />
              : <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-800 last:border-0">
                  <span className="text-slate-300 text-sm font-medium">{row.label}</span>
                  <span className="text-white font-black text-sm">{row.value}</span>
                </div>
          ))}
        </div>
      )}

      {/* Tip */}
      {data.tip && (
        <div className="mx-6 mb-5 flex items-start gap-2.5 bg-slate-800/60 rounded-2xl px-4 py-3 border border-slate-700/40">
          <Sparkles size={13} className={`${c.text} mt-0.5 shrink-0`} />
          <p className="text-slate-300 text-xs font-medium leading-relaxed">{data.tip}</p>
        </div>
      )}
    </div>
  );
}

// ─── Chat message types ────────────────────────────────────────────────────────

function UserBubble({ text }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-xs bg-indigo-600 text-white text-sm font-semibold px-4 py-2.5 rounded-2xl rounded-br-sm shadow-lg shadow-indigo-900/30">
        {text}
      </div>
    </div>
  );
}

function LoadingBubble() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
        <Sparkles size={14} className="text-indigo-400" />
      </div>
      <div className="bg-slate-800/80 border border-slate-700/40 rounded-2xl rounded-bl-sm px-5 py-4 flex items-center gap-2">
        <Loader2 size={14} className="text-indigo-400 animate-spin" />
        <span className="text-slate-400 text-sm font-medium">Analyzing your data…</span>
      </div>
    </div>
  );
}

function AssistantMessage({ data, questionLabel, catColor }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
        <Sparkles size={14} className="text-indigo-400" />
      </div>
      <div className="flex-1">
        <AnswerCard data={data} questionLabel={questionLabel} catColor={catColor} />
      </div>
    </div>
  );
}

// ─── Category accordion panel ──────────────────────────────────────────────────

function CategoryPanel({ cat, onAsk, loadingId }) {
  const [open, setOpen] = useState(true);
  const c = COLOR_MAP[cat.color] || COLOR_MAP.indigo;
  const Icon = cat.icon;

  return (
    <div className={`rounded-2xl border ${c.border} overflow-hidden`}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-4 py-3 ${c.bg} hover:opacity-90 transition-opacity`}
      >
        <div className="flex items-center gap-2.5">
          <Icon size={14} className={c.text} />
          <span className={`text-xs font-black uppercase tracking-widest ${c.text}`}>{cat.label}</span>
        </div>
        {open ? <ChevronUp size={14} className={c.text} /> : <ChevronDown size={14} className={c.text} />}
      </button>

      {open && (
        <div className="p-2 space-y-1">
          {cat.questions.map(q => {
            const QIcon = q.icon;
            const isLoading = loadingId === q.id;
            return (
              <button
                key={q.id}
                onClick={() => onAsk(q, cat.color)}
                disabled={isLoading}
                className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-800/60 transition-all group disabled:opacity-50"
              >
                {isLoading
                  ? <Loader2 size={13} className="text-indigo-400 animate-spin shrink-0" />
                  : <QIcon size={13} className="text-slate-500 group-hover:text-slate-300 transition-colors shrink-0" />
                }
                <span className="text-slate-300 text-xs font-semibold group-hover:text-white transition-colors leading-snug">
                  {q.label}
                </span>
                <ArrowRight size={11} className="ml-auto text-slate-700 dark:text-slate-200 group-hover:text-slate-400 transition-colors shrink-0" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

const SmartAssistant = () => {
  const { user: authUser } = useAuth();
  const businessName = authUser?.businessName || authUser?.fullName?.split(' ')[0] || 'Your Business';

  const [messages, setMessages] = useState([]);
  const [loadingId, setLoadingId]   = useState(null);
  const [quickStats, setQuickStats] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get('/merchant/smart-assistant/insights/quick_stats');
        if (res.data.success) setQuickStats(res.data.data);
      } catch {
        // silent
      }
    };
    load();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAsk = async (question, catColor) => {
    if (loadingId) return;
    setLoadingId(question.id);

    setMessages(prev => [
      ...prev,
      { type: 'user', text: question.label, id: Date.now() },
      { type: 'loading', id: Date.now() + 1 },
    ]);

    try {
      const res = await API.get(`/merchant/smart-assistant/insights/${question.id}`);
      setMessages(prev => {
        const withoutLoading = prev.filter(m => m.type !== 'loading');
        return [
          ...withoutLoading,
          {
            type: 'answer',
            data: res.data.data,
            questionLabel: question.label,
            catColor,
            id: Date.now() + 2,
          },
        ];
      });
    } catch {
      setMessages(prev => {
        const withoutLoading = prev.filter(m => m.type !== 'loading');
        return [
          ...withoutLoading,
          { type: 'error', id: Date.now() + 2 },
        ];
      });
    } finally {
      setLoadingId(null);
    }
  };

  const clearChat = () => setMessages([]);

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden">

      {/* ── Left panel: question list ── */}
      <aside className="w-72 shrink-0 flex flex-col border-r border-slate-800/60 bg-slate-900/60 overflow-y-auto">
        {/* Header */}
        <div className="px-5 pt-6 pb-5 border-b border-slate-800/60 shrink-0">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <Sparkles size={15} className="text-indigo-400" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Smart AI</p>
              <p className="text-sm font-black text-white leading-tight truncate max-w-[10rem]">{businessName}</p>
            </div>
          </div>

          {/* Quick stats strip */}
          {quickStats && (
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-800/60 rounded-xl px-3 py-2 border border-slate-700/40 text-center">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">This month</p>
                <p className="text-lg font-black text-white">{quickStats.total}</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase">bookings</p>
              </div>
              <div className="bg-slate-800/60 rounded-xl px-3 py-2 border border-slate-700/40 text-center">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Success rate</p>
                <p className={`text-lg font-black ${quickStats.successRate >= 70 ? 'text-emerald-400' : quickStats.successRate >= 40 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {quickStats.successRate}%
                </p>
                <p className="text-[9px] text-slate-500 font-bold uppercase">completed</p>
              </div>
            </div>
          )}
        </div>

        {/* Question categories */}
        <div className="flex-1 p-3 space-y-2 overflow-y-auto">
          {CATEGORIES.map(cat => (
            <CategoryPanel
              key={cat.key}
              cat={cat}
              onAsk={handleAsk}
              loadingId={loadingId}
            />
          ))}
        </div>

        {/* Clear button */}
        {messages.length > 0 && (
          <div className="px-3 pb-4 shrink-0">
            <button
              onClick={clearChat}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-700/60 text-slate-500 text-xs font-bold hover:border-slate-600 hover:text-slate-300 transition-all"
            >
              <RefreshCw size={12} /> Clear conversation
            </button>
          </div>
        )}
      </aside>

      {/* ── Right panel: chat area ── */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="px-6 py-4 border-b border-slate-800/60 bg-slate-900/40 flex items-center gap-3 shrink-0">
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <p className="text-sm font-black text-white">Smart {businessName}</p>
          <div className="ml-auto flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1">
            <Zap size={11} className="text-indigo-400" />
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
              {CATEGORIES.reduce((s, c) => s + c.questions.length, 0)} insights
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto">
              <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5">
                <Sparkles size={32} className="text-indigo-400" />
              </div>
              <h2 className="text-xl font-black text-white mb-2">Smart {businessName}</h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">
                Your personal business intelligence assistant. Choose a question from the left panel to get instant insights powered by your real data.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['busiest_day', 'success_rate', 'top_services', 'inactive_clients'].map(id => {
                  const allQs = CATEGORIES.flatMap(c => c.questions.map(q => ({ ...q, catColor: c.color })));
                  const q = allQs.find(x => x.id === id);
                  if (!q) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => handleAsk(q, q.catColor)}
                      disabled={!!loadingId}
                      className="text-xs font-semibold px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:border-indigo-500/40 hover:text-white transition-all disabled:opacity-40"
                    >
                      {q.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {messages.map(msg => {
                if (msg.type === 'user')    return <UserBubble key={msg.id} text={msg.text} />;
                if (msg.type === 'loading') return <LoadingBubble key={msg.id} />;
                if (msg.type === 'error')   return (
                  <div key={msg.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center shrink-0">
                      <XCircle size={14} className="text-rose-400" />
                    </div>
                    <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl rounded-bl-sm px-4 py-3">
                      <p className="text-rose-300 text-sm font-semibold">Couldn't load data. Try again.</p>
                    </div>
                  </div>
                );
                if (msg.type === 'answer') return (
                  <AssistantMessage key={msg.id} data={msg.data} questionLabel={msg.questionLabel} catColor={msg.catColor} />
                );
                return null;
              })}
              <div ref={bottomRef} />
            </>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-6 py-3 border-t border-slate-800/60 bg-slate-900/20 shrink-0">
          <p className="text-center text-[10px] text-slate-600 dark:text-slate-300 font-medium">
            Select a question from the left panel · Data updates in real time from your bookings
          </p>
        </div>
      </main>
    </div>
  );
};

export default SmartAssistant;
