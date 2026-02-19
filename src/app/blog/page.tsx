import { Navbar } from "@/components/Navbar";
import { CallToAction } from "@/components/CallToAction";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      title: "10 Ways AI is Revolutionizing E-commerce",
      excerpt: "Discover how artificial intelligence is transforming the way we do business online.",
      date: "February 18, 2026",
      readTime: "5 min read",
      category: "AI & Technology",
      slug: "10-ways-ai-revolutionizing-ecommerce"
    },
    {
      title: "How to Build a Successful Online Store in 2026",
      excerpt: "A complete guide to launching and growing your e-commerce business.",
      date: "February 15, 2026",
      readTime: "8 min read",
      category: "Business",
      slug: "build-successful-online-store-2026"
    },
    {
      title: "The Future of Voice Commerce",
      excerpt: "Exploring how voice assistants are changing the shopping experience.",
      date: "February 12, 2026",
      readTime: "6 min read",
      category: "Technology",
      slug: "future-voice-commerce"
    },
    {
      title: "Multi-Tenant Architecture: What You Need to Know",
      excerpt: "Understanding how modern e-commerce platforms handle multiple stores.",
      date: "February 10, 2026",
      readTime: "7 min read",
      category: "Development",
      slug: "multi-tenant-architecture-guide"
    },
    {
      title: "5 Marketing Strategies That Actually Work",
      excerpt: "Proven tactics to drive traffic and increase sales for your online store.",
      date: "February 8, 2026",
      readTime: "4 min read",
      category: "Marketing",
      slug: "5-marketing-strategies-work"
    },
    {
      title: "Security Best Practices for E-commerce",
      excerpt: "Keep your store and customer data safe with these essential security tips.",
      date: "February 5, 2026",
      readTime: "6 min read",
      category: "Security",
      slug: "security-best-practices-ecommerce"
    }
  ];

  const categories = ["All", "AI & Technology", "Business", "Development", "Marketing", "Security", "Technology"];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30 pt-20">
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Ecommerco <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Blog</span>
          </h1>
          <p className="text-xl text-gray-400">
            Insights, tips, and stories about e-commerce, AI, and building successful online businesses.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:border-primary/50 hover:bg-primary/10 transition-all text-sm"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {posts.map((post, i) => (
            <Link
              key={i}
              href={`/blog/${post.slug}`}
              className="group p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
            >
              <div className="mb-4">
                <span className="text-xs text-primary font-medium">{post.category}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all">
                Read more <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <CallToAction />
    </main>
  );
}
