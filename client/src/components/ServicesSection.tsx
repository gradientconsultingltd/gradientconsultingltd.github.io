/* ============================================================
   GRADIENT CONSULTING — Services Section
   Design: Bento-grid layout, numbered cards, gradient borders on hover
   ============================================================ */

import { Users, Bot, Cpu, Search, Zap, Globe } from "lucide-react";

const services = [
  {
    number: "01",
    icon: Users,
    title: "Tech Recruitment",
    description:
      "Precision placement of software engineers, architects, data scientists, and product leaders across the UK and Europe. We don't just fill roles — we build teams.",
    tags: ["Engineering", "Product", "Data"],
    wide: true,
  },
  {
    number: "02",
    icon: Bot,
    title: "Agentic AI Systems",
    description:
      "Design and deploy autonomous AI agents that reason, plan, and act. From LLM orchestration to multi-agent workflows.",
    tags: ["LLMs", "Agents", "Automation"],
    wide: false,
  },
  {
    number: "03",
    icon: Cpu,
    title: "AI Strategy & Consulting",
    description:
      "Roadmap your organisation's AI transformation with expert guidance on tooling, architecture, and change management.",
    tags: ["Strategy", "Architecture"],
    wide: false,
  },
  {
    number: "04",
    icon: Search,
    title: "Executive Search",
    description:
      "Retained search for CTO, VP Engineering, Head of AI, and other senior technology leadership roles.",
    tags: ["C-Suite", "VP", "Director"],
    wide: false,
  },
  {
    number: "05",
    icon: Zap,
    title: "AI Integration",
    description:
      "Embed AI capabilities into your existing products and workflows — from RAG pipelines to intelligent process automation.",
    tags: ["RAG", "Pipelines", "APIs"],
    wide: false,
  },
  {
    number: "06",
    icon: Globe,
    title: "Contract & Interim",
    description:
      "Rapid deployment of specialist contractors for project-critical roles. Flexible engagements from days to years.",
    tags: ["Contract", "Interim", "Flexible"],
    wide: true,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-28" style={{ background: "#0E0E10" }}>
      <div className="container">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="animate-fade-up">
            <div className="flex items-center gap-2.5 mb-4">
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
                What We Do
              </span>
            </div>
            <h2
              className="font-display leading-tight"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#F0EEE8",
              }}
            >
              Two disciplines.
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #4F8EF7 0%, #9B5CF6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                One vision.
              </span>
            </h2>
          </div>
          <p
            className="animate-fade-up delay-200 font-body max-w-sm"
            style={{
              fontFamily: "Outfit, sans-serif",
              color: "#6B6B7A",
              lineHeight: 1.7,
            }}
          >
            We bridge the gap between exceptional human talent and intelligent
            machine capability — helping organisations thrive in the age of AI.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.number}
                className={`animate-fade-up card-surface rounded-xl p-7 flex flex-col gap-5 relative overflow-hidden group ${
                  service.wide ? "lg:col-span-2" : ""
                } delay-${Math.min((i + 1) * 100, 600)}`}
              >
                {/* Background number */}
                <span
                  className="absolute -top-2 -right-2 font-display font-800 select-none pointer-events-none"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: "5rem",
                    lineHeight: 1,
                    background:
                      "linear-gradient(135deg, rgba(79,142,247,0.07) 0%, rgba(155,92,246,0.07) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {service.number}
                </span>

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(79,142,247,0.15) 0%, rgba(155,92,246,0.15) 100%)",
                    border: "1px solid rgba(79,142,247,0.2)",
                  }}
                >
                  <Icon size={18} style={{ color: "#4F8EF7" }} />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 flex-1">
                  <h3
                    className="font-display"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      color: "#F0EEE8",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: "#8A8A9A",
                      lineHeight: 1.65,
                      fontSize: "0.9rem",
                    }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        background: "rgba(79,142,247,0.08)",
                        border: "1px solid rgba(79,142,247,0.18)",
                        color: "#4F8EF7",
                        fontSize: "0.7rem",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover gradient line at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(90deg, #4F8EF7, #9B5CF6)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
