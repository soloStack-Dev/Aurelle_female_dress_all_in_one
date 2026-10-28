import type { Metadata } from "next";
import LegalDocument from "@/components/auth/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How the AURELLE demonstration storefront handles information.",
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Privacy"
      title="Privacy Policy"
      updated="28 October 2026"
      intro="This policy explains what happens to information entered into the AURELLE demonstration storefront. The short version: demo form values stay in your browser and are not saved by the application."
      sections={[
        {
          heading: "Information you enter",
          paragraphs: [
            "The sign-up and login forms accept a name, email address, and password so the interface can be demonstrated. Validation happens in your browser. The values are not transmitted to or stored by an AURELLE application server.",
            "Demo social sign-in and password-reset controls do not contact a provider and do not create an account.",
          ],
        },
        {
          heading: "Technical information",
          paragraphs: [
            "Like most websites, the hosting infrastructure may process standard request information such as an IP address, browser type, requested page, and timestamp for security and reliability. This project does not use that information to build user profiles.",
          ],
        },
        {
          heading: "Cookies and storage",
          paragraphs: [
            "The demonstration does not set advertising or analytics cookies. Browser storage may be used by your browser or by the hosting platform for essential delivery and security purposes.",
          ],
        },
        {
          heading: "Third-party content",
          paragraphs: [
            "Pages may display images, fonts, or links from third parties. Those services operate under their own privacy policies. Following an external link takes you to a site not controlled by this project.",
          ],
        },
        {
          heading: "Your choices",
          paragraphs: [
            "Because demo form data is not retained, there is no stored account profile to access, correct, or delete. You can clear your browser data at any time to remove locally cached content.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "Privacy questions about the demonstration can be sent to hello@aurelle.example. This document is illustrative and should be replaced with reviewed legal language before any commercial launch.",
          ],
        },
      ]}
    />
  );
}
