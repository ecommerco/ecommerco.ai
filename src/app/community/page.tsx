import { Navbar } from "@/components/Navbar";
import { CallToAction } from "@/components/CallToAction";
import { Users, MessageSquare, Trophy, Calendar, TrendingUp } from "lucide-react";

export default function CommunityPage() {
  const stats = [
    { label: "Active Members", value: "50K+", icon: <Users className="w-6 h-6" /> },
    { label: "Discussions", value: "120K+", icon: <MessageSquare className="w-6 h-6" /> },
    { label: "Solutions", value: "35K+", icon: <Trophy className="w-6 h-6" /> },
    { label: "Events", value: "500+", icon: <Calendar className="w-6 h-6" /> }
  ];

  const topics = [
    {
      title: "Getting Started",
      posts: 1250,
      description: "New to Ecommerco? Start here!"
    },
    {
      title: "Store Setup",
      posts: 890,
      description: "Questions about setting up your store"
    },
    {
      title: "AI Features",
      posts: 2100,
      description: "Discuss AI agent and automation"
    },
    {
      title: "Design & Themes",
      posts: 1560,
      description: "Share designs and get feedback"
    },
    {
      title: "Marketing",
      posts: 980,
      description: "Marketing strategies and tips"
    },
    {
      title: "Technical Support",
      posts: 2340,
      description: "Get help with technical issues"
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30 pt-20">
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Community</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Connect with merchants, developers, and e-commerce enthusiasts from around the world.
          </p>
          <button className="px-8 py-4 rounded-full bg-primary text-black font-bold hover:bg-yellow-400 transition-colors text-lg">
            Join Community
          </button>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-center"
            >
              <div className="text-primary mb-3 flex justify-center">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Popular Topics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-2">{topic.title}</h3>
                <p className="text-gray-400 mb-4">{topic.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <TrendingUp className="w-4 h-4" />
                  {topic.posts} posts
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-xl border border-white/10 bg-gradient-to-r from-primary/10 to-yellow-500/10">
            <h3 className="text-2xl font-bold text-white mb-4">Community Guidelines</h3>
            <ul className="space-y-2 text-gray-300">
              <li>✓ Be respectful and kind to all members</li>
              <li>✓ Share knowledge and help others</li>
              <li>✓ Follow the community rules</li>
              <li>✓ Report inappropriate content</li>
            </ul>
          </div>
        </div>
      </div>
      <CallToAction />
    </main>
  );
}
