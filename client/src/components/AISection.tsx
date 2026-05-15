/* ============================================================
   GRADIENT CONSULTING — AI Training Jobs Section
   Design: Emphasis on AI training roles, RLHF, domain knowledge
   Text left, AI image right, capability cards below
   ============================================================ */

import { Brain, FlaskConical, MessageSquareCode, BarChart3, BookOpen, Cpu } from "lucide-react";

const AI_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663663026471/6YtD7ZkrEYHm9AjvdcqbxU/gc-ai-section-ks4DCLD3T4eovDHghyJj7x.webp";

const capabilities = [
  {
    icon: Brain,
    title: "RLHF Specialists",
    desc: "Reinforcement Learning from Human Feedback trainers who evaluate, rank, and refine model outputs to align AI behaviour.",
  },
  {
    icon: MessageSquareCode,
    title: "Prompt Engineers",
    desc: "Experts who craft, test, and optimise prompts to improve model accuracy, reasoning, and instruction-following.",
  },
  {
    icon: BookOpen,
    title: "Domain Experts",
    desc: "Subject-matter specialists — from medicine and law to finance and STEM — who provide ground-truth knowledge for AI training datasets.",
  },
  {
    icon: FlaskConical,
    title: "Data Annotators",
    desc: "Skilled annotators for text, code, image, and multimodal datasets. Quality-focused, scalable, and domain-aware.",
  },
  {
    icon: Cpu,
    title: "AI Evaluators",
    desc: "Human evaluators who assess model responses for accuracy, safety, and helpfulness across diverse task categories.",
  },
  {
    icon: BarChart3,
    title: "Red Teamers",
    desc: "Adversarial testers who probe AI systems for failure modes, biases, and safety vulnerabilities before deployment.",
  },
];

export default function AISection() {
  return (
    <section
      id="ai-consulting"
      className="py-28 relative overflow-hidden"
      style={{ background: "#0E0E10" }}
    >
      {/* Subtle gradient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(79,142,247,0.05) 0%, rgba(155,92,246,0.04) 40%, transparent 70%)",
        }}
      />

      <div className="container relative z-10">
        {/* Top: text + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          {/* Text column */}
          <div className="flex flex-col gap-8">
            <div className="animate-fade-up">
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="h-px w-8"
                  style={{ background: "linear-gradient(90deg, #4F8EF7, #9B5CF6)" }}
                />
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.7rem",
                    color: "#9B5CF6",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  AI Training Recruitment
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
                The humans behind
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #9B5CF6 0%, #4F8EF7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  smarter AI.
                </span>
              </h2>
            </div>

            <p
              className="animate-fade-up delay-100"
              style={{
                fontFamily: "Outfit, sans-serif",
                color: "#8A8A9A",
                lineHeight: 1.75,
                fontSize: "1rem",
              }}
            >
              The most capable AI models are built on high-quality human feedback.
              We recruit the specialists who make that possible — RLHF trainers,
              domain experts, data annotators, and AI evaluators — for the world's
              leading AI training platforms.
            </p>

            <p
              className="animate-fade-up delay-150"
              style={{
                fontFamily: "Outfit, sans-serif",
                color: "#8A8A9A",
                lineHeight: 1.75,
                fontSize: "1rem",
              }}
            >
              Our talent pool spans deep <strong style={{ color: "#A0A0B0" }}>domain knowledge</strong> across
              medicine, law, finance, engineering, and the sciences — because great AI
              training requires genuine expertise, not just technical skills.
            </p>

            {/* RLHF highlight pill */}
            <div
              className="animate-fade-up delay-200 flex flex-wrap gap-2.5"
            >
              {[
                "RLHF",
                "Instruction Tuning",
                "Preference Data",
                "Red Teaming",
                "Constitutional AI",
                "Domain Annotation",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    background: "rgba(155,92,246,0.08)",
                    border: "1px solid rgba(155,92,246,0.2)",
                    color: "#9B5CF6",
                    fontSize: "0.72rem",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="animate-fade-up delay-300">
              <button
                className="btn-gradient px-7 py-3.5 rounded-md text-sm"
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span>Find AI Training Talent</span>
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
                alt="AI Training"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating RLHF badge */}
            <div
              className="absolute -bottom-5 -left-4 md:-left-8 px-5 py-4 rounded-xl"
              style={{
                background: "#1C1C22",
                border: "1px solid rgba(155,92,246,0.3)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              }}
            >
              <p
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  color: "#9B5CF6",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                Specialising in
              </p>
              <p
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  color: "#F0EEE8",
                  fontSize: "1.1rem",
                  background: "linear-gradient(135deg, #9B5CF6 0%, #4F8EF7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                RLHF Talent
              </p>
            </div>
          </div>
        </div>

        {/* Capabilities grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className={`animate-fade-up card-surface rounded-xl p-6 flex flex-col gap-4 group delay-${Math.min((i + 1) * 100, 600)}`}
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
