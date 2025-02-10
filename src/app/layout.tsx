import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Providers } from './providers'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster'; 
import BackToTopButton from './components/BackToTopButton';
import SEO from './components/SEO';
import Chatbot from './components/Chatbot';
import WhatsAppButton from './components/WhatsAppButton';
import type React from "react"

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

export const metadata: Metadata = {
  title: 'BloodsMate',
  description: 'Quality T-shirts for every style',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen overflow-x-hidden`}
      >
        <SEO 
          title="BloodsMate"
          description="Quality T-shirts for every style"
          canonical="/"
        />
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BackToTopButton />
          <Toaster />
          <Chatbot />
          <WhatsAppButton />
        </Providers>

        <Script
          src="https://www.payhere.lk/lib/payhere.js"
          strategy="lazyOnload"
        />
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      </body>
    </html>
  );
}
