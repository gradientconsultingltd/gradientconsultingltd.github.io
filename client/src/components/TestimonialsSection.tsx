const testimonials = [
  {
    quote: "Gradient found us a Principal ML Engineer in under two weeks. The calibre was exceptional — they understood what we needed technically and culturally. Two years in, he's now leading the team.",
    author: "Sarah Chen", role: "CTO", company: "FinTech Scale-up, London", initial: "S",
  },
  {
    quote: "We needed RLHF specialists with genuine medical knowledge, not just annotators. Gradient understood the distinction immediately and placed a team that made a measurable difference to our model quality.",
    author: "James Okafor", role: "Head of AI", company: "HealthTech Platform, Manchester", initial: "J",
  },
  {
    quote: "Unlike every other recruiter we've worked with, Gradient challenged our brief. They pushed back on the role spec and we ended up hiring someone better suited than the candidate we'd originally imagined.",
    author: "Priya Nair", role: "VP Engineering", company: "Enterprise SaaS, London", initial: "P",
  },
];

export default function TestimonialsSection() {
  return (
    <section style={{ background: "#F5F4F2", padding: "7rem 0" }}>
      <div className="container">
        <div className="animate-fade-up mb-14">
          <p className="label-sm mb-4">Client Perspectives</p>
          <h2 style={{ fontFamily: "Zalando Sans, sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 3.8vw, 3.2rem)", lineHeight: 1.08, letterSpacing: "-0.01em", color: "#0F0F0F", maxWidth: 480 }}>
            Trusted by teams building the future.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={t.author} className={`animate-fade-up delay-${(i + 1) * 100} flex flex-col gap-6 p-7 rounded-2xl`}
              style={{ background: "#FFFFFF", border: "1px solid #E4E4E4" }}>
              <span style={{ fontFamily: "Georgia, serif", fontSize: "3rem", lineHeight: 0.8, color: "#B8A9D4", opacity: 0.5, userSelect: "none" }}>"</span>
              <p style={{ fontFamily: "Zalando Sans, sans-serif", fontSize: "0.9rem", color: "#4A4A4A", lineHeight: 1.7, flex: 1 }}>{t.quote}</p>
              <div className="flex items-center gap-3" style={{ borderTop: "1px solid #E4E4E4", paddingTop: "1.25rem" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#DDD6EE" }}>
                  <span style={{ fontFamily: "Zalando Sans, sans-serif", fontWeight: 700, color: "#8B7AB8", fontSize: "0.85rem" }}>{t.initial}</span>
                </div>
                <div>
                  <p style={{ fontFamily: "Zalando Sans, sans-serif", fontWeight: 600, color: "#0F0F0F", fontSize: "0.875rem" }}>{t.author}</p>
                  <p style={{ fontFamily: "Zalando Sans, sans-serif", color: "#ABABAB", fontSize: "0.72rem" }}>{t.role} · {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
