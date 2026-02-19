"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Merchants", value: 4000000, prefix: "", suffix: "+" },
  { label: "GMV Processed", value: 650, prefix: "$", suffix: "B+" },
  { label: "Countries", value: 175, prefix: "", suffix: "" },
  { label: "Uptime", value: 99.99, prefix: "", suffix: "%" },
];

function Counter({ from, to, prefix, suffix }: { from: number; to: number; prefix: string; suffix: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });
  
  useEffect(() => {
    if (!inView) return;
    
    const node = nodeRef.current;
    const controls = { value: from };
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quart
      const ease = 1 - Math.pow(1 - progress, 4);
      
      const current = from + (to - from) * ease;
      
      if (node) {
        node.textContent = `${prefix}${current.toLocaleString(undefined, { maximumFractionDigits: to % 1 === 0 ? 0 : 2 })}${suffix}`;
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [inView, from, to, prefix, suffix]);

  return <span ref={nodeRef} className="tabular-nums text-4xl md:text-6xl font-bold text-white tracking-tighter" />;
}

export function StatsSection() {
  return (
    <section className="py-24 border-y border-white/10 bg-black/50 backdrop-blur-sm">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Counter from={0} to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <span className="text-sm md:text-base text-gray-500 uppercase tracking-widest font-mono">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-sm">
            * Data represents aggregated performance across the global Ecommerco network.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
