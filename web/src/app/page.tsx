import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Features } from "@/components/Features";
import { GlobalScale } from "@/components/GlobalScale";
import { Integrations } from "@/components/Integrations";
import { StatsSection } from "@/components/StatsSection";
import { CommunitySection } from "@/components/CommunitySection";
import { CallToAction } from "@/components/CallToAction";
import { TheSignal } from "@/components/TheSignal";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30">
      <Navbar />
      <Hero />
      <StatsSection />
      <TheSignal />
      <Features />
      <GlobalScale />
      <Integrations />
      <CallToAction />
    </main>
  );
}
