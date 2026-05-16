import React, { useEffect, useRef } from 'react';
import {
  BookOpen, Star, ShieldCheck, CreditCard, MessageSquare,
  Users, AlertCircle, X, CheckCheck,
} from 'lucide-react';

const TYPE_META = {
  booking:     { icon: BookOpen,      bg: 'from-indigo-600 to-violet-600',  ring: 'ring-indigo-500/30' },
  application: { icon: Users,         bg: 'from-violet-600 to-purple-700',  ring: 'ring-violet-500/30' },
  review:      { icon: Star,          bg: 'from-amber-500 to-orange-600',   ring: 'ring-amber-500/30'  },
  payment:     { icon: CreditCard,    bg: 'from-emerald-500 to-teal-600',   ring: 'ring-emerald-500/30'},
  chat:        { icon: MessageSquare, bg: 'from-sky-500 to-blue-600',       ring: 'ring-sky-500/30'    },
  staff:       { icon: Users,         bg: 'from-teal-500 to-cyan-600',      ring: 'ring-teal-500/30'   },
  system:      { icon: ShieldCheck,   bg: 'from-slate-600 to-slate-700',    ring: 'ring-slate-500/30'  },
  customer:    { icon: Users,         bg: 'from-rose-500 to-pink-600',      ring: 'ring-rose-500/30'   },
  default:     { icon: AlertCircle,   bg: 'from-slate-600 to-slate-700',    ring: 'ring-slate-500/30'  },
};

/* Individual toast */
function Toast({ toast, onDismiss }) {
  const meta = TYPE_META[toast.type] || TYPE_META.default;
  const Icon = meta.icon;
  const progressRef = useRef(null);

  useEffect(() => {
    if (!progressRef.current) return;
    const el = progressRef.current;
    el.style.transition = 'none';
    el.style.width = '100%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = `width ${toast.duration || 5000}ms linear`;
        el.style.width = '0%';
      });
    });
  }, [toast.duration]);

  return (
    <div
      className={`
        relative w-80 bg-[#0d1117] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/50
        overflow-hidden ring-1 ${meta.ring}
        animate-in slide-in-from-right-4 fade-in duration-300
      `}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-800">
        <div ref={progressRef} className={`h-full bg-gradient-to-r ${meta.bg} w-full`} />
      </div>

      <div className="flex gap-3 p-4">
        {/* Icon */}
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${meta.bg} flex items-center justify-center flex-shrink-0 shadow-lg`}>
          <Icon size={16} className="text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-1">
          <p className="text-sm font-black text-white leading-tight truncate">{toast.title}</p>
          {toast.body && (
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed line-clamp-2">{toast.body}</p>
          )}
        </div>

        {/* Dismiss */}
        <button
          onClick={() => onDismiss(toast.id)}
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-600 hover:text-white transition-all flex-shrink-0 self-start"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}

/* Toast stack — rendered at bottom-right */
export default function NotificationToast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 items-end pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto">
          <Toast toast={t} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
}
