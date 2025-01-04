'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const products = [
  { id: 1, name: 'Classic White Tee', price: 24.99, image: '/placeholder.svg?height=300&width=300' },
  { id: 2, name: 'Vintage Black Tee', price: 29.99, image: '/placeholder.svg?height=300&width=300' },
  { id: 3, name: 'Graphic Print Tee', price: 34.99, image: '/placeholder.svg?height=300&width=300' },
  { id: 4, name: 'Striped Navy Tee', price: 27.99, image: '/placeholder.svg?height=300&width=300' },
  { id: 5, name: 'Heather Gray Tee', price: 26.99, image: '/placeholder.svg?height=300&width=300' },
  { id: 6, name: 'Neon Green Tee', price: 31.99, image: '/placeholder.svg?height=300&width=300' },
]

const ITEMS_PER_PAGE = 3

export default function FeaturedProducts() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paginatedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <Link href={`/products/${product.id}`}>
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                  <Button className="w-full">View Details</Button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

