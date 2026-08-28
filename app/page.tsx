import { Features } from "@/components/landing/features";
import { FinalCTA } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Navbar } from "@/components/landing/navbar";
import { ProductShowcase } from "@/components/landing/product-showcase";
import { ReadingProblems } from "@/components/landing/reading-problems";
import { FAQ } from "@/components/landing/faq";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f5ed] text-[#20271f]">
      <Navbar />
      <Hero />
      <ReadingProblems />
      <HowItWorks />
      <ProductShowcase />
      <Features />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
