import React from "react";
import { 
  Users, 
  CalendarCheck, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

const Overview = () => {
  // Mock data for the dashboard - later we will fetch this from the backend
  const stats = [
    { label: "Total Bookings", value: "124", icon: <CalendarCheck className="text-indigo-600" />, change: "+12%", color: "bg-indigo-50" },
    { label: "New Customers", value: "48", icon: <Users className="text-emerald-600" />, change: "+18%", color: "bg-emerald-50" },
    { label: "Revenue (TND)", value: "3,420", icon: <TrendingUp className="text-amber-600" />, change: "+7%", color: "bg-amber-50" },
    { label: "Pending Tasks", value: "12", icon: <Clock className="text-rose-600" />, change: "Critical", color: "bg-rose-50" },
  ];

  const recentBookings = [
    { id: 1, customer: "Sami Ben Ali", service: "Barbering", date: "Today, 2:00 PM", status: "Confirmed" },
    { id: 2, customer: "Ines Mahmoud", service: "Yoga Session", date: "Today, 4:30 PM", status: "Pending" },
    { id: 3, customer: "Yassine Trabelsi", service: "Consultation", date: "Tomorrow, 10:00 AM", status: "Confirmed" },
  ];

  return (
    <div className="space-y-8">
      {/* --- 1. Trial Status Banner --- */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-3xl p-6 text-white flex justify-between items-center shadow-xl overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-lg font-bold opacity-80">Trial Status</h3>
          <p className="text-3xl font-black mt-1">84 Days Remaining</p>
          <p className="text-indigo-300 text-sm mt-2 font-medium uppercase tracking-wider italic">
            Premium Trial Active • Accessing all features
          </p>
        </div>
        <div className="hidden md:block opacity-20 absolute -right-4 -bottom-4">
          <CalendarCheck size={160} />
        </div>
        <button className="relative z-10 px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg">
          Upgrade Plan
        </button>
      </div>

      {/* --- 2. Stats Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-2xl ${stat.color}`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                stat.change.includes('+') ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- 3. Main Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Bookings List */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-xl font-black text-slate-900">Upcoming Appointments</h3>
            <button className="text-indigo-600 font-bold text-sm hover:underline">View Calendar</button>
          </div>
          <div className="divide-y divide-slate-50">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600">
                    {booking.customer.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{booking.customer}</p>
                    <p className="text-sm text-slate-500">{booking.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 text-sm">{booking.date}</p>
                  <span className={`text-[10px] uppercase font-black px-2 py-1 rounded-full ${
                    booking.status === 'Confirmed' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions / Shortcuts */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-4 rounded-2xl bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-100 transition-colors group">
                <CheckCircle2 size={18} className="group-hover:scale-110 transition-transform" />
                Add New Service
              </button>
              <button className="w-full flex items-center gap-3 p-4 rounded-2xl bg-slate-50 text-slate-700 font-bold hover:bg-slate-100 transition-colors group">
                <AlertCircle size={18} className="group-hover:scale-110 transition-transform" />
                Update Hours
              </button>
            </div>
          </div>

          <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-lg shadow-indigo-200">
            <p className="font-bold text-lg">Need Help?</p>
            <p className="text-indigo-100 text-sm mt-1">Our support team is available 24/7 for our premium owners.</p>
            <button className="mt-4 w-full py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-md">
              Chat With Support
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Overview;