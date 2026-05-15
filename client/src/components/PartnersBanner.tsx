/* ============================================================
   GRADIENT CONSULTING — Partners / Clients Banner
   Design: Infinite CSS marquee scroll of partner logos
   Partners: Outlier, Micro1, Mercor, Turing
   ============================================================ */

// Logo display strategy:
// - Outlier: white text on black bg → use as-is, opacity 0.85
// - Micro1: rendered as styled text logo (white on transparent)
// - Mercor: light bg logo → use brightness/invert CSS filter to make it dark-bg friendly
// - Turing: white on black bg → use as-is, opacity 0.85

const partners = [
  {
    name: "Outlier",
    logo: "/manus-storage/logo-outlier-v2_aac2fea1.png",
    // White text on black — works natively on dark bg
    filterStyle: "brightness(1) opacity(0.85)",
    bgStyle: "transparent",
    isTextLogo: false,
  },
  {
    name: "Mercor",
    logo: "/manus-storage/logo-mercor_2368d829.png",
    // Light bg logo — invert to make it white on dark
    filterStyle: "invert(1) brightness(0.9) opacity(0.8)",
    bgStyle: "transparent",
    isTextLogo: false,
  },
  {
    name: "micro1",
    logo: null,
    filterStyle: "",
    bgStyle: "transparent",
    isTextLogo: true,
  },
  {
    name: "Turing",
    logo: "/manus-storage/logo-turing_192fbcb6.png",
    // White on black — works natively
    filterStyle: "brightness(1.05) opacity(0.85)",
    bgStyle: "transparent",
    isTextLogo: false,
  },
];

// Duplicate for seamless loop
const allPartners = [...partners, ...partners, ...partners];

export default function PartnersBanner() {
  return (
    <section
      className="py-12 relative overflow-hidden"
      style={{
        background: "#16161A",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #16161A 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, #16161A 0%, transparent 100%)",
        }}
      />

      {/* Label */}
      <div className="container mb-8 relative z-20">
        <div className="flex items-center gap-3">
          <div
            className="h-px w-8 flex-shrink-0"
            style={{ background: "linear-gradient(90deg, #4F8EF7, #9B5CF6)" }}
          />
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.7rem",
              color: "#6B6B7A",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Recruiting for leading AI training platforms
          </span>
        </div>
      </div>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        <div
          className="flex items-center gap-10"
          style={{
            animation: "marquee 32s linear infinite",
            width: "max-content",
          }}
        >
          {allPartners.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: "200px",
                height: "68px",
                padding: "12px 24px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(79,142,247,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.07)";
              }}
            >
              {partner.isTextLogo ? (
                /* Micro1 — styled text logo */
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.4rem",
                    color: "rgba(255,255,255,0.82)",
                    letterSpacing: "-0.02em",
                    userSelect: "none",
                  }}
                >
                  micro<span style={{ color: "rgba(255,255,255,0.82)" }}>1</span>
                  <span style={{ color: "#4F8EF7", fontSize: "1.6rem", lineHeight: 0 }}>.</span>
                </span>
              ) : (
                <img
                  src={partner.logo!}
                  alt={partner.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "44px",
                    objectFit: "contain",
                    filter: partner.filterStyle,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${100 / 3}%); }
        }
      `}</style>
    </section>
  );
}
