import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { CallToAction } from "@/components/CallToAction";
import { TracingBeam } from "@/components/TracingBeam";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30 pt-20">
      <Navbar />
      <TracingBeam className="px-6">
        <HowItWorks />
        <CallToAction />
      </TracingBeam>
    </main>
  );
}
