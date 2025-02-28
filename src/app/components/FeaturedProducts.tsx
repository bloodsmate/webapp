'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import QuickView from './QuickView'
import { Product } from '../data/products'
import { fetchProducts } from "../redux/productSlice"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'

export default function FeaturedProducts() {
  const dispatch = useDispatch<AppDispatch>()
  const { items: products, loading, error } = useSelector((state: RootState) => state.products)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [itemsPerPage, setItemsPerPage] = useState(4) // Default number of items per page

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // Adjust items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2)
      } else if (window.innerWidth < 1400) {
        setItemsPerPage(3)
      } else {
        setItemsPerPage(4)
      }
    }

    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % (products.length - itemsPerPage + 1))
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + (products.length - itemsPerPage + 1)) % (products.length - itemsPerPage + 1))
  }

  const paginatedProducts = products.slice(currentIndex, currentIndex + itemsPerPage)

  const discountedPrice = (product: Product) => {
    return product.discountPercentage
      ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
      : product.price
  }

  return (
    <motion.section
      id="featured"
      className="py-16 bg-gray-50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }} // Trigger animation once, when 20% of the section is visible
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Must-Have Styles</h2>

        <div className="relative">
          <button
            onClick={handlePrevious}
            className="absolute -left-4 sm:-left-12 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-4 sm:-right-12 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-900" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8">
            {paginatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
                style={{ height: 'auto', minHeight: '650px' }}
              >
                <div className="relative h-[420px] 2xl:h-[420px]">
                  <Link href={`/products/${product.id}`} prefetch={false}>
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority={index < 4} // Preload the first 4 images
                    />
                  </Link>

                  {(product.discountPercentage ?? 0) > 0 && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      Save {product.discountPercentage}%
                    </div>
                  )}
                </div>

                <div className="p-4 h-48 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-gray-800 group-hover:text-gray-900 transition-colors">
                      {product.name}
                    </h3>

                    {product.color && (
                      <p className="text-sm text-gray-500 mb-2">Color: {product.color}</p>
                    )}

                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`text-sm font-semibold ${
                          product.inStock ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      {product.discountPercentage && product.discountPercentage > 0 ? (
                        <>
                          <p className="text-base md:text-lg text-gray-500 font-semibold">
                            LKR {discountedPrice(product)}
                          </p>
                          <p className="text-sm md:text-base text-gray-400 line-through">LKR {product.price.toFixed(2)}</p>
                        </>
                      ) : (
                        <p className="text-base md:text-lg text-gray-500 font-semibold">LKR {product.price.toFixed(2)}</p>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => setSelectedProduct(product)}
                    className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg"
                  >
                    Quick View
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </motion.section>
  )
}