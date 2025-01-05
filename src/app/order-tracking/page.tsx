'use client'

import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Order, OrderStatus } from '../types/order'

const mockOrder: Order = {
    id: '12345',
    userId: 'user123',
    items: [
      { id: 1, name: 'Classic White Tee', size: 'M', quantity: 2, price: 24.99 },
      { id: 2, name: 'Vintage Black Tee', size: 'L', quantity: 1, price: 29.99 },
    ],
    total: 79.97,
    status: OrderStatus.DELIVERED,
    createdAt: '2023-06-01T10:00:00Z',
    updatedAt: '2023-06-05T15:00:00Z',
  }
  
  export default function OrderTrackingPage() {
    const [orderNumber, setOrderNumber] = useState('')
    const [order, setOrder] = useState<Order | null>(null)
  
    const handleTrackOrder = (e: React.FormEvent) => {
      e.preventDefault()
      if (orderNumber === mockOrder.id) {
        setOrder(mockOrder)
      } else {
        setOrder(null)
        alert('Order not found')
      }
    }
  
    const getStatusColor = (status: OrderStatus) => {
      switch (status) {
        case OrderStatus.PENDING:
        case OrderStatus.PROCESSING:
          return 'bg-yellow-500'
        case OrderStatus.SHIPPED:
          return 'bg-blue-500'
        case OrderStatus.DELIVERED:
          return 'bg-green-500'
        case OrderStatus.CANCELLED:
          return 'bg-red-500'
        default:
          return 'bg-gray-500'
      }
    }
  
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Order Tracking</h1>
        <form onSubmit={handleTrackOrder} className="mb-8">
          <div className="flex gap-4">
            <Input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Enter your order number"
              className="flex-grow"
            />
            <Button type="submit">Track Order</Button>
          </div>
        </form>
        {order && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Order #{order.id}</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Items</h3>
              <ul className="space-y-2">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.name} ({item.size}) x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-xl font-bold">Total: ${order.total.toFixed(2)}</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Order Status</h3>
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${getStatusColor(order.status)} mr-2`}></div>
                <span className="font-semibold">{order.status}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Order placed on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                Last updated: {new Date(order.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }