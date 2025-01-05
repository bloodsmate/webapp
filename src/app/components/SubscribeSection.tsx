'use client'

import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { toast } from '../hooks/use-toast'

export default function SubscribeSection() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log('Subscribing email:', email)
    toast({
      title: "Subscribed!",
      description: "You've successfully subscribed to our newsletter.",
    })
    setEmail('')
  }

  return (
    <div className="bg-gray-100 py-8 mt-12">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-4 text-center">Subscribe for Updates</h3>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
          <Input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow" 
            required
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </div>
  )
}

