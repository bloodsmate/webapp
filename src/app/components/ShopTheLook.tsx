"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import ProductCard from "./ProductCard"
import { products } from '../data/products'
import { lookImages } from '../data/constants'
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../redux/productSlice"
import type { AppDispatch, RootState } from "../redux/store"
import productNotFound from "@/app/assets/product_not_found.png";

const lookProducts = [
  { id: 4, imageIds: [0, 1, 2, 3], x: 55, y: 50 }, // Product 4 appears in images 0-3
  { id: 5, imageIds: [4, 5, 6, 7], x: 50, y: 50 }, // Product 5 appears in images 4-7
  { id: 2, imageIds: [8, 9, 10, 11], x: 55, y: 50 }, // Product 2 appears in images 8-11
  { id: 6, imageIds: [12, 13, 14, 15], x: 55, y: 50 }, // Product 6 appears in images 12-15
  { id: 3, imageIds: [16, 17, 18, 19], x: 55, y: 50 }, // Product 3 appears in images 16-19
]

export default function ShopTheLook() {
  const dispatch = useDispatch<AppDispatch>()
  const { items: allProducts, loading, error } = useSelector((state: RootState) => state.products)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // Get products for the current image
  const currentImageProducts = lookProducts
    .filter((product) => product.imageIds.includes(currentImageIndex))
    .map((product) => allProducts.find((p) => p.id === product.id))
    .filter(Boolean) // Remove undefined values

  // Set the first product as selected when the image changes
  useEffect(() => {
    if (currentImageProducts.length > 0) {
      setSelectedProduct(currentImageProducts[0])
    }
  }, [currentImageIndex, currentImageProducts])

  const nextImage = () => {
    setIsLoading(true)
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % lookImages.length)
  }

  const prevImage = () => {
    setIsLoading(true)
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + lookImages.length) % lookImages.length)
  }

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <motion.section
      className="py-16 bg-gray-100"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }} // Trigger animation once, when 20% of the section is visible
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Elevate Your Look</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Slider */}
          <div className="w-full md:w-2/3 relative">
            <div className="relative overflow-hidden shadow-lg">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                  <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                </div>
              )}
              <AnimatePresence initial={false} custom={currentImageIndex}>
                <motion.img
                  key={currentImageIndex}
                  src={lookImages[currentImageIndex]}
                  alt={`Shop The Look ${currentImageIndex + 1}`}
                  className="w-full h-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  onLoad={handleImageLoad}
                  loading="lazy"
                  priority={currentImageIndex === 0} // Preload the first image
                />
              </AnimatePresence>
              {lookProducts
                .filter((product) => product.imageIds.includes(currentImageIndex))
                .map((product) => (
                  <motion.button
                    key={product.id}
                    className="absolute w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    style={{ left: `${product.x}%`, top: `${product.y}%` }}
                    onClick={() => setSelectedProduct(allProducts.find((p) => p.id === product.id))}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                ))}
            </div>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/3 relative">
            <AnimatePresence mode="wait">
              {selectedProduct && (
                <motion.div
                  key={selectedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={selectedProduct} />
                </motion.div>
              )}
            </AnimatePresence>
            {currentImageProducts.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedProduct(
                      currentImageProducts[
                        (currentImageProducts.indexOf(selectedProduct) - 1 + currentImageProducts.length) %
                          currentImageProducts.length
                      ]
                    )
                  }
                  className="absolute left-1/2 top-2 transform -translate-x-1/2 bg-white bg-opacity-50 p-2 rounded-full"
                >
                  <ChevronUp size={24} />
                </button>
                <button
                  onClick={() =>
                    setSelectedProduct(
                      currentImageProducts[
                        (currentImageProducts.indexOf(selectedProduct) + 1) % currentImageProducts.length
                      ]
                    )
                  }
                  className="absolute left-1/2 bottom-2 transform -translate-x-1/2 bg-white bg-opacity-50 p-2 rounded-full"
                >
                  <ChevronDown size={24} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  )
} 