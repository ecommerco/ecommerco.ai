"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, Github, Eye, EyeOff, Smartphone, Apple, Fingerprint } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { startAuthentication } from "@simplewebauthn/browser";

// Simple Google Icon Component
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.23856)">
      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.734 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
    </g>
  </svg>
);

// Simple Apple Icon Component (Using Path)
const AppleIcon = () => (
   <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
     <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-.68-.32-1.42-.48-2.12-.48-.68 0-1.45.17-2.15.49-1.02.48-2.09.54-3.02-.42C2.7 16.4 3.03 9.07 9.25 8.9c.89-.01 1.57.34 2.1.65.44.25.86.5 1.4.5.62 0 1.1-.31 1.63-.66.69-.45 1.58-.93 2.76-.84.86.07 3.02.32 3.99 1.74-3.4 2.05-2.83 6.36 1.05 7.94-.65 1.73-1.63 3.48-2.68 4.67-.4.46-.86.9-1.45 1.38zM12.04 8.78c-.03-.11-.04-.22-.04-.33 0-1.54 1.25-2.79 2.79-2.79.08 0 .16.01.24.02-.19 1.66-1.57 2.92-3.14 2.95.05.05.1.1.15.15z"/>
   </svg>
);

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("Starting login...");

    try {
      // 1. Get login options
      const optionsResp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generate-options',
          email,
        }),
      });

      const options = await optionsResp.json();

      if (options.error) {
        throw new Error(options.error);
      }

      setStatus("Please authenticate...");

      // 2. Pass options to browser's WebAuthn API
      const authenticationResponse = await startAuthentication(options);

      setStatus("Verifying...");

      // 3. Verify login
      const verifyResp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'verify',
          email,
          authenticationResponse,
        }),
      });

      const verification = await verifyResp.json();

      if (verification.verified) {
        setStatus("Login successful!");
        // Redirect
      } else {
        setStatus("Verification failed.");
      }

    } catch (error: any) {
      console.error(error);
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-6 pt-24">
        <div className="w-full max-w-md relative">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-20 pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tighter mb-2">Welcome Back</h1>
              <p className="text-gray-400">Enter your credentials to access your store.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 bg-black/50 border border-white/10 rounded-lg px-10 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {status && (
                <div className="text-center text-sm text-yellow-400">
                  {status}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 bg-primary text-black font-bold rounded-lg hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <Fingerprint className="w-5 h-5" />
                    Sign in with FaceID / TouchID
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-gray-500 text-sm">
                Don't have a store yet?{" "}
                <Link href="/signup" className="text-primary hover:text-yellow-400 transition-colors font-medium">
                  Create Store
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
