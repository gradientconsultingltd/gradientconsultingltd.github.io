/* ============================================================
   GRADIENT CONSULTING — Stats / Social Proof Section
   Design: Full-width dark ticker with animated count-up numbers
   ============================================================ */

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

const statsData = [
  { value: 200, suffix: "+", label: "Successful Placements" },
  { value: 50, suffix: "+", label: "AI Training Projects" },
  { value: 98, suffix: "%", label: "Candidate Retention" },
  { value: 3, suffix: "", label: "Platform Partners" },
];

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, 1600, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5 px-8 py-6">
      <div className="flex items-baseline gap-0.5">
        <span
          className="font-display"
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            background: "linear-gradient(135deg, #4F8EF7 0%, #9B5CF6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {count}
        </span>
        <span
          className="font-display"
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            background: "linear-gradient(135deg, #4F8EF7 0%, #9B5CF6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {suffix}
        </span>
      </div>
      <span
        style={{
          fontFamily: "Outfit, sans-serif",
          color: "#6B6B7A",
          fontSize: "0.8rem",
          textAlign: "center",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="stats-ticker relative overflow-hidden" style={{ background: "#0E0E10" }}>
      {/* Gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(79,142,247,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10">
        <div className="flex flex-wrap justify-center divide-x divide-white/5">
          {statsData.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
