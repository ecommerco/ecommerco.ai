"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <footer className="relative py-32 bg-black overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,193,30,0.1),transparent_70%)]" />
      <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />
      
      <div className="container relative z-10 px-4 md:px-6 text-center mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-8"
        >
          Ready to hear <br />
          the response?
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <div className="flex flex-col gap-2 w-full max-w-sm">
            <input 
              type="email" 
              placeholder="Your email… to send the signal"
              className="h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <button className="h-12 px-8 rounded-lg bg-primary text-black font-bold hover:bg-yellow-400 transition-colors flex items-center gap-2 whitespace-nowrap">
            Start the Trial <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left border-t border-white/10 pt-16">
          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-primary transition-colors">Store Builder</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Neural Analytics</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/developers" className="hover:text-primary transition-colors">Developers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Community</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 text-center text-xs text-gray-600">
          © 2026 Ecommerco.ai Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
