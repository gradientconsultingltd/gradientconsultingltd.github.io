/* ============================================================
   GRADIENT CONSULTING — Footer
   Design: Dark footer, logo, nav links, social icons, legal
   ============================================================ */

import { Linkedin, Twitter, Github } from "lucide-react";

const navGroups = [
  {
    title: "Services",
    links: [
      { label: "Tech Recruitment", href: "#recruitment" },
      { label: "AI Consulting", href: "#ai-consulting" },
      { label: "Executive Search", href: "#services" },
      { label: "Contract & Interim", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Process", href: "#process" },
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Expertise",
    links: [
      { label: "Software Engineering", href: "#" },
      { label: "Data & AI", href: "#" },
      { label: "Product & Design", href: "#" },
      { label: "DevOps & Cloud", href: "#" },
    ],
  },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    if (href === "#") return;
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "#0A0A0C", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2.5 w-fit"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div className="relative w-7 h-7 flex-shrink-0">
                <div
                  className="w-full h-full rotate-45 rounded-sm"
                  style={{
                    background: "linear-gradient(135deg, #4F8EF7 0%, #9B5CF6 100%)",
                  }}
                />
                <div
                  className="absolute inset-0.5 rotate-45 rounded-sm"
                  style={{ background: "#0A0A0C" }}
                />
                <div
                  className="absolute inset-1.5 rotate-45 rounded-sm"
                  style={{
                    background: "linear-gradient(135deg, #4F8EF7 0%, #9B5CF6 100%)",
                    opacity: 0.7,
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "1rem",
                  color: "#F0EEE8",
                }}
              >
                Gradient{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #4F8EF7 0%, #9B5CF6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Consulting
                </span>
              </span>
            </a>

            <p
              style={{
                fontFamily: "Outfit, sans-serif",
                color: "#6B6B7A",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                maxWidth: "280px",
              }}
            >
              UK-based tech recruitment and agentic AI consultancy. Connecting exceptional
              talent with forward-thinking organisations.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter / X" },
                { icon: Github, href: "#", label: "GitHub" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(79,142,247,0.4)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(79,142,247,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  <Icon size={15} style={{ color: "#6B6B7A" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-4">
              <h4
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  color: "#F0EEE8",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {group.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="gradient-underline text-left"
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        color: "#6B6B7A",
                        fontSize: "0.875rem",
                        transition: "color 0.2s ease",
                        background: "none",
                        border: "none",
                        padding: 0,
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "#A0A0B0")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "#6B6B7A")
                      }
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-14 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            style={{
              fontFamily: "Outfit, sans-serif",
              color: "#4A4A5A",
              fontSize: "0.8rem",
            }}
          >
            © {new Date().getFullYear()} Gradient Consulting Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <button
                key={item}
                style={{
                  fontFamily: "Outfit, sans-serif",
                  color: "#4A4A5A",
                  fontSize: "0.8rem",
                  background: "none",
                  border: "none",
                  padding: 0,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#6B6B7A")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#4A4A5A")
                }
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
