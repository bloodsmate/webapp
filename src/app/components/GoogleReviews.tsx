'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const reviews = [
  { id: 1, name: 'John Doe', rating: 5, text: 'Great quality t-shirts! Will definitely buy again.', avatar: '/placeholder.svg?height=50&width=50' },
  { id: 2, name: 'Jane Smith', rating: 4, text: 'Love the designs, but sizing runs a bit small.', avatar: '/placeholder.svg?height=50&width=50' },
  { id: 3, name: 'Mike Johnson', rating: 5, text: 'Excellent customer service and fast shipping!', avatar: '/placeholder.svg?height=50&width=50' },
]

export default function GoogleReviews() {
  const [currentReview, setCurrentReview] = useState(0)

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
        <div className="relative max-w-2xl mx-auto">
          <motion.div
            key={currentReview}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <Image
                src={reviews[currentReview].avatar}
                alt={reviews[currentReview].name}
                width={50}
                height={50}
                className="rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold">{reviews[currentReview].name}</h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < reviews[currentReview].rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600">{reviews[currentReview].text}</p>
          </motion.div>
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
