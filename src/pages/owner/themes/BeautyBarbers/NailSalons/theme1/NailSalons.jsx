import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  Sparkles,
  Heart,
  Camera,
  Calendar,
  ArrowRight
} from "lucide-react";

/* ─── CUSTOM SOCIAL SVG ICONS (unchanged) ───────────────────────────── */
const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

/* ─── GSAP + ScrollTrigger loader ────────────────────────────────────── */
function useGSAP(callback) {
  useEffect(() => {
    let gsapLoaded = false;
    let stLoaded = false;
    let gsapRef, stRef;

    const tryInit = () => {
      if (gsapLoaded && stLoaded) callback(gsapRef, stRef);
    };

    const gsapScript = document.createElement("script");
    gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    gsapScript.onload = () => {
      gsapRef = window.gsap;
      gsapLoaded = true;
      tryInit();
    };
    document.head.appendChild(gsapScript);

    const stScript = document.createElement("script");
    stScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
    stScript.onload = () => {
      stRef = window.ScrollTrigger;
      stLoaded = true;
      tryInit();
    };
    document.head.appendChild(stScript);

    return () => {
      document.head.removeChild(gsapScript);
      document.head.removeChild(stScript);
    };
  }, []);
}

/* ─── MAGNETIC BUTTON ───────────────────────────────────────────────── */
const MagneticBtn = ({ children, className = "", onClick }) => {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    el.style.transform = `translate(${x}px,${y}px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return (
    <button
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)" }}
    >
      {children}
    </button>
  );
};

/* ─── PARTICLE CANVAS ───────────────────────────────────────────────── */
const ParticleField = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.4 + 0.1,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251,113,133,${p.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}
    />
  );
};

/* ─── CURSOR GLOW ────────────────────────────────────────────────────── */
const CursorGlow = () => {
  const glowRef = useRef(null);
  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    let x = 0, y = 0, cx = 0, cy = 0;
    let raf;
    const move = (e) => { x = e.clientX; y = e.clientY; };
    window.addEventListener("mousemove", move);
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      cx = lerp(cx, x, 0.08);
      cy = lerp(cy, y, 0.08);
      el.style.transform = `translate(${cx - 150}px,${cy - 150}px)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={glowRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(251,113,133,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
      }}
    />
  );
};

/* ─── SCROLL REVEAL WRAPPER ──────────────────────────────────────────── */
const Reveal = ({ children, delay = 0, y = 60, className = "" }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
          el.style.opacity = "1";
          el.style.transform = "translate3d(0,0,0)";
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: `translate3d(0,${y}px,0)`, willChange: "opacity,transform" }}
    >
      {children}
    </div>
  );
};

/* ─── 3D TILT CARD ───────────────────────────────────────────────────── */
const TiltCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.03,1.03,1.03)`;
  };
  const handleLeave = () => {
    if (ref.current)
      ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  };
  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)", willChange: "transform" }}
    >
      {children}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT — backend data structure 100% preserved
═══════════════════════════════════════════════════════════════════════ */
const LuxeNailSalon = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const heroRef = useRef(null);
  const heroImgRef = useRef(null);
  const marqueeRef = useRef(null);

  if (!data) return null;
  const { hero, about, services, gallery, contact, businessHours, ownerId } = data;

  /* scroll listener */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      /* parallax hero image */
      if (heroImgRef.current) {
        heroImgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* GSAP horizontal scroll for marquee */
  useGSAP((gsap, ScrollTrigger) => {
    if (!marqueeRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(marqueeRef.current, {
      x: "-50%",
      ease: "none",
      scrollTrigger: {
        trigger: marqueeRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  });

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "The Studio", href: "#about" },
    { name: "Lookbook", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const marqueeWords = ["Luxury", "Precision", "Artistry", "Ritual", "Elegance", "Bespoke", "Couture", "Grace"];

  return (
    <>
      {/* injected global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .nail-root *, .nail-root *::before, .nail-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .nail-root { font-family: 'DM Sans', sans-serif; background: #0e0d0c; color: #e8e4df; overflow-x: hidden; }

        .serif { font-family: 'Cormorant Garamond', serif; }

        /* smooth scroll */
        html { scroll-behavior: smooth; }

        /* custom scrollbar */
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0e0d0c; }
        ::-webkit-scrollbar-thumb { background: #c9a88a; border-radius: 4px; }

        /* noise grain overlay */
        .nail-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 10000;
          opacity: 0.3;
        }

        /* NAV */
        .nav-glass {
          transition: all 0.7s cubic-bezier(0.16,1,0.3,1);
          background: transparent;
          padding-top: 2.5rem;
          padding-bottom: 2.5rem;
        }
        .nav-glass.scrolled {
          padding-top: 1rem;
          padding-bottom: 1rem;
          background: rgba(14,13,12,0.75);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(201,168,138,0.12);
        }

        /* HERO line animation */
        @keyframes lineGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .hero-line { transform-origin: left; animation: lineGrow 1.6s cubic-bezier(0.16,1,0.3,1) 0.8s both; }

        /* service card shine */
        .service-card {
          position: relative;
          overflow: hidden;
        }
        .service-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(transparent 0deg, rgba(201,168,138,0.04) 60deg, transparent 120deg);
          transform: rotate(0deg);
          transition: transform 1.2s cubic-bezier(0.23,1,0.32,1);
          pointer-events: none;
        }
        .service-card:hover::before { transform: rotate(180deg); }

        /* gallery item */
        .gallery-item {
          overflow: hidden;
          border-radius: 24px;
          break-inside: avoid;
          margin-bottom: 1.5rem;
        }
        .gallery-item img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 1.2s cubic-bezier(0.16,1,0.3,1);
        }
        .gallery-item:hover img { transform: scale(1.08); }

        /* marquee */
        .marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }

        /* mobile menu */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: #0e0d0c;
          z-index: 2000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          transform: translateX(100%);
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .mobile-overlay.open { transform: translateX(0); }

        /* split text char */
        .char {
          display: inline-block;
          opacity: 0;
          transform: translate3d(0, 40px, 0);
          animation: charIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes charIn {
          to { opacity: 1; transform: translate3d(0,0,0); }
        }

        /* counter number */
        @keyframes countUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .stat-num { animation: countUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }

        /* active nav link */
        .nav-link {
          position: relative;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(232,228,223,0.5);
          transition: color 0.3s;
          text-decoration: none;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 1px;
          background: #c9a88a;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .nav-link:hover { color: #c9a88a; }
        .nav-link:hover::after { transform: scaleX(1); transform-origin: left; }

        /* hero badge pulse */
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,138,0.3); }
          50% { box-shadow: 0 0 0 8px rgba(201,168,138,0); }
        }
        .badge-pulse { animation: badgePulse 2.5s ease infinite; }

        /* shimmer button */
        .btn-primary {
          position: relative;
          overflow: hidden;
          background: #c9a88a;
          color: #0e0d0c;
          border: none;
          border-radius: 100px;
          padding: 1.1rem 2.4rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          transition: left 0.55s ease;
        }
        .btn-primary:hover::after { left: 160%; }
        .btn-primary:hover { background: #b8956e; }
        .btn-primary:active { transform: scale(0.97); }

        .btn-ghost {
          background: transparent;
          color: #e8e4df;
          border: 1px solid rgba(232,228,223,0.2);
          border-radius: 100px;
          padding: 1.1rem 2.4rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.3s, color 0.3s;
        }
        .btn-ghost:hover { border-color: #c9a88a; color: #c9a88a; }

        /* hours row */
        .hours-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.7rem 0;
          border-bottom: 1px solid rgba(232,228,223,0.06);
          font-size: 13px;
        }

        /* pill tag */
        .pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          border: 1px solid rgba(201,168,138,0.25);
          border-radius: 100px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c9a88a;
        }

        /* gold line */
        .gold-line {
          width: 40px;
          height: 1px;
          background: #c9a88a;
          display: block;
        }

        @media (max-width: 768px) {
          .hero-title { font-size: clamp(3.5rem, 12vw, 7rem) !important; }
          .hero-glass { padding: 2.5rem !important; border-radius: 24px !important; }
          .section-title { font-size: clamp(2.5rem, 9vw, 5rem) !important; }
        }
      `}</style>

      <div className="nail-root">
        <CursorGlow />

        {/* ══ MOBILE MENU ══ */}
        <div className={`mobile-overlay ${mobileMenuOpen ? "open" : ""}`}>
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{ position: "absolute", top: "2rem", right: "2rem", color: "#e8e4df", background: "none", border: "none", cursor: "pointer" }}
          >
            <X size={28} strokeWidth={1.5} />
          </button>
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="serif"
              style={{
                fontSize: "clamp(2.5rem,8vw,4rem)",
                fontStyle: "italic",
                color: "#e8e4df",
                textDecoration: "none",
                opacity: 0,
                animation: mobileMenuOpen ? `charIn 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 80 + 100}ms forwards` : "none",
              }}
            >
              {link.name}
            </a>
          ))}
          <div style={{ display: "flex", gap: "1.5rem", marginTop: "2rem" }}>
            {contact?.socials?.instagram && (
              <a href={contact.socials.instagram} style={{ color: "#c9a88a" }}><InstagramIcon size={24} /></a>
            )}
            {contact?.socials?.tiktok && (
              <a href={contact.socials.tiktok} style={{ color: "#c9a88a" }}><TikTokIcon size={24} /></a>
            )}
          </div>
        </div>

        {/* ══ NAV ══ */}
        <nav className={`nav-glass ${isScrolled ? "scrolled" : ""}`} style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                border: "1px solid rgba(201,168,138,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "#c9a88a",
              }}>
                {ownerId?.businessName?.charAt(0) || "L"}
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#e8e4df", lineHeight: 1 }}>
                  {ownerId?.businessName || "Luxe Polish"}
                </div>
                <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a88a", marginTop: 2 }}>
                  Nail Artistry
                </div>
              </div>
            </div>

            {/* desktop links */}
            <div style={{ display: "none", alignItems: "center", gap: "3rem" }} className="desktop-nav"
              ref={el => { if (el) el.style.display = window.innerWidth >= 1024 ? "flex" : "none"; }}>
              {navLinks.map(link => (
                <a key={link.name} href={link.href} className="nav-link">{link.name}</a>
              ))}
              <MagneticBtn className="btn-primary">Request Appointment</MagneticBtn>
            </div>

            <button
              onClick={() => setMobileMenuOpen(true)}
              style={{ background: "none", border: "none", color: "#e8e4df", cursor: "pointer", display: "block" }}
            >
              <Menu size={26} strokeWidth={1.5} />
            </button>
          </div>
        </nav>

        {/* ══ HERO ══ */}
        <section ref={heroRef} style={{ position: "relative", height: "100svh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
          <ParticleField />

          {/* parallax background */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <div
              ref={heroImgRef}
              style={{
                position: "absolute",
                inset: "-15%",
                backgroundImage: `url(${hero?.backgroundImage || "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1974&auto=format&fit=crop"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                willChange: "transform",
              }}
            />
            {/* dark gradient */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,13,12,0.95) 0%, rgba(14,13,12,0.4) 50%, rgba(14,13,12,0.2) 100%)" }} />
          </div>

          {/* floating badge top-right */}
          <div style={{ position: "absolute", top: "8rem", right: "2rem", zIndex: 10 }}>
            <Reveal delay={1200}>
              <div className="badge-pulse" style={{
                width: 110, height: 110, borderRadius: "50%",
                border: "1px solid rgba(201,168,138,0.3)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                textAlign: "center", gap: 4,
              }}>
                <Sparkles size={16} color="#c9a88a" />
                <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a88a" }}>
                  {ownerId?.ville || "Sfax"}
                </div>
                <div style={{ fontSize: "8px", color: "rgba(232,228,223,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Est. 2024
                </div>
              </div>
            </Reveal>
          </div>

          {/* hero content */}
          <div style={{ position: "relative", zIndex: 5, width: "100%", maxWidth: "1400px", margin: "0 auto", padding: "0 2rem 5rem" }}>
            <Reveal y={30} delay={200}>
              <div className="pill" style={{ marginBottom: "1.5rem" }}>
                <Sparkles size={12} />
                Premium Nail Studio
              </div>
            </Reveal>

            <h1
              className="hero-title serif"
              style={{ fontSize: "clamp(4rem,10vw,9rem)", fontStyle: "italic", fontWeight: 300, lineHeight: 0.9, marginBottom: "1.5rem", color: "#e8e4df" }}
            >
              {(hero?.title || "The Art of Detail.").split("").map((char, i) => (
                <span
                  key={i}
                  className="char"
                  style={{ animationDelay: `${i * 30 + 400}ms` }}
                >
                  {char === " " ? "\u00a0" : char}
                </span>
              ))}
            </h1>

            <div className="hero-line" style={{ height: 1, background: "rgba(201,168,138,0.4)", marginBottom: "1.5rem" }} />

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem" }}>
              <Reveal delay={900}>
                <p style={{ fontSize: "clamp(0.95rem,2vw,1.15rem)", color: "rgba(232,228,223,0.6)", maxWidth: 480, lineHeight: 1.7, fontWeight: 300 }}>
                  {hero?.slogan || "Elevating nail care into a ritual of luxury. Bespoke designs for the modern visionary."}
                </p>
              </Reveal>
              <Reveal delay={1100}>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <MagneticBtn className="btn-primary">Book Ritual</MagneticBtn>
                  <button className="btn-ghost">View Lookbook</button>
                </div>
              </Reveal>
            </div>

            {/* stats bar */}
            <Reveal delay={1300}>
              <div style={{
                display: "flex", gap: "3rem", marginTop: "3.5rem",
                paddingTop: "2rem", borderTop: "1px solid rgba(232,228,223,0.08)",
                flexWrap: "wrap",
              }}>
                {[["500+", "Clients"], ["98%", "Satisfaction"], ["5★", "Average Rating"]].map(([num, label]) => (
                  <div key={label}>
                    <div className="serif stat-num" style={{ fontSize: "2.2rem", fontStyle: "italic", color: "#c9a88a", lineHeight: 1 }}>{num}</div>
                    <div style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,228,223,0.35)", marginTop: 4 }}>{label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* scroll indicator */}
          <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(232,228,223,0.3)" }}>Scroll</div>
            <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, rgba(201,168,138,0.6), transparent)", animation: "lineGrow 1s ease infinite alternate" }} />
          </div>
        </section>

        {/* ══ MARQUEE ══ */}
        <div style={{ overflow: "hidden", padding: "2.5rem 0", borderTop: "1px solid rgba(232,228,223,0.06)", borderBottom: "1px solid rgba(232,228,223,0.06)", background: "#080807" }}>
          <div ref={marqueeRef} className="marquee-track">
            {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="serif" style={{
                fontSize: "clamp(1.8rem,4vw,3rem)", fontStyle: "italic", fontWeight: 300,
                color: i % 2 === 0 ? "#c9a88a" : "rgba(232,228,223,0.15)",
                marginRight: "3rem", whiteSpace: "nowrap", letterSpacing: "0.05em",
              }}>
                {word} <span style={{ fontSize: "0.4em", verticalAlign: "middle", color: "rgba(201,168,138,0.3)" }}>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ══ SERVICES ══ */}
        <section id="services" style={{ padding: "8rem 0", background: "#0e0d0c" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "5rem" }}>
              <Reveal>
                <span className="gold-line" style={{ marginBottom: "1.5rem" }} />
              </Reveal>
              <Reveal delay={100}>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase", color: "#c9a88a", marginBottom: "1rem" }}>
                  The Atelier
                </div>
              </Reveal>
              <Reveal delay={200}>
                <h2 className="serif section-title" style={{ fontSize: "clamp(3rem,7vw,6rem)", fontStyle: "italic", fontWeight: 300, color: "#e8e4df", lineHeight: 0.95 }}>
                  Curated<br /><em style={{ color: "#c9a88a" }}>Services</em>
                </h2>
              </Reveal>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {services.filter(s => s.active).map((service, idx) => (
                <Reveal key={idx} delay={idx * 100}>
                  <TiltCard>
                    <div
                      className="service-card"
                      onMouseEnter={() => setActiveService(idx)}
                      onMouseLeave={() => setActiveService(null)}
                      style={{
                        padding: "2.5rem",
                        background: activeService === idx ? "rgba(201,168,138,0.06)" : "rgba(232,228,223,0.03)",
                        border: `1px solid ${activeService === idx ? "rgba(201,168,138,0.25)" : "rgba(232,228,223,0.07)"}`,
                        borderRadius: "24px",
                        transition: "background 0.4s, border-color 0.4s",
                        cursor: "pointer",
                        height: "100%",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
                        <div style={{
                          width: 44, height: 44,
                          background: activeService === idx ? "#c9a88a" : "rgba(201,168,138,0.1)",
                          borderRadius: "12px",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: activeService === idx ? "#0e0d0c" : "#c9a88a",
                          transition: "all 0.4s",
                        }}>
                          <Heart size={18} strokeWidth={1.5} />
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <span className="serif" style={{ fontSize: "2rem", fontStyle: "italic", color: "#c9a88a" }}>{service.price}</span>
                          <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,228,223,0.3)", display: "block" }}>Tnd</span>
                        </div>
                      </div>
                      <h4 style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#e8e4df", marginBottom: "0.75rem" }}>
                        {service.title}
                      </h4>
                      <p style={{ fontSize: "13px", color: "rgba(232,228,223,0.45)", lineHeight: 1.7, marginBottom: "1.5rem" }}>{service.description}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a88a", transition: "gap 0.3s" }}>
                        Reserve Now <ArrowRight size={12} style={{ transition: "transform 0.3s", transform: activeService === idx ? "translateX(4px)" : "none" }} />
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ ABOUT ══ */}
        {about?.show && (
          <section id="about" style={{ padding: "8rem 0", background: "#080807", overflow: "hidden" }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: "5rem", alignItems: "center" }}>

              {/* image block */}
              <Reveal y={40}>
                <div style={{ position: "relative" }}>
                  {/* decorative frame */}
                  <div style={{
                    position: "absolute", top: "-1.5rem", left: "-1.5rem",
                    right: "1.5rem", bottom: "1.5rem",
                    border: "1px solid rgba(201,168,138,0.2)", borderRadius: "32px",
                    zIndex: 0,
                  }} />
                  <div style={{ position: "relative", borderRadius: "28px", overflow: "hidden", aspectRatio: "4/5", zIndex: 1 }}>
                    <img
                      src={about?.image || "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=2070&auto=format&fit=crop"}
                      alt="Studio"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1)" }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,7,0.4), transparent)" }} />
                  </div>
                  {/* floating card */}
                  <div style={{
                    position: "absolute", bottom: "-2rem", right: "-2rem", zIndex: 2,
                    background: "#c9a88a", borderRadius: "20px", padding: "1.5rem 2rem",
                    color: "#0e0d0c",
                  }}>
                    <div className="serif" style={{ fontSize: "2.5rem", fontStyle: "italic", fontWeight: 300, lineHeight: 1 }}>5★</div>
                    <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 4 }}>Rated Studio</div>
                  </div>
                </div>
              </Reveal>

              {/* text */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <Reveal delay={100}>
                  <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.45em", textTransform: "uppercase", color: "#c9a88a" }}>The Philosophy</span>
                </Reveal>
                <Reveal delay={200}>
                  <h2 className="serif section-title" style={{ fontSize: "clamp(2.8rem,6vw,5.5rem)", fontStyle: "italic", fontWeight: 300, color: "#e8e4df", lineHeight: 1.05 }}>
                    {about?.title || "Pure Elegance, Defined."}
                  </h2>
                </Reveal>
                <Reveal delay={300}>
                  <blockquote style={{
                    borderLeft: "2px solid #c9a88a",
                    paddingLeft: "1.5rem",
                    fontStyle: "italic",
                    fontSize: "1.1rem",
                    color: "rgba(232,228,223,0.6)",
                    lineHeight: 1.8,
                    fontWeight: 300,
                  }}>
                    "{about?.text || "We believe your hands are your most powerful accessory. In our studio, we blend health-first practices with avant-garde artistry."}"
                  </blockquote>
                </Reveal>
                <Reveal delay={400}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", paddingTop: "1rem" }}>
                    {[["Health First", "Medical-grade sterilization and premium toxin-free polishes only."],
                      ["Artistry", "Each set is a hand-painted masterpiece tailored to your vibe."]].map(([title, desc]) => (
                        <div key={title}>
                          <div style={{ width: 24, height: 1, background: "#c9a88a", marginBottom: "0.75rem" }} />
                          <h5 style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e8e4df", marginBottom: "0.5rem" }}>{title}</h5>
                          <p style={{ fontSize: "12px", color: "rgba(232,228,223,0.4)", lineHeight: 1.7 }}>{desc}</p>
                        </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        )}

        {/* ══ GALLERY ══ */}
        {gallery?.show && gallery?.images?.length > 0 && (
          <section id="gallery" style={{ padding: "8rem 0", background: "#0e0d0c" }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", gap: "2rem" }}>
                <Reveal>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <Camera size={18} color="#c9a88a" />
                      <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(232,228,223,0.35)" }}>Captured Work</span>
                    </div>
                    <h2 className="serif section-title" style={{ fontSize: "clamp(3rem,7vw,6rem)", fontStyle: "italic", fontWeight: 300, color: "#e8e4df", lineHeight: 0.95 }}>
                      The Lookbook
                    </h2>
                  </div>
                </Reveal>
                <Reveal delay={200}>
                  <p style={{ fontSize: "13px", color: "rgba(232,228,223,0.35)", maxWidth: 260, textAlign: "right", lineHeight: 1.7 }}>
                    A curated collection of bespoke designs and signature styles.
                  </p>
                </Reveal>
              </div>

              <div style={{ columns: "1", columnGap: "1.5rem" }}
                ref={el => {
                  if (el) {
                    if (window.innerWidth >= 1024) el.style.columns = "3";
                    else if (window.innerWidth >= 640) el.style.columns = "2";
                    else el.style.columns = "1";
                  }
                }}>
                {gallery.images.map((img, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <div className="gallery-item" style={{ position: "relative" }}>
                      <img src={img} alt={`Design ${i + 1}`} />
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "rgba(14,13,12,0)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "background 0.4s",
                        borderRadius: 24,
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(14,13,12,0.5)"; e.currentTarget.querySelector("span").style.opacity = "1"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(14,13,12,0)"; e.currentTarget.querySelector("span").style.opacity = "0"; }}
                      >
                        <span style={{
                          padding: "0.5rem 1.25rem", background: "rgba(201,168,138,0.95)",
                          borderRadius: "100px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em",
                          textTransform: "uppercase", color: "#0e0d0c", opacity: 0, transition: "opacity 0.3s",
                          pointerEvents: "none",
                        }}>
                          View Detail
                        </span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══ FOOTER / CONTACT ══ */}
        <footer id="contact" style={{ background: "#080807", paddingTop: "8rem", paddingBottom: "4rem", borderTop: "1px solid rgba(232,228,223,0.06)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: "4rem", alignItems: "start" }}>

              {/* brand + contact */}
              <Reveal>
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  <div>
                    <div className="serif" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontStyle: "italic", fontWeight: 300, color: "#e8e4df", lineHeight: 1.1 }}>
                      {ownerId?.businessName || "Luxe Polish"}
                    </div>
                    <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a88a", marginTop: 4 }}>
                      Luxury Nail Studio
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                      <div style={{ width: 36, height: 36, border: "1px solid rgba(201,168,138,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#c9a88a", flexShrink: 0 }}>
                        <MapPin size={16} />
                      </div>
                      <p style={{ fontSize: "14px", color: "rgba(232,228,223,0.5)", lineHeight: 1.6 }}>{contact?.address || "Ennasr II, Tunis"}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ width: 36, height: 36, border: "1px solid rgba(201,168,138,0.2)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#c9a88a", flexShrink: 0 }}>
                        <Phone size={16} />
                      </div>
                      <p className="serif" style={{ fontSize: "1.6rem", fontStyle: "italic", color: "#e8e4df" }}>{contact?.phone}</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    {contact?.socials?.instagram && (
                      <a href={contact.socials.instagram} style={{
                        width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(201,168,138,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#c9a88a", textDecoration: "none", transition: "background 0.3s, border-color 0.3s",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#c9a88a"; e.currentTarget.style.color = "#0e0d0c"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c9a88a"; }}
                      >
                        <InstagramIcon size={18} />
                      </a>
                    )}
                    {contact?.socials?.tiktok && (
                      <a href={contact.socials.tiktok} style={{
                        width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(201,168,138,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#c9a88a", textDecoration: "none", transition: "background 0.3s, border-color 0.3s",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#c9a88a"; e.currentTarget.style.color = "#0e0d0c"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c9a88a"; }}
                      >
                        <TikTokIcon size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>

              {/* hours */}
              <Reveal delay={150}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
                    <Clock size={16} color="#c9a88a" />
                    <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", color: "#c9a88a" }}>Opening Hours</span>
                  </div>
                  <div>
                    {businessHours.map((h, i) => (
                      <div key={i} className="hours-row">
                        <span style={{ fontSize: "13px", color: h.isClosed ? "rgba(232,228,223,0.25)" : "rgba(232,228,223,0.55)", fontWeight: 400 }}>{h.day}</span>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: h.isClosed ? "rgba(201,168,138,0.4)" : "#c9a88a", letterSpacing: "0.05em" }}>
                          {h.isClosed ? "Closed" : `${h.open} — ${h.close}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* booking CTA */}
              <Reveal delay={300}>
                <div style={{
                  background: "rgba(201,168,138,0.05)",
                  border: "1px solid rgba(201,168,138,0.15)",
                  borderRadius: "28px",
                  padding: "2.5rem",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* glow */}
                  <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(201,168,138,0.08)", filter: "blur(40px)", pointerEvents: "none" }} />

                  <Calendar size={36} color="#c9a88a" strokeWidth={1.5} style={{ marginBottom: "1.5rem" }} />
                  <h4 className="serif" style={{ fontSize: "2rem", fontStyle: "italic", fontWeight: 300, color: "#e8e4df", marginBottom: "1rem", lineHeight: 1.2 }}>
                    Join our guest list.
                  </h4>
                  <p style={{ fontSize: "13px", color: "rgba(232,228,223,0.4)", lineHeight: 1.7, marginBottom: "2rem" }}>
                    Experience the pinnacle of Tunisian nail artistry. Instant confirmation for all online bookings.
                  </p>
                  <MagneticBtn className="btn-primary" style={{ width: "100%" }}>
                    Secure Your Spot
                  </MagneticBtn>
                </div>
              </Reveal>

            </div>

            {/* bottom bar */}
            <div style={{ marginTop: "5rem", paddingTop: "2rem", borderTop: "1px solid rgba(232,228,223,0.06)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
              <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,228,223,0.2)" }}>
                © 2026 {ownerId?.businessName} · Digital Curation by Bookiify.tn
              </p>
              <div style={{ display: "flex", gap: "2rem" }}>
                {["Privacy Policy", "Terms of Ritual"].map(t => (
                  <span key={t} style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,228,223,0.2)", cursor: "pointer" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LuxeNailSalon;