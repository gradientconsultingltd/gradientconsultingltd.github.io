/* ============================================================
   GRADIENT CONSULTING — Testimonials Section
   Design: Dark surface, card grid, gradient quote marks
   ============================================================ */

const testimonials = [
  {
    quote:
      "Gradient Consulting found us a Principal ML Engineer in under two weeks. The calibre of candidates was exceptional — they clearly understood what we needed technically and culturally.",
    author: "Sarah Chen",
    role: "CTO",
    company: "FinTech Scale-up, London",
    initial: "S",
  },
  {
    quote:
      "The agentic AI system they built for our operations team reduced manual processing time by 70%. Their team genuinely understood our domain and delivered beyond expectations.",
    author: "Marcus Webb",
    role: "VP Operations",
    company: "Enterprise SaaS, Manchester",
    initial: "M",
  },
  {
    quote:
      "We've used other tech recruiters before, but Gradient is different. They're consultants first — they challenged our thinking on the role spec and we ended up hiring someone even better.",
    author: "Priya Nair",
    role: "Head of Engineering",
    company: "HealthTech Startup, London",
    initial: "P",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-28" style={{ background: "#0E0E10" }}>
      <div className="container">
        {/* Header */}
        <div className="animate-fade-up mb-14">
          <div className="flex items-center gap-2.5 mb-5">
            <div
              className="h-px w-8"
              style={{ background: "linear-gradient(90deg, #4F8EF7, #9B5CF6)" }}
            />
            <span
              className="font-mono-brand text-xs tracking-widest uppercase"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                color: "#4F8EF7",
                letterSpacing: "0.18em",
              }}
            >
              Client Perspectives
            </span>
          </div>
          <h2
            className="font-display leading-tight"
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              color: "#F0EEE8",
            }}
          >
            Trusted by teams
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #4F8EF7 0%, #9B5CF6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              building the future.
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className={`animate-fade-up card-surface rounded-xl p-7 flex flex-col gap-6 delay-${(i + 1) * 100}`}
            >
              {/* Quote mark */}
              <div
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "4rem",
                  lineHeight: 0.8,
                  background: "linear-gradient(135deg, #4F8EF7 0%, #9B5CF6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  userSelect: "none",
                }}
              >
                "
              </div>

              <p
                style={{
                  fontFamily: "Outfit, sans-serif",
                  color: "#A0A0B0",
                  lineHeight: 1.7,
                  fontSize: "0.9rem",
                  flex: 1,
                }}
              >
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #4F8EF7 0%, #9B5CF6 100%)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 800,
                      color: "white",
                      fontSize: "0.9rem",
                    }}
                  >
                    {t.initial}
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontWeight: 600,
                      color: "#F0EEE8",
                      fontSize: "0.875rem",
                    }}
                  >
                    {t.author}
                  </p>
                  <p
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: "#6B6B7A",
                      fontSize: "0.75rem",
                    }}
                  >
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
