"use client";

import { motion } from "motion/react";
import { FaApple, FaTelegramPlane } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SocialButtons({
  onNotice,
}: {
  onNotice: (message: string) => void;
}) {
  const buttonClass =
    "flex h-[52px] items-center justify-center gap-2 rounded-xl border border-white/55 bg-white/28 px-2 text-[13px] font-medium text-[#111111] transition-colors hover:bg-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25";

  return (
    <div className="grid grid-cols-3 gap-3">
      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onNotice("Google sign-up is not connected in this demo.")}
        className={buttonClass}
      >
        <FcGoogle className="size-4 shrink-0" aria-hidden="true" />
        Google
      </motion.button>
      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onNotice("Apple sign-up is not connected in this demo.")}
        className={buttonClass}
      >
        <FaApple className="size-4 shrink-0" aria-hidden="true" />
        Apple
      </motion.button>
      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onNotice("Telegram sign-up is not connected in this demo.")}
        className={buttonClass}
      >
        <FaTelegramPlane
          className="size-4 shrink-0 text-[#2aabee]"
          aria-hidden="true"
        />
        Telegram
      </motion.button>
    </div>
  );
}
