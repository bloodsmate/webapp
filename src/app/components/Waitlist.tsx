"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { toast } from '../hooks/use-toast'

interface WaitlistProps {
  productId: number
  productName: string
  size: string
}

export default function Waitlist({ productId, productName, size }: WaitlistProps) {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, productName, size, email }),
      })

      if (response.ok) {
        toast({
          title: "Added to Waitlist",
          description: "We'll notify you when the product is back in stock.",
        })
        setEmail("")
      } else {
        throw new Error("Failed to join waitlist")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join waitlist. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Join Waitlist</h3>
      <p className="text-sm text-gray-600 mb-2">
        This size is currently out of stock. Enter your email to be notified when it's available.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-grow"
        />
        <Button type="submit">Join Waitlist</Button>
      </form>
    </div>
  )
}

