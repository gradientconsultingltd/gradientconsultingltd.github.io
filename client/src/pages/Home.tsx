/* ============================================================
   GRADIENT CONSULTING — Home Page
   Design: Terminal Modernism — dark charcoal, blue→violet gradient
   Typography: Syne ExtraBold display + Outfit body
   Updated: AI training focus, partner logos banner, RLHF, domain knowledge
   ============================================================ */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import PartnersBanner from "@/components/PartnersBanner";
import ServicesSection from "@/components/ServicesSection";
import RecruitmentSection from "@/components/RecruitmentSection";
import AISection from "@/components/AISection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  // Initialise scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".animate-fade-up, .animate-scale-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0E0E10", color: "#F0EEE8" }}
    >
      <Navbar />
      <HeroSection />
      <StatsSection />
      <PartnersBanner />
      <ServicesSection />
      <RecruitmentSection />
      <AISection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
