import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Mail, Globe, ArrowUpRight, Play, ChevronDown } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   HOOKS
   ───────────────────────────────────────────────────────────────────────────── */

const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("cm-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".cm-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const useParallax = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.querySelectorAll("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
};

const useMagneticCursor = () => {
  useEffect(() => {
    const cursor = document.querySelector(".cm-cursor");
    const dot = document.querySelector(".cm-cursor-dot");
    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0, curX = 0, curY = 0;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const lerp = () => {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      cursor.style.transform = `translate(${curX}px, ${curY}px)`;
      requestAnimationFrame(lerp);
    };

    window.addEventListener("mousemove", move, { passive: true });
    const raf = requestAnimationFrame(lerp);

    const hoverable = document.querySelectorAll("a, button, .cm-tilt");
    hoverable.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("cm-cursor-hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("cm-cursor-hover"));
    });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
};

/* ─────────────────────────────────────────────────────────────────────────────
   3D TILT CARD
   ───────────────────────────────────────────────────────────────────────────── */
const TiltCard = ({ children, className = "", intensity = 12 }) => {
  const ref = useRef(null);

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `
      perspective(1000px)
      rotateY(${x * intensity}deg)
      rotateX(${-y * intensity}deg)
      translateZ(10px)
    `;
    ref.current.style.transition = "transform 0.1s ease";
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
    ref.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
  };

  return (
    <div
      ref={ref}
      className={`cm-tilt ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   FLOATING SCROLL INDICATOR
   ───────────────────────────────────────────────────────────────────────────── */
const ScrollIndicator = () => (
  <div className="cm-scroll-indicator">
    <span className="cm-scroll-text">Scroll</span>
    <div className="cm-scroll-line">
      <div className="cm-scroll-thumb" />
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────────────────── */
const CreativeMediaTheme = ({ data }) => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [activeService, setActiveService] = useState(null);

  useScrollAnimation();
  useParallax();
  useMagneticCursor();

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (!data) return null;
  const { ownerId, hero, about, services, gallery, contact, businessHours, setupConfig } = data;
  const activeServices = (services || []).filter((s) => s?.active !== false);
  const images = (gallery?.images || []).filter(Boolean);
  const pauses = setupConfig?.pauseWindows || [];

  const heroImage = hero?.backgroundImage || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop";

  return (
    <>
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .cm-root {
          min-height: 100vh;
          background: #080808;
          color: #e8e4dc;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
          cursor: none;
        }

        /* ── CUSTOM CURSOR ── */
        .cm-cursor {
          position: fixed;
          top: -20px; left: -20px;
          width: 40px; height: 40px;
          border: 1px solid rgba(210, 185, 140, 0.6);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: width 0.3s, height 0.3s, border-color 0.3s, background 0.3s;
          mix-blend-mode: difference;
        }
        .cm-cursor-dot {
          position: fixed;
          top: -3px; left: -3px;
          width: 6px; height: 6px;
          background: #d2b98c;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
        }
        .cm-cursor-hover {
          width: 60px; height: 60px;
          background: rgba(210, 185, 140, 0.08);
          border-color: #d2b98c;
        }

        /* ── SCROLL REVEAL ANIMATIONS ── */
        .cm-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cm-reveal.cm-delay-1 { transition-delay: 0.1s; }
        .cm-reveal.cm-delay-2 { transition-delay: 0.2s; }
        .cm-reveal.cm-delay-3 { transition-delay: 0.35s; }
        .cm-reveal.cm-delay-4 { transition-delay: 0.5s; }
        .cm-reveal.cm-delay-5 { transition-delay: 0.65s; }
        .cm-reveal.cm-visible { opacity: 1; transform: translateY(0); }

        .cm-reveal-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cm-reveal-left.cm-visible { opacity: 1; transform: translateX(0); }

        .cm-reveal-right {
          opacity: 0;
          transform: translateX(50px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cm-reveal-right.cm-visible { opacity: 1; transform: translateX(0); }

        .cm-reveal-scale {
          opacity: 0;
          transform: scale(0.92);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cm-reveal-scale.cm-visible { opacity: 1; transform: scale(1); }

        /* ── HERO ── */
        .cm-hero {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .cm-hero-bg {
          position: absolute;
          inset: -20% 0;
          background-size: cover;
          background-position: center;
          will-change: transform;
        }
        .cm-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(8,8,8,0.3) 0%,
            rgba(8,8,8,0.1) 40%,
            rgba(8,8,8,0.7) 75%,
            rgba(8,8,8,1) 100%
          );
        }
        .cm-hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 48px 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s,
                      transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
        }
        .cm-hero-content.cm-loaded {
          opacity: 1;
          transform: translateY(0);
        }
        .cm-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #d2b98c;
          margin-bottom: 28px;
        }
        .cm-hero-eyebrow::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: #d2b98c;
        }
        .cm-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(52px, 8vw, 110px);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.02em;
          color: #f0ece4;
          max-width: 900px;
        }
        .cm-hero-title em {
          font-style: italic;
          color: #d2b98c;
        }
        .cm-hero-sub {
          margin-top: 28px;
          font-size: 16px;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(232, 228, 220, 0.65);
          max-width: 480px;
        }
        .cm-hero-actions {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-top: 48px;
        }
        .cm-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          background: #d2b98c;
          color: #080808;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: none;
          transition: background 0.3s, transform 0.3s, gap 0.3s;
        }
        .cm-btn-primary:hover {
          background: #e8d4b0;
          gap: 16px;
        }
        .cm-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 0;
          background: none;
          border: none;
          color: rgba(232, 228, 220, 0.6);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: none;
          text-decoration: none;
          transition: color 0.3s, gap 0.3s;
          border-bottom: 1px solid rgba(232, 228, 220, 0.2);
        }
        .cm-btn-ghost:hover {
          color: #e8e4dc;
          gap: 14px;
        }

        /* ── SCROLL INDICATOR ── */
        .cm-scroll-indicator {
          position: absolute;
          bottom: 48px;
          right: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          z-index: 3;
        }
        .cm-scroll-text {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(232, 228, 220, 0.4);
          writing-mode: vertical-rl;
        }
        .cm-scroll-line {
          width: 1px;
          height: 80px;
          background: rgba(232, 228, 220, 0.15);
          position: relative;
          overflow: hidden;
        }
        .cm-scroll-thumb {
          position: absolute;
          top: 0;
          width: 100%;
          height: 40%;
          background: #d2b98c;
          animation: cm-scroll-drop 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes cm-scroll-drop {
          0% { transform: translateY(-100%); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(250%); opacity: 0; }
        }

        /* ── STATS BAND ── */
        .cm-stats-band {
          border-top: 1px solid rgba(232, 228, 220, 0.06);
          border-bottom: 1px solid rgba(232, 228, 220, 0.06);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          overflow: hidden;
        }
        .cm-stat-cell {
          padding: 40px 48px;
          border-right: 1px solid rgba(232, 228, 220, 0.06);
          transition: background 0.4s;
        }
        .cm-stat-cell:last-child { border-right: none; }
        .cm-stat-cell:hover { background: rgba(210, 185, 140, 0.04); }
        .cm-stat-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(232, 228, 220, 0.35);
          margin-bottom: 8px;
        }
        .cm-stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 700;
          color: #d2b98c;
        }

        /* ── SECTION TYPOGRAPHY ── */
        .cm-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 48px;
        }
        .cm-section-eyebrow {
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #d2b98c;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .cm-section-eyebrow::after {
          content: '';
          flex: 0 0 40px;
          height: 1px;
          background: #d2b98c;
        }
        .cm-section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #f0ece4;
        }

        /* ── SERVICES ── */
        .cm-services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: rgba(232, 228, 220, 0.06);
          margin-top: 64px;
        }
        .cm-service-card {
          background: #080808;
          padding: 48px;
          cursor: none;
          transition: background 0.4s;
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
        }
        .cm-service-card::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, #d2b98c, transparent);
          transform: scaleX(0);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cm-service-card:hover { background: rgba(210, 185, 140, 0.03); }
        .cm-service-card:hover::before { transform: scaleX(1); }
        .cm-service-number {
          font-family: 'Playfair Display', serif;
          font-size: 64px;
          font-weight: 900;
          color: rgba(210, 185, 140, 0.08);
          line-height: 1;
          margin-bottom: 24px;
          transition: color 0.4s;
        }
        .cm-service-card:hover .cm-service-number {
          color: rgba(210, 185, 140, 0.15);
        }
        .cm-service-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .cm-service-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #f0ece4;
          line-height: 1.2;
          flex: 1;
        }
        .cm-service-price {
          font-size: 13px;
          font-weight: 500;
          color: #d2b98c;
          letter-spacing: 0.05em;
          flex-shrink: 0;
          padding: 6px 14px;
          border: 1px solid rgba(210, 185, 140, 0.3);
          margin-left: 16px;
        }
        .cm-service-desc {
          font-size: 14px;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(232, 228, 220, 0.5);
        }

        /* ── GALLERY ── */
        .cm-gallery-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: auto;
          gap: 4px;
          margin-top: 64px;
        }
        .cm-gallery-item {
          overflow: hidden;
          position: relative;
        }
        .cm-gallery-item:nth-child(1) { grid-column: span 7; grid-row: span 2; }
        .cm-gallery-item:nth-child(2) { grid-column: span 5; }
        .cm-gallery-item:nth-child(3) { grid-column: span 5; }
        .cm-gallery-item:nth-child(4) { grid-column: span 4; }
        .cm-gallery-item:nth-child(5) { grid-column: span 4; }
        .cm-gallery-item:nth-child(6) { grid-column: span 4; }
        .cm-gallery-item:nth-child(n+7) { grid-column: span 3; }
        .cm-gallery-img {
          width: 100%;
          height: 100%;
          min-height: 260px;
          object-fit: cover;
          display: block;
          transform: scale(1.05);
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          filter: grayscale(20%);
        }
        .cm-gallery-item:hover .cm-gallery-img {
          transform: scale(1.12);
          filter: grayscale(0%);
        }
        .cm-gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(8,8,8,0.5), transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .cm-gallery-item:hover .cm-gallery-overlay { opacity: 1; }

        /* ── ABOUT ── */
        .cm-about-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 120px;
          align-items: center;
        }
        .cm-about-image-wrap {
          position: relative;
        }
        .cm-about-img {
          width: 100%;
          aspect-ratio: 3/4;
          object-fit: cover;
          display: block;
        }
        .cm-about-img-accent {
          position: absolute;
          bottom: -20px;
          right: -20px;
          width: 60%;
          aspect-ratio: 1;
          border: 1px solid rgba(210, 185, 140, 0.2);
          z-index: -1;
        }
        .cm-about-body {
          font-size: 16px;
          font-weight: 300;
          line-height: 1.85;
          color: rgba(232, 228, 220, 0.6);
        }

        /* ── HOURS ── */
        .cm-hours-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1px;
          background: rgba(232, 228, 220, 0.06);
          margin-top: 40px;
        }
        .cm-hour-cell {
          background: #080808;
          padding: 28px 32px;
          transition: background 0.3s;
        }
        .cm-hour-cell:hover { background: rgba(210, 185, 140, 0.04); }
        .cm-hour-day {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(232, 228, 220, 0.3);
          margin-bottom: 8px;
        }
        .cm-hour-time {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          color: #f0ece4;
        }
        .cm-hour-closed {
          font-size: 12px;
          font-weight: 400;
          color: rgba(210, 185, 140, 0.4);
          letter-spacing: 0.1em;
        }

        /* ── FOOTER ── */
        .cm-footer {
          border-top: 1px solid rgba(232, 228, 220, 0.06);
        }
        .cm-footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 64px;
          padding: 80px 48px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .cm-footer-brand {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 900;
          color: #f0ece4;
          margin-bottom: 20px;
          line-height: 1;
        }
        .cm-footer-tagline {
          font-size: 13px;
          font-weight: 300;
          color: rgba(232, 228, 220, 0.4);
          line-height: 1.7;
          max-width: 280px;
        }
        .cm-footer-col-title {
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(232, 228, 220, 0.3);
          margin-bottom: 24px;
        }
        .cm-footer-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          font-size: 13px;
          font-weight: 300;
          color: rgba(232, 228, 220, 0.6);
        }
        .cm-footer-contact-icon {
          width: 32px;
          height: 32px;
          border: 1px solid rgba(210, 185, 140, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #d2b98c;
        }
        .cm-footer-bottom {
          border-top: 1px solid rgba(232, 228, 220, 0.06);
          padding: 24px 48px;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .cm-footer-copy {
          font-size: 11px;
          color: rgba(232, 228, 220, 0.2);
          letter-spacing: 0.05em;
        }

        /* ── PAUSE WINDOWS ── */
        .cm-pause-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(232, 228, 220, 0.05);
          font-size: 13px;
          font-weight: 300;
          color: rgba(232, 228, 220, 0.4);
        }
        .cm-pause-row:last-child { border-bottom: none; }
        .cm-pause-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(210, 185, 140, 0.4);
          flex-shrink: 0;
        }

        /* ── BOOKING CTA SECTION ── */
        .cm-cta-section {
          background: #d2b98c;
          padding: 100px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
          max-width: 100%;
        }
        .cm-cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 900;
          line-height: 1.05;
          color: #080808;
          max-width: 600px;
        }
        .cm-cta-title em { font-style: italic; }
        .cm-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 20px 48px;
          background: #080808;
          color: #d2b98c;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          flex-shrink: 0;
          transition: gap 0.3s, background 0.3s;
          cursor: none;
        }
        .cm-cta-btn:hover {
          gap: 20px;
          background: #1a1a1a;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .cm-hero-content { padding: 0 24px 64px; }
          .cm-section { padding: 0 24px; }
          .cm-stats-band { grid-template-columns: repeat(2, 1fr); }
          .cm-stat-cell { padding: 28px 24px; }
          .cm-services-grid { grid-template-columns: 1fr; }
          .cm-gallery-grid { grid-template-columns: repeat(6, 1fr); }
          .cm-gallery-item:nth-child(1) { grid-column: span 6; }
          .cm-gallery-item:nth-child(n+2) { grid-column: span 3; }
          .cm-about-layout { grid-template-columns: 1fr; gap: 48px; }
          .cm-footer-top { grid-template-columns: 1fr; gap: 40px; padding: 48px 24px; }
          .cm-footer-bottom { padding: 20px 24px; flex-direction: column; gap: 12px; }
          .cm-cta-section { flex-direction: column; padding: 64px 24px; }
          .cm-scroll-indicator { display: none; }
          .cm-cursor, .cm-cursor-dot { display: none; }
          .cm-root { cursor: auto; }
          a, button { cursor: pointer !important; }
        }
      `}</style>

      {/* ── CUSTOM CURSOR ── */}
      <div className="cm-cursor" />
      <div className="cm-cursor-dot" />

      <div className="cm-root">

        {/* ════════════════════════════════════════════════
            HERO
            ════════════════════════════════════════════════ */}
        <section className="cm-hero">
          <div
            className="cm-hero-bg"
            data-parallax="0.35"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="cm-hero-overlay" />

          <div className={`cm-hero-content ${heroLoaded ? "cm-loaded" : ""}`}>
            <div className="cm-hero-eyebrow">Creative & Media</div>
            <h1 className="cm-hero-title">
              {hero?.title
                ? hero.title
                : <><em>Create.</em> Capture.<br />Publish.</>
              }
            </h1>
            <p className="cm-hero-sub">
              {hero?.slogan || "From concept to delivery, your story deserves premium production."}
            </p>
            <div className="cm-hero-actions">
              <Link to={`/book/${ownerId?._id}`} className="cm-btn-primary">
                Book a Session <ArrowUpRight size={14} />
              </Link>
              {gallery?.show && images.length > 0 && (
                <a
                  href="#gallery"
                  className="cm-btn-ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View Work <Play size={12} />
                </a>
              )}
            </div>
          </div>

          <ScrollIndicator />
        </section>

        {/* ════════════════════════════════════════════════
            STATS BAND
            ════════════════════════════════════════════════ */}
        <div className="cm-stats-band cm-reveal">
          <div className="cm-stat-cell">
            <div className="cm-stat-label">Max / Day</div>
            <div className="cm-stat-value">{setupConfig?.maxCustomersPerDay ?? "—"}</div>
          </div>
          <div className="cm-stat-cell cm-reveal cm-delay-1">
            <div className="cm-stat-label">Rest Between</div>
            <div className="cm-stat-value">{setupConfig?.restMinutesBetweenConsultations ?? 0}<span style={{ fontSize: 14, marginLeft: 4, opacity: 0.5 }}>min</span></div>
          </div>
          <div className="cm-stat-cell cm-reveal cm-delay-2">
            <div className="cm-stat-label">Location</div>
            <div className="cm-stat-value" style={{ fontSize: 18 }}>{setupConfig?.localization?.city || ownerId?.ville || "—"}</div>
          </div>
          <div className="cm-stat-cell cm-reveal cm-delay-3">
            <div className="cm-stat-label">Timezone</div>
            <div className="cm-stat-value" style={{ fontSize: 18 }}>{setupConfig?.localization?.timezone || "UTC"}</div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════
            SERVICES
            ════════════════════════════════════════════════ */}
        {activeServices.length > 0 && (
          <section style={{ padding: "120px 0 0" }}>
            <div className="cm-section">
              <div className="cm-section-eyebrow cm-reveal">Services</div>
              <h2 className="cm-section-title cm-reveal cm-delay-1">
                What we<br /><em style={{ fontStyle: "italic", color: "#d2b98c" }}>create</em>
              </h2>
            </div>
            <div className="cm-services-grid" style={{ marginTop: 64 }}>
              {activeServices.map((s, i) => (
                <TiltCard key={i} intensity={6}>
                  <div
                    className="cm-service-card cm-reveal"
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <div className="cm-service-number">0{i + 1}</div>
                    <div className="cm-service-top">
                      <h3 className="cm-service-title">{s.title}</h3>
                      {s.price && <span className="cm-service-price">{s.price}</span>}
                    </div>
                    {s.description && (
                      <p className="cm-service-desc">{s.description}</p>
                    )}
                  </div>
                </TiltCard>
              ))}
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════
            GALLERY
            ════════════════════════════════════════════════ */}
        {gallery?.show && images.length > 0 && (
          <section id="gallery" style={{ padding: "120px 0 0" }}>
            <div className="cm-section">
              <div className="cm-section-eyebrow cm-reveal">Portfolio</div>
              <h2 className="cm-section-title cm-reveal cm-delay-1">
                Selected<br /><em style={{ fontStyle: "italic", color: "#d2b98c" }}>work</em>
              </h2>
            </div>
            <div className="cm-gallery-grid" style={{ margin: "64px 0 0" }}>
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`cm-gallery-item cm-reveal-scale`}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <img
                    src={img}
                    alt={`Portfolio ${i + 1}`}
                    className="cm-gallery-img"
                    loading="lazy"
                  />
                  <div className="cm-gallery-overlay" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════
            ABOUT
            ════════════════════════════════════════════════ */}
        {about?.show && (
          <section style={{ padding: "140px 0" }}>
            <div className="cm-section">
              <div className="cm-about-layout">
                {about?.image ? (
                  <div className="cm-about-image-wrap cm-reveal-left">
                    <TiltCard intensity={4}>
                      <img
                        src={about.image}
                        alt={about.title || "About"}
                        className="cm-about-img"
                      />
                    </TiltCard>
                    <div className="cm-about-img-accent" />
                  </div>
                ) : (
                  <div
                    className="cm-reveal-left"
                    style={{
                      background: "linear-gradient(135deg, rgba(210,185,140,0.08), rgba(210,185,140,0.02))",
                      border: "1px solid rgba(210,185,140,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      aspectRatio: "3/4",
                    }}
                  >
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 80,
                      fontWeight: 900,
                      fontStyle: "italic",
                      color: "rgba(210,185,140,0.15)",
                    }}>
                      {(ownerId?.businessName || "Studio").charAt(0)}
                    </span>
                  </div>
                )}
                <div className="cm-reveal-right" style={{ alignSelf: "center" }}>
                  <div className="cm-section-eyebrow">Our Story</div>
                  <h2 className="cm-section-title" style={{ marginBottom: 32 }}>
                    {about?.title || "About the Studio"}
                  </h2>
                  <p className="cm-about-body">{about?.text}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════
            BOOKING CTA
            ════════════════════════════════════════════════ */}
        <div className="cm-cta-section cm-reveal-scale">
          <h2 className="cm-cta-title">
            Ready to start<br />your next <em>project?</em>
          </h2>
          <Link to={`/book/${ownerId?._id}`} className="cm-cta-btn">
            Reserve Your Session <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* ════════════════════════════════════════════════
            HOURS & PAUSES
            ════════════════════════════════════════════════ */}
        {(businessHours?.length > 0 || pauses.length > 0) && (
          <section style={{ padding: "120px 0" }}>
            <div className="cm-section">
              <div style={{ display: "grid", gridTemplateColumns: pauses.length > 0 ? "2fr 1fr" : "1fr", gap: 80 }}>
                <div>
                  <div className="cm-section-eyebrow cm-reveal">Schedule</div>
                  <h2 className="cm-section-title cm-reveal cm-delay-1" style={{ marginBottom: 0, fontSize: 36 }}>
                    Working Hours
                  </h2>
                  {businessHours?.length > 0 && (
                    <div className="cm-hours-grid cm-reveal cm-delay-2">
                      {businessHours.map((h) => (
                        <div key={h.day} className="cm-hour-cell">
                          <div className="cm-hour-day">{h.day?.slice(0, 3)}</div>
                          {h.isClosed
                            ? <div className="cm-hour-closed">Closed</div>
                            : <div className="cm-hour-time">{h.open} — {h.close}</div>
                          }
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {pauses.length > 0 && (
                  <div className="cm-reveal cm-delay-3">
                    <div className="cm-section-eyebrow">Breaks</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#f0ece4", marginBottom: 24 }}>
                      Pause Windows
                    </h3>
                    {pauses.map((p, i) => (
                      <div key={i} className="cm-pause-row">
                        <div className="cm-pause-dot" />
                        <span style={{ color: "#d2b98c", fontWeight: 500, minWidth: 80 }}>{p.label || `Break ${i + 1}`}</span>
                        <span>{p.start} — {p.end}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════
            FOOTER
            ════════════════════════════════════════════════ */}
        <footer className="cm-footer">
          <div className="cm-footer-top">
            <div className="cm-reveal">
              <div className="cm-footer-brand">
                {ownerId?.businessName || "Studio"}
              </div>
              <p className="cm-footer-tagline">
                {hero?.slogan || "Professional creative production for brands and individuals."}
              </p>
            </div>

            <div className="cm-reveal cm-delay-1">
              <div className="cm-footer-col-title">Contact</div>
              {contact?.phone && (
                <div className="cm-footer-contact-item">
                  <div className="cm-footer-contact-icon"><Phone size={13} /></div>
                  {contact.phone}
                </div>
              )}
              {contact?.email && (
                <div className="cm-footer-contact-item">
                  <div className="cm-footer-contact-icon"><Mail size={13} /></div>
                  {contact.email}
                </div>
              )}
              {contact?.address && (
                <div className="cm-footer-contact-item">
                  <div className="cm-footer-contact-icon"><MapPin size={13} /></div>
                  {contact.address}
                </div>
              )}
            </div>

            <div className="cm-reveal cm-delay-2">
              <div className="cm-footer-col-title">Location</div>
              {(setupConfig?.localization?.city || ownerId?.ville) && (
                <div className="cm-footer-contact-item">
                  <div className="cm-footer-contact-icon"><Globe size={13} /></div>
                  {setupConfig?.localization?.city || ownerId?.ville}
                  {setupConfig?.localization?.country && `, ${setupConfig.localization.country}`}
                </div>
              )}
              {contact?.socials?.instagram && (
                <div className="cm-footer-contact-item">
                  <div className="cm-footer-contact-icon">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                  </div>
                  <a href={`https://instagram.com/${contact.socials.instagram.replace("@", "")}`} style={{ color: "inherit", textDecoration: "none" }} target="_blank" rel="noreferrer">
                    {contact.socials.instagram}
                  </a>
                </div>
              )}
              {contact?.socials?.tiktok && (
                <div className="cm-footer-contact-item">
                  <div className="cm-footer-contact-icon">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.26 8.26 0 0 0 4.84 1.56V6.79a4.85 4.85 0 0 1-1.07-.1z"/></svg>
                  </div>
                  {contact.socials.tiktok}
                </div>
              )}
            </div>
          </div>

          <div className="cm-footer-bottom">
            <span className="cm-footer-copy">
              © {new Date().getFullYear()} {ownerId?.businessName || "Studio"} · All rights reserved
            </span>
            <Link to={`/book/${ownerId?._id}`} style={{ textDecoration: "none" }}>
              <span style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#d2b98c",
              }}>
                Book Now <ArrowUpRight size={12} />
              </span>
            </Link>
          </div>
        </footer>

      </div>
    </>
  );
};

export default CreativeMediaTheme;