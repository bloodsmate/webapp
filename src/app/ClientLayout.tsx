"use client"

import { usePathname } from "next/navigation";
import type React from "react";
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton";
import Chatbot from "./components/Chatbot";
import WhatsAppButton from './components/WhatsAppButton';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === "/login" || pathname === "/signup"

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAuthPage && <Footer />}
      {!isAuthPage && (
        <>
          <BackToTopButton />
          <Chatbot />
          <WhatsAppButton />
        </>
      )}
    </>
  )
}

