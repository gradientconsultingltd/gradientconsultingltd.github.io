import { ArrowRight } from "lucide-react";

function makeRing(count: number, radius: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    return {
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle),
      s: 1.8 + Math.abs(Math.sin(angle * 2.5)) * 1.4,
      o: 0.45 + Math.abs(Math.cos(angle * 1.8)) * 0.45,
    };
  });
}

const INNER_RING = makeRing(24, 24);
const OUTER_RING = makeRing(34, 38);

export default function AboutSection() {
  return (
    <section id="about" style={{ background: "#FFFFFF" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "120px 80px", display: "flex", alignItems: "center", gap: 96 }}>

        {/* LEFT — AI Clarity card */}
        <div className="animate-scale-in" style={{
          flexShrink: 0,
          width: 420,
          height: 420,
          borderRadius: 20,
          background: "linear-gradient(155deg, #D8CCEE 0%, #C4B2E8 40%, #A994D4 80%, #9882C8 100%)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>

          {/* Outer rotating ring */}
          <div style={{
            position: "absolute", inset: 0,
            animation: "gc-orbit 28s linear infinite",
            willChange: "transform",
          }}>
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", overflow: "visible" }}>
              {OUTER_RING.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={d.s * 0.4}
                  fill="rgba(255,255,255,0.85)" opacity={d.o} />
              ))}
            </svg>
          </div>

          {/* Inner rotating ring */}
          <div style={{
            position: "absolute", inset: 0,
            animation: "gc-orbit-reverse 18s linear infinite",
            willChange: "transform",
          }}>
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", overflow: "visible" }}>
              {INNER_RING.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={d.s * 0.38}
                  fill="rgba(255,255,255,0.9)" opacity={d.o} />
              ))}
            </svg>
          </div>

          {/* Top-left floating icon */}
          <div style={{
            position: "absolute", top: 24, left: 24, zIndex: 2,
            width: 32, height: 32, borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.3)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "gc-p1 9s ease-in-out infinite",
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
              <circle cx="12" cy="8" r="4"/><path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
            </svg>
          </div>

          {/* Bottom-right floating icon */}
          <div style={{
            position: "absolute", bottom: 28, right: 28, zIndex: 2,
            width: 28, height: 28, borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.25)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "gc-p4 11s ease-in-out 1.5s infinite",
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </div>

          {/* Bottom-left floating icon */}
          <div style={{
            position: "absolute", bottom: 32, left: 28, zIndex: 2,
            width: 26, height: 26, borderRadius: "50%",
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "gc-p2 13s ease-in-out 3s infinite",
          }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2">
              <polygon points="12,2 2,22 22,22"/>
            </svg>
          </div>

          {/* Centre label */}
          <p style={{
            position: "relative", zIndex: 3,
            fontFamily: "Zalando Sans, sans-serif", fontWeight: 400,
            fontSize: "1rem", color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.02em",
          }}>AI Clarity</p>
        </div>

        {/* RIGHT — text */}
        <div className="animate-fade-up delay-100" style={{
          flex: 1, display: "flex", flexDirection: "column",
          justifyContent: "center",
          padding: "0 48px 0 0",
        }}>
          <p style={{
            fontFamily: "Zalando Sans, sans-serif", fontSize: "0.95rem",
            fontWeight: 500,
            color: "#9880C4", marginBottom: "1.25rem",
            letterSpacing: "0.01em",
          }}>
            About Us
          </p>

          <h2 style={{
            fontFamily: "Zalando Sans, sans-serif", fontWeight: 700,
            fontSize: "clamp(2rem, 3vw, 2.8rem)",
            lineHeight: 1.18, letterSpacing: "-0.01em",
            background: "linear-gradient(180deg, #0A0A0A 0%, #888888 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "1.25rem",
            maxWidth: 480,
          }}>
            Gradient helps enterprises turn AI talent into measurable impact
          </h2>

          <p style={{
            fontFamily: "Zalando Sans, sans-serif", fontSize: "1.05rem",
            color: "#888888", lineHeight: 1.75,
            maxWidth: 420, marginBottom: "2rem",
          }}>
            We combine specialist recruitment expertise with deep knowledge
            of AI training workflows to help enterprises turn talent potential
            into measurable, lasting business impact.
          </p>

          <div style={{ width: "100%", height: 1, background: "#EEEEEE", marginBottom: "1.5rem", maxWidth: 420 }} />

          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontFamily: "Zalando Sans, sans-serif", fontWeight: 500,
              fontSize: "1rem", color: "#9880C4",
              background: "none", border: "none", padding: 0,
              cursor: "pointer", display: "inline-flex",
              alignItems: "center", gap: 6,
              transition: "gap 0.2s, color 0.2s",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.gap = "10px";
              (e.currentTarget as HTMLElement).style.color = "#7060A4";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.gap = "6px";
              (e.currentTarget as HTMLElement).style.color = "#9880C4";
            }}
          >
            Start a Search <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
