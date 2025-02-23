"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"

interface PayHereButtonProps {
  amount: number
  orderId: string
  itemsDescription: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  city: string
  country: string
}

export default function PayHereButton({
  amount,
  orderId,
  itemsDescription,
  customerName,
  customerEmail,
  customerPhone,
  customerAddress,
  city,
  country,
}: PayHereButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = () => {
    setIsLoading(true)

    // Replace with your actual Merchant ID
    const merchantId = "1225999"

    // For sandbox testing
    const payhere = (window as any).payhere
    payhere.onCompleted = function onCompleted(orderId: string) {
      console.log("Payment completed. OrderID:" + orderId)
      setIsLoading(false)
      // Note: validate the payment through server or API before marking it as successful
    }
    payhere.onDismissed = function onDismissed() {
      console.log("Payment dismissed")
      setIsLoading(false)
    }
    payhere.onError = function onError(error: string) {
      console.log("Error:" + error)
      setIsLoading(false)
    }

    const payment = {
      sandbox: true,
      merchant_id: merchantId,
      return_url: "http://sample.com/return",
      cancel_url: "http://sample.com/cancel",
      notify_url: "http://sample.com/notify",
      order_id: orderId,
      items: itemsDescription,
      amount: amount,
      currency: "USD",
      first_name: customerName.split(" ")[0],
      last_name: customerName.split(" ")[1] || "",
      email: customerEmail,
      phone: customerPhone,
      address: customerAddress,
      city: city,
      country: country,
      delivery_address: customerAddress,
      delivery_city: city,
      delivery_country: country,
    }

    payhere.startPayment(payment)
  }

  return (
    <Button onClick={handlePayment} disabled={isLoading}>
      {isLoading ? "Processing..." : "Pay with PayHere"}
    </Button>
  )
}

