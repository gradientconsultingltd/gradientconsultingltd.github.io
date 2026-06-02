import { Brain, FlaskConical, MessageSquareCode, BarChart3, BookOpen, Cpu } from "lucide-react";

const AI_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663663026471/6YtD7ZkrEYHm9AjvdcqbxU/gc-ai-section-ks4DCLD3T4eovDHghyJj7x.webp";

const capabilities = [
  { icon: Brain,              title: "RLHF Specialists",  desc: "Reinforcement Learning from Human Feedback trainers who evaluate, rank, and refine model outputs to align AI behaviour." },
  { icon: MessageSquareCode,  title: "Prompt Engineers",  desc: "Experts who craft, test, and optimise prompts to improve model accuracy, reasoning, and instruction-following." },
  { icon: BookOpen,           title: "Domain Experts",    desc: "Subject-matter specialists from medicine, law, finance, and STEM — providing ground-truth knowledge for AI training datasets." },
  { icon: FlaskConical,       title: "Data Annotators",   desc: "Skilled annotators for text, code, image, and multimodal datasets. Quality-focused, scalable, and domain-aware." },
  { icon: Cpu,                title: "AI Evaluators",     desc: "Human evaluators who assess model responses for accuracy, safety, and helpfulness across diverse task categories." },
  { icon: BarChart3,          title: "Red Teamers",       desc: "Adversarial testers who probe AI systems for failure modes, biases, and safety vulnerabilities before deployment." },
];

export default function AISection() {
  return (
    <section id="ai-consulting" className="py-24 md:py-32 relative overflow-hidden" style={{ background: "#F8FAFC" }}>
      {/* Blob */}
      <div className="coral-blob" style={{ width: 500, height: 400, background: "radial-gradient(circle, rgba(251,146,60,0.1) 0%, rgba(244,63,94,0.05) 50%, transparent 70%)", top: -60, right: -80, zIndex: 0 }} />

      <div className="container relative z-10">
        {/* Top: text + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center mb-16">

          {/* Text */}
          <div className="flex flex-col gap-8">
            <div className="animate-fade-up">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="h-px w-6" style={{ background: "linear-gradient(90deg, #F43F5E, #FB923C)" }} />
                <span className="eyebrow">AI Training Recruitment</span>
              </div>
              <h2 style={{ fontFamily: "Zalando Sans, sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#0F172A", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
                The humans behind{" "}
                <span style={{ background: "linear-gradient(135deg, #F43F5E 0%, #FB923C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontStyle: "italic" }}>
                  smarter AI.
                </span>
              </h2>
            </div>

            <p className="animate-fade-up delay-100" style={{ fontFamily: "Zalando Sans, sans-serif", color: "#64748B", lineHeight: 1.75, fontSize: "0.95rem" }}>
              The most capable AI models are built on high-quality human feedback. We recruit
              the specialists who make that possible — RLHF trainers, domain experts, data
              annotators, and AI evaluators — for the world's leading AI training platforms.
            </p>

            <p className="animate-fade-up delay-150" style={{ fontFamily: "Zalando Sans, sans-serif", color: "#64748B", lineHeight: 1.75, fontSize: "0.95rem" }}>
              Our talent pool spans deep <strong style={{ color: "#0F172A" }}>domain knowledge</strong> across
              medicine, law, finance, engineering, and the sciences.
            </p>

            {/* Tags */}
            <div className="animate-fade-up delay-200 flex flex-wrap gap-2">
              {["RLHF", "Instruction Tuning", "Preference Data", "Red Teaming", "Constitutional AI", "Domain Annotation"].map((tag) => (
                <span key={tag} style={{ fontFamily: "Zalando Sans, sans-serif", background: "#FFF1F2", border: "1px solid #FFE4E6", color: "#F43F5E", fontSize: "0.65rem", letterSpacing: "0.04em", borderRadius: 99, padding: "4px 12px" }}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="animate-fade-up delay-300">
              <button className="btn-rose px-7 py-3.5 rounded-xl text-sm" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>
                Find AI Training Talent
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="animate-scale-in delay-200 relative">
            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "1/1", boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 20px 60px rgba(0,0,0,0.1)" }}>
              <img src={AI_IMG} alt="AI Training" className="w-full h-full object-cover" />
            </div>
            {/* Badge */}
            <div className="float-b absolute -bottom-5 -left-4 md:-left-8 px-5 py-4 rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }}>
              <p style={{ fontFamily: "Zalando Sans, sans-serif", color: "#94A3B8", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 3 }}>Specialising in</p>
              <p style={{ fontFamily: "Zalando Sans, sans-serif", fontWeight: 700, fontSize: "1rem", background: "linear-gradient(135deg, #F43F5E, #FB923C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                RLHF Talent
              </p>
            </div>
          </div>
        </div>

        {/* Capability cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div key={cap.title} className={`animate-fade-up gc-card p-6 flex flex-col gap-4 group delay-${Math.min((i + 1) * 100, 500)}`}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(244,63,94,0.08), rgba(251,146,60,0.08))", border: "1px solid rgba(244,63,94,0.12)" }}>
                  <Icon size={16} color="#F43F5E" />
                </div>
                <h3 style={{ fontFamily: "Zalando Sans, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#0F172A" }}>{cap.title}</h3>
                <p style={{ fontFamily: "Zalando Sans, sans-serif", color: "#64748B", fontSize: "0.85rem", lineHeight: 1.6 }}>{cap.desc}</p>
                <div className="h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-300" style={{ background: "linear-gradient(90deg, #F43F5E, #FB923C)" }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
