"use client";

import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useAnimationControls } from "motion/react";
import { useForm } from "react-hook-form";
import { FiCheck, FiEye, FiEyeOff } from "react-icons/fi";
import { z } from "zod";
import BrandMark from "./BrandMark";
import SocialButtons from "./SocialButtons";
import UnderlineField from "./UnderlineField";

const accountSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required.")
    .email("Enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters."),
});

type AccountValues = z.infer<typeof accountSchema>;

export default function SignupForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [notice, setNotice] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const controls = useAnimationControls();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AccountValues>({
    resolver: zodResolver(accountSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { name: "", email: "", password: "" },
  });

  const onValid = async () => {
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setStatus("success");
    setNotice("Demo account created. Nothing was sent or stored.");
    reset();
  };

  const onInvalid = () => {
    void controls.start({
      x: [0, -5, 5, -3, 3, 0],
      transition: { duration: 0.38, ease: "easeInOut" },
    });
  };

  return (
    <div className="flex h-full flex-col px-6 pb-8 pt-7 sm:px-8 xl:px-14">
      <div className="flex flex-1 flex-col justify-center py-5 lg:py-9">
        <div className="mx-auto w-full max-w-[360px]">
          <div data-auth-reveal className="flex items-center gap-2 text-[#121214]">
            <BrandMark className="size-[18px]" />
            <span className="text-sm font-bold tracking-[0.12em]">AURELLE</span>
          </div>

          <h1
            data-auth-reveal
            className="mt-12 text-[32px] font-bold leading-tight tracking-[-0.025em] text-[#121214] sm:mt-14 xl:text-[36px]"
          >
            Create an account
          </h1>
          <p data-auth-reveal className="mt-2 text-sm text-[#5f5b57]">
            Let&apos;s get started with your 30 day free trial.
          </p>

          <motion.form
            data-auth-reveal
            animate={controls}
            onSubmit={handleSubmit(onValid, onInvalid)}
            onChange={() => {
              if (notice) setNotice("");
              if (status === "success") setStatus("idle");
            }}
            className="mt-8"
            noValidate
          >
            <UnderlineField
              label="Name"
              autoComplete="name"
              error={errors.name?.message}
              {...register("name")}
            />
            <UnderlineField
              label="Email"
              type="email"
              inputMode="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <UnderlineField
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              error={errors.password?.message}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="grid size-7 place-items-center rounded-full text-[#5f5b57] transition-colors hover:bg-[#121214]/5 hover:text-[#121214] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#121214]/30"
                >
                  {showPassword ? (
                    <FiEyeOff className="size-4" aria-hidden="true" />
                  ) : (
                    <FiEye className="size-4" aria-hidden="true" />
                  )}
                </button>
              }
              {...register("password")}
            />

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? undefined : { y: -1 }}
              whileTap={isSubmitting ? undefined : { scale: 0.98 }}
              className="mt-7 flex h-11 w-full items-center justify-center rounded-md bg-[#121214] px-6 text-[13px] font-semibold text-white transition-colors disabled:cursor-wait disabled:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#121214]/35 focus-visible:ring-offset-2"
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
                "Create account"
              )}
            </motion.button>

            <p
              role="status"
              aria-live="polite"
              className="mt-3 min-h-4 text-[11px] leading-snug text-[#5f5b57]"
            >
              {notice}
            </p>

            <div className="mt-3">
              <SocialButtons onNotice={setNotice} />
            </div>

            <p className="mt-7 text-center text-[12px] text-[#5f5b57]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#121214] underline underline-offset-2 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#121214]/30"
              >
                Log in
              </Link>
            </p>
          </motion.form>

          <p className="mt-5 text-center text-[10px] leading-relaxed text-[#5f5b57]/80">
            Demo form — no account is created and no data is stored.
          </p>
        </div>
      </div>
    </div>
  );
}
