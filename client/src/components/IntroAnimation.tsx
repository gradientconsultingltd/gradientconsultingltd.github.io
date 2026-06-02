import { useEffect, useState } from "react";

export default function IntroAnimation({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Word fades in
    const t1 = setTimeout(() => setVisible(true), 300);
    // Screen starts sliding up
    const t2 = setTimeout(() => setLeaving(true), 2000);
    // Unmount
    const t3 = setTimeout(() => onDone(), 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0F0F0F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: leaving ? "transform 0.72s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
        willChange: "transform",
      }}
    >
      <span
        style={{
          fontFamily: "Zalando Sans, sans-serif",
          fontWeight: 700,
          fontStyle: "italic",
          fontSize: "clamp(3.5rem, 9vw, 8rem)",
          color: "#FFFFFF",
          letterSpacing: "-0.01em",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.9s cubic-bezier(0.23, 1, 0.32, 1), transform 0.9s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        Engineered.
      </span>
    </div>
  );
}
