import type { Metadata } from "next";
import { Hanken_Grotesk, Inter_Tight, Onest } from "next/font/google";
import "./auth.css";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${onest.variable} ${interTight.variable} ${hanken.variable} min-h-dvh`}
    >
      {children}
    </div>
  );
}
