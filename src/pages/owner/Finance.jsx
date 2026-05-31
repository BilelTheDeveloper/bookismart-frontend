import React, { useEffect, useState, useCallback } from "react";
import {
  TrendingUp, TrendingDown, DollarSign, BarChart2, Plus, X, Download,
  Filter, ChevronDown, ArrowUpRight, ArrowDownLeft, Trash2, Edit2,
  Receipt, Percent, AlertCircle, CheckCircle2, RefreshCw
} from "lucide-react";
import API from "../../api/config";

const INCOME_CATS = [
  { value: "booking_revenue", label: "Booking Revenue" },
  { value: "online_payment",  label: "Online Payment" },
  { value: "tip",             label: "Tip / Gratuity" },
  { value: "other_income",    label: "Other Income" },
];
const EXPENSE_CATS = [
  { value: "rent",            label: "Rent / Lease" },
  { value: "salaries",        label: "Salaries & Staff" },
  { value: "tools_equipment", label: "Tools & Equipment" },
  { value: "marketing",       label: "Marketing & Ads" },
  { value: "utilities",       label: "Utilities & Bills" },
  { value: "maintenance",     label: "Maintenance" },
  { value: "supplies",        label: "Supplies & Products" },
  { value: "insurance",       label: "Insurance" },
  { value: "taxes",           label: "Taxes & Fees" },
  { value: "other_expense",   label: "Other Expense" },
];

const fmt = (n) => (n ?? 0).toLocaleString("en", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
const fmtShort = (n) => {
  const abs = Math.abs(n ?? 0);
  if (abs >= 1000) return (n / 1000).toFixed(1) + "k";
  return n?.toFixed(0) ?? "0";
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// ── Mini SVG bar chart ────────────────────────────────────────────────────────
function PLChart({ data }) {
  if (!data || !data.length) return null;
  const H = 160, W_BAR = 28, GAP = 14;
  const totalW = data.length * (W_BAR * 2 + GAP + 8);
  const maxVal = Math.max(...data.map(m => Math.max(m.income, m.expense, 1)));

  return (
    <div className="overflow-x-auto">
      <svg width={totalW} height={H + 40} className="min-w-full">
        {data.map((m, i) => {
          const x = i * (W_BAR * 2 + GAP + 8) + 4;
          const ih = (m.income / maxVal) * H;
          const eh = (m.expense / maxVal) * H;
          return (
            <g key={i}>
              {/* Income bar */}
              <rect x={x} y={H - ih} width={W_BAR} height={ih || 2} rx={5} fill="#6366f1" opacity={0.85} />
              {/* Expense bar */}
              <rect x={x + W_BAR + 4} y={H - eh} width={W_BAR} height={eh || 2} rx={5} fill="#f43f5e" opacity={0.7} />
              {/* Month label */}
              <text x={x + W_BAR + 2} y={H + 18} textAnchor="middle" fontSize={11} fill="#94a3b8" fontWeight="700">
                {m.label}
              </text>
              {/* Profit indicator dot */}
              {m.profit > 0 && (
                <circle cx={x + W_BAR + 2} cy={H - ih - 8} r={4} fill="#10b981" />
              )}
              {m.profit < 0 && (
                <circle cx={x + W_BAR + 2} cy={H - eh - 8} r={4} fill="#f43f5e" />
              )}
            </g>
          );
        })}
        {/* Baseline */}
        <line x1={0} y1={H} x2={totalW} y2={H} stroke="#e2e8f0" strokeWidth={1.5} />
      </svg>
      <div className="flex items-center gap-6 mt-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <div className="w-3 h-3 bg-indigo-500 rounded-sm" /> Income
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <div className="w-3 h-3 bg-rose-500 rounded-sm opacity-70" /> Expenses
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <div className="w-3 h-3 rounded-full bg-emerald-500" /> Profitable month
        </div>
      </div>
    </div>
  );
}

// ── Add/Edit Transaction Modal ────────────────────────────────────────────────
function TransactionModal({ onClose, onSave, editing }) {
  const [form, setForm] = useState({
    type: editing?.type || "income",
    amount: editing?.amount || "",
    category: editing?.category || "",
    description: editing?.description || "",
    notes: editing?.notes || "",
    date: editing?.date ? new Date(editing.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const cats = form.type === "income" ? INCOME_CATS : EXPENSE_CATS;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v, ...(k === "type" ? { category: "" } : {}) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || isNaN(parseFloat(form.amount)) || parseFloat(form.amount) <= 0) {
      setError("Enter a valid amount greater than 0."); return;
    }
    if (!form.category) { setError("Select a category."); return; }
    if (!form.description.trim()) { setError("Description is required."); return; }
    setError(""); setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg p-8 relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition-colors">
          <X size={22} />
        </button>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
          {editing ? "Edit Transaction" : "Add Transaction"}
        </h2>

        {/* Type Tabs */}
        <div className="flex gap-2 mb-6 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
          {["income", "expense"].map(t => (
            <button key={t} onClick={() => set("type", t)}
              className={`flex-1 py-2.5 rounded-xl font-black text-sm capitalize transition-all ${
                form.type === t
                  ? t === "income" ? "bg-indigo-600 text-white shadow-md" : "bg-rose-500 text-white shadow-md"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >{t}</button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Amount (TND)</label>
              <input type="number" step="0.001" min="0.001" value={form.amount} onChange={e => set("amount", e.target.value)}
                className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                placeholder="0.000" required />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Date</label>
              <input type="date" value={form.date} onChange={e => set("date", e.target.value)}
                className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Category</label>
            <select value={form.category} onChange={e => set("category", e.target.value)}
              className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all appearance-none bg-white dark:bg-slate-800" required>
              <option value="">Select category...</option>
              {cats.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Description</label>
            <input type="text" value={form.description} onChange={e => set("description", e.target.value)}
              className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              placeholder="e.g. Monthly rent payment" maxLength={300} required />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Notes (optional)</label>
            <textarea value={form.notes} onChange={e => set("notes", e.target.value)}
              className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all resize-none"
              placeholder="Additional details..." rows={2} maxLength={1000} />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-4 py-3 rounded-xl text-sm font-bold">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button type="submit" disabled={saving}
            className={`w-full py-4 rounded-2xl font-black text-base transition-all shadow-lg mt-2 ${
              form.type === "income"
                ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"
                : "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-200"
            } disabled:opacity-60`}>
            {saving ? "Saving..." : editing ? "Update Transaction" : `Add ${form.type === "income" ? "Income" : "Expense"}`}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Main Finance Page ─────────────────────────────────────────────────────────
const Finance = () => {
  const [pl, setPL] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [plLoading, setPLLoading] = useState(true);
  const [filterType, setFilterType] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadPL = useCallback(async () => {
    setPLLoading(true);
    try {
      const res = await API.get(`/merchant/finance/pl-summary?year=${year}`);
      if (res.data?.success) setPL(res.data.data);
    } catch { /* silent */ } finally { setPLLoading(false); }
  }, [year]);

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 30 });
      if (filterType) params.set("type", filterType);
      if (filterCat) params.set("category", filterCat);
      const res = await API.get(`/merchant/finance/transactions?${params}`);
      if (res.data?.success) {
        setTransactions(res.data.data);
        setTotal(res.data.total);
      }
    } catch { /* silent */ } finally { setLoading(false); }
  }, [page, filterType, filterCat]);

  useEffect(() => { loadPL(); }, [loadPL]);
  useEffect(() => { loadTransactions(); }, [loadTransactions]);

  const handleSave = async (form) => {
    if (editing) {
      await API.put(`/merchant/finance/transactions/${editing._id}`, form);
      showToast("Transaction updated.");
    } else {
      await API.post("/merchant/finance/transactions", form);
      showToast("Transaction added.");
    }
    setEditing(null);
    loadTransactions();
    loadPL();
  };

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await API.delete(`/merchant/finance/transactions/${id}`);
      showToast("Transaction deleted.");
      loadTransactions();
      loadPL();
    } catch { showToast("Failed to delete.", "error"); } finally { setDeleting(null); }
  };

  const handleExport = async () => {
    try {
      const res = await API.get("/merchant/finance/export/csv", { responseType: "blob" });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url; a.download = `bookiify-finance-${year}.csv`; a.click();
      URL.revokeObjectURL(url);
      showToast("Export downloaded.");
    } catch { showToast("Export failed.", "error"); }
  };

  const allCats = [...INCOME_CATS, ...EXPENSE_CATS];
  const getCatLabel = (val) => allCats.find(c => c.value === val)?.label || val;

  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-white font-bold text-sm transition-all ${
          toast.type === "error" ? "bg-rose-500" : "bg-emerald-500"
        }`}>
          {toast.type === "error" ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          {toast.msg}
        </div>
      )}

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Finance Hub</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Track income, expenses & profit/loss in real time.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">
            <Download size={16} /> Export CSV
          </button>
          <button onClick={() => { setEditing(null); setShowModal(true); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200">
            <Plus size={16} /> Add Transaction
          </button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            label: "Total Income", value: fmt(pl?.totalIncome), suffix: "TND",
            icon: <ArrowUpRight size={20} />, color: "text-indigo-600", bg: "bg-indigo-50",
            sub: `${pl?.transactionCount ?? "—"} entries`
          },
          {
            label: "Total Expenses", value: fmt(pl?.totalExpense), suffix: "TND",
            icon: <ArrowDownLeft size={20} />, color: "text-rose-500", bg: "bg-rose-50",
            sub: "This year"
          },
          {
            label: "Net Profit", value: fmt(pl?.netProfit), suffix: "TND",
            icon: <TrendingUp size={20} />,
            color: (pl?.netProfit ?? 0) >= 0 ? "text-emerald-600" : "text-rose-500",
            bg: (pl?.netProfit ?? 0) >= 0 ? "bg-emerald-50" : "bg-rose-50",
            sub: "Income − Expenses"
          },
          {
            label: "Tax Estimate (19%)", value: fmt(pl?.taxEstimate), suffix: "TND",
            icon: <Percent size={20} />, color: "text-amber-600", bg: "bg-amber-50",
            sub: "TVA estimate"
          },
        ].map((card, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${card.bg} ${card.color} rounded-2xl`}>{card.icon}</div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{card.label}</span>
            </div>
            <p className={`text-2xl font-black ${card.color}`}>{plLoading ? "…" : card.value}</p>
            <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">{card.suffix} · {card.sub}</p>
          </div>
        ))}
      </div>

      {/* ── P&L Chart + Year selector ── */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart2 size={22} className="text-indigo-500" /> Monthly P&L — {year}
            </h3>
            <p className="text-slate-400 text-sm font-medium mt-1">Income vs. expenses by month</p>
          </div>
          <div className="flex items-center gap-2">
            {years.map(y => (
              <button key={y} onClick={() => setYear(y)}
                className={`px-4 py-2 rounded-xl text-sm font-black transition-all ${
                  year === y ? "bg-indigo-600 text-white shadow-md" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}>{y}</button>
            ))}
            <button onClick={loadPL} className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
        {plLoading ? (
          <div className="h-40 flex items-center justify-center text-slate-400 font-bold">Loading chart...</div>
        ) : pl?.monthlyData?.every(m => m.income === 0 && m.expense === 0) ? (
          <div className="h-40 flex flex-col items-center justify-center text-slate-400">
            <BarChart2 size={40} className="mb-3 opacity-30" />
            <p className="font-bold">No transactions yet for {year}</p>
            <p className="text-sm mt-1">Add your first income or expense to see the chart.</p>
          </div>
        ) : (
          <PLChart data={pl?.monthlyData} />
        )}
      </div>

      {/* ── Transactions Table ── */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between gap-4 flex-wrap">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">All Transactions</h3>
          <div className="flex items-center gap-3 flex-wrap">
            {/* Type filter */}
            <div className="relative">
              <select value={filterType} onChange={e => { setFilterType(e.target.value); setPage(1); }}
                className="appearance-none border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-4 py-2 pr-8 text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <option value="">All types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            {/* Category filter */}
            <div className="relative">
              <select value={filterCat} onChange={e => { setFilterCat(e.target.value); setPage(1); }}
                className="appearance-none border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-xl px-4 py-2 pr-8 text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <option value="">All categories</option>
                {[...INCOME_CATS, ...EXPENSE_CATS].map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40 text-slate-400 font-bold">Loading transactions...</div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-slate-400">
            <Receipt size={36} className="mb-3 opacity-30" />
            <p className="font-bold">No transactions found</p>
            <p className="text-sm mt-1">Use the button above to add your first entry.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/70 dark:bg-slate-800/50">
                    {["Date","Type","Category","Description","Amount","Actions"].map(h => (
                      <th key={h} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {transactions.map(txn => (
                    <tr key={txn._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-all group">
                      <td className="px-6 py-4 text-sm font-bold text-slate-500">
                        {new Date(txn.date).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          txn.type === "income" ? "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400" : "bg-rose-50 dark:bg-rose-500/15 text-rose-500 dark:text-rose-400"
                        }`}>{txn.type}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-600">{getCatLabel(txn.category)}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white max-w-[200px] truncate">{txn.description}</td>
                      <td className={`px-6 py-4 text-sm font-black ${txn.type === "income" ? "text-emerald-600" : "text-rose-500"}`}>
                        {txn.type === "income" ? "+" : "−"}{fmt(txn.amount)} TND
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setEditing(txn); setShowModal(true); }}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                            <Edit2 size={15} />
                          </button>
                          <button onClick={() => handleDelete(txn._id)} disabled={deleting === txn._id}
                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            {total > 30 && (
              <div className="px-6 py-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                <p className="text-sm font-bold text-slate-400">
                  Showing {(page - 1) * 30 + 1}–{Math.min(page * 30, total)} of {total}
                </p>
                <div className="flex gap-2">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    className="px-4 py-2 text-sm font-bold border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-xl disabled:opacity-40 hover:bg-slate-50 transition-all">
                    Prev
                  </button>
                  <button onClick={() => setPage(p => p + 1)} disabled={page * 30 >= total}
                    className="px-4 py-2 text-sm font-bold border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-xl disabled:opacity-40 hover:bg-slate-50 transition-all">
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Category Breakdown ── */}
      {pl?.categoryBreakdown && Object.keys(pl.categoryBreakdown).length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-8">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Category Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(pl.categoryBreakdown)
              .sort(([,a],[,b]) => b - a)
              .slice(0, 9)
              .map(([cat, amount]) => {
                const isIncome = INCOME_CATS.find(c => c.value === cat);
                return (
                  <div key={cat} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
                    <div>
                      <p className="text-sm font-black text-slate-900 dark:text-white">{getCatLabel(cat)}</p>
                      <span className={`text-[10px] font-black uppercase ${isIncome ? "text-indigo-500" : "text-rose-500"}`}>
                        {isIncome ? "income" : "expense"}
                      </span>
                    </div>
                    <p className={`font-black text-base ${isIncome ? "text-emerald-600" : "text-rose-500"}`}>
                      {fmt(amount)} TND
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <TransactionModal
          onClose={() => { setShowModal(false); setEditing(null); }}
          onSave={handleSave}
          editing={editing}
        />
      )}
    </div>
  );
};

export default Finance;
