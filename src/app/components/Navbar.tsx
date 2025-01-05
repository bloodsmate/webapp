'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { Button } from './ui/button' 
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { RootState } from '../redux/store' 
import Image from 'next/image'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const cartItems = useSelector((state: RootState) => state.cart.items)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
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
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="TeeStartup Logo" width={40} height={40} />
            <span className="ml-2 text-2xl font-bold text-gray-800">TeeStartup</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-gray-600 hover:text-gray-800">Products</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-800">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
            <Link href="/cart" className="text-gray-600 hover:text-gray-800 relative">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
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
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="flex items-center mb-4">
                <Image src="/logo.svg" alt="TeeStartup Logo" width={32} height={32} />
                <span className="ml-2 text-xl font-bold text-gray-800">TeeStartup</span>
              </Link>
              <Link href="/products" className="text-gray-600 hover:text-gray-800">Products</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-800">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
              <Link href="/cart" className="text-gray-600 hover:text-gray-800 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
                {totalItems > 0 && (
                  <span className="ml-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link href="/login">
                <Button variant="outline" size="sm" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  )
}
