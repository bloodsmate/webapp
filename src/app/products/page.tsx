'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Checkbox } from "../components/ui/checkbox"
import { Label } from "../components/ui/label"
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SEO from '../components/SEO'
import { Product, products } from '../data/products'

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 6
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(products.length / productsPerPage)

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedGenders, setSelectedGenders] = useState<string[]>([])

  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes)))
  const allGenders = Array.from(new Set(products.map(p => p.gender)))

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSize = selectedSizes.length === 0 || selectedSizes.some(size => product.sizes.includes(size))
      const matchesGender = selectedGenders.length === 0 || selectedGenders.includes(product.gender)
      return matchesSearch && matchesSize && matchesGender
    })
    setFilteredProducts(filtered)
  }, [searchTerm, selectedSizes, selectedGenders])

  const handleSizeChange = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  const handleGenderChange = (gender: string) => {
    setSelectedGenders(prev => 
      prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
    )
  }

  return (
    <div className="main-content container mx-auto px-4 py-8">
      <SEO 
        title="Our Products"
        description="Browse our collection of high-quality t-shirts"
        canonical="/products"
      />
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4 space-y-6">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div>
            <h3 className="font-semibold mb-2">Size</h3>
            {allSizes.map(size => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={selectedSizes.includes(size)}
                  onCheckedChange={() => handleSizeChange(size)}
                />
                <Label htmlFor={`size-${size}`}>{size}</Label>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-semibold mb-2">Gender</h3>
            {allGenders.map(gender => (
              <div key={gender} className="flex items-center space-x-2">
                <Checkbox
                  id={`gender-${gender}`}
                  checked={selectedGenders.includes(gender)}
                  onCheckedChange={() => handleGenderChange(gender)}
                />
                <Label htmlFor={`gender-${gender}`}>{gender}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src={product.images[0]}
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
        </div>
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
