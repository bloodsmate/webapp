'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import { toast } from '../hooks/use-toast'
import { Button } from './ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
import { Product } from '../data/products'
import { FaCcVisa, FaCcMastercard, FaPaypal } from 'react-icons/fa'

function SizeChart() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="size-chart">
        <AccordionTrigger>Size Chart</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Size</th>
                    <th className="py-2 px-4 border-b">Chest (inches)</th>
                    <th className="py-2 px-4 border-b">Length (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b text-center">S</td>
                    <td className="py-2 px-4 border-b text-center">36-38</td>
                    <td className="py-2 px-4 border-b text-center">28</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b text-center">M</td>
                    <td className="py-2 px-4 border-b text-center">39-41</td>
                    <td className="py-2 px-4 border-b text-center">29</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b text-center">L</td>
                    <td className="py-2 px-4 border-b text-center">42-44</td>
                    <td className="py-2 px-4 border-b text-center">30</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 text-center">XL</td>
                    <td className="py-2 px-4 text-center">45-47</td>
                    <td className="py-2 px-4 text-center">31</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Image
                src="/placeholder.svg?height=300&width=300&text=Chest+Measurement"
                alt="Chest Measurement"
                width={300}
                height={300}
                className="rounded-lg"
              />
              <Image
                src="/placeholder.svg?height=300&width=300&text=Length+Measurement"
                alt="Length Measurement"
                width={300}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function PaymentOptions() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="payment-options">
        <AccordionTrigger>Payment Options</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside space-y-1">
            <li>Credit/Debit Card</li>
            <li>PayPal</li>
            <li>KOKO Pay (3 months installment)</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function DeliveryAndReturns() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="delivery-returns">
        <AccordionTrigger>Delivery & Returns</AccordionTrigger>
        <AccordionContent>
          <p className="mb-2">Free standard delivery on orders over $50</p>
          <p>Easy returns within 30 days</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

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
    
    const sizeIndex = product.sizes.indexOf(selectedSize)
    if (product.stock[sizeIndex] === 0) {
      toast({
        title: "Out of Stock",
        description: `The selected size (${selectedSize}) is out of stock.`,
        variant: "destructive",
      })
      return
    }

    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: selectedSize,
      image: product.images[0]
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
      {/* Left Section - Images */}
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

      {/* Right Section - Details */}
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
        <div>
          <h3 className="text-lg font-bold mb-2">Select Size</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size, index) => (
              <button
                key={size}
                onClick={() => product.stock[index] > 0 && setSelectedSize(size)}
                disabled={product.stock[index] === 0}
                className={`relative flex items-center justify-center w-12 h-12 text-sm font-semibold border-2 rounded-md ${
                  selectedSize === size ? 'border-blue-600 bg-blue-100' : 'border-gray-300'
                } ${
                  product.stock[index] === 0
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:border-blue-600'
                }`}
              >
                {size}
                {product.stock[index] === 0 && (
                  <span className="absolute inset-0 flex items-center justify-center text-red-600 text-lg font-bold">X</span>
                )}
              </button>
            ))}
          </div>
        </div>
        <p className="text-gray-600">
          {product.stock.reduce((sum, qty) => sum + qty, 0) > 0
            ? 'In stock'
            : 'Out of stock'}
        </p>
        <Button onClick={handleAddToCart} className="w-full">Add to Cart</Button>

        <div className="flex items-center space-x-4 mt-6">
          <span className="text-sm text-gray-500">We accept:</span>
          <div className="flex space-x-2">
            {/* Replace with your preferred icons */}
            {/* <img src={FaCcVisa} alt="Visa" className="w-8 h-8" /> */}
            <FaCcVisa size={40} color="blue" className="w-8 h-8" />
            <FaCcMastercard size={40} className="w-8 h-8" />
            {/* <img src="https://res.cloudinary.com/midefulness/image/upload/v1736096673/BloodsMate/mastercard-logo_vjdha2.png" alt="mastercard" className="h-8" /> */}
            <img src="https://res.cloudinary.com/midefulness/image/upload/v1736096286/BloodsMate/koko-pay_d6id9w.png" alt="koko pay" className="h-8" />
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full mt-6">
          <AccordionItem value="description">
            <AccordionTrigger>Product Details</AccordionTrigger>
            <AccordionContent>
              {product.description}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="size-chart">
            <AccordionTrigger>Size Chart</AccordionTrigger>
            <AccordionContent>
              {/* Include size chart details here */}
              <p>Refer to our size chart to pick the perfect fit.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <SizeChart />
        <PaymentOptions />
        <DeliveryAndReturns />
      </div>
    </div>
  )
}
