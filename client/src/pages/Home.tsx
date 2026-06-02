import { useEffect } from "react";
import Navbar          from "@/components/Navbar";
import HeroSection     from "@/components/HeroSection";
import AboutSection    from "@/components/AboutSection";
import PartnersBanner  from "@/components/PartnersBanner";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection  from "@/components/ProcessSection";
import WhySection      from "@/components/WhySection";
import StatsSection    from "@/components/StatsSection";
import FAQSection      from "@/components/FAQSection";
import ContactSection  from "@/components/ContactSection";
import Footer          from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".animate-fade-up, .animate-scale-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: "#0A0A0A", color: "#0F0F0F", overflowX: "hidden" }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PartnersBanner />
      <ServicesSection />
      <ProcessSection />
      <WhySection />
      <StatsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
