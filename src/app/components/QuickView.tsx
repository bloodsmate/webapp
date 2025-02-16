'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "../components/ui/button"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Label } from "../components/ui/label"
import { useDispatch } from 'react-redux'
import { Product } from '../data/products'
import { addToCart } from '../redux/cartSlice'

interface QuickViewProps {
  product: Product
  onClose: () => void
}

export default function QuickView({ product, onClose }: QuickViewProps) {
  const [selectedSize, setSelectedSize] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    if (selectedSize) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        size: selectedSize,
        image: product.images[0],
        discountPrice: Number((product.discountPercentage && product.discountPercentage > 0) ? discountedPrice : 0),
      }))
      onClose()
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length)
  }

  const discountedPrice = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : product.price;

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
        className="bg-white rounded-lg p-8 max-w-4xl w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 relative">
            <div className="relative aspect-square">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
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
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            {/* <p className="text-xl text-gray-600">${product.price.toFixed(2)}</p> */}
            <div className="flex items-center gap-2 mb-3">
              {product.discountPercentage && product.discountPercentage > 0 ? (
                <>
                  <p className="text-xl text-gray-600 font-semibold">
                    LKR {discountedPrice}
                  </p>
                  <p className="text-gray-400 line-through">
                    LKR {product.price.toFixed(2)}
                  </p>
                  <span className="ml-2 text-xl text-green-400 font-semibold">
                    Save {product.discountPercentage}%
                  </span>
                </>
                ) : (
                  <p className="text-gray-500 font-semibold">LKR {product.price.toFixed(2)}</p>
                )}
            </div>
            <p className="text-gray-600">{product.description}</p>
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Size</h3>
              <RadioGroup onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <div key={size}>
                    <RadioGroupItem
                      value={size}
                      id={`size-${size}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`size-${size}`}
                      className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <Button onClick={handleAddToCart} className="w-full" disabled={!selectedSize}>
              Add to Cart
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}