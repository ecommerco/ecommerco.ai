"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 py-4 backdrop-blur-md bg-black/50 border-b border-white/5"
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group z-50 relative">
          <div className="text-2xl font-bold tracking-tighter text-white">
            <span className="text-primary">e</span>commerco<span className="text-primary">.ai</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link href="/features" className="hover:text-white transition-colors">Features</Link>
          <Link href="/builder" className="hover:text-white transition-colors text-primary font-bold">Builder</Link>
          <Link href="/developers" className="hover:text-white transition-colors">Developers</Link>
          <Link href="/how-it-works" className="hover:text-white transition-colors">How it Works</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Log in
          </Link>
          <Link 
            href="/signup" 
            className="px-4 py-2 text-sm font-medium text-black bg-primary rounded-full hover:bg-yellow-400 transition-colors"
          >
            Create Store
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-50 relative text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-x-0 top-0 bg-black/95 border-b border-white/10 p-6 pt-24 flex flex-col gap-6 md:hidden h-screen"
            >
              <nav className="flex flex-col gap-6 text-lg font-medium text-gray-400">
                <Link href="/features" className="hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Features</Link>
                <Link href="/builder" className="hover:text-white transition-colors text-primary" onClick={() => setIsOpen(false)}>Builder</Link>
                <Link href="/developers" className="hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Developers</Link>
                <Link href="/how-it-works" className="hover:text-white transition-colors" onClick={() => setIsOpen(false)}>How it Works</Link>
                <Link href="/pricing" className="hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Pricing</Link>
                <Link href="/about" className="hover:text-white transition-colors" onClick={() => setIsOpen(false)}>About</Link>
              </nav>
              <div className="flex flex-col gap-4 mt-auto pb-10">
                <Link href="/login" className="text-center py-3 text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors" onClick={() => setIsOpen(false)}>
                  Log in
                </Link>
                <Link 
                  href="/signup" 
                  className="text-center py-3 text-black bg-primary rounded-lg hover:bg-yellow-400 transition-colors font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Create Store
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
