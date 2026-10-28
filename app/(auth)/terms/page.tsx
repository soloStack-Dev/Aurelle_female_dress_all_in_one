import type { Metadata } from "next";
import LegalDocument from "@/components/auth/LegalDocument";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using the AURELLE demonstration storefront.",
};

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Terms of Service"
      updated="28 October 2026"
      intro="These terms describe how the AURELLE demonstration storefront may be used. By browsing the site or submitting one of its demo forms, you agree to the terms below."
      sections={[
        {
          heading: "About this project",
          paragraphs: [
            "AURELLE is a demonstration fashion storefront created for design and development purposes. Product listings, prices, testimonials, and account features are illustrative and do not represent a live commercial service.",
          ],
        },
        {
          heading: "Accounts and forms",
          paragraphs: [
            "The sign-up and login forms are demonstrations. No real account is created, no password is authenticated, and no form submission is stored by the application.",
            "You are responsible for the information you enter. Please do not submit sensitive personal, financial, or confidential information through the demo forms.",
          ],
        },
        {
          heading: "Orders and payments",
          paragraphs: [
            "No payment is collected and no order is fulfilled through this site. Any cart, checkout, or membership flow is a front-end demonstration only.",
          ],
        },
        {
          heading: "Content and intellectual property",
          paragraphs: [
            "The AURELLE name, interface, layout, and original written content are presented for portfolio and demonstration use. Photography and third-party assets remain the property of their respective owners.",
          ],
        },
        {
          heading: "Acceptable use",
          paragraphs: [
            "Do not attempt to disrupt the site, bypass security controls, scrape it at scale, or use it in a way that violates applicable law. The site is provided as-is, without warranties of availability or fitness for a particular purpose.",
          ],
        },
        {
          heading: "Changes",
          paragraphs: [
            "These terms may be updated as the demonstration evolves. The date above records the latest revision. Continued use of the site after an update means you accept the revised terms.",
          ],
        },
      ]}
    />
  );
}
