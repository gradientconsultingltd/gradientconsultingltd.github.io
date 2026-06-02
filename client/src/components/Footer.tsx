import { useIsMobile } from "@/hooks/useIsMobile";

export default function Footer() {
  const isMobile = useIsMobile();
  const go = (href: string) => {
    if (href === "#") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "#0A0A0A", position: "relative", overflow: "hidden" }}>

      {/* Dot grid texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, padding: isMobile ? "40px 24px 32px" : "56px 48px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr", gap: isMobile ? 32 : 40, marginBottom: 48 }}>

          {/* Logo — spans 2 cols on mobile */}
          <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
            <img
              src="/logo-gradient.png"
              alt="Gradient Consulting"
              style={{ height: isMobile ? 40 : 56, width: "auto", display: "block" }}
            />
          </div>

          {/* Company */}
          <div>
            <p style={{ fontFamily: "Zalando Sans, sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Company</p>
            {[{ label: "Our Process", href: "#process" }, { label: "Case Studies", href: "#outcomes" }, { label: "Services", href: "#services" }, { label: "Careers", href: "#" }].map(l => (
              <div key={l.label} style={{ marginBottom: 10 }}>
                <button onClick={() => go(l.href)} style={{ fontFamily: "Zalando Sans, sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", background: "none", border: "none", padding: 0, cursor: "pointer", transition: "color 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}>
                  {l.label}
                </button>
              </div>
            ))}
          </div>

          {/* Legal */}
          <div>
            <p style={{ fontFamily: "Zalando Sans, sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Legal</p>
            {["Privacy Policy", "Terms of Use"].map(l => (
              <div key={l} style={{ marginBottom: 10 }}>
                <button style={{ fontFamily: "Zalando Sans, sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", background: "none", border: "none", padding: 0, cursor: "pointer", transition: "color 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}>
                  {l}
                </button>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: "Zalando Sans, sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Contact Us</p>
            <a href="mailto:hello@gradientconsulting.co.uk" style={{ fontFamily: "Zalando Sans, sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", display: "block", marginBottom: 10, transition: "color 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}>
              hello@gradientconsulting.co.uk
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ fontFamily: "Zalando Sans, sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, transition: "color 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}>
              LinkedIn →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontFamily: "Zalando Sans, sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Gradient Consulting Ltd. All rights reserved. ✦
          </p>
          <button onClick={() => go("#")} style={{ fontFamily: "Zalando Sans, sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, transition: "color 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.25)"; }}>
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
