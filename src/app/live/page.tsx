"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CallToAction } from "@/components/CallToAction";
import { CheckCircle2, Clock, Circle, AlertCircle } from "lucide-react";

interface Phase {
  id: string;
  name: string;
  status: "completed" | "in-progress" | "not-started" | "blocked";
  progress: number;
  items: PhaseItem[];
}

interface PhaseItem {
  id: string;
  name: string;
  status: "completed" | "in-progress" | "not-started";
}

export default function LivePage() {
  const [phases] = useState<Phase[]>([
    {
      id: "phase-0",
      name: "Infrastructure Setup",
      status: "in-progress",
      progress: 70,
      items: [
        { id: "vps", name: "VPS Setup (Hostinger)", status: "not-started" },
        { id: "cloudflare", name: "Cloudflare Integration", status: "completed" },
        { id: "subdomain", name: "Auto Subdomain Creation", status: "completed" },
        { id: "wordpress", name: "WordPress + WooCommerce Setup", status: "completed" },
        { id: "github", name: "GitHub Repository Setup", status: "completed" },
        { id: "firebase-auth", name: "Firebase Authentication Setup", status: "completed" },
        { id: "ssl", name: "SSL Auto-Setup", status: "not-started" },
      ],
    },
    {
      id: "phase-1",
      name: "Core Foundation",
      status: "in-progress",
      progress: 95,
      items: [
        { id: "multi-tenant", name: "Multi-Tenant Architecture", status: "completed" },
        { id: "store-mgmt", name: "Store Management", status: "completed" },
        { id: "template", name: "Template Auto-Application", status: "completed" },
        { id: "middleware", name: "Middleware System", status: "completed" },
        { id: "store-config", name: "Store Configuration System", status: "completed" },
        { id: "docker-template", name: "Docker Template System (Shopify-like)", status: "completed" },
        { id: "store-scripts", name: "Store Management Scripts (PowerShell)", status: "completed" },
        { id: "database", name: "PostgreSQL Database Integration", status: "completed" },
        { id: "prisma", name: "Prisma ORM Setup", status: "completed" },
        { id: "face-auth", name: "Face Recognition Authentication", status: "completed" },
        { id: "voice-auth", name: "Voice Recognition Authentication", status: "completed" },
        { id: "pwa", name: "Progressive Web App (PWA)", status: "completed" },
      ],
    },
    {
      id: "phase-2",
      name: "AI Agent Core",
      status: "not-started",
      progress: 0,
      items: [
        { id: "ai-model", name: "AI Model Setup (VPS)", status: "not-started" },
        { id: "voice", name: "Voice System (TTS/STT)", status: "not-started" },
        { id: "store-builder", name: "Store Builder AI", status: "not-started" },
      ],
    },
    {
      id: "phase-3",
      name: "Integrations",
      status: "not-started",
      progress: 0,
      items: [
        { id: "google", name: "Google Services", status: "not-started" },
        { id: "social", name: "Social Media", status: "not-started" },
        { id: "payment", name: "Payment Gateways", status: "not-started" },
        { id: "facebook-pixel", name: "Facebook Pixel", status: "not-started" },
        { id: "cloudflare-cdn", name: "Cloudflare CDN", status: "not-started" },
        { id: "cloudflare-firewall", name: "Cloudflare Firewall", status: "not-started" },
        { id: "matomo", name: "Matomo Analytics", status: "not-started" },
      ],
    },
    {
      id: "phase-3.5",
      name: "Advanced Dashboard & Analytics",
      status: "not-started",
      progress: 0,
      items: [
        { id: "dashboard", name: "Advanced Client Dashboard", status: "not-started" },
        { id: "seo-subdomain", name: "SEO Analytics Subdomain (seo.subdomain.ecommerco.ai)", status: "not-started" },
        { id: "matomo-install", name: "Matomo Installation & White Label", status: "not-started" },
        { id: "real-time-monitoring", name: "Real-time Monitoring & Control", status: "not-started" },
        { id: "analytics-dashboard", name: "Comprehensive Analytics Dashboard", status: "not-started" },
      ],
    },
    {
      id: "phase-4",
      name: "AI Image Processing",
      status: "not-started",
      progress: 0,
      items: [
        { id: "image-enhance", name: "Image Enhancement", status: "not-started" },
        { id: "product-auto", name: "Product Auto-Creation", status: "not-started" },
      ],
    },
    {
      id: "phase-5",
      name: "Smart Advertising",
      status: "not-started",
      progress: 0,
      items: [
        { id: "analytics", name: "Analytics Monitoring", status: "not-started" },
        { id: "ai-ads", name: "AI Advertising Intelligence", status: "not-started" },
      ],
    },
    {
      id: "phase-6",
      name: "Frontend Features",
      status: "in-progress",
      progress: 100,
      items: [
        { id: "multi-lang", name: "Multi-Language Support (i18n)", status: "completed" },
        { id: "help-center", name: "Help Center with Articles", status: "completed" },
        { id: "developers-page", name: "Developers API Documentation", status: "completed" },
        { id: "website-pages", name: "Website Pages (Solutions, Resources, etc.)", status: "completed" },
        { id: "video-hero", name: "Video Background in Hero", status: "completed" },
        { id: "language-switcher", name: "Language Switcher Component", status: "completed" },
      ],
    },
  ]);

  const overallProgress = 32;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "blocked":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">✅ Complete</span>;
      case "in-progress":
        return <span className="px-3 py-1 rounded-full bg-yellow-500 text-white text-xs font-semibold">⏳ In Progress</span>;
      case "blocked":
        return <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold">🔴 Blocked</span>;
      default:
        return <span className="px-3 py-1 rounded-full border border-gray-500 text-gray-400 text-xs font-semibold">⬜ Not Started</span>;
    }
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold">
                🚀 Ecommerco.ai
              </h1>
              <p className="text-xl text-gray-400">
                Live Development Progress
              </p>
            </div>

            {/* Overall Progress */}
            <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Overall Progress</h2>
                  <span className="text-3xl font-bold text-primary">{overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-6">
                  <div
                    className="bg-primary h-6 rounded-full transition-all duration-500"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-white">Completed</div>
                    <div className="text-green-500">25 features</div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">In Progress</div>
                    <div className="text-yellow-500">2 features</div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Planned</div>
                    <div className="text-gray-500">30+ features</div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Total</div>
                    <div className="text-blue-500">57+ features</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phases */}
            <div className="space-y-6">
              {phases.map((phase) => (
                <div key={phase.id} className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="space-y-4">
                    {/* Phase Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(phase.status)}
                          <h3 className="text-2xl font-bold text-white">{phase.name}</h3>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(phase.status)}
                        <div className="mt-2 text-sm text-gray-400">
                          {phase.progress}% Complete
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          phase.status === "completed"
                            ? "bg-green-500"
                            : phase.status === "in-progress"
                            ? "bg-yellow-500"
                            : "bg-gray-700"
                        }`}
                        style={{ width: `${phase.progress}%` }}
                      />
                    </div>

                    {/* Phase Items */}
                    <div className="grid md:grid-cols-2 gap-3 mt-4">
                      {phase.items.map((item) => (
                        <div
                          key={item.id}
                          className={`p-4 rounded-lg border-2 ${
                            item.status === "completed"
                              ? "border-green-500 bg-green-500/10"
                              : item.status === "in-progress"
                              ? "border-yellow-500 bg-yellow-500/10"
                              : "border-gray-700 bg-gray-800/50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {getStatusIcon(item.status)}
                            <span className="font-semibold text-white">{item.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Achievements */}
            <div className="p-8 rounded-xl border-2 border-primary/30 shadow-xl bg-gradient-to-br from-primary/10 to-yellow-500/10">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  🎉 Recent Achievements
                </h2>
                <p className="text-gray-400">
                  Latest Completed Features
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border-2 border-green-500 bg-green-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-white">Multi-Tenant Architecture</span>
                  </div>
                  <p className="text-sm text-gray-400">Complete store isolation and management system</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-green-500 bg-green-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-white">Cloudflare Integration</span>
                  </div>
                  <p className="text-sm text-gray-400">Auto subdomain creation and DNS management</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-green-500 bg-green-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-white">WordPress + WooCommerce</span>
                  </div>
                  <p className="text-sm text-gray-400">Automated setup with Docker</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-green-500 bg-green-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-white">Store Management System</span>
                  </div>
                  <p className="text-sm text-gray-400">Complete CRUD operations for stores</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-green-500 bg-green-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-white">Template System</span>
                  </div>
                  <p className="text-sm text-gray-400">Auto-application of themes per store</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-green-500 bg-green-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-white">GitHub Repository</span>
                  </div>
                  <p className="text-sm text-gray-400">Source code version control setup</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-green-500 bg-green-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-white">Docker Template System</span>
                  </div>
                  <p className="text-sm text-gray-400">Shopify-like store creation with Docker containers</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-green-500 bg-green-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-white">Store Management Scripts</span>
                  </div>
                  <p className="text-sm text-gray-400">PowerShell scripts for managing stores</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-green-500 bg-green-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-white">Firebase Authentication</span>
                  </div>
                  <p className="text-sm text-gray-400">Email, Google, GitHub, and Phone login</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-green-500 bg-green-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-white">Help Center</span>
                  </div>
                  <p className="text-sm text-gray-400">Complete help center with articles and search</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-green-500 bg-green-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-white">Multi-Language Support</span>
                  </div>
                  <p className="text-sm text-gray-400">i18n system with language switcher</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-green-500 bg-green-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-white">Developers API Page</span>
                  </div>
                  <p className="text-sm text-gray-400">Complete API documentation for developers</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-green-500 bg-green-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-white">Website Pages</span>
                  </div>
                  <p className="text-sm text-gray-400">Solutions, Resources, Partners, Help, Blog, etc.</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-green-500 bg-green-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-white">PostgreSQL + Prisma</span>
                  </div>
                  <p className="text-sm text-gray-400">Production-ready database with Prisma ORM. User, OTP, Session models.</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-green-500 bg-green-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-white">Face Recognition</span>
                  </div>
                  <p className="text-sm text-gray-400">AI-powered face recognition with face-api.js. Client-side processing + PostgreSQL storage.</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-green-500 bg-green-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-white">Voice Recognition</span>
                  </div>
                  <p className="text-sm text-gray-400">Voiceprint extraction and matching. Advanced biometric authentication.</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-green-500 bg-green-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-white">Progressive Web App (PWA)</span>
                  </div>
                  <p className="text-sm text-gray-400">Installable PWA with service worker, offline support, and app-like experience.</p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="p-8 rounded-xl border-2 border-primary/20 shadow-xl bg-white/5 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  Key Features
                </h2>
                <p className="text-gray-400">
                  Professional E-commerce Platform
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="group relative p-6 rounded-xl border-2 border-white/10 bg-white/5 hover:border-primary/50 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">🤖</div>
                    <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                      Ready
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">AI-Powered</h3>
                  <p className="text-sm text-gray-400">
                    Intelligent automation for store management, product creation, and customer interactions.
                  </p>
                </div>

                <div className="group relative p-6 rounded-xl border-2 border-white/10 bg-white/5 hover:border-primary/50 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">🎤</div>
                    <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                      Ready
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Voice Interaction</h3>
                  <p className="text-sm text-gray-400">
                    Natural voice conversations with your AI agent, just like ChatGPT.
                  </p>
                </div>

                <div className="group relative p-6 rounded-xl border-2 border-white/10 bg-white/5 hover:border-primary/50 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">🚀</div>
                    <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                      Ready
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Auto-Everything</h3>
                  <p className="text-sm text-gray-400">
                    Automated domain setup, integrations, publishing, and advertising.
                  </p>
                </div>
              </div>
            </div>

            {/* Advanced Authentication */}
            <div className="p-8 rounded-xl border-2 border-primary/20 shadow-xl bg-white/5 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  Advanced Authentication
                </h2>
                <p className="text-gray-400">
                  Passwordless Security
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group relative p-6 rounded-xl border-2 border-green-500 bg-green-500/10 hover:border-green-400 hover:bg-green-500/20 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">👤</div>
                    <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                      ✅ Ready
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Face Recognition</h3>
                  <p className="text-sm text-gray-400">
                    AI-powered facial recognition using face-api.js. Client-side processing with PostgreSQL storage. Auto-registration on first use.
                  </p>
                </div>

                <div className="group relative p-6 rounded-xl border-2 border-green-500 bg-green-500/10 hover:border-green-400 hover:bg-green-500/20 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">🎙️</div>
                    <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                      ✅ Ready
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Voice Recognition</h3>
                  <p className="text-sm text-gray-400">
                    Voiceprint extraction and matching. Client-side feature extraction with PostgreSQL storage. Advanced biometric security.
                  </p>
                </div>

                <div className="group relative p-6 rounded-xl border-2 border-white/10 bg-white/5 hover:border-primary/50 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">👆</div>
                    <span className="px-3 py-1 rounded-full bg-yellow-500 text-white text-xs font-semibold">
                      In Progress
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Fingerprint</h3>
                  <p className="text-sm text-gray-400">
                    Mobile fingerprint authentication for quick and secure access.
                  </p>
                </div>

                <div className="group relative p-6 rounded-xl border-2 border-white/10 bg-white/5 hover:border-primary/50 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">🔐</div>
                    <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                      Ready
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">One-Time Password</h3>
                  <p className="text-sm text-gray-400">
                    Secure OTP sent to your phone or email for additional verification.
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="text-sm font-semibold text-blue-400">
                  💡 No Passwords Required!
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Our platform uses advanced biometric authentication. Choose face, voice, or fingerprint for secure, passwordless access.
                </p>
              </div>
            </div>

            {/* Social Media Integration */}
            <div className="p-8 rounded-xl border-2 border-primary/20 shadow-xl bg-white/5 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  Social Media Integration
                </h2>
                <p className="text-gray-400">
                  Auto-Publish Products
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: "📷", name: "Instagram", desc: "Auto-publish new products to Instagram feed and stories with optimized images." },
                  { icon: "📘", name: "Facebook", desc: "Share products on Facebook pages and groups automatically with engaging posts." },
                  { icon: "🎵", name: "TikTok", desc: "Create and publish TikTok videos showcasing your products automatically." },
                  { icon: "📌", name: "Pinterest", desc: "Pin product images to Pinterest boards with SEO-optimized descriptions." },
                  { icon: "🐦", name: "Twitter / X", desc: "Tweet new product launches with engaging content and product links." },
                  { icon: "💼", name: "LinkedIn", desc: "Share B2B products and updates on LinkedIn for professional networking." },
                ].map((social, i) => (
                  <div key={i} className="group relative p-6 rounded-xl border-2 border-white/10 bg-white/5 hover:border-primary/50 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{social.icon}</div>
                      <span className="px-3 py-1 rounded-full bg-yellow-500 text-white text-xs font-semibold">
                        Planned
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{social.name}</h3>
                    <p className="text-sm text-gray-400">
                      {social.desc}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <p className="text-sm font-semibold text-purple-400">
                  🚀 One-Click Publishing
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  When you add a new product, our AI automatically creates optimized posts and publishes them to all connected social media platforms. Save time and reach more customers!
                </p>
              </div>
            </div>

            {/* Frontend Features */}
            <div className="p-8 rounded-xl border-2 border-primary/20 shadow-xl bg-white/5 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  Frontend Features
                </h2>
                <p className="text-gray-400">
                  Website & User Experience
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: "🌐", name: "Multi-Language Support", desc: "Full i18n system with language switcher. Support for English, Arabic, and more.", status: "Ready" },
                  { icon: "❓", name: "Help Center", desc: "Complete help center with searchable articles, categories, and dynamic routing.", status: "Ready" },
                  { icon: "💻", name: "Developers API", desc: "Complete API documentation page with code examples and interactive guides.", status: "Ready" },
                  { icon: "📄", name: "Website Pages", desc: "Solutions, Resources, Partners, About, Help, Blog, Community, Academy, Careers, Contact, Privacy, Terms.", status: "Ready" },
                  { icon: "🎬", name: "Video Background", desc: "Dynamic video background in Hero section with particle effects overlay.", status: "Ready" },
                  { icon: "🐳", name: "Docker Template System", desc: "Shopify-like store creation. Each store gets its own Docker container with isolated database.", status: "Ready" },
                ].map((feature, i) => (
                  <div key={i} className="group relative p-6 rounded-xl border-2 border-green-500 bg-green-500/10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{feature.icon}</div>
                      <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                        {feature.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{feature.name}</h3>
                    <p className="text-sm text-gray-400">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Dashboard & Analytics */}
            <div className="p-8 rounded-xl border-2 border-primary/20 shadow-xl bg-white/5 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  Advanced Dashboard & Analytics
                </h2>
                <p className="text-gray-400">
                  Complete Control & Monitoring
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: "📊", name: "Advanced Client Dashboard", desc: "Professional dashboard with real-time monitoring, analytics, and complete control over your store.", status: "Planned" },
                  { icon: "🔍", name: "SEO Analytics Subdomain", desc: "Dedicated subdomain for each client's analytics dashboard. White label solution.", subdomain: "seo.subdomain.ecommerco.ai", status: "Planned" },
                  { icon: "📈", name: "Matomo Analytics", desc: "Self-hosted analytics platform like Google Analytics. Privacy-focused, GDPR compliant, white label.", status: "Planned" },
                  { icon: "⚡", name: "Real-time Monitoring", desc: "Live monitoring of traffic, sales, performance, and all store metrics in real-time.", status: "Planned" },
                  { icon: "📉", name: "Comprehensive Analytics", desc: "Complete analytics dashboard with visitor tracking, conversion rates, sales reports, and SEO insights.", status: "Planned" },
                  { icon: "🏷️", name: "White Label Solution", desc: "Fully branded experience. All analytics and dashboards show your brand, not ours.", status: "Ready" },
                ].map((item, i) => (
                  <div key={i} className="group relative p-6 rounded-xl border-2 border-white/10 bg-white/5 hover:border-primary/50 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{item.icon}</div>
                      <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        item.status === "Ready" ? "bg-green-500" : "bg-yellow-500"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{item.name}</h3>
                    {item.subdomain && (
                      <p className="text-sm text-gray-400 mb-2 font-mono text-xs bg-gray-800 p-2 rounded">
                        {item.subdomain}
                      </p>
                    )}
                    <p className="text-sm text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg border border-blue-500/20">
                <p className="text-sm font-semibold text-blue-400 mb-2">
                  🎯 Complete Control & Monitoring
                </p>
                <p className="text-sm text-gray-400">
                  Each client gets their own advanced dashboard with real-time monitoring, comprehensive analytics via Matomo (installed on seo.subdomain.ecommerco.ai), and complete control over their store. Everything is white label - your brand, your analytics, your control.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-gray-400">
              <p>Last Updated: {new Date().toLocaleDateString()}</p>
              <p className="mt-2">
                Watch us build the future of e-commerce!
              </p>
            </div>
          </div>
        </div>
      </div>
      <CallToAction />
    </main>
  );
}
