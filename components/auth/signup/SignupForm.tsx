"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAnimationControls, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { FiCheck } from "react-icons/fi";
import { LuArrowRight, LuMail } from "react-icons/lu";
import { z } from "zod";
import { getAuthNextPath } from "@/lib/auth-navigation";
import { useAuth } from "@/lib/store/auth";
import PasswordField from "./PasswordField";
import SocialButtons from "./SocialButtons";

const signupSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required.")
    .email("Enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters."),
});

type SignupValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();
  const signIn = useAuth((state) => state.signIn);
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [notice, setNotice] = useState("");
  const controls = useAnimationControls();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const onValid = async (values: SignupValues) => {
    await new Promise((resolve) => window.setTimeout(resolve, 800));
    const email = values.email.trim();
    signIn({
      name: email.split("@")[0],
      email,
    });
    setStatus("success");
    setNotice("Account created. Opening the atelier...");
    router.replace(getAuthNextPath());
  };

  const onInvalid = () => {
    void controls.start({
      x: [0, -6, 6, -4, 4, 0],
      transition: { duration: 0.42, ease: "easeInOut" },
    });
  };

  return (
    <div className="relative flex h-full w-full flex-col px-6 pb-7 pt-5 sm:px-10 sm:pb-9 lg:px-12 xl:px-16">
      <p className="text-right text-[11px] text-[#5e4f44] sm:text-xs">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#111111] underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
        >
          Log In
        </Link>
      </p>

      <div className="flex flex-1 flex-col justify-center py-7">
        <div className="mx-auto w-full max-w-[430px]">
          <h1
            data-auth-item
            className="text-[clamp(2.55rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.035em] text-[#111111]"
          >
            Build Your Flow
          </h1>
          <p
            data-auth-item
            className="mt-3.5 max-w-[320px] text-[15px] leading-relaxed text-[#5e4f44] sm:text-base"
          >
            Create your account and get started with a clear mind.
          </p>

          <motion.form
            data-auth-item
            animate={controls}
            onSubmit={handleSubmit(onValid, onInvalid)}
            onChange={() => {
              if (notice) setNotice("");
              if (status === "success") setStatus("idle");
            }}
            className="mt-8"
            noValidate
          >
            <div className="space-y-3.5">
              <div>
                <label htmlFor="signup-email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <LuMail
                    className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-[#5e4f44]"
                    aria-hidden="true"
                  />
                  <input
                    {...register("email")}
                    id="signup-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="Email Address"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "signup-email-error" : undefined}
                    className={`h-[52px] w-full rounded-xl border bg-white/28 pl-11 pr-4 text-sm text-[#111111] placeholder:text-[#5e4f44] focus:outline-none focus:ring-2 focus:ring-black/20 ${
                      errors.email ? "border-[#d9534f]" : "border-white/55"
                    }`}
                  />
                </div>
                {errors.email ? (
                  <p
                    id="signup-email-error"
                    className="mt-1.5 text-[11px] leading-snug text-[#7c1d16]"
                  >
                    {errors.email.message}
                  </p>
                ) : null}
              </div>

              <PasswordField
                id="signup-password"
                autoComplete="new-password"
                error={errors.password?.message}
                {...register("password")}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? undefined : { scale: 1.01 }}
              whileTap={isSubmitting ? undefined : { scale: 0.98 }}
              className="group relative mt-[18px] flex h-[52px] w-full items-center justify-center rounded-xl bg-[#0e0e0e] px-12 text-[15px] font-medium text-white transition-colors disabled:cursor-wait disabled:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#c99062]"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Creating account</span>
                </>
              ) : status === "success" ? (
                <>
                  <FiCheck className="mr-2 size-4" aria-hidden="true" />
                  Account created
                </>
              ) : (
                <>
                  Sign Up
                  <LuArrowRight
                    className="absolute right-4 size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </>
              )}
            </motion.button>

            <div className="mt-9 flex items-center gap-3">
              <span className="h-px flex-1 bg-[rgba(120,90,60,0.25)]" />
              <span className="text-[11px] text-[#5e4f44]">or continue with</span>
              <span className="h-px flex-1 bg-[rgba(120,90,60,0.25)]" />
            </div>

            <div className="mt-6">
              <SocialButtons onNotice={setNotice} />
            </div>

            <p
              role="status"
              aria-live="polite"
              className="mt-4 min-h-4 text-center text-[11px] leading-snug text-[#5e4f44]"
            >
              {notice}
            </p>

            <p className="mt-6 text-center text-[11px] leading-relaxed text-[#5e4f44]">
              By signing up, you agree to our{" "}
              <Link
                href="/terms"
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-[#111111] underline decoration-black/30 underline-offset-2 hover:decoration-black focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-[#111111] underline decoration-black/30 underline-offset-2 hover:decoration-black focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
