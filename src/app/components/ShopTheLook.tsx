"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { products } from '../data/products'

const lookProducts = [
  { id: 1, name: "Classic White Tee", price: 24.99, x: 30, y: 50 },
  { id: 2, name: "Vintage Black Tee", price: 29.99, x: 70, y: 30 },
  { id: 3, name: "Graphic Print Tee", price: 34.99, x: 50, y: 70 },
]

const lookImages = [
    "https://res.cloudinary.com/midefulness/image/upload/v1657441707/cld-sample-5.jpg",
    "https://res.cloudinary.com/midefulness/image/upload/v1657441705/cld-sample.jpg",
    "https://res.cloudinary.com/midefulness/image/upload/v1657441707/cld-sample-5.jpg",
  ]
  
  export default function ShopTheLook() {
    const [selectedProduct, setSelectedProduct] = useState<(typeof lookProducts)[0]>(lookProducts[0])
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [currentProductIndex, setCurrentProductIndex] = useState(0)
  
    const nextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % lookImages.length)
    }
  
    const prevImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + lookImages.length) % lookImages.length)
    }
  
    const nextProduct = () => {
      setCurrentProductIndex((prevIndex) => (prevIndex + 1) % lookProducts.length)
      setSelectedProduct(lookProducts[(currentProductIndex + 1) % lookProducts.length])
    }
  
    const prevProduct = () => {
      setCurrentProductIndex((prevIndex) => (prevIndex - 1 + lookProducts.length) % lookProducts.length)
      setSelectedProduct(lookProducts[(currentProductIndex - 1 + lookProducts.length) % lookProducts.length])
    }
  
    return (
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop The Look</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3 relative">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
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
                  />
                </AnimatePresence>
                {lookProducts.map((product) => (
                  <motion.button
                    key={product.id}
                    className="absolute w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    style={{ left: `${product.x}%`, top: `${product.y}%` }}
                    onClick={() => setSelectedProduct(product)}
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
            <div className="w-full md:w-1/3 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-xl font-semibold mb-2">{selectedProduct.name}</h3>
                  <p className="text-gray-600 mb-4">${selectedProduct.price.toFixed(2)}</p>
                  <div className="relative group">
                    <Image
                      src={products.find((p) => p.id === selectedProduct.id)?.images[0] || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      width={300}
                      height={300}
                      className="w-full h-auto rounded-lg mb-4"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                      <div className="text-white text-center p-4">
                        <p className="text-lg font-semibold mb-2">{selectedProduct.name}</p>
                        <p className="mb-2">Size: S, M, L, XL</p>
                        <p>Material: 100% Cotton</p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Add to Cart</Button>
                </motion.div>
              </AnimatePresence>
              <button
                onClick={prevProduct}
                className="absolute left-1/2 top-2 transform -translate-x-1/2 bg-white bg-opacity-50 p-2 rounded-full"
              >
                <ChevronUp size={24} />
              </button>
              <button
                onClick={nextProduct}
                className="absolute left-1/2 bottom-2 transform -translate-x-1/2 bg-white bg-opacity-50 p-2 rounded-full"
              >
                <ChevronDown size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  