"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@hooks/useAuth";
import toast from "react-hot-toast";

export default function AuthCard() {
  const {
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    loading,
    user
  } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/watchlist");
    }
  }, [loading, user, router]);

  const handleGoogle = async () => {
    try {
      setSubmitting(true);
      await signInWithGoogle();
      toast.success("Signed in with Google");
    } catch (err: any) {
      toast.error(err.message ?? "Failed to sign in");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    try {
      setSubmitting(true);
      if (mode === "signin") {
        await signInWithEmail(email, password);
        toast.success("Signed in");
      } else {
        await signUpWithEmail(email, password);
        toast.success("Account created");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="glass-surface rounded-3xl px-6 py-7 shadow-soft-lg">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Your Personal Watchlist
        </h1>
        <p className="mt-2 text-sm text-white/60">
          Save and track anime, movies, and series you want to watch.
        </p>
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={submitting || loading || !!user}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-900 shadow-md transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="text-lg">G</span>
        <span>Continue with Google</span>
      </button>

      <div className="my-5 flex items-center gap-3 text-xs text-white/40">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <span>or</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="mb-4 flex gap-2 rounded-full bg-white/5 p-1 text-xs">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`flex-1 rounded-full px-3 py-1.5 font-medium ${
            mode === "signin"
              ? "bg-white text-slate-900"
              : "text-white/70 hover:bg-white/5"
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-full px-3 py-1.5 font-medium ${
            mode === "signup"
              ? "bg-white text-slate-900"
              : "text-white/70 hover:bg-white/5"
          }`}
        >
          Sign up
        </button>
      </div>

      <form onSubmit={handleEmailSubmit} className="space-y-3 text-sm">
        <div>
          <label className="mb-1 block text-xs font-medium text-white/70">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none ring-0 placeholder:text-white/40 focus:border-rose-500/70 focus:bg-black/40"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-white/70">
            Password
          </label>
          <input
            type="password"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none ring-0 placeholder:text-white/40 focus:border-rose-500/70 focus:bg-black/40"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="At least 6 characters"
          />
        </div>
        <button
          type="submit"
          disabled={submitting || loading}
          className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-soft-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {mode === "signin" ? "Sign in with email" : "Create account"}
        </button>
      </form>
    </div>
  );
}

