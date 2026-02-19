import { Navbar } from "@/components/Navbar";
import { CallToAction } from "@/components/CallToAction";

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30 pt-20">
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 py-32">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Resources & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Learning</span>
          </h1>
          <p className="text-xl text-gray-400">
            Everything you need to grow your business and master e-commerce.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Help Center",
              description: "Get answers to your questions and learn how to use Ecommerco.",
              link: "/help"
            },
            {
              title: "Blog",
              description: "Read the latest e-commerce tips, trends, and success stories.",
              link: "/blog"
            },
            {
              title: "Community",
              description: "Connect with other merchants and share your experiences.",
              link: "/community"
            },
            {
              title: "Academy",
              description: "Free courses to help you build and grow your online business.",
              link: "/academy"
            },
            {
              title: "API Documentation",
              description: "Complete API reference for developers building on Ecommerco.",
              link: "/developers"
            },
            {
              title: "Webinars",
              description: "Join live sessions with e-commerce experts and learn new strategies.",
              link: "/webinars"
            }
          ].map((resource, i) => (
            <a
              key={i}
              href={resource.link}
              className="block p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group"
            >
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                {resource.title}
              </h3>
              <p className="text-gray-400">{resource.description}</p>
            </a>
          ))}
        </div>
      </div>
      <CallToAction />
    </main>
  );
}
