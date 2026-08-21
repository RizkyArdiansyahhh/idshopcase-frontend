import { PrivacyPolicyContent } from "@/components/shared/privacy-policy-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Idshopcase",
  description: "Kebijakan Privasi dan Perlindungan Data Pelanggan Idshopcase.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background py-10 sm:py-16">
      <PrivacyPolicyContent />
    </main>
  );
}
