"use client";

import { motion } from "framer-motion";
import { 
  Puzzle, Zap, Globe, ShoppingCart, CreditCard, BarChart3, 
  Mail, MessageSquare, Shield, Truck, Smartphone, Share2,
  Database, Cloud, Lock, Search, Filter, Settings, Users,
  Award, Gift, Tag, Bookmark, Calendar, Camera, Video,
  Music, Mic, Speaker, Printer, Wifi, Bluetooth, Battery,
  Sun, Moon, Star, Heart, ThumbsUp, Eye, Bell
} from "lucide-react";

const extensions = [
  { name: "Shopify Sync", icon: ShoppingCart },
  { name: "Stripe Connect", icon: CreditCard },
  { name: "Analytics Pro", icon: BarChart3 },
  { name: "Mailchimp", icon: Mail },
  { name: "Intercom", icon: MessageSquare },
  { name: "Cloudflare", icon: Shield },
  { name: "ShipStation", icon: Truck },
  { name: "Mobile App", icon: Smartphone },
  { name: "Social Share", icon: Share2 },
  { name: "PostgreSQL", icon: Database },
  { name: "AWS S3", icon: Cloud },
  { name: "Auth0", icon: Lock },
  { name: "Algolia", icon: Search },
  { name: "Filters+", icon: Filter },
  { name: "Admin Tools", icon: Settings },
  { name: "CRM Sync", icon: Users },
  { name: "Loyalty Rewards", icon: Award },
  { name: "Gift Cards", icon: Gift },
  { name: "Smart Tags", icon: Tag },
  { name: "Wishlist", icon: Bookmark },
  { name: "Booking", icon: Calendar },
  { name: "Visual Search", icon: Camera },
  { name: "Video Commerce", icon: Video },
  { name: "Audio Players", icon: Music },
  { name: "Voice Search", icon: Mic },
  { name: "Notifications", icon: Bell },
  { name: "Review System", icon: Star },
  { name: "AI Recommender", icon: Zap },
  { name: "Global CDN", icon: Globe },
  { name: "Puzzles", icon: Puzzle },
];

// Duplicate list to create seamless loop
const allExtensions = [...extensions, ...extensions, ...extensions];

export function Integrations() {
  return (
    <section className="py-24 bg-black overflow-hidden relative">
      <div className="container px-4 md:px-6 mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6">
            <span className="text-primary">100+</span> Extensions
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Expand your commerce capabilities with our massive library of pre-built integrations.
            From payments to logistics, we have it all.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Row 1: Left to Right */}
        <div className="relative flex overflow-hidden">
          <motion.div
            className="flex gap-4 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 40, 
              ease: "linear", 
              repeat: Infinity 
            }}
          >
            {allExtensions.map((ext, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm min-w-[200px] hover:border-primary/50 transition-colors group"
              >
                <ext.icon className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                  {ext.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="relative flex overflow-hidden">
          <motion.div
            className="flex gap-4 items-center"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ 
              duration: 45, 
              ease: "linear", 
              repeat: Infinity 
            }}
          >
            {allExtensions.map((ext, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm min-w-[200px] hover:border-primary/50 transition-colors group"
              >
                <ext.icon className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                  {ext.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gradient Fade Edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
    </section>
  );
}
