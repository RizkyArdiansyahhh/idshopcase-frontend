import type { Metadata } from "next";
import { Fredoka, Poppins, Fustat } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { UnauthorizedModal } from "@/components/shared/unauthorized-modal";

const fustat = Fustat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-fustat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Idshopcase",
    template: "%s | Idshopcase",
  },
  description:
    "Idshopcase menjual case HP premium, custom, keychain, phone charm, dan masih banyak lagi.",
  icons: {
    icon: [
      { url: "/images/idshopcase_circle_image.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/images/idshopcase_circle_image.png",
    apple: [
      { url: "/images/idshopcase_circle_image.png", type: "image/png" },
      { url: "/apple-icon.png", type: "image/png" },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${fustat.variable} ${poppins.variable} ${fredoka.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta
          name="google-site-verification"
          content="oauS460qZk1UrnYvZXPvj61iqN4I7XSzH-LadUqy-ZM"
        />
        <link
          rel="icon"
          href="/images/idshopcase_circle_image.png"
          type="image/png"
          sizes="any"
        />
        <link
          rel="shortcut icon"
          href="/images/idshopcase_circle_image.png"
          type="image/png"
        />
        <link
          rel="apple-touch-icon"
          href="/images/idshopcase_circle_image.png"
          type="image/png"
        />

        {/* // eslint-disable-next-line @next/next/no-sync-scripts */}
        <Script
          src="https://sandbox.doku.com/jokul-checkout-js/v1/jokul-checkout-1.0.0.js"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${fustat.className} font-sans antialiased`}
        suppressHydrationWarning
      >
        <NextTopLoader
          color="#003077"
          showSpinner={false}
          height={3}
          shadow={false}
          speed={200}
        ></NextTopLoader>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <QueryProvider>
            {children}
            <UnauthorizedModal />
          </QueryProvider>
        </NextIntlClientProvider>
        <Toaster position="top-center"></Toaster>
      </body>
    </html>
  );
}
