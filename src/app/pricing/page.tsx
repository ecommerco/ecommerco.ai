import { Pricing } from "@/components/Pricing";
import { Navbar } from "@/components/Navbar";
import { CallToAction } from "@/components/CallToAction";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30 pt-20">
      <Navbar />
      <Pricing />
      <CallToAction />
    </main>
  );
}
