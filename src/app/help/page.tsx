import { Navbar } from "@/components/Navbar";
import { CallToAction } from "@/components/CallToAction";
import Link from "next/link";
import { Search, Book, Video, MessageCircle, FileText, HelpCircle } from "lucide-react";

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[?'"]/g, '')
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and')
    .trim();
}

export default function HelpPage() {
  const categories = [
    {
      title: "Getting Started",
      icon: <Book className="w-6 h-6" />,
      articles: [
        "How to create your first store",
        "Setting up your domain",
        "Adding your first product",
        "Configuring payment methods"
      ]
    },
    {
      title: "Store Management",
      icon: <FileText className="w-6 h-6" />,
      articles: [
        "Managing products",
        "Order management",
        "Customer management",
        "Inventory tracking"
      ]
    },
    {
      title: "AI Features",
      icon: <HelpCircle className="w-6 h-6" />,
      articles: [
        "Using the AI Agent",
        "Voice commands",
        "Auto product creation",
        "Smart advertising"
      ]
    },
    {
      title: "Design & Themes",
      icon: <Video className="w-6 h-6" />,
      articles: [
        "Customizing your theme",
        "Using the page builder",
        "Adding custom CSS",
        "Mobile optimization"
      ]
    }
  ];

  const popularArticles = [
    "How do I set up my store?",
    "How to add products?",
    "How to configure payments?",
    "How to use the AI Agent?",
    "How to customize my theme?",
    "How to track orders?",
    "How to set up shipping?",
    "How to manage inventory?"
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30 pt-20">
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">help?</span>
          </h1>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Popular Articles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {popularArticles.map((article, i) => (
              <Link
                key={i}
                href={`/help/${createSlug(article)}`}
                className="p-4 rounded-lg border border-white/10 bg-white/5 hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
              >
                <p className="text-gray-300 hover:text-white">{article}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Browse by Category</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-primary">{category.icon}</div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.articles.map((article, j) => (
                    <li key={j}>
                      <Link
                        href={`/help/${createSlug(article)}`}
                        className="text-gray-400 hover:text-primary transition-colors"
                      >
                        {article}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Still need help?</h3>
            <p className="text-gray-400 mb-6">
              Contact our support team and we'll get back to you as soon as possible.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-lg bg-primary text-black font-bold hover:bg-yellow-400 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
      <CallToAction />
    </main>
  );
}
