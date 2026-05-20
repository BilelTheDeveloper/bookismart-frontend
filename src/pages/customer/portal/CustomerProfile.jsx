import React from "react";
import { User, Mail, Phone, Building2, Shield, CheckCircle2, Calendar } from "lucide-react";
import { useCustomerAuth } from "../../../context/CustomerAuthContext";

const PAGE_LABELS = {
  appointments: "Appointments",
  invoices:     "Invoices",
  loyalty:      "Loyalty Points",
  booking:      "Book a Service",
};

const ACCESS_COLORS = {
  read: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  full: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
};

const CustomerProfile = () => {
  const { customer } = useCustomerAuth();

  if (!customer) return null;

  const infoRows = [
    { icon: User,      label: "Full Name",   value: customer.fullName },
    { icon: Mail,      label: "Email",       value: customer.email },
    { icon: Phone,     label: "Phone",       value: customer.phone || "—" },
    { icon: Building2, label: "Business",    value: customer.businessName || "—" },
    { icon: Calendar,  label: "Member Since", value: customer.createdAt ? new Date(customer.createdAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" }) : "—" },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Hero card */}
      <div className="relative bg-gradient-to-br from-indigo-900/50 via-slate-900 to-slate-900 border border-indigo-500/20 rounded-[2rem] p-4 sm:p-6 lg:p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          {customer.profilePicture ? (
            <img
              src={customer.profilePicture}
              alt="profile"
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-indigo-500/30 shadow-xl"
            />
          ) : (
            <div className="w-24 h-24 bg-indigo-600/30 border-2 border-indigo-500/40 rounded-2xl flex items-center justify-center">
              <span className="text-4xl font-black text-indigo-300">
                {customer.fullName?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Verified Client</span>
              <CheckCircle2 size={14} className="text-emerald-400" />
            </div>
            <h2 className="text-3xl font-black text-white">{customer.fullName}</h2>
            <p className="text-slate-400 font-medium mt-1">{customer.businessName}</p>
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-indigo-600/20 border border-indigo-500/30 rounded-xl flex items-center justify-center">
            <User size={18} className="text-indigo-400" />
          </div>
          <h3 className="text-white font-black text-lg">Personal Information</h3>
        </div>
        <div className="space-y-4">
          {infoRows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 py-3 border-b border-slate-800/60 last:border-0">
              <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                <Icon size={15} className="text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{label}</p>
                <p className="text-white font-bold text-sm mt-0.5 truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Access rights */}
      <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-emerald-600/20 border border-emerald-500/30 rounded-xl flex items-center justify-center">
            <Shield size={18} className="text-emerald-400" />
          </div>
          <div>
            <h3 className="text-white font-black text-lg">Portal Access</h3>
            <p className="text-slate-500 text-xs">Pages your service provider has granted you access to</p>
          </div>
        </div>

        {customer.allowedPages?.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-500 text-sm">No additional pages have been granted yet.</p>
            <p className="text-slate-600 text-xs mt-1">Contact your service provider to request access.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {customer.allowedPages?.map(({ pageKey, accessLevel }) => (
              <div key={pageKey} className="flex items-center justify-between p-4 bg-slate-800/60 border border-slate-700/50 rounded-xl">
                <span className="text-white font-bold text-sm">{PAGE_LABELS[pageKey] || pageKey}</span>
                <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${ACCESS_COLORS[accessLevel]}`}>
                  {accessLevel === "read" ? "View Only" : "Full Access"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;
