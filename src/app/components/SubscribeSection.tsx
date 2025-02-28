'use client'

import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { toast } from '../hooks/use-toast'
import Image from 'next/image'

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
    <div className="bg-gradient-to-r from-gray-900 to-black py-16 mt-12 border-t border-b border-gray-800 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <div className="animate-pulse-slow bg-gradient-to-r from-gray-800 to-black w-full h-full opacity-20"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <h3 className="text-4xl font-bold mb-4 text-center text-white">
          Stay Updated
        </h3>
        <p className="text-lg text-gray-300 text-center mb-8">
          Subscribe to our newsletter for exclusive offers, new arrivals, and style tips.
        </p>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
          <Input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow rounded-lg border-2 border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:border-white focus:ring-2 focus:ring-gray-600 transition-all"
            required
          />
          <Button 
            type="submit" 
            className="w-full sm:w-auto bg-white hover:bg-gray-100 text-black font-semibold py-3 px-6 rounded-lg transition-all"
          >
            Subscribe
          </Button>
        </form>
      </div>

      {/* Decorative Image */}
      <div className="absolute bottom-0 right-0 z-0 opacity-50">
        <Image
          src="/images/subscribe-illustration.png" // Replace with your image path
          alt="Subscribe Illustration"
          width={400}
          height={400}
          className="object-cover"
        />
      </div>
    </div>
  )
}