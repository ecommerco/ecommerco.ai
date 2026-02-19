"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight, Cpu, Network, Zap } from "lucide-react";
import { MouseEvent, useRef, useEffect } from "react";
import { ParticleBackground } from "./ParticleBackground";
import { ScrambleText } from "./ScrambleText";

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 group"
      onMouseMove={handleMouseMove}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
        
        {/* Particles overlaid on video */}
        <ParticleBackground className="z-20 opacity-60" />
      </div>

      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(247, 193, 30, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      <div className="container relative z-30 px-4 md:px-6 text-center mx-auto">
        {/* AI Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-xs md:text-sm text-primary mb-8 backdrop-blur-md"
        >
          <Cpu className="w-4 h-4 animate-pulse" />
          <span className="font-mono tracking-widest uppercase">System Online</span>
          <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-ping ml-1"></span>
        </motion.div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8 max-w-5xl mx-auto leading-[1.1]">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white">Commerce,</span>
            <ScrambleText 
              text="RE-ENGINEERED" 
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-primary"
            />
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          <span className="text-white font-medium">Ecommerco</span> is the operating system where <span className="text-primary">Artificial Intelligence</span> works for you. 
          <br className="hidden md:block" />
          Build. Control. Scale.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="relative h-14 px-8 rounded-full bg-primary text-black font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(247,193,30,0.5)] flex items-center gap-2 group overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              Initialize Store <Zap className="w-5 h-5 fill-current" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          
          <button className="h-14 px-8 rounded-full border border-white/10 bg-black/50 text-white font-medium hover:bg-white/10 hover:border-primary/50 transition-all backdrop-blur-sm flex items-center gap-2 group">
            <Network className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
            System Architecture
          </button>
        </motion.div>
      </div>

      {/* Decorative Tech Elements */}
      <div className="absolute bottom-10 left-10 hidden md:flex items-center gap-4 text-xs font-mono text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          STATUS: OPERATIONAL
        </div>
        <div>|</div>
        <div>LATENCY: 12ms</div>
      </div>

      <div className="absolute bottom-10 right-10 hidden md:block text-xs font-mono text-gray-600">
        ECOMMERCO.AI v1.0.0
      </div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}
