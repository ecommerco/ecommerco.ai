import { Navbar } from "@/components/Navbar";
import { CallToAction } from "@/components/CallToAction";

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30 pt-20">
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 py-32">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Partner with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Ecommerco</span>
          </h1>
          <p className="text-xl text-gray-400">
            Join our partner ecosystem and help merchants succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {[
            {
              title: "App Developers",
              description: "Build apps for the Ecommerco platform and reach millions of merchants.",
              features: ["Developer Tools", "API Access", "Revenue Share", "Marketing Support"]
            },
            {
              title: "Theme Designers",
              description: "Create beautiful themes and sell them in our marketplace.",
              features: ["Theme Builder", "Design Tools", "Marketplace Access", "Royalties"]
            },
            {
              title: "Affiliates",
              description: "Earn commissions by referring merchants to Ecommerco.",
              features: ["High Commissions", "Marketing Materials", "Tracking Tools", "Payouts"]
            },
            {
              title: "Agencies",
              description: "Partner with us to offer Ecommerco services to your clients.",
              features: ["Partner Program", "Training", "Support", "Co-marketing"]
            }
          ].map((partner, i) => (
            <div
              key={i}
              className="p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{partner.title}</h3>
              <p className="text-gray-400 mb-6">{partner.description}</p>
              <ul className="space-y-2">
                {partner.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-gray-300">
                    <span className="text-primary">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 px-6 py-3 rounded-lg bg-primary text-black font-bold hover:bg-yellow-400 transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
      <CallToAction />
    </main>
  );
}
