import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const services = [
  {
    num: 1, title: "Tech Recruitment (Perm & Contract)",
    desc: "A clear, commercially grounded view of where AI talent creates meaningful advantage. We surface the highest-value engineers, assess culture fit with rigour, and deliver a shortlist that converts.",
  },
  {
    num: 2, title: "RLHF & AI Training Talent",
    desc: "We recruit the human experts who train the world's most capable AI models — preference data annotators, evaluators, and alignment specialists with verified domain knowledge.",
  },
  {
    num: 3, title: "Domain Expert Placement",
    desc: "Clinicians, lawyers, financial analysts, and scientists placed into AI training workflows. The ground-truth knowledge that makes large language models reliable and trustworthy.",
  },
  {
    num: 4, title: "Executive & Leadership Search",
    desc: "Retained search for CTO, VP Engineering, Head of AI, and technology leadership roles. We find the people who define your AI strategy, not just execute it.",
  },
  {
    num: 5, title: "Contract & Interim Hiring",
    desc: "Flexible specialist talent deployed fast — from a single ML engineer to a full RLHF annotation team. Rapid onboarding, minimal overhead, maximum output.",
  },
  {
    num: 6, title: "Red Teaming & AI Safety",
    desc: "Adversarial AI safety researchers and red teamers who evaluate model robustness, probe failure modes, and stress-test outputs before deployment.",
  },
  {
    num: 7, title: "AI Tooling Assessment",
    desc: "We identify and place specialists who evaluate your AI toolchain — from vector databases to inference infrastructure — ensuring your technology stack matches your ambition.",
  },
];

function makeRing(count: number, radius: number) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2;
    return { x: 50 + radius * Math.cos(a), y: 50 + radius * Math.sin(a) };
  });
}

// 9 rings — lavender dots (for version with black centre)
const RINGS_LAVENDER = [
  { dots: makeRing(12, 8),    size: 3.5, color: "#7A65AA", dur: "7s",  dir: "gc-orbit"         },
  { dots: makeRing(16, 14),   size: 3.2, color: "#8B76BB", dur: "11s", dir: "gc-orbit-reverse"  },
  { dots: makeRing(20, 20),   size: 2.9, color: "#9880C4", dur: "15s", dir: "gc-orbit"          },
  { dots: makeRing(24, 26),   size: 2.6, color: "#A994D4", dur: "19s", dir: "gc-orbit-reverse"  },
  { dots: makeRing(28, 32),   size: 2.3, color: "#B8A9D4", dur: "23s", dir: "gc-orbit"          },
  { dots: makeRing(30, 37),   size: 2.0, color: "#C4B2E8", dur: "27s", dir: "gc-orbit-reverse"  },
  { dots: makeRing(32, 41),   size: 1.8, color: "#CBBFEC", dur: "31s", dir: "gc-orbit"          },
  { dots: makeRing(34, 44.5), size: 1.6, color: "#D4CAEE", dur: "35s", dir: "gc-orbit-reverse"  },
  { dots: makeRing(36, 47.5), size: 1.4, color: "#DDD6F2", dur: "39s", dir: "gc-orbit"          },
];

// 9 rings — dark/black dots (for version with lavender centre)
const RINGS_DARK = [
  { dots: makeRing(12, 8),    size: 3.5, color: "#0A0A0A", dur: "7s",  dir: "gc-orbit-reverse"  },
  { dots: makeRing(16, 14),   size: 3.2, color: "#1A1A1A", dur: "11s", dir: "gc-orbit"           },
  { dots: makeRing(20, 20),   size: 2.9, color: "#252525", dur: "15s", dir: "gc-orbit-reverse"   },
  { dots: makeRing(24, 26),   size: 2.6, color: "#2E2E2E", dur: "19s", dir: "gc-orbit"           },
  { dots: makeRing(28, 32),   size: 2.3, color: "#383838", dur: "23s", dir: "gc-orbit-reverse"   },
  { dots: makeRing(30, 37),   size: 2.0, color: "#444444", dur: "27s", dir: "gc-orbit"           },
  { dots: makeRing(32, 41),   size: 1.8, color: "#555555", dur: "31s", dir: "gc-orbit-reverse"   },
  { dots: makeRing(34, 44.5), size: 1.6, color: "#666666", dur: "35s", dir: "gc-orbit"           },
  { dots: makeRing(36, 47.5), size: 1.4, color: "#777777", dur: "39s", dir: "gc-orbit-reverse"   },
];

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();

  return (
    <section id="services" style={{ background: "#F5F5F3", padding: isMobile ? "64px 0" : "120px 0" }}>
      <div className="container">

        {/* Top header row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", marginBottom: "2rem" }}>
          <p style={{ fontFamily: "Zalando Sans, sans-serif", fontSize: "0.88rem", color: "#0A0A0A", letterSpacing: "0.06em" }}>Our Services</p>
          <p style={{ fontFamily: "Zalando Sans, sans-serif", fontSize: "0.88rem", color: "#0A0A0A", letterSpacing: "0.06em" }}>How we help</p>
        </div>
        <div style={{ height: 1, background: "#E4E4E4", marginBottom: "2.5rem" }} />

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2.5rem" : "5rem", alignItems: "start" }}>

          {/* LEFT — numbered list */}
          <div>
            {services.map((s, i) => (
              <button key={s.num}
                onMouseEnter={() => setActive(i)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", padding: "20px 0",
                  background: "none",
                  borderLeft: "none", borderRight: "none", borderBottom: "none",
                  borderTop: i === 0 ? "none" : "1px solid #E8E8E8",
                  textAlign: "left", cursor: "pointer",
                }}>
                <span style={{
                  fontFamily: "Zalando Sans, sans-serif",
                  fontWeight: active === i ? 600 : 400,
                  fontSize: "1.1rem",
                  color: active === i ? "#0A0A0A" : "#AAAAAA",
                  transition: "color 0.2s, font-weight 0.2s",
                }}>
                  {s.num}. {s.title}
                </span>
                {active === i && (
                  <span style={{ color: "#0A0A0A", flexShrink: 0, marginLeft: 8 }}>→</span>
                )}
              </button>
            ))}

            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #E8E8E8", display: "flex", gap: "1.25rem", alignItems: "center" }}>
              <button onClick={() => document.querySelector("#process")?.scrollIntoView({ behavior: "smooth" })}
                style={{ fontFamily: "Zalando Sans, sans-serif", fontWeight: 400, fontSize: "0.92rem", color: "#999", background: "none", border: "none", padding: 0, cursor: "pointer", transition: "color 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#333"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#999"; }}>
                See how we work
              </button>
              <span style={{ color: "#DDD" }}>|</span>
              <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                style={{ fontFamily: "Zalando Sans, sans-serif", fontWeight: 400, fontSize: "0.92rem", color: "#999", background: "none", border: "none", padding: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, transition: "color 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#333"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#999"; }}>
                Start a Search <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* RIGHT — animated logo + description */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", paddingTop: "0.5rem", alignItems: "center" }}>

            {/* Two orbital animations side by side — centred */}
            <div style={{ alignSelf: "center", display: "flex", gap: isMobile ? 12 : 24, justifyContent: "center" }}>

              {/* Left — lavender rings + black swirl */}
              <div style={{ width: isMobile ? 140 : 220, height: isMobile ? 140 : 220, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {RINGS_LAVENDER.map((ring, i) => (
                  <div key={i} style={{ position: "absolute", inset: 0, animation: `${ring.dir} ${ring.dur} linear infinite` }}>
                    <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                      {ring.dots.map((d, j) => (
                        <circle key={j} cx={d.x} cy={d.y} r={ring.size} fill={ring.color} opacity={0.75 - i * 0.05} />
                      ))}
                    </svg>
                  </div>
                ))}
                <img key={`swirl-a-${active}`} src="/icon-swirl.png" alt=""
                  style={{ width: 52, height: 52, position: "relative", zIndex: 2, filter: "brightness(0)",
                    animation: "gc-swirl-burst 0.7s cubic-bezier(0.23,1,0.32,1) both, gc-slow-spin 12s linear 0.7s infinite" }}
                />
              </div>

              {/* Right — dark rings + lavender swirl */}
              <div style={{ width: isMobile ? 140 : 220, height: isMobile ? 140 : 220, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {RINGS_DARK.map((ring, i) => (
                  <div key={i} style={{ position: "absolute", inset: 0, animation: `${ring.dir} ${ring.dur} linear infinite` }}>
                    <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                      {ring.dots.map((d, j) => (
                        <circle key={j} cx={d.x} cy={d.y} r={ring.size} fill={ring.color} opacity={0.75 - i * 0.05} />
                      ))}
                    </svg>
                  </div>
                ))}
                <img key={`swirl-b-${active}`} src="/icon-swirl.png" alt=""
                  style={{ width: 52, height: 52, position: "relative", zIndex: 2,
                    animation: "gc-swirl-burst 0.7s cubic-bezier(0.23,1,0.32,1) both, gc-slow-spin 12s linear 0.7s infinite" }}
                />
              </div>

            </div>

            {/* Description — fades + slides in on hover change */}
            <p
              key={`desc-${active}`}
              style={{
                fontFamily: "Zalando Sans, sans-serif", fontSize: "1.05rem",
                color: "#666", lineHeight: 1.75,
                animation: "gc-service-in 0.45s cubic-bezier(0.23,1,0.32,1) both",
              }}
            >
              {services[active].desc}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gc-swirl-burst {
          0%   { transform: rotate(-30deg) scale(0.8); opacity: 0.4; }
          55%  { transform: rotate(220deg) scale(1.1); opacity: 1; }
          100% { transform: rotate(360deg) scale(1); opacity: 1; }
        }
        @keyframes gc-slow-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes gc-service-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </section>
  );
}
