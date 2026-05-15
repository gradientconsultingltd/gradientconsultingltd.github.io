/* ============================================================
   GRADIENT CONSULTING — Partners / Clients Banner
   Design: Infinite CSS marquee scroll of partner logos
   Partners: Outlier, Micro1, Mercor (AI training platforms)
   ============================================================ */

const partners = [
  {
    name: "Outlier",
    logo: "/manus-storage/logo-outlier_10a22ac0.jpg",
    isPhoto: true,
  },
  {
    name: "Mercor",
    logo: "/manus-storage/logo-mercor_2368d829.png",
    isPhoto: false,
  },
  {
    name: "micro1",
    logo: "/manus-storage/logo-micro1_ba68f21e.jpg",
    isPhoto: true,
  },
];

// Duplicate for seamless loop
const allPartners = [...partners, ...partners, ...partners, ...partners];

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
          background:
            "linear-gradient(to right, #16161A 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, #16161A 0%, transparent 100%)",
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
          className="flex items-center gap-12"
          style={{
            animation: "marquee 28s linear infinite",
            width: "max-content",
          }}
        >
          {allPartners.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: "180px",
                height: "64px",
                padding: "10px 20px",
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
              <img
                src={partner.logo}
                alt={partner.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  filter: partner.isPhoto
                    ? "brightness(1.1) contrast(1.05) grayscale(0.2)"
                    : "brightness(1.1) contrast(1.1)",
                  opacity: 0.85,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
