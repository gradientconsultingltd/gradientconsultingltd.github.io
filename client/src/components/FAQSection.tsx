import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const tabs = [
  { id: "all",     label: "All Questions" },
  { id: "general", label: "General Questions" },
  { id: "started", label: "Getting Started" },
  { id: "process", label: "Implementation" },
  { id: "results", label: "Results" },
];

const faqs: Record<string, { q: string; a: string }[]> = {
  all: [
    { q: "What makes Gradient's approach different?", a: "We combine specialist AI recruitment expertise with genuine understanding of RLHF workflows, ML engineering, and domain annotation. Unlike generalist recruiters, every search starts with deep technical intake — not just a job spec." },
    { q: "How do we know if Gradient is the right fit for our organisation?", a: "We work best with companies that value specialist knowledge over speed-of-CV. If you need someone who genuinely understands RLHF workflows, domain annotation, or engineering leadership — and you're frustrated with generalist recruiters — we're likely a good fit. We offer a no-obligation discovery call." },
    { q: "What happens during rapid placement?", a: "Week one is intake: a deep-dive with your hiring manager. Week two we begin active sourcing across our network. By week three you'll have a shortlist of pre-vetted candidates with our written assessment of each." },
    { q: "How do you measure success?", a: "We measure success by 12-month retention, not just placements. 98% of our placed candidates remain in post at 12 months. If a candidate leaves within that period for performance reasons, we re-source at no additional placement fee." },
  ],
  general: [
    { q: "What makes Gradient's approach different?", a: "We combine specialist AI recruitment expertise with genuine understanding of RLHF workflows, ML engineering, and domain annotation. Unlike generalist recruiters, every search starts with deep technical intake — not just a job spec." },
    { q: "Which AI training platforms do you partner with?", a: "We have active relationships with Outlier, Mercor, and Turing, placing RLHF specialists, domain experts, and technical contributors. We also work directly with AI labs and enterprises building in-house training capabilities." },
  ],
  started: [
    { q: "How do we know if Gradient is the right fit for our organisation?", a: "We work best with companies that value specialist knowledge over speed-of-CV. If you need someone who genuinely understands RLHF workflows, domain annotation, or engineering leadership — we're likely a good fit." },
    { q: "What does the first three weeks involve?", a: "Week one is intake: a deep-dive with your hiring manager. Week two we begin active sourcing. By week three you'll have a shortlist of pre-vetted candidates with our written assessment of each." },
    { q: "Do you work with early-stage companies?", a: "Yes, though our sweet spot is Series A and beyond where there's genuine urgency to build out specialist teams. For early-stage companies, we're selective — if we take the mandate, we commit fully." },
  ],
  process: [
    { q: "What happens during rapid placement?", a: "Week one is intake: a deep-dive with your hiring manager. Week two we begin active sourcing across our network. By week three you'll have a shortlist of pre-vetted candidates." },
    { q: "How long does a typical search take?", a: "For most technical roles: 2–4 weeks to a qualified shortlist. Senior and executive searches take 4–8 weeks. RLHF and domain expert roles may take longer depending on the specialisation." },
    { q: "What does your vetting process include?", a: "Technical screening relevant to the role, a structured competency interview, reference checks, and a cultural-fit assessment against your specific team. For RLHF roles we include task-based evaluation where appropriate." },
  ],
  results: [
    { q: "How do you measure success?", a: "We measure success by 12-month retention, not just placements. 98% of our placed candidates remain in post at 12 months. If a candidate leaves within that period, we re-source at no additional fee." },
    { q: "What is your candidate retention rate?", a: "98% at 12 months across all placements. We believe this reflects the quality of our matching process — not just finding someone who can do the job, but someone who wants to stay and grow." },
  ],
};

export default function FAQSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const items = faqs[activeTab] ?? [];

  return (
    <section id="faq" style={{ background: "#FFFFFF", padding: "7rem 0" }}>
      <div className="container">

        {/* Centered header */}
        <div className="animate-fade-up" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="label-sm mb-4" style={{ display: "block", color: "#B8A9D4" }}>FAQs</p>
          <h2 style={{ fontFamily: "Zalando Sans, sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.08, letterSpacing: "-0.01em", background: "linear-gradient(180deg, #0A0A0A 0%, #888888 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Frequently Asked<br />Questions
          </h2>
        </div>

        {/* Tabs */}
        <div className="animate-fade-up delay-100" style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: "3rem" }}>
          {tabs.map((t) => {
            const active = t.id === activeTab;
            return (
              <button key={t.id} onClick={() => { setActiveTab(t.id); setOpenIdx(0); }}
                style={{ fontFamily: "Zalando Sans, sans-serif", fontWeight: active ? 600 : 400, fontSize: "0.95rem", padding: "9px 20px", borderRadius: 99, border: active ? "none" : "1px solid #E4E4E4", background: active ? "#0A0A0A" : "transparent", color: active ? "#FFFFFF" : "#6B6B6B", transition: "all 0.15s", cursor: "pointer" }}>
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Accordion */}
        <div className="animate-fade-up delay-200" style={{ maxWidth: 700, margin: "0 auto" }}>
          {items.map((item, i) => (
            <div key={`${activeTab}-${i}`} style={{ borderTop: "1px solid #E8E8E8" }}>
              <button className="w-full flex items-start justify-between gap-4 py-5 text-left"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{ background: "none", border: "none", cursor: "pointer", width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, padding: "20px 0" }}>
                <span style={{ fontFamily: "Zalando Sans, sans-serif", fontWeight: 600, fontSize: "1.1rem", color: "#0A0A0A", lineHeight: 1.4 }}>{item.q}</span>
                <span style={{ flexShrink: 0, marginTop: 2 }}>
                  {openIdx === i
                    ? <Minus size={16} color="#ABABAB" />
                    : <Plus size={16} color="#ABABAB" />}
                </span>
              </button>
              {openIdx === i && (
                <div style={{ paddingBottom: "1.25rem" }}>
                  <p style={{ fontFamily: "Zalando Sans, sans-serif", fontSize: "1.05rem", color: "#6B6B6B", lineHeight: 1.75 }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
          <div style={{ borderTop: "1px solid #E8E8E8" }} />
        </div>

        {/* Bottom CTA */}
        <div className="animate-fade-up delay-300" style={{ textAlign: "center", marginTop: "3rem" }}>
          <p style={{ fontFamily: "Zalando Sans, sans-serif", fontSize: "1.05rem", color: "#6B6B6B", marginBottom: "0.75rem" }}>
            Have more questions? Contact our team anytime — we're here 24/5.
          </p>
          <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{ fontFamily: "Zalando Sans, sans-serif", fontWeight: 600, fontSize: "1rem", color: "#0A0A0A", background: "transparent", border: "1.5px solid #0A0A0A", borderRadius: 99, padding: "10px 26px", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#0A0A0A"; (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#0A0A0A"; }}>
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
