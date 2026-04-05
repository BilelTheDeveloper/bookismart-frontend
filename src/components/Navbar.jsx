import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Add useLocation

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Detect which page we are on

  // Check if we are on the Home page
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "How it works", href: "/how-it-works" },
    { name: "Professionals", href: "/professionals" },
  ];

  // Logic for Dynamic Colors
  // If we are NOT on home, OR we have scrolled, use Dark Text/White BG
  const useDarkUI = !isHomePage || isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 py-4 ${
        useDarkUI
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* 1. Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group cursor-pointer text-decoration-none">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <span className="text-white font-black text-xl italic">B</span>
          </div>
          <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
            useDarkUI ? "text-slate-900" : "text-white"
          }`}>
            Booki<span className="text-indigo-500">smart</span>
          </span>
        </Link>

        {/* 2. Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm font-bold transition-all relative group ${
                useDarkUI ? "text-slate-600" : "text-slate-200"
              } hover:text-indigo-500`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* 3. Action Buttons */}
        <div className="flex items-center gap-3">
          <Link 
          to="/login"
          className={`hidden sm:block px-5 py-2 text-sm font-bold rounded-xl transition-all ${
            useDarkUI ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
          }`}>
            Login
          </Link>
          
          {/* Linked "Join as Owner" Button */}
          <Link 
            to="/join-as-owner"
            className="bg-cyan-400 text-slate-900 px-6 py-2.5 rounded-full text-sm font-black hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-95 transition-all shadow-lg"
          >
            Join as Owner
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-2 transition-colors ${useDarkUI ? "text-slate-900" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* 4. Mobile Dropdown Menu (Stays White) */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-6 transition-all duration-300 origin-top shadow-xl ${
        isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
      }`}>
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            to={link.href} 
            className="text-lg font-bold text-slate-900 hover:text-indigo-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        <hr className="border-slate-100" />
        <div className="flex flex-col gap-4">
          <Link 
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full py-4 bg-slate-100 text-slate-900 font-bold rounded-2xl text-center"
          >
            Login
          </Link>
          <Link 
            to="/join-as-owner"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full py-4 bg-indigo-600 text-center text-white font-bold rounded-2xl shadow-lg"
          >
            Join as Owner
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;