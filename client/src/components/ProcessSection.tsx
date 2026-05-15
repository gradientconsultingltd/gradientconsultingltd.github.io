/* ============================================================
   GRADIENT CONSULTING — Process Section
   Design: Horizontal numbered steps on desktop, vertical on mobile
   Dark surface background, gradient connector line
   ============================================================ */

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We invest time understanding your organisation, culture, technical stack, and the specific outcomes you need to achieve.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Whether recruiting talent or architecting AI systems, we design a precise approach tailored to your context and timeline.",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "Our specialists execute with speed and rigour — sourcing candidates or building AI systems to the highest standards.",
  },
  {
    number: "04",
    title: "Delivery",
    description:
      "We don't disappear after placement. We ensure successful onboarding, integration, and long-term outcomes.",
  },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="py-28 relative overflow-hidden"
      style={{ background: "#16161A" }}
    >
      <div className="absolute inset-0 dot-grid opacity-15" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-up">
          <div className="flex items-center justify-center gap-2.5 mb-5">
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
              How We Work
            </span>
            <div
              className="h-px w-8"
              style={{ background: "linear-gradient(90deg, #9B5CF6, #4F8EF7)" }}
            />
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
            A process built for{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #4F8EF7 0%, #9B5CF6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              outcomes.
            </span>
          </h2>
        </div>

        {/* Steps — desktop horizontal, mobile vertical */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, #4F8EF7 20%, #9B5CF6 80%, transparent)",
              opacity: 0.35,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`animate-fade-up flex flex-col gap-5 delay-${(i + 1) * 100}`}
              >
                {/* Number circle */}
                <div className="flex lg:justify-center">
                  <div
                    className="relative w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "#1C1C22",
                      border: "1px solid rgba(79,142,247,0.25)",
                    }}
                  >
                    {/* Gradient ring */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(from 0deg, #4F8EF7 ${i * 25}%, transparent ${i * 25}%)`,
                        opacity: 0.3,
                        padding: "1px",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />
                    <span
                      className="font-display"
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 800,
                        fontSize: "1.4rem",
                        background: "linear-gradient(135deg, #4F8EF7 0%, #9B5CF6 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2 lg:text-center">
                  <h3
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.15rem",
                      color: "#F0EEE8",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: "#6B6B7A",
                      fontSize: "0.875rem",
                      lineHeight: 1.65,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
