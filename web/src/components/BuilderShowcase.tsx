"use client";

import { motion } from "framer-motion";
import { 
  LayoutTemplate, Palette, Layers, Smartphone, 
  Code2, MousePointer2, Sparkles, Box, Monitor,
  Tablet, Undo2, Redo2, Eye, Save, Zap
} from "lucide-react";
import { GlowingCard } from "./GlowingCard";

const editorFeatures = [
  {
    title: "Infinite Canvas",
    description: "Drag, drop, and design without boundaries. Our neural engine snaps elements into conversion-optimized layouts automatically.",
    icon: <LayoutTemplate className="w-6 h-6" />,
  },
  {
    title: "Semantic Style Manager",
    description: "Edit CSS visually or with natural language. Say 'make it pop' and watch the gradients apply themselves.",
    icon: <Palette className="w-6 h-6" />,
  },
  {
    title: "DOM Tree Intelligence",
    description: "Visualize your store's structure with a layer manager that understands ecommerce hierarchy and SEO best practices.",
    icon: <Layers className="w-6 h-6" />,
  },
  {
    title: "Omnichannel Simulator",
    description: "Preview your store instantly on Mobile, Tablet, Desktop, and POS interfaces with pixel-perfect accuracy.",
    icon: <Smartphone className="w-6 h-6" />,
  },
];

export function BuilderShowcase() {
  return (
    <div className="bg-black min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-mono uppercase tracking-widest">Builder v2.0 Live</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-8">
            The World's First <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">
              Neural Commerce Editor
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Forget code. Forget complex dashboards. Build your empire visually with an editor that thinks like a designer and codes like an engineer.
          </p>
        </motion.div>

        {/* Editor Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative max-w-6xl mx-auto rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#1e1e1e]"
        >
          {/* Mockup Header */}
          <div className="h-12 border-b border-white/10 bg-[#2d2d2d] flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div className="flex gap-2 text-gray-400">
                <Monitor className="w-4 h-4 hover:text-white cursor-pointer" />
                <Tablet className="w-4 h-4 hover:text-white cursor-pointer" />
                <Smartphone className="w-4 h-4 hover:text-white cursor-pointer" />
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="p-1.5 hover:bg-white/10 rounded"><Undo2 className="w-4 h-4 text-gray-400" /></button>
              <button className="p-1.5 hover:bg-white/10 rounded"><Redo2 className="w-4 h-4 text-gray-400" /></button>
              <button className="flex items-center gap-2 px-3 py-1 bg-primary/20 text-primary rounded text-xs font-bold hover:bg-primary/30 transition-colors">
                <Save className="w-3 h-3" /> Save
              </button>
              <button className="flex items-center gap-2 px-3 py-1 bg-primary text-black rounded text-xs font-bold hover:bg-yellow-400 transition-colors">
                <Eye className="w-3 h-3" /> Preview
              </button>
            </div>
          </div>

          {/* Mockup Body */}
          <div className="flex h-[600px]">
            {/* Left Sidebar (Blocks) */}
            <div className="w-64 border-r border-white/10 bg-[#252525] p-4 flex flex-col gap-4">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Components</div>
              <div className="grid grid-cols-2 gap-2">
                {['Section', 'Grid', 'Text', 'Image', 'Video', 'Button', 'Form', 'Product'].map((item) => (
                  <div key={item} className="h-20 bg-white/5 border border-white/5 rounded flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 cursor-grab active:cursor-grabbing transition-all">
                    <Box className="w-5 h-5 text-gray-400" />
                    <span className="text-xs text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 bg-[#1a1a1a] p-8 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              
              <motion.div 
                className="w-full max-w-3xl bg-black border border-dashed border-white/20 min-h-[500px] relative shadow-2xl"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Simulated Content */}
                <div className="p-8 text-center border-b border-white/5 hover:border-primary/50 transition-colors cursor-pointer group relative">
                  <div className="absolute top-2 left-2 bg-primary text-black text-[10px] font-bold px-1 rounded opacity-0 group-hover:opacity-100">HERO SECTION</div>
                  <h2 className="text-4xl font-bold text-white mb-4">New Collection</h2>
                  <p className="text-gray-400 mb-6">Discover the future of fashion.</p>
                  <button className="px-6 py-2 bg-white text-black font-bold rounded-full">Shop Now</button>
                </div>
                <div className="grid grid-cols-3 gap-4 p-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-[3/4] bg-white/5 rounded border border-white/5 hover:border-primary/50 transition-colors cursor-pointer relative group">
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity">
                         <span className="text-xs text-white font-mono">EDIT PRODUCT</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Sidebar (Settings) */}
            <div className="w-72 border-l border-white/10 bg-[#252525] p-4">
              <div className="flex items-center justify-between mb-6">
                 <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Properties</div>
                 <Code2 className="w-4 h-4 text-gray-500 hover:text-primary cursor-pointer" />
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400">Typography</label>
                  <div className="h-8 bg-black/50 rounded border border-white/10 flex items-center px-2 text-xs text-white">Inter</div>
                  <div className="flex gap-2">
                     <div className="h-8 flex-1 bg-black/50 rounded border border-white/10 flex items-center justify-center text-xs text-white font-bold">B</div>
                     <div className="h-8 flex-1 bg-black/50 rounded border border-white/10 flex items-center justify-center text-xs text-white italic">I</div>
                     <div className="h-8 flex-1 bg-black/50 rounded border border-white/10 flex items-center justify-center text-xs text-white underline">U</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-400">Dimensions</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-8 bg-black/50 rounded border border-white/10 flex items-center px-2 text-xs text-white justify-between">
                      <span>W</span> <span className="text-gray-500">Auto</span>
                    </div>
                    <div className="h-8 bg-black/50 rounded border border-white/10 flex items-center px-2 text-xs text-white justify-between">
                      <span>H</span> <span className="text-gray-500">Auto</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-400">AI Assistant</label>
                  <div className="p-3 rounded bg-primary/10 border border-primary/20">
                    <div className="flex gap-2 mb-2">
                      <Zap className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-bold text-primary">SUGGESTION</span>
                    </div>
                    <p className="text-[10px] text-gray-300 leading-relaxed">
                      "Try increasing the contrast on the 'Shop Now' button to boost CTR by ~15%."
                    </p>
                    <button className="mt-2 w-full py-1 bg-primary text-black text-[10px] font-bold rounded hover:bg-yellow-400">Apply Fix</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 md:px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {editorFeatures.map((feature, i) => (
            <GlowingCard key={i} className="h-full">
              <div className="p-6 flex flex-col h-full">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </GlowingCard>
          ))}
        </div>
      </section>

      {/* Code Export Section */}
      <section className="container mx-auto px-4 md:px-6 pb-24 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Own Your Code</h2>
        <div className="max-w-3xl mx-auto bg-[#1e1e1e] rounded-xl border border-white/10 p-6 text-left font-mono text-sm overflow-hidden relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-blue-400">export function</div> <div className="text-yellow-400">ProductCard</div>() {'{'}
          <div className="pl-4 text-pink-400">return (</div>
          <div className="pl-8 text-gray-300">&lt;div className="<span className="text-green-400">p-6 rounded-xl bg-black border border-white/10 hover:scale-105 transition</span>"&gt;</div>
          <div className="pl-12 text-gray-300">&lt;h3&gt;Neural T-Shirt&lt;/h3&gt;</div>
          <div className="pl-12 text-gray-300">&lt;span&gt;$49.00&lt;/span&gt;</div>
          <div className="pl-8 text-gray-300">&lt;/div&gt;</div>
          <div className="pl-4 text-pink-400">);</div>
          <div>{'}'}</div>
        </div>
      </section>
    </div>
  );
}
