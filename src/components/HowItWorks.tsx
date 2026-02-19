"use client";

import { motion } from "framer-motion";
import { GlowingCard } from "./GlowingCard";

const steps = [
  {
    number: "01",
    title: "Connect Your Data",
    description: "Plug in your existing inventory, or let our AI generate products from scratch based on your niche."
  },
  {
    number: "02",
    title: "AI Architecting",
    description: "The system analyzes millions of data points to build a unique storefront optimized for your specific audience."
  },
  {
    number: "03",
    title: "Launch & Learn",
    description: "Go live instantly. The neural network watches visitor behavior and self-optimizes the UI in real-time."
  },
  {
    number: "04",
    title: "Scale Autonomously",
    description: "Marketing, logistics, and support are handled by AI agents working 24/7 to grow your empire."
  }
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-black">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            From Idea to Empire <br/>
            <span className="text-primary">In Seconds.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The traditional ecommerce stack is dead. Welcome to the age of autonomous commerce.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden md:block" />

          <div className="space-y-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 w-full">
                  <GlowingCard className="p-8">
                    <div className="text-5xl font-bold text-white/10 mb-4">{step.number}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </GlowingCard>
                </div>
                <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_#f7c11e] hidden md:block" />
                <div className="flex-1 w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
