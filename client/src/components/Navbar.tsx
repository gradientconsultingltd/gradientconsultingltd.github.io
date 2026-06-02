import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      // Hero is ~100vh; after that we're on white sections
      setOnDark(y < window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (href: string) => {
    if (href === "#") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 64,
      display: "flex", alignItems: "center",
      background: !scrolled ? "transparent" : onDark ? "rgba(10,10,10,0.92)" : "rgba(255,255,255,0.95)",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${onDark ? "rgba(255,255,255,0.06)" : "#EEEEEE"}` : "none",
      transition: "background 0.4s ease, border-color 0.4s ease",
      padding: isMobile ? "0 16px" : "0 48px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>

        {/* Logo */}
        <button onClick={() => go("#")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
          <img
            src="/logo-gradient.png"
            alt="Gradient Consulting"
            style={{
              height: isMobile ? 44 : 80,
              width: "auto",
              display: "block",
              filter: onDark ? "none" : "invert(1)",
              transition: "filter 0.3s",
            }}
          />
        </button>

        {/* Centre label — hidden on mobile */}
        {!isMobile && (
          <span style={{ fontFamily: "Zalando Sans, sans-serif", fontSize: "0.8rem", color: onDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", letterSpacing: "0.04em", position: "absolute", left: "50%", transform: "translateX(-50%)", transition: "color 0.3s" }}>
            Global AI Talent &amp; Recruitment
          </span>
        )}

        {/* CTA */}
        <button onClick={() => go("#contact")}
          style={{ fontFamily: "Zalando Sans, sans-serif", fontWeight: 600, fontSize: "0.8rem", color: onDark ? "#FFFFFF" : "#0A0A0A", background: onDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)", border: `1px solid ${onDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`, borderRadius: 8, padding: "8px 18px", cursor: "pointer", transition: "all 0.3s ease" }}
        >
          Get in Touch
        </button>
      </div>
    </nav>
  );
}
