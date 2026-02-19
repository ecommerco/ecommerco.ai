"use client";

import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Clock, 
  Server, 
  Store, 
  Layers, 
  Settings, 
  Cloud, 
  Globe, 
  Code, 
  Database,
  Zap
} from "lucide-react";

const completedFeatures = [
  {
    title: "Multi-Tenant Architecture",
    description: "Complete store isolation and management system. Each store operates independently with its own configuration.",
    icon: <Layers className="w-6 h-6" />,
    status: "completed",
  },
  {
    title: "Store Management System",
    description: "Full CRUD operations for stores. Create, read, update, and delete stores with complete control.",
    icon: <Store className="w-6 h-6" />,
    status: "completed",
  },
  {
    title: "Template Auto-Application",
    description: "Automatically apply themes and templates to each store based on configuration.",
    icon: <Settings className="w-6 h-6" />,
    status: "completed",
  },
  {
    title: "Middleware System",
    description: "Intelligent routing system that identifies stores based on domain/subdomain and injects configuration.",
    icon: <Zap className="w-6 h-6" />,
    status: "completed",
  },
  {
    title: "Store Configuration System",
    description: "Dynamic configuration system that adapts each store's behavior, theme, and settings.",
    icon: <Settings className="w-6 h-6" />,
    status: "completed",
  },
  {
    title: "Cloudflare Integration",
    description: "Seamless integration with Cloudflare API for DNS management, CDN, and firewall protection.",
    icon: <Cloud className="w-6 h-6" />,
    status: "completed",
  },
  {
    title: "Auto Subdomain Creation",
    description: "Automatically create unique subdomains for each new store (e.g., storename.ecommerco.ai).",
    icon: <Globe className="w-6 h-6" />,
    status: "completed",
  },
  {
    title: "WordPress + WooCommerce",
    description: "Automated setup with Docker. Each store gets its own WordPress instance with WooCommerce pre-installed.",
    icon: <Server className="w-6 h-6" />,
    status: "completed",
  },
  {
    title: "GitHub Repository",
    description: "Source code version control and deployment pipeline setup.",
    icon: <Code className="w-6 h-6" />,
    status: "completed",
  },
];

const inProgressFeatures = [
  {
    title: "Database Integration",
    description: "PostgreSQL/MongoDB integration for persistent data storage.",
    icon: <Database className="w-6 h-6" />,
    status: "in-progress",
  },
];

export function CompletedFeatures() {
  return (
    <section className="py-32 bg-black relative">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-6xl font-semibold tracking-tight text-white mb-6">
            Built & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Deployed</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light">
            See what we've already built. Real features, real progress, real results.
          </p>
        </motion.div>

        {/* Completed Features */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <h3 className="text-2xl font-bold text-white">Completed Features</h3>
            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-sm font-medium">
              {completedFeatures.length} Features
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-green-500/50 hover:bg-white/10 transition-all duration-300"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20 text-green-500 transition-all duration-300">
                  {feature.icon}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* In Progress Features */}
        {inProgressFeatures.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-6 h-6 text-yellow-500" />
              <h3 className="text-2xl font-bold text-white">In Progress</h3>
              <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-sm font-medium">
                {inProgressFeatures.length} Feature
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-yellow-500/50 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {feature.title}
                    </h3>
                    <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0 animate-pulse" />
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-yellow-500/10 to-primary/10 border border-primary/20"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Overall Progress</h3>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-5xl font-bold text-primary">28%</div>
              <div className="flex-1 max-w-md">
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-primary to-yellow-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: '28%' }}
                  />
                </div>
              </div>
            </div>
            <p className="text-gray-400">
              <span className="text-green-500 font-semibold">{completedFeatures.length} Completed</span> • 
              <span className="text-yellow-500 font-semibold"> {inProgressFeatures.length} In Progress</span> • 
              <span className="text-gray-500"> 30+ Planned</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
