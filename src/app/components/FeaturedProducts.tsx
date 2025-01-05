'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import QuickView from './QuickView'
import { Product, products } from '../data/products'

const ITEMS_PER_PAGE = 3

export default function FeaturedProducts() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
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
              <div 
                className="relative h-64 cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Button variant="secondary">Quick View</Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                <Link href={`/products/${product.id}`}>
                  <Button className="w-full">View Details</Button>
                </Link>
              </div>
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
      <AnimatePresence>
        {selectedProduct && (
          <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}