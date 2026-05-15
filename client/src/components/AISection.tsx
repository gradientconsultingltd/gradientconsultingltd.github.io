/* ============================================================
   GRADIENT CONSULTING — AI Consulting Section
   Design: Text left, AI image right, capability cards below
   ============================================================ */

import { Brain, Network, Code2, BarChart3 } from "lucide-react";

const AI_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663663026471/6YtD7ZkrEYHm9AjvdcqbxU/gc-ai-section-ks4DCLD3T4eovDHghyJj7x.webp";

const capabilities = [
  {
    icon: Brain,
    title: "LLM Architecture",
    desc: "Design and fine-tune large language model systems tailored to your domain and data.",
  },
  {
    icon: Network,
    title: "Multi-Agent Systems",
    desc: "Orchestrate networks of specialised AI agents that collaborate to solve complex tasks autonomously.",
  },
  {
    icon: Code2,
    title: "RAG & Knowledge Bases",
    desc: "Build retrieval-augmented generation pipelines that ground AI responses in your proprietary knowledge.",
  },
  {
    icon: BarChart3,
    title: "AI Observability",
    desc: "Monitor, evaluate, and continuously improve your AI systems with robust evaluation frameworks.",
  },
];

export default function AISection() {
  return (
    <section
      id="ai-consulting"
      className="py-28 relative overflow-hidden"
      style={{ background: "#0E0E10" }}
    >
      {/* Subtle gradient glow in background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(79,142,247,0.05) 0%, rgba(155,92,246,0.04) 40%, transparent 70%)",
        }}
      />

      <div className="container relative z-10">
        {/* Top: text + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Text column */}
          <div className="flex flex-col gap-8">
            <div className="animate-fade-up">
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="h-px w-8"
                  style={{ background: "linear-gradient(90deg, #4F8EF7, #9B5CF6)" }}
                />
                <span
                  className="font-mono-brand text-xs tracking-widest uppercase"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    color: "#9B5CF6",
                    letterSpacing: "0.18em",
                  }}
                >
                  Agentic AI Consulting
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
                Build AI that
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #9B5CF6 0%, #4F8EF7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  thinks and acts.
                </span>
              </h2>
            </div>

            <p
              className="animate-fade-up delay-100 font-body"
              style={{
                fontFamily: "Outfit, sans-serif",
                color: "#8A8A9A",
                lineHeight: 1.75,
                fontSize: "1rem",
              }}
            >
              We don't just advise on AI — we build it. Our team of AI engineers and
              strategists design agentic systems that reason, plan, and execute complex
              workflows with minimal human oversight. From proof-of-concept to production.
            </p>

            <div
              className="animate-fade-up delay-200 p-5 rounded-xl"
              style={{
                background: "rgba(155,92,246,0.06)",
                border: "1px solid rgba(155,92,246,0.18)",
              }}
            >
              <p
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  color: "#9B5CF6",
                  fontSize: "0.8rem",
                  lineHeight: 1.6,
                }}
              >
                <span style={{ color: "#4F8EF7" }}>const</span>{" "}
                <span style={{ color: "#F0EEE8" }}>agent</span>{" "}
                <span style={{ color: "#6B6B7A" }}>=</span>{" "}
                <span style={{ color: "#9B5CF6" }}>new</span>{" "}
                <span style={{ color: "#F0EEE8" }}>GradientAgent</span>
                {"({"}
                <br />
                &nbsp;&nbsp;<span style={{ color: "#4F8EF7" }}>capabilities</span>
                {": ["}
                <span style={{ color: "#A0A0B0" }}>'reason'</span>
                {", "}
                <span style={{ color: "#A0A0B0" }}>'plan'</span>
                {", "}
                <span style={{ color: "#A0A0B0" }}>'execute'</span>
                {"],"}
                <br />
                &nbsp;&nbsp;<span style={{ color: "#4F8EF7" }}>domain</span>
                {": "}
                <span style={{ color: "#A0A0B0" }}>'your-business'</span>
                <br />
                {"})"}
              </p>
            </div>

            <div className="animate-fade-up delay-300">
              <button
                className="btn-gradient px-7 py-3.5 rounded-md text-sm"
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span>Discuss Your AI Project</span>
              </button>
            </div>
          </div>

          {/* Image column */}
          <div className="animate-scale-in delay-200 relative">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                aspectRatio: "1/1",
                border: "1px solid rgba(155,92,246,0.2)",
                boxShadow: "0 0 80px rgba(155,92,246,0.1)",
              }}
            >
              <img
                src={AI_IMG}
                alt="Agentic AI"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Capabilities grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className={`animate-fade-up card-surface rounded-xl p-6 flex flex-col gap-4 group delay-${(i + 1) * 100}`}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(155,92,246,0.15) 0%, rgba(79,142,247,0.15) 100%)",
                    border: "1px solid rgba(155,92,246,0.2)",
                  }}
                >
                  <Icon size={16} style={{ color: "#9B5CF6" }} />
                </div>
                <h3
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#F0EEE8",
                  }}
                >
                  {cap.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    color: "#6B6B7A",
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                  }}
                >
                  {cap.desc}
                </p>
                {/* Hover gradient line */}
                <div
                  className="h-0.5 w-0 group-hover:w-full transition-all duration-400 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #9B5CF6, #4F8EF7)",
                    transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
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
