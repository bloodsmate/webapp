'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Order, OrderItem } from '@/app/data/orderTypes';

interface OrderNotificationsProps {
  orders: Order[]
}

export default function OrderNotifications({ orders }: OrderNotificationsProps) {
  const [visibleNotifications, setVisibleNotifications] = useState<Order[]>([])

  useEffect(() => {
    if (orders.length > 0) {
      setVisibleNotifications([orders[0]])
      const timer = setInterval(() => {
        setVisibleNotifications((prev) => {
          if (prev.length < orders.length) {
            return [...prev, orders[prev.length]]
          }
          return prev
        })
      }, 5000)

      return () => clearInterval(timer)
    }
  }, [orders])

  const removeNotification = (orderId: string) => {
    setVisibleNotifications((prev) => prev.filter((order) => order.orderId !== orderId))
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {visibleNotifications.map((order) => (
          <motion.div
            key={order.orderId}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="bg-white rounded-lg shadow-lg p-4 max-w-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Order #{order.orderId}</h3>
                <p className="text-sm text-gray-600">Status: {order.status}</p>
              </div>
              <button
                onClick={() => removeNotification(order.orderId)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

