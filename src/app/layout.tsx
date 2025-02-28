// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display, Inter } from 'next/font/google';
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "./components/ui/toaster";
import SEO from "./components/SEO";
import { ThemeProvider } from "./components/ThemeProvider";
import ClientLayout from "./ClientLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['400', '700'], 
  variable: '--font-playfair' 
});

const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'], 
  variable: '--font-inter' 
});

export const metadata: Metadata = {
  title: "BloodsMate",
  description: "Quality T-shirts for every style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen overflow-x-hidden`}
      >
        <SEO
          title="BloodsMate"
          description="Quality T-shirts for every style"
          canonical="/"
        />
        <ThemeProvider defaultTheme="system" enableSystem>
          <Providers>
            <ClientLayout>{children}</ClientLayout>
            <Toaster />
          </Providers>
        </ThemeProvider>

        <Script
          src="https://www.payhere.lk/lib/payhere.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
      </body>
    </html>
  );
}