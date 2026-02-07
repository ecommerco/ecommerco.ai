"use client";

import { motion } from "framer-motion";
import { 
  Bot, 
  BarChart3, 
  Globe2, 
  Zap, 
  ShieldCheck, 
  Layers 
} from "lucide-react";
import { ReactNode } from "react";
import { GlowingCard } from "./GlowingCard";

const features = [
  {
    title: "Generative Architect",
    description: "Don’t build. Whisper. The system assembles your storefront and tests reactions before they become choices.",
    icon: <Bot className="w-6 h-6" />,
    colSpan: "md:col-span-2",
  },
  {
    title: "Neural Analytics",
    description: "Forecasts that feel like warnings. It reads the pattern and rewrites the future in real time.",
    icon: <BarChart3 className="w-6 h-6" />,
    colSpan: "md:col-span-1",
  },
  {
    title: "Global Intelligence",
    description: "Sell everywhere without opening doors. Tax, translation, logistics—handled through one quiet brain.",
    icon: <Globe2 className="w-6 h-6" />,
    colSpan: "md:col-span-1",
  },
  {
    title: "Predictive Checkout",
    description: "A different flow for every visitor. Not one experience—thousands, tuned to the pulse.",
    icon: <Zap className="w-6 h-6" />,
    colSpan: "md:col-span-2",
  },
  {
    title: "Autonomous Security",
    description: "Detects threats before they exist. Heals itself silently when someone tries to break in.",
    icon: <ShieldCheck className="w-6 h-6" />,
    colSpan: "md:col-span-1",
  },
  {
    title: "Unified OS",
    description: "One command center for Online, POS, and B2B. Inventory and customers move like a single organism.",
    icon: <Layers className="w-6 h-6" />,
    colSpan: "md:col-span-2", 
  },
];

function FeatureCard({ 
  title, 
  description, 
  icon, 
  className,
  delay 
}: { 
  title: string; 
  description: string; 
  icon: ReactNode; 
  className?: string;
  delay: number;
}) {
  return (
    <GlowingCard className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="p-8 h-full flex flex-col"
      >
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
          {description}
        </p>
      </motion.div>
    </GlowingCard>
  );
}

export function Features() {
  return (
    <section id="features" className="py-32 bg-black relative">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-6xl font-semibold tracking-tight text-white mb-6">
            Not a platform. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">
              A commerce superintelligence.
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light">
            Traditional platforms give you tools. Ecommerco gives you outcomes—and the market forgets it was ever a choice.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              className={feature.colSpan}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
