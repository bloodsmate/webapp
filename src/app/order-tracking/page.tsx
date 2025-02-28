'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Search } from 'lucide-react'
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { toast } from '@/app/hooks/use-toast';
import { fetchOrdersByOrderId } from "@/app/redux/orderSlice";

export default function OrderTrackingPage() {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter()
  const [orderId, setOrderId] = useState('')
  const [error, setError] = useState('')

  const handleTrackOrder = async () => {
    if (!orderId) {
      setError('Order ID is required.')
      return
    }

    try {
      const resultAction = await dispatch(fetchOrdersByOrderId(orderId))

      if (fetchOrdersByOrderId.fulfilled.match(resultAction)) {
        const order = resultAction.payload

        if (order) {
          router.push(`/order-confirmation/${orderId}`)
        } else {
          setError('Order not found. Please check your order ID and try again.')
        }
      } else {
        throw new Error(resultAction.payload || 'Failed to fetch order details')
      }
    } catch (error) {
      console.error('Error tracking order:', error)
      setError('An error occurred while tracking your order. Please try again.')
    }
  }

  return (
    <div className="container main-content mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6">Track Your Order</h1>
        <p className="text-gray-600 mb-8">Enter your order ID to view the status of your order.</p>

        {/* Order ID Input */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="orderId">Order ID</Label>
            <Input
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your order ID"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Track Button */}
          <Button onClick={handleTrackOrder} className="w-full">
            <Search className="w-4 h-4 mr-2" />
            Track Order
          </Button>
        </div>
      </div>
    </div>
  )
}