'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "../components/ui/button"
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SEO from '../components/SEO'

const products = [
  { id: 1, name: 'Classic White Tee', price: 24.99, image: 'https://res.cloudinary.com/midefulness/image/upload/v1657441707/cld-sample-5.jpg' },
  { id: 2, name: 'Vintage Black Tee', price: 29.99, image: 'https://res.cloudinary.com/midefulness/image/upload/v1657441707/cld-sample-5.jpg' },
  { id: 3, name: 'Graphic Print Tee', price: 34.99, image: 'https://res.cloudinary.com/midefulness/image/upload/v1657441707/cld-sample-5.jpg' },
  { id: 4, name: 'Striped Navy Tee', price: 27.99, image: 'https://res.cloudinary.com/midefulness/image/upload/v1657441707/cld-sample-5.jpg' },
  { id: 5, name: 'Heather Gray Tee', price: 26.99, image: 'https://res.cloudinary.com/midefulness/image/upload/v1657441707/cld-sample-5.jpg' },
  { id: 6, name: 'Neon Green Tee', price: 31.99, image: 'https://res.cloudinary.com/midefulness/image/upload/v1657441707/cld-sample-5.jpg' },
  // { id: 6, name: 'Neon Green Tee', price: 31.99, image: '/placeholder.svg?height=300&width=300' },
]

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 6
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(products.length / productsPerPage)

  return (
    <div className="main-content container mx-auto px-4 py-8">
      <SEO 
        title="Our Products"
        description="Browse our collection of high-quality t-shirts"
        canonical="/products"
      />
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
              <Link href={`/products/${product.id}`}>
                <Button className="w-full">View Details</Button>
              </Link>
            </div>
          </div>
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
  )
}
