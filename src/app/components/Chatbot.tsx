"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { MessageCircle, X } from "lucide-react"

const defaultMessages = [
  "What are your shipping details?",
  "Do you offer international shipping?",
  "How can I track my order?",
  "What's your return policy?",
]

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
    const [input, setInput] = useState("")
  
    const handleSend = () => {
      if (input.trim()) {
        setMessages([...messages, { text: input, isUser: true }])
        setInput("")
        // Here you would typically send the message to a backend API
        // and get a response. For now, we'll just echo the message back.
        setTimeout(() => {
          setMessages((prev) => [...prev, { text: `You said: ${input}`, isUser: false }])
        }, 1000)
      }
    }
  
    return (
      <>
        {!isOpen && (
          <Button className="fixed bottom-20 right-4 rounded-full p-4" onClick={() => setIsOpen(true)}>
            <MessageCircle size={24} />
          </Button>
        )}
        {isOpen && (
          <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
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
                    {msg.text}
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">How can we help you? Here are some common questions:</p>
                  {defaultMessages.map((msg, index) => (
                    <Button key={index} variant="outline" className="w-full justify-start" onClick={() => setInput(msg)}>
                      {msg}
                    </Button>
                  ))}
                </div>
              )}
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
  
  