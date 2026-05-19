"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import NavbarV2 from "../components-v2/NavbarV2";
import FooterV2 from "../components-v2/FooterV2";
import "../globals-v2.css";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { login } from "@/app/store/features/auth/authThunks";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  const dispatch = useAppDispatch();
  const { user, loading, error: authError } = useAppSelector(state => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (user) {
      router.replace(user.role === "admin" ? "/admin" : from !== "/login" ? from : "/");
    }
  }, [user, from, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      if (result.payload.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace(from && from !== "/login" ? from : "/");
      }
    }
  };

  const currentError = localError || authError;
  const inputCls = "w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm bg-white/5 border border-white/10 text-white outline-none placeholder:text-white/30 hover:border-white/15 focus:border-sky-400/80 focus:bg-white/8 focus:ring-4 focus:ring-sky-400/10 transition-all duration-300 font-['Plus_Jakarta_Sans',sans-serif]";

  return (
    <div className="v2-body min-h-screen flex flex-col bg-[#061217]">
      <NavbarV2 />
      <div className="flex-grow pt-32 pb-16 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#061217] via-[#0b1d25] to-[#122e3b]">
        
        {/* Ambient Blur Glows */}
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-sky-500/5 blur-[90px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-[#ff9500]/3 blur-[80px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md mx-auto px-4">

          <div className="text-center mb-8">
            <h1 className="font-['Poppins',sans-serif] text-4xl font-black text-white tracking-tight leading-none animate-pulse">
              Welcome Back
            </h1>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-semibold text-white/40 mt-2">
              Don&apos;t have an account?{" "}
              <Link
                href={`/signup${from && from !== "/login" ? `?from=${encodeURIComponent(from)}` : ""}`}
                className="text-sky-400 hover:text-sky-300 font-bold transition-all duration-300"
              >
                Create one free →
              </Link>
            </p>
          </div>

          <div className="rounded-[2.5rem] bg-[#0c1e26]/90 backdrop-blur-2xl border border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.4)] overflow-hidden w-full transition-all duration-300">
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {currentError && (
                <div className="flex items-start gap-2.5 px-4.5 py-3 rounded-2xl text-xs bg-red-500/10 border border-red-500/20 text-red-300 font-semibold tracking-wide shadow-sm">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{currentError}</span>
                </div>
              )}

              <div>
                <label htmlFor="sv-email" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block font-['Poppins',sans-serif]">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    id="sv-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="sv-password" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block font-['Poppins',sans-serif]">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors font-['Plus_Jakarta_Sans',sans-serif]">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    id="sv-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    className={inputCls + " pr-11"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors p-1 cursor-pointer hover:bg-white/5 rounded-lg"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 01-1.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943-9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-white bg-gradient-to-r from-sky-400 to-blue-600 shadow-[0_4px_16px_rgba(74,144,226,0.25)] hover:shadow-[0_6px_22px_rgba(74,144,226,0.35)] hover:scale-[1.015] hover:brightness-105 active:scale-[0.985] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-['Poppins',sans-serif] mt-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Signing in…
                  </span>
                ) : (
                  "Sign In →"
                )}
              </button>

              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest font-['Poppins',sans-serif]">or</span>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              <Link
                href={`/signup${from && from !== "/login" ? `?from=${encodeURIComponent(from)}` : ""}`}
                className="block w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest text-center transition-all duration-300 border border-white/10 hover:border-white/20 text-white/80 hover:text-white hover:bg-white/5 font-['Poppins',sans-serif]"
              >
                Create a new account
              </Link>
            </form>
          </div>

          <p className="text-center mt-6 text-xs text-white/20 font-medium font-['Plus_Jakarta_Sans',sans-serif]">
            🔒 Secure, encrypted connection · © 2026 Stay Vacation
          </p>
        </div>
      </div>
      <FooterV2 />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#061217]" />}>
      <LoginForm />
    </Suspense>
  );
}
