"use client"

import { Button } from "@/app/components/ui/button"
import { PhoneIcon as WhatsappIcon } from "lucide-react"

export default function WhatsAppButton() {
  const phoneNumber = "0758657450" // Replace with your actual WhatsApp number
  const message = encodeURIComponent("Hello! I have a question about your T-shirts.")

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  return (
    <Button onClick={handleClick} className="fixed bottom-28 right-4 rounded-full p-4 bg-green-500 hover:bg-green-600">
      <WhatsappIcon size={24} color="white" />
    </Button>
  )
}