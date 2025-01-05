"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from "@/app/components/ui/button"
import ProductDetails from '@/app/components/ProductDetails' 
import { Input } from "@/app/components/ui/input"
import { Product, products } from '@/app/data/products'
import QuickView from '@/app/components/QuickView'
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/app/components/ui/breadcrumb'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion"

function Breadcrumb({ product }: { product: Product }) {
  return (
    <nav className="main-content flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
            <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
            </svg>
            Home
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <Link href="/products" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">Products</Link>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{product.name}</span>
          </div>
        </li>
      </ol>
    </nav>
  )
}

function SubscribeSection() {
  return (
    <div className="bg-gray-100 py-8 mt-12">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-4 text-center">Subscribe for Updates</h3>
        <form className="max-w-md mx-auto flex gap-2">
          <Input type="email" placeholder="Enter your email" className="flex-grow" />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </div>
  )
}

function YouMightAlsoLike({ currentProductId }: { currentProductId: number }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const relatedProducts = products.filter(p => p.id !== currentProductId).slice(0, 3)

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-semibold mb-4">You Might Also Like</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold mb-2">{product.name}</h4>
              <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
              <Button onClick={() => setSelectedProduct(product)} variant="outline" className="w-full">
                Quick View
              </Button>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  )
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id))

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb product={product} />
      <div className="mt-8">
        <ProductDetails product={product} />
      </div>
      <div className="mt-8 space-y-6">
        
      </div>
      <YouMightAlsoLike currentProductId={product.id} />
      <SubscribeSection />
    </div>
  )
}