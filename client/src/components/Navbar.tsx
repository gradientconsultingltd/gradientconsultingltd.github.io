/* ============================================================
   GRADIENT CONSULTING — Navbar
   Design: Dark blur nav, gradient logo mark, smooth scroll links
   ============================================================ */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Recruitment", href: "#recruitment" },
  { label: "AI Consulting", href: "#ai-consulting" },
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
                className="font-display font-800 text-lg tracking-tight text-white"
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
              >
                Gradient
                <span className="gradient-text ml-1">Consulting</span>
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="gradient-underline text-sm font-body text-[#A0A0B0] hover:text-white transition-colors duration-200"
                  style={{ fontFamily: "Outfit, sans-serif", fontWeight: 500 }}
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
              className="text-2xl font-display font-800 text-white hover:gradient-text transition-all"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
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
