"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Eye, RadioTower } from "lucide-react";
import { GlowingCard } from "./GlowingCard";

const items = [
  {
    title: "Sensing",
    description: "Reads behavior, motion, and rhythm—then turns it into intent before it becomes desire.",
    icon: <Eye className="w-5 h-5" />,
  },
  {
    title: "Linking",
    description: "AI agents capture signals from store, inventory, and ads—and fuse them into one mind.",
    icon: <RadioTower className="w-5 h-5" />,
  },
  {
    title: "Influence",
    description: "A shifting experience for every visitor. No fixed UI—only a UI that re-forms to persuade.",
    icon: <BrainCircuit className="w-5 h-5" />,
  },
];

export function TheSignal() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(247,193,30,0.10),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.04),transparent_60%)]" />
      <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 font-mono tracking-widest uppercase">
            Protocol // The Signal
          </div>
          <h2 className="mt-6 text-3xl md:text-6xl font-semibold tracking-tight text-white">
            When the system starts listening… commerce stops being normal.
          </h2>
          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            Ecommerco lays an intelligence layer over everything. It sees more than you see—and decides faster than you decide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <GlowingCard key={item.title}>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="p-8 h-full"
              >
                <div className="inline-flex items-center gap-3 text-primary">
                  <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="font-mono text-xs tracking-widest uppercase text-gray-400">
                    node-{i + 1}
                  </div>
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </GlowingCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 mx-auto max-w-4xl rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 font-mono text-sm text-gray-300"
        >
          <div className="flex items-center justify-between gap-4 text-xs text-gray-500">
            <div>telemetry.log</div>
            <div>stream: live</div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="text-gray-400">[13:07:12] ingest: clickstream → ok</div>
            <div className="text-gray-400">[13:07:13] infer: intent-score → 0.91</div>
            <div className="text-gray-400">[13:07:14] mutate: layout-variant → A7</div>
            <div className="text-primary">[13:07:15] deploy: persuasion-loop → armed</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
