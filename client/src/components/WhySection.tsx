import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

// Particle dots for the dark hero card
const HERO_DOTS = [
  { x: 12, y: 18, s: 1.6 }, { x: 78, y: 10, s: 1.2 }, { x: 90, y: 32, s: 1.8 },
  { x: 44, y: 8,  s: 1.0 }, { x: 62, y: 22, s: 1.4 }, { x: 92, y: 58, s: 1.2 },
  { x: 22, y: 48, s: 1.0 }, { x: 80, y: 68, s: 1.6 }, { x: 8,  y: 72, s: 1.4 },
  { x: 55, y: 80, s: 1.0 }, { x: 88, y: 84, s: 1.2 }, { x: 38, y: 90, s: 1.4 },
  { x: 70, y: 42, s: 1.0 }, { x: 30, y: 30, s: 1.2 }, { x: 50, y: 55, s: 1.0 },
];

const features = [
  {
    title: "AI Specialist Team",
    body: "Every recruiter on our team has placed AI and ML engineers. We understand the stack, the workflows, and the skills that actually matter.",
    dark: true,
  },
  {
    title: "End-to-End Delivery",
    body: "From role scoping and candidate search through to offer management, onboarding, and 12-month retention guarantee.",
    dark: false,
  },
  {
    title: "200+ Placements",
    body: "Successful placements across AI labs, FinTech, HealthTech, and enterprise software teams — with a track record that speaks for itself.",
    dark: false,
  },
  {
    title: "Senior Talent Network",
    body: "Relationships with Principal Engineers, Staff MLEs, and AI leaders who aren't on the open market — they come to us.",
    dark: false,
  },
  {
    title: "2–3 Week Shortlist",
    body: "Pre-vetted candidates in 2–3 weeks for most roles. Senior and executive searches in 4–8 weeks. We move without cutting corners.",
    dark: false,
  },
  {
    title: "12-Month Guarantee",
    body: "If a candidate leaves within 12 months, we re-source at no additional fee. Your confidence is backed by ours.",
    dark: false,
  },
];

export default function WhySection() {
  const isMobile = useIsMobile();
  return (
    <section id="why" style={{ background: "#FFFFFF", padding: isMobile ? "4rem 0" : "7rem 0" }}>
      <div className="container">

        {/* Header */}
        <div className="animate-fade-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{
            fontFamily: "Zalando Sans, sans-serif", fontSize: "0.72rem",
            color: "#ABABAB", letterSpacing: "0.08em", textTransform: "uppercase",
            marginBottom: "1.25rem",
          }}>Why Gradient</p>
          <h2 style={{
            fontFamily: "Zalando Sans, sans-serif", fontWeight: 700,
            fontSize: "clamp(2.2rem, 3.8vw, 3.5rem)",
            lineHeight: 1.08, letterSpacing: "-0.01em",
            background: "linear-gradient(180deg, #0A0A0A 0%, #888888 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            maxWidth: 560, margin: "0 auto 1rem",
          }}>
            Why Leading Teams Trust<br />Gradient to Deliver
          </h2>
          <p style={{
            fontFamily: "Zalando Sans, sans-serif", fontSize: "1.05rem",
            color: "#888888", lineHeight: 1.7, maxWidth: 480, margin: "0 auto",
          }}>
            We provide access to some of the best AI engineers in Europe and the world,
            deploy large teams at pace, and deliver real outcomes guided by proven industry leaders.
          </p>
        </div>

        {/* 3×2 grid — 1 col on mobile */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 12 }}>
          {features.map((f, i) => (
            <div
              key={i}
              className={`animate-fade-up delay-${Math.min((i + 1) * 100, 400)}`}
              style={{
                borderRadius: 18, padding: "32px 28px",
                background: f.dark ? "#0A0A0A" : "#F7F7F5",
                border: f.dark ? "none" : "1px solid #EEEEEE",
                position: "relative", overflow: "hidden",
                minHeight: 210,
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
              }}
            >
              {f.dark ? (
                <>
                  {/* Dark card: subtle gradient + particles */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(145deg, #141416 0%, #0C0C0E 60%, #08080A 100%)",
                  }} />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(184,169,212,0.06) 0%, transparent 70%)",
                  }} />
                  <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }} />
                  {HERO_DOTS.map((d, j) => (
                    <div key={j} style={{
                      position: "absolute", left: `${d.x}%`, top: `${d.y}%`,
                      width: d.s, height: d.s, borderRadius: "50%",
                      background: "rgba(255,255,255,0.35)", pointerEvents: "none",
                    }} />
                  ))}
                </>
              ) : null}

              {/* Light card top accent line */}
              {!f.dark && (
                <div style={{
                  position: "absolute", top: 0, left: 28, right: 28,
                  height: 2, background: "transparent",
                }} />
              )}

              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Number */}
                <p style={{
                  fontFamily: "Zalando Sans, sans-serif", fontSize: "0.58rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: f.dark ? "rgba(255,255,255,0.2)" : "#CCCCCC",
                  marginBottom: "0.75rem",
                }}>
                  0{i + 1}
                </p>
                <h3 style={{
                  fontFamily: "Zalando Sans, sans-serif", fontWeight: 700, fontSize: "1.15rem",
                  color: f.dark ? "#FFFFFF" : "#0A0A0A", marginBottom: "0.5rem",
                  letterSpacing: "-0.01em",
                }}>{f.title}</h3>
                <p style={{
                  fontFamily: "Zalando Sans, sans-serif", fontSize: "0.97rem",
                  color: f.dark ? "rgba(255,255,255,0.42)" : "#888888", lineHeight: 1.65,
                }}>{f.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="animate-fade-up" style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontFamily: "Zalando Sans, sans-serif", fontWeight: 500, fontSize: "0.88rem",
              color: "#999999", background: "none", border: "none",
              padding: 0, cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 6,
              transition: "color 0.15s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#0A0A0A"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#999999"; }}
          >
            Ready to leverage world-class AI talent? Start a Search <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}
