import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "IDSHOPCASE",
    template: "%s | IDSHOPCASE",
  },
  description:
    "IDShopCase menjual case HP premium, custom, keychain, phone charm, dan masih banyak lagi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>

        {/* // eslint-disable-next-line @next/next/no-sync-scripts */}
        <Script
          src="https://sandbox.doku.com/jokul-checkout-js/v1/jokul-checkout-1.0.0.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={`  antialiased`}>
        <NextTopLoader
          color="#003077"
          showSpinner={false}
          height={3}
          shadow={false}
          speed={200}
        ></NextTopLoader>
        <QueryProvider>{children}</QueryProvider>
        <Toaster position="top-center"></Toaster>
      </body>
    </html>
  );
}
