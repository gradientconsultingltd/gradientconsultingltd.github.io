/* ============================================================
   GRADIENT CONSULTING — Contact / CTA Section
   Design: Full-width gradient background image, large headline,
   two-column form + info
   Updated: AI training focus options
   ============================================================ */

import { useState } from "react";
import { Mail, MapPin, Phone, ArrowRight, CheckCircle2 } from "lucide-react";

const CTA_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663663026471/6YtD7ZkrEYHm9AjvdcqbxU/gc-cta-bg-VBQqiWZnYzyzCoCsWtHguj.webp";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    padding: "12px 16px",
    color: "#F0EEE8",
    fontFamily: "Outfit, sans-serif",
    fontSize: "0.9rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: "#0E0E10" }}>
      {/* CTA Banner */}
      <div className="relative py-24 overflow-hidden">
        <img
          src={CTA_BG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.4 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(14,14,16,0.8) 0%, rgba(14,14,16,0.5) 100%)",
          }}
        />
        <div className="container relative z-10 text-center">
          <div className="animate-fade-up max-w-3xl mx-auto">
            <h2
              className="font-display leading-tight mb-6"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 4rem)",
                color: "#F0EEE8",
              }}
            >
              Ready to build something
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #4F8EF7 0%, #9B5CF6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                exceptional?
              </span>
            </h2>
            <p
              style={{
                fontFamily: "Outfit, sans-serif",
                color: "#A0A0B0",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                marginBottom: "2.5rem",
              }}
            >
              Whether you're scaling your engineering team, sourcing RLHF specialists,
              or finding domain experts for AI training — we're ready to help.
            </p>
          </div>
        </div>
      </div>

      {/* Contact form + info */}
      <div className="py-20" style={{ background: "#16161A" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Info column */}
            <div className="lg:col-span-2 flex flex-col gap-10 animate-fade-up">
              <div>
                <h3
                  className="font-display mb-3"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    color: "#F0EEE8",
                  }}
                >
                  Get in Touch
                </h3>
                <p
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    color: "#6B6B7A",
                    lineHeight: 1.7,
                    fontSize: "0.9rem",
                  }}
                >
                  We respond to all enquiries within one business day. For urgent
                  requirements, please call us directly.
                </p>
              </div>

              {/* Contact details */}
              <div className="flex flex-col gap-5">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "hello@gradientconsulting.co.uk",
                    href: "mailto:hello@gradientconsulting.co.uk",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+44 (0) 20 0000 0000",
                    href: "tel:+442000000000",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "London, United Kingdom",
                    href: null,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-3.5">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: "rgba(79,142,247,0.1)",
                          border: "1px solid rgba(79,142,247,0.2)",
                        }}
                      >
                        <Icon size={15} style={{ color: "#4F8EF7" }} />
                      </div>
                      <div>
                        <p
                          style={{
                            fontFamily: "Outfit, sans-serif",
                            color: "#6B6B7A",
                            fontSize: "0.75rem",
                            marginBottom: "2px",
                          }}
                        >
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="gradient-underline"
                            style={{
                              fontFamily: "Outfit, sans-serif",
                              color: "#A0A0B0",
                              fontSize: "0.9rem",
                              textDecoration: "none",
                            }}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p
                            style={{
                              fontFamily: "Outfit, sans-serif",
                              color: "#A0A0B0",
                              fontSize: "0.9rem",
                            }}
                          >
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Specialisms */}
              <div
                className="p-5 rounded-xl"
                style={{
                  background: "rgba(79,142,247,0.05)",
                  border: "1px solid rgba(79,142,247,0.12)",
                }}
              >
                <p
                  className="mb-3"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    color: "#F0EEE8",
                    fontSize: "0.9rem",
                  }}
                >
                  Our Specialisms
                </p>
                {[
                  "Tech Recruitment (Perm & Contract)",
                  "RLHF & AI Training Talent",
                  "Domain Expert Placement",
                  "Executive & Leadership Search",
                  "AI Evaluators & Red Teamers",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={13} style={{ color: "#4F8EF7", flexShrink: 0 }} />
                    <span
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        color: "#8A8A9A",
                        fontSize: "0.82rem",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form column */}
            <div className="lg:col-span-3 animate-fade-up delay-200">
              {submitted ? (
                <div
                  className="flex flex-col items-center justify-center h-full gap-5 py-16 rounded-2xl"
                  style={{
                    background: "rgba(79,142,247,0.05)",
                    border: "1px solid rgba(79,142,247,0.15)",
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(79,142,247,0.2), rgba(155,92,246,0.2))",
                    }}
                  >
                    <CheckCircle2 size={32} style={{ color: "#4F8EF7" }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.4rem",
                      color: "#F0EEE8",
                    }}
                  >
                    Message Received
                  </h3>
                  <p
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      color: "#6B6B7A",
                      textAlign: "center",
                      maxWidth: "320px",
                    }}
                  >
                    Thank you for reaching out. A member of our team will be in touch
                    within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          color: "#6B6B7A",
                          fontSize: "0.8rem",
                        }}
                      >
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Jane Smith"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(79,142,247,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          color: "#6B6B7A",
                          fontSize: "0.8rem",
                        }}
                      >
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(79,142,247,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        color: "#6B6B7A",
                        fontSize: "0.8rem",
                      }}
                    >
                      Company / Organisation
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(79,142,247,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        color: "#6B6B7A",
                        fontSize: "0.8rem",
                      }}
                    >
                      I'm interested in *
                    </label>
                    <select
                      required
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      style={{
                        ...inputStyle,
                        cursor: "pointer",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B6B7A' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 16px center",
                        paddingRight: "40px",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(79,142,247,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    >
                      <option value="" disabled style={{ background: "#1C1C22" }}>
                        Select an option
                      </option>
                      <option value="tech-recruitment" style={{ background: "#1C1C22" }}>
                        Tech Recruitment (Perm / Contract)
                      </option>
                      <option value="rlhf-talent" style={{ background: "#1C1C22" }}>
                        RLHF & AI Training Talent
                      </option>
                      <option value="domain-experts" style={{ background: "#1C1C22" }}>
                        Domain Expert Placement
                      </option>
                      <option value="executive-search" style={{ background: "#1C1C22" }}>
                        Executive Search
                      </option>
                      <option value="red-teaming" style={{ background: "#1C1C22" }}>
                        Red Teaming & AI Safety Roles
                      </option>
                      <option value="general" style={{ background: "#1C1C22" }}>
                        General Enquiry
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        color: "#6B6B7A",
                        fontSize: "0.8rem",
                      }}
                    >
                      Tell us about your needs
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Briefly describe what you're looking to achieve..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        minHeight: "100px",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(79,142,247,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gradient flex items-center justify-center gap-2.5 px-8 py-4 rounded-md text-base w-full sm:w-auto sm:self-start"
                  >
                    <span>Send Message</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
