import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

// Starting positions for each particle (percentage-based)
const SEED = [
  { x: 10, y: 14, s: 2.2 }, { x: 86, y: 10, s: 1.8 }, { x: 46, y:  7, s: 1.6 },
  { x: 70, y: 22, s: 2.0 }, { x: 26, y: 30, s: 1.8 }, { x: 93, y: 38, s: 1.4 },
  { x:  4, y: 52, s: 2.0 }, { x: 62, y: 13, s: 1.6 }, { x: 80, y: 66, s: 2.2 },
  { x: 16, y: 70, s: 1.8 }, { x: 36, y: 80, s: 1.4 }, { x: 94, y: 76, s: 2.0 },
  { x: 52, y: 86, s: 1.6 }, { x: 74, y: 83, s: 2.2 }, { x: 20, y: 88, s: 1.4 },
  { x: 58, y:  4, s: 1.8 }, { x: 34, y: 56, s: 1.4 }, { x: 48, y: 44, s: 1.4 },
  { x:  6, y: 34, s: 1.6 }, { x: 92, y: 54, s: 1.4 }, { x: 68, y: 48, s: 2.0 },
  { x: 14, y: 46, s: 1.4 }, { x: 54, y: 68, s: 1.4 }, { x: 84, y: 28, s: 1.6 },
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const isMobile = useIsMobile();
  const ease = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

  // Fade-in on mount
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const setup = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      return { w, h };
    };

    let { w, h } = setup();

    // Build particle state from seed positions
    const particles = SEED.map(p => ({
      x:  (p.x / 100) * w,
      y:  (p.y / 100) * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.35 + 0.1),
      r:  p.s * 1.4,
      o:  0.55 + Math.random() * 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges so particles never disappear
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        if (p.y < -4) p.y = h + 4;
        if (p.y > h + 4) p.y = -4;

        // Soft glow halo
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5);
        grd.addColorStop(0, `rgba(255,255,255,${p.o})`);
        grd.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      ({ w, h } = setup());
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section id="hero" style={{
      position: "relative",
      minHeight: "100vh",
      background: "#0D0D0D",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}>

      {/* Animated particle canvas */}
      <canvas ref={canvasRef} style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
        display: "block",
        zIndex: 0,
      }} />

      {/* Hybridmind-style squircle centre glow */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -52%)",
        width: "min(580px, 58vw)",
        height: "min(580px, 58vw)",
        borderRadius: "28%",
        background: "radial-gradient(ellipse at center, rgba(200,185,235,0.14) 0%, rgba(160,140,210,0.07) 55%, transparent 80%)",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 0 40px 8px rgba(255,255,255,0.07), 0 0 90px 24px rgba(180,160,230,0.06)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 1,
        textAlign: "center",
        padding: isMobile ? "0 24px" : "0 48px",
        maxWidth: isMobile ? "100%" : "min(75vw, 1100px)",
        width: "100%",
      }}>
        <h1 style={{
          fontFamily: "Zalando Sans, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(2rem, 3.2vw, 3.4rem)",
          lineHeight: 1.14,
          letterSpacing: "-0.01em",
          background: "linear-gradient(180deg, #FFFFFF 0%, #888888 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "1.4rem",
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(22px)",
          transition: `opacity 0.85s ${ease} 0.05s, transform 0.85s ${ease} 0.05s`,
        }}>
          Connecting Enterprises To<br />The AI Talent That Delivers.
        </h1>

        <p style={{
          fontFamily: "Zalando Sans, sans-serif",
          fontSize: "0.95rem",
          color: "rgba(255,255,255,0.38)",
          lineHeight: 1.7,
          maxWidth: 380,
          margin: "0 auto 2.5rem",
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(14px)",
          transition: `opacity 0.75s ${ease} 0.22s, transform 0.75s ${ease} 0.22s`,
        }}>
          AI transformation starts with the right people —<br />if you start in the right place.
        </p>

        <div style={{
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(8px)",
          transition: `opacity 0.65s ${ease} 0.38s, transform 0.65s ${ease} 0.38s`,
        }}>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontFamily: "Zalando Sans, sans-serif",
              fontWeight: 500,
              fontSize: "0.88rem",
              color: "rgba(255,255,255,0.82)",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: 99,
              padding: "12px 28px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              transition: "border-color 0.2s, background 0.2s",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.22)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            Start a Search
            <span style={{ fontSize: "0.9rem", opacity: 0.65 }}>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
