// Random particle positions for dark image overlays
const IMG_PARTICLES = [
  [
    { x: 15, y: 20, s: 1.8 }, { x: 72, y: 12, s: 1.2 }, { x: 88, y: 30, s: 1.6 },
    { x: 42, y: 8,  s: 1.0 }, { x: 60, y: 25, s: 1.4 }, { x: 92, y: 55, s: 1.2 },
    { x: 28, y: 45, s: 1.0 }, { x: 78, y: 65, s: 1.8 }, { x: 10, y: 70, s: 1.4 },
    { x: 50, y: 78, s: 1.2 }, { x: 85, y: 85, s: 1.0 }, { x: 35, y: 88, s: 1.6 },
  ],
  [
    { x: 8,  y: 15, s: 1.6 }, { x: 65, y: 8,  s: 1.0 }, { x: 82, y: 22, s: 1.8 },
    { x: 45, y: 18, s: 1.2 }, { x: 90, y: 45, s: 1.4 }, { x: 22, y: 38, s: 1.0 },
    { x: 70, y: 50, s: 1.6 }, { x: 12, y: 62, s: 1.2 }, { x: 55, y: 72, s: 1.8 },
    { x: 38, y: 82, s: 1.0 }, { x: 78, y: 80, s: 1.4 }, { x: 25, y: 90, s: 1.2 },
  ],
];

const phases = [
  {
    num: "01", title: "Discover & Align",
    body: "A focused intake session to map your AI roadmap, technical requirements, team culture, and hiring timeline. We ask the questions other recruiters don't.",
    light: true,
  },
  {
    num: "02", title: "Source & Vet",
    body: "Our specialist recruiters search a curated network of engineers, RLHF trainers, and domain experts — reaching candidates who aren't actively looking. Every candidate is technically screened.",
    light: false,
  },
  {
    num: "03", title: "Place & Retain",
    body: "Rigorous technical and cultural vetting, structured onboarding support, and a 12-month retention guarantee. We measure success by outcomes, not placements.",
    light: false,
  },
];

function ImgCard({ phase, pIdx }: { phase: typeof phases[0]; pIdx: number }) {
  if (phase.light) {
    return (
      <div style={{
        borderRadius: 18, height: 380, position: "relative", overflow: "hidden",
        background: "linear-gradient(155deg, #D8CCEE 0%, #C4B2E8 40%, #A994D4 80%, #9882C8 100%)",
      }}>
        {/* Organic scattered dots — same style as AboutSection */}
        {[
          { x: 18, y: 14, s: 3 }, { x: 72, y: 10, s: 2 }, { x: 84, y: 20, s: 2.5 },
          { x: 58, y: 26, s: 1.5 }, { x: 78, y: 32, s: 2 }, { x: 40, y: 40, s: 2.5 },
          { x: 90, y: 48, s: 1.5 }, { x: 64, y: 55, s: 3 }, { x: 24, y: 62, s: 1.5 },
          { x: 82, y: 68, s: 2 }, { x: 48, y: 75, s: 2.5 }, { x: 32, y: 84, s: 1.5 },
          { x: 68, y: 88, s: 2 }, { x: 12, y: 78, s: 1.5 }, { x: 92, y: 78, s: 2 },
          { x: 55, y: 44, s: 1.5 }, { x: 20, y: 28, s: 2 }, { x: 76, y: 72, s: 1.5 },
        ].map((d, i) => (
          <div key={i} style={{
            position: "absolute", left: `${d.x}%`, top: `${d.y}%`,
            width: d.s, height: d.s, borderRadius: "50%",
            background: "rgba(255,255,255,0.7)", pointerEvents: "none",
          }} />
        ))}
        {/* Frosted label */}
        <div style={{
          position: "absolute", bottom: 28, left: 28,
          background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.3)", borderRadius: 99,
          padding: "7px 16px",
        }}>
          <span style={{ fontFamily: "Zalando Sans, sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.9)", letterSpacing: "0.02em" }}>
            Discovery Session
          </span>
        </div>
      </div>
    );
  }

  const particles = IMG_PARTICLES[pIdx - 1] || [];
  const gradients = [
    "linear-gradient(145deg, #1A1614 0%, #0E0D0C 60%, #0A0808 100%)",
    "linear-gradient(145deg, #141618 0%, #0C0E10 60%, #080A0C 100%)",
  ];

  return (
    <div style={{
      borderRadius: 18, height: 380, position: "relative", overflow: "hidden",
      background: gradients[pIdx - 1] || gradients[0],
    }}>
      {/* Grain texture via dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }} />
      {/* Sparse particles */}
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
          width: p.s, height: p.s, borderRadius: "50%",
          background: "rgba(255,255,255,0.45)", pointerEvents: "none",
        }} />
      ))}
      {/* Subtle radial centre glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 55% 45% at 50% 42%, rgba(184,169,212,0.05) 0%, transparent 70%)",
      }} />
      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)",
      }} />
      {/* Phase number watermark */}
      <div style={{
        position: "absolute", top: 28, right: 28,
        fontFamily: "Zalando Sans, sans-serif", fontWeight: 700,
        fontSize: "3.5rem", color: "rgba(255,255,255,0.04)",
        letterSpacing: "-0.01em", lineHeight: 1, userSelect: "none",
      }}>
        {String(pIdx + 2).padStart(2, "0")}
      </div>
      {/* Bottom frosted label */}
      <div style={{
        position: "absolute", bottom: 28, left: 28,
        background: "rgba(255,255,255,0.07)", backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.1)", borderRadius: 99,
        padding: "7px 16px",
      }}>
        <span style={{ fontFamily: "Zalando Sans, sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em" }}>
          {pIdx === 0 ? "Network Sourcing" : "Placement & Retention"}
        </span>
      </div>
    </div>
  );
}

export default function ProcessSection() {
  return (
    <section id="process" style={{ background: "#F5F5F3", padding: "7rem 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>

          {/* LEFT — sticky */}
          <div style={{ position: "sticky", top: 88 }}>
            <p style={{ fontFamily: "Zalando Sans, sans-serif", fontSize: "0.72rem", color: "#ABABAB", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Our Process
            </p>
            <h2 style={{
              fontFamily: "Zalando Sans, sans-serif", fontWeight: 700,
              fontSize: "clamp(2rem, 3.2vw, 3rem)",
              lineHeight: 1.1, letterSpacing: "-0.01em",
              background: "linear-gradient(180deg, #0A0A0A 0%, #888888 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1.25rem",
            }}>
              A Structured Three-Phase<br />Recruitment Method
            </h2>
            <p style={{
              fontFamily: "Zalando Sans, sans-serif", fontSize: "1.05rem",
              color: "#888888", lineHeight: 1.75, maxWidth: 380,
            }}>
              AI delivers value only when matched to the right people. We pinpoint where your
              talent gap truly lies, validate culture fit fast, and place specialists who stay.
            </p>

            <div style={{ marginTop: "3rem" }}>
              {phases.map((p, i) => (
                <div key={p.num} style={{
                  display: "flex", gap: 16,
                  paddingTop: i > 0 ? "1.5rem" : 0,
                  marginTop: i > 0 ? "1.5rem" : 0,
                  borderTop: i > 0 ? "1px solid #E4E4E4" : "none",
                }}>
                  <span style={{
                    fontFamily: "Zalando Sans, sans-serif", fontSize: "0.62rem",
                    color: "#CACACA", paddingTop: 3, flexShrink: 0, letterSpacing: "0.06em",
                  }}>{p.num}</span>
                  <div>
                    <h3 style={{
                      fontFamily: "Zalando Sans, sans-serif", fontWeight: 700,
                      fontSize: "1.1rem", color: "#0A0A0A", marginBottom: "0.35rem",
                    }}>{p.title}</h3>
                    <p style={{
                      fontFamily: "Zalando Sans, sans-serif", fontSize: "0.97rem",
                      color: "#888888", lineHeight: 1.65,
                    }}>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — scrolling images */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {phases.map((p, i) => (
              <ImgCard key={p.num} phase={p} pIdx={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
