import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/config';
import {
  Search, LayoutDashboard, CalendarCheck, Users, Wallet, BarChart3,
  Settings, CreditCard, Star, Briefcase, FileText, Palette, Power,
  MessageSquare, ArrowRight, Clock, CheckCircle2, X, User,
  Loader2, Hash, Zap, ChevronRight,
} from 'lucide-react';

/* ── Static navigation items ── */
const NAV_ITEMS = [
  { id: 'nav-overview',     label: 'Overview',      sub: 'Dashboard',    icon: LayoutDashboard, path: '/owner/dashboard',                  group: 'Navigation' },
  { id: 'nav-bookings',     label: 'Appointments',  sub: 'Management',   icon: CalendarCheck,   path: '/owner/dashboard/bookings',          group: 'Navigation' },
  { id: 'nav-customers',    label: 'Customers',     sub: 'Management',   icon: Users,           path: '/owner/dashboard/customers',         group: 'Navigation' },
  { id: 'nav-staff',        label: 'Staff',         sub: 'Management',   icon: Users,           path: '/owner/dashboard/staff',             group: 'Navigation' },
  { id: 'nav-chat',         label: 'Chat',          sub: 'Management',   icon: MessageSquare,   path: '/owner/dashboard/chat',              group: 'Navigation' },
  { id: 'nav-recruitment',  label: 'Recruitment',   sub: 'Management',   icon: Briefcase,       path: '/owner/dashboard/recruitment',       group: 'Navigation' },
  { id: 'nav-finance',      label: 'Financials',    sub: 'Finance',      icon: Wallet,          path: '/owner/dashboard/finance',           group: 'Navigation' },
  { id: 'nav-invoices',     label: 'Invoices',      sub: 'Finance',      icon: FileText,        path: '/owner/dashboard/invoices',          group: 'Navigation' },
  { id: 'nav-loyalty',      label: 'Loyalty',       sub: 'Finance',      icon: Star,            path: '/owner/dashboard/loyalty',           group: 'Navigation' },
  { id: 'nav-analytics',    label: 'Analytics',     sub: 'Growth',       icon: BarChart3,       path: '/owner/dashboard/stats',             group: 'Navigation' },
  { id: 'nav-website',      label: 'Website',       sub: 'Growth',       icon: Palette,         path: '/owner/dashboard/themes',            group: 'Navigation' },
  { id: 'nav-billing',      label: 'Subscription',  sub: 'Account',      icon: CreditCard,      path: '/owner/dashboard/billing',           group: 'Navigation' },
  { id: 'nav-settings',     label: 'Settings',      sub: 'Account',      icon: Settings,        path: '/owner/dashboard/settings',          group: 'Navigation' },
  { id: 'nav-workmode',     label: 'Work Mode',     sub: 'Quick Access', icon: Power,           path: '/owner/dashboard/work-mode',         group: 'Navigation' },
];

const STATUS_COLORS = {
  pending:   'text-amber-400',
  confirmed: 'text-emerald-400',
  completed: 'text-indigo-400',
  cancelled: 'text-rose-400',
  'no-show': 'text-slate-400',
};

const RECENT_KEY = 'cmd_recent';
const MAX_RECENT = 5;

function saveRecent(item) {
  try {
    const prev = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    const next = [item, ...prev.filter(r => r.id !== item.id)].slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {}
}

function getRecent() {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); } catch { return []; }
}

/* ── Result row ── */
function ResultRow({ item, active, onSelect }) {
  const ref = useRef(null);
  useEffect(() => {
    if (active && ref.current) ref.current.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const Icon = item.icon || Hash;

  return (
    <button
      ref={ref}
      onMouseDown={(e) => { e.preventDefault(); onSelect(item); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left group ${
        active
          ? 'bg-indigo-600 text-white'
          : 'hover:bg-slate-800/60 text-slate-300'
      }`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
        active ? 'bg-white/15' : 'bg-slate-800 group-hover:bg-slate-700'
      }`}>
        <Icon size={15} className={active ? 'text-white' : 'text-slate-400'} />
      </div>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold truncate ${active ? 'text-white' : 'text-slate-200'}`}>
          {item.label}
        </p>
        {item.sub && (
          <p className={`text-[11px] truncate ${active ? 'text-indigo-200' : 'text-slate-500'}`}>
            {item.sub}
          </p>
        )}
      </div>

      {item.badge && (
        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${
          active ? 'bg-white/20 text-white' : `${STATUS_COLORS[item.badge] || 'text-slate-400'} bg-slate-800`
        }`}>
          {item.badge}
        </span>
      )}

      <ChevronRight size={13} className={`flex-shrink-0 transition-opacity ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`} />
    </button>
  );
}

/* ── Group label ── */
function GroupLabel({ label }) {
  return (
    <div className="px-4 pt-4 pb-1">
      <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">{label}</p>
    </div>
  );
}

export default function CommandPalette({ open, onClose }) {
  const navigate   = useNavigate();
  const inputRef   = useRef(null);
  const [query, setQuery]         = useState('');
  const [results, setResults]     = useState({ bookings: [], customers: [], staff: [] });
  const [searching, setSearching] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [recent, setRecent]       = useState([]);
  const searchTimer = useRef(null);

  /* Load recent on open */
  useEffect(() => {
    if (open) {
      setQuery('');
      setResults({ bookings: [], customers: [], staff: [] });
      setActiveIdx(0);
      setRecent(getRecent());
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  /* Search debounce */
  useEffect(() => {
    clearTimeout(searchTimer.current);
    if (!query.trim() || query.trim().length < 2) {
      setResults({ bookings: [], customers: [], staff: [] });
      setSearching(false);
      return;
    }
    setSearching(true);
    searchTimer.current = setTimeout(async () => {
      try {
        const { data } = await API.get(`/merchant/search?q=${encodeURIComponent(query.trim())}`);
        if (data.success) setResults(data.results);
      } catch {}
      finally { setSearching(false); }
    }, 250);
    return () => clearTimeout(searchTimer.current);
  }, [query]);

  /* Build flat list for keyboard nav */
  const allItems = useCallback(() => {
    const items = [];

    if (!query.trim()) {
      // Show recent + filtered nav
      if (recent.length) recent.forEach(r => items.push({ ...r, group: 'Recent' }));
      NAV_ITEMS.slice(0, 6).forEach(n => items.push(n));
      return items;
    }

    // Filter nav items
    const q = query.toLowerCase();
    const matchedNav = NAV_ITEMS.filter(n =>
      n.label.toLowerCase().includes(q) || n.sub?.toLowerCase().includes(q)
    );
    matchedNav.forEach(n => items.push(n));

    // Dynamic results
    results.bookings.forEach(b => items.push({
      id: `booking-${b._id}`,
      label: b.customerName,
      sub: `${b.service?.title || 'Appointment'} · ${b.dateString}`,
      badge: b.status,
      icon: CalendarCheck,
      path: `/owner/dashboard/bookings`,
      group: 'Appointments',
    }));

    results.customers.forEach(c => items.push({
      id: `customer-${c._id}`,
      label: c.name,
      sub: c.email,
      icon: User,
      path: `/owner/dashboard/customers`,
      group: 'Customers',
    }));

    results.staff.forEach(s => items.push({
      id: `staff-${s._id}`,
      label: s.name,
      sub: `${s.role} · ${s.email}`,
      icon: Users,
      path: `/owner/dashboard/staff`,
      group: 'Staff',
    }));

    return items;
  }, [query, results, recent]);

  const flat = allItems();

  /* Keyboard navigation */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, flat.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
      if (e.key === 'Enter' && flat[activeIdx]) handleSelect(flat[activeIdx]);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, flat, activeIdx]);

  useEffect(() => { setActiveIdx(0); }, [query]);

  const handleSelect = (item) => {
    if (item.path) {
      saveRecent({ id: item.id, label: item.label, sub: item.sub, icon: item.icon, path: item.path, group: 'Recent' });
      navigate(item.path);
    }
    onClose();
  };

  if (!open) return null;

  /* Group flat items */
  const grouped = [];
  let lastGroup = null;
  flat.forEach((item, idx) => {
    if (item.group !== lastGroup) {
      grouped.push({ type: 'label', label: item.group, key: `lbl-${item.group}` });
      lastGroup = item.group;
    }
    grouped.push({ type: 'item', item, idx, key: item.id || idx });
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onMouseDown={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-2xl bg-[#0d1117] border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden flex flex-col"
        style={{ maxHeight: '72vh' }}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800">
          {searching
            ? <Loader2 size={18} className="text-indigo-400 animate-spin flex-shrink-0" />
            : <Search size={18} className="text-slate-500 flex-shrink-0" />
          }
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search pages, customers, appointments…"
            className="flex-1 bg-transparent text-white placeholder-slate-600 text-sm font-medium outline-none"
          />
          <div className="flex items-center gap-2 flex-shrink-0">
            {query && (
              <button onClick={() => setQuery('')} className="p-1 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-all">
                <X size={14} />
              </button>
            )}
            <kbd className="px-2 py-1 bg-slate-800 border border-slate-700 text-slate-500 text-[10px] font-bold rounded-md">ESC</kbd>
          </div>
        </div>

        {/* Results */}
        <div className="overflow-y-auto flex-1 py-2 px-2" style={{ scrollbarWidth: 'none' }}>
          {flat.length === 0 && query.trim().length >= 2 && !searching ? (
            <div className="py-14 text-center">
              <Search size={28} className="text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500 font-bold text-sm">No results for "{query}"</p>
              <p className="text-slate-700 text-xs mt-1">Try a customer name, service, or page</p>
            </div>
          ) : (
            grouped.map(entry =>
              entry.type === 'label'
                ? <GroupLabel key={entry.key} label={entry.label} />
                : <ResultRow
                    key={entry.key}
                    item={entry.item}
                    active={entry.idx === activeIdx}
                    onSelect={handleSelect}
                  />
            )
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800 bg-slate-900/40">
          <div className="flex items-center gap-4 text-[10px] text-slate-600 font-bold">
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-500">↑</kbd><kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-500">↓</kbd> Navigate</span>
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-500">↵</kbd> Open</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-700 font-bold">
            <Zap size={10} className="text-indigo-600" />
            Bookiify Command
          </div>
        </div>
      </div>
    </div>
  );
}
