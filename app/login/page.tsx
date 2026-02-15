"use client";

import { FormEvent, Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password
    });
    setSubmitting(false);
    if (!result) {
      setError("Unexpected error");
      return;
    }
    if (result.error) {
      setError("Invalid credentials");
      return;
    }
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
    router.push(callbackUrl);
  }

  const registered = searchParams.get("registered") === "1";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b1120] px-4 py-8 text-foreground">
      <div className="w-full max-w-md border border-slate-800 bg-slate-950 px-8 py-10 shadow-[0_0_0_1px_rgba(30,41,59,0.9)]">
        <div className="mb-6 space-y-2">
          <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
            Sign in
          </p>
          <h2 className="text-xl font-semibold text-white">
            ecommerco.ai
          </h2>
        </div>
        {registered && (
          <p className="mb-4 text-[11px] text-emerald-400">
            تم إنشاء الحساب بنجاح، قم بتسجيل الدخول الآن.
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label htmlFor="email" className="text-[11px] uppercase tracking-wide text-slate-300">
              Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-slate-700 bg-slate-900 text-sm text-white placeholder:text-slate-500"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-[11px] uppercase tracking-wide text-slate-300"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-slate-700 bg-slate-900 text-sm text-white placeholder:text-slate-500"
            />
          </div>
          {error && (
            <p className="text-[11px] text-red-400">
              {error}
            </p>
          )}
          <Button
            type="submit"
            className="w-full border-none bg-[#FACC15] text-[13px] font-semibold text-black hover:bg-[#e0b800]"
            disabled={submitting || !email || !password}
          >
            {submitting ? "Signing in..." : "Sign in"}
          </Button>
          <button
            type="button"
            className="w-full text-center text-[11px] text-slate-400 underline underline-offset-4"
            onClick={() => router.push("/register")}
          >
            إنشاء حساب جديد
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}
