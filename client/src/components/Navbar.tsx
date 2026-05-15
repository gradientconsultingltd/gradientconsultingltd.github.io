/* ============================================================
   GRADIENT CONSULTING — Navbar
   Design: Dark blur nav, gradient logo mark, smooth scroll links
   ============================================================ */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Recruitment", href: "#recruitment" },
  { label: "AI Training", href: "#ai-consulting" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "nav-blur" : "bg-transparent"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2.5 group"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              {/* Gradient diamond mark */}
              <div className="relative w-8 h-8 flex-shrink-0">
                <div
                  className="w-full h-full rotate-45 rounded-sm"
                  style={{
                    background: "linear-gradient(135deg, #4F8EF7 0%, #9B5CF6 100%)",
                  }}
                />
                <div
                  className="absolute inset-0.5 rotate-45 rounded-sm"
                  style={{ background: "#0E0E10" }}
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
                  fontSize: "1.1rem",
                  color: "#F0EEE8",
                  letterSpacing: "-0.01em",
                }}
              >
                Gradient
                <span
                  style={{
                    marginLeft: "4px",
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

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="gradient-underline text-sm"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 500,
                    color: "#A0A0B0",
                    background: "none",
                    border: "none",
                    padding: 0,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#F0EEE8")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#A0A0B0")
                  }
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => handleNavClick("#contact")}
                className="btn-gradient px-5 py-2.5 rounded-md text-sm"
              >
                <span>Get in Touch</span>
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(14,14,16,0.97)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "1.5rem",
                color: "#F0EEE8",
                background: "none",
                border: "none",
                transitionDelay: `${i * 50}ms`,
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#contact")}
            className="btn-gradient px-8 py-3 rounded-md text-base mt-4"
          >
            <span>Get in Touch</span>
          </button>
        </div>
      </div>
    </>
  );
}
