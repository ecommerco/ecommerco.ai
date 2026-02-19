"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, Github, Eye, EyeOff, Smartphone, Apple } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { auth } from "@/lib/firebase";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithPhoneNumber,
  RecaptchaVerifier,
  GithubAuthProvider
} from "firebase/auth";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      setError("Authentication is not available. Please configure Firebase.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message || "Failed to sign in. Please check your credentials.");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message || "Failed to sign in with Google.");
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message || "Failed to sign in with GitHub.");
      setIsLoading(false);
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      setError("Authentication is not available. Please configure Firebase.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      if (typeof window !== "undefined") {
        const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
          callback: () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber
          },
        });

        await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
        // In a real app, you'd show a code input form here
        alert("Verification code sent! Check your phone.");
        setIsLoading(false);
      }
    } catch (error: any) {
      setError(error.message || "Failed to send verification code.");
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

            {/* Auth Method Tabs */}
            <div className="flex bg-black/50 p-1 rounded-lg mb-8 border border-white/10">
              <button
                onClick={() => setAuthMethod('email')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                  authMethod === 'email' 
                    ? 'bg-primary text-black shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
              <button
                onClick={() => setAuthMethod('phone')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                  authMethod === 'phone' 
                    ? 'bg-primary text-black shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                Phone
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={authMethod === 'email' ? handleEmailLogin : handlePhoneLogin} className="space-y-4">
              {authMethod === 'email' ? (
                <>
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-12 bg-black/50 border border-white/10 rounded-lg px-10 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">Phone Number</label>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-12 bg-black/50 border border-white/10 rounded-lg px-10 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div id="recaptcha-container"></div>
                  <p className="text-xs text-gray-500 ml-1">We&apos;ll send you a code to verify your phone number.</p>
                </div>
              )}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-primary text-black font-bold rounded-lg hover:bg-yellow-400 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-6"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    {authMethod === 'email' ? 'Sign In' : 'Send Code'} 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button 
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="flex items-center justify-center h-12 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <GoogleIcon />
              </button>
              <button 
                type="button"
                disabled
                className="flex items-center justify-center h-12 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AppleIcon />
              </button>
              <button 
                type="button"
                onClick={handleGithubLogin}
                disabled={isLoading}
                className="flex items-center justify-center h-12 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Github className="w-5 h-5" />
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Create Store
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
