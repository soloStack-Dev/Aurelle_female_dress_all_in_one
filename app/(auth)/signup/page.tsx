import type { Metadata } from "next";
import AuthFrame from "@/components/auth/signup/AuthFrame";

export const metadata: Metadata = {
  title: "Create your account",
  description: "Create an AURELLE account and build a wardrobe that feels like yours.",
};

export default function SignupPage() {
  return <AuthFrame />;
}
