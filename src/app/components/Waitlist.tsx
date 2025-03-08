"use client"

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { toast } from '@/app/hooks/use-toast'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/app/redux/store"
import { addToWaitlist, fetchWaitlist, selectIsUserInWaitlist } from "@/app/redux/waitlistSlice"

interface WaitlistProps {
  productId: number
  productName: string
  size: string
}

export default function Waitlist({ productId, productName, size }: WaitlistProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [email, setEmail] = useState("")

  useEffect(() => {
    const savedEmail = localStorage.getItem("waitlistEmail")
    if (savedEmail) {
      setEmail(savedEmail)
    }
  }, [])

  useEffect(() => {
    dispatch(fetchWaitlist())
  }, [dispatch])

  const isUserInWaitlist = useSelector((state: RootState) =>
    selectIsUserInWaitlist(state, productId, size, email)
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await dispatch(
        addToWaitlist({
          productId,
          size,
          email,
        })
      ).unwrap()

      if (response) {
        toast({
          title: "Added to Waitlist",
          description: "We'll notify you when the product is back in stock.",
          variant: "success",
        })

        localStorage.setItem("waitlistEmail", email)
        setEmail("")
      }
    } catch (error:any) {
      if (error.message === "This email is already in the waitlist for this product and size.") {
        toast({
          title: "Already in Waitlist",
          description: "This email is already in the waitlist for this product and size.",
          variant: "default",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to join waitlist. Please try again.",
          variant: "destructive",
        })
      }
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
        <Button type="submit" disabled={isUserInWaitlist}>
          {isUserInWaitlist ? "Already in Waitlist" : "Join Waitlist"}
        </Button>
      </form>
      {isUserInWaitlist && (
        <p className="text-sm text-green-600 mt-2">
          You are already on the waitlist for this product and size.
        </p>
      )}
    </div>
  )
}