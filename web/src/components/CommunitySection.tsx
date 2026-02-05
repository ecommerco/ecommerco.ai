"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const communities = [
  {
    title: "Startups",
    desc: "Launch with zero friction. AI handles the setup.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Enterprise",
    desc: "Scale without limits. Headless architecture by default.",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Developers",
    desc: "Extend the OS. Build apps on our Neural API.",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Creators",
    desc: "Monetize influence. Drop merch in seconds.",
    color: "from-orange-500/20 to-yellow-500/20",
  },
];

export function CommunitySection() {
  return (
    <section className="py-32 bg-black relative">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6">
            Built for Every <br />
            <span className="text-gray-500">Scale of Ambition.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communities.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative h-[300px] rounded-2xl p-8 flex flex-col justify-between overflow-hidden group border border-white/10 hover:border-white/20 transition-colors`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors">
                  {item.desc}
                </p>
              </div>

              <div className="relative z-10 self-end">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
