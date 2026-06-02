import { ArrowRight } from "lucide-react";

// Sparse ambient particles — warm-toned, mimics a lit portrait environment
const CONTACT_PARTICLES = [
  { x: 8,  y: 12, s: 1.4, o: 0.3 }, { x: 88, y: 8,  s: 1.0, o: 0.25 },
  { x: 72, y: 18, s: 1.6, o: 0.2 }, { x: 24, y: 25, s: 1.2, o: 0.3  },
  { x: 92, y: 35, s: 1.0, o: 0.2 }, { x: 14, y: 45, s: 1.6, o: 0.25 },
  { x: 80, y: 55, s: 1.2, o: 0.2 }, { x: 42, y: 10, s: 1.0, o: 0.3  },
  { x: 60, y: 22, s: 1.4, o: 0.2 }, { x: 96, y: 62, s: 1.0, o: 0.2  },
  { x: 30, y: 68, s: 1.2, o: 0.25},
];

export default function ContactSection() {
  return (
    <section id="contact" style={{ position: "relative", minHeight: "80vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>

      {/* Layered background — warm editorial dark */}
      <div style={{ position: "absolute", inset: 0, background: "#0C0905" }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(145deg, #1E140A 0%, #120C06 35%, #0A0704 65%, #06050A 100%)",
      }} />
      {/* Warm amber centre glow — simulates backlit portrait */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 70% 60% at 55% 38%, rgba(200,140,60,0.07) 0%, rgba(180,100,30,0.04) 40%, transparent 70%)",
      }} />
      {/* Cooler left edge glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 40% 60% at 15% 50%, rgba(100,80,140,0.05) 0%, transparent 60%)",
      }} />
      {/* Grain texture */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }} />
      {/* Bottom vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(6,4,2,0.92) 0%, rgba(8,6,4,0.5) 40%, rgba(10,7,4,0.15) 100%)",
      }} />

      {/* Ambient particles */}
      {CONTACT_PARTICLES.map((p, i) => (
        <div key={i} style={{
          position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
          width: p.s, height: p.s, borderRadius: "50%",
          background: `rgba(255,235,180,${p.o})`, pointerEvents: "none",
          zIndex: 1,
        }} />
      ))}

      {/* Contact label top-left */}
      <div style={{ position: "absolute", top: 40, left: 48, zIndex: 3 }}>
        <span style={{
          fontFamily: "Zalando Sans, sans-serif", fontSize: "0.72rem",
          color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase",
        }}>⊙ Contact Us</span>
      </div>

      {/* Image placeholder hint — very subtle */}
      <div style={{
        position: "absolute", top: "36%", left: "50%", transform: "translateX(-50%)",
        textAlign: "center", zIndex: 2, pointerEvents: "none",
      }}>
        <div style={{
          width: 1, height: 48,
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)",
          margin: "0 auto 12px",
        }} />
        <span style={{
          fontFamily: "Zalando Sans, sans-serif", fontSize: "0.48rem",
          letterSpacing: "0.16em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.1)",
        }}>Photo Placeholder</span>
      </div>

      {/* Bottom content */}
      <div style={{ position: "relative", zIndex: 3, padding: "0 48px 64px", width: "100%" }}>

        {/* Thin separator */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: "2rem", maxWidth: 520 }} />

        <h2 style={{
          fontFamily: "Zalando Sans, sans-serif", fontWeight: 700,
          fontSize: "clamp(2rem, 4vw, 3.4rem)",
          lineHeight: 1.06, letterSpacing: "-0.01em",
          background: "linear-gradient(180deg, #FFFFFF 0%, #888888 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "2rem", maxWidth: 520,
        }}>
          Turning talent uncertainty<br />into structure, and structure<br />into growth.
        </h2>

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <button
            onClick={() => window.location.href = "mailto:hello@gradientconsulting.co.uk"}
            style={{
              fontFamily: "Zalando Sans, sans-serif", fontWeight: 600, fontSize: "1rem",
              color: "#FFFFFF", background: "transparent",
              border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 99,
              padding: "13px 28px", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 8,
              transition: "border-color 0.2s, background 0.2s",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.7)";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            Contact Us <ArrowRight size={14} />
          </button>

          <a
            href="mailto:hello@gradientconsulting.co.uk"
            style={{
              fontFamily: "Zalando Sans, sans-serif", fontSize: "1rem",
              color: "rgba(255,255,255,0.35)", textDecoration: "none",
              letterSpacing: "0.01em", transition: "color 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"; }}
          >
            hello@gradientconsulting.co.uk
          </a>
        </div>
      </div>
    </section>
  );
}
