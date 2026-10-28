import type { Metadata } from "next";
import AuthWindow from "@/components/auth/create-account/AuthWindow";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create an AURELLE account and start your 30 day free trial.",
};

export default function CreateAccountPage() {
  return <AuthWindow />;
}
