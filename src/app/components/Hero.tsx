'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "../components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const shirts = [
  { id: 1, name: 'Classic White', color: 'white', image: '/placeholder.svg?height=600&width=400&text=White+Shirt' },
  { id: 2, name: 'Midnight Black', color: 'black', image: '/placeholder.svg?height=600&width=400&text=Black+Shirt' },
  { id: 3, name: 'Navy Blue', color: 'blue', image: '/placeholder.svg?height=600&width=400&text=Blue+Shirt' },
  { id: 4, name: 'Forest Green', color: 'green', image: '/placeholder.svg?height=600&width=400&text=Green+Shirt' },
]

export default function Hero() {
  const [currentShirt, setCurrentShirt] = useState(0)

  const nextShirt = () => {
    setCurrentShirt((prev) => (prev + 1) % shirts.length)
  }

  const prevShirt = () => {
    setCurrentShirt((prev) => (prev - 1 + shirts.length) % shirts.length)
  }

  return (
    <section className="relative h-screen bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Elegant Chinese Collar</h1>
            <p className="text-xl mb-8">Discover our new collection of stylish Chinese collar t-shirts with distinctive black stripes.</p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-100">
              Shop Now
            </Button>
          </motion.div>
          <div className="relative h-[400px] md:h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentShirt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={shirts[currentShirt].image}
                  alt={shirts[currentShirt].name}
                  fill
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
            <button 
              onClick={prevShirt} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
              aria-label="Previous shirt"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button 
              onClick={nextShirt} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
              aria-label="Next shirt"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

