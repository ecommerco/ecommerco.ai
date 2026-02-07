import { Navbar } from "@/components/Navbar";
import { CallToAction } from "@/components/CallToAction";
import { TracingBeam } from "@/components/TracingBeam";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30 pt-20">
      <Navbar />
      <TracingBeam className="px-6">
        <section className="py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center">
                <div className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
                  <span className="text-primary">e</span>commerco<span className="text-primary">.ai</span>
                </div>
              </div>
              <h1 className="mt-10 text-4xl md:text-6xl font-semibold tracking-tight text-white">
                About Ecommerco.ai
              </h1>
              <p className="mt-8 text-lg md:text-xl text-gray-300 leading-relaxed">
                Ecommerco.ai is building an AI-first commerce operating system. We focus on
                speed, automation, and control—so teams can launch, iterate, and scale without
                carrying the weight of traditional stacks.
              </p>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="text-xs font-mono tracking-widest uppercase text-gray-500">
                    Mission
                  </div>
                  <div className="mt-3 text-white font-semibold">
                    Make commerce adaptive by default.
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="text-xs font-mono tracking-widest uppercase text-gray-500">
                    Belief
                  </div>
                  <div className="mt-3 text-white font-semibold">
                    Intelligence should be embedded, not bolted on.
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="text-xs font-mono tracking-widest uppercase text-gray-500">
                    Focus
                  </div>
                  <div className="mt-3 text-white font-semibold">
                    Builder experience, performance, and safety.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <CallToAction />
      </TracingBeam>
    </main>
  );
}
