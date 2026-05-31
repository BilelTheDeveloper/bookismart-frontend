import React, { useEffect, useState, useCallback } from "react";
import {
  Plus, X, Send, CheckCircle2, Clock, AlertTriangle, FileText,
  Trash2, Printer, ChevronDown, AlertCircle, DollarSign, Ban,
  Eye, Edit2, Mail, Check
} from "lucide-react";
import API from "../../api/config";

const fmt = (n) => (n ?? 0).toLocaleString("en", { minimumFractionDigits: 3, maximumFractionDigits: 3 });

const STATUS_CONFIG = {
  draft:     { label: "Draft",     color: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300",   icon: <FileText size={12} /> },
  sent:      { label: "Sent",      color: "bg-blue-50 text-blue-600",     icon: <Mail size={12} /> },
  paid:      { label: "Paid",      color: "bg-emerald-50 text-emerald-600",icon: <CheckCircle2 size={12} /> },
  overdue:   { label: "Overdue",   color: "bg-rose-50 text-rose-600",     icon: <AlertTriangle size={12} /> },
  cancelled: { label: "Cancelled", color: "bg-slate-100 dark:bg-slate-800 text-slate-400",   icon: <Ban size={12} /> },
};

// ── Invoice Form Modal ────────────────────────────────────────────────────────
function InvoiceFormModal({ onClose, onSave, editing }) {
  const today = new Date().toISOString().slice(0, 10);
  const defaultDue = new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10);

  const [form, setForm] = useState({
    customer: { name: "", email: "", phone: "", address: "" },
    items: [{ description: "", quantity: 1, unitPrice: 0 }],
    taxRate: 19,
    discount: 0,
    notes: "",
    dueDate: defaultDue,
    ...editing,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const setCustomer = (k, v) => setForm(f => ({ ...f, customer: { ...f.customer, [k]: v } }));
  const setItem = (idx, k, v) => {
    const items = form.items.map((item, i) => i === idx ? { ...item, [k]: v } : item);
    setForm(f => ({ ...f, items }));
  };
  const addItem = () => setForm(f => ({ ...f, items: [...f.items, { description: "", quantity: 1, unitPrice: 0 }] }));
  const removeItem = (idx) => setForm(f => ({ ...f, items: f.items.filter((_, i) => i !== idx) }));

  const subtotal = form.items.reduce((s, i) => s + (parseFloat(i.quantity) || 0) * (parseFloat(i.unitPrice) || 0), 0);
  const taxAmount = (subtotal - (parseFloat(form.discount) || 0)) * ((parseFloat(form.taxRate) || 0) / 100);
  const total = subtotal - (parseFloat(form.discount) || 0) + taxAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customer.name || !form.customer.email) { setError("Customer name and email are required."); return; }
    if (form.items.some(i => !i.description || parseFloat(i.unitPrice) < 0)) {
      setError("All items need a description and valid price."); return;
    }
    if (!form.dueDate) { setError("Due date is required."); return; }
    setError(""); setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save invoice.");
    } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl my-8 relative" onClick={e => e.stopPropagation()}>
        <div className="p-8 border-b border-slate-100 dark:border-slate-800">
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 dark:text-slate-200 transition-colors">
            <X size={22} />
          </button>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">{editing ? "Edit Invoice" : "Create Invoice"}</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Customer Info */}
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Customer Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Full Name *</label>
                <input value={form.customer.name} onChange={e => setCustomer("name", e.target.value)}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Amine Gharbi" required />
              </div>
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Email *</label>
                <input type="email" value={form.customer.email} onChange={e => setCustomer("email", e.target.value)}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="client@email.com" required />
              </div>
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Phone</label>
                <input value={form.customer.phone} onChange={e => setCustomer("phone", e.target.value)}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="+216 XX XXX XXX" />
              </div>
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Address</label>
                <input value={form.customer.address} onChange={e => setCustomer("address", e.target.value)}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Tunis, Tunisia" />
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Line Items</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                <div className="col-span-5">Description</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-3 text-right">Unit Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              {form.items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-5">
                    <input value={item.description} onChange={e => setItem(idx, "description", e.target.value)}
                      className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="Service description" required />
                  </div>
                  <div className="col-span-2">
                    <input type="number" min="0.01" step="0.01" value={item.quantity} onChange={e => setItem(idx, "quantity", e.target.value)}
                      className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-center focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                  </div>
                  <div className="col-span-3">
                    <input type="number" min="0" step="0.001" value={item.unitPrice} onChange={e => setItem(idx, "unitPrice", e.target.value)}
                      className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-right focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-1">
                    <span className="text-sm font-black text-slate-700 dark:text-slate-200">
                      {fmt((parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0))}
                    </span>
                    {form.items.length > 1 && (
                      <button type="button" onClick={() => removeItem(idx)} className="text-slate-300 hover:text-rose-500 transition-colors ml-1">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button type="button" onClick={addItem}
                className="flex items-center gap-2 text-indigo-600 text-sm font-black hover:text-indigo-800 transition-colors mt-2">
                <Plus size={16} /> Add line item
              </button>
            </div>
          </div>

          {/* Totals + Settings */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Tax Rate (%)</label>
                <input type="number" min="0" max="100" step="0.1" value={form.taxRate} onChange={e => setForm(f => ({ ...f, taxRate: e.target.value }))}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              </div>
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Discount (TND)</label>
                <input type="number" min="0" step="0.001" value={form.discount} onChange={e => setForm(f => ({ ...f, discount: e.target.value }))}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              </div>
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Due Date</label>
                <input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400" required />
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 flex flex-col justify-center space-y-3">
              <div className="flex justify-between text-sm font-bold text-slate-600 dark:text-slate-300">
                <span>Subtotal</span><span>{fmt(subtotal)} TND</span>
              </div>
              {parseFloat(form.discount) > 0 && (
                <div className="flex justify-between text-sm font-bold text-emerald-600">
                  <span>Discount</span><span>−{fmt(parseFloat(form.discount) || 0)} TND</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-slate-600 dark:text-slate-300">
                <span>TVA ({form.taxRate}%)</span><span>{fmt(taxAmount)} TND</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between font-black text-lg text-slate-900 dark:text-white">
                <span>Total</span><span className="text-indigo-600">{fmt(total)} TND</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Notes (optional)</label>
            <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              rows={2} placeholder="Payment instructions, thank-you note..." />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-rose-600 bg-rose-50 px-4 py-3 rounded-xl text-sm font-bold">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <div className="flex gap-3">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-black hover:bg-slate-50 dark:hover:bg-slate-800/60 dark:bg-slate-800/60 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-60">
              {saving ? "Saving..." : editing ? "Update Invoice" : "Create Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Invoice Preview Modal ─────────────────────────────────────────────────────
function InvoicePreviewModal({ invoice, onClose, onSend, onMarkPaid, onEdit, sending }) {
  const handlePrint = () => window.print();
  const cfg = STATUS_CONFIG[invoice.status] || STATUS_CONFIG.draft;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
        {/* Toolbar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-100 dark:border-slate-800 px-8 py-4 flex items-center justify-between z-10 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase ${cfg.color}`}>
              {cfg.icon} {cfg.label}
            </span>
            <span className="text-sm font-black text-slate-500">{invoice.invoiceNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            {invoice.status !== "paid" && invoice.status !== "cancelled" && (
              <>
                <button onClick={() => { onEdit(invoice); onClose(); }}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-black text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 dark:bg-slate-800/60 transition-all">
                  <Edit2 size={14} /> Edit
                </button>
                {invoice.status !== "paid" && (
                  <button onClick={() => onSend(invoice._id)} disabled={sending}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-black text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all shadow-md disabled:opacity-60">
                    <Send size={14} /> {sending ? "Sending..." : "Send Email"}
                  </button>
                )}
                {(invoice.status === "sent" || invoice.status === "overdue") && (
                  <button onClick={() => onMarkPaid(invoice._id)}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-black text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-all shadow-md">
                    <Check size={14} /> Mark Paid
                  </button>
                )}
              </>
            )}
            <button onClick={handlePrint} className="p-2 text-slate-400 hover:text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl transition-all">
              <Printer size={16} />
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 dark:text-slate-200 transition-all">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-8" id="invoice-print-area">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 text-white mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-black tracking-tighter">INVOICE</h1>
                <p className="text-indigo-200 mt-1 font-bold">{invoice.invoiceNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-black uppercase tracking-widest text-indigo-200 mb-1">Issued</p>
                <p className="font-black">{new Date(invoice.issuedDate).toLocaleDateString("en-GB")}</p>
                <p className="text-xs font-black uppercase tracking-widest text-indigo-200 mt-3 mb-1">Due</p>
                <p className="font-black text-rose-200">{new Date(invoice.dueDate).toLocaleDateString("en-GB")}</p>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-8">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Bill To</p>
            <p className="text-xl font-black text-slate-900 dark:text-white">{invoice.customer.name}</p>
            <p className="text-slate-500 font-bold">{invoice.customer.email}</p>
            {invoice.customer.phone && <p className="text-slate-500 font-bold">{invoice.customer.phone}</p>}
            {invoice.customer.address && <p className="text-slate-500 font-bold">{invoice.customer.address}</p>}
          </div>

          {/* Items */}
          <table className="w-full border-collapse mb-8">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60">
                <th className="px-4 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-l-xl">Description</th>
                <th className="px-4 py-3 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty</th>
                <th className="px-4 py-3 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit Price</th>
                <th className="px-4 py-3 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-r-xl">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i} className="border-b border-slate-50">
                  <td className="px-4 py-4 font-bold text-slate-900 dark:text-white">{item.description}</td>
                  <td className="px-4 py-4 text-center font-bold text-slate-600 dark:text-slate-300">{item.quantity}</td>
                  <td className="px-4 py-4 text-right font-bold text-slate-600 dark:text-slate-300">{fmt(item.unitPrice)} TND</td>
                  <td className="px-4 py-4 text-right font-black text-slate-900 dark:text-white">{fmt(item.total)} TND</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-72 space-y-2">
              <div className="flex justify-between text-sm font-bold text-slate-600 dark:text-slate-300">
                <span>Subtotal</span><span>{fmt(invoice.subtotal)} TND</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between text-sm font-bold text-emerald-600">
                  <span>Discount</span><span>−{fmt(invoice.discount)} TND</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-slate-600 dark:text-slate-300">
                <span>TVA ({invoice.taxRate}%)</span><span>{fmt(invoice.taxAmount)} TND</span>
              </div>
              <div className="flex justify-between items-center font-black text-xl pt-3 border-t border-slate-200 dark:border-slate-700">
                <span className="text-slate-900 dark:text-white">Total Due</span>
                <span className="text-indigo-600">{fmt(invoice.total)} TND</span>
              </div>
            </div>
          </div>

          {invoice.notes && (
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Notes</p>
              <p className="text-slate-600 dark:text-slate-300 font-medium text-sm">{invoice.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Invoices Page ────────────────────────────────────────────────────────
const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);
  const [sending, setSending] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 20 });
      if (filterStatus) params.set("status", filterStatus);
      const res = await API.get(`/merchant/invoices?${params}`);
      if (res.data?.success) { setInvoices(res.data.data); setTotal(res.data.total); }
    } catch { /* silent */ } finally { setLoading(false); }
  }, [page, filterStatus]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (form) => {
    if (editing) {
      await API.put(`/merchant/invoices/${editing._id}`, form);
      showToast("Invoice updated.");
    } else {
      await API.post("/merchant/invoices", form);
      showToast("Invoice created.");
    }
    setEditing(null);
    load();
  };

  const handleSend = async (id) => {
    setSending(true);
    try {
      await API.post(`/merchant/invoices/${id}/send`);
      showToast("Invoice sent to customer's email.");
      load();
      if (preview) setPreview(invoices.find(i => i._id === id) || preview);
    } catch (err) {
      showToast(err?.response?.data?.message || "Failed to send.", "error");
    } finally { setSending(false); }
  };

  const handleMarkPaid = async (id) => {
    try {
      await API.patch(`/merchant/invoices/${id}/mark-paid`);
      showToast("Invoice marked as paid.");
      setPreview(null);
      load();
    } catch { showToast("Failed to update.", "error"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this invoice? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await API.delete(`/merchant/invoices/${id}`);
      showToast("Invoice deleted.");
      load();
    } catch { showToast("Failed to delete.", "error"); } finally { setDeleting(null); }
  };

  const stats = {
    all: total,
    paid: invoices.filter(i => i.status === "paid").length,
    overdue: invoices.filter(i => i.status === "overdue").length,
    pending: invoices.filter(i => i.status === "sent").length,
    revenue: invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.total, 0),
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-white font-bold text-sm ${
          toast.type === "error" ? "bg-rose-500" : "bg-emerald-500"
        }`}>
          {toast.type === "error" ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Invoices</h1>
          <p className="text-slate-500 font-medium mt-1">Create, send & track professional invoices.</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200">
          <Plus size={16} /> New Invoice
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Revenue Collected", value: `${fmt(stats.revenue)} TND`, icon: <DollarSign size={18} />, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Paid Invoices", value: stats.paid, icon: <CheckCircle2 size={18} />, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Pending (Sent)", value: stats.pending, icon: <Clock size={18} />, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Overdue", value: stats.overdue, icon: <AlertTriangle size={18} />, color: "text-rose-600", bg: "bg-rose-50" },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className={`inline-flex p-3 ${s.bg} ${s.color} rounded-2xl mb-4`}>{s.icon}</div>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between gap-4 flex-wrap">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">All Invoices</h3>
          <div className="relative">
            <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
              className="appearance-none border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 pr-8 text-sm font-bold text-slate-700 dark:text-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <option value="">All statuses</option>
              {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40 text-slate-400 font-bold">Loading invoices...</div>
        ) : invoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-400">
            <FileText size={40} className="mb-3 opacity-30" />
            <p className="font-bold">No invoices yet</p>
            <p className="text-sm mt-1">Create your first invoice to get started.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/70">
                    {["Invoice #","Customer","Issued","Due","Amount","Status","Actions"].map(h => (
                      <th key={h} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {invoices.map(inv => {
                    const cfg = STATUS_CONFIG[inv.status] || STATUS_CONFIG.draft;
                    return (
                      <tr key={inv._id} className="hover:bg-slate-50/50 transition-all group cursor-pointer" onClick={() => setPreview(inv)}>
                        <td className="px-6 py-4 text-sm font-black text-indigo-600">{inv.invoiceNumber}</td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-black text-slate-900 dark:text-white">{inv.customer.name}</p>
                          <p className="text-xs text-slate-400 font-bold">{inv.customer.email}</p>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-500">
                          {new Date(inv.issuedDate).toLocaleDateString("en-GB")}
                        </td>
                        <td className={`px-6 py-4 text-sm font-bold ${
                          inv.status === "overdue" ? "text-rose-500" : "text-slate-500"
                        }`}>{new Date(inv.dueDate).toLocaleDateString("en-GB")}</td>
                        <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white">{fmt(inv.total)} TND</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase ${cfg.color}`}>
                            {cfg.icon} {cfg.label}
                          </span>
                        </td>
                        <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setPreview(inv)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                              <Eye size={15} />
                            </button>
                            {inv.status === "draft" && (
                              <button onClick={() => { setEditing(inv); setShowForm(true); }}
                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                                <Edit2 size={15} />
                              </button>
                            )}
                            <button onClick={() => handleDelete(inv._id)} disabled={deleting === inv._id}
                              className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {total > 20 && (
              <div className="px-6 py-4 border-t border-slate-50 flex justify-between items-center">
                <p className="text-sm font-bold text-slate-400">Showing {(page-1)*20+1}–{Math.min(page*20,total)} of {total}</p>
                <div className="flex gap-2">
                  <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}
                    className="px-4 py-2 text-sm font-bold border border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800/60 dark:bg-slate-800/60 transition-all">Prev</button>
                  <button onClick={() => setPage(p => p+1)} disabled={page*20 >= total}
                    className="px-4 py-2 text-sm font-bold border border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800/60 dark:bg-slate-800/60 transition-all">Next</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {showForm && (
        <InvoiceFormModal
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSave={handleSave}
          editing={editing}
        />
      )}
      {preview && (
        <InvoicePreviewModal
          invoice={preview}
          onClose={() => setPreview(null)}
          onSend={handleSend}
          onMarkPaid={handleMarkPaid}
          onEdit={(inv) => { setEditing(inv); setShowForm(true); }}
          sending={sending}
        />
      )}
    </div>
  );
};

export default Invoices;
