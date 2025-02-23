'use client'

import { useState } from 'react'
import { useSelector } from "react-redux"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import type { RootState } from "../redux/store"
import { Progress } from "../components/ui/progress"
import PayHereButton from "../components/PayHereButton"

function CheckoutForm() {
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
  })

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Here you would typically send the order data to your backend
    // and get an order ID in response
    // const orderResponse = await fetch("/api/orders", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     items: cartItems,
    //     total,
    //     ...formData,
    //   }),
    // })

    // const orderData = await orderResponse.json()
    // Dummy response data
    const orderResponse = {
      orderId: "123456", // Replace with actual order ID from backend
    }

    setLoading(false)
    setStep(2)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Progress value={(step / 2) * 100} className="w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" required value={formData.name} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" required value={formData.address} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" required value={formData.city} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" required value={formData.country} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input id="zipCode" name="zipCode" required value={formData.zipCode} onChange={handleInputChange} />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Next"}
              </Button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <div className="space-y-4">
              <PayHereButton
                amount={total}
                orderId="123456" // Replace with actual order ID from your backend
                itemsDescription={cartItems.map((item) => `${item.name} x${item.quantity}`).join(", ")}
                customerName={formData.name}
                customerEmail={formData.email}
                customerPhone="1234567890" // Add phone input if needed
                customerAddress={formData.address}
                city={formData.city}
                country={formData.country}
              />
            </div>
          </div>
        )}
      </div>
      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        <ul className="space-y-2">
          {cartItems.map((item) => (
            <li key={`${item.id}-${item.size}`} className="flex justify-between">
              <span>
                {item.name} ({item.size}) x{item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-xl font-bold">Total: ${total.toFixed(2)}</div>
      </div>
    </form>
  )
}

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <CheckoutForm />
    </div>
  )
}

