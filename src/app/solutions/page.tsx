import { Navbar } from "@/components/Navbar";
import { CallToAction } from "@/components/CallToAction";

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30 pt-20">
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 py-32">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Solutions for Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Business</span>
          </h1>
          <p className="text-xl text-gray-400">
            Whether you're just starting or scaling globally, Ecommerco has the tools you need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Start Your Business",
              description: "Launch your online store in minutes with AI-powered setup.",
              features: ["AI Store Builder", "Free Domain", "Payment Processing", "Mobile App"]
            },
            {
              title: "Build Your Brand",
              description: "Create a unique brand identity with custom themes and designs.",
              features: ["Custom Themes", "Logo Generator", "Brand Colors", "Typography"]
            },
            {
              title: "Create Your Website",
              description: "Build a professional website with our drag-and-drop editor.",
              features: ["Visual Editor", "Responsive Design", "SEO Tools", "Analytics"]
            },
            {
              title: "Online Store Editor",
              description: "Customize every aspect of your store with our powerful editor.",
              features: ["Drag & Drop", "Live Preview", "Code Editor", "Templates"]
            },
            {
              title: "Store Theme",
              description: "Choose from hundreds of professional themes or create your own.",
              features: ["Theme Library", "Custom Themes", "Theme Editor", "Mobile Themes"]
            },
            {
              title: "Business Apps",
              description: "Extend your store with powerful apps from our marketplace.",
              features: ["App Store", "Marketing Apps", "Analytics Apps", "Productivity Apps"]
            }
          ].map((solution, i) => (
            <div
              key={i}
              className="p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{solution.title}</h3>
              <p className="text-gray-400 mb-6">{solution.description}</p>
              <ul className="space-y-2">
                {solution.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-gray-300">
                    <span className="text-primary">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <CallToAction />
    </main>
  );
}
