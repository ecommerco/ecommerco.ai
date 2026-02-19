"use client";

import { useState, useEffect } from "react";
import { X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (typeof window !== 'undefined' && window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Check if dismissed in this session
    if (typeof window !== 'undefined' && sessionStorage.getItem("pwa-install-dismissed")) {
      return;
    }

    // Listen for beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("beforeinstallprompt", handler);

      // Check if app was just installed
      window.addEventListener("appinstalled", () => {
        setIsInstalled(true);
        setShowInstallPrompt(false);
        setDeferredPrompt(null);
      });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("beforeinstallprompt", handler);
      }
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Don't show again for this session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem("pwa-install-dismissed", "true");
    }
  };

  // Don't show if already installed or dismissed
  if (isInstalled || !showInstallPrompt) {
    return null;
  }

  return (
    <AnimatePresence>
      {showInstallPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
        >
          <div className="bg-gradient-to-br from-black/95 to-black/90 border-2 border-primary/50 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-yellow-400 flex items-center justify-center">
                  <Download className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Install ecommerco.ai</h3>
                  <p className="text-sm text-gray-400">Add to your home screen for quick access</p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Dismiss"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleInstallClick}
                className="flex-1 bg-gradient-to-r from-primary to-yellow-400 text-black font-bold py-3 px-6 rounded-xl hover:from-yellow-400 hover:to-primary transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Install Now
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-3 text-gray-400 hover:text-white transition-colors rounded-xl border border-white/10 hover:border-white/20"
              >
                Later
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
