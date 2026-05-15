/* ============================================================
   GRADIENT CONSULTING — Hero Section
   Design: Full-height dark hero, left-aligned display text,
   gradient data-stream background image, animated word reveal
   ============================================================ */

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663663026471/6YtD7ZkrEYHm9AjvdcqbxU/gc-hero-bg-C93zcDt8t7JexJpt9faELi.webp";

const words = ["Talent.", "Intelligence.", "Transformation."];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#0E0E10" }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.55 }}
        />
        {/* Dark gradient overlay — heavier on left for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(14,14,16,0.92) 0%, rgba(14,14,16,0.65) 50%, rgba(14,14,16,0.3) 100%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{
            background: "linear-gradient(to top, #0E0E10 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Dot grid overlay */}
      <div className="absolute inset-0 z-0 dot-grid opacity-30" />

      {/* Content */}
      <div className="container relative z-10 pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Tag line */}
          <div
            className={`flex items-center gap-2.5 mb-8 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
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
              UK Tech Recruitment & AI Consulting
            </span>
          </div>

          {/* Main headline */}
          <h1
            className={`font-display leading-none mb-6 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3rem, 7vw, 6rem)",
              color: "#F0EEE8",
              transitionDelay: "200ms",
            }}
          >
            We Deliver
            <br />
            <span
              className="transition-all duration-400"
              style={{
                background: "linear-gradient(135deg, #4F8EF7 0%, #9B5CF6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                display: "inline-block",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              {words[wordIndex]}
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={`font-body text-lg md:text-xl leading-relaxed mb-10 max-w-xl transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 400,
              color: "#A0A0B0",
              transitionDelay: "350ms",
            }}
          >
            Gradient Consulting connects exceptional tech talent with forward-thinking
            organisations — and builds the agentic AI systems that power the next generation
            of business.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <button
              className="btn-gradient px-7 py-3.5 rounded-md text-base"
              onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span>Explore Services</span>
            </button>
            <button
              className="btn-ghost-light px-7 py-3.5 rounded-md text-base"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Talk to Us
            </button>
          </div>

          {/* Trust indicators */}
          <div
            className={`flex flex-wrap items-center gap-6 mt-14 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "650ms" }}
          >
            {[
              { value: "200+", label: "Placements" },
              { value: "50+", label: "AI Projects" },
              { value: "98%", label: "Retention Rate" },
              { value: "UK-Based", label: "Expert Team" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span
                  className="font-display text-2xl font-800 gradient-text"
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "#6B6B7A", fontFamily: "Outfit, sans-serif" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 group"
        aria-label="Scroll down"
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            color: "#6B6B7A",
            fontSize: "10px",
          }}
        >
          Scroll
        </span>
        <ChevronDown
          size={18}
          className="animate-bounce"
          style={{ color: "#4F8EF7" }}
        />
      </button>
    </section>
  );
}
