/* ============================================================
   GRADIENT CONSULTING — Tech Recruitment Section
   Design: Two-column, image left / text right, dark surface bg
   ============================================================ */

import { CheckCircle2 } from "lucide-react";

const RECRUITMENT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663663026471/6YtD7ZkrEYHm9AjvdcqbxU/gc-recruitment-section-Em8o8ky5pBGdwa7GTcAHRD.webp";

const highlights = [
  "Software Engineers & Architects",
  "Data Scientists & ML Engineers",
  "DevOps, Platform & Cloud Engineers",
  "Product Managers & Designers",
  "CTO, VP Engineering & Tech Leadership",
  "AI/ML Research & Applied Scientists",
];

const stats = [
  { value: "14", unit: "days", label: "Average time-to-hire" },
  { value: "98%", unit: "", label: "Candidate retention at 12 months" },
  { value: "200+", unit: "", label: "Placements across the UK" },
];

export default function RecruitmentSection() {
  return (
    <section
      id="recruitment"
      className="py-28 relative overflow-hidden"
      style={{ background: "#16161A" }}
    >
      {/* Subtle dot grid */}
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image column */}
          <div className="animate-scale-in relative">
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img
                src={RECRUITMENT_IMG}
                alt="Tech Recruitment"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(79,142,247,0.15) 0%, rgba(155,92,246,0.1) 100%)",
                }}
              />
            </div>

            {/* Floating stat card */}
            <div
              className="absolute -bottom-6 -right-4 md:-right-8 p-5 rounded-xl"
              style={{
                background: "#1C1C22",
                border: "1px solid rgba(79,142,247,0.25)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              }}
            >
              <div className="flex items-end gap-1">
                <span
                  className="font-display"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: "2.5rem",
                    background: "linear-gradient(135deg, #4F8EF7 0%, #9B5CF6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1,
                  }}
                >
                  14
                </span>
                <span
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    color: "#6B6B7A",
                    fontSize: "0.85rem",
                    paddingBottom: "4px",
                  }}
                >
                  day avg. hire
                </span>
              </div>
              <p
                style={{
                  fontFamily: "Outfit, sans-serif",
                  color: "#6B6B7A",
                  fontSize: "0.75rem",
                  marginTop: "4px",
                }}
              >
                Faster than industry average
              </p>
            </div>
          </div>

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
                    color: "#4F8EF7",
                    letterSpacing: "0.18em",
                  }}
                >
                  Tech Recruitment
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
                The right talent,
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #4F8EF7 0%, #9B5CF6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  right now.
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
              We specialise in placing high-calibre technology professionals across the
              full stack — from individual contributors to executive leadership. Our deep
              network and sector expertise means we move fast without compromising on fit.
            </p>

            {/* Highlights list */}
            <ul className="animate-fade-up delay-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "#4F8EF7" }}
                  />
                  <span
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: "#A0A0B0",
                      fontSize: "0.875rem",
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Stats row */}
            <div className="animate-fade-up delay-300 flex flex-wrap gap-8 pt-2">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-1">
                    <span
                      className="font-display"
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 800,
                        fontSize: "1.75rem",
                        background: "linear-gradient(135deg, #4F8EF7 0%, #9B5CF6 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {stat.value}
                    </span>
                    {stat.unit && (
                      <span style={{ color: "#6B6B7A", fontSize: "0.85rem" }}>
                        {stat.unit}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: "#6B6B7A",
                      fontSize: "0.75rem",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="animate-fade-up delay-400">
              <button
                className="btn-gradient px-7 py-3.5 rounded-md text-sm"
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span>Start a Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
