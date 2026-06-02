const partners = [
  { name: "Turing",  src: "/logo-turing.png",  transparent: false },
  { name: "Mercor",  src: "/logo-mercor.png",  transparent: false },
  { name: "micro1",  src: "/logo-micro1.png",  transparent: true  },
];

const all = [...partners, ...partners, ...partners, ...partners];

export default function PartnersBanner() {
  return (
    <section style={{
      background: "#FFFFFF",
      borderTop: "1px solid #EEEEEE",
      borderBottom: "1px solid #EEEEEE",
      overflow: "hidden",
      padding: "32px 0",
    }}>
      <div style={{ overflow: "hidden", position: "relative" }}>

        {/* Fade edges */}
        <div style={{ position: "absolute", inset: "0 auto 0 0", width: 140, background: "linear-gradient(to right, #fff, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: "0 0 0 auto", width: 140, background: "linear-gradient(to left, #fff, transparent)", zIndex: 2, pointerEvents: "none" }} />

        <div style={{
          display: "flex",
          alignItems: "center",
          width: "max-content",
          animation: "ticker 20s linear infinite",
        }}>
          {all.map((p, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              padding: "0 56px",
              gap: 56,
              flexShrink: 0,
            }}>
              <div style={{
                width: 160,
                height: 52,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <img
                  src={p.src}
                  alt={p.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                    filter: p.transparent
                      ? "grayscale(1) brightness(0.55)"
                      : "grayscale(1)",
                  }}
                />
              </div>
              <span style={{
                width: 4, height: 4, borderRadius: "50%",
                background: "#D8CCEE", flexShrink: 0, display: "block",
              }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-${(100 / 4).toFixed(6)}%); }
        }
      `}</style>
    </section>
  );
}
