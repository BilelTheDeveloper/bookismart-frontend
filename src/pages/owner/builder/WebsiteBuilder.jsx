import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  ArrowLeft, Plus, Trash2, Eye, EyeOff, GripVertical, Monitor, Smartphone,
  Palette, Save, Layers, X, ChevronUp, ChevronDown, Check, Sparkles,
  LayoutTemplate, Loader2, Wand2, PencilRuler,
} from "lucide-react";
import API from "../../../api/config";
import { useAuth } from "../../../context/AuthContext";
import { SECTIONS, SECTION_LIST } from "./sections";
import { BUILDER_TEMPLATES, blankSite, make } from "./templates";

const ACCENT_SWATCHES = ["#6366f1", "#0d9488", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#0ea5e9", "#f97316"];

/* ── Schema-driven field ── */
const Field = ({ field, value, onChange }) => {
  const base = "w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500 placeholder:text-slate-500";
  if (field.type === "textarea")
    return <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={4} className={`${base} resize-none`} placeholder={field.label} />;
  if (field.type === "toggle")
    return (
      <button onClick={() => onChange(!value)} className={`relative w-12 h-7 rounded-full transition-all ${value ? "bg-indigo-600" : "bg-slate-700"}`}>
        <span className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${value ? "left-6" : "left-1"}`} />
      </button>
    );
  if (field.type === "select")
    return (
      <div className="flex gap-2">
        {field.options.map((o) => (
          <button key={o} onClick={() => onChange(o)} className={`flex-1 capitalize py-2 rounded-xl text-xs font-black transition-all ${value === o ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"}`}>{o}</button>
        ))}
      </div>
    );
  if (field.type === "image")
    return (
      <div className="space-y-2">
        <input value={value || ""} onChange={(e) => onChange(e.target.value)} className={base} placeholder="https://image-url..." />
        {value && <img src={value} alt="" className="w-full h-24 object-cover rounded-xl border border-slate-700" />}
      </div>
    );
  return <input value={value || ""} onChange={(e) => onChange(e.target.value)} className={base} placeholder={field.label} />;
};

/* ── Repeater (list of items) ── */
const Repeater = ({ field, value = [], onChange }) => {
  const isSimple = field.simple === "image";
  const addItem = () => onChange([...(value || []), isSimple ? "" : Object.fromEntries(field.fields.map((f) => [f.key, ""]))]);
  const removeItem = (i) => onChange(value.filter((_, idx) => idx !== i));
  const updItem = (i, key, v) => onChange(value.map((it, idx) => (idx !== i ? it : isSimple ? v : { ...it, [key]: v })));

  return (
    <div className="space-y-2.5">
      {(value || []).map((item, i) => (
        <div key={i} className="rounded-xl border border-slate-700 bg-slate-800/50 p-3 space-y-2 relative">
          <button onClick={() => removeItem(i)} className="absolute top-2 right-2 text-slate-500 hover:text-rose-400"><Trash2 size={13} /></button>
          {isSimple ? (
            <Field field={{ type: "image", label: "Image URL" }} value={item} onChange={(v) => updItem(i, "_", v)} />
          ) : (
            field.fields.map((f) => (
              <div key={f.key}>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{f.label}</label>
                <Field field={f} value={item[f.key]} onChange={(v) => updItem(i, f.key, v)} />
              </div>
            ))
          )}
        </div>
      ))}
      <button onClick={addItem} className="w-full py-2.5 rounded-xl border border-dashed border-slate-600 text-slate-400 hover:text-white hover:border-indigo-500 text-xs font-bold flex items-center justify-center gap-2">
        <Plus size={14} /> Add item
      </button>
    </div>
  );
};

const WebsiteBuilder = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const ownerId = user?.id || user?._id;

  const [phase, setPhase] = useState("loading"); // loading | choose | edit
  const [sections, setSections] = useState([]);
  const [theme, setTheme] = useState({ accent: "#6366f1", mode: "dark" });
  const [siteName, setSiteName] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [device, setDevice] = useState("desktop");
  const [rightTab, setRightTab] = useState("section"); // section | theme
  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const dragIndex = useRef(null);

  /* Load existing builder site */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get("/merchant/website/my-site");
        if (data?.sections?.length) {
          setSections(data.sections);
          setTheme(data.builderTheme || { accent: "#6366f1", mode: "dark" });
          setSiteName(data.name || user?.businessName || "");
          setPhase("edit");
          return;
        }
      } catch { /* no site yet */ }
      setSiteName(user?.businessName || "");
      setPhase("choose");
    })();
  }, [user]);

  const selected = sections.find((s) => s.id === selectedId);

  const startFromTemplate = (tpl) => {
    setSections(tpl.build());
    setTheme(tpl.theme);
    setPhase("edit");
  };
  const startBlank = () => { setSections(blankSite()); setTheme({ accent: "#6366f1", mode: "dark" }); setPhase("edit"); };

  const updateSelected = (key, val) => setSections((prev) => prev.map((s) => (s.id === selectedId ? { ...s, settings: { ...s.settings, [key]: val } } : s)));
  const addSection = (type) => { const sec = make(type); setSections((p) => [...p, sec]); setSelectedId(sec.id); setRightTab("section"); setAddOpen(false); };
  const removeSection = (id) => { setSections((p) => p.filter((s) => s.id !== id)); if (selectedId === id) setSelectedId(null); };
  const toggleVisible = (id) => setSections((p) => p.map((s) => (s.id === id ? { ...s, visible: s.visible === false } : s)));
  const move = (i, dir) => setSections((p) => { const a = [...p]; const j = i + dir; if (j < 0 || j >= a.length) return p; [a[i], a[j]] = [a[j], a[i]]; return a; });

  const onDrop = (i) => { const from = dragIndex.current; if (from == null || from === i) return; setSections((p) => { const a = [...p]; const [m] = a.splice(from, 1); a.splice(i, 0, m); return a; }); dragIndex.current = null; };

  const save = useCallback(async () => {
    setSaving(true);
    try {
      await API.post("/merchant/website/builder", { name: siteName, sections, builderTheme: theme });
      toast.success("Saved! Your site is live after review.");
    } catch (e) {
      toast.error(e.response?.data?.message || "Save failed");
    } finally { setSaving(false); }
  }, [siteName, sections, theme]);

  /* ───────── LOADING ───────── */
  if (phase === "loading")
    return <div className="h-screen flex items-center justify-center bg-slate-950"><Loader2 className="animate-spin text-indigo-500" size={32} /></div>;

  /* ───────── CHOICE SCREEN ───────── */
  if (phase === "choose")
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold mb-10"><ArrowLeft size={16} /> Back</button>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-black uppercase tracking-widest text-indigo-300 mb-5"><Sparkles size={13} /> Website Builder</span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter">Build your site, your way.</h1>
            <p className="text-slate-400 font-medium mt-4 text-lg">Start from a ready-made template and tweak it — or build from a blank canvas, section by section.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            {/* Build from scratch */}
            <button onClick={startBlank} className="group text-left rounded-3xl border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-900 p-7 transition-all flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center mb-5"><PencilRuler size={22} /></div>
              <h3 className="text-xl font-black">Build from scratch</h3>
              <p className="text-slate-400 text-sm mt-2 flex-1">Start with a blank canvas and add exactly the sections you want.</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-indigo-400 font-black text-xs uppercase tracking-widest">Start blank <Plus size={14} /></span>
            </button>

            {/* Templates */}
            {BUILDER_TEMPLATES.map((tpl) => (
              <button key={tpl.id} onClick={() => startFromTemplate(tpl)} className="group text-left rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden hover:border-slate-600 transition-all flex flex-col">
                <div className="h-40 relative overflow-hidden">
                  <img src={tpl.cover} alt={tpl.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  <span className="absolute bottom-3 left-4 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest" style={{ background: tpl.theme.accent }}>{tpl.theme.mode}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-black">{tpl.name}</h3>
                  <p className="text-slate-400 text-sm mt-1.5 flex-1">{tpl.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-black text-xs uppercase tracking-widest" style={{ color: tpl.theme.accent }}>Use this <Wand2 size={13} /></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );

  /* ───────── EDITOR ───────── */
  const frameWidth = device === "mobile" ? "max-w-[420px]" : "max-w-full";
  return (
    <div className="h-screen flex flex-col bg-slate-950 text-white overflow-hidden">
      {/* Top bar */}
      <header className="h-14 shrink-0 flex items-center justify-between gap-3 px-4 border-b border-slate-800 bg-slate-900">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={() => navigate("/owner/dashboard/themes")} className="p-2 rounded-xl hover:bg-slate-800 text-slate-400"><ArrowLeft size={18} /></button>
          <input value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="Site name" className="bg-transparent font-black text-sm outline-none w-40 sm:w-56 truncate" />
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 bg-slate-800 rounded-xl p-1">
            <button onClick={() => setDevice("desktop")} className={`p-1.5 rounded-lg ${device === "desktop" ? "bg-slate-700 text-white" : "text-slate-400"}`}><Monitor size={16} /></button>
            <button onClick={() => setDevice("mobile")} className={`p-1.5 rounded-lg ${device === "mobile" ? "bg-slate-700 text-white" : "text-slate-400"}`}><Smartphone size={16} /></button>
          </div>
          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-black text-sm disabled:opacity-60">
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Save
          </button>
        </div>
      </header>

      <div className="flex-1 flex min-h-0">
        {/* LEFT: section list */}
        <aside className="w-64 shrink-0 border-r border-slate-800 bg-slate-900 flex flex-col">
          <div className="p-3 flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2"><Layers size={13} /> Sections</span>
            <button onClick={() => setAddOpen(true)} className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500"><Plus size={14} /></button>
          </div>
          <div className="flex-1 overflow-y-auto px-2 pb-3 space-y-1">
            {sections.map((s, i) => {
              const def = SECTIONS[s.type];
              const Icon = def?.icon || LayoutTemplate;
              return (
                <div key={s.id} draggable onDragStart={() => (dragIndex.current = i)} onDragOver={(e) => e.preventDefault()} onDrop={() => onDrop(i)}
                  onClick={() => { setSelectedId(s.id); setRightTab("section"); }}
                  className={`group flex items-center gap-2 px-2.5 py-2 rounded-xl cursor-pointer transition-all ${selectedId === s.id ? "bg-indigo-600/20 border border-indigo-500/40" : "hover:bg-slate-800 border border-transparent"}`}>
                  <GripVertical size={13} className="text-slate-600 cursor-grab shrink-0" />
                  <Icon size={15} className={selectedId === s.id ? "text-indigo-300" : "text-slate-400"} />
                  <span className={`flex-1 text-sm font-bold truncate ${s.visible === false ? "text-slate-600 line-through" : ""}`}>{def?.name || s.type}</span>
                  <button onClick={(e) => { e.stopPropagation(); toggleVisible(s.id); }} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-white">{s.visible === false ? <EyeOff size={13} /> : <Eye size={13} />}</button>
                  <button onClick={(e) => { e.stopPropagation(); removeSection(s.id); }} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400"><Trash2 size={13} /></button>
                </div>
              );
            })}
            <button onClick={() => setAddOpen(true)} className="w-full mt-2 py-2.5 rounded-xl border border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-indigo-500 text-xs font-bold flex items-center justify-center gap-2"><Plus size={14} /> Add section</button>
          </div>
        </aside>

        {/* CENTER: live preview */}
        <main className="flex-1 min-w-0 overflow-y-auto bg-slate-800/40 p-4 sm:p-8">
          <div className={`mx-auto ${frameWidth} transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/40`}>
            {sections.length === 0 ? (
              <div className="h-96 flex flex-col items-center justify-center bg-slate-900 text-slate-500">
                <Layers size={32} className="mb-3" /><p className="font-bold">No sections yet</p>
                <button onClick={() => setAddOpen(true)} className="mt-4 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm">Add your first section</button>
              </div>
            ) : (
              sections.map((s) => {
                const def = SECTIONS[s.type];
                if (!def) return null;
                const Cmp = def.Component;
                const isSel = selectedId === s.id;
                return (
                  <div key={s.id} onClick={() => { setSelectedId(s.id); setRightTab("section"); }}
                    className={`relative cursor-pointer transition-all ${isSel ? "ring-2 ring-indigo-500 ring-inset z-10" : "hover:ring-2 hover:ring-indigo-400/40 hover:ring-inset"}`}>
                    {isSel && <span className="absolute top-2 left-2 z-20 px-2 py-1 rounded-md bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest">{def.name}</span>}
                    <div className="pointer-events-none" style={{ opacity: s.visible === false ? 0.35 : 1 }}>
                      <Cmp settings={s.settings} theme={theme} ownerId={ownerId} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>

        {/* RIGHT: settings / theme */}
        <aside className="w-80 shrink-0 border-l border-slate-800 bg-slate-900 flex flex-col">
          <div className="flex border-b border-slate-800">
            <button onClick={() => setRightTab("section")} className={`flex-1 py-3 text-xs font-black uppercase tracking-widest ${rightTab === "section" ? "text-white border-b-2 border-indigo-500" : "text-slate-500"}`}>Section</button>
            <button onClick={() => setRightTab("theme")} className={`flex-1 py-3 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-1.5 ${rightTab === "theme" ? "text-white border-b-2 border-indigo-500" : "text-slate-500"}`}><Palette size={13} /> Theme</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {rightTab === "theme" ? (
              <div className="space-y-6">
                <div>
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Mode</label>
                  <div className="flex gap-2 mt-2">
                    {["dark", "light"].map((m) => (
                      <button key={m} onClick={() => setTheme((t) => ({ ...t, mode: m }))} className={`flex-1 capitalize py-2.5 rounded-xl text-xs font-black ${theme.mode === m ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"}`}>{m}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Accent color</label>
                  <div className="grid grid-cols-5 gap-2 mt-2">
                    {ACCENT_SWATCHES.map((c) => (
                      <button key={c} onClick={() => setTheme((t) => ({ ...t, accent: c }))} className={`h-9 rounded-xl flex items-center justify-center ${theme.accent === c ? "ring-2 ring-white" : ""}`} style={{ background: c }}>{theme.accent === c && <Check size={14} className="text-white" />}</button>
                    ))}
                  </div>
                  <input type="color" value={theme.accent} onChange={(e) => setTheme((t) => ({ ...t, accent: e.target.value }))} className="w-full h-9 mt-2 rounded-xl bg-slate-800 cursor-pointer" />
                </div>
              </div>
            ) : !selected ? (
              <div className="text-center py-16 text-slate-500"><LayoutTemplate size={28} className="mx-auto mb-3" /><p className="text-sm font-bold">Select a section to edit it</p></div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm font-black text-white flex items-center gap-2">{SECTIONS[selected.type]?.name}</p>
                {SECTIONS[selected.type]?.schema.map((f) => (
                  <div key={f.key}>
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center justify-between mb-1.5">{f.label}</label>
                    {f.type === "repeater"
                      ? <Repeater field={f} value={selected.settings[f.key]} onChange={(v) => updateSelected(f.key, v)} />
                      : <Field field={f} value={selected.settings[f.key]} onChange={(v) => updateSelected(f.key, v)} />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Add-section library */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setAddOpen(false)}>
          <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-black flex items-center gap-2"><Plus size={18} /> Add a section</h3>
              <button onClick={() => setAddOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SECTION_LIST.map((s) => {
                const Icon = s.icon;
                return (
                  <button key={s.type} onClick={() => addSection(s.type)} className="rounded-2xl border border-slate-700 bg-slate-800/50 p-5 text-left hover:border-indigo-500 hover:bg-slate-800 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-300 flex items-center justify-center mb-3"><Icon size={18} /></div>
                    <p className="font-black text-sm">{s.name}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteBuilder;
