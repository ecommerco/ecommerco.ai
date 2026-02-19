import { Features } from "@/components/Features";
import { CompletedFeatures } from "@/components/CompletedFeatures";
import { GlobalScale } from "@/components/GlobalScale";
import { CommunitySection } from "@/components/CommunitySection";
import { Navbar } from "@/components/Navbar";
import { CallToAction } from "@/components/CallToAction";
import { TracingBeam } from "@/components/TracingBeam";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30 pt-20">
      <Navbar />
      <TracingBeam className="px-6">
        <Features />
        <CompletedFeatures />
        <GlobalScale />
        <CommunitySection />
        <CallToAction />
      </TracingBeam>
    </main>
  );
}
