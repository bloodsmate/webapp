'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice' 
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { toast } from '../hooks/use-toast'
import { Button } from './ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
import { Product } from '../data/products'

export default function ProductDetails({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [mainImage, setMainImage] = useState(0)
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Size not selected",
        description: "Please select a size before adding to cart.",
        variant: "destructive",
      })
      return
    }
    
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: selectedSize
    }))

    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedSize}) has been added to your cart.`,
    })
  }

  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="relative aspect-square">
          <Image
            src={product.images[mainImage]}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          {product.images.map((img, index) => (
            <button
              key={index}
              onClick={() => setMainImage(index)}
              className={`relative w-20 h-20 rounded-md overflow-hidden ${mainImage === index ? 'ring-2 ring-blue-500' : ''}`}
            >
              <Image src={img} alt={`${product.name} view ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="flex items-baseline space-x-2">
          <p className="text-2xl font-semibold text-blue-600">${discountedPrice.toFixed(2)}</p>
          {product.discountPercentage && (
            <>
              <p className="text-lg text-gray-500 line-through">${product.price.toFixed(2)}</p>
              <p className="text-lg font-semibold text-green-500">Save {product.discountPercentage}%</p>
            </>
          )}
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="description">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>
              {product.description}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="sizes">
            <AccordionTrigger>Available Sizes</AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="stock">
            <AccordionTrigger>Stock Information</AccordionTrigger>
            <AccordionContent>
              {product.stock < 5 ? (
                <p className="text-red-500 font-semibold">Only {product.stock} left in stock - order soon!</p>
              ) : (
                <p className="text-green-500 font-semibold">In stock</p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button onClick={handleAddToCart} className="w-full">Add to Cart</Button>
      </div>
    </div>
  )
}

