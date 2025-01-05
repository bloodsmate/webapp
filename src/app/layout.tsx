import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from './providers' 
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Toaster } from './components/ui/toaster' 
import BackToTopButton from './components/BackToTopButton'
import SEO from './components/SEO'

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
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
        </Providers>
      </body>
    </html>
  );
}
