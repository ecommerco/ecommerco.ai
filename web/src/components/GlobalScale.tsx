"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, Store, Truck } from "lucide-react";
import { GlowingCard } from "./GlowingCard";

const channels = [
  {
    title: "Online Store",
    description: "AI-generated storefronts that mutate to match visitor intent.",
    icon: <Globe className="w-8 h-8" />,
  },
  {
    title: "Point of Sale",
    description: "Physical retail synchronized with digital intelligence in real-time.",
    icon: <Store className="w-8 h-8" />,
  },
  {
    title: "Global Logistics",
    description: "Autonomous fulfillment and cross-border tax calculation.",
    icon: <Truck className="w-8 h-8" />,
  },
  {
    title: "Mobile App",
    description: "Your entire commerce empire controlled from a single neural interface.",
    icon: <Smartphone className="w-8 h-8" />,
  },
];

export function GlobalScale() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6 leading-tight">
              Sell Here, There, <br />
              <span className="text-primary">Everywhere.</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              One platform. Infinite channels. Whether you're selling online, in person, or across borders, Ecommerco's central nervous system unifies your entire operation.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shadow-[0_0_10px_rgba(247,193,30,0.5)]" />
                <div>
                  <h4 className="text-white font-medium mb-1">Unified Inventory</h4>
                  <p className="text-sm text-gray-500">Stock levels sync across every channel instantly.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shadow-[0_0_10px_rgba(247,193,30,0.5)]" />
                <div>
                  <h4 className="text-white font-medium mb-1">Predictive Routing</h4>
                  <p className="text-sm text-gray-500">Orders route from the optimal warehouse automatically.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {channels.map((channel, i) => (
              <GlowingCard key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 h-full flex flex-col"
                >
                  <div className="mb-4 text-gray-400 group-hover:text-primary transition-colors duration-300">
                    {channel.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{channel.title}</h3>
                  <p className="text-sm text-gray-400">{channel.description}</p>
                </motion.div>
              </GlowingCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
