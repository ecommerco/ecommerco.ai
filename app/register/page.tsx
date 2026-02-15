"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.message ?? "فشل إنشاء الحساب");
        setSubmitting(false);
        return;
      }
      router.push("/login?registered=1");
    } catch (err) {
      setError("خطأ في الاتصال، حاول مرة أخرى");
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#02030a] text-foreground">
      <div className="hidden border-r border-border bg-[#050509] px-10 py-10 md:flex md:flex-1 md:flex-col md:justify-between">
        <div className="space-y-6">
          <div className="h-1 w-16 bg-[#FACC15]" />
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted">
              Create account
            </p>
            <h1 className="text-2xl font-semibold">
              Onboard your team into the Salsabel control room.
            </h1>
          </div>
        </div>
        <div className="space-y-1 text-[11px] text-muted">
          <p>One login, multi-store WooCommerce management.</p>
          <p className="text-[#FACC15]">Sharp, minimal, production-ready.</p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm border border-border bg-[#050509] px-8 py-10 shadow-[0_0_0_1px_rgba(15,23,42,0.9)]">
          <div className="mb-6 space-y-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted">
              Sign up
            </p>
            <h2 className="text-xl font-semibold text-foreground">
              إنشاء حساب جديد
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-[11px] uppercase tracking-wide"
              >
                الاسم
              </label>
              <Input
                id="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-[11px] uppercase tracking-wide"
              >
                البريد الإلكتروني
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-[11px] uppercase tracking-wide"
              >
                كلمة المرور
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              disabled={submitting || !name || !email || !password}
            >
              {submitting ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
            </Button>
            <button
              type="button"
              className="w-full text-center text-[11px] text-muted underline underline-offset-4"
              onClick={() => router.push("/login")}
            >
              لديك حساب بالفعل؟ تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
