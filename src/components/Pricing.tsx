"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { GlowingCard } from "./GlowingCard";

const tiers = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for new AI merchants.",
    features: [
      "AI Store Generator (Basic)",
      "5,000 Monthly Visitors",
      "Standard Analytics",
      "Email Support",
      "1 Admin Seat"
    ],
  },
  {
    name: "Growth",
    price: "$79",
    description: "Scale your business with neural insights.",
    features: [
      "Advanced AI Store Architect",
      "50,000 Monthly Visitors",
      "Predictive Analytics",
      "Priority Support",
      "5 Admin Seats",
      "Global Selling (3 Regions)"
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Full commerce superintelligence.",
    features: [
      "Custom AI Model Training",
      "Unlimited Traffic",
      "Real-time Neural Network",
      "Dedicated Success Manager",
      "Unlimited Seats",
      "Global Selling (Worldwide)"
    ],
  },
];

export function Pricing() {
  return (
    <section className="py-20 bg-black">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Invest in <span className="text-primary">Intelligence</span>.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transparent pricing for every stage of your commerce evolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <GlowingCard key={index} className="h-full">
              <div className="p-8 flex flex-col h-full relative">
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold text-primary mb-4">{tier.price}<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                <p className="text-gray-400 mb-8">{tier.description}</p>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-full font-bold transition-all duration-300 ${
                  tier.popular 
                    ? "bg-primary text-black hover:bg-white" 
                    : "bg-white/10 text-white hover:bg-white hover:text-black"
                }`}>
                  Get Started
                </button>
              </div>
            </GlowingCard>
          ))}
        </div>
      </div>
    </section>
  );
}
