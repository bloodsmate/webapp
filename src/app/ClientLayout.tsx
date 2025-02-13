"use client"

import { usePathname } from "next/navigation";
import type React from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton";
import Chatbot from "./components/Chatbot";
import WhatsAppButton from './components/WhatsAppButton';
import { checkAuth } from "./redux/authSlice"
import type { AppDispatch } from "./redux/store"
import { webSocketService } from "./services/websocket"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === "/login" || pathname === "/auth"

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(checkAuth())
    webSocketService.init(dispatch)

    return () => {
      webSocketService.close()
    }
  }, [dispatch])

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

