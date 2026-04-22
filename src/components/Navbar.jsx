import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutGrid, 
  Zap, 
  Briefcase, 
  LogIn, 
  UserPlus,
  Sparkles,
  Menu,
  X 
} from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation Links with matching icons
  const navLinks = [
    { name: "Services", href: "/services", icon: <LayoutGrid size={18} /> },
    { name: "How it works", href: "/how-it-works", icon: <Zap size={18} /> },
    { name: "Professionals", href: "/professionals", icon: <Briefcase size={18} /> },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full z-[100] px-4 py-3 sm:px-6 lg:px-8"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border border-white/70 bg-white/80 px-4 py-2.5 shadow-[0_14px_40px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:px-5">
        
        {/* 1. Brand Logo */}
        <Link to="/" className="group flex items-center gap-3 text-decoration-none">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 shadow-lg shadow-indigo-200 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
            <span className="text-xl font-black italic text-white">B</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            Book<span className="text-indigo-500">iify</span>
          </span>
        </Link>

        {/* 2. Desktop Navigation Links (With Icons) */}
        <div className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="group relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-indigo-600"
            >
              <span className="opacity-70 transition-all duration-200 group-hover:scale-105 group-hover:opacity-100">
                {link.icon}
              </span>
              {link.name}
              <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-indigo-500 transition-transform duration-200 group-hover:scale-x-100"></span>
            </Link>
          ))}
        </div>

        {/* 3. Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 xl:inline-flex">
            <Sparkles size={14} className="mr-1.5" />
            AI-powered bookings
          </span>
          <Link 
            to="/login"
            className="hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 sm:flex"
          >
            <LogIn size={18} />
            Login
          </Link>
          
          <Link 
            to="/signup"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-300 px-3.5 py-2.5 text-sm font-black text-slate-900 shadow-md shadow-cyan-100 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-200 active:scale-95 sm:px-5"
          >
            <UserPlus size={16} />
            <span className="hidden sm:inline">Join as Owner</span>
            <span className="sm:hidden">Join</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="rounded-xl p-2 text-slate-900 transition-colors hover:bg-slate-100 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* 4. Mobile Dropdown Menu */}
      <div
        id="mobile-nav-menu"
        className={`absolute left-0 top-full w-full px-4 pt-2 lg:hidden ${
        isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
      }`}
      >
        <div className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-white/95 p-5 shadow-2xl shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 origin-top">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            to={link.href} 
            className="group flex items-center gap-3 rounded-xl px-2 py-1.5 text-base font-semibold text-slate-800 transition-colors hover:bg-slate-50 hover:text-indigo-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
              {link.icon}
            </div>
            {link.name}
          </Link>
        ))}
        <hr className="border-slate-100" />
        <div className="flex flex-col gap-4">
          <Link 
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 py-3.5 font-bold text-slate-900 transition-colors hover:bg-slate-200"
          >
            <LogIn size={20} />
            Login
          </Link>
          <Link 
            to="/signup"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition-transform hover:scale-[1.01]"
          >
            <UserPlus size={20} />
            Join as Owner
          </Link>
        </div>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;