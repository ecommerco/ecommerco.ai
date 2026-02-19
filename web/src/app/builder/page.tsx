import { Navbar } from "@/components/Navbar";
import { BuilderShowcase } from "@/components/BuilderShowcase";
import { CallToAction } from "@/components/CallToAction";

export default function BuilderPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30">
      <Navbar />
      <BuilderShowcase />
      <CallToAction />
    </main>
  );
}
