'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from "../components/ui/button"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Label } from "../components/ui/label"

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  sizes: string[]
  stock: number
}

export default function QuickView({ product, onClose }: { product: Product, onClose: () => void; }) {
  const [selectedSize, setSelectedSize] = useState('')
  const sizes = ['XS', 'S', 'M', 'L', 'XL']

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-xl text-gray-600">${product.price.toFixed(2)}</p>
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Size</h3>
              <RadioGroup onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
                {sizes.map((size) => (
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
            <Button className="w-full">Add to Cart</Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

