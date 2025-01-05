'use client'

import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import { RootState } from '../redux/store'
import Link from 'next/link'

interface CartPopupProps {
  onClose: () => void
}

export default function CartPopup({ onClose }: CartPopupProps) {
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-8 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4 mb-4">
              {cartItems.map((item) => (
                <li key={`${item.id}-${item.size}`} className="flex justify-between items-center">
                  <span>{item.name} ({item.size}) x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center font-bold mb-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link href="/cart">
              <Button className="w-full" onClick={onClose}>
                View Cart
              </Button>
            </Link>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

