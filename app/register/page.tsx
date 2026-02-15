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
    <div className="flex min-h-screen items-center justify-center bg-[#0b1120] px-4 py-8 text-foreground">
      <div className="w-full max-w-md border border-slate-800 bg-slate-950 px-8 py-10 shadow-[0_0_0_1px_rgba(30,41,59,0.9)]">
        <div className="mb-6 space-y-2">
          <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
            Sign up
          </p>
          <h2 className="text-xl font-semibold text-white">
            إنشاء حساب جديد
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="text-[11px] uppercase tracking-wide text-slate-300"
            >
              الاسم
            </label>
            <Input
              id="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-slate-700 bg-slate-900 text-sm text-white placeholder:text-slate-500"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-[11px] uppercase tracking-wide text-slate-300"
            >
              البريد الإلكتروني
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
              كلمة المرور
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
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
            disabled={submitting || !name || !email || !password}
          >
            {submitting ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
          </Button>
          <button
            type="button"
            className="w-full text-center text-[11px] text-slate-400 underline underline-offset-4"
            onClick={() => router.push("/login")}
          >
            لديك حساب بالفعل؟ تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
}
