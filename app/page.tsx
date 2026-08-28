import { Features } from "@/components/landing/features";
import { FinalCTA } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LibraryPreview } from "@/components/landing/library-preview";
import { Navbar } from "@/components/landing/navbar";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f5ed] text-[#20271f]">
      <Navbar />
      <Hero />
      <Features />
      <LibraryPreview />
      <HowItWorks />
      <FinalCTA />
      <Footer />
    </main>
  );
}
