'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { Button } from './ui/button' 
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { RootState } from '../redux/store' 
import Image from 'next/image'
import { smoothScroll } from '../utils/smoothScroll'
import CartPopup from './CartPopup'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { scrollY } = useScroll()
  const cartItems = useSelector((state: RootState) => state.cart.items)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleScroll = (id: string) => {
    smoothScroll(`#${id}`)
    setIsMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              TeeStartup
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => handleScroll('featured')} className="text-gray-600 hover:text-gray-800">Featured</button>
              <Link href="/products" className="text-gray-600 hover:text-gray-800">Products</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-800">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
              <button onClick={() => setIsCartOpen(true)} className="text-gray-600 hover:text-gray-800 relative">
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </button>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            </div>
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden py-4"
              >
                <div className="flex flex-col space-y-4">
                  <button onClick={() => handleScroll('featured')} className="text-gray-600 hover:text-gray-800">Featured</button>
                  <Link href="/products" className="text-gray-600 hover:text-gray-800">Products</Link>
                  <Link href="/about" className="text-gray-600 hover:text-gray-800">About</Link>
                  <Link href="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
                  <button onClick={() => setIsCartOpen(true)} className="text-gray-600 hover:text-gray-800 flex items-center">
                    <ShoppingCart className="w-6 h-6 mr-2" />
                    Cart ({totalItems})
                  </button>
                  <Link href="/login">
                    <Button variant="outline" size="sm" className="w-full">
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
      <AnimatePresence>
        {isCartOpen && <CartPopup onClose={() => setIsCartOpen(false)} />}
      </AnimatePresence>
    </>
  )
}