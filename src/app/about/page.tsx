import { Navbar } from "@/components/Navbar";
import { CallToAction } from "@/components/CallToAction";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30 pt-20">
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 py-32">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Ecommerco</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            We're building the future of e-commerce with AI-powered automation.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Ecommerco is the operating system where Artificial Intelligence works for you. 
              We're making e-commerce accessible to everyone by automating the complex, 
              so you can focus on what matters: building your business.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white mb-4">What Makes Us Different</h2>
            <div className="space-y-4">
              {[
                "AI-Powered Automation: Our AI agent handles everything from store setup to advertising.",
                "Multi-Tenant Architecture: Each store operates independently with its own configuration.",
                "Voice Interaction: Talk to your AI agent just like ChatGPT.",
                "Advanced Security: Face recognition, voice recognition, and fingerprint authentication.",
                "Global Scale: Sell everywhere with automatic translations and local payment methods."
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-primary text-xl">→</span>
                  <p className="text-gray-400 text-lg">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Team</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              We're a team of engineers, designers, and AI researchers working together 
              to revolutionize e-commerce. Built with ❤️ using Cursor AI.
            </p>
          </div>
        </div>
      </div>
      <CallToAction />
    </main>
  );
}
