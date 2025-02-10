"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Textarea } from "@/app/components/ui/textarea"
import { toast } from '../hooks/use-toast'
import { Star } from "lucide-react"

interface ReviewFormProps {
  orderId: string
  productId: number
}

export default function ReviewForm({ orderId, productId }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Here you would typically send the review data to your backend
      // For this example, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!",
      })
      setRating(0)
      setComment("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <div className="flex items-center mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Comment
        </label>
        <Textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} rows={4} required />
      </div>
      <Button type="submit">Submit Review</Button>
    </form>
  )
}

