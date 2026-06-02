import { CheckCircle2 } from "lucide-react";

const RECRUITMENT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663663026471/6YtD7ZkrEYHm9AjvdcqbxU/gc-recruitment-section-Em8o8ky5pBGdwa7GTcAHRD.webp";

const highlights = [
  "Software Engineers & Architects",
  "RLHF & AI Training Specialists",
  "Domain Experts (Medicine, Law, Finance)",
  "Data Scientists & ML Engineers",
  "Prompt Engineers & AI Evaluators",
  "Data Annotators & Red Teamers",
  "DevOps, Platform & Cloud Engineers",
  "CTO, VP Engineering & Tech Leadership",
];

export default function RecruitmentSection() {
  return (
    <section id="recruitment" className="py-24 md:py-32 relative overflow-hidden" style={{ background: "#FFFFFF" }}>
      {/* Subtle blob */}
      <div className="coral-blob" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(244,63,94,0.07) 0%, transparent 70%)", bottom: 0, left: -80, zIndex: 0 }} />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Image */}
          <div className="animate-scale-in relative order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3", boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 20px 60px rgba(0,0,0,0.1)" }}>
              <img src={RECRUITMENT_IMG} alt="Tech Recruitment" className="w-full h-full object-cover" />
            </div>
            {/* Floating stat card */}
            <div
              className="float-a absolute -bottom-6 -right-4 md:-right-8 px-6 py-5 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }}
            >
              <p style={{ fontFamily: "Zalando Sans, sans-serif", fontWeight: 700, fontSize: "1.8rem", color: "#0F172A", letterSpacing: "-0.01em", lineHeight: 1 }}>200+</p>
              <p style={{ fontFamily: "Zalando Sans, sans-serif", color: "#94A3B8", fontSize: "0.75rem", marginTop: 4 }}>Placements across tech & AI</p>
              <div style={{ height: 3, borderRadius: 99, background: "linear-gradient(90deg, #F43F5E, #FB923C)", marginTop: 10 }} />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-8 order-1 lg:order-2">
            <div className="animate-fade-up">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="h-px w-6" style={{ background: "linear-gradient(90deg, #F43F5E, #FB923C)" }} />
                <span className="eyebrow">Tech & AI Recruitment</span>
              </div>
              <h2 style={{ fontFamily: "Zalando Sans, sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#0F172A", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
                Talent with skills{" "}
                <span style={{ background: "linear-gradient(135deg, #F43F5E 0%, #FB923C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontStyle: "italic" }}>
                  and domain knowledge.
                </span>
              </h2>
            </div>

            <p className="animate-fade-up delay-100" style={{ fontFamily: "Zalando Sans, sans-serif", color: "#64748B", lineHeight: 1.75, fontSize: "0.95rem" }}>
              We place high-calibre technology professionals and domain specialists
              across the full spectrum of tech and AI roles — from software engineers
              to RLHF trainers, from data scientists to the subject-matter experts
              whose knowledge powers the next generation of AI models.
            </p>

            <ul className="animate-fade-up delay-200 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" color="#F43F5E" />
                  <span style={{ fontFamily: "Zalando Sans, sans-serif", color: "#64748B", fontSize: "0.875rem" }}>{item}</span>
                </li>
              ))}
            </ul>

            <div className="animate-fade-up delay-300">
              <button
                className="btn-rose px-7 py-3.5 rounded-xl text-sm"
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Start a Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
