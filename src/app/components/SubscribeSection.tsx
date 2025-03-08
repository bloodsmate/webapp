'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { toast } from '@/app/hooks/use-toast'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/app/redux/store"
import { subscribe, checkSubscription } from "@/app/redux/subscribeSlice"

export default function SubscribeSection() {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error, isSubscribed } = useSelector((state: RootState) => state.subscribe)

  // Check subscription status when email changes
  useEffect(() => {
    if (email && /\S+@\S+\.\S+/.test(email)) {
      dispatch(checkSubscription(email))
    }
  }, [email, dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if already subscribed
    if (isSubscribed) {
      toast({
        title: "Already Subscribed",
        description: "This email is already subscribed to our newsletter.",
        variant: "default",
      })
      return
    }

    try {
      await dispatch(subscribe(email)).unwrap()
      toast({
        title: "Subscribed!",
        description: "You've successfully subscribed to our newsletter.",
        variant: "success",
      })
      setEmail('')
    } catch (error:any) {
      toast({
        title: "Error",
        description: error || "Failed to subscribe. Please try again.",
        variant: "destructive",
      })
    }
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
            disabled={loading || isSubscribed}
          >
            {loading ? "Subscribing..." : isSubscribed ? "Already Subscribed" : "Subscribe"}
          </Button>
        </form>
      </div>
    </div>
  )
}