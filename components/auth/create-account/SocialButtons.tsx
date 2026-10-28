"use client";

import { motion } from "motion/react";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const buttonClass =
  "flex h-10 w-full items-center justify-center gap-2 rounded-md border border-[#e4e0db] bg-white text-[13px] font-semibold text-[#121214] transition-colors hover:bg-[#faf9f7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#121214]/30";

export default function SocialButtons({
  onNotice,
}: {
  onNotice: (message: string) => void;
}) {
  return (
    <div className="space-y-3">
      <motion.button
        type="button"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onNotice("Google sign-up is not connected in this demo.")}
        className={buttonClass}
      >
        <FcGoogle className="size-4" aria-hidden="true" />
        Sign up with Google
      </motion.button>
      <motion.button
        type="button"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onNotice("X sign-up is not connected in this demo.")}
        className={buttonClass}
      >
        <FaXTwitter className="size-4" aria-hidden="true" />
        Sign up with X
      </motion.button>
    </div>
  );
}
