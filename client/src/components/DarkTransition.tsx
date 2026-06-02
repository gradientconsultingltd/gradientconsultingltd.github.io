function makeRing(count: number, radius: number, baseOpacity: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    return {
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius,
      o: baseOpacity + Math.abs(Math.cos(angle * 2)) * 0.18,
      s: 1.2 + Math.abs(Math.sin(angle * 3)) * 1.0,
    };
  });
}

const RING_A = makeRing(52, 36, 0.1);
const RING_B = makeRing(36, 24, 0.14);
const RING_C = makeRing(20, 14, 0.18);

export default function DarkTransition() {
  return (
    <section style={{
      background: "#0A0A0A",
      height: "46vh",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>

      {/* Soft lavender centre glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(184,169,212,0.09) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Outer ring — slow clockwise */}
      <div style={{
        position: "absolute", inset: 0,
        animation: "gc-orbit 36s linear infinite",
        willChange: "transform",
      }}>
        <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
          {RING_A.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.s * 0.28}
              fill="#B8A9D4" opacity={d.o} />
          ))}
        </svg>
      </div>

      {/* Middle ring — counter-clockwise */}
      <div style={{
        position: "absolute", inset: 0,
        animation: "gc-orbit-reverse 22s linear infinite",
        willChange: "transform",
      }}>
        <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
          {RING_B.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.s * 0.3}
              fill="#D8CCEE" opacity={d.o} />
          ))}
        </svg>
      </div>

      {/* Inner ring — clockwise, faster */}
      <div style={{
        position: "absolute", inset: 0,
        animation: "gc-orbit 14s linear infinite",
        willChange: "transform",
      }}>
        <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
          {RING_C.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.s * 0.32}
              fill="#FFFFFF" opacity={d.o} />
          ))}
        </svg>
      </div>

      {/* Centre icon */}
      <div style={{
        position: "relative", zIndex: 1,
        width: 48, height: 48, borderRadius: "50%",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "gc-dt-pulse 4s ease-in-out infinite",
      }}>
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
          <rect x="2" y="2" width="9" height="9" rx="2" fill="rgba(184,169,212,0.55)" />
          <rect x="13" y="2" width="9" height="9" rx="2" fill="rgba(184,169,212,0.3)" />
          <rect x="2" y="13" width="9" height="9" rx="2" fill="rgba(184,169,212,0.3)" />
          <rect x="13" y="13" width="9" height="9" rx="2" fill="rgba(184,169,212,0.55)" />
        </svg>
      </div>

      <style>{`
        @keyframes gc-dt-pulse {
          0%,100% { transform: scale(1);   box-shadow: 0 0 0 0 rgba(184,169,212,0); }
          50%      { transform: scale(1.08); box-shadow: 0 0 18px 4px rgba(184,169,212,0.15); }
        }
      `}</style>
    </section>
  );
}
