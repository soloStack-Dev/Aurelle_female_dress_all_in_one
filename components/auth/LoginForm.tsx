"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FiCheck } from "react-icons/fi";
import { LuArrowRight, LuMail } from "react-icons/lu";
import { z } from "zod";
import { getAuthNextPath } from "@/lib/auth-navigation";
import { useAuth } from "@/lib/store/auth";
import PasswordField from "./signup/PasswordField";
import SocialButtons from "./signup/SocialButtons";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required.")
    .email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const signIn = useAuth((state) => state.signIn);
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [notice, setNotice] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const onValid = async (values: LoginValues) => {
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    const email = values.email.trim();
    signIn({
      name: email.split("@")[0],
      email,
    });
    setStatus("success");
    setNotice("Signed in. Opening the atelier...");
    router.replace(getAuthNextPath());
  };

  return (
    <main className="auth-signup flex min-h-dvh items-center justify-center p-3 sm:p-6">
      <section className="w-full max-w-[1020px] rounded-[26px] bg-[#0e0e0e] p-2.5 sm:rounded-[32px]">
        <div className="overflow-hidden rounded-[19px] sm:rounded-[24px] md:grid md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="relative h-36 sm:h-44 md:h-auto md:min-h-[600px]">
            <Image
              src="/Asserts/create-account-page-img.jpg"
              alt="AURELLE account editorial artwork"
              fill
              priority
              sizes="(min-width: 768px) 44vw, 100vw"
              className="object-cover object-[50%_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent md:bg-gradient-to-r" />
            <p className="absolute bottom-4 left-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/90 sm:bottom-6 sm:left-7">
              The AURELLE atelier
            </p>
          </div>

          <div className="auth-signup-gradient">
            <div className="flex min-h-[600px] flex-col px-6 py-6 sm:px-10 sm:py-8">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="font-serif text-lg tracking-[0.18em] text-[#111111] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                >
                  AURELLE
                </Link>
                <Link
                  href="/signup"
                  className="text-[11px] font-semibold text-[#111111] underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                >
                  Create account
                </Link>
              </div>

              <div className="flex flex-1 flex-col justify-center py-10">
                <div className="mx-auto w-full max-w-[370px]">
                  <h1 className="text-[clamp(2.5rem,7vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.035em] text-[#111111]">
                    Welcome back
                  </h1>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#5e4f44]">
                    Sign in to pick up where you left off.
                  </p>

                  <form
                    onSubmit={handleSubmit(onValid)}
                    onChange={() => {
                      if (notice) setNotice("");
                      if (status === "success") setStatus("idle");
                    }}
                    className="mt-8"
                    noValidate
                  >
                    <div className="space-y-3.5">
                      <div>
                        <label htmlFor="login-email" className="sr-only">
                          Email address
                        </label>
                        <div className="relative">
                          <LuMail
                            className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-[#5e4f44]"
                            aria-hidden="true"
                          />
                          <input
                            {...register("email")}
                            id="login-email"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            placeholder="Email Address"
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? "login-email-error" : undefined}
                            className={`h-[52px] w-full rounded-xl border bg-white/28 pl-11 pr-4 text-sm text-[#111111] placeholder:text-[#5e4f44] focus:outline-none focus:ring-2 focus:ring-black/20 ${
                              errors.email ? "border-[#d9534f]" : "border-white/55"
                            }`}
                          />
                        </div>
                        {errors.email ? (
                          <p
                            id="login-email-error"
                            className="mt-1.5 text-[11px] leading-snug text-[#7c1d16]"
                          >
                            {errors.email.message}
                          </p>
                        ) : null}
                      </div>

                      <PasswordField
                        id="login-password"
                        autoComplete="current-password"
                        error={errors.password?.message}
                        {...register("password")}
                      />
                    </div>

                    <div className="mt-3 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          setNotice("Password reset is not connected in this demo.")
                        }
                        className="text-[11px] font-semibold text-[#5e4f44] underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative mt-5 flex h-[52px] w-full items-center justify-center rounded-xl bg-[#0e0e0e] px-12 text-[15px] font-medium text-white transition-colors disabled:cursor-wait disabled:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#c99062]"
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Signing in</span>
                        </>
                      ) : status === "success" ? (
                        <>
                          <FiCheck className="mr-2 size-4" aria-hidden="true" />
                          Signed in
                        </>
                      ) : (
                        <>
                          Log In
                          <LuArrowRight
                            className="absolute right-4 size-4 transition-transform group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </button>

                    <div className="mt-8 flex items-center gap-3">
                      <span className="h-px flex-1 bg-[rgba(120,90,60,0.25)]" />
                      <span className="text-[11px] text-[#5e4f44]">or continue with</span>
                      <span className="h-px flex-1 bg-[rgba(120,90,60,0.25)]" />
                    </div>

                    <div className="mt-5">
                      <SocialButtons onNotice={setNotice} />
                    </div>

                    <p
                      role="status"
                      aria-live="polite"
                      className="mt-4 min-h-4 text-center text-[11px] leading-snug text-[#5e4f44]"
                    >
                      {notice}
                    </p>

                    <p className="mb-3 text-center text-[10px] leading-relaxed text-[#5e4f44]/80">
                      Demo access: any valid email and password work. Your session is
                      stored only in this browser.
                    </p>

                    <p className="text-center text-[11px] text-[#5e4f44]">
                      New here?{" "}
                      <Link
                        href="/signup"
                        className="font-semibold text-[#111111] underline underline-offset-2 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                      >
                        Create an account
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
