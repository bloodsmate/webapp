"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { MessageCircle, X } from "lucide-react"
import { products } from "../data/products"

const defaultMessages = [
  "What are your shipping details?",
  "Do you offer international shipping?",
  "How can I track my order?",
  "What's your return policy?",
  "Can you suggest some t-shirts?",
]

interface Message {
  text: string
  isUser: boolean
  suggestedProducts?: typeof products
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")

  const suggestProducts = (query: string) => {
    const keywords = query.toLowerCase().split(" ")
    return products
      .filter((product) =>
        keywords.some(
          (keyword) =>
            product.name.toLowerCase().includes(keyword) || product.description.toLowerCase().includes(keyword),
        ),
      )
      .slice(0, 3) // Limit to 3 suggestions
  }

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, isUser: true }])
      setInput("")

      // Simple bot response logic
      setTimeout(() => {
        let botResponse: Message
        if (input.toLowerCase().includes("suggest") || input.toLowerCase().includes("recommend")) {
          const suggestedProducts = suggestProducts(input)
          botResponse = {
            text: "Here are some t-shirts you might like:",
            isUser: false,
            suggestedProducts,
          }
        } else {
          botResponse = { text: `You asked: "${input}". How else can I help you?`, isUser: false }
        }
        setMessages((prev) => [...prev, botResponse])
      }, 1000)
    }
  }

  const handleDefaultMessage = (message: string) => {
    setInput(message)
    handleSend()
  }

  return (
    <>
      {!isOpen && (
        <Button className="z-40 fixed bottom-28 xs:bottom-16 right-4 rounded-full p-4" onClick={() => setIsOpen(true)}>
          <MessageCircle size={24} />
        </Button>
      )}
      {isOpen && (
        <div className="z-40 fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
            <h3 className="font-semibold">Chat with us</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X size={24} />
            </Button>
          </div>
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-lg p-2 max-w-[80%] ${msg.isUser ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
                >
                  <p>{msg.text}</p>
                  {msg.suggestedProducts && (
                    <div className="mt-2 space-y-2">
                      {msg.suggestedProducts.map((product) => (
                        <div key={product.id} className="text-sm">
                          <p className="font-semibold">{product.name}</p>
                          <p>${product.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">How can we help you? Here are some common questions:</p>
              {defaultMessages.map((msg, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleDefaultMessage(msg)}
                >
                  {msg}
                </Button>
              ))}
            </div>
          </div>
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-2"
            >
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

