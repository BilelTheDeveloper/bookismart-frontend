import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutGrid, 
  Zap, 
  Briefcase, 
  LogIn, 
  UserPlus,
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
      className="fixed top-0 left-0 w-full z-[100] transition-all duration-300 px-6 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-md py-3"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* 1. Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group cursor-pointer text-decoration-none">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <span className="text-white font-black text-xl italic">B</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Book<span className="text-indigo-500">iify</span>
          </span>
        </Link>

        {/* 2. Desktop Navigation Links (With Icons) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="flex items-center gap-2 text-sm font-bold transition-all relative group text-slate-600 hover:text-indigo-500"
            >
              <span className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all">
                {link.icon}
              </span>
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* 3. Action Buttons */}
        <div className="flex items-center gap-3">
          <Link 
            to="/login"
            className="hidden sm:flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-xl transition-all text-slate-700 hover:bg-slate-100"
          >
            <LogIn size={18} />
            Login
          </Link>
          
          <Link 
            to="/join-as-owner"
            className="flex items-center gap-2 bg-cyan-400 text-slate-900 px-6 py-2.5 rounded-full text-sm font-black hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-95 transition-all shadow-lg"
          >
            <UserPlus size={18} />
            Join as Owner
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* 4. Mobile Dropdown Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-6 transition-all duration-300 origin-top shadow-xl ${
        isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
      }`}>
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            to={link.href} 
            className="flex items-center gap-4 text-lg font-bold text-slate-900 hover:text-indigo-600 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
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
            className="w-full py-4 bg-slate-100 text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            Login
          </Link>
          <Link 
            to="/join-as-owner"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"
          >
            <UserPlus size={20} />
            Join as Owner
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;