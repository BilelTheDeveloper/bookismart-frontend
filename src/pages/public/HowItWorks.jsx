import { useState, useRef, useEffect } from "react";

const steps = [
  {
    id: "01",
    title: "Create Your Smart Shop",
    desc: "Sign up in 60 seconds. Customize your services, set your prices, and launch your dedicated booking link instantly.",
    icon: "🏗️",
    accent: "#4f46e5",        // indigo-600
    soft: "#eef2ff",          // indigo-50
    border: "#c7d2fe",        // indigo-200
    tag: "Setup",
    tagColor: "#4f46e5",
    stat: "60s",
    statLabel: "to go live",
  },
  {
    id: "02",
    title: "Onboard Your Staff",
    desc: "Add your team and assign their schedules. Each member gets a personal mini-dashboard to manage their own flow.",
    icon: "👥",
    accent: "#06b6d4",        // cyan-500
    soft: "#ecfeff",          // cyan-50
    border: "#a5f3fc",        // cyan-200
    tag: "Team",
    tagColor: "#06b6d4",
    stat: "∞",
    statLabel: "team members",
  },
  {
    id: "03",
    title: "Automate Bookings",
    desc: "Your clients book 24/7. Smart Waiting List and Flouci payments handle the rest while you focus on your craft.",
    icon: "🚀",
    accent: "#10b981",        // emerald-500
    soft: "#ecfdf5",          // emerald-50
    border: "#a7f3d0",        // emerald-200
    tag: "Launch",
    tagColor: "#10b981",
    stat: "24/7",
    statLabel: "auto-bookings",
  },
];

function Card3D({ step, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e) => {
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: dy * -10, y: dx * 10 });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        perspective: "900px",
        animationDelay: `${index * 0.18}s`,
      }}
      className="hiw-card-entrance"
    >
      {/* 3D wrapper */}
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? "translateY(-10px)" : "translateY(0)"}`,
          transition: hovered
            ? "transform 0.12s ease-out"
            : "transform 0.55s cubic-bezier(0.23,1,0.32,1)",
          borderRadius: "28px",
          background: "#fff",
          border: `1.5px solid ${hovered ? step.border : "#f1f5f9"}`,
          boxShadow: hovered
            ? `0 28px 64px -8px ${step.accent}28, 0 0 0 1px ${step.border}`
            : "0 4px 24px -4px rgba(15,23,42,0.10), 0 1px 4px rgba(15,23,42,0.06)",
          padding: "40px 36px 36px",
          position: "relative",
          overflow: "hidden",
          cursor: "default",
        }}
      >

        {/* Soft tinted bg wash on hover */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "28px",
          background: hovered ? `radial-gradient(circle at 30% 20%, ${step.soft} 0%, transparent 70%)` : "transparent",
          transition: "background 0.4s",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        {/* Step number — ghost behind */}
        <div style={{
          position: "absolute", bottom: "-10px", right: "20px",
          fontFamily: "'Syne', sans-serif",
          fontSize: "110px", fontWeight: 900, lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: `1.5px ${step.border}`,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.4s",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}>
          {step.id}
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>

          {/* Top row: tag + stat */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
            <span style={{
              display: "inline-block",
              fontSize: "10px", fontWeight: 800,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: step.tagColor,
              background: step.soft,
              border: `1px solid ${step.border}`,
              padding: "5px 14px", borderRadius: "100px",
            }}>
              {step.tag}
            </span>

            {/* Floating stat chip */}
            <div style={{
              textAlign: "right",
              transform: hovered ? "translateZ(24px) translateY(-4px)" : "translateZ(0)",
              transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
            }}>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "22px", fontWeight: 900,
                color: step.accent, lineHeight: 1,
              }}>{step.stat}</div>
              <div style={{
                fontSize: "10px", fontWeight: 700, color: "#94a3b8",
                textTransform: "uppercase", letterSpacing: "0.12em", marginTop: "2px",
              }}>{step.statLabel}</div>
            </div>
          </div>

          {/* Icon block — matches site style (colored rounded square) */}
          <div style={{
            width: "72px", height: "72px",
            background: `linear-gradient(135deg, ${step.accent} 0%, ${step.accent}cc 100%)`,
            borderRadius: "22px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "34px", marginBottom: "24px",
            boxShadow: `0 12px 32px -4px ${step.accent}44`,
            transform: hovered ? "translateZ(32px) rotate(4deg)" : "translateZ(0) rotate(0deg)",
            transition: "transform 0.45s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s",
          }}>
            {step.icon}
          </div>

          {/* Step number badge — matches site's number badge style */}
          <div style={{
            position: "absolute",
            top: "-52px", left: "108px",
            width: "40px", height: "40px",
            background: "#0f172a",
            borderRadius: "14px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900, fontSize: "14px", color: "#fff",
            boxShadow: "0 4px 16px rgba(15,23,42,0.25)",
            transition: "background 0.3s",
            ...(hovered ? { background: step.accent } : {}),
          }}>
            {step.id}
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "20px", fontWeight: 800,
            color: "#0f172a", lineHeight: 1.25,
            marginBottom: "12px",
            transform: hovered ? "translateZ(16px)" : "none",
            transition: "transform 0.4s",
          }}>
            {step.title}
          </h3>

          {/* Desc */}
          <p style={{
            fontSize: "14px", lineHeight: 1.75,
            color: "#64748b", fontWeight: 400,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {step.desc}
          </p>

          {/* Bottom accent bar */}
          <div style={{
            marginTop: "28px", height: "3px", borderRadius: "999px",
            background: `linear-gradient(90deg, ${step.accent}, transparent)`,
            width: hovered ? "100%" : "35%",
            transition: "width 0.5s cubic-bezier(0.23,1,0.32,1)",
          }} />
        </div>

        {/* 3D shadow floor */}
        <div style={{
          position: "absolute", bottom: "-14px", left: "12%", right: "12%",
          height: "28px",
          background: step.accent,
          filter: "blur(22px)",
          borderRadius: "50%",
          opacity: hovered ? 0.22 : 0,
          transition: "opacity 0.4s",
          zIndex: -1,
        }} />
      </div>

      {/* Arrow connector (between cards, desktop) */}
      {index < steps.length - 1 && (
        <div className="hiw-arrow" style={{
          position: "absolute",
          top: "50%", right: "-22px",
          transform: "translateY(-50%)",
          fontSize: "20px",
          color: "#c7d2fe",
          display: "none",
          zIndex: 10,
        }}>
          ➔
        </div>
      )}
    </div>
  );
}

export default function HowItWorks() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        .hiw-card-entrance {
          opacity: 0;
          transform: translateY(48px);
          position: relative;
        }
        .hiw-section-visible .hiw-card-entrance {
          animation: hiwCardIn 0.75s cubic-bezier(0.23,1,0.32,1) forwards;
        }
        @keyframes hiwCardIn {
          to { opacity: 1; transform: translateY(0); }
        }

        .hiw-header-in {
          opacity: 0; transform: translateY(30px);
        }
        .hiw-section-visible .hiw-header-in {
          animation: hiwHeaderIn 0.6s cubic-bezier(0.23,1,0.32,1) 0.05s forwards;
        }
        @keyframes hiwHeaderIn {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (min-width: 1024px) {
          .hiw-arrow { display: block !important; }
        }

        .hiw-cta-btn {
          transition: all 0.2s cubic-bezier(0.23,1,0.32,1);
        }
        .hiw-cta-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 16px 40px rgba(79,70,229,0.35) !important;
        }
        .hiw-cta-btn:active {
          transform: scale(0.97);
        }

        .hiw-dots {
          background-image: radial-gradient(circle, #e2e8f0 1.5px, transparent 1.5px);
          background-size: 28px 28px;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="how-it-works"
        className={visible ? "hiw-section-visible" : ""}
        style={{
          background: "#fff",
          padding: "100px 0 120px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Dot pattern — subtle, matches site's clean vibe */}
        <div className="hiw-dots" style={{
          position: "absolute", inset: 0, opacity: 0.6, zIndex: 0,
        }} />

        {/* Indigo top-right glow blob — same as Hero */}
        <div style={{
          position: "absolute", top: "-120px", right: "-120px",
          width: "480px", height: "480px",
          background: "radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)",
          zIndex: 0, borderRadius: "50%", pointerEvents: "none",
        }} />
        {/* Cyan bottom-left */}
        <div style={{
          position: "absolute", bottom: "-80px", left: "-80px",
          width: "360px", height: "360px",
          background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)",
          zIndex: 0, borderRadius: "50%", pointerEvents: "none",
        }} />

        {/* Diagonal stripe accent — matches site's skew decoration */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: "33%", height: "100%",
          background: "#f8fafc",
          transform: "skewX(-8deg) translateX(40px)",
          zIndex: 0, pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>

          {/* ── HEADER ── matches site's header pattern exactly */}
          <div className="hiw-header-in" style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 72px" }}>
            <span style={{
              fontSize: "11px", fontWeight: 800, letterSpacing: "0.28em",
              textTransform: "uppercase", color: "#4f46e5",
              display: "block", marginBottom: "18px",
            }}>
              The Process
            </span>

            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(38px, 6vw, 64px)",
              fontWeight: 900, lineHeight: 0.97,
              color: "#0f172a",
              letterSpacing: "-0.03em",
              margin: "0 0 20px",
            }}>
              3 Steps to{" "}
              <span style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Freedom.
              </span>
            </h2>

            <p style={{
              fontSize: "17px", color: "#64748b", fontWeight: 400,
              lineHeight: 1.7, margin: 0,
            }}>
              We've removed the complexity of tech.{" "}
              <strong style={{ color: "#0f172a", fontWeight: 600 }}>You focus on your craft;</strong>{" "}
              we handle the digital infrastructure.
            </p>
          </div>

          {/* ── CARDS GRID ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "32px",
            perspective: "1100px",
            position: "relative",
          }}>
            {/* Dashed connecting line (desktop) */}
            <div style={{
              position: "absolute",
              top: "90px", left: "16%", right: "16%",
              height: "2px",
              borderTop: "2px dashed #e2e8f0",
              zIndex: 0,
              pointerEvents: "none",
            }} />

            {steps.map((step, i) => (
              <Card3D key={step.id} step={step} index={i} />
            ))}
          </div>

          {/* ── BOTTOM CTA STRIP — matches site's dark CTA exactly ── */}
          <div style={{
            marginTop: "72px",
            background: "#0f172a",
            borderRadius: "28px",
            padding: "40px 48px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* indigo glow inside CTA */}
            <div style={{
              position: "absolute", top: "-80px", left: "-80px",
              width: "320px", height: "320px",
              background: "radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", bottom: "-60px", right: "-60px",
              width: "260px", height: "260px",
              background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <h4 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(18px, 3vw, 24px)",
                fontWeight: 800, color: "#f8fafc",
                margin: "0 0 6px", fontStyle: "italic",
              }}>
                Ready to transform your business?
              </h4>
              <p style={{
                fontSize: "11px", fontWeight: 700,
                color: "#64748b", letterSpacing: "0.2em",
                textTransform: "uppercase", margin: 0,
              }}>
                Start your 90-day journey today.
              </p>
            </div>

            <button
              className="hiw-cta-btn"
              style={{
                position: "relative", zIndex: 1,
                padding: "16px 40px",
                background: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
                color: "#fff",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800, fontSize: "13px",
                letterSpacing: "0.12em", textTransform: "uppercase",
                border: "none", borderRadius: "14px",
                cursor: "pointer",
                boxShadow: "0 8px 28px rgba(79,70,229,0.3)",
              }}
            >
              Get Started Now →
            </button>
          </div>

        </div>
      </section>
    </>
  );
}