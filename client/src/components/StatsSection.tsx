import { ArrowRight } from "lucide-react";

const cases = [
  {
    tag: "RLHF · LLM Platform",
    title: "AI Training Scale-up",
    metric: "14 specialists in 6 weeks",
    body: "Placed 14 RLHF specialists including medical and legal domain experts for a leading LLM platform.",
    bg: "linear-gradient(155deg, #161418 0%, #0E0C10 60%, #080608 100%)",
    accent: "rgba(184,169,212,0.08)",
  },
  {
    tag: "Life Sciences · HealthTech",
    title: "Clinical AI Annotation",
    metric: "8 clinicians placed",
    body: "Built a team of clinically qualified data annotators for an NHS-partnered health AI startup.",
    bg: "linear-gradient(155deg, #141618 0%, #0C1010 60%, #080C0C 100%)",
    accent: "rgba(169,212,200,0.06)",
  },
  {
    tag: "Information Technology · NLP",
    title: "Principal ML Hire",
    metric: "< 2 weeks",
    body: "Sourced and placed a Principal ML Engineer for a London FinTech. Candidate remains in post 3 years later.",
    bg: "linear-gradient(155deg, #181614 0%, #100E0C 60%, #0C0808 100%)",
    accent: "rgba(212,192,169,0.06)",
  },
  {
    tag: "AI Safety · Research",
    title: "Red Team Sourcing",
    metric: "6 researchers placed",
    body: "Recruited 6 adversarial AI safety researchers evaluating model robustness for a frontier AI lab.",
    bg: "linear-gradient(155deg, #141416 0%, #0C0C10 60%, #080A0C 100%)",
    accent: "rgba(169,184,212,0.06)",
  },
];

// Per-card sparse particle sets
const CARD_PARTICLES = [
  [{ x: 14, y: 16, s: 1.4 }, { x: 72, y: 10, s: 1.0 }, { x: 88, y: 28, s: 1.6 }, { x: 58, y: 8, s: 1.2 }, { x: 92, y: 52, s: 1.0 }, { x: 24, y: 42, s: 1.4 }, { x: 80, y: 62, s: 1.0 }],
  [{ x: 10, y: 20, s: 1.6 }, { x: 68, y: 12, s: 1.0 }, { x: 84, y: 30, s: 1.2 }, { x: 42, y: 6,  s: 1.4 }, { x: 90, y: 48, s: 1.0 }, { x: 20, y: 60, s: 1.6 }, { x: 76, y: 72, s: 1.0 }],
  [{ x: 16, y: 14, s: 1.0 }, { x: 74, y: 8,  s: 1.6 }, { x: 86, y: 26, s: 1.2 }, { x: 50, y: 18, s: 1.4 }, { x: 94, y: 56, s: 1.0 }, { x: 28, y: 44, s: 1.2 }, { x: 62, y: 68, s: 1.6 }],
  [{ x: 8,  y: 18, s: 1.4 }, { x: 70, y: 6,  s: 1.0 }, { x: 82, y: 32, s: 1.6 }, { x: 46, y: 14, s: 1.2 }, { x: 92, y: 50, s: 1.4 }, { x: 18, y: 64, s: 1.0 }, { x: 78, y: 78, s: 1.2 }],
];

export default function StatsSection() {
  return (
    <section id="outcomes" style={{ background: "#FFFFFF", padding: "7rem 0" }}>
      <div className="container">

        {/* Header */}
        <div className="animate-fade-up" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{
              fontFamily: "Zalando Sans, sans-serif", fontSize: "0.72rem",
              color: "#ABABAB", letterSpacing: "0.08em", textTransform: "uppercase",
              marginBottom: "1rem",
            }}>Case Studies</p>
            <h2 style={{
              fontFamily: "Zalando Sans, sans-serif", fontWeight: 700,
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.08, letterSpacing: "-0.01em",
              background: "linear-gradient(180deg, #0A0A0A 0%, #888888 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Proven Outcomes from<br />Real Projects
            </h2>
          </div>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontFamily: "Zalando Sans, sans-serif", fontWeight: 500, fontSize: "0.82rem",
              color: "#888888", background: "none", border: "none",
              padding: 0, cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 6,
              transition: "color 0.15s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#0A0A0A"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#888888"; }}>
            All Case Studies <ArrowRight size={13} />
          </button>
        </div>

        {/* Horizontal scroll */}
        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {cases.map((c, i) => (
            <div
              key={i}
              className={`animate-fade-up delay-${Math.min((i + 1) * 100, 400)}`}
              style={{
                flex: "0 0 320px", borderRadius: 18, overflow: "hidden",
                position: "relative", background: c.bg,
                minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "flex-end",
              }}
            >
              {/* Grain texture */}
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }} />
              {/* Colour accent glow */}
              <div style={{
                position: "absolute", inset: 0,
                background: `radial-gradient(ellipse 70% 50% at 50% 30%, ${c.accent} 0%, transparent 70%)`,
              }} />
              {/* Sparse particles */}
              {CARD_PARTICLES[i].map((p, j) => (
                <div key={j} style={{
                  position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
                  width: p.s, height: p.s, borderRadius: "50%",
                  background: "rgba(255,255,255,0.4)", pointerEvents: "none",
                }} />
              ))}
              {/* Vignette + bottom fade */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)",
              }} />

              {/* Tag top-left */}
              <div style={{ position: "absolute", top: 22, left: 22, zIndex: 2 }}>
                <span style={{
                  fontFamily: "Zalando Sans, sans-serif", fontSize: "0.52rem",
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                }}>{c.tag}</span>
              </div>

              {/* Card number watermark */}
              <div style={{
                position: "absolute", top: 20, right: 22, zIndex: 2,
                fontFamily: "Zalando Sans, sans-serif", fontWeight: 700,
                fontSize: "2.8rem", color: "rgba(255,255,255,0.03)",
                letterSpacing: "-0.01em", lineHeight: 1, userSelect: "none",
              }}>
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Bottom content */}
              <div style={{ position: "relative", zIndex: 2, padding: "22px 22px 24px" }}>
                <h3 style={{
                  fontFamily: "Zalando Sans, sans-serif", fontWeight: 700,
                  fontSize: "1.05rem", color: "#FFFFFF",
                  lineHeight: 1.2, marginBottom: 10, letterSpacing: "-0.01em",
                }}>{c.title}</h3>
                <p style={{
                  fontFamily: "Zalando Sans, sans-serif", fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginBottom: 16,
                }}>{c.body}</p>
                {/* Separator */}
                <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 14 }} />
                <p style={{
                  fontFamily: "Zalando Sans, sans-serif", fontWeight: 700,
                  fontSize: "1.05rem", color: "#B8A9D4",
                  letterSpacing: "-0.01em",
                }}>{c.metric}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
